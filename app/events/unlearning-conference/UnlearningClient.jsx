'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Sunrise, Moon, Sparkles, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UnlearningRegistrationForm from '@/components/events/UnlearningRegistrationForm';
gsap.registerPlugin(ScrollTrigger);
const phases = [{
  step: '01',
  title: 'Learning',
  body: 'We have learned a lot. We gathered, we read, we listened, and we built a foundation of faith.',
  state: 'done'
}, {
  step: '02',
  title: 'Unlearning',
  body: 'Naming the religious mindsets that keep us bound, and separating what God said from what religion told us.',
  state: 'now'
}, {
  step: '03',
  title: 'Relearning',
  body: 'Rebuilding on truth, walking with God by His word and His wisdom instead of performance.',
  state: 'next'
}];
export default function UnlearningClient() {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.hero-text-line', {
        y: 150,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      });
      gsap.from('.hero-badge', {
        scale: 0,
        rotation: 45,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.8
      })

      // Section Fade Ups
;
      gsap.utils.toArray('.gsap-fade-up').forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%'
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Phase Cards Stagger
      gsap.from('.phase-card', {
        scrollTrigger: {
          trigger: '.phases-container',
          start: 'top 75%'
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <main ref={containerRef} className="bg-slate-50 selection:bg-tlcc-orange selection:text-white min-h-screen overflow-hidden">
      
      {/* MASSIVE HERO */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#0a0f1c] text-white pt-32 pb-20 px-4 md:px-8">
        {/* Image Background */}
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/tlc-unlearn.jpg" alt="Hero Background" fill className="object-cover opacity-20 object-top mix-blend-screen scale-105" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent" />
        </div>

        {/* Dynamic Background */}
        <div className="absolute inset-0 w-full h-full opacity-40" style={{
        backgroundImage: 'radial-gradient(circle at 50% 0%, #1e3a8a 0%, transparent 70%)',
        mixBlendMode: 'screen'
      }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-tlcc-navy/30 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            
            {/* Massive Typography */}
            <div className="flex-1">
              <div className="overflow-hidden mb-4">
                <p className="hero-text-line text-tlcc-gold uppercase tracking-[0.3em] font-bold text-sm md:text-base flex items-center gap-3">
                  <span className="w-8 h-px bg-tlcc-gold" />
                  10-Day Online Conference
                </p>
              </div>
              
              <h1 className="font-anton text-[15vw] lg:text-[10rem] leading-[0.8] uppercase tracking-tight flex flex-col">
                <div className="overflow-hidden pb-4"><span className="hero-text-line block">The</span></div>
                <div className="overflow-hidden pb-4"><span className="hero-text-line block text-tlcc-orange italic">Unlearning</span></div>
                <div className="overflow-hidden pb-4"><span className="hero-text-line block">Conference</span></div>
              </h1>
            </div>

            {/* Floating Info Card */}
            <div className="hero-badge w-full lg:w-80 shrink-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-tlcc-gold rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] shadow-lg">
                <ArrowUpRight className="w-6 h-6 text-tlcc-navy" />
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Ten days to lay down what religion taught us and pick up what God actually said.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-medium border-b border-white/10 pb-4">
                  <Calendar className="w-5 h-5 text-tlcc-gold" />
                  Jun 29 - Jul 10, 2026
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Sunrise className="w-5 h-5 text-tlcc-gold" />
                  Sermons @ 10:00 AM
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Moon className="w-5 h-5 text-tlcc-gold" />
                  Review @ 8:30 PM
                </div>
              </div>

              <Link href="#register" className="w-full block text-center bg-white text-tlcc-navy py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-tlcc-gold transition-colors">
                Reserve Seat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERSIZED IMAGE DIVIDER */}
      <div className="w-full h-32 md:h-64 bg-tlcc-navy relative">
        <div className="absolute inset-x-0 bottom-0 top-1/2 rounded-t-[4rem] bg-slate-50 border-t-8 border-tlcc-gold" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-11/12 max-w-5xl h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl z-10 hero-badge">
          <Image src="/images/tlc-unlearn.jpg" alt="Unlearning Event" fill className="object-cover object-top scale-105 hover:scale-100 transition-transform duration-1000" unoptimized />
          <div className="absolute inset-0 bg-tlcc-navy/20 mix-blend-multiply" />
        </div>
      </div>

      {/* WHY THIS CONFERENCE - BRUTALIST TYPOGRAPHY */}
      <section className="pt-64 md:pt-96 pb-20 md:pb-40 px-4">
        <div className="container mx-auto max-w-5xl">
          <p className="text-tlcc-orange font-bold uppercase tracking-[0.3em] mb-8 text-sm gsap-fade-up">Why this conference</p>
          <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] text-tlcc-navy mb-16 gsap-fade-up">
            We have learned. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tlcc-navy to-tlcc-orange">Now we unlearn.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            <p className="gsap-fade-up">
              There are three levels of growing with God: <strong className="text-tlcc-navy border-b-2 border-tlcc-gold">learning</strong>,{' '}
              <strong className="text-tlcc-navy border-b-2 border-tlcc-gold">unlearning</strong>, and{' '}
              <strong className="text-tlcc-navy border-b-2 border-tlcc-gold">relearning</strong>. As a community, we have learned a lot. But somewhere along the way, religion crept in beside the truth.
            </p>
            <p className="gsap-fade-up">
              Religion is man&apos;s way of reaching God: the things we do to earn His approval. It is subtle. For ten days, we are going to name those mindsets out loud, and set them down forever.
            </p>
          </div>
        </div>
      </section>

      {/* THE PHASES - ASYMMETRIC GRID */}
      <section className="py-20 md:py-40 bg-tlcc-navy text-white px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 100% 0%, #EAB308 0%, transparent 50%)'
      }} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <h2 className="font-anton text-6xl md:text-8xl uppercase mb-20 md:mb-40 text-center gsap-fade-up">The Phases</h2>
          
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 phases-container">
            {phases.map(phase => <div key={phase.step} className={`phase-card relative p-8 md:p-12 rounded-[2.5rem] ${phase.state === 'now' ? 'bg-tlcc-orange text-white lg:-translate-y-12' : 'bg-white/5 border border-white/10'}`}>
                <div className="font-anton text-6xl opacity-30 mb-8">{phase.step}</div>
                <h3 className="text-3xl font-bold mb-4 uppercase tracking-wide">{phase.title}</h3>
                <p className={`text-lg ${phase.state === 'now' ? 'text-white/90' : 'text-slate-400'}`}>{phase.body}</p>
                {phase.state === 'now' && <div className="absolute -top-4 -right-4 bg-tlcc-gold text-tlcc-navy text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full transform rotate-12 shadow-xl">
                    We Are Here
                  </div>}
              </div>)}
          </div>
        </div>
      </section>

      {/* REGISTRATION SECTION - GLASS STICKY FORM */}
      <section id="register" className="py-20 md:py-40 px-4 bg-slate-50 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Copy */}
            <div className="gsap-fade-up sticky top-32">
              <h2 className="font-anton text-5xl md:text-8xl uppercase leading-[0.8] text-tlcc-navy mb-8">
                Step In. <br />
                <span className="text-tlcc-orange italic">Take the</span><br />
                Pledge.
              </h2>
              <p className="text-xl text-slate-600 mb-12 max-w-md">
                Registration is one short step. The moment you take the pledge, the conference WhatsApp group unlocks, and that&apos;s where every sermon and review will be shared daily.
              </p>

              <div className="space-y-6">
                {['Daily sermons released by 10:00 AM', 'Live sermon review every night at 8:30 PM', 'Direct access to the conference WhatsApp group'].map((item, i) => <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-tlcc-navy text-tlcc-gold flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <p className="text-lg font-medium text-slate-700">{item}</p>
                  </div>)}
              </div>
            </div>

            {/* Right Form */}
            <div className="hero-badge bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(26,54,93,0.1)] border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-tlcc-gold to-tlcc-orange" />
              <UnlearningRegistrationForm />
            </div>

          </div>

          {/* Mini Link to Other Events */}
          <div className="mt-24 text-center gsap-fade-up">
            <Link href="/events" className="inline-flex items-center text-slate-500 hover:text-tlcc-orange font-bold text-xs md:text-sm uppercase tracking-widest transition-colors group">
              Explore All Events
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </main>;
}
