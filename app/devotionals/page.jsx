"use client";

import { useRef, useLayoutEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
function estimateReadingTime(text) {
  if (!text) return '1 MIN';
  const words = text.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} MIN READ`;
}
export default function PublicDevotionalsPage() {
  const devotionals = [];
  const loading = false;
  const loadError = 'The devotional backend is not connected yet.';
  const containerRef = useRef(null);
  const listRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.devo-hero-text', {
        y: 150,
        opacity: 0,
        rotate: 5,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
      });

      // Marquee
      const marquee = document.querySelector('.devo-marquee');
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: 'linear'
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <main ref={containerRef} className="min-h-screen bg-[#fafafa] selection:bg-jcc-navy selection:text-white overflow-hidden">
      
      {/* MASSIVE BRUTALIST HERO */}
      <section className="relative min-h-[80vh] flex flex-col justify-end pb-20 bg-jcc-navy px-4 md:px-8 border-b-8 border-jcc-gold">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/reach.jpg" alt="Devotionals Hero Background" fill className="object-cover object-top opacity-50 scale-105" unoptimized priority />
          <div className="absolute inset-0 bg-gradient-to-t from-jcc-navy via-jcc-navy/40 to-transparent" />
        </div>

        {/* Abstract Orbs */}
        <div className="absolute top-1/4 right-10 w-[40vw] h-[40vw] bg-jcc-gold/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="mb-8 overflow-hidden">
            <div className="devo-hero-text inline-flex items-center gap-3 bg-white text-jcc-navy px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs border-2 border-jcc-navy shadow-[4px_4px_0_#EAB308]">
              <BookOpen className="w-4 h-4" />
              The Word Daily
            </div>
          </div>

          <h1 className="font-anton text-[15vw] md:text-[12rem] leading-[0.8] uppercase tracking-tighter text-white flex flex-col mb-8 relative">
            <div className="absolute -top-10 md:-top-20 right-10 z-20 transform rotate-12 drop-shadow-2xl opacity-80">
              <Sparkles className="w-20 h-20 md:w-40 md:h-40 text-jcc-gold" />
            </div>
            <div className="overflow-hidden pb-4"><span className="devo-hero-text block relative z-10">Daily</span></div>
            <div className="overflow-hidden pb-4"><span className="devo-hero-text block text-transparent relative z-10" style={{
              WebkitTextStroke: '3px white'
            }}>Manna</span></div>
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div className="overflow-hidden">
              <p className="devo-hero-text text-xl md:text-3xl font-medium text-white/80 max-w-xl border-l-4 border-jcc-gold pl-6">
                Transformed by the renewing of your mind. Explore our library of spiritual nourishment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE */}
      <div className="bg-jcc-gold text-jcc-navy py-6 overflow-hidden border-b-8 border-jcc-navy flex">
        <div className="devo-marquee flex whitespace-nowrap items-center font-anton text-4xl md:text-6xl uppercase tracking-widest">
          {Array(8).fill('Feed Your Spirit - Renew Your Mind - ').map((text, i) => <span key={i} className="mx-6">{text}</span>)}
        </div>
      </div>

      {/* DEVOTIONALS LISTING - BRUTALIST GRID */}
      <section className="py-24 md:py-40 relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {loading ? <div className="flex flex-col items-center justify-center py-32 space-y-8">
              <div className="w-24 h-24 border-8 border-jcc-navy border-t-jcc-gold rounded-full animate-spin"></div>
              <p className="text-jcc-navy font-anton text-3xl uppercase tracking-widest">Aligning The Word...</p>
            </div> : <>
              {loadError && <p role="alert" className="text-center py-12 text-red-700">{loadError}</p>}
              {devotionals.length === 0 && !loading && !loadError && <div className="text-center py-32 border-4 border-jcc-navy border-dashed bg-white shadow-[10px_10px_0_#1a365d]">
                  <p className="font-anton text-4xl text-jcc-navy uppercase">No seeds planted here yet.</p>
                </div>}

              <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {devotionals.map(d => {
              const dateStr = d.scheduled_date || d.created_at;
              const dateObj = dateStr ? new Date(dateStr) : null;
              const day = dateObj ? dateObj.getDate() : '--';
              const month = dateObj ? dateObj.toLocaleString('default', {
                month: 'short'
              }).toUpperCase() : '---';
              return <Link href={`/devotionals/${d.id}`} key={d.id} className="devo-card group relative bg-white border-4 border-jcc-navy shadow-[12px_12px_0_#1a365d] hover:shadow-[12px_12px_0_#EAB308] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 flex flex-col overflow-hidden">
                      {/* Image Container with hard geometric shapes */}
                      <div className="relative aspect-[4/3] overflow-hidden border-b-4 border-jcc-navy bg-[#0a0f1c]">
                        {d.image ? <Image src={d.image} alt={d.title ?? ''} fill className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal" unoptimized /> : <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-jcc-navy/20 to-jcc-gold/20" />}
                        
                        {/* Massive Date Stamp */}
                        <div className="absolute top-0 left-0 bg-jcc-gold text-jcc-navy border-r-4 border-b-4 border-jcc-navy px-4 py-2 flex flex-col items-center justify-center min-w-[80px]">
                          <span className="font-anton text-4xl leading-none">{day}</span>
                          <span className="font-bold text-xs uppercase tracking-widest">{month}</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 flex flex-col flex-grow bg-white">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="bg-jcc-navy text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 border-2 border-jcc-navy">
                            {estimateReadingTime(d.content || '')}
                          </span>
                        </div>

                        <h3 className="font-anton text-3xl text-jcc-navy mb-4 leading-[1.1] uppercase group-hover:text-jcc-gold transition-colors duration-300">
                          {d.title}
                        </h3>

                        <div className="text-jcc-navy/70 text-base line-clamp-3 mb-8 font-medium">
                          {d.content?.replace(/[#*`]/g, '').slice(0, 150)}...
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-6 border-t-4 border-jcc-navy">
                          <span className="font-black uppercase tracking-[0.2em] text-jcc-navy group-hover:text-jcc-gold transition-colors">
                            Read Word
                          </span>
                          <ArrowRight className="w-8 h-8 text-jcc-navy group-hover:translate-x-2 group-hover:text-jcc-gold transition-all duration-300" />
                        </div>
                      </div>
                    </Link>;
            })}
              </div>

            </>}
        </div>
      </section>
    </main>;
}
