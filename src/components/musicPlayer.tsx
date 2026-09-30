"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import {
  type AppleMusicPlaylist,
} from "@/lib/appleMusic";
import playlistSnapshot from "@/lib/intuitionSnapshot.json";
import { fetchPlaylist, PLAYLIST_ID } from "@/lib/appleMusic";

// Preserve the custom player; the server refreshes public playlist metadata and
// falls back to a validated snapshot when Apple is temporarily unavailable.
function MusicPlayer() {
  const [playlist, setPlaylist] = useState<AppleMusicPlaylist>(playlistSnapshot as AppleMusicPlaylist);
  const [snapshot, setSnapshot] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let mounted = true;
    fetchPlaylist(PLAYLIST_ID).then((result) => {
      if (!mounted) return;
      setPlaylist(result.playlist);
      setSnapshot(result.snapshot);
      setActiveIndex(0);
    }).catch(() => { /* Keep the reviewed snapshot on network failure. */ });
    return () => { mounted = false; };
  }, []);

  const tracks = playlist.relationships.tracks.data;
  const track = tracks[activeIndex];
  const previewUrl = track.attributes.previews[0]?.url;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !previewUrl) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      return;
    }
    setIsPlaying(false);
  };

  const goTo = (i: number) => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setActiveIndex((i + tracks.length) % tracks.length);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      <a
        href={playlist.attributes.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-anonymous uppercase text-[8px] tracking-[0.25em] px-4 py-2 border border-black/15 rounded-full text-black/45 hover:text-black/85 hover:border-black/35 transition-all duration-300"
      >
        Open in Apple Music
      </a>

      {/* Artifact card, album art with a vinyl disc peeking from behind */}
      <div className="relative mt-8 w-56 h-56">
        <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-44 h-44 rounded-full bg-[repeating-radial-gradient(circle,rgba(0,0,0,0.12)_0px,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_4px)] bg-black/5 shadow-inner" />
        <div className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={playlist.attributes.artwork.url}
            alt="Intuition playlist cover"
            fill
            sizes="224px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-1 text-center">
        <span className="font-anonymous text-[9px] tracking-[0.2em] uppercase text-black/40">
          {track.attributes.artistName}
        </span>
        <span className="font-anonymous text-sm tracking-[0.06em] uppercase text-black/80">
          {track.attributes.name}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-6">
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous track"
          className="text-black/30 hover:text-black/70 transition-colors"
        >
          <SkipBack size={16} fill="currentColor" />
        </button>
        <button
          type="button"
          onClick={togglePlay}
          disabled={!previewUrl}
          aria-label={isPlaying ? "Pause preview" : "Play track preview"}
          className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-black/60 hover:text-black/90 hover:border-black/35 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          title={previewUrl ? "Play short Apple Music preview" : "Preview unavailable"}
        >
          {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next track"
          className="text-black/30 hover:text-black/70 transition-colors"
        >
          <SkipForward size={16} fill="currentColor" />
        </button>
      </div>

      {previewUrl && (
        <audio
          ref={audioRef}
          src={previewUrl}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      <span className="mt-3 font-anonymous text-[8px] uppercase tracking-widest text-black/40">Short track previews, not full songs</span>

      {/* Scrub filmstrip, same interaction language as the /work page's
          horizontal scrubber. Each frame here is a distinct track in the
          playlist rather than a crop of a single image. */}
      <div className="mt-10 w-full">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/25">
            {snapshot ? "Playlist snapshot · 29 Sep 2026" : "Intuition playlist"}
          </span>
          <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/30">
            {"<< scroll timeline >>"}
          </span>
          <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/25">
            {tracks.length} tracks
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {tracks.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t.attributes.name}
              aria-current={i === activeIndex}
              className={`relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden snap-center border transition-all duration-300 ${
                i === activeIndex
                  ? "border-black/40 opacity-100"
                  : "border-transparent opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={t.attributes.artwork.url}
                alt=""
                fill
                sizes="56px"
                className={`object-cover transition duration-500 ${
                  i === activeIndex ? "saturate-100" : "saturate-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
