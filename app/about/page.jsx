"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  BookOpen,
  Users,
  Globe,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Star,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const coreValueIcons = [BookOpen, Users, Heart, Lightbulb, TrendingUp, Globe];

export default function AboutPage() {
  const { messages } = useLanguage();
  const about = messages.about;
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Brutalist Hero Entrance
      gsap.from(".hero-chunk", {
        y: 200,
        opacity: 0,
        rotation: 10,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      // Marquee animation
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [containerRef]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen overflow-hidden bg-[#f7f7f4] pb-32 text-slate-900 selection:bg-jcc-navy selection:text-white"
    >
      <section className="relative flex min-h-[82vh] items-end overflow-hidden bg-jcc-navy px-4 pb-16 pt-32 md:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about.JPG"
            alt="About Us"
            fill
            className="scale-105 object-cover object-top opacity-30 grayscale"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jcc-navy via-jcc-navy/75 to-black/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-6 overflow-hidden">
            <div className="hero-chunk inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
              {about.hero.subtitle}
            </div>
          </div>

          <h1 className="mb-8 flex flex-col font-anton text-[15vw] uppercase leading-[0.8] tracking-tighter text-white md:text-[11rem]">
            <span className="hero-chunk block text-jcc-gold">{about.hero.headingLead}</span>
            <span
              className="hero-chunk block text-transparent"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}
            >
              {about.hero.headingHighlight}
            </span>
          </h1>

          <div className="max-w-3xl overflow-hidden">
            <p className="hero-chunk rounded-2xl border-l-4 border-jcc-gold bg-black/20 p-5 text-lg leading-relaxed text-white/90 backdrop-blur-sm md:text-2xl">
              {about.hero.description}
            </p>
          </div>
        </div>
      </section>

      <div className="flex overflow-hidden border-y border-jcc-navy/10 bg-jcc-gold text-jcc-navy py-5">
        <div className="marquee-track flex whitespace-nowrap items-center font-anton text-4xl uppercase tracking-widest md:text-5xl">
          {Array(8)
            .fill(
              `${about.missionVision.missionLabel} • ${about.missionVision.visionLabel} • `,
            )
            .map((text, i) => (
              <span key={i} className="mx-6">
                {text}
              </span>
            ))}
        </div>
      </div>

      <section className="relative z-20 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 overflow-hidden">
            <h2 className="section-heading font-anton text-[12vw] uppercase leading-none tracking-tighter text-jcc-navy md:text-8xl">
              {about.story.heading}
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-8 text-lg leading-relaxed text-slate-700">
              {about.story.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="grid-item">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="rounded-[28px] border border-jcc-gold/35 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-jcc-navy/70">
                Our calling
              </p>
              <p className="font-anton text-3xl uppercase leading-tight text-jcc-navy md:text-4xl">
                Building a community where every life can encounter Christ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-jcc-gold/30 bg-jcc-navy px-4 py-24 text-white md:py-32">
        <div className="absolute right-0 top-0 h-[36rem] w-[36rem] rounded-full bg-jcc-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 overflow-hidden">
            <h2 className="section-heading font-anton text-[12vw] uppercase leading-none tracking-tighter text-white md:text-8xl">
              {about.beliefs.heading}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {about.beliefs.items.map((belief) => (
              <div
                key={belief.title}
                className="grid-item rounded-[24px] border border-white/10 bg-white/5 p-8 shadow-[0_18px_32px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="mb-5 font-anton text-3xl uppercase tracking-tight text-jcc-gold">
                  {belief.title}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-slate-200">
                  {belief.content}
                </p>
                {belief.verse && (
                  <div className="inline-block rounded-full border border-jcc-gold/40 bg-jcc-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-jcc-gold">
                    {belief.verse}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-jcc-gold/30 bg-white px-4 py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-fallback.jpg"
            alt="Mission and Vision"
            fill
            className="scale-105 object-cover opacity-60 grayscale"
            unoptimized
          />
          <div className="absolute inset-0 bg-jcc-navy/65" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div className="grid-item rounded-[28px] border border-jcc-gold/30 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:p-10">
            <div className="mb-6 inline-flex rounded-full border border-jcc-navy/20 bg-jcc-navy px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
              {about.missionVision.missionLabel}
            </div>
            <h3 className="mb-5 font-anton text-4xl uppercase leading-none text-jcc-navy md:text-5xl">
              {about.missionVision.missionHeading}
            </h3>
            <p className="mb-6 border-l-4 border-jcc-gold pl-5 text-xl font-semibold uppercase leading-relaxed text-jcc-gold">
              {about.missionVision.missionStatement}
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              {about.missionVision.missionDescription}
            </p>
          </div>

          <div className="grid-item rounded-[28px] border border-jcc-gold/30 bg-[#f5efe6] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:p-10">
            <div className="mb-6 inline-flex rounded-full border border-jcc-gold/30 bg-jcc-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-jcc-navy">
              {about.missionVision.visionLabel}
            </div>
            <h3 className="mb-5 font-anton text-4xl uppercase leading-none text-jcc-navy md:text-5xl">
              {about.missionVision.visionHeading}
            </h3>
            <p className="mb-6 border-l-4 border-jcc-navy pl-5 text-xl font-semibold uppercase leading-relaxed text-jcc-navy">
              {about.missionVision.visionStatement}
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              {about.missionVision.visionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 md:py-40 px-4 bg-[#fafafa] border-t-8 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-20 text-center">
            <h2 className="section-heading font-anton text-[12vw] md:text-8xl text-jcc-navy uppercase leading-none tracking-tighter">
              {about.coreValues.heading}
            </h2>
          </div>

          <div className="grid-container grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {about.coreValues.items.map((value, index) => {
              const IconComponent =
                coreValueIcons[index % coreValueIcons.length];
              return (
                <div
                  key={value.title}
                  className="grid-item bg-white border-4 border-jcc-navy p-8 shadow-[10px_10px_0_#1a365d] hover:-translate-y-2 transition-transform group"
                >
                  <div className="w-20 h-20 bg-jcc-navy rounded-none flex items-center justify-center mb-8 group-hover:bg-jcc-gold transition-colors duration-300">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-anton text-3xl text-jcc-navy mb-4 uppercase">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERSHIP - MAGAZINE CUTOUT */}
      <section className="py-24 md:py-40 px-4 bg-jcc-navy text-white overflow-hidden relative border-y-8 border-jcc-gold">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-16 relative z-20">
            <h2 className="section-heading font-anton text-[12vw] md:text-9xl text-white uppercase leading-none tracking-tighter opacity-20 absolute -top-10 left-0 pointer-events-none">
              {about.leadership.heading}
            </h2>
            <h2 className="section-heading font-anton text-6xl md:text-8xl text-jcc-gold uppercase leading-none tracking-tighter relative">
              {about.leadership.heading}
            </h2>
          </div>

          <div className="grid-container grid md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Bio */}
            <div className="grid-item md:col-span-7 bg-white text-jcc-navy p-8 md:p-16 border-4 border-jcc-gold shadow-[20px_20px_0_#EAB308] relative z-20">
              <h3 className="font-anton text-5xl md:text-7xl mb-4 uppercase leading-none">
                {about.leadership.name}
              </h3>
              <div className="inline-block bg-black text-white px-4 py-2 font-black uppercase tracking-widest text-sm mb-10">
                {about.leadership.role}
              </div>

              <div className="prose prose-xl prose-jcc max-w-none text-gray-800 font-medium">
                {about.leadership.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Pastor Photo */}
            <div className="grid-item md:col-span-5 relative h-[60vh] md:h-[80vh] w-full -mt-20 md:mt-0 md:-ml-20 z-10 border-8 border-white">
              <Image
                src="/images/pastor.jpg"
                alt="Rev. Pastor Udoka O. Ukah"
                fill
                className="object-cover object-top"
                unoptimized
              />
              {/* Aggressive overlay block */}
              <div className="absolute bottom-0 left-0 bg-jcc-gold w-full p-6 border-t-8 border-white">
                <p className="font-anton text-4xl text-jcc-navy uppercase text-center">
                  Visionary
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIES */}
      <section id="testimonies" className="py-24 md:py-40 px-4 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden mb-20 text-center">
            <h2 className="section-heading font-anton text-[10vw] md:text-8xl text-jcc-navy uppercase leading-none tracking-tighter mb-6">
              {about.testimonies.heading}
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest text-gray-500 max-w-3xl mx-auto">
              {about.testimonies.intro}
            </p>
          </div>

          <div className="grid-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-20">
            {about.testimonies.cards.map((card) => (
              <div
                key={`${card.author}-${card.meta}`}
                className={`grid-item bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_#1a365d] hover:-translate-y-2 transition-transform ${
                  card.fullWidth ? "md:col-span-2 lg:col-span-3" : ""
                }`}
              >
                <div className="text-jcc-gold mb-6">
                  <Star size={48} fill="#EAB308" />
                </div>

                {card.title && (
                  <h4 className="font-anton text-3xl text-jcc-navy mb-6 uppercase">
                    {card.title}
                  </h4>
                )}

                {card.quote && (
                  <p className="text-2xl font-medium leading-relaxed mb-8 border-l-8 border-jcc-gold pl-6">
                    &quot;{card.quote}&quot;
                  </p>
                )}

                {card.paragraphs && (
                  <div className="text-xl font-medium leading-relaxed mb-8 space-y-4">
                    {card.paragraphs.map((paragraph, index) => (
                      <p key={`${card.author}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                )}

                <div className="bg-jcc-navy text-white p-4 inline-block">
                  <p className="font-black uppercase tracking-widest">
                    {card.author}
                  </p>
                  <p className="text-sm text-jcc-gold font-bold">{card.meta}</p>
                </div>
              </div>
            ))}
          </div>

          {/* BRUTALIST CTA */}
          <div className="bg-jcc-gold border-8 border-jcc-navy p-12 md:p-20 text-center shadow-[20px_20px_0_#1a365d]">
            <h3 className="font-anton text-5xl md:text-7xl mb-6 uppercase text-jcc-navy tracking-tighter">
              {about.testimonies.share.heading}
            </h3>
            <p className="text-2xl font-medium mb-12 max-w-3xl mx-auto text-jcc-navy/80">
              {about.testimonies.share.description}
            </p>
            <Link
              href="/contact#testimony"
              className="inline-flex items-center gap-4 px-12 py-6 bg-jcc-navy text-white font-black text-2xl uppercase tracking-[0.2em] border-4 border-white hover:bg-white hover:text-jcc-navy hover:border-jcc-navy transition-colors duration-300 group"
            >
              {about.testimonies.share.cta}
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL JOIN US */}
      <section
        id="services"
        className="py-32 px-4 bg-jcc-navy border-t-8 border-jcc-gold text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/join.JPG"
            alt="Join Us"
            fill
            className="object-cover opacity-30 grayscale mix-blend-luminosity scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-jcc-navy/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-anton text-[12vw] md:text-9xl text-white mb-8 uppercase leading-[0.85] tracking-tighter">
            {about.finalCta.heading}
          </h2>
          <p className="text-2xl md:text-4xl font-medium text-jcc-gold mb-16 uppercase tracking-wide">
            {about.finalCta.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {about.finalCta.buttons.map((button, index) => {
              const isPrimary = index === 0;
              return (
                <Link
                  key={button.href}
                  href={button.href}
                  className={`inline-flex items-center justify-center gap-4 px-12 py-6 font-black text-2xl uppercase tracking-[0.2em] border-4 transition-all duration-300 hover:-translate-y-2 group ${
                    isPrimary
                      ? "bg-jcc-gold border-jcc-gold text-jcc-navy shadow-[10px_10px_0_white] hover:shadow-[15px_15px_0_white]"
                      : "bg-transparent border-white text-white shadow-[10px_10px_0_#EAB308] hover:shadow-[15px_15px_0_#EAB308]"
                  }`}
                >
                  {button.label}
                  {isPrimary && (
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
