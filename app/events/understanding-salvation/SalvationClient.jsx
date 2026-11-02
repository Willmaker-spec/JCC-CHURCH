'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UnderstandSalvationRegistrationForm from '@/components/events/UnderstandSalvationRegistrationForm';
gsap.registerPlugin(ScrollTrigger);
export default function SalvationClient() {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.salvation-hero-text', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
      });
      gsap.from('.salvation-badge', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      });
      gsap.from('.floating-info', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.5)',
        delay: 0.8
      })

      // Section Fade Ups
;
      gsap.utils.toArray('.gsap-fade-up').forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%'
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <main ref={containerRef} className="bg-jcc-navy selection:bg-jcc-orange selection:text-white min-h-screen overflow-hidden">
      
      {/* MASSIVE BRUTALIST HERO */}
      <section className="relative min-h-screen flex flex-col justify-center bg-jcc-navy text-white pt-32 pb-20 px-4 md:px-8">
        {/* Image Background */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/event-hero.jpg" alt="Hero Background" fill className="object-cover opacity-20 object-center grayscale mix-blend-screen scale-105" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-jcc-navy via-jcc-navy/80 to-transparent" />
        </div>
        
        {/* Dynamic Orbs */}
        <div className="absolute top-1/4 left-10 w-[30vw] h-[30vw] bg-jcc-orange/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          
          <div className="mb-12">
            <div className="salvation-badge inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <span className="flex h-3 w-3 rounded-full bg-jcc-gold animate-ping" />
              <span className="text-jcc-gold font-bold uppercase tracking-widest text-xs">Discipleship Intensive Cohort 1.0</span>
            </div>
          </div>

          <h1 className="font-anton text-[12vw] lg:text-[11rem] leading-[0.8] uppercase tracking-tighter flex flex-col mb-12 relative">
            
            {/* PRICE TAG 'ENDED' */}
            <div className="absolute -top-12 md:-top-24 right-0 md:right-24 z-50 transform rotate-[-15deg] hover:rotate-[-5deg] transition-transform duration-500 origin-top-left drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]">
              <div className="relative bg-[#cc2929] text-white font-black uppercase text-3xl md:text-6xl pl-12 md:pl-16 pr-6 md:pr-8 py-4 md:py-6 flex items-center border-2 border-white/20
                              [clip-path:polygon(25%_0%,100%_0%,100%_100%,25%_100%,0%_50%)]">
                <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-jcc-navy rounded-full shadow-inner ring-2 ring-white/30" />
                <span className="tracking-widest">ENDED</span>
              </div>
            </div>

            <div className="overflow-hidden pb-4"><span className="salvation-hero-text block relative z-10">Understanding</span></div>
            <div className="overflow-hidden pb-4"><span className="salvation-hero-text block text-jcc-orange italic relative z-10">Salvation</span></div>
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <p className="salvation-hero-text text-xl md:text-2xl text-slate-300 leading-relaxed max-w-xl font-medium">
              A 4-day deep-dive discipleship training designed to anchor your soul in the foundational truth of the Gospel.
            </p>

            <div className="floating-info flex flex-wrap gap-4 text-sm font-black uppercase tracking-[0.2em] text-jcc-navy">
              <div className="bg-jcc-gold px-6 py-4 rounded-2xl flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                Apr 13, 14, 16, 17
              </div>
              <div className="bg-white px-6 py-4 rounded-2xl flex items-center gap-3">
                <MapPin className="w-5 h-5 text-jcc-orange" />
                Online (Google Meet)
              </div>
              <div className="bg-jcc-orange text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-[0_0_40px_rgba(249,115,22,0.4)] border border-white/20">
                <Users className="w-5 h-5" />
                Only 6 Slots
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HORIZONTAL MARQUEE DIVIDER */}
      <div className="w-full bg-jcc-gold py-6 overflow-hidden flex whitespace-nowrap border-y-8 border-jcc-navy">
        <div className="animate-marquee flex gap-12 items-center font-anton text-4xl uppercase text-jcc-navy tracking-wide">
          <span>Not just information</span>
          <span className="w-4 h-4 bg-jcc-navy rounded-full" />
          <span>Building Conviction</span>
          <span className="w-4 h-4 bg-jcc-navy rounded-full" />
          <span>Not just information</span>
          <span className="w-4 h-4 bg-jcc-navy rounded-full" />
          <span>Building Conviction</span>
          <span className="w-4 h-4 bg-jcc-navy rounded-full" />
          <span>Not just information</span>
          <span className="w-4 h-4 bg-jcc-navy rounded-full" />
          <span>Building Conviction</span>
        </div>
      </div>

      {/* THE VISION & HOST - DARK MODE CONTRAST */}
      <section className="py-24 md:py-40 px-4 bg-slate-50 text-jcc-navy relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* The Vision Content */}
            <div>
              <p className="text-jcc-orange font-bold uppercase tracking-[0.3em] mb-6 text-sm gsap-fade-up">The Vision</p>
              <h2 className="font-anton text-5xl md:text-7xl uppercase leading-[0.9] mb-12 gsap-fade-up">
                Anchor your soul <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcc-navy to-jcc-orange">in the Truth.</span>
              </h2>
              
              <div className="space-y-8 text-xl text-slate-600 leading-relaxed font-medium">
                <p className="gsap-fade-up">
                  This training is intentionally structured as a high-engagement cohort to nurture believers into becoming committed, knowledgeable, and Spirit-led disciples.
                </p>
                <div className="gsap-fade-up p-8 rounded-[2rem] bg-jcc-navy text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-jcc-gold rounded-full blur-[60px] opacity-20" />
                  <h3 className="font-anton text-3xl text-jcc-gold mb-4 uppercase">Why 7:00 PM?</h3>
                  <p className="text-lg text-slate-300">
                    We value your community commitments. This time slot ensures you can finish your workday and still join clan prayers or other scheduled meetings without any clash.
                  </p>
                </div>
              </div>
            </div>

            {/* Host Card */}
            <div className="gsap-fade-up">
              <div className="sticky top-32">
                <div className="group rounded-[3rem] bg-white border border-slate-200 p-8 shadow-xl overflow-hidden relative flex flex-col md:flex-row gap-8 items-center">
                  <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-jcc-navy via-jcc-gold to-jcc-orange z-20" />
                  
                  {/* Pastor Image with brutalist cutout styling */}
                  <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-3xl overflow-hidden bg-jcc-navy transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl border-4 border-jcc-gold">
                    <Image src="/images/pastor.JPG" alt="Apostle Isaiah Peter Nelson" fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" unoptimized />
                    <div className="absolute inset-0 bg-jcc-navy/10 mix-blend-multiply" />
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-jcc-orange mb-3">Host & Anchor</h3>
                    <p className="font-anton text-4xl md:text-5xl uppercase mb-2 leading-none text-jcc-navy">Apostle Isaiah <br /> Peter Nelson</p>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mt-4">Lead Strategist & Teacher</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section className="py-24 md:py-40 px-4 bg-jcc-navy relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10">
          
          <div className="text-center mb-16 gsap-fade-up">
            <h2 className="font-anton text-5xl md:text-7xl uppercase text-white mb-6">Secure Your Slot</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Only 6 slots are available for this intensive. Register below to claim your space.
            </p>
          </div>

          <div className="gsap-fade-up bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.3)] relative overflow-hidden">
            {/* GIANT PLASTER TAPE */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-24 md:h-32 bg-[#cc2929]/90 backdrop-blur-md transform -rotate-[10deg] flex items-center justify-center z-50 border-y-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <span className="font-anton text-6xl md:text-8xl text-white uppercase tracking-[0.3em]">Event Closed</span>
            </div>
            <div className="opacity-20 pointer-events-none grayscale blur-sm transition-all duration-1000">
              <UnderstandSalvationRegistrationForm />
            </div>
          </div>

          <div className="mt-20 text-center gsap-fade-up">
            <Link href="/events" className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] text-white hover:text-jcc-gold transition-colors">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </div>
              Back to Events
            </Link>
          </div>

        </div>
      </section>

    </main>;
}
