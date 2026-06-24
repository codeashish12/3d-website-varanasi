"use client";

import React, { useState, MouseEvent } from "react";
import { X, Clock, Landmark, Info, MapPin } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import ScrollReveal from "@/components/ScrollReveal";

interface Ghat {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  fact: string;
  timing: string;
  rituals: string;
  image: string;
  coordinates: string;
}

const GHATS_DATA: Ghat[] = [
  {
    id: "dashashwamedh",
    name: "Dashashwamedh Ghat",
    sanskrit: "दशाश्वमेध घाट",
    description: "The primary and most spectacular ghat on the Ganges. According to myth, Lord Brahma sacrificed ten horses here to welcome Lord Shiva.",
    fact: "Host of the world-famous evening Ganga Aarti. It is the beating heart of Banaras.",
    timing: "Open 24 hours (Aarti at 6:30 PM)",
    rituals: "Ganga Aarti, Snan (Holy Bath), Devotion offerings",
    image: "/images/ghat_dashashwamedh.png",
    coordinates: "25.3069° N, 83.0104° E"
  },
  {
    id: "assi",
    name: "Assi Ghat",
    sanskrit: "अस्सी घाट",
    description: "Located at the south-most confluence of Assi and Ganga rivers. Celebrated as the resting place of saints and the starting point of the Subah-e-Banaras morning rituals.",
    fact: "Believed to be where Goddess Durga threw her sword after defeating demons Shumbha-Nishumbha.",
    timing: "Open 24 hours (Subah-e-Banaras at 5:00 AM)",
    rituals: "Morning Vedic Chanting, Yoga on the Ghats, Classical Music",
    image: "/images/ghat_assi.png",
    coordinates: "25.2892° N, 83.0069° E"
  },
  {
    id: "manikarnika",
    name: "Manikarnika Ghat",
    sanskrit: "मणिकर्णिका घाट",
    description: "The main burning ghat where cremation fires are perpetual. It represents the ultimate truth of mortality and the gateway to liberation (Moksha).",
    fact: "Lord Shiva is said to have dropped his earring (Karnika) here. The fire has burned for 3000+ years.",
    timing: "Open 24 hours (Restricted photography)",
    rituals: "Antyesti (Last Rites), Moksha prayers, holy cremation",
    image: "/images/ghat_manikarnika.png",
    coordinates: "25.3106° N, 83.0133° E"
  },
  {
    id: "rajendra-prasad",
    name: "Rajendra Prasad Ghat",
    sanskrit: "राजेंद्र प्रसाद घाट",
    description: "Named after the first President of India, this clean and spacious ghat is famous for hosting cultural exhibitions and boat rides.",
    fact: "It was previously part of Dashashwamedh Ghat and was separated in 1979.",
    timing: "Open 24 hours (Boating: 5 AM - 8 PM)",
    rituals: "Heritage tours, Evening lamps, Boat cruise departures",
    image: "/images/ghat_rajendra_prasad.png",
    coordinates: "25.3072° N, 83.0108° E"
  },
  {
    id: "panchganga",
    name: "Panchganga Ghat",
    sanskrit: "पंचगंगा घाट",
    description: "The mystical confluence of five rivers: Ganga, Yamuna, Saraswati, Kirana, and Dhutapapa. It holds immense Vedic scriptural prominence.",
    fact: "Sufi-Bhakti saint Kabir was initiated here by his Guru Ramananda on the stone steps.",
    timing: "Open 24 hours",
    rituals: "Karthik Lamp festival, sacred bathing, heritage treks",
    image: "/images/ghat_panchganga.png",
    coordinates: "25.3164° N, 83.0175° E"
  },
  {
    id: "chet-singh",
    name: "Chet Singh Ghat",
    sanskrit: "चेत सिंह घाट",
    description: "A fortified ghat that witnessed a historical battle between Maharaja Chet Singh and Warren Hastings in 1781. Highly architectural and photogenic.",
    fact: "Features a massive 18th-century fort structure built by the Bhumihar rulers of Kashi.",
    timing: "Open 24 hours (Interior fort restricted)",
    rituals: "Photography, architectural walks, sunset viewing",
    image: "/images/ghat_chet_singh.png",
    coordinates: "25.2989° N, 83.0075° E"
  }
];

