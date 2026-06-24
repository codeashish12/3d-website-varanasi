"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Compass, Eye, ShieldAlert } from "lucide-react";

interface Gem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  luxuryHighlight: string;
  bestTime: string;
  visualType: "image" | "abstract";
  imagePath?: string;
  gradientClass: string;
  svgIcon: React.ReactNode;
}

const gems: Gem[] = [
  {
    id: "ramnagar-fort",
    name: "Ramnagar Fort",
    tagline: "The Royal Custodian of the Ganga",
    description: "An 18th-century red-sandstone stronghold standing majestic on the eastern bank of the Ganga. Built by Maharaja Balwant Singh, it remains the ancestral home of the Maharaja of Benares and houses a fascinating vintage museum showing royal vintage cars, gold-plated palanquins, and medieval armories.",
    luxuryHighlight: "Private royal chamber tour and exclusive sunset tea terrace overlooking the river.",
    bestTime: "4:00 PM – 6:30 PM (Sunset)",
    visualType: "image",
    imagePath: "/ramnagar_fort.png",
    gradientClass: "from-amber-900/30 to-deep-black",
    svgIcon: <Award className="w-8 h-8 text-sacred-gold" />
  },
  {
    id: "bharat-kala-bhavan",
    name: "Bharat Kala Bhavan",
    tagline: "The Vault of Indian Heritage",
    description: "Located within the green sanctuary of BHU, this is one of India's premier archaeological museums. It houses an invaluable collection of over 100,000 artifacts, including rare 5th-century clay sculptures, exquisite miniature paintings from the Mughal era, and Sanskrit manuscripts inscribed on palm leaves.",
    luxuryHighlight: "Private walkthrough curated by the chief archivist and VIP entry to closed archives.",
    bestTime: "11:00 AM – 3:00 PM (Mid-day)",
    visualType: "abstract",
    gradientClass: "from-purple-950/45 via-luxury-dark to-deep-black",
    svgIcon: (
      <svg className="w-16 h-16 text-sacred-gold/80 animate-spin-slow" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,25 65,45 60,70 40,70 35,45" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,15 75,45 65,80 35,80 25,45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="6" fill="currentColor" className="text-saffron" />
      </svg>
    )
  },
  {
    id: "bhu-campus",
    name: "Banaras Hindu University",
    tagline: "The modern temple of learning",
    description: "Founded in 1916 by Pandit Madan Mohan Malaviya, BHU is one of Asia's largest residential universities. Spanning over 1,300 acres of lush forests, it features a grand, semi-circular layout, Indo-Gothic architectures, and the majestic New Kashi Vishwanath temple (VT) built entirely of white marble.",
    luxuryHighlight: "Chauffeured golf-cart tour of the campus forests, heritage libraries, and private temple courtyard access.",
    bestTime: "7:00 AM – 9:30 AM (Morning)",
    visualType: "abstract",
    gradientClass: "from-blue-950/40 via-luxury-dark to-deep-black",
    svgIcon: (
      <svg className="w-16 h-16 text-saffron/80 animate-spin-slow" viewBox="0 0 100 100" fill="none" style={{ animationDirection: "reverse" }}>
        <rect x="25" y="25" width="50" height="50" rx="10" stroke="currentColor" strokeWidth="1" />
        <rect x="30" y="30" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.75" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="50" cy="50" r="4" fill="currentColor" className="text-sacred-gold" />
      </svg>
    )
  },
  {
    id: "silk-markets",
    name: "Local Silk Markets (Chowk & Peeli Kothi)",
    tagline: "The golden threads of craftsmanship",
    description: "The historical quarters of old Banaras, where Muslim and Hindu weavers (Karigars) work hand-in-hand. Watch them create the world-famous Banarasi silk sarees on wooden handlooms, weaving real gold and silver threads (Zari) into intricate floral and paisley brocades.",
    luxuryHighlight: "Private viewings at heritage weaving houses with vintage collections dating back 150 years.",
    bestTime: "4:00 PM – 8:00 PM (Evening Shopping)",
    visualType: "abstract",
    gradientClass: "from-amber-950/40 via-luxury-dark to-deep-black",
    svgIcon: (
      <svg className="w-16 h-16 text-sacred-gold/85" viewBox="0 0 100 100" fill="none">
        <path d="M50 10 C 65 30, 80 50, 50 90 C 20 50, 35 30, 50 10 Z" stroke="currentColor" strokeWidth="1.25" />
        <path d="M50 20 C 60 35, 70 50, 50 80 C 30 50, 40 35, 50 20 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="50" cy="50" r="2" fill="currentColor" className="text-saffron" />
        <path d="M10 50 H 90" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <path d="M50 10 V 90" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
    )
  }
];

export default function HiddenGems() {
  return (
    <section id="hidden-gems" className="relative py-24 md:py-32 bg-deep-black overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-sacred-gold/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <span className="text-saffron text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 block">
            Unchartered Territories
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-cinzel">
            Hidden <span className="bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent gold-glow">Gems</span>
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Venture off the beaten track. Discover the palaces of kings, vaults of rare heritage art, quiet forest sanctuaries, and legacy weaving blocks.
          </p>
        </div>

        {/* Gems List (Alternating / Parallax-like reveal grid) */}
        <div className="space-y-24 md:space-y-36">
          {gems.map((gem, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={gem.id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual side (6 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 flex justify-center"
                >
                  <div
                    className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center justify-center p-6 bg-gradient-to-br ${gem.gradientClass} group hover:border-sacred-gold/25 transition-all duration-500`}
                  >
                    {gem.visualType === "image" && gem.imagePath ? (
                      <>
                        <Image
                          src={gem.imagePath}
                          alt={gem.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 550px"
                          className="object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent" />
                      </>
                    ) : (
                      // Futuristic Abstract Mandalas/Yantras for non-image slots
                      <div className="relative flex flex-col items-center justify-center text-center p-8 select-none">
                        {gem.svgIcon}
                        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sacred-gold/5 via-transparent to-transparent pointer-events-none" />
                        <span className="font-cinzel text-xs text-sacred-gold/40 tracking-[0.4em] uppercase mt-6">
                          Cosmic Geometry Grid
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Text Content side (6 cols) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <div className="glass-panel p-8 md:p-10 rounded-3xl border border-sacred-gold/10 hover:border-sacred-gold/20 shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
                    <span className="text-[10px] tracking-[0.25em] font-semibold text-saffron uppercase block mb-1">
                      {gem.tagline}
                    </span>
                    <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-6 tracking-wide">
                      {gem.name}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                      {gem.description}
                    </p>

                    {/* Metadata boxes */}
                    <div className="space-y-4 border-t border-white/5 pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded bg-sacred-gold/10 text-sacred-gold mt-0.5">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs text-zinc-300">
                          <strong className="text-sacred-gold font-normal">Luxury Highlight: </strong>
                          {gem.luxuryHighlight}
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded bg-saffron/10 text-saffron mt-0.5">
                          <Compass className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs text-zinc-300">
                          <strong className="text-saffron font-normal">Recommended Hours: </strong>
                          {gem.bestTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
