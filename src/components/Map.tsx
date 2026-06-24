"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { MapPin, Info, X } from "lucide-react";

interface MapPinData {
  id: string;
  name: string;
  type: "temple" | "ghat" | "food" | "hotel";
  x: number; // SVG X coordinate
  y: number; // SVG Y coordinate
  description: string;
  tip: string;
}

const PINS: MapPinData[] = [
  {
    id: "kashi-temple",
    name: "Kashi Vishwanath Temple",
    type: "temple",
    x: 480,
    y: 200,
    description: "The golden spire of Lord Shiva's primary Jyotirlinga shrine.",
    tip: "Avoid leather items. Mobile phones are restricted inside."
  },
  {
    id: "assi-ghat",
    name: "Assi Ghat",
    type: "ghat",
    x: 280,
    y: 420,
    description: "Confluence point at the southern end, famous for dawn rituals.",
    tip: "Best visited at 5:00 AM for Subah-e-Banaras concerts."
  },
  {
    id: "dashash-ghat",
    name: "Dashashwamedh Ghat",
    x: 520,
    y: 280,
    type: "ghat",
    description: "The primary ghat where the evening Ganga Aarti takes place daily.",
    tip: "Hire a boat by 5:30 PM to secure the best view from the river."
  },
  {
    id: "blue-lassi",
    name: "Blue Lassi shop",
    type: "food",
    x: 550,
    y: 160,
    description: "A legendary 75-year-old shop serving hand-churned lassis in clay cups.",
    tip: "Try the fresh Pomegranate Chocolate Lassi."
  },
  {
    id: "taj-palace",
    name: "Taj Nadesar Palace",
    type: "hotel",
    x: 180,
    y: 120,
    description: "A royal palace hotel set in 40 acres of lush mango orchards.",
    tip: "Take a royal horse carriage ride during sunset."
  }
];

