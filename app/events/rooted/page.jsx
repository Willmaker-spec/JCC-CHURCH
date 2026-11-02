'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function RootedPage() {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-text', {
        y: 150,
        opacity: 0,
        rotate: 5,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <main ref={containerRef} className="min-h-screen bg-[#fafafa] selection:bg-jcc-navy selection:text-white overflow-hidden pb-32">
      
      {/* Brutalist Back Button */}
      <Link href="/events" className="fixed left-4 md:left-8 top-8 z-50 group flex items-center gap-0 bg-white border-4 border-jcc-navy p-1 pr-4 shadow-[6px_6px_0_#1a365d] hover:shadow-[0px_0px_0_#1a365d] hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
        <div className="w-10 h-10 bg-jcc-navy flex items-center justify-center text-white mr-3">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="text-sm font-black uppercase tracking-widest text-jcc-navy">Events</span>
      </Link>

      {/* Massive Brutalist Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-end bg-jcc-navy border-b-8 border-jcc-gold px-4 md:px-8 pb-16 pt-32">
        <div className="absolute inset-0 z-0">
          <Image src="/images/rooted2.JPG" alt="Rooted Gathering" fill className="object-cover object-[center_30%] opacity-60 scale-105" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-jcc-navy via-jcc-navy/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="mb-6 overflow-hidden">
            <div className="hero-text inline-flex bg-jcc-gold text-jcc-navy px-6 py-2 border-4 border-jcc-navy font-black uppercase tracking-widest text-sm shadow-[6px_6px_0_#1a365d] transform -rotate-2">
              Monthly Gathering
            </div>
          </div>

          <h1 className="font-anton text-[20vw] md:text-[14rem] leading-[0.75] uppercase tracking-tighter text-white mb-8">
            <div className="overflow-hidden pb-4"><span className="hero-text block drop-shadow-2xl">Rooted</span></div>
          </h1>

          <div className="overflow-hidden max-w-2xl">
            <p className="hero-text text-xl md:text-3xl text-white/90 font-medium border-l-8 border-jcc-gold pl-6 leading-relaxed">
              Our explosive monthly gathering. Great sermons, deep connections, and an unapologetic pursuit of God.
            </p>
          </div>
        </div>
      </section>

      {/* Event Details Grid */}
      <section className="info-grid container mx-auto max-w-7xl px-4 mt-24">
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="info-block bg-white border-4 border-jcc-navy p-8 shadow-[10px_10px_0_#1a365d] hover:shadow-[10px_10px_0_#EAB308] transition-all flex flex-col items-start group">
            <div className="w-16 h-16 bg-jcc-navy rounded-full flex items-center justify-center text-jcc-gold mb-6 group-hover:scale-110 transition-transform">
              <Calendar size={32} strokeWidth={2.5} />
            </div>
            <h3 className="font-anton text-4xl text-jcc-navy mb-2 uppercase tracking-wide">When</h3>
            <p className="text-gray-600 font-bold uppercase tracking-widest">Every First Friday</p>
            <p className="text-jcc-navy/60 font-medium mt-2">Of The Month</p>
          </div>

          <div className="info-block bg-white border-4 border-jcc-navy p-8 shadow-[10px_10px_0_#1a365d] hover:shadow-[10px_10px_0_#EAB308] transition-all flex flex-col items-start group">
            <div className="w-16 h-16 bg-jcc-navy rounded-full flex items-center justify-center text-jcc-gold mb-6 group-hover:scale-110 transition-transform">
              <Clock size={32} strokeWidth={2.5} />
            </div>
            <h3 className="font-anton text-4xl text-jcc-navy mb-2 uppercase tracking-wide">Time</h3>
            <p className="text-gray-600 font-bold uppercase tracking-widest">10:00 AM</p>
            <p className="text-jcc-navy/60 font-medium mt-2">No African Time</p>
          </div>

          <Link href="/map" className="info-block bg-white border-4 border-jcc-navy p-8 shadow-[10px_10px_0_#1a365d] hover:shadow-[10px_10px_0_#EAB308] hover:-translate-y-1 transition-all flex flex-col items-start group">
            <div className="w-16 h-16 bg-jcc-navy rounded-full flex items-center justify-center text-jcc-gold mb-6 group-hover:scale-110 transition-transform">
              <MapPin size={32} strokeWidth={2.5} />
            </div>
            <h3 className="font-anton text-4xl text-jcc-navy mb-2 uppercase tracking-wide">Where</h3>
            <p className="text-gray-600 font-bold uppercase tracking-widest">The Light House</p>
            <p className="text-jcc-navy/60 font-medium mt-2 text-sm leading-relaxed">
              Opp 43B Babaponmile St.<br />
              After Winners Chapel<br />
              Mangoro, Ikeja, Lagos
            </p>
          </Link>

        </div>
      </section>

      {/* Massive CTA */}
      <section className="container mx-auto max-w-5xl px-4 mt-32 text-center">
        <h2 className="font-anton text-5xl md:text-7xl text-jcc-navy uppercase tracking-tighter mb-12">
          Clear your schedule.<br />See you this Friday.
        </h2>
        <div className="inline-block">
          <Link href="#" className="group flex items-center gap-6 px-12 py-6 bg-jcc-gold border-4 border-jcc-navy text-jcc-navy font-black text-xl md:text-2xl uppercase tracking-[0.2em] shadow-[12px_12px_0_#1a365d] hover:translate-x-2 hover:translate-y-2 hover:shadow-[0_0_0_#1a365d] transition-all duration-300">
            <span>Set Reminder</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

    </main>;
}
