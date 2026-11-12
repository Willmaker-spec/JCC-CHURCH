'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import { Mail, Send, CheckCircle, Zap, Star, Shield, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/lib/supabase'
gsap.registerPlugin(ScrollTrigger);
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const {
    messages
  } = useLanguage();
  const newsletter = messages.home.newsletter;
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth slide up for the main container
      gsap.from('.newsletter-box', {
        scrollTrigger: {
          trigger: '.newsletter-box',
          start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Staggered slide up for the benefit cards
      gsap.from('.newsletter-benefit', {
        scrollTrigger: {
          trigger: '.newsletter-benefits-grid',
          start: 'top 90%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      if (!supabase) {
        throw new Error('Newsletter sign-up is temporarily unavailable.')
      }
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim().toLowerCase() })
      if (error && error.code !== '23505') {
        console.error('Unable to save newsletter subscription:', error)
        throw new Error('Unable to subscribe right now.')
      }
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Newsletter subscription failed:', error)
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Replaced Emojis with clean Lucide icons
  const benefitIcons = [Star, Shield, ArrowUpRight];
  return <section ref={containerRef} id="stay-connected" className="py-24 md:py-32 bg-white relative z-20">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Main Newsletter Box */}
          <div className="newsletter-box relative mb-16 overflow-hidden rounded-[2rem] bg-jcc-navy p-6 text-white sm:p-8 md:p-12 lg:p-16">
            <div className="absolute right-0 top-0 h-52 w-52 translate-x-1/3 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                  <Zap className="h-4 w-4 text-jcc-gold" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-jcc-gold">
                    {newsletter.badge}
                  </span>
                </div>

                <h2 className="mb-6 font-anton text-3xl uppercase tracking-wide sm:text-4xl md:text-5xl">
                  {newsletter.headingPrimary} <br />
                  <span className="text-jcc-gold">{newsletter.headingAccent}</span>
                </h2>

                <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                  {newsletter.description}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-2 shadow-[0_16px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex flex-1 items-center gap-3 rounded-[16px] bg-white px-4 py-3 text-jcc-navy shadow-inner">
                        <Mail className="h-5 w-5 shrink-0 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={newsletter.placeholder}
                          required
                          className="w-full border-none bg-transparent text-sm text-jcc-navy placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:text-base"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="inline-flex items-center justify-center gap-2 rounded-[16px] bg-jcc-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-jcc-navy transition-all duration-200 hover:bg-[#f2c76f] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[170px]"
                      >
                        {status === 'loading' ? (
                          <span>{newsletter.submitLoading}</span>
                        ) : (
                          <>
                            <span>{newsletter.submitIdle}</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {status === 'success' && (
                    <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/20 px-3 py-2 text-sm font-medium text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>{newsletter.successMessage}</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/20 px-3 py-2 text-sm font-medium text-red-400">
                      <span>✗ {newsletter.errorMessage}</span>
                    </div>
                  )}
                </form>

                <p className="mt-5 text-center text-xs text-gray-400">
                  {newsletter.privacyNote}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="newsletter-benefits-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsletter.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            return <div key={benefit.title} className="newsletter-benefit bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-300 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-jcc-gold" />
                  </div>
                  <h3 className="font-bold text-jcc-navy mb-3">{benefit.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>;
          })}
          </div>

        </div>
      </div>
    </section>;
}
