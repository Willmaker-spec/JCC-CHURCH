"use client"
import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'

import simpleMarkdownToHtml from '@/lib/markdown'
import PublishToast from '@/components/PublishToast'
import ClientOnlyEditor from '@/components/ClientOnlyEditor'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { uploadDevotionalImage } from '@/lib/uploadDevotionalImage'
import { deleteEventImage, uploadEventImage } from '@/lib/uploadEventImage'
import { ADMIN_AWAY_STORAGE_KEY, ADMIN_AWAY_TIMEOUT_MS } from '@/lib/adminSessionTimeout'


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

function toLocalDateTimeValue(value) {
  const date = new Date(value)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

const EMPTY_EVENT = {
  slug: '',
  title: '',
  tagline: '',
  description: '',
  event_date: '',
  event_time: '',
  event_start_at: '',
  location: '',
  event_type: 'Event',
  image: '/images/event-hero.jpg',
  is_published: false,
  registration_open: true,
}

const LEGACY_EVENT_TITLES = {
  'heart-room': 'The Heart Room',
  rooted: 'Rooted',
  manual: 'The Manual',
  'nation-takers-webinar': 'Nation Takers Career Webinar 1.0',
  'understanding-salvation': '4 Days of Understanding Salvation',
  'unlearning-conference': 'The Unlearning Conference',
}
const REGISTRATION_BATCH_SIZE = 500
const REGISTRATION_PAGE_SIZE = 25

function csvCell(value) {
  let text = String(value ?? '')
  if (/^[=+\-@]/.test(text.trimStart())) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

function registrationAnswerText(value) {
  if (typeof value === 'string') return value
  if (value === null || value === undefined) return ''
  return JSON.stringify(value)
}

function AdminEventRegistrations({ events }) {
  const [registrations, setRegistrations] = useState([])
  const [registrationsLoading, setRegistrationsLoading] = useState(true)
  const [registrationMessage, setRegistrationMessage] = useState('')
  const [registrationSearch, setRegistrationSearch] = useState('')
  const [registrationEventFilter, setRegistrationEventFilter] = useState('all')
  const [registrationPage, setRegistrationPage] = useState(1)
  const [reloadVersion, setReloadVersion] = useState(0)

  useEffect(() => {
    let active = true

    async function loadRegistrations() {
      try {
        const allRegistrations = []
        let offset = 0

        while (true) {
          const { data, error } = await supabase
            .from('event_registrations')
            .select('id, event_slug, full_name, email, phone, answers, created_at')
            .order('created_at', { ascending: false })
            .order('id', { ascending: false })
            .range(offset, offset + REGISTRATION_BATCH_SIZE - 1)

          if (error) throw new Error(error.message)
          if (!active) return

          allRegistrations.push(...(data || []))
          if (!data || data.length < REGISTRATION_BATCH_SIZE) break
          offset += REGISTRATION_BATCH_SIZE
        }

        if (active) {
          setRegistrations(allRegistrations)
          setRegistrationMessage('')
        }
      } catch (error) {
        if (!active) return
        console.error('Unable to load event registrations:', error)
        setRegistrationMessage(
          `Could not load registrations: ${error instanceof Error ? error.message : 'Please try again.'}`
        )
      } finally {
        if (active) setRegistrationsLoading(false)
      }
    }

    loadRegistrations()
    return () => {
      active = false
    }
  }, [reloadVersion])

  const eventTitle = slug => (
    events.find(event => event.slug === slug)?.title ||
    LEGACY_EVENT_TITLES[slug] ||
    slug.replace(/-/g, ' ')
  )
  const eventSlugs = [...new Set([
    ...events.map(event => event.slug),
    ...registrations.map(registration => registration.event_slug),
  ])].sort()
  const search = registrationSearch.trim().toLowerCase()
  const filteredRegistrations = registrations.filter(registration => {
    if (registrationEventFilter !== 'all' && registration.event_slug !== registrationEventFilter) return false
    if (!search) return true

    return [
      registration.full_name,
      registration.email,
      registration.phone,
      eventTitle(registration.event_slug),
    ].some(value => String(value || '').toLowerCase().includes(search))
  })
  const pageCount = Math.max(1, Math.ceil(filteredRegistrations.length / REGISTRATION_PAGE_SIZE))
  const currentPage = Math.min(registrationPage, pageCount)
  const pageStart = (currentPage - 1) * REGISTRATION_PAGE_SIZE
  const visibleRegistrations = filteredRegistrations.slice(pageStart, pageStart + REGISTRATION_PAGE_SIZE)

  function exportRegistrations() {
    const header = ['Event', 'Full name', 'Email', 'Phone', 'Registered at', 'Additional responses']
    const rows = filteredRegistrations.map(registration => [
      eventTitle(registration.event_slug),
      registration.full_name,
      registration.email,
      registration.phone,
      registration.created_at,
      JSON.stringify(registration.answers || {}),
    ])
    const csv = [header, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n')
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `jcc-event-registrations-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  function refreshRegistrations() {
    setRegistrationsLoading(true)
    setRegistrationMessage('')
    setRegistrationPage(1)
    setReloadVersion(version => version + 1)
  }

  return (
    <section aria-labelledby="registration-records-title" className="mt-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-5 border-b border-gray-100 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-jcc-gold-dark">Admin only · Private records</p>
          <h3 id="registration-records-title" className="mt-2 text-xl font-bold text-jcc-navy sm:text-2xl">Event registrations</h3>
          <p className="mt-1 text-sm text-gray-500">Attendee contact information and registration history.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={refreshRegistrations} disabled={registrationsLoading} className="rounded-lg border border-gray-300 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-jcc-navy hover:bg-white disabled:opacity-60">
            {registrationsLoading ? 'Loading…' : 'Refresh'}
          </button>
          <button type="button" onClick={exportRegistrations} disabled={registrationsLoading || filteredRegistrations.length === 0} className="rounded-lg bg-jcc-navy px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-jcc-navy-light disabled:cursor-not-allowed disabled:opacity-50">
            Export filtered CSV
          </button>
        </div>
      </div>

      <div className="grid gap-4 border-b border-gray-100 p-5 sm:grid-cols-2 sm:p-6">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Search records</span>
          <input
            type="search"
            value={registrationSearch}
            onChange={event => {
              setRegistrationSearch(event.target.value)
              setRegistrationPage(1)
            }}
            placeholder="Name, email, phone, or event"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-jcc-navy focus:ring-2 focus:ring-jcc-navy/10"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">Filter by event</span>
          <select
            value={registrationEventFilter}
            onChange={event => {
              setRegistrationEventFilter(event.target.value)
              setRegistrationPage(1)
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-jcc-navy focus:ring-2 focus:ring-jcc-navy/10"
          >
            <option value="all">All events</option>
            {eventSlugs.map(slug => <option key={slug} value={slug}>{eventTitle(slug)}</option>)}
          </select>
        </label>
      </div>

      {registrationMessage && <p role="alert" className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:m-6">{registrationMessage}</p>}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-white text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <tr>
              <th scope="col" className="px-5 py-4 sm:px-6">Attendee</th>
              <th scope="col" className="px-5 py-4">Event</th>
              <th scope="col" className="px-5 py-4">Phone</th>
              <th scope="col" className="px-5 py-4">Registered</th>
              <th scope="col" className="px-5 py-4 sm:px-6">Responses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {registrationsLoading ? (
              <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">Loading registration records…</td></tr>
            ) : visibleRegistrations.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                {registrationMessage
                  ? 'Registration records could not be displayed.'
                  : registrations.length === 0
                    ? 'No event registrations have been received yet.'
                    : 'No registrations match these filters.'}
              </td></tr>
            ) : visibleRegistrations.map(registration => {
              const answers = Object.entries(registration.answers || {})
              const registeredAt = new Date(registration.created_at)
              const event = events.find(item => item.slug === registration.event_slug)
              return <tr key={registration.id} className="align-top hover:bg-slate-50/70">
                <td className="px-5 py-4 sm:px-6">
                  <p className="font-semibold text-gray-900">{registration.full_name}</p>
                  <a href={`mailto:${registration.email}`} className="mt-1 inline-block text-xs text-jcc-navy underline decoration-jcc-navy/30 underline-offset-2 hover:text-jcc-orange">{registration.email}</a>
                </td>
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-700">{eventTitle(registration.event_slug)}</p>
                  {event?.event_date && <p className="mt-1 text-xs text-gray-500">{event.event_date}{event.event_time && ` · ${event.event_time}`}</p>}
                </td>
                <td className="px-5 py-4">
                  <a href={`tel:${registration.phone}`} className="text-gray-700 hover:text-jcc-orange">{registration.phone}</a>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                  {Number.isNaN(registeredAt.getTime()) ? 'Unknown' : registeredAt.toLocaleString()}
                </td>
                <td className="px-5 py-4 sm:px-6">
                  {answers.length === 0 ? <span className="text-gray-400">—</span> : (
                    <details className="max-w-xs">
                      <summary className="cursor-pointer font-semibold text-jcc-navy hover:text-jcc-orange">{answers.length} response{answers.length === 1 ? '' : 's'}</summary>
                      <dl className="mt-3 space-y-2">
                        {answers.map(([question, answer]) => <div key={question}>
                          <dt className="text-xs font-bold text-gray-600">{question}</dt>
                          <dd className="whitespace-pre-wrap break-words text-xs text-gray-500">{registrationAnswerText(answer)}</dd>
                        </div>)}
                      </dl>
                    </details>
                  )}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs text-gray-500">
          {registrationsLoading ? ' ' : filteredRegistrations.length === 0
            ? '0 registrations'
            : `Showing ${pageStart + 1}–${Math.min(pageStart + REGISTRATION_PAGE_SIZE, filteredRegistrations.length)} of ${filteredRegistrations.length} registrations`}
        </p>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setRegistrationPage(page => Math.max(1, page - 1))} disabled={currentPage <= 1 || registrationsLoading} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-jcc-navy hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
          <span className="text-xs font-semibold text-gray-500">Page {currentPage} of {pageCount}</span>
          <button type="button" onClick={() => setRegistrationPage(page => Math.min(pageCount, page + 1))} disabled={currentPage >= pageCount || registrationsLoading} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-jcc-navy hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
        </div>
      </div>
    </section>
  )
}

function AdminEventsManager() {
  const [events, setEvents] = useState([])
  const [eventForm, setEventForm] = useState(EMPTY_EVENT)
  const [editingSlug, setEditingSlug] = useState(null)
  const [eventMessage, setEventMessage] = useState('')
  const [eventLoading, setEventLoading] = useState(true)
  const [savingEvent, setSavingEvent] = useState(false)
  const [deletingSlug, setDeletingSlug] = useState(null)
  const [eventImageFile, setEventImageFile] = useState(null)

  const fetchEvents = useCallback(() => (
    supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })
  ), [])

  useEffect(() => {
    let active = true
    fetchEvents()
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          console.error('Unable to load events:', error)
          setEventMessage('Could not load events. Run the dynamic events database setup in Supabase.')
        } else {
          setEvents(data || [])
          setEventMessage('')
        }
        setEventLoading(false)
      })
      .catch(error => {
        if (!active) return
        console.error('Unable to load events:', error)
        setEventMessage('Could not load events. Please check your Supabase connection.')
        setEventLoading(false)
      })
    return () => {
      active = false
    }
  }, [fetchEvents])

  async function refreshEvents() {
    setEventLoading(true)
    try {
      const { data, error } = await fetchEvents()
      if (error) {
        console.error('Unable to load events:', error)
        setEventMessage('Could not load events. Run the dynamic events database setup in Supabase.')
      } else {
        setEvents(data || [])
        setEventMessage('')
      }
    } catch (error) {
      console.error('Unable to load events:', error)
      setEventMessage('Could not load events. Please check your Supabase connection.')
    } finally {
      setEventLoading(false)
    }
  }

  function updateEventField(name, value) {
    setEventForm(current => ({
      ...current,
      [name]: value,
      ...(name === 'title' && !editingSlug
        ? { slug: value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }
        : {}),
    }))
  }

  function editEvent(event) {
    setEditingSlug(event.slug)
    setEventImageFile(null)
    setEventForm({
      slug: event.slug,
      title: event.title,
      tagline: event.tagline || '',
      description: event.description || '',
      event_date: event.event_date || '',
      event_time: event.event_time || '',
      event_start_at: event.event_start_at ? toLocalDateTimeValue(event.event_start_at) : '',
      location: event.location || '',
      event_type: event.event_type || 'Event',
      image: event.image || '/images/event-hero.jpg',
      is_published: event.is_published,
      registration_open: event.registration_open,
    })
    setEventMessage('')
  }

  function resetEventForm() {
    setEditingSlug(null)
    setEventForm(EMPTY_EVENT)
    setEventImageFile(null)
    setEventMessage('')
  }

  async function saveEvent(event) {
    event.preventDefault()
    if (!eventForm.slug || !eventForm.title.trim()) {
      setEventMessage('Add an event title so a valid URL can be created.')
      return
    }

    const startsAt = eventForm.event_start_at ? new Date(eventForm.event_start_at) : null
    if (eventForm.is_published && (!startsAt || !Number.isFinite(startsAt.getTime()))) {
      setEventMessage('Set an exact start date and time before publishing this event.')
      return
    }
    if (eventForm.is_published && startsAt <= new Date()) {
      setEventMessage('Published events must have a future start date and time.')
      return
    }

    setSavingEvent(true)
    setEventMessage('')
    let uploadedImageUrl = null
    try {
      if (eventImageFile) uploadedImageUrl = await uploadEventImage(eventImageFile)

      const payload = {
        ...eventForm,
        title: eventForm.title.trim(),
        slug: eventForm.slug.trim().toLowerCase(),
        image: uploadedImageUrl || eventForm.image.trim() || '/images/event-hero.jpg',
        event_start_at: startsAt ? startsAt.toISOString() : null,
        updated_at: new Date().toISOString(),
      }
      const previousImage = events.find(item => item.slug === editingSlug)?.image
      const result = editingSlug
        ? await supabase.from('events').update(payload).eq('slug', editingSlug).select().single()
        : await supabase.from('events').insert(payload).select().single()

      if (result.error) {
        console.error('Unable to save event:', result.error)
        if (uploadedImageUrl) {
          try {
            await deleteEventImage(uploadedImageUrl)
          } catch (cleanupError) {
            console.error('Unable to clean up the unused event image:', cleanupError)
          }
        }
        setEventMessage(result.error.code === '23505'
          ? 'That event URL is already in use.'
          : `Could not save event: ${result.error.message}`)
        return
      }

      setEvents(current => [
        result.data,
        ...current.filter(item => item.slug !== editingSlug && item.slug !== result.data.slug),
      ])
      setEditingSlug(result.data.slug)
      setEventImageFile(null)

      let successMessage = payload.is_published ? 'Event saved and published.' : 'Event saved as a draft.'
      if (uploadedImageUrl && previousImage && previousImage !== uploadedImageUrl) {
        try {
          await deleteEventImage(previousImage)
        } catch (cleanupError) {
          console.error('Unable to remove the replaced event image:', cleanupError)
          successMessage += ' The previous image could not be removed from storage.'
        }
      }
      setEventMessage(successMessage)
    } catch (error) {
      console.error('Unable to save event:', error)
      if (uploadedImageUrl) {
        try {
          await deleteEventImage(uploadedImageUrl)
        } catch (cleanupError) {
          console.error('Unable to clean up the unused event image:', cleanupError)
        }
      }
      setEventMessage(`Could not save event: ${error instanceof Error ? error.message : 'Please try again.'}`)
    } finally {
      setSavingEvent(false)
    }
  }

  async function deleteEvent(event) {
    if (!window.confirm(`Delete "${event.title}"? Existing registration records will remain.`)) return

    setDeletingSlug(event.slug)
    setEventMessage('')
    try {
      const { error } = await supabase.from('events').delete().eq('slug', event.slug)
      if (error) {
        console.error('Unable to delete event:', error)
        setEventMessage(`Could not delete event: ${error.message}`)
        return
      }

      setEvents(current => current.filter(item => item.slug !== event.slug))
      if (editingSlug === event.slug) resetEventForm()
      try {
        await deleteEventImage(event.image)
      } catch (imageError) {
        console.error('Event deleted, but its image could not be removed:', imageError)
        setEventMessage(`Deleted "${event.title}", but its image could not be removed from storage.`)
        return
      }
      setEventMessage(`Deleted "${event.title}".`)
    } catch (error) {
      console.error('Unable to delete event:', error)
      setEventMessage(`Could not delete event: ${error instanceof Error ? error.message : 'Please try again.'}`)
    } finally {
      setDeletingSlug(null)
    }
  }

  const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-jcc-navy focus:outline-none focus:ring-2 focus:ring-jcc-navy/10'
  const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500'

  return (
    <section className="mt-16 border-t-4 border-jcc-navy pt-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-jcc-gold">Site management</p>
          <h2 className="mt-2 font-anton text-4xl uppercase text-jcc-navy md:text-5xl">Events</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Add an event here and it will appear on the Events page when published. New events use the standard name, email, and phone registration form.
          </p>
        </div>
        <button type="button" onClick={resetEventForm} className="rounded-xl border-2 border-jcc-navy px-5 py-3 text-xs font-bold uppercase tracking-widest text-jcc-navy hover:bg-jcc-navy hover:text-white">
          New event
        </button>
      </div>

      {eventMessage && <p role="status" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">{eventMessage}</p>}

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={saveEvent} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-3">
          <h3 className="font-bold uppercase tracking-widest text-jcc-navy">{editingSlug ? 'Edit event' : 'Create event'}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClass}>Event title *</span>
              <input className={inputClass} value={eventForm.title} onChange={e => updateEventField('title', e.target.value)} required maxLength={160} />
            </label>
            <label>
              <span className={labelClass}>URL slug</span>
              <input className={`${inputClass} bg-gray-50`} value={eventForm.slug} readOnly aria-describedby="event-slug-help" />
              <span id="event-slug-help" className="mt-1 block text-xs text-gray-400">Generated from the title. This becomes the event URL.</span>
            </label>
          </div>
          <label className="block">
            <span className={labelClass}>Short tagline</span>
            <input className={inputClass} value={eventForm.tagline} onChange={e => updateEventField('tagline', e.target.value)} maxLength={180} />
          </label>
          <label className="block">
            <span className={labelClass}>Description</span>
            <textarea className={inputClass} rows={4} value={eventForm.description} onChange={e => updateEventField('description', e.target.value)} maxLength={4000} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className={labelClass}>Date shown to visitors</span>
              <input className={inputClass} value={eventForm.event_date} onChange={e => updateEventField('event_date', e.target.value)} placeholder="e.g. Saturday, December 12" required={eventForm.is_published} maxLength={120} />
            </label>
            <label>
              <span className={labelClass}>Time shown to visitors</span>
              <input className={inputClass} value={eventForm.event_time} onChange={e => updateEventField('event_time', e.target.value)} placeholder="e.g. 10:00 AM WAT" required={eventForm.is_published} maxLength={120} />
            </label>
            <label>
              <span className={labelClass}>Location</span>
              <input className={inputClass} value={eventForm.location} onChange={e => updateEventField('location', e.target.value)} maxLength={240} />
            </label>
            <label>
              <span className={labelClass}>Event category</span>
              <input className={inputClass} value={eventForm.event_type} onChange={e => updateEventField('event_type', e.target.value)} maxLength={80} />
            </label>
          </div>
          <label className="block">
            <span className={labelClass}>Exact start date and time{eventForm.is_published ? ' *' : ''}</span>
            <input
              className={inputClass}
              type="datetime-local"
              value={eventForm.event_start_at}
              onChange={e => updateEventField('event_start_at', e.target.value)}
              required={eventForm.is_published}
              aria-describedby="event-start-help"
            />
            <span id="event-start-help" className="mt-2 block text-xs leading-relaxed text-gray-500">
              Used for the live countdown. Enter it in your device&apos;s local time zone, and include the event&apos;s time zone in the visitor-facing time above.
            </span>
          </label>
          <label className="block">
            <span className={labelClass}>Image URL (optional)</span>
            <input className={inputClass} value={eventForm.image} onChange={e => updateEventField('image', e.target.value)} placeholder="/images/event-hero.jpg or a public image URL" maxLength={1000} />
          </label>
          <label className="block">
            <span className={labelClass}>Or upload an event image</span>
            <input
              key={eventImageFile ? eventImageFile.name : 'no-event-image'}
              className={`${inputClass} file:mr-4 file:rounded-lg file:border-0 file:bg-jcc-navy file:px-4 file:py-2 file:text-xs file:font-bold file:text-white`}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={e => setEventImageFile(e.target.files?.[0] || null)}
            />
            <span className="mt-2 block text-xs text-gray-500">JPG, PNG, WebP, or GIF; maximum 5 MB. A new upload replaces the current event image.</span>
            {eventImageFile && <span className="mt-1 block text-xs font-semibold text-jcc-navy">Selected: {eventImageFile.name}</span>}
          </label>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input type="checkbox" checked={eventForm.is_published} onChange={e => updateEventField('is_published', e.target.checked)} />
              Publish on Events page
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input type="checkbox" checked={eventForm.registration_open} onChange={e => updateEventField('registration_open', e.target.checked)} />
              Accept registrations
            </label>
          </div>
          <button type="submit" disabled={savingEvent} className="rounded-xl bg-jcc-navy px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-jcc-gold hover:text-jcc-navy disabled:opacity-60">
            {savingEvent ? 'Saving…' : editingSlug ? 'Save changes' : 'Create event'}
          </button>
        </form>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 p-5">
            <h3 className="font-bold uppercase tracking-widest text-jcc-navy">Managed events</h3>
            <button type="button" onClick={refreshEvents} className="text-xs font-bold uppercase tracking-widest text-jcc-navy hover:text-jcc-gold">Refresh</button>
          </div>
          <div className="max-h-[620px] overflow-y-auto">
            {eventLoading ? <p className="p-6 text-sm text-gray-500">Loading events…</p> : events.length === 0 ? (
              <p className="p-6 text-sm text-gray-500">No admin-created events yet.</p>
            ) : events.map(event => (
              <div key={event.slug} className="flex items-start gap-3 border-b border-gray-100 p-4">
                <button type="button" onClick={() => editEvent(event)} className="min-w-0 flex-1 text-left">
                  <span className="block truncate font-bold text-gray-900">{event.title}</span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {event.is_published ? 'Published' : 'Draft'} · {event.registration_open ? 'Registration open' : 'Registration closed'}
                    {event.event_start_at && ` · ${new Date(event.event_start_at).toLocaleString()}`}
                  </span>
                </button>
                <button type="button" onClick={() => deleteEvent(event)} disabled={deletingSlug === event.slug} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold uppercase text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60">
                  {deletingSlug === event.slug ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdminEventRegistrations events={events} />
    </section>
  )
}

function AdminApp() {
  const [initialDraft] = useState(readInitialDraft)
  // All state declarations at the very top
  const [email, setEmail] = useState('')
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
  const [showPublishToast, setShowPublishToast] = useState(false)
  const [toastText, setToastText] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured)
  const [mode, setMode] = useState('edit')
  const fileInputRef = useRef(null)
  // Undo/redo stacks
  const [history, setHistory] = useState([{ title: '', content: '', image: '' }])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [devotionals, setDevotionals] = useState([])
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    if (!supabase) return

    let active = true
    async function restoreAdminSession() {
      const awaySinceValue = window.sessionStorage.getItem(ADMIN_AWAY_STORAGE_KEY)
      if (awaySinceValue) {
        const awayDuration = Date.now() - Number(awaySinceValue)
        if (Number.isFinite(awayDuration) && awayDuration >= ADMIN_AWAY_TIMEOUT_MS) {
          try {
            const { error: signOutError } = await supabase.auth.signOut()
            if (signOutError) {
              console.error('Unable to expire the admin session:', signOutError)
              if (active) setMessage('Your admin session expired, but sign-out could not be completed. Please try again.')
            } else {
              window.sessionStorage.removeItem(ADMIN_AWAY_STORAGE_KEY)
              if (active) setMessage('Your admin session expired after one minute away. Please sign in again.')
            }
          } catch (error) {
            console.error('Unable to expire the admin session:', error)
            if (active) setMessage('Your admin session expired, but sign-out could not be completed. Please try again.')
          }
          if (active) setAuthLoading(false)
          return
        }
        window.sessionStorage.removeItem(ADMIN_AWAY_STORAGE_KEY)
      }

      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Unable to restore admin session:', error)
        if (active) setMessage('Could not check your sign-in. Please refresh and try again.')
      } else if (session) {
        const { data, error: roleError } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', session.user.id)
          .maybeSingle()
        if (roleError) {
          console.error('Unable to check admin access:', roleError)
          if (active) setMessage(`Could not verify admin access: ${roleError.message}. Confirm the database setup has been run.`)
        } else if (active && data) {
          setEmail(session.user.email || '')
          setIsAuthed(true)
          setIsAdmin(true)
        } else if (active) {
          await supabase.auth.signOut()
          setMessage('This signed-in user is not an admin. Add its Auth user ID to public.admin_users.')
        }
      }
      if (active) setAuthLoading(false)
    }

    restoreAdminSession()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!isAdmin || !supabase) return

    let active = true
    async function loadDevotionals() {
      const { data, error } = await supabase
        .from('devotionals')
        .select('id, title, image, content, scheduled_date')
        .order('scheduled_date', { ascending: false })
      if (!active) return
      if (error) {
        console.error('Unable to load admin devotionals:', error)
        setMessage('Could not load the devotional library. Check the database policies.')
      } else {
        setDevotionals(data || [])
      }
    }

    loadDevotionals()
    return () => {
      active = false
    }
  }, [isAdmin])

  async function save() {
    if (!supabase || !isAdmin) {
      setMessage('Sign in with an authorized admin account to publish.')
      return false
    }
    try {
      const imageUrl = imageFile ? await uploadDevotionalImage(imageFile) : image
      const scheduled = scheduledDate
        ? new Date(scheduledDate).toISOString()
        : new Date().toISOString()
      const devotional = {
        title: title.trim(),
        image: imageUrl,
        content,
        scheduled_date: scheduled,
        updated_at: new Date().toISOString(),
      }
      const result = editingId
        ? await supabase.from('devotionals').update(devotional).eq('id', editingId).select().single()
        : await supabase.from('devotionals').insert(devotional).select().single()

      if (result.error) {
        console.error('Unable to save devotional:', result.error)
        setMessage('Could not save the devotional. Check the database policies and required fields.')
        return false
      }

      setImage(imageUrl)
      setImageFile(null)
      if (localPreview) URL.revokeObjectURL(localPreview)
      setLocalPreview('')
      setEditingId(result.data.id)
      setDevotionals(current => [
        result.data,
        ...current.filter(item => item.id !== result.data.id),
      ].sort((a, b) => new Date(b.scheduled_date) - new Date(a.scheduled_date)))
      setMessage('Devotional saved.')
      return true
    } catch (error) {
      console.error('Unable to save devotional:', error)
      setMessage(error instanceof Error ? error.message : 'Could not save the devotional.')
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
    if (!supabase) {
      setMessage('Add your Supabase URL and publishable key to .env, then restart the app.')
      return
    }

    setMessage('')
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) {
      console.error('Supabase admin sign-in failed:', error)
      setMessage(`Sign-in failed: ${error.message}`)
      return
    }

    const { data: admin, error: roleError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle()
    if (roleError) {
      console.error('Unable to verify admin access:', roleError)
      await supabase.auth.signOut()
      setMessage(`Signed in, but admin access could not be checked: ${roleError.message}. Run the database setup SQL first.`)
    } else if (!admin) {
      await supabase.auth.signOut()
      setMessage('Your login is valid, but this user is not an admin yet. Add its Auth user ID to public.admin_users.')
    } else {
      setIsAuthed(true)
      setIsAdmin(true)
      setMessage('')
    }
  }

  function loadDevotional(devotional) {
    setTitle(devotional.title || '')
    setImage(devotional.image || '')
    setContent(devotional.content || '')
    setScheduledDate(devotional.scheduled_date ? toLocalDateTimeValue(devotional.scheduled_date) : '')
    setEditingId(devotional.id)
    setImageFile(null)
    setLocalPreview('')
    setMode('edit')
    setMessage(`Editing “${devotional.title}”.`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function startNewDevotional() {
    setTitle('')
    setImage('')
    setContent('')
    setScheduledDate('')
    setEditingId(null)
    setImageFile(null)
    if (localPreview) URL.revokeObjectURL(localPreview)
    setLocalPreview('')
    setMessage('')
    setMode('edit')
  }

  async function deleteDevotional(devotional) {
    const confirmed = window.confirm(
      `Delete "${devotional.title}" permanently? This cannot be undone.`,
    )
    if (!confirmed) return

    const { error } = await supabase
      .from('devotionals')
      .delete()
      .eq('id', devotional.id)

    if (error) {
      console.error('Unable to delete devotional:', error)
      setMessage(`Could not delete "${devotional.title}". Check your database permissions and try again.`)
      return
    }

    setDevotionals(current => current.filter(item => item.id !== devotional.id))
    if (editingId === devotional.id) startNewDevotional()
    setMessage(`Deleted "${devotional.title}".`)
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Unable to sign out:', error)
      setMessage('Sign-out failed. Please try again.')
      return
    }
    setIsAuthed(false)
    setIsAdmin(false)
    setPassword('')
  }

  function handleSelectFile(file) {
    if (!file) return
    if (localPreview) URL.revokeObjectURL(localPreview)
    try {
      const url = URL.createObjectURL(file)
      setImageFile(file)
      setLocalPreview(url)
    } catch {
      setLocalPreview('')
      setImageFile(file)
    }
    setMessage('Cover selected. It will upload when you save the devotional.')
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-7 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-jcc-navy" />
          <p className="text-sm font-semibold text-slate-700">Checking admin access…</p>
          <p className="mt-1 text-xs text-slate-500">Securely connecting to your workspace</p>
        </div>
      </div>
    )
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div role="alert" className="max-w-lg rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Workspace setup required</p>
          <h1 className="mt-3 text-xl font-bold text-slate-900">Connect your admin workspace</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Add your Supabase URL and publishable key to .env, then restart the app.</p>
        </div>
      </div>
    )
  }

  if (!isAuthed) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 selection:bg-jcc-navy selection:text-white">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-jcc-navy via-jcc-gold to-jcc-navy" />
        <div aria-hidden="true" className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-jcc-navy/[0.04] blur-3xl" />
        <div className="relative w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-jcc-navy text-xl font-bold text-white shadow-lg shadow-jcc-navy/15">J</div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-jcc-gold-dark">Jubilee Christian Centre</p>
            <h1 className="mt-2 font-anton text-4xl uppercase tracking-tight text-jcc-navy">Admin workspace</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to manage devotionals and events.</p>
          </div>
          <form onSubmit={login} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/[0.04] sm:p-9">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-500">Enter your administrator credentials to continue.</p>
            </div>
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-600">Email address</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-jcc-navy focus:ring-4 focus:ring-jcc-navy/10"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-600">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-jcc-navy focus:ring-4 focus:ring-jcc-navy/10"
                required
              />
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-jcc-navy py-3.5 text-sm font-bold text-white shadow-md shadow-jcc-navy/15 transition hover:bg-jcc-navy-light focus:outline-none focus:ring-4 focus:ring-jcc-navy/20">
              Sign in to workspace
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </button>
            {message && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium leading-5 text-red-700">
                {message}
              </div>
            )}
          </form>
          <p className="mt-6 text-center text-xs text-slate-400">Authorized JCC administrators only</p>
        </div>
      </div>
    )
  }

  const isReadyToPublish = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-900 pb-20 selection:bg-jcc-navy selection:text-white">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jcc-navy font-anton text-lg text-white">J</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-wide text-jcc-navy">JCC Admin</p>
              <p className="hidden text-xs text-slate-500 sm:block">Content management workspace</p>
            </div>
            <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 md:inline-flex">Devotionals</span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button type="button" onClick={startNewDevotional} className="rounded-lg bg-jcc-navy px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-jcc-navy-light focus:outline-none focus:ring-4 focus:ring-jcc-navy/20 sm:px-4 sm:text-sm">
              + <span className="hidden sm:inline">New devotional</span><span className="sm:hidden">New</span>
            </button>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:px-4 sm:text-sm"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3H9m0 0 3-3m-3 3 3 3" /></svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-7xl px-4 sm:mt-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-jcc-gold-dark">Editorial</p>
            <h1 className="mt-1 font-anton text-3xl uppercase tracking-wide text-jcc-navy sm:text-4xl">Devotional editor</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Create, schedule, and publish devotionals for your church community.</p>
          </div>
          <div className="hidden items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Admin access active
          </div>
        </div>

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
          <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800 font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
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
                        <button type="button" onClick={() => { setImage(''); if (localPreview) { URL.revokeObjectURL(localPreview); setLocalPreview('') } }} className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-xl hover:scale-105 transition-transform">Remove</button>
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
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Publish Date &amp; Time (local)</label>
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
                <button onClick={() => {
                  if (!supabase) return
                  supabase.from('devotionals')
                    .select('id, title, image, content, scheduled_date')
                    .order('scheduled_date', { ascending: false })
                    .then(({ data, error }) => {
                      if (error) {
                        console.error('Unable to refresh devotional library:', error)
                        setMessage('Could not refresh the devotional library.')
                      } else {
                        setDevotionals(data || [])
                      }
                    })
                }} className="text-xs font-bold text-jcc-navy hover:text-jcc-gold transition-colors">Refresh</button>
              </div>
              
              <div className="max-h-[70vh] overflow-y-auto">
                {devotionals.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">No devotionals yet. Create your first post.</div>
                ) : devotionals.map((devotional) => {
                  const scheduled = new Date(devotional.scheduled_date)
                  const published = scheduled <= new Date()
                  return (
                    <div
                      key={devotional.id}
                      className={`flex items-center gap-3 border-b border-gray-100 p-5 transition-colors hover:bg-gray-50 ${editingId === devotional.id ? 'bg-jcc-navy/5' : ''}`}
                    >
                      <button
                        type="button"
                        onClick={() => loadDevotional(devotional)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <span className="block truncate font-bold text-gray-900">{devotional.title}</span>
                        <span className="mt-1 block text-xs text-gray-500">{scheduled.toLocaleString()} · {published ? 'Published' : 'Scheduled'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDevotional(devotional)}
                        aria-label={`Delete ${devotional.title}`}
                        className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold uppercase tracking-wide text-red-700 transition-colors hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
        <AdminEventsManager />
      </main>

      <PublishToast show={showPublishToast} message={toastText} />
    </div>
  )
}

// Default export for Next.js app directory
export default function DevotionalsPage() {
  return <AdminApp />;
}
