"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Compass, Ship, ChevronLeft, ChevronRight } from "lucide-react";

export default function Boat() {
  const { mode, playBell } = useTheme();
  const [sailOffset, setSailOffset] = useState(0); // in pixels/percentage

  const handleRowLeft = () => {
    playBell();
    setSailOffset((prev) => Math.max(prev - 10, -50));
  };

  const handleRowRight = () => {
    playBell();
    setSailOffset((prev) => Math.min(prev + 10, 50));
  };

  return (
    <section
      id="boat"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#050505" : "#F8F5F0"
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Column: Description */}
        <div className="flex-1 flex flex-col gap-6 text-left max-w-xl">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
            River Cruise
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase font-bold">
            See Varanasi From The River
          </h2>
          <div className="w-16 h-[2px] bg-sacred-gold" />

          <p className="text-sm md:text-base text-text-primary/75 font-light leading-relaxed">
            The ultimate experience in Varanasi is a boat ride at dawn. As the sun rises over the flat horizon, the golden light bathes the stone ghats in a celestial glow.
          </p>

          <p className="text-sm md:text-base text-text-primary/75 font-light leading-relaxed">
            You will hear the distant temple bells, see pilgrims bathing, and witness the city waking up to centuries-old chants.
          </p>

          {/* Boat Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleRowLeft}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-sacred-gold/30 bg-sacred-gold/5 text-sacred-gold hover:bg-sacred-gold hover:text-deep-black transition-colors cursor-pointer"
              title="Sail Left"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-xs font-serif tracking-widest text-sacred-gold uppercase font-bold">
              Navigate Cruise
            </span>
            <button
              onClick={handleRowRight}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-sacred-gold/30 bg-sacred-gold/5 text-sacred-gold hover:bg-sacred-gold hover:text-deep-black transition-colors cursor-pointer"
              title="Sail Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Column: Parallax Sailing Canvas */}
        <div className="flex-1 w-full h-[320px] rounded-2xl overflow-hidden relative border border-sacred-gold/30 bg-[#070b19] shadow-2xl flex flex-col justify-end">
          {/* Animated Sky Sunrise backdrop */}
          <div
            className="absolute inset-0 transition-colors duration-1000"
            style={{
              background: mode === "night"
                ? "linear-gradient(to top, #0B132B 0%, #050505 100%)"
                : "linear-gradient(to top, #FF9933 0%, #F5D3A0 60%, #EAE5D9 100%)"
            }}
          />

          {/* Background image overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30 transition-opacity duration-1000 mix-blend-luminosity"
            style={{
              backgroundImage: "url('/sunrise_boat.png')"
            }}
          />


          {/* Big Sun reflecting */}
          <div
            className={`absolute bottom-20 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-[2px] transition-all duration-1000 ${
              mode === "night"
                ? "bg-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                : "bg-gradient-to-t from-red-500 to-[#FFF0B3] shadow-[0_0_50px_rgba(255,153,51,0.4)]"
            }`}
          />

          {/* Layer 1: Parallax Skyline Temples */}
          <div
            className="absolute bottom-16 inset-x-0 h-40 flex items-end justify-between px-8 opacity-45 pointer-events-none transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(${-sailOffset * 0.3}%)`
            }}
          >
            <div className="w-16 h-28 bg-black/60 rounded-t-full" />
            <div className="w-24 h-36 bg-black/70 rounded-t-lg mx-6" />
            <div className="w-20 h-24 bg-black/60 rounded-t-full" />
            <div className="w-28 h-32 bg-black/75 rounded-t-lg" />
          </div>

          {/* Layer 2: Moving water waves & small other boats */}
          <div
            className="absolute bottom-4 inset-x-0 h-20 transition-transform duration-700 ease-out z-10 pointer-events-none"
            style={{
              transform: `translateX(${-sailOffset * 0.6}%)`
            }}
          >
            {/* Small boat silhouette floating in distance */}
            <div className="absolute top-2 left-[30%] w-10 h-3 border-b-2 border-black/40 bg-black/50 rounded-b-md flex items-end justify-center">
              <div className="w-[1px] h-6 bg-black/50 -translate-y-2" />
            </div>

            <div className="absolute top-6 right-[20%] w-12 h-3 border-b-2 border-black/40 bg-black/50 rounded-b-md flex items-end justify-center">
              <div className="w-[1px] h-8 bg-black/50 -translate-y-3" />
            </div>
          </div>

          {/* Foreground: The Main Boat */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
            {/* Main wooden boat shape with a small lantern */}
            <div className="w-28 h-8 bg-gradient-to-b from-[#8B4513] to-[#5C2E0B] rounded-b-3xl border-t border-sacred-gold/40 flex items-center justify-between px-4 shadow-[0_6px_15px_rgba(0,0,0,0.5)] float-diya relative">
              
              {/* Oar pivots */}
              <div className="w-1 h-3 bg-sacred-gold rounded-full" />
              <div className="w-1 h-3 bg-sacred-gold rounded-full" />
              
              {/* Floating lantern at bow */}
              <div className="absolute -top-3 right-3 w-3 h-3 bg-saffron rounded-full blur-[2px] animate-pulse" />
              
              <Ship className="text-sacred-gold/70" size={14} />
            </div>
            
            <span className="text-[8px] font-mono text-sacred-gold/60 mt-1 uppercase tracking-widest">
              Kashi-Cruise
            </span>
          </div>

          {/* Water Current SVG at the very front */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-deep-black/60 backdrop-blur-[1px] z-30">
            <svg
              viewBox="0 0 1000 50"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full fill-sacred-gold wave-animation opacity-25"
            >
              <path d="M0,25 C150,45 350,5 500,25 C650,45 850,5 1000,25 L1000,50 L0,50 Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
