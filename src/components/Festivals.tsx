"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, Calendar, HeartHandshake } from "lucide-react";

interface Festival {
  name: string;
  sanskrit: string;
  season: string;
  description: string;
  grandeur: string; // detail on light effect/decorations
  spiritualFact: string;
  color: string;
  glow: string;
  image: string;
}

const FESTIVALS_DATA: Festival[] = [
  {
    name: "Dev Deepawali",
    sanskrit: "देव दीपावली",
    season: "Kartik Poornima (Nov/Dec)",
    description: "The 'Diwali of the Gods'. Every single step of all 84 ghats is illuminated with over a million clay lamps (diyas). It is believed that gods descend to earth to bathe in the Ganges.",
    grandeur: "Ghats are decorated with massive rangolis, flower garlands, and lasers. Thousands of sky lanterns light the night.",
    spiritualFact: "Celebrates the victory of Lord Shiva over the demon Tripurasura (hence Tripurari Poornima).",
    color: "from-amber-500/20 via-saffron/20 to-black/80",
    glow: "shadow-[0_0_25px_rgba(255,153,51,0.25)]",
    image: "/ganga_aarti.png"
  },
  {
    name: "Maha Shivratri",
    sanskrit: "महाशिवरात्रि",
    season: "Phalguna Krishna Chaturdashi (Feb/Mar)",
    description: "The great night of Shiva, celebrating the cosmic marriage of Shiva and Parvati. The city turns into a chaotic carnival of devotional ecstasy.",
    grandeur: "Massive processions (Shiv Baraat) with characters dressed as gods, spirits, and celestial dancers passing through streets.",
    spiritualFact: "Devotees fast all day and perform continuous milk and water offerings (Abhishekam) to Shiva Lingas all night.",
    color: "from-blue-600/20 via-indigo-950/20 to-black/80",
    glow: "shadow-[0_0_25px_rgba(93,173,226,0.2)]",
    image: "/images/temple_kashi.png"
  },
  {
    name: "Ganga Mahotsav",
    sanskrit: "गंगा महोत्सव",
    season: "Kartik month (November)",
    description: "A 5-day cultural festival dedicated to the sacred river Ganga. It hosts the finest classical musicians, dancers, and artists of India on the river banks.",
    grandeur: "Massive floating stages are constructed on the riverfront, hosting traditional sitar recitals and kathak dance shows.",
    spiritualFact: "A celebration of the river as a living goddess who feeds, cleanses, and heals the civilization.",
    color: "from-teal-600/20 via-slate-900/20 to-black/80",
    glow: "shadow-[0_0_25px_rgba(72,187,120,0.15)]",
    image: "/images/ghat_dashashwamedh.png"
  },
  {
    name: "Nag Nathaiya",
    sanskrit: "नाग नथैया",
    season: "Kartik Shukla Chauth (Nov)",
    description: "A unique festival recreating Lord Krishna's divine victory over the multi-headed venomous serpent Kalia in the Ganges.",
    grandeur: "A young boy dressed as Krishna leaps from a high branch of a Kadamba tree into the Ganges, emerging victoriously atop a massive snake effigy.",
    spiritualFact: "Symbolizes the triumph of divine love over toxicity and environmental corruption.",
    color: "from-emerald-500/20 via-green-950/20 to-black/80",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.15)]",
    image: "/images/ghat_assi.png"
  }
];

export default function Festivals() {
  const { mode, playBell } = useTheme();
  const [activeFest, setActiveFest] = useState<number | null>(null);

  return (
    <section
      id="festivals"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#0B132B" : "#EAE5D9"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
            Ritual Cycle
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
            Culture & Festivals
          </h2>
          <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
          <p className="text-sm text-text-primary/75 max-w-xl mx-auto mt-4 font-light leading-relaxed">
            In Kashi, every day is a festival, but during these sacred nights, the city becomes a cosmic theater of light, music, and divine weddings.
          </p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FESTIVALS_DATA.map((fest, idx) => {
            const isActive = activeFest === idx;
            return (
              <div
                key={fest.name}
                onClick={() => {
                  playBell();
                  setActiveFest(isActive ? null : idx);
                }}
                className={`relative rounded-2xl p-8 border border-border-gold/30 cursor-pointer overflow-hidden transition-all duration-500 flex flex-col justify-between min-h-[280px] shadow-xl text-left group ${
                  isActive ? `${fest.glow} scale-[1.01]` : "hover:scale-[1.01]"
                }`}
              >
                {/* Real Photographic Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  style={{
                    backgroundImage: `url('${fest.image}')`
                  }}
                />
                
                {/* Dark overlay to ensure text readability - fades on hover */}
                <div className="absolute inset-0 bg-black/75 group-hover:bg-black/40 z-0 transition-all duration-500 pointer-events-none" />

                {/* Background color gradient tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${fest.color} opacity-20 z-0 pointer-events-none`} />

                {/* Top Section */}
                <div className="z-10 relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-saffron font-semibold">
                      <Calendar size={14} />
                      <span className="font-mono tracking-wider">{fest.season}</span>
                    </div>
                    <span className="text-xs font-serif bg-sacred-gold/15 text-sacred-gold border border-sacred-gold/20 px-2 py-0.5 rounded">
                      {fest.sanskrit}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif text-white font-bold tracking-wider mb-3">
                    {fest.name}
                  </h3>

                  {!isActive ? (
                    <p className="text-xs text-white/80 font-light leading-relaxed line-clamp-3">
                      {fest.description}
                    </p>
                  ) : (
                    <div className="animate-fade-in flex flex-col gap-4 mt-2">
                      <p className="text-xs text-white/80 font-light leading-relaxed">
                        {fest.description}
                      </p>
                      
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-[9px] uppercase tracking-widest text-saffron font-bold block">
                          Visual Grandeur
                        </span>
                        <p className="text-xs text-white/70 font-light mt-0.5 leading-relaxed">
                          {fest.grandeur}
                        </p>
                      </div>

                      <div className="flex items-start gap-2">
                        <Sparkles size={12} className="text-sacred-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-sacred-gold font-bold block">
                            Mythological Resonance
                          </span>
                          <p className="text-xs text-white/60 font-light mt-0.5 italic leading-relaxed">
                            {fest.spiritualFact}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row */}
                <div className="z-10 mt-6 pt-4 border-t border-white/10 flex justify-end relative">
                  <span className="text-[9px] uppercase tracking-widest text-sacred-gold font-serif">
                    {isActive ? "Collapse Card" : "Unravel festival"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
