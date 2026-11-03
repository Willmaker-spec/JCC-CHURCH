import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Image from 'next/image'
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import { registerEvent } from '@/lib/registerEvent'
import { supabase } from '@/lib/supabase'

export default function DynamicEventPage() {
  const { slug } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true

    async function loadEvent() {
      if (!supabase) {
        setMessage('Event details are temporarily unavailable.')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('events')
        .select('slug, title, tagline, description, event_date, event_time, location, event_type, image, registration_open')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()

      if (!active) return
      if (error) {
        console.error('Unable to load event:', error)
        setMessage('Unable to load this event right now. Please try again later.')
      } else if (!data) {
        setMessage('This event could not be found.')
      } else {
        setEvent(data)
        document.title = `${data.title} | Jubilee Christian Centre Church`
      }
      setLoading(false)
    }

    loadEvent()
    return () => {
      active = false
    }
  }, [slug])

  async function submitRegistration(e) {
    e.preventDefault()
    if (!event || !event.registration_open) return

    setSubmitting(true)
    setMessage('')
    try {
      await registerEvent(event.slug, form)
      setMessage('Thank you! Your registration has been received.')
      setForm({ fullName: '', email: '', phone: '' })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save your registration right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p className="px-6 py-24 text-center text-jcc-navy">Loading event…</p>
  }

  if (!event) {
    return (
      <main className="min-h-[60vh] px-6 py-24 text-center text-jcc-navy">
        <p role="status" className="mb-8">{message}</p>
        <Link to="/events" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest hover:text-jcc-gold">
          <ArrowLeft size={18} /> All events
        </Link>
      </main>
    )
  }

  const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-jcc-navy focus:outline-none focus:ring-2 focus:ring-jcc-navy/10'

  return (
    <main className="min-h-screen bg-[#fafafa] text-jcc-navy">
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-jcc-navy px-6 py-16 text-white md:min-h-[60vh] md:px-12">
        <Image src={event.image || '/images/event-hero.jpg'} alt="" fill priority unoptimized className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-jcc-navy via-jcc-navy/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <Link to="/events" className="mb-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-jcc-gold">
            <ArrowLeft size={18} /> All events
          </Link>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-jcc-gold">{event.event_type}</p>
          <h1 className="max-w-4xl font-anton text-5xl uppercase leading-[0.95] tracking-tight md:text-8xl">{event.title}</h1>
          {event.tagline && <p className="mt-5 max-w-2xl text-lg font-medium text-white/80 md:text-2xl">{event.tagline}</p>}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-5 md:px-12 md:py-24">
        <div className="space-y-8 md:col-span-3">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-bold uppercase tracking-widest text-jcc-navy/70">
            {(event.event_date || event.event_time) && (
              <span className="inline-flex items-center gap-2"><CalendarDays size={18} /> {[event.event_date, event.event_time].filter(Boolean).join(' · ')}</span>
            )}
            {event.location && <span className="inline-flex items-center gap-2"><MapPin size={18} /> {event.location}</span>}
          </div>
          {event.description && <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700">{event.description}</p>}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2 md:p-8">
          <h2 className="font-anton text-3xl uppercase">{event.registration_open ? 'Register for this event' : 'Registration closed'}</h2>
          {event.registration_open ? (
            <form onSubmit={submitRegistration} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Full name
                <input className={`${inputClass} mt-2`} autoComplete="name" value={form.fullName} onChange={e => setForm(current => ({ ...current, fullName: e.target.value }))} required maxLength={200} />
              </label>
              <label className="block text-sm font-semibold text-gray-700">
                Email
                <input className={`${inputClass} mt-2`} type="email" autoComplete="email" value={form.email} onChange={e => setForm(current => ({ ...current, email: e.target.value }))} required maxLength={320} />
              </label>
              <label className="block text-sm font-semibold text-gray-700">
                Phone
                <input className={`${inputClass} mt-2`} type="tel" autoComplete="tel" value={form.phone} onChange={e => setForm(current => ({ ...current, phone: e.target.value }))} required maxLength={40} />
              </label>
              <button type="submit" disabled={submitting} className="w-full rounded-xl bg-jcc-navy px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-jcc-gold hover:text-jcc-navy disabled:opacity-60">
                {submitting ? 'Submitting…' : 'Submit registration'}
              </button>
              {message && <p role="status" className="text-sm font-medium text-gray-700">{message}</p>}
            </form>
          ) : (
            <p className="mt-4 text-gray-600">Registration for this event is currently closed.</p>
          )}
        </div>
      </section>
    </main>
  )
}