export default function Ghats() {
  const { mode, playBell } = useTheme();
  const [selectedGhat, setSelectedGhat] = useState<Ghat | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section
      id="ghats"
      className="relative py-24 px-6 transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#0B132B" : "#EAE5D9"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-text-secondary font-semibold">
              Interactive Portal
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
              The Sacred Ghats
            </h2>
            <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
            <p className="text-sm text-text-primary/75 max-w-xl mx-auto mt-4 font-light leading-relaxed">
              The riverfront steps leading to the holy Ganga. Each ghat holds unique mythic origin, dynamic rituals, and a passage to liberation.
            </p>
          </div>
        </ScrollReveal>

        {/* Ghats Cards Grid with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GHATS_DATA.map((ghat, idx) => (
            <ScrollReveal key={ghat.id} direction="up" delay={idx * 0.12} duration={0.7}>
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  playBell();
                  setSelectedGhat(ghat);
                }}
                style={{
                  transition: "transform 0.1s ease-out, box-shadow 0.3s ease"
                }}
                className="relative h-[320px] w-full rounded-2xl overflow-hidden border border-border-gold cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] flex flex-col justify-between p-6 group"
              >
                {/* Real Photographic Background */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  style={{
                    backgroundImage: `url('${ghat.image}')`
                  }}
                />
                
                {/* Dark gradient overlay for readable text - fades on hover for maximum image visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black/75 group-hover:via-black/20 z-0 transition-all duration-500 pointer-events-none" />

                <div className="z-10 flex justify-between items-start">
                  <span className="text-[9px] font-mono text-sacred-gold tracking-widest uppercase">
                    {ghat.coordinates}
                  </span>
                  <span className="text-xs font-serif bg-sacred-gold/15 text-sacred-gold border border-sacred-gold/30 px-2 py-0.5 rounded">
                    {ghat.sanskrit}
                  </span>
                </div>

                <div className="z-10 mt-auto text-left">
                  <h3 className="text-xl font-serif text-white font-bold tracking-wider mb-2">
                    {ghat.name}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed line-clamp-2">
                    {ghat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-saffron font-serif tracking-widest uppercase font-semibold">
                    <span>Enter Sanctuary</span>
                    <span className="text-xs">→</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Ghat Details Fullscreen Modal */}
      {selectedGhat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-sacred-gold/40 p-8 md:p-10 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedGhat(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="text-left">
              <div className="flex items-center gap-2 text-saffron mb-1">
                <MapPin size={14} />
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  {selectedGhat.coordinates}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-sacred-gold font-bold uppercase tracking-wider">
                {selectedGhat.name}
              </h3>
              <p className="text-sm font-serif italic text-white/60">
                {selectedGhat.sanskrit}
              </p>
            </div>

            <div className="w-full h-[1px] bg-sacred-gold/20" />

            {/* Modal Image display */}
            <div 
              className="w-full h-48 rounded-xl bg-cover bg-center border border-white/10"
              style={{ backgroundImage: `url('${selectedGhat.image}')` }}
            />

            <p className="text-sm text-white/80 font-light leading-relaxed text-left">
              {selectedGhat.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3">
                <Info size={16} className="text-saffron shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                    Mythological Lore
                  </span>
                  <p className="text-xs text-white/70 font-light mt-0.5 leading-relaxed">
                    {selectedGhat.fact}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3">
                <Clock size={16} className="text-saffron shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                    Best Timing & Rituals
                  </span>
                  <p className="text-xs text-white/70 font-light mt-0.5 leading-relaxed">
                    <strong>Timings:</strong> {selectedGhat.timing} <br />
                    <strong>Rituals:</strong> {selectedGhat.rituals}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedGhat(null)}
                className="px-6 py-2 rounded-full border border-sacred-gold text-sacred-gold font-serif text-[10px] tracking-widest uppercase hover:bg-sacred-gold hover:text-deep-black transition-colors cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
