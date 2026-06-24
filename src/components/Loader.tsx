"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

const SANSKRIT_QUOTES = [
  { sanskrit: "सत्यं शिवं सुन्दरम्", translation: "Truth is Shiva, and Shiva is Beauty." },
  { sanskrit: "तमसो मा ज्योतिर्गमय", translation: "Lead us from darkness to light." },
  { sanskrit: "काशी सर्वप्रकाशिका", translation: "Kashi illuminates the entire universe." },
  { sanskrit: "अहं ब्रह्मास्मि", translation: "I am the infinite reality." }
];

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { playBell, toggleSound, soundEnabled } = useTheme();

  // Progress counter animation
  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const intervalTime = 40;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Quotes cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SANSKRIT_QUOTES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    // If sound is not active, we can optionally activate sound Context
    if (!soundEnabled) {
      toggleSound();
    }
    
    // Play bell sound
    setTimeout(() => {
      playBell();
    }, 50);

    setIsFadingOut(true);
    setTimeout(() => {
      onFinish();
    }, 1200); // Allow fadeout animation to complete
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-deep-black py-16 px-6 text-ivory-white transition-all duration-1000 ease-in-out ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Background Golden Particle Canvas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-10 left-1/4 w-[500px] h-[500px] bg-sacred-gold/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-10 right-1/4 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Top Brand Name */}
      <div className="z-10 text-center tracking-[0.3em] text-xs font-semibold text-sacred-gold uppercase">
        Varanasi, India
      </div>

      {/* Main Brand & Quotes */}
      <div className="z-10 flex flex-col items-center justify-center max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-ivory-white to-sacred-gold drop-shadow-[0_4px_12px_rgba(212,175,55,0.2)]">
          The Eternal
        </h1>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-[0.3em] uppercase mt-2 text-transparent bg-clip-text bg-gradient-to-b from-sacred-gold to-saffron drop-shadow-[0_4px_20px_rgba(255,153,51,0.25)]">
          Varanasi
        </h1>

        {/* Floating Diya Drawing */}
        <div className="my-8 flex justify-center float-diya">
          <div className="relative w-12 h-12">
            {/* Flame */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-saffron to-yellow-300 rounded-t-full rounded-b-lg shadow-[0_0_15px_#FF9933] animate-pulse" />
            {/* Diya Clay Base */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-4 border border-sacred-gold/40 bg-gradient-to-b from-[#8B4513] to-[#5C2E0B] rounded-b-full" />
          </div>
        </div>

        {/* Rotating Sanskrit quote */}
        <div className="h-16 flex flex-col justify-center transition-all duration-500">
          <p className="text-xl md:text-2xl font-serif tracking-[0.1em] text-sacred-gold/90 italic">
            "{SANSKRIT_QUOTES[quoteIndex].sanskrit}"
          </p>
          <p className="text-xs md:text-sm tracking-wider text-ivory-white/60 mt-1 uppercase">
            {SANSKRIT_QUOTES[quoteIndex].translation}
          </p>
        </div>
      </div>

      {/* Bottom Loading Progress / CTA */}
      <div className="z-10 w-full max-w-md flex flex-col items-center">
        {!isLoaded ? (
          <>
            <p className="text-xs tracking-widest text-ivory-white/40 mb-3 animate-pulse uppercase">
              Preparing Your Journey Through The Soul Of India...
            </p>
            {/* Luxury gold progress bar */}
            <div className="relative w-full h-[2px] bg-white/10 overflow-hidden rounded-full border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-sacred-gold to-saffron transition-all duration-300 shadow-[0_0_8px_#D4AF37]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-serif tracking-widest text-sacred-gold mt-2">
              {Math.floor(progress)}%
            </span>
          </>
        ) : (
          <button
            onClick={handleEnter}
            className="group relative px-8 py-3 overflow-hidden rounded-full border border-sacred-gold bg-transparent font-serif tracking-[0.2em] text-sm uppercase text-sacred-gold hover:text-deep-black transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-sacred-gold to-saffron scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            <span className="relative z-10">Enter The Eternal City</span>
          </button>
        )}
      </div>

      {/* Animated waves at the very bottom */}
      <div className="absolute bottom-0 left-0 w-[200%] h-12 overflow-hidden pointer-events-none opacity-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full fill-sacred-gold wave-animation"
        >
          <path d="M0,60 C150,90 350,30 500,60 C650,90 850,30 1000,60 C1150,90 1350,30 1500,60 L1500,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}
