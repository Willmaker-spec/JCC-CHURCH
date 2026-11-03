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
          <div className="newsletter-box bg-jcc-navy text-white rounded-[2rem] p-8 md:p-16 mb-16 relative overflow-hidden">
            
            {/* Subtle internal background pattern/shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Side */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20">
                  <Zap className="h-4 w-4 text-jcc-gold" />
                  <span className="text-jcc-gold font-bold text-xs tracking-widest uppercase">
                    {newsletter.badge}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wide mb-6">
                  {newsletter.headingPrimary} <br />
                  <span className="text-jcc-gold">{newsletter.headingAccent}</span>
                </h2>
                
                <p className="text-lg text-gray-300 leading-relaxed font-light">
                  {newsletter.description}
                </p>
              </div>

              {/* Form Side */}
              <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="relative">
                  {/* Inline Sleek Form */}
                  <div className="flex bg-white rounded-full p-2 shadow-lg focus-within:ring-4 focus-within:ring-jcc-gold/30 transition-shadow">
                    <div className="flex-1 flex items-center pl-4">
                      <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={newsletter.placeholder} required className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-jcc-navy font-medium px-4" />
                    </div>
                    <button type="submit" disabled={status === 'loading'} className="bg-jcc-gold hover:bg-jcc-orange text-jcc-navy font-bold rounded-full px-8 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                      {status === 'loading' ? <span>{newsletter.submitLoading}</span> : <>
                          <span className="hidden sm:inline">{newsletter.submitIdle}</span>
                          <Send className="h-4 w-4" />
                        </>}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {status === 'success' && <div className="absolute -bottom-16 left-0 w-full p-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center gap-2 text-green-400 font-medium text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>{newsletter.successMessage}</span>
                    </div>}
                  {status === 'error' && <div className="absolute -bottom-16 left-0 w-full p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center gap-2 text-red-400 font-medium text-sm">
                      <span>✗ {newsletter.errorMessage}</span>
                    </div>}
                </form>

                <p className="text-xs text-gray-400 text-center mt-6">
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
