"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { X, Info, Volume2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  fact: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "aarti",
    name: "Dashashwamedh Aarti",
    x: 35,
    y: 60,
    description: "The spot where the evening Ganga Aarti is performed daily by young priests. Fire, chanting, and bells create a mystical resonance.",
    fact: "Ritual duration: 45 mins. Dedicated to Lord Shiva, River Ganga, and Sun God."
  },
  {
    id: "manikarnika",
    name: "Manikarnika Ghat",
    x: 65,
    y: 50,
    description: "The primary cremation ghat in Kashi, where the sacred fires have burned continuously for thousands of years, representing the eternal cycle of life and death.",
    fact: "Over 30,000 cremations occur here annually. It is believed that Lord Shiva whispers the Taraka mantra into the ears of the departed."
  },
  {
    id: "ganges",
    name: "The Sacred River Current",
    x: 50,
    y: 75,
    description: "The holy Ganges river flows northward here, a rare geographical phenomenon believed to channel infinite spiritual energy.",
    fact: "Varanasi pilgrims take morning baths in this current to cleanse karmic impressions."
  }
];

interface VirtualTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTour({ isOpen, onClose }: VirtualTourProps) {
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  const [panX, setPanX] = useState(50); // percentage for background pan
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playBell } = useTheme();

  if (!isOpen) return null;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX;
    // Map mouse position to a background pan offset (from 35% to 65% for subtle movement)
    const percentage = 35 + (x / width) * 30;
    setPanX(percentage);
  };

  const handleSpotClick = (spot: Hotspot) => {
    playBell();
    setActiveSpot(spot);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-deep-black text-ivory-white animate-fade-in">
      {/* Top Header */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-xl md:text-2xl font-serif text-sacred-gold tracking-widest uppercase">
            Ganga Panorama
          </h2>
          <p className="text-xs text-white/50 tracking-wider">
            Move mouse horizontally to look around. Click glowing hotspots to explore.
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 text-ivory-white hover:text-sacred-gold transition-colors text-xs font-serif tracking-widest uppercase cursor-pointer"
        >
          <X size={16} /> Exit Tour
        </button>
      </div>

      {/* Interactive Panorama Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative flex-1 w-full overflow-hidden select-none bg-[#02040a]"
        style={{
          backgroundImage: "radial-gradient(circle at center, #0B132B 0%, #050505 100%)"
        }}
      >
        {/* Animated Sky / Stars Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20px_30px,#eee,rgba(0,0,0,0)),radial-gradient(2px_2px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_50px_160px,#ddd,rgba(0,0,0,0))] opacity-40 transition-all duration-300 pointer-events-none" />

        {/* Wide Panorama Vector Art representation of Varanasi Ghats */}
        <div
          className="absolute inset-y-0 w-[200%] transition-transform duration-500 ease-out pointer-events-none"
          style={{
            transform: `translateX(-${panX - 25}%)`,
            backgroundImage: `linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.3) 40%, transparent 100%)`
          }}
        >
          {/* Simulated Ghat silhouette with temples and floating lanterns */}
          <div className="absolute bottom-24 inset-x-0 h-96 flex items-end justify-between px-20">
            {/* Template silhouettes */}
            <div className="w-64 h-80 bg-gradient-to-t from-black to-midnight-blue/40 border-t border-r border-sacred-gold/10 rounded-t-full relative">
              <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-saffron animate-ping" />
            </div>
            <div className="w-80 h-[400px] bg-gradient-to-t from-black to-midnight-blue/50 border-t border-x border-sacred-gold/15 rounded-t-2xl relative mx-16">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4 h-16 border-l border-sacred-gold/30" />
            </div>
            <div className="w-72 h-[350px] bg-gradient-to-t from-black to-midnight-blue/45 border-t border-l border-sacred-gold/10 rounded-t-full relative" />
          </div>

          {/* Water River area at the bottom */}
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black via-[#0B132B] to-transparent border-t border-saffron/10">
            {/* Floating lanterns drawing in water */}
            <div className="absolute bottom-16 left-[20%] w-3 h-3 bg-saffron rounded-full blur-[2px] animate-pulse" />
            <div className="absolute bottom-10 left-[40%] w-4 h-4 bg-saffron rounded-full blur-[3px] animate-pulse delay-500" />
            <div className="absolute bottom-24 left-[55%] w-2 h-2 bg-saffron rounded-full blur-[1px] animate-pulse delay-1000" />
            <div className="absolute bottom-14 left-[75%] w-5 h-5 bg-saffron rounded-full blur-[4px] animate-pulse delay-300" />
          </div>
        </div>

        {/* Interactive Hotspots Layer */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(panX - 50) * 0.4}%)` // slower parallax movement for icons
          }}
        >
          {HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleSpotClick(spot)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center cursor-pointer"
            >
              {/* Outer Ring */}
              <div className="absolute w-12 h-12 rounded-full border border-saffron/60 scale-75 group-hover:scale-100 opacity-60 group-hover:opacity-100 transition-all duration-300 animate-ping" />
              {/* Inner glowing pulse */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sacred-gold to-saffron border border-white flex items-center justify-center shadow-[0_0_15px_#FF9933] group-hover:scale-110 transition-transform duration-300">
                <span className="text-[10px] font-bold text-deep-black">?</span>
              </div>
              {/* Tooltip Label */}
              <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 border border-sacred-gold/40 text-[10px] px-2 py-1 rounded tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                {spot.name}
              </span>
            </button>
          ))}
        </div>

        {/* Hotspot details overlay */}
        {activeSpot && (
          <div className="absolute bottom-8 left-6 md:left-8 right-6 md:right-auto md:w-96 rounded-2xl glass-panel p-6 border border-sacred-gold/40 shadow-2xl animate-slide-up">
            <button
              onClick={() => setActiveSpot(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer"
            >
              <X size={16} />
            </button>
            <h4 className="text-lg font-serif text-sacred-gold tracking-wider uppercase mb-1">
              {activeSpot.name}
            </h4>
            <div className="w-12 h-[1px] bg-saffron mb-4" />
            <p className="text-sm font-light text-white/80 leading-relaxed mb-4">
              {activeSpot.description}
            </p>
            <div className="flex gap-3 bg-black/30 p-3 rounded-lg border border-white/5">
              <Info size={16} className="text-saffron shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                  Quick Fact
                </span>
                <p className="text-xs text-white/70 font-light mt-0.5">
                  {activeSpot.fact}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
