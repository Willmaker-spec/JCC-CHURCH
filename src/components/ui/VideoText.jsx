'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";

// Improved type-safe class name utility
const cn = (...inputs) => {
  return inputs.filter(Boolean).join(" ");
};
export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "metadata",
  fontSize = 18,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
  letterSpacing,
  textTransform = "none",
  onVideoLoad,
  onVideoError,
  sources = [],
  poster
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  // Memoize content conversion to avoid unnecessary recalculations
  const content = useMemo(() => {
    return React.Children.toArray(children).map(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return child;
      }
      return '';
    }).join('');
  }, [children]);

  // Memoize SVG generation
  const svgMask = useMemo(() => {
    const responsiveFontSize = typeof fontSize === "number" ? `${fontSize}vw` : fontSize;

    // Escape special characters in content for SVG
    const escapedContent = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const svgString = `
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
        <text 
          x='50%' 
          y='50%' 
          font-size='${responsiveFontSize}' 
          font-weight='${fontWeight}' 
          text-anchor='${textAnchor}' 
          dominant-baseline='${dominantBaseline}' 
          font-family='${fontFamily}'
          ${letterSpacing ? `letter-spacing='${letterSpacing}'` : ''}
          ${textTransform !== 'none' ? `text-transform='${textTransform}'` : ''}
        >
          ${escapedContent}
        </text>
      </svg>
    `;
    return `url("data:image/svg+xml,${encodeURIComponent(svgString.trim())}")`;
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily, letterSpacing, textTransform]);

  // Handle video load
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
    onVideoLoad?.();
  }, [onVideoLoad]);

  // Handle video error
  const handleVideoError = useCallback(event => {
    console.error('Video failed to load:', event);
    setHasError(true);
    onVideoError?.(event.nativeEvent);
  }, [onVideoError]);

  // Attempt to play video on mount (for browsers that block autoplay)
  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(error => {
        console.warn('Autoplay was prevented:', error);
      });
    }
  }, [autoPlay]);
  return <Component className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Gold gradient fallback - shows while loading or on error */}
      {!isVideoLoaded && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-jcc-gold via-yellow-500 to-jcc-gold animate-gradient-x" style={{
      maskImage: svgMask,
      WebkitMaskImage: svgMask,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center"
    }} />}
      
      {/* Video container with mask - replaces gradient when loaded */}
      {!hasError && <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity duration-700", isVideoLoaded ? "opacity-100" : "opacity-0")} style={{
      maskImage: svgMask,
      WebkitMaskImage: svgMask,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center"
    }}>
          <video ref={videoRef} className="w-full h-full object-cover" style={{
        filter: "sepia(1) saturate(3) hue-rotate(15deg) brightness(1.2)"
      }} autoPlay={autoPlay} muted={muted} loop={loop} preload={preload} playsInline poster={poster} onLoadedData={handleVideoLoad} onError={handleVideoError}>
            {/* Primary source */}
            <source src={src} type="video/mp4" />
            
            {/* Alternative sources */}
            {sources.map((source, index) => <source key={index} src={source.src} type={source.type} />)}
            
            Your browser does not support the video tag.
          </video>
        </div>}

      {/* Error fallback - shows gradient if video fails */}
      {hasError && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-jcc-gold via-yellow-500 to-jcc-gold animate-gradient-x" style={{
      maskImage: svgMask,
      WebkitMaskImage: svgMask,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center"
    }} />}

      {/* Screen reader text */}
      <span className="sr-only">{content}</span>
    </Component>;
}
