"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Compass, Landmark, Hotel } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface Temple {
  name: string;
  deity: string;
  history: string;
  architecturalStyle: string;
  significance: string;
  highlightColor: string;
  image: string;
}

const TEMPLES_DATA: Temple[] = [
  {
    name: "Kashi Vishwanath",
    deity: "Lord Shiva (Jyotirlinga)",
    history: "Reconstructed in 1780 by Maharani Ahilyabai Holkar of Indore. The dome is plated with 800kg of pure gold.",
    architecturalStyle: "Nagara temple architecture with golden spires",
    significance: "One of the twelve sacred Jyotirlingas. A visit is believed to lead to liberation from rebirth.",
    highlightColor: "text-sacred-gold",
    image: "/images/temple_kashi.png"
  },
  {
    name: "Sankat Mochan",
    deity: "Lord Hanuman",
    history: "Established by the mystic saint Goswami Tulsidas in the early 16th century, near the Assi river.",
    architecturalStyle: "Traditional open courtyard style",
    significance: "The temple's name means 'Reliever of Troubles'. Famous for beseeching courage and strength.",
    highlightColor: "text-saffron",
    image: "/images/temple_sankat_mochan.png"
  },
  {
    name: "Durga Mandir (Monkey Temple)",
    deity: "Goddess Durga",
    history: "Built in the 18th century by a Maharani of Bengal. It features a multi-tiered shikhara.",
    architecturalStyle: "Bengali style, colored in deep red ochre",
    significance: "Believed that the deity emerged spontaneously (Swayambhu) to protect Kashi from evil.",
    highlightColor: "text-red-400",
    image: "/images/temple_durga.png"
  },
  {
    name: "Tulsi Manas Mandir",
    deity: "Lord Rama, Sita & Lakshmana",
    history: "Constructed in 1964 in white marble. Built at the exact spot where Tulsidas wrote Ramcharitmanas.",
    architecturalStyle: "Modern marble columns with wall carvings",
    significance: "Engraved with the entire text of the Ramcharitmanas on its walls.",
    highlightColor: "text-teal-300",
    image: "/images/temple_bhu.png"
  },
  {
    name: "New Vishwanath Temple (VT)",
    deity: "Lord Shiva",
    history: "Located inside BHU campus, constructed by the Birla family. Completed in 1966.",
    architecturalStyle: "Modern Nagara, boasts the tallest temple tower in the world (250 ft)",
    significance: "Open to people of all castes, creeds, and religions, promoting universal spiritual harmony.",
    highlightColor: "text-blue-300",
    image: "/images/temple_bhu.png"
  }
];

export default function Temples() {
  const { mode, playBell } = useTheme();

  return (
    <section
      id="temples"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#0B132B" : "#EAE5D9"
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Sticky Left Column */}
        <div className="lg:w-1/3 lg:sticky lg:top-28 lg:h-fit flex flex-col gap-6 text-left">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="flex flex-col gap-6 w-full">
              <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
                Architectural Sanctuaries
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase font-bold">
                Temples of Kashi
              </h2>
              <div className="w-16 h-[2px] bg-sacred-gold" />
              
              <p className="text-sm text-text-primary/75 font-light leading-relaxed">
                Kashi is home to thousands of shrines. Over centuries, rulers and saints have constructed majestic stone monuments to honor the infinite facets of the divine.
              </p>

              <p className="text-sm text-text-primary/75 font-light leading-relaxed">
                Scroll through these architectural marvels to discover their history, structural styles, and cosmic significance.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Scrollable Right Column */}
        <div className="lg:w-2/3 flex flex-col gap-8">
          {TEMPLES_DATA.map((temple, idx) => (
            <ScrollReveal key={temple.name} direction="right" delay={idx * 0.1} duration={0.6}>
              <div
                onClick={() => playBell()}
                className="group relative rounded-2xl border border-border-gold p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden w-full text-left"
              >
                {/* Real Photographic Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  style={{
                    backgroundImage: `url('${temple.image}')`
                  }}
                />
                
                {/* Dark overlay to ensure text readability - fades on hover */}
                <div className="absolute inset-0 bg-black/70 group-hover:bg-black/35 z-0 transition-all duration-500 pointer-events-none" />

                <div className="absolute top-0 right-0 bg-sacred-gold/25 text-sacred-gold font-serif text-[10px] px-3 py-1 rounded-bl-lg tracking-widest uppercase z-10 border-l border-b border-border-gold backdrop-blur-sm">
                  Sanctuary 0{idx + 1}
                </div>

                <div className="relative z-10">
                  <div>
                    <span className={`text-xs uppercase tracking-widest font-mono ${temple.highlightColor} font-bold`}>
                      Deity: {temple.deity}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-white font-bold tracking-wider mt-2">
                      {temple.name}
                    </h3>
                  </div>

                  <div className="w-full h-[1px] bg-white/10 my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 text-left">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold block">
                        Historical Chronicle
                      </span>
                      <p className="text-xs text-white/80 font-light mt-1.5 leading-relaxed">
                        {temple.history}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold block">
                        Architecture & Style
                      </span>
                      <p className="text-xs text-white/80 font-light mt-1.5 leading-relaxed">
                        {temple.architecturalStyle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-start gap-2">
                    <Compass size={14} className="text-saffron shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-sacred-gold font-semibold">
                        Spiritual Resonance
                      </span>
                      <p className="text-xs text-white/70 italic font-light mt-0.5 leading-relaxed">
                        {temple.significance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
