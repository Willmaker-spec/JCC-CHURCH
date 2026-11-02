"use client"
import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'

import simpleMarkdownToHtml from '@/lib/markdown'
import PublishToast from '@/components/PublishToast'
import ClientOnlyEditor from '@/components/ClientOnlyEditor'


function readInitialDraft() {
  if (typeof window === 'undefined') return {}

  try {
    const savedDraft = localStorage.getItem('devotional_draft')
    const draft = savedDraft ? JSON.parse(savedDraft) : {}
    const savedTimezone = localStorage.getItem('devotional_timezone')
    const timezone =
      savedTimezone || draft.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    return { ...draft, timezone }
  } catch (error) {
    console.error('Unable to restore the devotional draft:', error)
    return {}
  }
}

function AdminApp() {
  const [initialDraft] = useState(readInitialDraft)
  // All state declarations at the very top
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState(initialDraft.title || '')
  const [image, setImage] = useState(initialDraft.image || '')
  const [imageFile, setImageFile] = useState(null)
  const [localPreview, setLocalPreview] = useState('')
  const [content, setContent] = useState(initialDraft.content || '')
  const [message, setMessage] = useState('')
  const [scheduledDate, setScheduledDate] = useState(initialDraft.scheduledDate || '')
  const [timezone, setTimezone] = useState(initialDraft.timezone || '')
  // uploading state removed (not used directly)
  const [attempts, setAttempts] = useState(0)
  const [showPublishToast, setShowPublishToast] = useState(false)
  const [toastText, setToastText] = useState('')
  const [isAuthed, setIsAuthed] = useState(
    () => typeof document !== 'undefined' && document.cookie.includes('dev_auth=1'),
  )
  const [mode, setMode] = useState('edit')
  const fileInputRef = useRef(null)
  // Undo/redo stacks
  const [history, setHistory] = useState([{ title: '', content: '', image: '' }])
  const [historyIndex, setHistoryIndex] = useState(0)
  // List of devotionals for admin
  const [devotionals, setDevotionals] = useState([]);
  const [editingId, setEditingId] = useState(null);


  // Helper to fetch devotionals from Supabase
  const fetchDevotionals = () => {
    fetch('/api/devotionals/list?includeScheduled=true')
      .then(r => r.json())
      .then(data => {
        console.log('Fetched devotionals:', data);
        setDevotionals(Array.isArray(data.items) ? data.items : []);
      });
  };

  // Fetch devotionals list on auth
  useEffect(() => {
    if (!isAuthed) return;
    fetchDevotionals();
  }, [isAuthed]);

  // Load devotional for editing
  async function loadDevotional(id) {
    const d = devotionals.find((d) => d.id === id);
    if (!d) return;
    setTitle(d.title || '');
    setImage(d.image || '');
    setContent(d.content || '');
    // Show raw UTC datetime from DB (strip timezone, keep UTC values)
    setScheduledDate(d.scheduled_date ? d.scheduled_date.slice(0, 16) : '');
    setEditingId(id);
    setMode('edit');
  }

  // Save: create or update
  async function save() {
    try {
      let uploadedUrl = '';
      if (imageFile) {
        uploadedUrl = await uploadFile(imageFile);
        if (uploadedUrl) {
          setImage(uploadedUrl);
          if (localPreview) { URL.revokeObjectURL(localPreview); setLocalPreview(''); }
          setImageFile(null);
        }
      }
      const finalImage = uploadedUrl || image || '';
      // Treat datetime-local value as UTC by appending 'Z'
      const scheduled = scheduledDate ? (scheduledDate.includes('T') ? scheduledDate + ':00Z' : new Date().toISOString()) : new Date().toISOString();
      let res, j;
      async function fetchScheduledInfo(id) {
        try {
          const r = await fetch(`/api/admin/devotional-scheduled?id=${encodeURIComponent(id)}`)
          if (!r.ok) return null
          return await r.json()
        } catch {
          return null
        }
      }

      if (editingId) {
        res = await fetch('/api/devotionals/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, title, image: finalImage, content, scheduled_date: scheduled }),
        });
        j = await res.json();
        if (res.ok) {
          // fetch scheduled info and show to admin
          const info = await fetchScheduledInfo(editingId)
          if (info && info.scheduled) {
            const localShown = info.utc && timezone ? new Date(info.utc).toLocaleString(undefined, { timeZone: timezone }) : info.serverLocal
            setMessage(`Updated — scheduled: ${localShown} (${timezone || 'server local'}) / UTC ${info.utc}`)
          } else {
            setMessage('Updated')
          }
          return true
        } else {
          setMessage(j.error || 'Update failed');
          return false
        }
      } else {
        res = await fetch('/api/devotionals/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, image: finalImage, content, scheduled_date: scheduled }),
        });
        j = await res.json();
        if (res.ok) {
          // after create, fetch scheduled info for the new id
          const newId = j.id || null
          if (newId) {
            const info = await fetchScheduledInfo(newId)
            if (info && info.scheduled) {
              // show saved time in admin-preferred timezone when available
              const localShown = info.utc && timezone ? new Date(info.utc).toLocaleString(undefined, { timeZone: timezone }) : info.serverLocal
              setMessage(`Saved — scheduled: ${localShown} (${timezone || 'server local'}) / UTC ${info.utc}`)
            } else {
              setMessage('Saved')
            }
          } else {
            setMessage('Saved')
          }
          setTitle('');
          setImage('');
          setContent('');
          setScheduledDate('');
          setImageFile(null);
          setLocalPreview('');
          setEditingId(null);
          // Refresh devotionals list from Supabase
          fetchDevotionals();
          return true
        } else {
          setMessage(j.error || 'Save failed');
          return false
        }
      }
    } catch {
      setMessage('Save failed');
      return false
    }
  }

  // Push to history on change
  useEffect(() => {
    if (history[historyIndex]?.title === title && history[historyIndex]?.content === content && history[historyIndex]?.image === image) return
    const newEntry = { title, content, image }
    const newHistory = history.slice(0, historyIndex + 1).concat([newEntry])
    // Keep undo history synchronized with editor changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [title, content, image, history, historyIndex])

    const undo = useCallback(() => {
      if (historyIndex > 0) {
        const prev = history[historyIndex - 1]
        setTitle(prev.title)
        setContent(prev.content)
        setImage(prev.image)
        setHistoryIndex(historyIndex - 1)
      }
    }, [historyIndex, history])

    const redo = useCallback(() => {
      if (historyIndex < history.length - 1) {
        const next = history[historyIndex + 1]
        setTitle(next.title)
        setContent(next.content)
        setImage(next.image)
        setHistoryIndex(historyIndex + 1)
      }
    }, [historyIndex, history])

    // Keyboard shortcuts for undo/redo
    useEffect(() => {
      function handler(e) {
        if (e.ctrlKey && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo() }
        if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) { e.preventDefault(); redo() }
      }
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }, [undo, redo])
  // ...existing code...

  // Autosave to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const data = { title, content, image, scheduledDate, timezone }
    localStorage.setItem('devotional_draft', JSON.stringify(data))
  }, [title, content, image, scheduledDate, timezone])
  async function login(e) {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setIsAuthed(true)
        setMessage('')
      } else {
        const next = attempts + 1
        setAttempts(next)
        const msgs = [
          'Is that you, Jezebel?',
          'Depart, tempter!',
          'Who walks in darkness?',
          'Do you mistake this for the wilderness?',
          'By what test do you come?',
          'Repent, wanderer!',
          'Is this a trial from the adversary?'
        ]
        let msg = msgs[Math.floor(Math.random() * msgs.length)]
        if (next >= 3) msg = 'The Lord sees your heart — cease these false keys.'
        if (next >= 6) msg = 'This is a reckoning; return with truth.'
        setMessage(msg)
      }
    } catch {
      setMessage('Login failed')
    }
  }

  // Note: `save` and `uploadFile` are implemented earlier in the file (single definitions).
  // The legacy duplicate definitions were removed to avoid redeclaration and lint errors.
  async function uploadFile(file) {
    // legacy immediate upload helper (returns url or empty string)
    if (!file) return ''
    try {
      const fd = new FormData()
      fd.append('file', file)
      const r = await fetch('/api/devotionals/upload', { method: 'POST', body: fd })
      const j = await r.json()
      if (r.ok && j.url) {
        setMessage('Image uploaded')
        return j.url
      } else {
        setMessage(j.error || 'Upload failed')
        return ''
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      setMessage(msg || 'Upload error')
      return ''
    }
  }

  function handleSelectFile(file) {
    if (!file) return
    setImageFile(file)
    try {
      const url = URL.createObjectURL(file)
      setLocalPreview(url)
    } catch {
      setLocalPreview('')
    }
    setMessage('Cover selected — will upload on publish')
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] selection:bg-jcc-navy selection:text-white px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-anton text-jcc-navy uppercase tracking-tight mb-2">JCC Editor</h1>
            <p className="text-gray-500 font-medium">Secure Access Required</p>
          </div>
          <form onSubmit={login} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10 space-y-6">
            <div>
              <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Authorization Key</label>
              <input
                id="admin-password"
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-gray-200 px-4 py-3 placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-jcc-navy focus:border-transparent transition-all"
                required
              />
            </div>
            <button type="submit" className="w-full bg-jcc-navy text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-jcc-gold hover:text-jcc-navy hover:shadow-lg transition-all duration-300">
              Unlock Workspace
            </button>
            {message && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 font-medium text-center">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    )
  }

  const isReadyToPublish = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fafafa] text-gray-900 pb-20 selection:bg-jcc-navy selection:text-white">
      
      {/* SaaS Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-anton uppercase text-jcc-navy tracking-wide">JCC Editor</h1>
            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-semibold uppercase tracking-widest hidden sm:inline-block">Devotionals</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); setIsAuthed(false); setPassword('') }} className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest">Sign Out</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* Editor vs Preview Segmented Control & Global Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner w-full sm:w-auto">
            <button onClick={() => setMode('edit')} className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${mode === 'edit' ? 'bg-white text-jcc-navy shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Edit Mode</button>
            <button onClick={() => setMode('preview')} className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${mode === 'preview' ? 'bg-jcc-navy text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Live Preview</button>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto pb-2 sm:pb-0">
            <button type="button" onClick={undo} className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-colors" title="Undo"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg></button>
            <button type="button" onClick={redo} className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-colors" title="Redo"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" /></svg></button>
            <button onClick={() => {
              localStorage.setItem('devotional_draft', JSON.stringify({ title, content, image }))
              setMessage('Draft saved locally')
            }} className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all uppercase tracking-widest text-center">Save Draft</button>
            
            <button disabled={!isReadyToPublish} onClick={async () => {
              const scheduled = scheduledDate ? new Date(scheduledDate) : null
              const now = new Date()
              let confirmMsg = ''
              if (scheduled && scheduled > now) {
                confirmMsg = `This will schedule the devotional for ${scheduled.toLocaleString()} (UTC ${scheduled.toISOString()}).\nProceed?`
              } else {
                confirmMsg = 'This will publish the devotional immediately. Proceed?'
              }
              if (!confirm(confirmMsg)) return

              const ok = await save()
              if (ok) {
                if (scheduled && scheduled > now) {
                  setToastText(`Scheduled for ${scheduled.toLocaleString()}`)
                } else {
                  setToastText('Published successfully')
                }
                setShowPublishToast(true)
                setTimeout(() => setShowPublishToast(false), 4000)
              }
            }} className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-center ${isReadyToPublish ? 'bg-jcc-navy text-white hover:bg-jcc-gold hover:text-jcc-navy shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Publish</button>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
          
          {/* Main Editing Area */}
          <div className="lg:col-span-8 space-y-8 min-w-0 w-full">
            
            {mode === 'edit' && (
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden animate-in fade-in">
                
                {/* Cover Image Dropzone */}
                <div className="relative group">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleSelectFile(f)
                  }} />
                  
                  {(localPreview || image) ? (
                    <div className="relative w-full h-[400px] bg-gray-100">
                      <Image src={localPreview || image} alt="Cover" fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform">Change Cover</button>
                        <button type="button" onClick={() => { setImage(''); setImageFile(null); if (localPreview) { URL.revokeObjectURL(localPreview); setLocalPreview('') } }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div onClick={() => fileInputRef.current?.click()} className="w-full h-[300px] bg-gray-50 border-b border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <p className="font-bold text-gray-700">Add a cover image</p>
                      <p className="text-sm text-gray-400 mt-1">High quality, wide aspect ratio recommended</p>
                    </div>
                  )}
                </div>

                {/* Title & Metadata Input */}
                <div className="p-5 sm:p-8 md:p-12">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Devotional Title..."
                    className="w-full bg-transparent text-3xl sm:text-4xl md:text-5xl font-anton uppercase text-jcc-navy placeholder-gray-200 outline-none mb-6 sm:mb-8 tracking-wide leading-[1.1]"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-100">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Publish Date (UTC)</label>
                      <input
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-jcc-navy focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Editor Timezone</label>
                      <input 
                        value={timezone} 
                        onChange={(e) => { setTimezone(e.target.value); localStorage.setItem('devotional_timezone', e.target.value) }} 
                        placeholder="e.g. Africa/Lagos" 
                        className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-jcc-navy focus:border-transparent outline-none transition-all" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Markdown Editor / Preview Area */}
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4 sm:p-8 md:p-12 animate-in fade-in">
              {mode === 'edit' ? (
                <div className="min-h-[500px]">
                  <ClientOnlyEditor content={content} setContent={setContent} onImageUpload={(url) => { setImage(url); setMessage('Image set as cover from editor') }} />
                </div>
              ) : (
                <div className="min-h-[500px] max-w-3xl mx-auto editor-preview">
                  {(localPreview || image) && (
                    <div className="relative w-full h-[50vh] mb-12 rounded-2xl overflow-hidden shadow-lg">
                      <Image src={localPreview || image} alt="Cover" fill className="absolute inset-0 w-full h-full object-cover" unoptimized />
                    </div>
                  )}
                  {title.trim() !== '' && (
                    <h1 className="mb-12 text-5xl md:text-7xl font-anton uppercase text-jcc-navy tracking-normal leading-[1.1]">{title}</h1>
                  )}
                  <div className="prose prose-lg md:prose-2xl prose-jcc mx-auto max-w-none
                    prose-headings:font-anton prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-jcc-navy prose-headings:mt-16 prose-headings:mb-0
                    prose-p:text-[#111] prose-p:leading-relaxed prose-p:font-medium prose-p:mt-0 prose-p:mb-3
                    prose-ul:mt-0 prose-ol:mt-0 prose-li:my-1
                    prose-strong:bg-jcc-gold/20 prose-strong:text-jcc-navy prose-strong:px-1
                    prose-blockquote:border-l-[12px] prose-blockquote:border-jcc-navy prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:my-12 prose-blockquote:font-anton prose-blockquote:text-3xl prose-blockquote:uppercase prose-blockquote:text-jcc-navy prose-blockquote:not-italic"
                    dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(content || '') }} 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Past Devotionals */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 min-w-0 w-full">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Library</h2>
                <button onClick={fetchDevotionals} className="text-xs font-bold text-jcc-navy hover:text-jcc-gold transition-colors">Refresh</button>
              </div>
              
              <div className="max-h-[70vh] overflow-y-auto">
                {devotionals.length === 0 && (
                  <div className="p-8 text-center text-gray-400 text-sm">No devotionals found.</div>
                )}
                <div className="divide-y divide-gray-100">
                  {devotionals.map((d) => {
                    const scheduledDate = d.scheduled_date ? new Date(d.scheduled_date) : null;
                    const isPublished = scheduledDate ? scheduledDate <= new Date() : true;
                    const isEditing = editingId === d.id;

                    return (
                      <div key={d.id} className={`p-5 transition-colors group ${isEditing ? 'bg-jcc-navy/5' : 'hover:bg-gray-50'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-bold truncate mb-1 ${isEditing ? 'text-jcc-navy' : 'text-gray-900'}`}>{d.title}</h3>
                            <p className="text-xs text-gray-500 truncate mb-3">
                              {scheduledDate ? scheduledDate.toLocaleString(undefined, {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              }) : 'Not scheduled'}
                            </p>
                            {isPublished ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">Published</span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">Scheduled</span>
                            )}
                          </div>
                          <button
                            onClick={() => loadDevotional(d.id)}
                            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${isEditing ? 'bg-jcc-navy text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 group-hover:border-gray-300 group-hover:text-gray-900'}`}
                          >
                            {isEditing ? 'Editing' : 'Edit'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <PublishToast show={showPublishToast} message={toastText} />
    </div>
  )
}

// Default export for Next.js app directory
export default function DevotionalsPage() {
  return <AdminApp />;
}
