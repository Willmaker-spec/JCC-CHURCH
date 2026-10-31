"use client";

// markdown rendering moved to shared util
import { useRef, useState } from 'react';
// markdown rendering moved to shared util `lib/markdown.ts`

export default function ClientOnlyEditorInner({
  content,
  setContent,
  onImageUpload
}) {
  // Keyboard shortcuts
  function handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'b') {
      e.preventDefault();
      insertAtCursor('**', '**');
    }
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      insertAtCursor('*', '*');
    }
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      const url = prompt('Link URL');
      const text = prompt('Link text', 'link');
      if (url) insertAtCursor(`[${text || url}](${url})`);
    }
  }
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef(null);
  function insertAtCursor(before, after = '') {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart || 0;
    const end = ta.selectionEnd || 0;
    const value = ta.value;
    // Smart list handling
    if ((before === '\n- ' || before === '\n1. ') && start !== end) {
      // Get selected text
      const selected = value.slice(start, end);
      const lines = selected.split(/\r?\n/);
      let newLines;
      if (before === '\n- ') {
        // Unordered list
        newLines = lines.map(line => line.trim() ? `- ${line.replace(/^[-*+]\s+/, '')}` : '').join('\n');
      } else {
        // Ordered list
        let n = 1;
        newLines = lines.map(line => line.trim() ? `${n++}. ${line.replace(/^\d+\.\s+/, '')}` : '').join('\n');
      }
      const beforeText = value.slice(0, start);
      const afterText = value.slice(end);
      const newVal = beforeText + newLines + afterText;
      setContent(newVal);
      // restore focus and selection
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(start, start + newLines.length);
      });
      return;
    }
    // Default: just insert before/after
    const newVal = value.slice(0, start) + before + value.slice(start, end) + after + value.slice(end);
    setContent(newVal);
    // restore focus and selection
    requestAnimationFrame(() => {
      ta.focus();
      const cursor = start + before.length;
      ta.setSelectionRange(cursor, cursor + (end - start));
    });
  }
  async function handleImageFile(file) {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const r = await fetch('/api/devotionals/upload', {
        method: 'POST',
        body: fd
      });
      const j = await r.json();
      if (r.ok && j.url) {
        // insert markdown image syntax
        insertAtCursor(`![](${j.url})`);
        if (typeof onImageUpload === 'function') onImageUpload(j.url);
      } else {
        alert(j.error || 'Upload failed');
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      alert(msg || 'Upload error');
    } finally {
      setUploading(false);
    }
  }
  return <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-center gap-2 mb-4 bg-gray-50/80 border border-gray-100 p-2.5 rounded-xl shadow-sm">
        <button type="button" aria-label="Bold (Ctrl+B)" title="Bold (Ctrl+B)" onClick={() => insertAtCursor('**', '**')} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
          <span className="font-extrabold text-sm font-serif">B</span>
        </button>

        <button type="button" aria-label="Italic (Ctrl+I)" title="Italic (Ctrl+I)" onClick={() => insertAtCursor('*', '*')} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
          <span className="italic text-sm font-serif font-bold">I</span>
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <button type="button" aria-label="Heading 2" title="H2" onClick={() => insertAtCursor('\n## ', '\n')} className="px-3 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors font-bold text-xs">
          H2
        </button>

        <button type="button" aria-label="Heading 3" title="H3" onClick={() => insertAtCursor('\n### ', '\n')} className="px-3 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors font-bold text-xs">
          H3
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <button type="button" aria-label="Unordered list" title="Unordered list" onClick={() => insertAtCursor('\n- ', '')} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4 6a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 100-2 1 1 0 000 2zm0 6a1 1 0 100-2 1 1 0 000 2zm3-11h9v2H7V1zM7 9h9v2H7V9zM7 17h9v2H7v-2z" /></svg>
        </button>

        <button type="button" aria-label="Ordered list" title="Ordered list" onClick={() => insertAtCursor('\n1. ', '')} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4 3h2v2H4V3zm0 4h2v2H4V7zm0 4h2v2H4v-2zM7 3h9v2H7V3zm0 4h9v2H7V7zm0 4h9v2H7v-2z" /></svg>
        </button>

        <button type="button" aria-label="Blockquote" title="Quote" onClick={() => insertAtCursor('> ', '')} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
          <span className="text-lg font-serif leading-none mt-1">“</span>
        </button>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <button type="button" aria-label="Inline code" title="Code" onClick={() => insertAtCursor('`', '`')} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6" /><path d="M8 6L2 12l6 6" /></svg>
        </button>

        <button type="button" aria-label="Insert link" title="Link" onClick={() => {
        const url = prompt('Link URL');
        const text = prompt('Link text', 'link');
        if (url) insertAtCursor(`[${text || url}](${url})`);
      }} className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" /><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" /></svg>
        </button>

        <label className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors" title="Insert image">
          <input title="Select image file" type="file" accept="image/*" className="hidden" onChange={e => handleImageFile(e.target.files?.[0])} />
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M8 14l2.5-3 2.5 3 3.5-4.5" /></svg>
        </label>

        {uploading && <div className="text-xs font-bold uppercase tracking-widest text-tlcc-navy ml-auto px-2 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-tlcc-gold rounded-full animate-pulse" />Uploading...</div>}
      </div>

      <textarea ref={textareaRef} className="w-full flex-1 min-h-[500px] bg-white border border-gray-200 rounded-xl px-6 py-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tlcc-navy/20 focus:border-tlcc-navy transition-all resize-y font-mono text-sm leading-relaxed" value={content} onChange={e => setContent(e.target.value)} onKeyDown={handleKeyDown} placeholder="Write your devotional in Markdown..." title="Devotional Markdown Editor" />
    </div>;
}
