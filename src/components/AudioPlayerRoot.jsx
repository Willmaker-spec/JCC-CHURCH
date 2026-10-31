"use client";

import AudioPlayer from "@/components/AudioPlayer";
import { useAudioPlayer } from "@/components/providers/AudioPlayerProvider";

export default function AudioPlayerRoot() {
  const { currentAudio, setCurrentAudio } = useAudioPlayer();

  if (!currentAudio) {
    return null;
  }

  return (
    <AudioPlayer
      videoUrl={currentAudio.url}
      title={currentAudio.title}
      thumbnail={currentAudio.thumbnail}
      date={currentAudio.publishedAt}
      onClose={() => setCurrentAudio(null)}
    />
  );
}
