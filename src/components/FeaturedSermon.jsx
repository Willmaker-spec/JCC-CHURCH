'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getLatestYouTubeVideo, formatDate } from '@/lib/youtube';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function FeaturedSermon() {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    messages
  } = useLanguage();
  const sermonMessages = messages.home.featuredSermon;
  const containerRef = useRef(null);
  useEffect(() => {
    async function fetchLatestVideo() {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
      if (!apiKey || !channelId) {
        console.warn('YouTube is not configured. Showing the featured sermon fallback.');
        setLoading(false);
        return;
      }
      try {
        const latestVideo = await getLatestYouTubeVideo(channelId, apiKey);
        setVideo(latestVideo);
      } catch (error) {
        console.error('Unable to load the latest sermon:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestVideo();
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    if (loading) return; // Don't animate until layout is stable

    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.from('.fs-headline', {
        scrollTrigger: {
          trigger: '.fs-header',
          start: 'top 85%'
        },
        y: 100,
        opacity: 0,
        rotation: 2,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out'
      });

      // The main video card slamming down
      gsap.from('.fs-card', {
        scrollTrigger: {
          trigger: '.fs-card',
          start: 'top 80%'
        },
        y: 150,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.2)'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);
  if (loading) {
    return <section className="relative py-24 md:py-40 bg-[#fafafa] border-t-8 border-jcc-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-anton text-7xl text-gray-300 uppercase animate-pulse">Loading Word...</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-200 animate-pulse h-96 border-8 border-gray-300"></div>
          </div>
        </div>
      </section>;
  }
  return <section ref={containerRef} className="relative py-24 md:py-40 bg-[#fafafa] border-t-8 border-jcc-navy overflow-hidden">
      
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-jcc-gold/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="fs-header text-center mb-16 md:mb-24">
          <div className="overflow-hidden mb-6">
            <div className="fs-headline inline-block bg-jcc-navy text-jcc-gold px-6 py-2 border-4 border-black font-black uppercase tracking-widest text-sm shadow-[6px_6px_0_black] transform -rotate-2">
              {sermonMessages.badge}
            </div>
          </div>
          <div className="overflow-hidden">
            <h2 className="fs-headline font-anton text-[14vw] md:text-[9rem] text-jcc-navy leading-[0.8] uppercase tracking-tighter">
              {sermonMessages.heading}
            </h2>
          </div>
        </div>

        {/* BRUTALIST VIDEO CARD */}
        <div className="fs-card max-w-6xl mx-auto">
          <div className="bg-white border-8 border-jcc-navy p-4 md:p-8 shadow-[20px_20px_0_#1a365d] relative group">
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* Thumbnail Section */}
              <Link href={video?.url || "https://youtube.com/@TheLightCommunity"} target="_blank" rel="noopener noreferrer" className="block relative h-64 md:h-[500px] w-full border-4 border-black overflow-hidden group-hover:border-jcc-gold transition-colors">
                <Image src={video?.thumbnail || "/images/sermon-placeholder.jpg"} alt={video?.title || "Latest Sermon"} fill className="object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" unoptimized />
                
                {/* Massive Brutalist Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-jcc-navy/20 group-hover:bg-transparent transition-colors">
                  <div className="w-24 h-24 bg-jcc-gold border-4 border-jcc-navy flex items-center justify-center shadow-[8px_8px_0_#1a365d] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0_#1a365d] transition-all duration-300 transform -rotate-3">
                    <Play className="h-12 w-12 text-jcc-navy ml-2" fill="currentColor" />
                  </div>
                </div>
              </Link>

              {/* Content Section */}
              <div className="flex flex-col justify-center">
                
                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-black text-white px-4 py-2 font-black uppercase tracking-widest text-xs md:text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-jcc-gold" />
                    <span>{video ? formatDate(video.publishedAt) : sermonMessages.fallbackDate}</span>
                  </div>
                  <div className="bg-jcc-navy text-jcc-gold px-4 py-2 font-black uppercase tracking-widest text-xs md:text-sm flex items-center gap-2 border-2 border-jcc-navy">
                    <Clock className="h-4 w-4" />
                    <span>{video?.duration || sermonMessages.fallbackDuration}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-anton text-4xl md:text-6xl text-jcc-navy mb-6 uppercase leading-none">
                  {video?.title || sermonMessages.fallbackTitle}
                </h3>

                <div className="border-l-8 border-jcc-gold pl-6 mb-10">
                  <p className="text-xl font-medium text-gray-700 leading-relaxed line-clamp-4">
                    {video?.description || sermonMessages.fallbackDescription}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href={video?.url || "https://youtube.com/@TheLightCommunity"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-jcc-gold text-jcc-navy font-black text-xl uppercase tracking-widest border-4 border-jcc-navy shadow-[6px_6px_0_#1a365d] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_#1a365d] transition-all">
                    <Play className="h-6 w-6 mr-3" fill="currentColor" />
                    {sermonMessages.watchCta}
                  </Link>

                  <Link href="/sermons" className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-jcc-navy font-black text-xl uppercase tracking-widest border-4 border-jcc-navy shadow-[6px_6px_0_#1a365d] hover:bg-jcc-navy hover:text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_#1a365d] transition-all group/btn">
                    <span>{sermonMessages.viewAll}</span>
                    <ArrowRight className="h-6 w-6 ml-3 group-hover/btn:translate-x-2 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