export default function MapSection() {
  const { mode, playBell } = useTheme();
  const [selectedPin, setSelectedPin] = useState<MapPinData | null>(null);

  const handlePinClick = (pin: MapPinData) => {
    playBell();
    setSelectedPin(pin);
  };

  return (
    <section
      id="map"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#0B132B" : "#EAE5D9"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
            Geography
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
            Interactive Map
          </h2>
          <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
          <p className="text-sm text-text-primary/75 max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Discover the geometry of the sacred city. Click pins on our gold-detailed vector map to locate ghats, temples, cuisines, and royal palaces.
          </p>
        </div>

        {/* Vector Map Wrapper */}
        <div className="relative w-full max-w-4xl mx-auto h-[480px] rounded-2xl overflow-hidden border border-sacred-gold/30 bg-[#050811] shadow-2xl flex items-center justify-center">
          
          {/* Animated Sky/Water reflections in map background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#152238_0%,#050811_80%)] opacity-70 pointer-events-none" />

          {/* SVG Map Graphics */}
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full text-sacred-gold/15 select-none"
            style={{ minWidth: "600px" }}
          >
            {/* Grid overlay */}
            <path d="M 0,100 L 800,100 M 0,200 L 800,200 M 0,300 L 800,300 M 0,400 L 800,400 M 100,0 L 100,500 M 200,0 L 200,500 M 300,0 L 300,500 M 400,0 L 400,500 M 500,0 L 500,500 M 600,0 L 600,500 M 700,0 L 700,500" stroke="rgba(212,175,55,0.03)" strokeWidth="1" />

            {/* The Winding Ganges River in Gold/Blue */}
            <path
              d="M 680,0 C 670,100 630,180 580,240 C 530,300 480,330 380,360 C 280,390 260,420 290,500 L 390,500 C 370,430 390,400 450,380 C 530,350 630,300 680,220 C 730,140 760,60 760,0 Z"
              fill={mode === "night" ? "rgba(212, 175, 55, 0.08)" : "rgba(93, 173, 226, 0.15)"}
              stroke="rgba(212,175,55,0.2)"
              strokeWidth="2"
              className="water-shimmer"
            />

            {/* Shore line markings */}
            <path
              d="M 680,0 C 670,100 630,180 580,240 C 530,300 480,330 380,360 C 280,390 260,420 290,500"
              fill="none"
              stroke="rgba(212,175,55,0.3)"
              strokeWidth="1.5"
              strokeDasharray="4, 4"
            />

            {/* Stylized Compass symbol */}
            <g transform="translate(100, 400) scale(0.6)">
              <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
              <path d="M 0,-60 L 10,-10 L 0,0 L -10,-10 Z" fill="#D4AF37" />
              <path d="M 0,60 L 10,10 L 0,0 L -10,10 Z" fill="rgba(212,175,55,0.4)" />
              <path d="M -60,0 L -10,-10 L 0,0 L -10,10 Z" fill="rgba(212,175,55,0.3)" />
              <path d="M 60,0 L 10,-10 L 0,0 L 10,10 Z" fill="rgba(212,175,55,0.3)" />
              <text x="-6" y="-68" fill="#D4AF37" fontSize="14" fontFamily="serif" fontWeight="bold">N</text>
            </g>

            {/* Label markings for river and shore */}
            <text x="630" y="80" fill="rgba(212,175,55,0.4)" fontSize="10" fontFamily="serif" letterSpacing="3" transform="rotate(78 630 80)">HOLY GANGES RIVER</text>
            <text x="400" y="320" fill="rgba(212,175,55,0.4)" fontSize="10" fontFamily="serif" letterSpacing="3">WESTERN BANK (GHATS)</text>
          </svg>

          {/* Interactive Absolute Pin Elements overlaying the SVG coordinates */}
          {PINS.map((pin) => {
            const isSelected = selectedPin?.id === pin.id;
            
            // Map types to styling colors
            const pinColor = 
              pin.type === "temple" ? "text-saffron" : 
              pin.type === "ghat" ? "text-sacred-gold" : 
              pin.type === "food" ? "text-emerald-400" : "text-blue-400";
            
            return (
              <button
                key={pin.id}
                onClick={() => handlePinClick(pin)}
                style={{
                  left: `${(pin.x / 800) * 100}%`,
                  top: `${(pin.y / 500) * 100}%`
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 flex flex-col items-center`}
              >
                {/* Ping Glow rings */}
                <span className={`absolute w-8 h-8 rounded-full border border-current opacity-30 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 animate-ping ${pinColor}`} />
                
                {/* Marker Pin */}
                <MapPin
                  size={isSelected ? 26 : 20}
                  className={`transition-all duration-300 ${pinColor} filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${
                    isSelected ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                
                {/* Mini Label */}
                <span className="text-[8px] bg-black/85 border border-white/10 px-1 py-0.5 mt-1 rounded text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {pin.name}
                </span>
              </button>
            );
          })}

          {/* Floating Details Box in corner */}
          {selectedPin && (
            <div className="absolute bottom-6 right-6 left-6 md:left-auto md:w-80 rounded-xl glass-panel p-5 border border-sacred-gold/40 shadow-2xl animate-slide-up z-20">
              <button
                onClick={() => setSelectedPin(null)}
                className="absolute top-3 right-3 text-white/50 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
              
              <span className="text-[9px] uppercase tracking-widest text-saffron font-bold block mb-1">
                {selectedPin.type} location
              </span>
              <h4 className="text-md font-serif text-sacred-gold font-semibold tracking-wider">
                {selectedPin.name}
              </h4>
              <p className="text-xs text-white/80 font-light mt-2 leading-relaxed">
                {selectedPin.description}
              </p>
              
              <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                <Info size={14} className="text-saffron shrink-0 mt-0.5" />
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-white/40 block">
                    Traveler Tip
                  </span>
                  <p className="text-[10px] text-white/60 font-light mt-0.5 leading-relaxed">
                    {selectedPin.tip}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
