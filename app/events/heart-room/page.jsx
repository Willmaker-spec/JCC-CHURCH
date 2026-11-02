'use client';

import { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { gsap } from 'gsap';
export default function HeartRoomPage() {
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
  return <main ref={containerRef} className="bg-jcc-navy min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Noise & Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-jcc-gold/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl w-full text-center">
        <div className="flex justify-center mb-12 overflow-hidden">
          <div className="lock-icon w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center">
            <Lock className="w-10 h-10 text-slate-400" />
          </div>
        </div>

        <h1 className="font-anton text-[12vw] md:text-[8rem] uppercase leading-[0.8] text-white mb-8 tracking-tighter flex flex-col items-center">
          <div className="overflow-hidden"><span className="archive-text block">The Heart</span></div>
          <div className="overflow-hidden"><span className="archive-text block text-slate-600">Room</span></div>
        </h1>

        <div className="overflow-hidden mb-16">
          <p className="archive-text text-xl md:text-2xl text-jcc-gold font-medium uppercase tracking-[0.2em]">
            Transmission Concluded
          </p>
          <p className="archive-text text-slate-400 mt-4 max-w-lg mx-auto">
            This experience has officially ended. The archives are currently sealed. Thank you to everyone who participated.
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="archive-text inline-block">
            <Link href="/events" className="group inline-flex items-center gap-4 bg-white text-jcc-navy px-8 py-4 rounded-full font-black uppercase text-sm tracking-[0.2em] hover:bg-jcc-gold transition-colors">
              <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Return to Events
            </Link>
          </div>
        </div>
      </div>
    </main>;
}
