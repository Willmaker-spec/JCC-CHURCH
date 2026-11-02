"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, Video, Users, BookOpen, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalFamily() {
  const { messages } = useLanguage();
  const global = messages.home.globalFamily;
  const containerRef = useRef(null);

  const journeyIcons = [Video, Users, BookOpen];
  const journeyStyles = [
    {
      container:
        "bg-jcc-navy border-4 border-white p-8 shadow-[12px_12px_0_white] hover:shadow-[0_0_0_white] hover:translate-x-2 hover:translate-y-2 transition-all group flex flex-col h-full",
      iconBg: "bg-white text-jcc-navy",
      link: "text-white border-2 border-white px-6 py-3 mt-auto inline-flex items-center justify-between group-hover:bg-white group-hover:text-jcc-navy transition-colors font-black uppercase tracking-widest text-sm",
    },
    {
      container:
        "bg-white border-4 border-jcc-navy p-8 shadow-[12px_12px_0_#1a365d] hover:shadow-[0_0_0_#1a365d] hover:translate-x-2 hover:translate-y-2 transition-all group flex flex-col h-full",
      iconBg: "bg-jcc-navy text-white",
      link: "text-jcc-navy border-2 border-jcc-navy px-6 py-3 mt-auto inline-flex items-center justify-between group-hover:bg-jcc-navy group-hover:text-white transition-colors font-black uppercase tracking-widest text-sm",
    },
    {
      container:
        "bg-jcc-gold border-4 border-jcc-navy p-8 shadow-[12px_12px_0_#1a365d] hover:shadow-[0_0_0_#1a365d] hover:translate-x-2 hover:translate-y-2 transition-all group flex flex-col h-full",
      iconBg: "bg-jcc-navy text-jcc-gold",
      link: "text-jcc-navy border-2 border-jcc-navy px-6 py-3 mt-auto inline-flex items-center justify-between group-hover:bg-jcc-navy group-hover:text-jcc-gold transition-colors font-black uppercase tracking-widest text-sm",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous Marquee
      gsap.to(".marquee-global", {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      // Section Entrance
      gsap.from(".gf-headline", {
        scrollTrigger: {
          trigger: ".gf-headline",
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
      });

      // Journey Flashcards
      gsap.from(".gf-journey", {
        scrollTrigger: {
          trigger: ".gf-journey-grid",
          start: "top 80%",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-40 bg-jcc-navy text-white overflow-hidden border-t-8 border-jcc-gold"
    >
      {/* MASSIVE HEADLINE MARQUEE */}
      <div className="absolute top-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none select-none z-0 flex">
        <div
          className="marquee-global flex font-anton text-[25vw] leading-none uppercase text-transparent"
          style={{ WebkitTextStroke: "2px white" }}
        >
          {Array(4)
            .fill(`${global.headline.line1} ${global.headline.line2} - `)
            .map((text, i) => (
              <span key={i} className="mx-8">
                {text}
              </span>
            ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* THE HEADLINE */}
        <div className="text-center mb-20 md:mb-32">
          <div className="overflow-hidden mb-8">
            <div className="gf-headline inline-flex items-center space-x-3 bg-white text-jcc-navy px-8 py-3 border-4 border-jcc-gold font-black uppercase tracking-widest shadow-[8px_8px_0_#EAB308] transform -rotate-2">
              <Globe className="h-6 w-6 animate-spin-slow" />
              <span>{global.badge}</span>
            </div>
          </div>

          <div className="overflow-hidden">
            <h2 className="gf-headline font-anton text-[15vw] md:text-[10rem] leading-[0.8] uppercase tracking-tighter mb-6">
              <span className="block text-white">{global.headline.line1}</span>
              <span className="block text-jcc-gold">
                {global.headline.line2}
              </span>
            </h2>
          </div>

          {/* BRUTALIST STATS REMOVED */}
        </div>

        {/* RAW MAP & DESCRIPTIVE SECTION */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center mb-32">
          {/* Descriptive Text (Left) */}
          <div className="md:col-span-5 space-y-8 order-2 md:order-1">
            <h3 className="font-anton text-4xl md:text-6xl uppercase leading-none">
              <span className="block text-white">
                {global.description.titleLine1}
              </span>
              <span className="block text-jcc-gold">
                {global.description.titleLine2}
              </span>
            </h3>

            <div className="prose prose-xl prose-invert max-w-none font-medium leading-relaxed">
              {global.description.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="bg-white text-jcc-navy border-4 border-jcc-gold p-8 shadow-[10px_10px_0_#EAB308]">
              <p className="font-anton text-2xl uppercase tracking-wide leading-relaxed">
                &quot;{global.description.quote}&quot;
              </p>
            </div>

            {/* Impact Highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t-8 border-white/20">
              {global.description.highlights.map((highlight, index) => (
                <div
                  key={highlight.label}
                  className="bg-black/30 border-2 border-white/20 p-6 text-center"
                >
                  <p
                    className={`text-4xl font-anton ${index % 2 === 0 ? "text-jcc-gold" : "text-white"} mb-2`}
                  >
                    {highlight.value}
                  </p>
                  <p className="text-sm text-white/70 font-bold uppercase tracking-widest">
                    {highlight.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stark Map Visualization (Right) */}
          <div className="md:col-span-7 relative order-1 md:order-2">
            <div className="bg-white border-8 border-jcc-gold p-4 shadow-[20px_20px_0_#EAB308] transform rotate-1">
              <div className="bg-jcc-navy p-6 mb-4 flex justify-between items-center">
                <h3 className="font-anton text-3xl text-jcc-gold uppercase m-0 leading-none">
                  {global.map.title}
                </h3>
                <Globe className="text-white w-8 h-8" />
              </div>

              <div className="relative w-full aspect-video border-4 border-jcc-navy filter grayscale contrast-125">
                <Image
                  src="/images/reachh.jpg"
                  alt={global.map.imageAlt}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-jcc-navy/30 mix-blend-multiply" />
              </div>

              {/* Hard Connection Points */}
              <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-100 p-4 border-4 border-jcc-navy">
                {global.map.points.map((point, index) => (
                  <div key={point} className="flex items-center space-x-4">
                    <div
                      className={`w-4 h-4 border-2 border-black ${index % 2 === 0 ? "bg-jcc-gold" : "bg-jcc-navy"}`}
                    />
                    <span className="font-black text-jcc-navy uppercase tracking-widest text-sm">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* THE JOURNEY FLASHCARDS */}
        <div className="mb-32">
          <div className="overflow-hidden mb-16 text-center">
            <h3 className="gf-headline font-anton text-5xl md:text-7xl text-white uppercase tracking-tighter">
              {global.journeyHeading}
            </h3>
          </div>

          <div className="gf-journey-grid grid lg:grid-cols-3 gap-8">
            {global.journeyItems.map((item, index) => {
              const Icon = journeyIcons[index % journeyIcons.length];
              const style = journeyStyles[index % journeyStyles.length];
              return (
                <div key={item.title} className="gf-journey">
                  <div className={style.container}>
                    <div
                      className={`w-20 h-20 border-4 border-current ${style.iconBg} flex items-center justify-center mb-8`}
                    >
                      <Icon className="h-10 w-10" />
                    </div>
                    <h4 className="font-anton text-4xl mb-6 uppercase leading-none">
                      {item.title}
                    </h4>
                    <p className="text-lg font-medium leading-relaxed mb-8 opacity-90">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={style.link}
                    >
                      <span>{item.ctaLabel}</span>
                      <ArrowRight className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
