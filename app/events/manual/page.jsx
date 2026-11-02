'use client';

import { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { gsap } from 'gsap';
export default function ManualPage() {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.archive-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });
      gsap.from('.lock-icon', {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
        delay: 0.6
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <main ref={containerRef} className="bg-[#0a0f1c] min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-jcc-orange/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl w-full text-center">
        <div className="flex justify-center mb-12 overflow-hidden">
          <div className="lock-icon w-24 h-24 rounded-full border border-jcc-orange/30 bg-jcc-orange/10 backdrop-blur-md flex items-center justify-center">
            <Lock className="w-10 h-10 text-jcc-orange" />
          </div>
        </div>

        <h1 className="font-anton text-[15vw] md:text-[10rem] uppercase leading-[0.8] text-white mb-8 tracking-tighter flex flex-col items-center">
          <div className="overflow-hidden"><span className="archive-text block">The</span></div>
          <div className="overflow-hidden"><span className="archive-text block text-jcc-orange italic">Manual</span></div>
        </h1>

        <div className="overflow-hidden mb-16">
          <p className="archive-text text-xl md:text-2xl text-slate-300 font-medium uppercase tracking-[0.2em]">
            Event Concluded
          </p>
          <p className="archive-text text-slate-500 mt-4 max-w-lg mx-auto">
            Thank you for your interest. The Manual event has ended, but there are still plenty of opportunities to connect with us.
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="archive-text inline-block">
            <Link href="/events" className="group inline-flex items-center gap-4 bg-jcc-orange text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-[0.2em] hover:bg-white hover:text-jcc-navy transition-colors shadow-[0_0_40px_rgba(249,115,22,0.3)]">
              <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Upcoming Events
            </Link>
          </div>
        </div>
      </div>
    </main>;
}
