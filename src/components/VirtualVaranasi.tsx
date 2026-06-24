"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Info, MapPin, X } from "lucide-react";
import Image from "next/image";

interface MapLocation {
  id: string;
  name: string;
  type: string;
  coords: { x: number; y: number }; // SVG layout percentages
  gps: string;
  desc: string;
  image: string;
  distanceFromStation: string;
  attractionRate: string;
}

const locations: MapLocation[] = [
  {
    id: "assi-ghat",
    name: "Assi Ghat",
    type: "Confluence Ghat & Morning Rituals",
    coords: { x: 30, y: 78 }, // South end of river
    gps: "25.2892° N, 83.0068° E",
    desc: "The southern anchor of Varanasi's ghat crescent. Known for its wide steps, massive evening crowds, and the holy confluence of Ganga and Assi rivers. Home of the mystical early morning Subah-e-Banaras prayers.",
    image: "/assi.png",
    distanceFromStation: "6.5 km from Varanasi Cantt Station",
    attractionRate: "4.9/5.0 (Veda Chanting Hub)"
  },
  {
    id: "ramnagar-fort",
    name: "Ramnagar Fort",
    type: "Royal Residence (East Bank)",
    coords: { x: 45, y: 88 }, // Opposite bank, south
    gps: "25.2694° N, 83.0238° E",
    desc: "The 18th-century royal fortress sitting on the eastern bank of the Ganga. Built in classic red sandstone, it represents the royal line of Benares and houses historical royal artifacts, royal armor, and vintage vehicles.",
    image: "/ramnagar_fort.png",
    distanceFromStation: "9.2 km from Station (via bridge)",
    attractionRate: "4.6/5.0 (Royal Heritage)"
  },
  {
    id: "dashashwamedh",
    name: "Dashashwamedh Ghat",
    type: "Central Ritualistic Ghat",
    coords: { x: 50, y: 55 }, // Center of riverbank
    gps: "25.3073° N, 83.0102° E",
    desc: "The spiritual focal point of Varanasi. It is the busiest ghat, where the grand daily Ganga Aarti is conducted at dusk by young priests, drawing thousands of devotees in boats and terraces.",
    image: "/dashashwamedh.png",
    distanceFromStation: "4.2 km from Varanasi Cantt Station",
    attractionRate: "5.0/5.0 (Aarti Center)"
  },
  {
    id: "kashi-temple",
    name: "Kashi Vishwanath Temple",
    type: "Golden Jyotirlinga Shrine",
    coords: { x: 44, y: 46 }, // Slightly inland, central
    gps: "25.3109° N, 83.0104° E",
    desc: "The holy of holies dedicated to Lord Shiva. Covered in over 800 kg of pure gold, this ancient temple is the spiritual crown of Kashi, drawing millions of pilgrims seeking liberation (Moksha).",
    image: "/temple_tour.png",
    distanceFromStation: "4.0 km from Varanasi Cantt Station",
    attractionRate: "5.0/5.0 (Sacred Apex)"
  },
  {
    id: "manikarnika",
    name: "Manikarnika Ghat",
    type: "Sacred Cremation Ghat",
    coords: { x: 58, y: 42 }, // North-center riverbank
    gps: "25.3113° N, 83.0135° E",
    desc: "The ancient cremation grounds where fires have burned continuously for millennia. Hindus believe that passing away or being cremated here grants instant salvation, breaking the cycle of rebirth.",
    image: "/manikarnika.png",
    distanceFromStation: "4.5 km from Varanasi Cantt Station",
    attractionRate: "4.8/5.0 (Moksha Portal)"
  },
  {
    id: "sarnath",
    name: "Sarnath Deer Park",
    type: "Buddhist Pilgrimage Site",
    coords: { x: 25, y: 15 }, // Far North-West, Inland
    gps: "25.3762° N, 82.9897° E",
    desc: "A peaceful sanctuary located just outside Varanasi. Sarnath is where Gautama Buddha delivered his very first sermon after attaining enlightenment, setting the Wheel of Dharma in motion.",
    image: "/cultural_walk.png",
    distanceFromStation: "7.8 km from Varanasi Cantt Station",
    attractionRate: "4.7/5.0 (Peace Sanctuary)"
  }
];

