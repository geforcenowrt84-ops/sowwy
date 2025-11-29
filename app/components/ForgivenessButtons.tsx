"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CONFIG } from "@/constants";

interface ForgivenessButtonsProps {
  onForgiven: () => void;
}

export default function ForgivenessButtons({ onForgiven }: ForgivenessButtonsProps) {
  const [isForgiven, setIsForgiven] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleYesClick = () => {
    setIsForgiven(true);
    
    // Confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    onForgiven();

    // Scroll to top after 0.5 seconds
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 900);
  };

  const handleNoHover = () => {
    if (noButtonRef.current) {
      const button = noButtonRef.current;
      const container = button.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        const newX = Math.random() * Math.max(0, maxX);
        const newY = Math.random() * Math.max(0, maxY);
        
        setNoButtonPosition({ x: newX, y: newY });
      }
    }
  };

  if (isForgiven) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: '#ff69b4' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Yay! I love you! ❤️
        </motion.h2>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative min-h-[200px] w-full">
      <motion.button
        onClick={handleYesClick}
        className="px-8 py-4 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow z-10"
        style={{ backgroundColor: '#ff69b4' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Yes, I forgive you ❤️
      </motion.button>

      <motion.button
        ref={noButtonRef}
        onMouseEnter={handleNoHover}
        onTouchStart={handleNoHover}
        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-shadow z-10"
        animate={{
          x: noButtonPosition.x,
          y: noButtonPosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        No
      </motion.button>
    </div>
  );
}

