"use client";

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import simpleMarkdownToHtml from '@/lib/markdown';
import { ArrowLeft, Share2, Clock, Check } from 'lucide-react';
import { gsap } from 'gsap';
export default function DevotionalDetailClient({
  devotional
}) {
  const [shareStatus, setShareStatus] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const containerRef = useRef(null);
  const renderedHtml = devotional?.content ? simpleMarkdownToHtml(devotional.content) : '';

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.devo-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });
      gsap.from('.devo-meta', {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        delay: 0.4
      });
      gsap.from('.devo-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Reading Progress Logic
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? scrolled / height * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({
          title: devotional?.title || 'Devotional',
          url
        });
        setShareStatus('Shared');
      } else {
        await navigator.clipboard.writeText(url);
        setShareStatus('Link copied');
      }
    } catch {
      setShareStatus('Error');
    }
    setTimeout(() => setShareStatus(''), 2000);
  };
  const dateStr = devotional.scheduled_date || devotional.created_at;
  const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).toUpperCase() : "";
  return <main ref={containerRef} className="min-h-screen bg-white pb-32 relative selection:bg-tlcc-orange selection:text-white">
      
      {/* MASSIVE FIXED PROGRESS INDICATOR */}
      <div className="fixed top-1/2 right-4 md:right-10 -translate-y-1/2 z-[100] mix-blend-difference pointer-events-none hidden md:block opacity-30">
        <span className="font-anton text-[8vw] text-white leading-none">
          {Math.round(readingProgress)}%
        </span>
      </div>

      {/* MOBILE PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-2 bg-tlcc-orange z-[10001] md:hidden" style={{
      width: `${readingProgress}%`
    }} />

      {/* BRUTALIST FLOATING BACK BUTTON */}
      <Link href="/devotionals" className="fixed left-4 md:left-8 top-8 z-50 group flex items-center gap-0 bg-white border-4 border-tlcc-navy p-1 pr-4 shadow-[6px_6px_0_#1a365d] hover:shadow-[0px_0px_0_#1a365d] hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
        <div className="w-10 h-10 bg-tlcc-navy flex items-center justify-center text-white mr-3">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="text-sm font-black uppercase tracking-widest text-tlcc-navy">Back</span>
      </Link>

      {/* MASSIVE EDITORIAL HERO */}
      <header className="relative min-h-[70vh] flex flex-col justify-end bg-tlcc-navy pt-32 pb-20 px-4 md:px-8 overflow-hidden border-b-8 border-tlcc-gold">
        {devotional.image ? <div className="absolute inset-0 z-0">
            <Image src={devotional.image} alt={devotional.title ?? ''} fill className="object-cover object-top opacity-50 scale-105" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-tlcc-navy via-tlcc-navy/40 to-transparent" />
          </div> : <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 mix-blend-overlay z-0" />}
        
        <div className="relative z-10 container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="devo-meta bg-tlcc-gold text-tlcc-navy font-black uppercase tracking-widest text-xs px-4 py-2 border-2 border-tlcc-gold">
              {formattedDate}
            </div>
            <div className="devo-meta bg-white text-tlcc-navy font-black uppercase tracking-widest text-xs px-4 py-2 border-2 border-white flex items-center gap-2">
              <Clock size={14} /> Daily Reading
            </div>
          </div>

          <div className="overflow-hidden mb-6">
            <h1 className="devo-title font-anton text-5xl md:text-7xl lg:text-9xl text-white leading-[1.1] uppercase tracking-normal">
              {devotional.title}
            </h1>
          </div>
        </div>
      </header>

      {/* EDITORIAL CONTENT */}
      <article className="container mx-auto px-4 max-w-4xl relative z-20 mt-16 md:mt-24">
        
        {/* The Body */}
        <div className="devo-content prose prose-lg md:prose-2xl prose-tlcc mx-auto max-w-none
            prose-headings:font-anton prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-tlcc-navy prose-headings:mt-16 prose-headings:mb-0
            prose-p:text-[#111] prose-p:leading-relaxed prose-p:font-medium prose-p:mt-0 prose-p:mb-3
            prose-ul:mt-0 prose-ol:mt-0 prose-li:my-1
            prose-strong:bg-tlcc-gold/20 prose-strong:text-tlcc-navy prose-strong:px-1
            prose-blockquote:border-l-[12px] prose-blockquote:border-tlcc-navy prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:my-12 prose-blockquote:font-anton prose-blockquote:text-3xl prose-blockquote:uppercase prose-blockquote:text-tlcc-navy prose-blockquote:not-italic
            first-letter:font-anton first-letter:text-8xl first-letter:float-left first-letter:mr-4 first-letter:text-tlcc-navy first-letter:leading-none first-letter:mt-2" dangerouslySetInnerHTML={{
        __html: renderedHtml
      }} />

        {/* BRUTALIST SHARE BLOCK */}
        <div className="mt-32 pt-16 border-t-8 border-black flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-anton text-4xl uppercase text-tlcc-navy mb-2">Spread The Word</h3>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Don&apos;t keep this to yourself</p>
          </div>
          
          <button type="button" onClick={handleShare} className="group w-full md:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-tlcc-gold border-4 border-tlcc-navy text-tlcc-navy font-black text-lg uppercase tracking-widest shadow-[8px_8px_0_#1a365d] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_#1a365d] transition-all duration-300">
            {shareStatus ? <>
                <Check size={24} className="animate-pulse" />
                <span>{shareStatus}</span>
              </> : <>
                <Share2 size={24} />
                <span>Share Story</span>
              </>}
          </button>
        </div>
        
        {/* Next/Prev Placeholder for Footer */}
        <div className="mt-16 text-center">
          <Link href="/devotionals" className="inline-flex items-center gap-4 font-black uppercase tracking-[0.2em] text-tlcc-navy hover:text-tlcc-orange transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Library
          </Link>
        </div>

      </article>
    </main>;
}
