"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";

interface Gem {
  name: string;
  type: string;
  description: string;
  lore: string;
  location: string;
  experience: string;
  accent: string;
  image: string;
}

const GEMS_DATA: Gem[] = [
  {
    name: "Ramnagar Fort",
    type: "Royal Heritage",
    description: "An 18th-century sandstone fortress located on the eastern bank of the Ganges. It serves as the ancestral home of the Maharaja of Benares.",
    lore: "Houses a rare museum showcasing vintage American cars, gold-plated palanquins, and astronomical clocks.",
    location: "Opposite Tulsi Ghat",
    experience: "Sunset views over the river from the fort bastions.",
    accent: "border-amber-500/30 text-amber-400",
    image: "/images/fort_ramnagar.png"
  },
  {
    name: "Bharat Kala Bhavan",
    type: "Museum of Antiquity",
    description: "An art and archaeological museum located inside the BHU campus, displaying over 100,000 antiquities.",
    lore: "Famous for its collection of miniature paintings, ancient clay sculptures, and 1st-century coins.",
    location: "Banaras Hindu University campus",
    experience: "Viewing rare Mughal paintings and ancient stone idols.",
    accent: "border-emerald-500/30 text-emerald-400",
    image: "/images/fort_ramnagar.png"
  },
  {
    name: "Banaras Hindu University",
    type: "Academic Sanctuary",
    description: "Founded in 1916 by Pandit Madan Mohan Malaviya. One of the largest residential universities in Asia, designed in a crescent shape.",
    lore: "Built on land donated by the Maharaja of Kashi, it represents the synthesis of modern science and ancient knowledge.",
    location: "Lanka, Southern Varanasi",
    experience: "Strolling through tree-lined streets and visiting the central Birla temple.",
    accent: "border-blue-500/30 text-blue-400",
    image: "/images/temple_bhu.png"
  },
  {
    name: "Banarasi Silk Weaving",
    type: "Living Craft",
    description: "Traditional handloom centers where master weavers spend months crafting single sarees with gold and silver brocade (Zari).",
    lore: "The craft dates back to the Buddhist era and incorporates intricate Persian and floral motifs.",
    location: "Madanpura & Peeli Kothi quarters",
    experience: "Hearing the clatter of wooden looms and watching silk become golden threads.",
    accent: "border-pink-500/30 text-pink-400",
    image: "/images/silk_weaving.png"
  },
  {
    name: "The Narrow Alleys (Galis)",
    type: "Urban Labyrinth",
    description: "A maze of winding, narrow streets (galis) behind the ghats, often less than four feet wide, where sunlight barely touches the ground.",
    lore: "Houses small shrines, ancient bookshops, and centuries-old sweet stalls.",
    location: "Chowk & Vishwanath Gali areas",
    experience: "Getting lost in history, encountering sacred cows, and discovering hidden shrines.",
    accent: "border-purple-500/30 text-purple-400",
    image: "/images/silk_weaving.png"
  }
];

export default function Gems() {
  const { mode, playBell } = useTheme();
  const [activeGem, setActiveGem] = useState<number | null>(null);

  return (
    <section
      id="gems"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#050505" : "#F8F5F0"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
            Hidden Dimensions
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
            Secrets of Kashi
          </h2>
          <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
          <p className="text-sm text-text-primary/75 max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Beyond the river steps lie forts of sandstone, ancient silk looms, legendary archives, and labyrinths where history lives in the shadows.
          </p>
        </div>

        {/* Discovery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GEMS_DATA.map((gem, idx) => {
            const isActive = activeGem === idx;
            const borderClass = gem.accent.split(" ")[0];
            const textAccentClass = gem.accent.split(" ")[1];

            return (
              <div
                key={gem.name}
                onClick={() => {
                  playBell();
                  setActiveGem(isActive ? null : idx);
                }}
                className={`relative rounded-2xl p-6 border ${borderClass} border-border-gold/30 cursor-pointer transition-all duration-500 overflow-hidden min-h-[300px] flex flex-col justify-between shadow-lg group ${
                  isActive ? "shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.01]" : "hover:scale-[1.01]"
                }`}
              >
                {/* Real Photographic Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  style={{
                    backgroundImage: `url('${gem.image}')`
                  }}
                />
                
                {/* Dark overlay to ensure text readability - fades on hover */}
                <div className="absolute inset-0 bg-black/75 group-hover:bg-black/40 z-0 transition-all duration-500 pointer-events-none" />

                {/* Top Section */}
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[10px] font-mono tracking-widest uppercase ${textAccentClass} font-bold`}>
                      {gem.type}
                    </span>
                    <Sparkles size={14} className="text-sacred-gold" />
                  </div>
                  <h3 className="text-xl font-serif text-white font-bold tracking-wider">
                    {gem.name}
                  </h3>
                  
                  {/* Detailed Transition Area */}
                  {!isActive ? (
                    <p className="text-xs text-white/80 font-light leading-relaxed mt-4 line-clamp-4">
                      {gem.description}
                    </p>
                  ) : (
                    <div className="animate-fade-in mt-4 flex flex-col gap-3">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-saffron font-semibold block">
                          History & Myth
                        </span>
                        <p className="text-xs text-white/80 font-light mt-0.5 leading-relaxed">
                          {gem.lore}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-sacred-gold font-semibold block">
                          Key Experience
                        </span>
                        <p className="text-xs text-white/80 font-light mt-0.5 leading-relaxed">
                          {gem.experience}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Row */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
                    <MapPin size={10} className="text-saffron shrink-0" />
                    <span className="truncate max-w-[150px]">{gem.location}</span>
                  </div>
                  
                  <span className="text-[9px] uppercase tracking-widest text-sacred-gold font-serif flex items-center gap-1 group">
                    {isActive ? "Collapse" : "Explore"}
                    <ArrowRight size={10} className={`transition-transform duration-300 ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`} />
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
