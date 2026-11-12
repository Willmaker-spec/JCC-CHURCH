"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function getLegacyEventStart(event) {
  if (!event.event_date || !event.event_time) return null;
  const timestamp = Date.parse(`${event.event_date} ${event.event_time}`);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

function EventCountdown({ startsAt }) {
  const timestamp = startsAt ? Date.parse(startsAt) : Number.NaN;
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (!Number.isFinite(timestamp)) return;

    let intervalId;
    const updateCountdown = () => {
      const now = Date.now();
      setCurrentTime(now);
      if (now >= timestamp) window.clearInterval(intervalId);
    };
    const timeoutId = window.setTimeout(updateCountdown, 0);
    intervalId = window.setInterval(updateCountdown, 1000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [timestamp]);

  if (!startsAt || !Number.isFinite(timestamp)) {
    return <p className="mt-5 rounded-xl bg-[#f7f8fa] px-4 py-3 text-xs font-semibold text-jcc-navy/60">Next date and time to be announced</p>;
  }
  if (currentTime === null) {
    return <p className="mt-5 rounded-xl bg-[#f7f8fa] px-4 py-3 text-xs font-semibold text-jcc-navy/60">Preparing countdown…</p>;
  }

  const secondsLeft = Math.max(0, Math.floor((timestamp - currentTime) / 1000));
  if (secondsLeft === 0) {
    return <p className="mt-5 rounded-xl bg-jcc-cream px-4 py-3 text-xs font-bold text-jcc-navy">This gathering is underway</p>;
  }

  const units = [
    { label: 'Days', value: Math.floor(secondsLeft / 86400) },
    { label: 'Hours', value: Math.floor((secondsLeft % 86400) / 3600) },
    { label: 'Mins', value: Math.floor((secondsLeft % 3600) / 60) },
    { label: 'Secs', value: secondsLeft % 60 },
  ];

  return <div className="mt-5 rounded-xl bg-[#f7f8fa] p-4">
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-jcc-navy/55">Countdown to start</p>
    <div role="timer" aria-live="off" aria-label={`Starts in ${units.map(unit => `${unit.value} ${unit.label.toLowerCase()}`).join(', ')}`} className="grid grid-cols-4 gap-2">
      {units.map(unit => <div key={unit.label} className="rounded-lg bg-white px-2 py-2 text-center">
        <span className="block font-mono text-lg font-bold tabular-nums text-jcc-navy sm:text-xl">{String(unit.value).padStart(2, '0')}</span>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-jcc-navy/50">{unit.label}</span>
      </div>)}
    </div>
  </div>;
}

const isUpcomingEvent = event => {
  const startsAt = Date.parse(event.event_start_at);
  if (Number.isFinite(startsAt)) return startsAt > Date.now();

  const date = event.event_date?.trim();
  if (!date) return true;
  if (/\b(ended|past|finished|concluded|archived|cancelled|canceled)\b/i.test(date)) return false;

  const timestamp = Date.parse(date);
  if (Number.isNaN(timestamp)) return true;

  const eventDay = new Date(timestamp);
  eventDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDay >= today;
};

