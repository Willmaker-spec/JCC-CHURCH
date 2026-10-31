'use client';

import { createContext, useContext, useMemo, useState } from 'react';
const AudioPlayerContext = createContext(undefined);
export function AudioPlayerProvider({
  children
}) {
  const [currentAudio, setCurrentAudio] = useState(null);
  const value = useMemo(() => ({
    currentAudio,
    setCurrentAudio
  }), [currentAudio]);
  return <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>;
}
export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}
