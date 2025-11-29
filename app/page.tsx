"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FloatingHearts from "./components/FloatingHearts";
import ForgivenessButtons from "./components/ForgivenessButtons";
import IntroOverlay from "./components/IntroOverlay";
import MusicPlayer from "./components/MusicPlayer";
import { CONFIG } from "@/constants";

export default function Home() {
  const [isForgiven, setIsForgiven] = useState(false);
  const [currentGif, setCurrentGif] = useState(CONFIG.heroGif);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const playMusicRef = useRef<(() => void) | null>(null);

  const handleForgiven = () => {
    setIsForgiven(true);
    setCurrentGif(CONFIG.happyGif);
  };

  const handleIntroClose = () => {
    setShowMusicPlayer(true);
    setShouldAutoPlay(true);
    // Try to play immediately after user interaction
    setTimeout(() => {
      if (playMusicRef.current) {
        playMusicRef.current();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: '#ffeef2' }}>
      <IntroOverlay onClose={handleIntroClose} />
      <FloatingHearts />
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-16 pb-24">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            className="mb-6"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            <Image
              src={currentGif}
              alt="Cute animated character"
              width={300}
              height={300}
              className="mx-auto rounded-3xl shadow-2xl"
              unoptimized
            />
          </motion.div>
          
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            I&apos;m really sorry, {CONFIG.name}... 🥺
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I messed up, and I miss your smile.
          </motion.p>
        </motion.section>

        {/* The Letter Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 max-w-2xl mx-auto border-2" style={{ borderColor: 'rgba(255, 209, 220, 0.3)' }}>
            <motion.div
              className="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {CONFIG.apologyMessage}
            </motion.div>
          </div>
        </motion.section>

        {/* Memory Lane Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            Us when we are happy ❤️
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {CONFIG.memoryPhotos.map((photo, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-lg"
                whileHover={{ rotate: 3, scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.1,
                  type: "spring", 
                  stiffness: 300 
                }}
              >
                <Image
                  src={photo}
                  alt={`Memory ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* The Interaction Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8">
            Will you forgive me?
          </h2>
          
          <ForgivenessButtons onForgiven={handleForgiven} />
        </motion.section>

        {/* Music Player */}
        {showMusicPlayer && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <MusicPlayer 
              audioSrc={CONFIG.musicFile}
              title={CONFIG.musicTitle}
              autoPlay={shouldAutoPlay}
              onReady={(play) => {
                playMusicRef.current = play;
                if (shouldAutoPlay) {
                  setTimeout(() => play(), 100);
                }
              }}
            />
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="fixed bottom-0 left-0 right-0 z-10 text-center py-4 px-4 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(255, 238, 242, 0.65)' }}
      >
        <p className="text-gray-600 text-sm md:text-base">
          Made with{" "}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ❤️
          </motion.span>{" "}
          by uwaaa
        </p>
      </motion.footer>
    </div>
  );
}