export default function EventsPage() {
  const [dynamicEvents, setDynamicEvents] = useState([]);
  const displayedEvents = dynamicEvents;

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    async function loadPublishedEvents() {
      let result = await supabase
        .from('events')
        .select('slug, title, tagline, description, event_date, event_time, event_start_at, location, event_type, image')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (result.error?.code === '42703' && result.error.message.includes('event_start_at')) {
        console.warn('Event countdown migration is not applied; using legacy event dates until it is run.');
        result = await supabase
          .from('events')
          .select('slug, title, tagline, description, event_date, event_time, location, event_type, image')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
      }

      if (!active) return;
      if (result.error) {
        console.error('Unable to load published events:', result.error);
        return;
      }

      setDynamicEvents((result.data || []).filter(isUpcomingEvent).map(event => ({
          id: event.slug,
          title: event.title,
          tagline: event.tagline,
          description: event.description,
          date: event.event_date,
          time: event.event_time,
          location: event.location,
          type: event.event_type,
          image: event.image || '/images/event-hero.jpg',
          startsAt: event.event_start_at || getLegacyEventStart(event),
          ctaLabel: 'View event details',
          ctaLink: `/events/${event.slug}`,
        })));
    }

    loadPublishedEvents().catch(error => {
      if (!active) return;
      console.error('Unable to load published events:', error);
    });

    return () => {
      active = false;
    };
  }, []);

  return <main className="min-h-screen bg-[#f8f7f3] text-jcc-navy">
    <section className="relative overflow-hidden bg-jcc-navy text-white">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-jcc-gold/10 blur-3xl" />
      <div className="container relative mx-auto grid items-center gap-12 px-4 pb-14 pt-24 sm:px-6 md:pb-20 md:pt-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-jcc-gold">
            <span className="h-px w-8 bg-jcc-gold" />
            Life at Jubilee Christian Centre
          </p>
          <h1 id="events-title" className="font-heading text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Find your next <span className="text-jcc-gold">gathering.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            Make room for worship, prayer, teaching, and genuine connection. Explore our gatherings and get the details you need to join us.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#upcoming" className="inline-flex min-h-14 items-center gap-3 bg-jcc-gold px-6 py-4 text-sm font-bold text-jcc-navy transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jcc-navy">
              Explore gatherings <ArrowRight size={18} />
            </a>
            <Link href="/contact" className="inline-flex min-h-14 items-center gap-3 border border-white/35 px-6 py-4 text-sm font-bold text-white transition-colors hover:border-jcc-gold hover:text-jcc-gold focus:outline-none focus:ring-2 focus:ring-jcc-gold">
              Ask a question <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6 text-sm font-medium text-white/70">
            <span>Worship</span>
            <span aria-hidden="true" className="text-jcc-gold">/</span>
            <span>Prayer</span>
            <span aria-hidden="true" className="text-jcc-gold">/</span>
            <span>Community</span>
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[420px]">
          <Image
            src="/images/events.JPG"
            alt="People gathering at Jubilee Christian Centre"
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jcc-navy/85 via-jcc-navy/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-jcc-gold">You are welcome here</p>
            <p className="mt-2 max-w-md text-2xl font-semibold leading-snug text-white sm:text-3xl">
              Come as you are. Find a place to belong.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="upcoming" aria-labelledby="upcoming-title" className="container mx-auto px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mb-10 flex flex-col gap-5 border-b border-jcc-navy/10 pb-8 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-jcc-orange">Join us in person or online</p>
          <h2 id="upcoming-title" className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Gatherings & events
          </h2>
        </div>
        <p className="max-w-md text-base leading-relaxed text-jcc-navy/65">
          Choose a gathering to see when and where we meet. Need more information? Our team is happy to help.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {displayedEvents.map(event => <article key={event.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-jcc-navy/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="relative h-56 overflow-hidden bg-jcc-navy/5 sm:h-64">
            <Image
              src={event.image}
              alt=""
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-jcc-navy shadow-sm">
              {event.type}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <p className="text-sm font-bold text-jcc-orange">{event.tagline}</p>
            <h3 className="mt-2 font-heading text-2xl font-bold leading-tight text-jcc-navy">
              {event.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-jcc-navy/70 sm:text-base">
              {event.description}
            </p>

            <dl className="mt-6 space-y-3 border-t border-jcc-navy/10 pt-5 text-sm">
              {event.date && <div className="flex items-start gap-3">
                <CalendarDays size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-jcc-orange" />
                <div>
                  <dt className="sr-only">Date</dt>
                  <dd className="font-semibold text-jcc-navy">{event.date}</dd>
                </div>
              </div>}
              {event.time && <div className="flex items-start gap-3">
                <Clock3 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-jcc-orange" />
                <div>
                  <dt className="sr-only">Time</dt>
                  <dd className="text-jcc-navy/75">{event.time}</dd>
                </div>
              </div>}
              {event.location && <div className="flex items-start gap-3">
                <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-jcc-orange" />
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd className="text-jcc-navy/75">{event.location}</dd>
                </div>
              </div>}
            </dl>

            <EventCountdown startsAt={event.startsAt} />

            <Link
              href={event.ctaLink}
              className="mt-7 inline-flex min-h-12 items-center justify-between border-t border-jcc-navy/10 pt-5 text-sm font-bold text-jcc-navy transition-colors hover:text-jcc-orange focus:outline-none focus:ring-2 focus:ring-jcc-orange focus:ring-offset-4"
            >
              {event.ctaLabel}
              <ArrowUpRight size={19} aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </article>)}
      </div>
      {displayedEvents.length === 0 && <div className="rounded-2xl border border-dashed border-jcc-navy/20 bg-white px-6 py-12 text-center">
        <h3 className="font-heading text-2xl font-bold text-jcc-navy">No upcoming events just yet</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-jcc-navy/65">
          New gatherings will appear here as soon as they are announced. Contact our team if you have a question.
        </p>
        <Link href="/contact" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-lg bg-jcc-navy px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-jcc-orange focus:outline-none focus:ring-2 focus:ring-jcc-orange focus:ring-offset-2">
          Contact our team <ArrowUpRight size={18} />
        </Link>
      </div>}
    </section>

    <section className="bg-jcc-cream py-14 md:py-20">
      <div className="container mx-auto flex flex-col gap-7 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-jcc-orange">We would love to help</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">Have a question before you come?</h2>
          <p className="mt-3 text-base leading-relaxed text-jcc-navy/70">
            Contact our team for directions, accessibility information, or details about a gathering.
          </p>
        </div>
        <Link href="/contact" className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 bg-jcc-navy px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-jcc-orange focus:outline-none focus:ring-2 focus:ring-jcc-orange focus:ring-offset-2">
          Contact our team <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  </main>;
}
