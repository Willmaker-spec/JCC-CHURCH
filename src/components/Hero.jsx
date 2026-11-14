"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, MapPin, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { fetchPublishedUpcomingEvents, getLegacyEventStart } from "@/lib/events";
import { supabase } from "@/lib/supabase";
import heroVideo from "../assets/Herovid.mp4";

export default function Hero() {
  const [delayComplete, setDelayComplete] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [upcomingEvent, setUpcomingEvent] = useState(null);
  const [eventLoadStatus, setEventLoadStatus] = useState(supabase ? "loading" : "unavailable");
  const showVideo = delayComplete && videoReady;
  const { messages } = useLanguage();
  const heroLineOpacities = ["lg:opacity-90", "lg:opacity-85", "lg:opacity-90"];

  useEffect(() => {
    const timer = setTimeout(() => setDelayComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    fetchPublishedUpcomingEvents()
      .then(events => {
        if (!active) return;
        const getStartTime = event => {
          const value = event.event_start_at || getLegacyEventStart(event) || event.event_date;
          const timestamp = Date.parse(value);
          return Number.isFinite(timestamp) ? timestamp : Number.POSITIVE_INFINITY;
        };
        const [nextEvent] = [...events].sort((a, b) => getStartTime(a) - getStartTime(b));
        setUpcomingEvent(nextEvent || null);
        setEventLoadStatus("ready");
      })
      .catch(error => {
        if (!active) return;
        console.error("Unable to load the upcoming homepage event:", error);
        setEventLoadStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/church-celebration.jpg"
            alt="Church members celebrating together"
            fill
            className={`object-cover transition-opacity duration-[2500ms] ${showVideo ? "opacity-0" : "opacity-100"}`}
            priority
          />
        </div>

        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2500ms] ${showVideo ? "opacity-100" : "opacity-0"}`}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/85" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl"
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 inline-flex items-center space-x-2 rounded-full border border-jcc-gold/40 bg-jcc-gold/15 px-6 py-2 backdrop-blur-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-jcc-gold" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
                {messages.hero.visionBadge}
              </span>
            </motion.div>
          </div>

          <h1 className="mb-6 text-center font-anton text-4xl uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {messages.hero.lines.map((line, index) => (
              <motion.span
                key={`${line.prefix}-${line.highlight}`}
                className={`block ${heroLineOpacities[index] ?? "lg:opacity-90"}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.3 }}
              >
                {line.prefix}
                <span className="text-jcc-gold">{line.highlight}</span>
                {line.suffix ?? ""}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto max-w-2xl text-center text-base leading-relaxed text-slate-200 md:text-lg"
          >
            A place where everybody is somebody in Christ, and every person is welcomed to grow in faith, find hope, and discover purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/map"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-jcc-navy transition-all duration-200 hover:bg-jcc-gold hover:text-jcc-navy sm:w-auto"
            >
              {messages.hero.watchLive}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/sermons"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:border-jcc-gold hover:bg-jcc-gold/10 sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" />
              {messages.hero.quickLinks}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-12"
          >
            {eventLoadStatus === "loading" ? (
              <div aria-live="polite" className="rounded-2xl border border-white/15 bg-black/25 p-6 text-sm font-medium text-white/75 backdrop-blur-sm">
                Finding our next gathering…
              </div>
            ) : upcomingEvent ? (
              <article className="group grid overflow-hidden rounded-2xl border border-white/20 bg-white/[0.08] text-left shadow-[0_22px_55px_rgba(0,0,0,0.28)] backdrop-blur-md md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                <div className="relative min-h-[220px] overflow-hidden bg-jcc-navy/40 md:min-h-[290px]">
                  <Image
                    src={upcomingEvent.image || "/images/event-hero.jpg"}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                    {upcomingEvent.event_type || "Upcoming event"}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-jcc-gold">
                    What&apos;s happening at Jubilee
                  </p>
                  {upcomingEvent.tagline && (
                    <p className="mt-3 text-sm font-semibold text-white/70">{upcomingEvent.tagline}</p>
                  )}
                  <h2 className="mt-2 font-anton text-3xl uppercase leading-tight text-white sm:text-4xl">
                    {upcomingEvent.title}
                  </h2>
                  {upcomingEvent.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/75">
                      {upcomingEvent.description}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/80">
                    {upcomingEvent.event_date && (
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0 text-jcc-gold" />
                        {upcomingEvent.event_date}
                      </span>
                    )}
                    {upcomingEvent.event_time && (
                      <span className="inline-flex items-center gap-2">
                        <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0 text-jcc-gold" />
                        {upcomingEvent.event_time}
                      </span>
                    )}
                    {upcomingEvent.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-jcc-gold" />
                        {upcomingEvent.location}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/events/${upcomingEvent.slug}`}
                    className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 border-b border-jcc-gold/60 pb-1 text-sm font-bold text-jcc-gold transition-colors hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-jcc-gold focus:ring-offset-4 focus:ring-offset-jcc-navy"
                  >
                    Discover this event
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ) : (
              <div className="flex flex-col gap-5 rounded-2xl border border-white/15 bg-black/25 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-jcc-gold">Gather with us</p>
                  <h2 className="mt-2 font-anton text-2xl uppercase text-white sm:text-3xl">
                    {eventLoadStatus === "error" ? "Upcoming events are unavailable" : "Your next gathering is on the horizon"}
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    {eventLoadStatus === "error"
                      ? "Please visit our events page to see the latest announcements."
                      : "Explore our events and find your next opportunity to connect."}
                  </p>
                </div>
                <Link
                  href="/events"
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-jcc-gold px-5 py-3 text-sm font-bold text-jcc-navy transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jcc-navy"
                >
                  Browse events <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
