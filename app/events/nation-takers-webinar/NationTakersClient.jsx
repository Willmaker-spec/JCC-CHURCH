'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Video, Users, ArrowRight, Target, Network, Layers, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WebinarRegistrationForm from '@/components/events/WebinarRegistrationForm';
gsap.registerPlugin(ScrollTrigger);
const takeaways = [{
  icon: Target,
  title: 'Strategic Clarity',
  body: 'Navigate career transitions and industry shifts with a high-level master plan.'
}, {
  icon: Users,
  title: 'Leadership Capacity',
  body: 'Develop the mindset required to lead beyond your current functional role.'
}, {
  icon: Network,
  title: 'Intentional Thinking',
  body: 'Build frameworks for long-term career impact that compound over time.'
}, {
  icon: Layers,
  title: 'Vision Alignment',
  body: 'Align your daily professional output with your ultimate God-given purpose.'
}, {
  icon: Zap,
  title: 'Scale Influence',
  body: 'Actionable steps to move from mere competence to undeniable significance.'
}];
export default function NationTakersClient() {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Brutalist Header Stagger
      gsap.from('.webinar-header span', {
        y: 200,
        opacity: 0,
        rotate: 5,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out'
      });

      // Marquee Setup
      const marquee = document.querySelector('.webinar-marquee');
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          repeat: -1,
          duration: 15,
          ease: 'linear'
        });
      }

      // Scroll Fade Ups
      ;
      gsap.utils.toArray('.gsap-up').forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%'
          },
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });

      // Takeaways Stagger
      gsap.from('.takeaway-item', {
        scrollTrigger: {
          trigger: '.takeaway-container',
          start: 'top 75%'
        },
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.2)'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <main ref={containerRef} className="bg-slate-50 selection:bg-blue-600 selection:text-white min-h-screen overflow-hidden">
      
      {/* MASSIVE BRUTALIST HERO */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#0a0f1c] text-white pt-32 pb-20 px-4 md:px-8">
        {/* Image Background */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/celebration.jpg" alt="Hero Background" fill className="object-cover opacity-30 object-center mix-blend-screen scale-105" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent" />
        </div>

        {/* Dynamic Abstract Background */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-600/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-jcc-navy/50 blur-[120px] rounded-full pointer-events-none -translate-x-1/4 translate-y-1/4" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:items-end">
            
            {/* Title Block */}
            <div className="flex-1">
              <div className="mb-6 overflow-hidden">
                <span className="webinar-header inline-block px-4 py-1 border border-blue-500 text-blue-400 font-bold uppercase tracking-widest text-xs rounded-full">
                  Career Webinar 1.0
                </span>
              </div>
              
              <h1 className="font-anton text-[12vw] lg:text-[9rem] leading-[0.8] uppercase tracking-tighter flex flex-col mb-8 text-white">
                <div className="overflow-hidden pb-4"><span className="webinar-header block">Nation</span></div>
                <div className="overflow-hidden pb-4"><span className="webinar-header block text-blue-500 italic">Takers</span></div>
              </h1>

              <div className="overflow-hidden">
                <p className="webinar-header text-xl md:text-3xl text-slate-400 font-medium leading-snug max-w-2xl border-l-4 border-blue-500 pl-6">
                  Building Career Greatness: Scaling Impact, Leadership & Vision in a Changing World.
                </p>
              </div>
            </div>

            {/* Event Details Card */}
            <div className="w-full lg:w-96 shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-2xl rounded-full" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Date</p>
                    <p className="font-semibold text-white">Sat, Feb 7, 2026</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Time</p>
                    <p className="font-semibold text-white">10:00 AM WAT</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Venue</p>
                    <p className="font-semibold text-white">Online (Google Meet)</p>
                  </div>
                </div>
              </div>

              <Link href="#register" className="mt-8 block w-full text-center bg-blue-600 text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#0a0f1c] transition-colors relative z-10">
                Claim Your Access
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* CONTINUOUS MARQUEE */}
      <div className="bg-blue-600 text-white py-6 overflow-hidden border-y border-blue-400/30 flex">
        <div className="webinar-marquee flex whitespace-nowrap items-center font-anton text-3xl md:text-5xl uppercase tracking-wider">
          {Array(8).fill('Move from competence to significance - ').map((text, i) => <span key={i} className="mx-4">{text}</span>)}
        </div>
      </div>

      {/* CORE CONTENT SECTION */}
      <section className="py-24 md:py-40 px-4 bg-slate-50 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="gsap-up mb-20">
                <h2 className="font-anton text-5xl md:text-7xl uppercase text-[#0a0f1c] mb-8 leading-[0.9]">
                  A Mindset-Shifting <br />
                  <span className="text-blue-600">Intervention.</span>
                </h2>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                  This is not a motivational talk. It focuses on how professionals can move from mere competence to significance by developing leadership capacity, intentional thinking, and strategic clarity.
                </p>
              </div>

              <div className="gsap-up mb-16">
                <h3 className="font-anton text-3xl md:text-4xl uppercase text-[#0a0f1c] mb-8 border-b-2 border-slate-200 pb-4">What You&apos;ll Gain</h3>
                <div className="space-y-6 takeaway-container">
                  {takeaways.map((item, index) => {
                  const Icon = item.icon;
                  return <div key={index} className="takeaway-item flex gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#0a0f1c] mb-2">{item.title}</h4>
                          <p className="text-slate-500 leading-relaxed">{item.body}</p>
                        </div>
                      </div>;
                })}
                </div>
              </div>

              {/* Host Card */}
              <div className="gsap-up bg-[#0a0f1c] rounded-[3rem] p-10 md:p-12 text-white relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20 pointer-events-none" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-400 mb-6 relative z-10">Hosted By</h3>
                <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start relative z-10">
                  
                  {/* Pastor Image */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-[2rem] overflow-hidden bg-jcc-navy transform group-hover:rotate-3 transition-transform duration-500 shadow-2xl border-2 border-blue-500/30">
                    <Image src="/images/pastor.JPG" alt="Peter Nelson-Isaiah" fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" unoptimized />
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                  </div>

                  <div>
                    <p className="font-anton text-4xl md:text-5xl uppercase mb-3 leading-none">Peter <br />Nelson-Isaiah</p>
                    <p className="text-slate-400 font-medium">Visionary, Jubilee Christian Centre Church</p>
                    <p className="text-blue-300 font-medium mt-1">Alongside Industry Expert Speakers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Registration Form */}
            <div className="lg:col-span-5">
              <div id="register" className="sticky top-10">
                <div className="gsap-up relative overflow-hidden rounded-[3rem] bg-white shadow-2xl ring-1 ring-slate-100 p-8 md:p-12">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-700" />
                  <div className="mb-8 text-center">
                    <h3 className="font-anton text-3xl uppercase text-[#0a0f1c] mb-2">Secure Your Access</h3>
                    <p className="text-slate-500 text-sm">Register now to receive the meeting link.</p>
                  </div>
                  <WebinarRegistrationForm />
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 gsap-up">
                  <div className="h-px w-8 bg-slate-200"></div>
                  <p className="text-xs font-medium uppercase tracking-widest">Free Admission</p>
                  <div className="h-px w-8 bg-slate-200"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 px-4 bg-[#0a0f1c] text-center border-t border-white/5">
        <Link href="/events" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to all events
        </Link>
      </section>

    </main>;
}
