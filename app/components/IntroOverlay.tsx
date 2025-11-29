"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/constants";

interface IntroOverlayProps {
  onClose?: () => void;
}

export default function IntroOverlay({ onClose }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClose();
      }
    };

    if (isVisible) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center text-center cursor-pointer"
          style={{
            background: `
              radial-gradient(60% 80% at 30% 20%, rgba(255, 182, 193, 0.55), rgba(255, 255, 255, 0.65) 50%),
              linear-gradient(135deg, rgba(255, 192, 203, 0.55), rgba(255, 255, 255, 0.85))
            `,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          onClick={handleClose}
          tabIndex={0}
        >
          <div className="select-none">
            <motion.div
              className="font-bold text-gray-900 mb-2"
              style={{
                fontSize: "clamp(28px, 7vw, 72px)",
                letterSpacing: "0.02em",
              }}
            >
              Hi {CONFIG.name} ❤️
            </motion.div>
            <motion.div
              className="font-bold text-gray-900 mb-4"
              style={{
                fontSize: "clamp(28px, 7vw, 72px)",
                letterSpacing: "0.02em",
              }}
            >
              Good Morning/Day yaa
            </motion.div>
            <motion.div
              className="font-medium opacity-85"
              style={{
                fontSize: "clamp(14px, 2.6vw, 22px)",
              }}
            >
              Click Anywhere
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

