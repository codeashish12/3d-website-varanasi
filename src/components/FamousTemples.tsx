"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";

interface Temple {
  id: string;
  name: string;
  sanskrit: string;
  deity: string;
  hymn: string;
  history: string;
  architecture: string;
  dressCode: string;
  color: string;
}

const temples: Temple[] = [
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    sanskrit: "श्री काशी विश्वनाथ मंदिर",
    deity: "Lord Shiva (Vishwanatha - Ruler of the Universe)",
    hymn: "ॐ नमः शिवाय (Om Namah Shivaya)",
    history: "One of the twelve sacred Jyotirlingas. Destroyed and rebuilt multiple times, the current structure was constructed by Queen Ahilyabai Holkar of Indore in 1780. Its spires are covered with over 800 kg of pure gold donated by Maharaja Ranjit Singh.",
    architecture: "Traditional Hindu Nagara style, featuring a gold-plated dome and spire (Shikhara).",
    dressCode: "Traditional Indian attire recommended. Strict security; no phones or electronics allowed inside.",
    color: "rgba(212, 175, 55, 0.15)",
  },
  {
    id: "sankat-mochan",
    name: "Sankat Mochan Temple",
    sanskrit: "संकट मोचन हनुमान मंदिर",
    deity: "Lord Hanuman (Sankat Mochan - Reliever of Troubles)",
    hymn: "श्री राम दूतं शरणं प्रपद्ये (Shri Ram Dutam Sharanam Prapadye)",
    history: "Established in the early 16th century by the saint-poet Goswami Tulsidas, the author of Ramacharitamanas. The deity here is unique as it faces its Lord Rama, whom Hanuman served with absolute devotion.",
    architecture: "Simple and serene courtyard architecture, filled with towering trees and a lively monkey population.",
    dressCode: "Casual/Decent clothes. Highly crowded on Tuesdays and Saturdays (days sacred to Hanuman).",
    color: "rgba(255, 153, 51, 0.15)",
  },
  {
    id: "durga-kund",
    name: "Durga Temple (Durga Kund)",
    sanskrit: "दुर्गा मंदिर (दुर्गा कुंड)",
    deity: "Goddess Durga (Adishakti - Sacred Feminine Power)",
    hymn: "सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके (Sarvamangala Mangalye)",
    history: "Built in the 18th century by a Bengali Maharani. It is painted red with ochre clay to represent the fierce energy and power of Goddess Durga. The temple stands adjacent to a large square water tank called Durga Kund.",
    architecture: "Multi-tiered Shikhara in North Indian Nagara style, constructed using red sandstone.",
    dressCode: "Decent clothes. Saffron or red garments are highly auspicious here.",
    color: "rgba(220, 38, 38, 0.15)",
  },
  {
    id: "tulsi-manas",
    name: "Tulsi Manas Temple",
    sanskrit: "तुलसी मानस मंदिर",
    deity: "Lord Rama, Goddess Sita & Lakshmana",
    hymn: "मंगल भवन अमंगल हारी (Mangal Bhavan Amangal Hari)",
    history: "Built in 1964 by a philanthropic family, at the exact site where Goswami Tulsidas wrote the epic Ramacharitamanas. The entire text of the epic is beautifully engraved in marble panels across the temple walls.",
    architecture: "Neoclassical white marble construction, set inside a lush landscaped garden with moving mechanical figurines.",
    dressCode: "Decent/Casual clothes. Photography is permitted in specific gallery areas.",
    color: "rgba(255, 255, 255, 0.08)",
  },
];

export default function FamousTemples() {
  return (
    <section id="temples" className="relative py-24 md:py-32 bg-[#0B0B0B]">
      {/* Central sacred aura glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-sacred-gold/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <span className="text-saffron text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 block">
            Devotional Epocenters
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-cinzel">
            Famous <span className="bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent gold-glow">Temples</span>
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Step into the sacred geometry of Kashi's ancient shrines. These vortexes of devotion have anchored Hindu spirituality and philosophy for millennia.
          </p>
        </div>

        {/* Temples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {temples.map((temple, idx) => (
            <motion.div
              key={temple.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative rounded-3xl p-8 border border-sacred-gold/15 bg-luxury-dark/40 overflow-hidden transition-all duration-500 hover:border-sacred-gold/40 hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)] flex flex-col justify-between min-h-[380px]"
              style={{
                boxShadow: `inset 0 0 30px ${temple.color}`,
              }}
            >
              {/* Golden Hover Sweep Line Effect */}
              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-sacred-gold/10 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-[1200ms] ease-out pointer-events-none" />

              <div>
                {/* Header: Title, Sanskrit, Deity */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-white/5 mb-6">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-saffron uppercase mb-1 block">
                      {temple.sanskrit}
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {temple.name}
                    </h3>
                  </div>
                  <div className="shrink-0 self-start sm:self-center bg-deep-black/60 border border-sacred-gold/20 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                    <span className="text-[10px] tracking-wider text-sacred-gold font-medium uppercase">
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Holy Verse Chant Banner */}
                <div className="py-2.5 px-4 rounded-xl bg-[#0B0B0B]/80 border border-saffron/10 text-saffron/90 italic font-cinzel text-xs flex items-center gap-2 mb-6">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{temple.hymn}</span>
                </div>

                {/* Body Details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] tracking-wider text-zinc-500 uppercase font-semibold">
                      Deity
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-0.5">
                      {temple.deity}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider text-zinc-500 uppercase font-semibold">
                      Chronology & History
                    </span>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed mt-0.5">
                      {temple.history}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom row: Architecture & Travel Tip */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] tracking-wider text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                    <Trophy className="w-3 h-3 text-sacred-gold" /> Architecture
                  </span>
                  <p className="text-[11px] text-zinc-300 font-light mt-0.5">
                    {temple.architecture}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] tracking-wider text-zinc-500 uppercase font-bold flex items-center gap-1.5">
                    Dress Code & Tip
                  </span>
                  <p className="text-[11px] text-zinc-300 font-light mt-0.5">
                    {temple.dressCode}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
