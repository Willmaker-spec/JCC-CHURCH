"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Circle, Play } from "lucide-react";
// ...existing code...
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

  return (
    <section className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden">
      {/* Fixed Background Video with Overlay - Stays in place while content scrolls */}
      <div className="fixed inset-0 z-0">
        {/* Fallback Image - Shows while video loads */}
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
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Vision Badge */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-jcc-gold/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-jcc-gold/30"
            >
              <Circle className="h-2 w-2 fill-jcc-gold text-jcc-gold" />
              <span className="text-white font-semibold text-sm tracking-wider uppercase">
                {messages.hero.visionBadge}
              </span>
            </motion.div>
          </div>

          {/* Main Heading - Bold Statement with opacity on desktop */}
          <h1 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 leading-none uppercase text-center">
            {messages.hero.lines.map((line, index) => (
              <motion.span
                key={`${line.prefix}-${line.highlight}`}
                className={`block ${heroLineOpacities[index] ?? "lg:opacity-90"}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.3 }}
              >
                {line.prefix}
                <span className="text-jcc-orange">{line.highlight}</span>
                {line.suffix ?? ""}
              </motion.span>
            ))}
          </h1>

          {/* CTA Buttons - Outlined Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href="/sermons"
              className="group w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-jcc-navy text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-wide text-sm"
            >
              <span>{messages.hero.watchLive}</span>
            </Link>
            <Link
              href="/quick-links"
              className="group w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-jcc-navy text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-wide text-sm"
            >
              <span>{messages.hero.quickLinks}</span>
            </Link>
          </div>

          {/* Unlearning Conference Promo Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 sm:mt-24 max-w-3xl mx-auto w-full"
          >
            <Link
              href="/sermons"
              className="block relative group overflow-hidden rounded-[2rem] bg-black/40 backdrop-blur-lg border border-jcc-gold/30 hover:border-jcc-gold/80 transition-all duration-500 shadow-[0_0_40px_rgba(200,160,50,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-jcc-navy/90 to-transparent z-0 pointer-events-none opacity-80" />
              <div className="relative z-10 flex flex-col md:flex-row items-center p-6 sm:p-8 gap-6 sm:gap-8">
                {/* Image Thumbnail */}
                <div className="relative w-full md:w-32 h-40 md:h-32 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-lg">
                  <Image
                    src="/images/hero.jpg"
                    alt="Unlearning Conference"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                </div>

                {/* Text & Live Badge */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">
                      Live Now
                    </span>
                  </div>
                  <h3 className="text-white font-anton text-3xl md:text-4xl uppercase tracking-wide mb-3">
                    The Unlearning Conference
                  </h3>
                  <p className="text-gray-300 font-light text-sm tracking-wide">
                    Join us live as we unlearn religion and relearn
                    relationship.
                  </p>
                </div>

                {/* Action */}
                <div className="shrink-0 mt-6 md:mt-0 w-full md:w-auto">
                  <div className="bg-jcc-gold text-jcc-navy w-full md:w-auto px-8 py-4 rounded-full font-black uppercase text-sm tracking-[0.2em] group-hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(200,160,50,0.3)]">
                    Watch Live <Play className="w-5 h-5 fill-jcc-navy" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
