"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Give() {
  const { messages } = useLanguage();
  const give = messages.home.give;
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Luxurious Parallax on the background image
      gsap.to(".give-parallax-bg", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        ease: "none",
      });

      // Silky smooth fade-up for content
      gsap.from(".give-elegant-el", {
        scrollTrigger: {
          trigger: ".give-content-area",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 bg-black text-white overflow-hidden z-20"
    >
      {/* MASSIVE FULL-BLEED IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/give.jpg"
          alt="Give Background"
          fill
          className="give-parallax-bg object-cover object-center opacity-60 scale-110"
          priority
        />
        {/* Very elegant, subtle gradient overlay to ensure text readability without ruining the photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="container-custom relative z-10 give-content-area h-full flex flex-col justify-end">
        <div className="max-w-4xl">
          {/* Minimalist Header */}
          <div className="mb-16">
            <p className="give-elegant-el text-jcc-gold font-medium tracking-[0.3em] uppercase text-sm mb-6">
              {give.badge}
            </p>

            {/* Elegant Serif-like or highly tracked Sans display */}
            <h2 className="give-elegant-el text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight tracking-tight">
              {give.headingLine1} <br />
              <span className="font-semibold text-jcc-gold">
                {give.headingLine2}
              </span>
            </h2>

            <p className="give-elegant-el text-lg md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
              {give.description}
            </p>
          </div>

          {/* Minimalist giving options (text driven, elegant layout) */}
          <div className="give-elegant-el grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-t border-white/20 pt-12">
            {give.options.map((option) => (
              <div key={option.title} className="group">
                <h3 className="text-xl font-medium mb-3 text-white tracking-wide">
                  {option.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm">
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          {/* Ultra-Clean CTAs */}
          <div className="give-elegant-el flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <Link
              href="/give"
              className="group inline-flex items-center text-jcc-gold hover:text-white transition-colors duration-500 pb-2 border-b border-jcc-gold/50 hover:border-white"
            >
              <span className="text-lg tracking-widest uppercase font-medium">
                {give.primaryCta}
              </span>
              <ArrowRight className="h-5 w-5 ml-4 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>

            <Link
              href="/give#bank-details"
              className="group inline-flex items-center text-gray-400 hover:text-white transition-colors duration-500 pb-2 border-b border-transparent hover:border-white/50"
            >
              <span className="text-sm tracking-widest uppercase font-light">
                {give.secondaryCta}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
