"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Sparkles, Star } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  tagline: string;
  description: string;
  timing: string;
  duration: string;
  location: string;
  luxuryIncludes: string[];
  image: string;
}

const experiences: Experience[] = [
  {
    id: "ganga-aarti",
    title: "Ganga Aarti Ceremony",
    tagline: "A Symphony of Fire, Faith, and Chants",
    description: "Witness the magnificent ritual of worship dedicated to Goddess Ganga and Lord Shiva. As dusk falls, young priests dressed in saffron robes perform rhythmic prayers with multi-tiered brass lamps, incense, and conch shell blows, creating a divine atmosphere that resonates through your soul.",
    timing: "6:00 PM – 7:30 PM (Daily)",
    duration: "1.5 Hours",
    location: "Dashashwamedh Ghat",
    luxuryIncludes: [
      "Private hand-crafted wooden platform seating directly on the river",
      "Traditional welcome with fresh flower garlands and sandalwood tilak",
      "Personal cultural guide detailing the historical Vedic roots of each chant",
      "Curated silver platter of organic Banarasi sweets and hot saffron tea"
    ],
    image: "/dashashwamedh.png"
  },
  {
    id: "sunrise-boat",
    title: "Sunrise Boat Ride",
    tagline: "Dawn Over the Ganges",
    description: "Experience 'Subah-e-Banaras' (the morning of Banaras). Watch the city wake up under a pastel-painted sky as pilgrims take holy baths, classical instrumental music echoes from the ghats, and the first rays of the sun illuminate the ancient temple spires with a golden light.",
    timing: "5:00 AM – 7:00 AM (Early Morning)",
    duration: "2 Hours",
    location: "Assi Ghat to Manikarnika Ghat",
    luxuryIncludes: [
      "Private luxury wooden Bajra boat with cushioned daybeds",
      "Live classical flute and sitar jugalbandi performance on-board",
      "Premium Vedic chanting session led by a local priest",
      "Gourmet breakfast hamper with fresh fruits, local snacks, and organic coffee"
    ],
    image: "/assi.png"
  },
  {
    id: "temple-tours",
    title: "Sacred Temple Tours",
    tagline: "Path to Liberation",
    description: "Explore the ancient energy grids of Kashi. Traverse the sacred corridors of the legendary Kashi Vishwanath Golden Temple, feel the devotional energy at the historical Durga Temple, and learn about the local folklore of monkey-faced deity Hanuman at Sankat Mochan.",
    timing: "8:00 AM – 12:00 PM (Morning)",
    duration: "4 Hours",
    location: "Various Old City Temples",
    luxuryIncludes: [
      "VIP 'Sugam Darshan' fast-track passes bypassing all temple queues",
      "Exclusionary access to private prayer rooms for special rituals",
      "Accompanied by a Sanskrit scholar and historical guide",
      "Luxury chauffeured sedan transfers from your hotel"
    ],
    image: "/temple_tour.png"
  },
  {
    id: "cultural-walk",
    title: "Evening Cultural Walk",
    tagline: "Inside the Labyrinth of Kashi",
    description: "Navigate the winding, ancient alleyways (Galis) of Varanasi. Explore traditional music schools where maestros practice, witness the weaving of heritage Banarasi silk sarees on handlooms, and discover the deep historical context of the oldest living streets on Earth.",
    timing: "4:00 PM – 7:00 PM (Evening)",
    duration: "3 Hours",
    location: "Heritage Alleyways of Old Kashi",
    luxuryIncludes: [
      "Private curated walk with a local heritage conservationist",
      "Exclusive access to a 300-year-old traditional weaving workshop",
      "Private classical vocal performance at an ancient music gharana",
      "Tasting of premium organic street food delicacies from legacy stalls"
    ],
    image: "/cultural_walk.png"
  }
];

export default function SpiritualExperiences() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = experiences[activeIdx];

  return (
    <section id="experiences" className="relative py-24 md:py-32 bg-deep-black border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-saffron/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-saffron text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 block">
            Transcendent Encounters
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-cinzel">
            Spiritual <span className="bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent gold-glow">Experiences</span>
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-sacred-gold to-transparent mt-4 mb-6" />
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Immerse yourself in hand-crafted spiritual journeys. These experiences merge ancient Vedic traditions with premium modern luxury.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Navigation Tabs (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
            {experiences.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative w-full text-left p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  activeIdx === idx
                    ? "bg-luxury-dark/80 border-sacred-gold/40 shadow-[0_4px_25px_rgba(212,175,55,0.08)]"
                    : "bg-transparent border-white/5 hover:border-white/15"
                }`}
              >
                {/* Accent line on active tab */}
                {activeIdx === idx && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-1/4 w-[3px] h-1/2 bg-gradient-to-b from-sacred-gold to-saffron rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className={`text-[10px] tracking-[0.25em] font-semibold uppercase mb-1 block ${
                  activeIdx === idx ? "text-saffron" : "text-zinc-500"
                }`}>
                  0{idx + 1} • {exp.duration}
                </span>
                
                <h3 className={`font-cinzel text-lg md:text-xl font-bold transition-colors duration-300 ${
                  activeIdx === idx ? "text-white" : "text-zinc-400"
                }`}>
                  {exp.title}
                </h3>
                
                <p className="text-xs text-zinc-500 font-light line-clamp-1 mt-1">
                  {exp.tagline}
                </p>
              </button>
            ))}
          </div>

          {/* Right Display Panel (8 cols) */}
          <div className="lg:col-span-8 flex">
            <div className="w-full rounded-3xl overflow-hidden glass-panel flex flex-col md:flex-row relative">
              
              {/* Active Content Animation Wrapper */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col md:flex-row"
                >
                  {/* Left Column: Text Content */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between z-10">
                    <div>
                      <span className="text-[10px] tracking-[0.3em] font-bold text-saffron uppercase block mb-1">
                        {activeExp.tagline}
                      </span>
                      <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                        {activeExp.title}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                        {activeExp.description}
                      </p>

                      {/* Travel details */}
                      <div className="flex flex-col gap-3 mb-6 bg-deep-black/30 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3 text-xs text-zinc-400">
                          <Clock className="w-4 h-4 text-sacred-gold shrink-0" />
                          <span><strong>Timing:</strong> {activeExp.timing}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-zinc-400">
                          <MapPin className="w-4 h-4 text-saffron shrink-0" />
                          <span><strong>Location:</strong> {activeExp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-sacred-gold to-saffron text-deep-black text-xs font-semibold tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer">
                      RESERVE PRIVATE TOUR
                    </button>
                  </div>

                  {/* Right Column: Image & Luxury Inclusions */}
                  <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-auto">
                    {/* Background Visual */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={activeExp.image}
                        alt={activeExp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover opacity-35"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/60 to-transparent md:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent md:hidden block" />
                    </div>

                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
                      <div className="bg-[#0B0B0B]/80 backdrop-blur-md p-5 rounded-2xl border border-sacred-gold/20 shadow-2xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-4 h-4 text-sacred-gold fill-sacred-gold" />
                          <span className="text-[10px] tracking-widest font-bold text-white uppercase">
                            Futuristic Luxury Inclusions
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {activeExp.luxuryIncludes.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2 text-[10px] text-zinc-300 font-light leading-snug">
                              <Sparkles className="w-3 h-3 text-saffron shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
