"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Volume2, VolumeX, Compass, BookOpen } from "lucide-react";

interface ControlsProps {
  onOpenQuote: () => void;
  onOpenTour: () => void;
}

export default function Controls({ onOpenQuote, onOpenTour }: ControlsProps) {
  const { mode, toggleMode, soundEnabled, toggleSound, playBell } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
      {/* Sound Toggle */}
      <button
        onClick={() => {
          toggleSound();
          if (!soundEnabled) {
            // Trigger a bell to indicate sound is turned on
            setTimeout(() => playBell(), 100);
          }
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-sacred-gold/30 bg-black/40 backdrop-blur-md text-sacred-gold hover:text-saffron transition-all duration-300 hover:scale-105 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
        title={soundEnabled ? "Mute Ambient Sitar & Bells" : "Enable Temple Sound Effects"}
      >
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {/* Day/Night Theme Toggle */}
      <button
        onClick={() => {
          toggleMode();
          playBell();
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-sacred-gold/30 bg-black/40 backdrop-blur-md text-sacred-gold hover:text-saffron transition-all duration-300 hover:scale-105 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
        title={mode === "night" ? "Switch to Sunrise Day Mode" : "Switch to Aarti Night Mode"}
      >
        {mode === "night" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Quote Generator Trigger */}
      <button
        onClick={() => {
          onOpenQuote();
          playBell();
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-sacred-gold/30 bg-black/40 backdrop-blur-md text-sacred-gold hover:text-saffron transition-all duration-300 hover:scale-105 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] cursor-pointer"
        title="Generate Spiritual Quote"
      >
        <BookOpen size={18} />
      </button>

      {/* Virtual Tour Trigger */}
      <button
        onClick={() => {
          onOpenTour();
          playBell();
        }}
        className="flex items-center justify-center gap-2 px-4 h-10 rounded-full border border-sacred-gold/30 bg-black/40 backdrop-blur-md text-sacred-gold hover:text-saffron transition-all duration-300 hover:scale-105 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] font-serif text-xs tracking-widest uppercase cursor-pointer"
        title="Launch Virtual Tour"
      >
        <Compass size={16} className="animate-spin-slow" />
        <span className="hidden md:inline">Virtual Tour</span>
      </button>
    </div>
  );
}
