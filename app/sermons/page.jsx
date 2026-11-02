'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAudioPlayer } from '@/components/providers/AudioPlayerProvider';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Search, Share2, Clock, CheckCircle2 } from 'lucide-react';
import { getChannelVideos, getChannelStats, searchChannelVideos, formatDate } from '@/lib/youtube';

function extractTopicsFromVideos(videos) {
  const topicMap = {};
  const keywords = ['Faith', 'Grace', 'Spirit', 'Holy Spirit', 'Prayer', 'Love', 'Hope', 'Forgiveness', 'Jesus', 'God', 'Cross', 'Salvation', 'Peace', 'Joy', 'Healing', 'Deliverance', 'Worship', 'Praise', 'Testimony', 'Miracle', 'Blessing', 'Prophecy', 'Redemption', 'Righteousness', 'Truth', 'Life', 'Kingdom', 'Power', 'Glory', 'Mercy', 'Covenant', 'Promise', 'Victory', 'Breakthrough', 'Transformation', 'Renewal', 'Revival', 'Anointing'];
  videos.forEach(video => {
    const title = video.title.toLowerCase();
    const description = video.description.toLowerCase();
    keywords.forEach(keyword => {
      if (title.includes(keyword.toLowerCase()) || description.includes(keyword.toLowerCase())) {
        topicMap[keyword] = (topicMap[keyword] || 0) + 1;
      }
    });
  });
  return Object.entries(topicMap).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([topic]) => topic);
}