export default function VirtualVaranasi() {
  const [selectedLoc, setSelectedLoc] = useState<MapLocation | null>(null);

  return (
    <section id="virtual-tour" className="relative py-24 md:py-32 bg-deep-black overflow-hidden border-t border-white/5">
      {/* Background radial gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[75vh] bg-sacred-gold/5 blur-[160px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-saffron text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 block">
            Holographic Mapping
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-cinzel">
            Virtual <span className="bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent gold-glow">Varanasi</span>
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Navigate the sacred topography. Interact with our luxury digital map tracing the ancient shrines, palaces, and ghats along the crescent bend of the Ganga.
          </p>
        </div>

        {/* Map Interface container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* SVG Map Section (8 cols) */}
          <div className="lg:col-span-8 relative aspect-[1.4/1] w-full bg-luxury-dark/40 border border-sacred-gold/15 rounded-3xl overflow-hidden p-6 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
            
            {/* Grid overlay lines (futuristic coordinate mapping aesthetic) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute top-4 left-4 text-[9px] tracking-wider text-zinc-500 font-mono">
              SYS_COORD_MAPPING: ACTIVE_SAT_FEED
            </div>
            
            <div className="absolute bottom-4 right-4 text-[9px] tracking-wider text-zinc-500 font-mono">
              KASHI_ELEVATION: 80.7M • CRESCENT_CURVE: TRUE
            </div>

            {/* Custom SVG Map Geometry */}
            <svg viewBox="0 0 800 600" className="w-full h-full z-10 relative">
              
              {/* Ganges River Path (The Crescent Bend of Ganga) */}
              <motion.path
                d="M 120 580 C 250 560, 360 480, 420 380 C 480 280, 600 180, 780 140"
                stroke="url(#ganga-grad)"
                strokeWidth="45"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="opacity-75 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              />

              {/* Finer currents lines within Ganges */}
              <motion.path
                d="M 120 580 C 250 560, 360 480, 420 380 C 480 280, 600 180, 780 140"
                stroke="#FF9933"
                strokeWidth="1.5"
                strokeDasharray="10, 15"
                fill="none"
                className="opacity-50"
                animate={{ strokeDashoffset: [-100, 100] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              />

              {/* Gradient definition for Ganga River */}
              <defs>
                <linearGradient id="ganga-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0B0B0E" />
                  <stop offset="35%" stopColor="#1E160D" /> {/* Saffron tinged deep */}
                  <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.4" /> {/* Gold glow */}
                  <stop offset="100%" stopColor="#0B0B0E" />
                </linearGradient>
              </defs>

              {/* Map labels */}
              <text x="180" y="520" fill="rgba(212,175,55,0.4)" fontSize="10" className="font-cinzel tracking-widest uppercase">
                Ganges River (Ganga)
              </text>
              <path d="M 290 528 L 220 545" stroke="rgba(212,175,55,0.3)" strokeWidth="0.75" strokeDasharray="3 3" />

              {/* Map Compass Grid */}
              <g transform="translate(700, 500)" opacity="0.3">
                <circle cx="0" cy="0" r="35" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="3 3" />
                <line x1="-45" y1="0" x2="45" y2="0" stroke="#D4AF37" strokeWidth="0.75" />
                <line x1="0" y1="-45" x2="0" y2="45" stroke="#D4AF37" strokeWidth="0.75" />
                <text x="-4" y="-48" fill="#D4AF37" fontSize="9" fontWeight="bold" className="font-mono">N</text>
                <text x="-4" y="55" fill="#D4AF37" fontSize="9" className="font-mono">S</text>
              </g>

              {/* Interactive Location Pins */}
              {locations.map((loc) => {
                const isSelected = selectedLoc?.id === loc.id;
                // Convert percent coords to SVG 800x600 space
                const px = (loc.coords.x / 100) * 800;
                const py = (loc.coords.y / 100) * 600;

                return (
                  <g key={loc.id} className="cursor-pointer" onClick={() => setSelectedLoc(loc)}>
                    {/* Ring aura */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 16 : 8}
                      fill="none"
                      stroke={isSelected ? "#FF9933" : "#D4AF37"}
                      strokeWidth="1.5"
                      className={`${isSelected ? "animate-pulse" : "opacity-60"}`}
                    />
                    
                    {/* Inner glowing core */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? "#FF9933" : "#D4AF37"}
                      className="transition-all duration-300"
                    />

                    {/* Glowing coordinate dot */}
                    <circle
                      cx={px}
                      cy={py}
                      r="20"
                      fill="rgba(212, 175, 55, 0.08)"
                      className="animate-ping"
                      style={{ animationDuration: "3s" }}
                    />

                    {/* Text Label next to pin */}
                    <text
                      x={px + 12}
                      y={py + 4}
                      fill={isSelected ? "#white" : "rgba(255,255,255,0.7)"}
                      fontSize="10"
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="font-cinzel tracking-wider transition-colors duration-300 select-none"
                    >
                      {loc.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Location details overlay Panel (4 cols) */}
          <div className="lg:col-span-4 h-full flex">
            <div className="w-full glass-panel border border-sacred-gold/15 p-6 rounded-3xl shadow-2xl min-h-[420px] flex flex-col justify-between relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {selectedLoc ? (
                  <motion.div
                    key={selectedLoc.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between flex-1"
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative w-full h-[150px] rounded-2xl overflow-hidden border border-white/5 mb-5 shadow-lg">
                        <Image
                          src={selectedLoc.image}
                          alt={selectedLoc.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 350px"
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/30 to-transparent" />
                        <button
                          onClick={() => setSelectedLoc(null)}
                          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-deep-black/60 text-white hover:text-saffron border border-white/10 backdrop-blur-sm cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Header content */}
                      <span className="text-[9px] tracking-widest font-bold text-saffron uppercase block mb-1">
                        {selectedLoc.type}
                      </span>
                      <h3 className="font-cinzel text-xl font-bold text-white mb-2.5">
                        {selectedLoc.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[10px] text-sacred-gold font-mono mb-4 bg-sacred-gold/5 border border-sacred-gold/10 px-2 py-0.5 rounded-md inline-flex">
                        <MapPin className="w-3 h-3" />
                        <span>GPS: {selectedLoc.gps}</span>
                      </div>

                      <p className="text-[11px] text-zinc-300 font-light leading-relaxed mb-6">
                        {selectedLoc.desc}
                      </p>
                    </div>

                    {/* Footer metrics */}
                    <div className="border-t border-white/5 pt-4 mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                        <Compass className="w-3.5 h-3.5 text-saffron shrink-0" />
                        <span>{selectedLoc.distanceFromStation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                        <Info className="w-3.5 h-3.5 text-sacred-gold shrink-0" />
                        <span>Attraction Rating: {selectedLoc.attractionRate}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Default state when no pin is clicked
                  <div className="flex flex-col items-center justify-center text-center py-20 flex-1">
                    <div className="w-16 h-16 rounded-full border border-sacred-gold/20 flex items-center justify-center text-sacred-gold mb-6 bg-sacred-gold/5 animate-pulse">
                      <Compass className="w-8 h-8" />
                    </div>
                    <h4 className="font-cinzel text-lg font-bold text-white mb-2">
                      Select a Landmark
                    </h4>
                    <p className="text-xs text-zinc-500 font-light max-w-[220px] leading-relaxed">
                      Click any pulsing golden coordinate pin on the holographic satellite map to stream real-time location telemetry, photos, and luxury guidelines.
                    </p>
                  </div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
