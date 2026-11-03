"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, Flame, Users, Heart, CalendarDays, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/lib/supabase';
gsap.registerPlugin(ScrollTrigger);
const upcomingEvents = [{
  id: 'understanding-salvation',
  title: '4 Days of Understanding Salvation',
  tagline: 'Intensive Discipleship Training',
  description: 'A 4-day intensive discipleship training designed to ground participants in the foundational truth of the Gospel. Registration closes once all 6 slots are filled.',
  date: 'April 13, 14, 16, 17, 2026',
  time: '7:00 PM Nightly',
  location: 'Online (Google Meet)',
  type: 'Intensive',
  image: '/images/event-hero.jpg',
  featured: false,
  ctaLabel: 'Secure Slot',
  ctaLink: '/events/understanding-salvation'
}, {
  id: 'nation-takers-webinar',
  title: 'Nation Takers Career Webinar 1.0',
  tagline: 'Building Career Greatness',
  description: 'A mindset-shifting career intervention focusing on how professionals can move from competence to significance by developing leadership capacity.',
  date: 'February 7, 2026',
  time: '10:00 AM WAT',
  location: 'Online (Google Meet)',
  type: 'Webinar',
  image: '/images/celebration.jpg',
  featured: false,
  ctaLabel: 'Register',
  ctaLink: '/events/nation-takers-webinar'
}, {
  id: 'rooted',
  title: 'Rooted (Monthly Gathering)',
  tagline: 'Great Sermons, Deep Connections',
  description: 'Our monthly in-person gathering for powerful preaching and community connection. Come for life-changing sermons and stay for fellowship.',
  date: 'First Saturday Monthly',
  time: '10:00 AM',
  location: 'The Light House, Mangoro',
  type: 'Gathering',
  image: '/images/rooted2.JPG',
  featured: false,
  ctaLabel: 'Details',
  ctaLink: '/events/rooted'
}, {
  id: 'heart-room',
  title: 'The Heart Room',
  tagline: 'Transmission Concluded',
  description: 'This experience has officially ended. The archives are currently sealed. Thank you to everyone who participated.',
  date: 'Ended',
  time: 'Archived',
  location: 'Archived',
  type: 'Closed Event',
  image: '/images/event-hero.jpg',
  featured: false,
  ctaLabel: 'View Archive',
  ctaLink: '/events/heart-room'
}, {
  id: 'manual',
  title: 'The Manual',
  tagline: 'Event Concluded',
  description: 'Thank you for your interest. The Manual event has ended, but there are still plenty of opportunities to connect with us.',
  date: 'Ended',
  time: 'Archived',
  location: 'Archived',
  type: 'Closed Event',
  image: '/images/manual.jpg',
  featured: false,
  ctaLabel: 'View Archive',
  ctaLink: '/events/manual'
}, {
  id: 'watch-hour',
  title: 'Watch Hour Prayers',
  tagline: 'Friday Night Intercession',
  description: 'Join us as we stand in the gap, pray for the Body of Christ, and strengthen one another in passionate intercession.',
  date: 'Bi-weekly Fridays',
  time: '9:00 PM',
  location: 'The Light House & Online',
  type: 'Prayer Watch',
  image: '/images/watch_hour.jpg',
  featured: false,
  ctaLabel: 'Details',
  ctaLink: '/events'
}, {
  id: 'fire-conference',
  title: 'Fire Conference',
  tagline: 'An Encounter with the Holy Spirit',
  description: 'Our annual youth and teenage conference designed to ignite your passion for God. Experience days of powerful worship and supernatural encounters.',
  date: 'Annually in August',
  time: 'One-Day Conference',
  location: 'The Light House',
  type: 'Youth Conference',
  image: '/images/fire-conference.jpg',
  featured: false,
  ctaLabel: 'Info',
  ctaLink: '/events'
}, {
  id: 'tarry',
  title: 'Tarry',
  tagline: 'Extended Hours of Prayer & Worship',
  description: 'A small, intimate gathering where we tarry in God\'s presence, interceding for the church, nations, and revival.',
  date: 'Regular Meetings',
  time: 'Check Schedule',
  location: 'The Light House & Online',
  type: 'Prayer Meeting',
  image: '/images/tarry.jpg',
  featured: false,
  ctaLabel: 'Join',
  ctaLink: '/events'
}];
export default function EventsPage() {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [dynamicEvents, setDynamicEvents] = useState([]);
  const cursorRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const listRef = useRef(null);
  const displayedEvents = [...upcomingEvents, ...dynamicEvents];

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    supabase
      .from('events')
      .select('slug, title, tagline, description, event_date, event_time, location, event_type, image')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error('Unable to load published events:', error);
          return;
        }
        setDynamicEvents((data || []).map(event => ({
          id: event.slug,
          title: event.title,
          tagline: event.tagline,
          description: event.description,
          date: event.event_date,
          time: event.event_time,
          location: event.location,
          type: event.event_type,
          image: event.image || '/images/event-hero.jpg',
          ctaLabel: 'Register',
          ctaLink: `/events/${event.slug}`,
        })));
      });

    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    // Custom cursor image revealer for Desktop Only
    let xTo;
    let yTo;
    const cursor = cursorRef.current;
    if (cursor) {
      xTo = gsap.quickTo(cursor, "x", {
        duration: 0.4,
        ease: "power3"
      });
      yTo = gsap.quickTo(cursor, "y", {
        duration: 0.4,
        ease: "power3"
      });
      const handleMouseMove = e => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquees
      if (marquee1Ref.current && marquee2Ref.current) {
        gsap.to(marquee1Ref.current, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: "linear"
        });
        gsap.set(marquee2Ref.current, {
          xPercent: -50
        });
        gsap.to(marquee2Ref.current, {
          xPercent: 0,
          repeat: -1,
          duration: 35,
          ease: "linear"
        });
      }

      // Stagger list items - if this doesn't trigger, they stay invisible. Let's make it more resilient.
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.event-row');
        gsap.from(items, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 90%",
            // trigger earlier
            toggleActions: "play none none none"
          }
        });
      }
    });
    return () => ctx.revert(); // crucial for React Strict Mode cleanup
  }, []);
  return <main className="min-h-screen bg-[#fafafa] text-jcc-navy overflow-hidden selection:bg-jcc-gold selection:text-white">
      
      {/* Floating Image Cursor (Hidden on Mobile) */}
      <div ref={cursorRef} className={`fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 transition-opacity duration-500 hidden lg:block ${hoveredEvent ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`relative w-full h-full rounded-2xl overflow-hidden -translate-x-1/2 -translate-y-1/2 shadow-2xl transition-transform duration-500 ${hoveredEvent ? 'scale-100' : 'scale-90'}`}>
          {displayedEvents.map(event => <div key={`img-${event.id}`} className="absolute inset-0 transition-opacity duration-500" style={{
          opacity: hoveredEvent === event.id ? 1 : 0
        }}>
              <Image src={event.image} alt={event.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-black/10" />
            </div>)}
        </div>
      </div>

      {/* Brutalist Hero Marquee */}
      <section className="pt-40 pb-20 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 h-32 bg-jcc-gold rounded-full blur-[100px] opacity-50" />
        
        <div className="flex flex-col gap-4 whitespace-nowrap select-none w-[200vw]">
          {/* Marquee Line 1 - Solid */}
          <div ref={marquee1Ref} className="flex gap-8 items-center">
            {[...Array(4)].map((_, i) => <h1 key={i} className="font-anton text-[25vw] md:text-[12vw] leading-[0.8] tracking-tighter uppercase flex items-center gap-8">
                The Gatherings <Sparkles className="w-[15vw] h-[15vw] md:w-[8vw] md:h-[8vw] text-jcc-gold" />
              </h1>)}
          </div>

          {/* Marquee Line 2 - Outline */}
          <div ref={marquee2Ref} className="flex gap-8 items-center">
            {[...Array(4)].map((_, i) => <h1 key={i} className="font-anton text-[25vw] md:text-[12vw] leading-[0.8] tracking-tighter uppercase flex items-center gap-8 text-transparent" style={{
            WebkitTextStroke: '2px #1a365d'
          }}>
                Experience God <Flame className="w-[15vw] h-[15vw] md:w-[8vw] md:h-[8vw] text-transparent stroke-jcc-navy stroke-[2px]" />
              </h1>)}
          </div>
        </div>

        <div className="container mx-auto px-4 mt-20">
          <p className="max-w-md ml-auto text-right text-lg font-medium text-jcc-navy/60 leading-relaxed">
            We reject the ordinary. Our gatherings are designed to be powerful, intimate, and life-transforming encounters with the Spirit.
          </p>
        </div>
      </section>

      {/* Featured Event: The Unlearning Conference (Data from latest pull) */}
      <section className="py-24 bg-jcc-gold text-jcc-navy relative z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(#1a365d 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <Sparkles className="w-8 h-8" />
            <h2 className="font-bold uppercase tracking-[0.3em] text-sm">Featured Encounter</h2>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <h3 className="font-anton text-6xl md:text-8xl xl:text-[9rem] uppercase leading-[0.85] tracking-tighter mb-8">
                The <br />
                <span className="text-white" style={{
                WebkitTextStroke: '2px #1a365d'
              }}>Unlearning</span> <br />
                Conference
              </h3>
              <p className="text-xl md:text-2xl font-medium max-w-2xl mb-12 leading-relaxed text-jcc-navy/80">
                Ten days to lay down everything religion taught us to carry, and pick up what God actually said. Daily sermons at 10AM and live reviews at 8:30PM.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center">
                <Link href="/events/unlearning-conference" className="bg-jcc-navy text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-jcc-navy transition-colors duration-300 flex items-center gap-4 border-2 border-jcc-navy">
                  Register Now <ArrowUpRight />
                </Link>
                <div className="flex flex-wrap gap-8 text-sm font-bold uppercase tracking-widest text-jcc-navy/80">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-jcc-navy" /> Jun 29 - Jul 10
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-jcc-navy" /> Online (WhatsApp)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative h-[400px] lg:h-[700px] w-full group">
               <div className="absolute inset-0 bg-jcc-navy translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8" />
               <Image src="/images/hero.jpg" alt="The Unlearning Conference" fill className="object-cover relative z-10 opacity-90 group-hover:opacity-100 transition-all duration-700" unoptimized />
               <div className="absolute inset-0 z-20 border-4 border-jcc-navy pointer-events-none" />
               
               <div className="absolute -bottom-10 -left-10 z-30 w-40 h-40 bg-white rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] border-4 border-jcc-navy">
                 <span className="font-anton text-2xl text-jcc-navy uppercase text-center leading-none">
                   Don&apos;t <br /> Miss <br /> This
                 </span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experimental Event List */}
      <section className="py-20 relative z-20 bg-jcc-navy text-white">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8 mt-20">
            <h2 className="font-anton text-5xl md:text-7xl uppercase">More<br /><span className="text-jcc-gold">Encounters</span></h2>
            <div className="hidden md:flex gap-4 items-center text-white/50 text-sm font-black uppercase tracking-[0.2em]">
              <span>[ Scroll ]</span>
              <ArrowUpRight className="rotate-45" />
            </div>
          </div>

          <div ref={listRef} className="flex flex-col border-t border-white/10">
            {displayedEvents.map(event => <Link href={event.ctaLink || '#'} key={event.id} className="event-row group relative flex flex-col lg:flex-row lg:items-center justify-between py-12 lg:py-16 border-b border-white/10 hover:bg-white/5 transition-colors duration-500 cursor-pointer px-4 lg:px-8 -mx-4 lg:-mx-8" onMouseEnter={() => setHoveredEvent(event.id)} onMouseLeave={() => setHoveredEvent(null)}>
                
                {/* Mobile Inline Image (Hidden on Desktop) */}
                <div className="lg:hidden w-full h-56 relative mb-8 rounded-[2rem] overflow-hidden">
                  <Image src={event.image} alt={event.title} fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Meta details */}
                <div className="flex-1 mb-8 lg:mb-0 pr-0 lg:pr-8">
                  <p className="text-jcc-gold font-bold uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-4">
                    {event.type}
                    <span className="w-12 h-[1px] bg-jcc-gold/50" />
                  </p>
                  <h3 className="font-anton text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500 mb-4">
                    {event.title}
                  </h3>
                  <p className="text-white/70 font-medium max-w-xl group-hover:text-white transition-colors duration-300 line-clamp-3 md:line-clamp-none text-sm md:text-base">
                    {event.description}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-12 items-center justify-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Date & Time</span>
                    <span className="font-medium whitespace-nowrap text-lg">{event.date}</span>
                    <span className="text-white/80 text-sm">{event.time}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Location</span>
                    <span className="font-medium text-lg leading-tight">{event.location}</span>
                  </div>
                  
                  {/* Brutalist Button */}
                  <div className="col-span-2 md:col-span-1 mt-4 lg:mt-0 flex justify-start md:justify-end">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-jcc-gold flex items-center justify-center group-hover:bg-jcc-gold transition-colors duration-500">
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-jcc-gold group-hover:text-jcc-navy transition-colors duration-500" />
                    </div>
                  </div>
                </div>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Deconstructed "Why Attend" */}
      <section className="py-32 bg-[#fafafa] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Chaotic Typographic Block */}
            <div className="relative">
              <h2 className="font-anton text-[8rem] md:text-[12rem] leading-[0.8] text-jcc-navy/5 uppercase absolute -top-20 -left-10 select-none">
                WHY
              </h2>
              <div className="relative z-10 space-y-12">
                <div>
                  <div className="w-12 h-12 bg-jcc-gold mb-6 rotate-12 flex items-center justify-center">
                    <Flame className="text-white w-6 h-6 -rotate-12" />
                  </div>
                  <h3 className="font-anton text-4xl uppercase mb-4">Pure Encounter</h3>
                  <p className="text-lg text-jcc-navy/60 font-medium max-w-md">
                    Strip away the performance. We gather solely to experience the raw, transformative power of God&apos;s presence.
                  </p>
                </div>
                
                <div className="pl-12 lg:pl-24">
                  <div className="w-12 h-12 border-4 border-jcc-navy mb-6 -rotate-6 flex items-center justify-center">
                    <Users className="text-jcc-navy w-5 h-5 rotate-6" />
                  </div>
                  <h3 className="font-anton text-4xl uppercase mb-4">Deep Roots</h3>
                  <p className="text-lg text-jcc-navy/60 font-medium max-w-md">
                    Build indestructible foundations through rigorous discipleship and unyielding community support.
                  </p>
                </div>
              </div>
            </div>

            {/* Brutalist Contact Block */}
            <div className="bg-jcc-navy p-12 md:p-20 relative group">
              <div className="absolute inset-0 border-2 border-jcc-navy translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
              
              <Heart className="w-16 h-16 text-jcc-gold mb-10" />
              <h2 className="font-anton text-5xl md:text-7xl text-white uppercase leading-[0.9] mb-8">
                Host An<br />Event<br />With Us
              </h2>
              
              <Link href="/contact" className="inline-flex items-center gap-4 bg-jcc-gold text-jcc-navy px-8 py-4 font-black uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300">
                Reach Out <ArrowUpRight />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>;
}
