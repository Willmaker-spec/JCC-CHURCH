"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock3, MapPin, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import heroVideo from "../assets/Herovid.mp4";

export default function Hero() {
  const [delayComplete, setDelayComplete] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const showVideo = delayComplete && videoReady;
  const { messages } = useLanguage();
  const heroLineOpacities = ["lg:opacity-90", "lg:opacity-85", "lg:opacity-90"];

  useEffect(() => {
    const timer = setTimeout(() => setDelayComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const highlights = [
    { icon: CalendarDays, label: "Sunday Service", value: "9:00 AM & 11:00 AM" },
    { icon: Clock3, label: "Wednesday Bible Study", value: "7:00 PM" },
    { icon: MapPin, label: "Location", value: "The Light House, Ikeja" },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Hero Background"
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
            className="mt-12 grid gap-4 md:grid-cols-3"
          >
            {highlights.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/15 bg-black/25 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-jcc-gold/15 text-jcc-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-300">{label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
