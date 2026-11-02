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
      className="min-h-screen bg-white selection:bg-jcc-navy selection:text-white overflow-hidden pb-32"
    >
      {/* MASSIVE BRUTALIST HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-end bg-jcc-navy border-b-8 border-jcc-gold px-4 md:px-8 pb-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about.JPG"
            alt="About Us"
            fill
            className="object-cover object-top opacity-30 grayscale scale-105"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jcc-navy via-jcc-navy/80 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="mb-6 overflow-hidden">
            <div className="hero-chunk inline-flex bg-white text-jcc-navy px-6 py-2 border-4 border-jcc-navy font-black uppercase tracking-widest text-sm shadow-[6px_6px_0_#EAB308] transform -rotate-2">
              {about.hero.subtitle}
            </div>
          </div>

          <h1 className="font-anton text-[15vw] md:text-[11rem] leading-[0.8] uppercase tracking-tighter text-white mb-8 flex flex-col">
            <div className="overflow-hidden pb-2">
              <span className="hero-chunk block text-jcc-gold">
                {about.hero.headingLead}
              </span>
            </div>
            <div className="overflow-hidden pb-4">
              <span
                className="hero-chunk block text-transparent"
                style={{ WebkitTextStroke: "3px white" }}
              >
                {about.hero.headingHighlight}
              </span>
            </div>
          </h1>

          <div className="overflow-hidden max-w-3xl">
            <p className="hero-chunk text-xl md:text-3xl text-white font-medium border-l-[12px] border-jcc-gold pl-6 leading-relaxed bg-black/20 p-4 backdrop-blur-sm">
              {about.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE */}
      <div className="bg-jcc-gold text-jcc-navy py-6 overflow-hidden border-b-8 border-jcc-navy flex">
        <div className="marquee-track flex whitespace-nowrap items-center font-anton text-4xl md:text-6xl uppercase tracking-widest">
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

      {/* OUR STORY - EDITORIAL SPREAD */}
      <section className="py-24 md:py-40 px-4 bg-white relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden mb-16">
            <h2 className="section-heading font-anton text-[12vw] md:text-8xl text-jcc-navy uppercase leading-none tracking-tighter">
              {about.story.heading}
            </h2>
          </div>

          <div
            className="prose prose-xl md:prose-2xl prose-jcc max-w-none text-gray-800 font-medium
            first-letter:font-anton first-letter:text-9xl first-letter:float-left first-letter:mr-6 first-letter:text-jcc-navy first-letter:leading-[0.8] first-letter:mt-2
            prose-p:mb-12 prose-p:leading-relaxed"
          >
            {about.story.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="grid-item">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE - BRUTALIST GRID */}
      <section className="py-24 md:py-40 px-4 bg-jcc-navy border-y-8 border-jcc-gold text-white relative">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-jcc-gold/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="overflow-hidden mb-20">
            <h2 className="section-heading font-anton text-[12vw] md:text-8xl text-white uppercase leading-none tracking-tighter">
              {about.beliefs.heading}
            </h2>
          </div>

          <div className="grid-container grid md:grid-cols-2 gap-8 md:gap-12">
            {about.beliefs.items.map((belief) => (
              <div
                key={belief.title}
                className="grid-item bg-white border-4 border-jcc-gold text-jcc-navy p-8 md:p-12 shadow-[15px_15px_0_#EAB308] hover:shadow-[0_0_0_#EAB308] hover:translate-x-3 hover:translate-y-3 transition-all duration-300"
              >
                <h3 className="font-anton text-4xl mb-6 uppercase tracking-wide">
                  {belief.title}
                </h3>
                <p className="text-xl font-medium leading-relaxed mb-6">
                  {belief.content}
                </p>
                {belief.verse && (
                  <div className="inline-block bg-jcc-navy text-jcc-gold px-4 py-2 font-black uppercase tracking-widest text-sm">
                    {belief.verse}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 md:py-40 px-4 relative border-y-8 border-jcc-gold overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-fallback.jpg"
            alt="Mission and Vision"
            fill
            className="object-cover opacity-60 grayscale scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-jcc-navy/60" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid-container grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Mission */}
            <div className="grid-item flex flex-col items-start bg-white p-12 border-4 border-black shadow-[15px_15px_0_black]">
              <div className="bg-jcc-navy text-white px-6 py-2 border-4 border-jcc-gold font-black uppercase tracking-widest shadow-[8px_8px_0_#EAB308] mb-8 transform -rotate-2">
                {about.missionVision.missionLabel}
              </div>
              <h3 className="font-anton text-5xl md:text-7xl mb-8 uppercase text-jcc-navy leading-none">
                {about.missionVision.missionHeading}
              </h3>
              <p className="text-2xl font-black text-jcc-gold mb-6 uppercase border-l-8 border-jcc-navy pl-6">
                {about.missionVision.missionStatement}
              </p>
              <p className="text-xl text-gray-700 font-medium leading-relaxed">
                {about.missionVision.missionDescription}
              </p>
            </div>

            {/* Vision */}
            <div className="grid-item flex flex-col items-start bg-white p-12 border-4 border-black shadow-[15px_15px_0_black]">
              <div className="bg-jcc-gold text-jcc-navy px-6 py-2 border-4 border-jcc-navy font-black uppercase tracking-widest shadow-[8px_8px_0_#1a365d] mb-8 transform rotate-2">
                {about.missionVision.visionLabel}
              </div>
              <h3 className="font-anton text-5xl md:text-7xl mb-8 uppercase text-jcc-navy leading-none">
                {about.missionVision.visionHeading}
              </h3>
              <p className="text-2xl font-black text-jcc-navy mb-6 uppercase border-l-8 border-jcc-gold pl-6">
                {about.missionVision.visionStatement}
              </p>
              <p className="text-xl text-gray-700 font-medium leading-relaxed">
                {about.missionVision.visionDescription}
              </p>
            </div>
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
            <div className="grid-item md:col-span-5 relative h-[60vh] md:h-[80vh] w-full -mt-20 md:mt-0 md:-ml-20 z-10 filter grayscale contrast-125 border-8 border-white">
              <Image
                src="public/images/pastor.JPG"
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
