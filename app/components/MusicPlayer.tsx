"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import { CONFIG } from "@/constants";

interface MusicPlayerProps {
  audioSrc?: string;
  title?: string;
  autoPlay?: boolean;
  onReady?: (play: () => void) => void;
}

export default function MusicPlayer({ 
  audioSrc = CONFIG.musicFile, 
  title = CONFIG.musicTitle,
  autoPlay = false,
  onReady
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousAutoPlayRef = useRef(false);

  useEffect(() => {
    // Only auto-play when autoPlay changes from false to true
    if (autoPlay && !previousAutoPlayRef.current && audioRef.current) {
      previousAutoPlayRef.current = true;
      // Small delay to ensure audio is loaded
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Auto-play was prevented, user needs to interact first
            setIsPlaying(false);
          });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else if (!autoPlay) {
      // Reset the ref when autoPlay becomes false
      previousAutoPlayRef.current = false;
    }
  }, [autoPlay]);

  const handlePlay = async () => {
    if (audioRef.current) {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsLoading(false);
      }
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Expose play function to parent component
  useEffect(() => {
    if (onReady && audioRef.current) {
      onReady(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        }
      });
    }
  }, [onReady]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-[520px] mx-auto bg-white border-2 rounded-2xl shadow-lg p-4 md:p-5 text-center"
      style={{
        borderColor: "#ff6aa2",
        boxShadow: "0 10px 28px rgba(255, 106, 162, 0.2)",
      }}
      aria-label="Music Player"
    >
      <p className="font-bold mb-3 text-gray-800">{title}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePlay}
          disabled={isPlaying || isLoading}
          className="px-4 py-2 rounded-xl border-2 font-bold cursor-pointer min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{
            borderColor: "#ff6aa2",
            backgroundColor: "#ffe3ef",
            color: "#702040",
          }}
        >
          {isLoading ? "Loading..." : "Play"}
        </button>
        <button
          onClick={handlePause}
          disabled={!isPlaying}
          className="px-4 py-2 rounded-xl border-2 font-bold cursor-pointer min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{
            borderColor: "#ff6aa2",
            backgroundColor: "#ffe3ef",
            color: "#702040",
          }}
        >
          Pause
        </button>
      </div>
      <audio ref={audioRef} preload="none">
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </motion.section>
  );
}

