"use client";

import React from "react";
import { motion } from "framer-motion";
import GangaWaveBackground from "./GangaWaveBackground";
import { ArrowDown, Compass } from "lucide-react";

export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030305]"
    >
      {/* 1. Animated Ganga Wave Background */}
      <GangaWaveBackground />

      {/* 2. Cinematic Golden Moon Overlay */}
      <div className="absolute top-[18%] right-[10%] md:right-[15%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-[#FFEBA0] via-[#D4AF37] to-[#8B7500] opacity-40 blur-[2px] shadow-[0_0_80px_rgba(212,175,55,0.4)] pointer-events-none select-none z-0" />

      {/* 3. Immersive Overlay Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        {/* Sacred Geometry / Brand Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="relative w-20 h-20 flex items-center justify-center rounded-full border border-sacred-gold/30 bg-[#0B0B0B]/40 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <Compass className="w-8 h-8 text-sacred-gold animate-diya-float" />
            {/* Concentric rings to suggest sacred energy */}
            <div className="absolute inset-[-4px] rounded-full border border-sacred-gold/10 animate-pulse-glow" />
            <div className="absolute inset-[-12px] rounded-full border border-saffron/5" />
          </div>
        </motion.div>

        {/* Small Intro Badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-saffron text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-4 block"
        >
          Kashi • The Eternal City
        </motion.span>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-wider leading-tight text-white mb-6"
        >
          Experience The <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sacred-gold via-sacred-gold-light to-saffron bg-clip-text text-transparent gold-glow">
            Soul Of India
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-foreground/80 font-light leading-relaxed tracking-wide mb-10 text-zinc-300"
        >
          Discover the timeless beauty, spirituality, culture, and hidden stories of Varanasi—where history flows alongside the sacred Ganga.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            onClick={() => handleScrollTo("#ghats")}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-sacred-gold to-saffron text-deep-black font-semibold text-sm tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            EXPLORE VARANASI
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => handleScrollTo("#planner")}
            className="px-8 py-4 rounded-full border border-sacred-gold/60 text-sacred-gold hover:text-white bg-deep-black/30 hover:bg-sacred-gold/10 font-semibold text-sm tracking-widest transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            PLAN YOUR JOURNEY
          </button>
        </motion.div>
      </div>

      {/* 4. Floating Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => handleScrollTo("#ghats")}
      >
        <span className="text-[10px] tracking-[0.3em] font-semibold text-sacred-gold/80 uppercase">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-sacred-gold" />
        </motion.div>
      </motion.div>

      {/* Bottom Vignette Blur */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