export default function SermonsPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [totalVideoCount, setTotalVideoCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [featuredSermon, setFeaturedSermon] = useState(null);
  const [extractedTopics, setExtractedTopics] = useState([]);
  const [videosToShow, setVideosToShow] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadError, setLoadError] = useState('');
  const {
    currentAudio,
    setCurrentAudio
  } = useAudioPlayer();
  const getVideoId = url => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/);
    return match ? match[1] : null;
  };
  useEffect(() => {
    async function fetchSermons() {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
      if (!apiKey || !channelId) {
        setLoadError('Set VITE_YOUTUBE_API_KEY and VITE_YOUTUBE_CHANNEL_ID to load sermons.');
        setLoading(false);
        return;
      }

      try {
        const [allVideos, stats] = await Promise.all([
          getChannelVideos(channelId, apiKey, 50),
          getChannelStats(channelId, apiKey),
        ]);
        setVideos(allVideos);
        setDisplayedVideos(allVideos.slice(0, 12));
        setTotalVideoCount(stats?.videoCount || allVideos.length);
        setFeaturedSermon(allVideos[0] || null);
        setExtractedTopics(extractTopicsFromVideos(allVideos));
      } catch (error) {
        console.error('Unable to load sermons:', error);
        setLoadError('Sermons could not be loaded. Check your YouTube API settings and try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchSermons();
  }, []);

  // Handle search - fetch results from YouTube API
  useEffect(() => {
    async function performSearch() {
      if (!searchQuery.trim()) return;
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
      if (!apiKey || !channelId) {
        // Fallback to local search if API not configured
        const query = searchQuery.toLowerCase();
        const searchResults = videos.filter(video => video.title.toLowerCase().includes(query) || video.description.toLowerCase().includes(query));
        setDisplayedVideos(searchResults);
        return;
      }
      setLoading(true);
      try {
        // Search YouTube API for videos on this channel
        const searchResults = await searchChannelVideos(channelId, apiKey, searchQuery, 50);
        setDisplayedVideos(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        // Fallback to local search on error
        const query = searchQuery.toLowerCase();
        const searchResults = videos.filter(video => video.title.toLowerCase().includes(query) || video.description.toLowerCase().includes(query));
        setDisplayedVideos(searchResults);
      } finally {
        setLoading(false);
      }
    }
    const debounce = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch();
      } else if (selectedTopic) {
        // If no search but topic selected, filter by topic
        const filtered = videos.filter(video => video.title.toLowerCase().includes(selectedTopic.toLowerCase()) || video.description.toLowerCase().includes(selectedTopic.toLowerCase()));
        setDisplayedVideos(filtered);
      } else {
        // No search and no topic - show all videos
        setDisplayedVideos(videos);
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery, selectedTopic, videos]);

  const updateSearchQuery = value => {
    setSearchQuery(value);
    setVideosToShow(12);
  };
  const updateSelectedTopic = value => {
    setSelectedTopic(value);
    setVideosToShow(12);
  };

  // Load more videos function
  const loadMoreVideos = () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVideosToShow(prev => prev + 12);
      setLoadingMore(false);
    }, 500);
  };
  const handleShare = async url => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Group videos into series based on common keywords
  const organizeIntoSeries = () => {
    const seriesMap = {};
    videos.forEach(video => {
      // Extract series name from title (common patterns)
      const titleLower = video.title.toLowerCase();
      let seriesName = 'Other Messages';

      // Check for common series patterns
      if (titleLower.includes('grace') || titleLower.includes('monday')) {
        seriesName = 'Grace Monday Series';
      } else if (titleLower.includes('spirit') || titleLower.includes('working')) {
        seriesName = 'The Spirit Series';
      } else if (titleLower.includes('faith') || titleLower.includes('living by')) {
        seriesName = 'Living by Faith';
      } else if (titleLower.includes('jesus') || titleLower.includes('god')) {
        seriesName = 'Knowing God';
      }
      if (!seriesMap[seriesName]) {
        seriesMap[seriesName] = [];
      }
      seriesMap[seriesName].push(video);
    });

    // Return top 3 series with most videos
    return Object.entries(seriesMap).sort((a, b) => b[1].length - a[1].length).slice(0, 3).map(([name, sermons]) => ({
      title: name.toUpperCase(),
      tagline: `${sermons.length} powerful messages`,
      sermons: sermons.slice(0, 4)
    }));
  };
  return <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-jcc-gold selection:text-[#0a0a0a]">
      {/* Hero Image Section */}
      <section className="relative h-[80vh] md:h-[90vh] lg:h-[95vh] overflow-hidden">
        <Image src="/images/preach.jpg" alt="Preaching at Jubilee Christian Centre Church" fill className="object-cover object-top opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/60 to-[#0a0a0a]"></div>
        
        <div className="absolute inset-0 flex items-center justify-center pt-20">
          <div className="text-center max-w-6xl px-6">
            
            <motion.div className="inline-block mb-6" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <span className="bg-white/5 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10 shadow-lg">
                <span className="text-jcc-gold mr-2">▶</span> SERMONS
              </span>
            </motion.div>

            <motion.h1 className="font-anton text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] text-white leading-[0.9] uppercase tracking-normal drop-shadow-2xl mb-8" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }}>
              Word of <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-jcc-gold via-yellow-400 to-jcc-gold">Life</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }}>
              Over <strong className="text-white">{totalVideoCount || '200'}+</strong> curated messages to fuel your progress and joy in the faith. Watch, listen, and grow.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }}>
              <Link href="#featured" className="w-full sm:w-auto px-10 py-4 bg-jcc-gold hover:bg-jcc-gold/90 text-[#0a0a0a] font-bold rounded-full transition-all duration-300 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(200,160,50,0.3)] hover:shadow-[0_0_40px_rgba(200,160,50,0.5)] hover:scale-105">
                <Play className="h-5 w-5" fill="currentColor" />
                <span>Watch Latest</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sermon Cinematic Section */}
      {featuredSermon && !loading && <section id="featured" className="py-20 bg-[#0a0a0a] relative -mt-32 z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-jcc-gold w-12"></div>
              <span className="text-jcc-gold text-xs font-bold uppercase tracking-widest">Featured Message</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Video Player Side */}
              <div className="lg:col-span-8">
                <div className="bg-[#111] rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50 group relative">
                  {currentAudio?.id === featuredSermon.id ? <div className="relative aspect-video w-full bg-black">
                      <iframe src={`https://www.youtube.com/embed/${getVideoId(featuredSermon.url)}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`} title={featuredSermon.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="w-full h-full" />
                    </div> : <button onClick={() => setCurrentAudio(featuredSermon)} className="relative w-full aspect-video block overflow-hidden">
                      <Image src={featuredSermon.thumbnail} alt={featuredSermon.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-jcc-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all transform group-hover:scale-110 group-hover:bg-jcc-gold shadow-[0_0_40px_rgba(200,160,50,0.4)]">
                          <Play className="h-10 w-10 text-[#0a0a0a] ml-2" fill="currentColor" />
                        </div>
                      </div>
                    </button>}
                </div>
              </div>

              {/* Details Side */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <h2 className="font-anton text-4xl lg:text-5xl text-white mb-6 leading-[1.1] uppercase">
                  {featuredSermon.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-semibold mb-6">
                  <span className="flex items-center gap-1.5 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-gray-800">
                    <Clock className="w-4 h-4 text-jcc-gold" />
                    {featuredSermon.duration}
                  </span>
                  <span className="bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-gray-800">
                    {formatDate(featuredSermon.publishedAt)}
                  </span>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8 line-clamp-4">
                  {featuredSermon.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setCurrentAudio(featuredSermon)} className="flex-1 px-6 py-3.5 bg-white hover:bg-gray-200 text-[#0a0a0a] font-bold rounded-xl transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    <Play className="h-4 w-4" fill="currentColor" />
                    Play Audio
                  </button>
                  <button onClick={() => handleShare(featuredSermon.url)} className="px-6 py-3.5 bg-[#1a1a1a] hover:bg-[#222] text-white font-bold rounded-xl border border-gray-800 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-jcc-gold" /> : <Share2 className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Share'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>}

      {/* Devotionals Promo Snippet */}
      <section className="py-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-gray-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-jcc-gold/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-jcc-gold animate-pulse"></span>
                <span className="text-jcc-gold font-bold uppercase text-xs tracking-widest">Daily Reading</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Need daily inspiration?</h3>
              <p className="text-gray-400 max-w-lg">Build your faith every morning with our curated devotionals. Deep, practical, and powerfully encouraging.</p>
            </div>
            <Link href="/devotionals" className="relative z-10 whitespace-nowrap px-8 py-4 bg-jcc-gold hover:bg-yellow-400 text-[#0a0a0a] font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(200,160,50,0.2)]">
              Explore Devotionals
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Library Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="font-anton text-4xl md:text-5xl text-white mb-2 leading-none uppercase">
                Library
              </h2>
              <p className="text-gray-400">Search messages or browse by topic</p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-96 relative group">
              <input type="text" placeholder="Search sermons..." value={searchQuery} onChange={e => updateSearchQuery(e.target.value)} className="w-full px-6 py-4 pr-12 rounded-2xl bg-[#111] border border-gray-800 focus:border-jcc-gold focus:outline-none focus:ring-1 focus:ring-jcc-gold text-white transition-all duration-300 placeholder:text-gray-600" />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-jcc-gold transition-colors" />
              {searchQuery && <button onClick={() => updateSearchQuery('')} className="absolute right-12 top-1/2 -translate-y-1/2 p-1 bg-[#222] hover:bg-[#333] rounded-full transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>}
            </div>
          </div>

          {/* Topics Chips */}
          <div className="mb-12">
            {loading ? <div className="flex flex-wrap gap-3">
                {[...Array(8)].map((_, i) => <div key={i} className="h-10 w-24 bg-[#111] animate-pulse rounded-xl border border-gray-800"></div>)}
              </div> : extractedTopics.length > 0 ? <div className="flex flex-wrap gap-3">
                <button onClick={() => updateSelectedTopic(null)} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border ${selectedTopic === null ? 'bg-white text-[#0a0a0a] border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-[#111] text-gray-400 border-gray-800 hover:bg-[#1a1a1a] hover:border-gray-700'}`}>
                  All Messages
                </button>
                {extractedTopics.map(topic => <button key={topic} onClick={() => updateSelectedTopic(topic === selectedTopic ? null : topic)} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border ${selectedTopic === topic ? 'bg-jcc-gold text-[#0a0a0a] border-jcc-gold shadow-[0_0_15px_rgba(200,160,50,0.3)]' : 'bg-[#111] text-gray-400 border-gray-800 hover:bg-[#1a1a1a] hover:border-gray-700'}`}>
                    {topic}
                  </button>)}
              </div> : null}
          </div>

          {/* Loading State */}
          {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {[...Array(8)].map((_, i) => <div key={i} className="bg-[#111] rounded-2xl overflow-hidden border border-gray-800">
                  <div className="h-48 bg-[#1a1a1a] animate-pulse"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#1a1a1a] animate-pulse rounded"></div>
                    <div className="h-3 bg-[#1a1a1a] animate-pulse rounded w-3/4"></div>
                  </div>
                </div>)}
            </div> : displayedVideos.length === 0 ? <div className="text-center py-20 bg-[#111] rounded-3xl border border-gray-800">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-medium">{loadError || 'No messages found for this search.'}</p>
              <button onClick={() => {
            updateSearchQuery('');
            updateSelectedTopic(null);
          }} className="mt-4 text-jcc-gold font-bold hover:underline">Clear filters</button>
            </div> : <>
              {/* Sermon Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {displayedVideos.slice(0, videosToShow).map(sermon => <div key={sermon.id} className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setCurrentAudio(sermon)}>
                      <Image src={sermon.thumbnail} alt={sermon.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">
                        {sermon.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                        <div className="w-14 h-14 bg-jcc-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(200,160,50,0.5)]">
                          <Play className="h-6 w-6 text-[#0a0a0a] ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-xs text-jcc-gold font-bold tracking-widest mb-2">{formatDate(sermon.publishedAt)}</div>
                      <h3 className="font-bold text-lg text-white mb-4 line-clamp-2 leading-snug group-hover:text-jcc-gold transition-colors">
                        {sermon.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 border-t border-gray-800/50 flex gap-2">
                        <button onClick={() => setCurrentAudio(sermon)} className="flex-1 px-3 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2">
                          <Play className="h-3 w-3" fill="currentColor" />
                          Listen
                        </button>
                        <Link href={sermon.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 hover:text-white text-xs font-bold rounded-lg transition-colors border border-gray-800 flex items-center justify-center" title="View on YouTube">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>)}
              </div>
            </>}

          {/* Loading More Skeletons */}
          {loadingMore && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {[...Array(8)].map((_, i) => <div key={`loading-${i}`} className="bg-[#111] rounded-2xl overflow-hidden border border-gray-800">
                  <div className="h-48 bg-[#1a1a1a] animate-pulse"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#1a1a1a] animate-pulse rounded"></div>
                    <div className="h-3 bg-[#1a1a1a] animate-pulse rounded w-3/4"></div>
                  </div>
                </div>)}
            </div>}

          {/* See More Button */}
          {!loadingMore && videosToShow < displayedVideos.length && <div className="text-center">
              <button onClick={loadMoreVideos} disabled={loadingMore} className="px-10 py-4 bg-[#111] hover:bg-[#1a1a1a] border border-gray-800 text-white font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] disabled:opacity-50 disabled:cursor-not-allowed">
                Load More Sermons
              </button>
            </div>}
        </div>
      </section>

      {/* Featured Series Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="font-anton text-4xl md:text-6xl text-white mb-4 leading-none uppercase drop-shadow-lg">
              Dive Into a Series
            </h2>
            <p className="text-jcc-gold uppercase tracking-widest font-bold text-sm">Curated Collections</p>
          </div>

          {/* Series Cards */}
          {loading ? <div className="space-y-8">
              {[...Array(3)].map((_, i) => <div key={i} className="animate-pulse bg-[#111] rounded-2xl p-8 border border-gray-800">
                  <div className="h-8 bg-[#1a1a1a] rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-[#1a1a1a] rounded w-1/4 mb-8"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, j) => <div key={j} className="h-16 bg-[#1a1a1a] rounded-xl"></div>)}
                  </div>
                </div>)}
            </div> : <div className="space-y-8">
              {organizeIntoSeries().map((series, seriesIndex) => <div key={seriesIndex} className="bg-[#111] rounded-3xl border border-gray-800 overflow-hidden shadow-xl hover:border-gray-700 transition-colors">
                  {/* Series Header */}
                  <div className="p-8 md:p-10 border-b border-gray-800 bg-gradient-to-r from-[#161616] to-[#111]">
                    <h3 className="font-anton text-3xl md:text-4xl text-white mb-2 uppercase tracking-wide">
                      {series.title}
                    </h3>
                    <p className="text-gray-400 font-medium tracking-wide">{series.tagline}</p>
                  </div>

                  {/* Sermons List */}
                  <div className="p-4 md:p-6 space-y-2 bg-[#0d0d0d]">
                    {series.sermons.map((sermon, sermonIndex) => <div key={sermonIndex} className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-transparent hover:bg-[#1a1a1a] rounded-xl transition-all duration-300 border border-transparent hover:border-gray-800">
                        <div className="flex items-center gap-4 flex-1 mb-4 md:mb-0">
                          <div className="w-8 h-8 rounded-full bg-[#222] text-gray-500 font-bold flex items-center justify-center text-xs group-hover:bg-jcc-gold group-hover:text-[#0a0a0a] transition-colors">
                            {sermonIndex + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-200 group-hover:text-white mb-1 line-clamp-1 transition-colors">{sermon.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold tracking-wider uppercase">
                              <span>{formatDate(sermon.publishedAt)}</span>
                              <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {sermon.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setCurrentAudio(sermon)} className="px-6 py-2.5 bg-white hover:bg-gray-200 text-[#0a0a0a] text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2">
                            <Play className="h-3 w-3" fill="currentColor" />
                            Play
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>)}
            </div>}
        </div>
      </section>

    </div>;
}
