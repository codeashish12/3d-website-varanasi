"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  designation: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Varanasi did not feel like a trip; it felt like a cosmic awakening. The morning boat ride under the golden sunrise was a moment where time literally stood still. Absolute magic.",
    author: "Lady Evelyn Sinclair",
    designation: "Cultural Historian & Author",
    rating: 5
  },
  {
    quote: "The sunset Aarti from the balcony of Brijrama Palace is one of the most stunning sights on Earth. The spiritual gravity of Kashi is balanced beautifully by its royal hospitality.",
    author: "Marc-Antoine Laurent",
    designation: "Luxury Travel Writer, Condé Nast",
    rating: 5
  },
  {
    quote: "Getting lost in the narrow galis, hearing the rhythmic clatter of silk handloom weavers, and enjoying thick clay-pot Malaiyyo—this is a journey into the ancient soul of India.",
    author: "Devika Sen",
    designation: "Textiles Curator & Explorer",
    rating: 5
  }
];

export default function Testimonials() {
  const { mode, playBell } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    playBell();
    setActiveIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playBell();
    setActiveIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIdx];

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#0B132B" : "#EAE5D9"
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
            Chronicles
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
            Traveler Testimonials
          </h2>
          <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
        </div>

        {/* Testimonial Slider Container */}
        <div className="relative w-full rounded-2xl glass-panel p-8 md:p-12 border border-sacred-gold/30 shadow-2xl overflow-hidden min-h-[260px] flex flex-col justify-between items-center">
          {/* Quote icon watermarked */}
          <Quote className="absolute top-6 left-6 text-sacred-gold/5 pointer-events-none" size={100} />

          {/* Rating stars */}
          <div className="flex gap-1 mb-6 text-saffron z-10">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>

          {/* Quote text */}
          <p className="text-md md:text-xl text-text-primary/95 font-serif italic leading-relaxed max-w-2xl z-10 mb-6 transition-all duration-300">
            "{current.quote}"
          </p>

          {/* Author info */}
          <div className="z-10 mt-2">
            <h4 className="text-sm font-serif text-sacred-gold font-bold tracking-widest uppercase">
              {current.author}
            </h4>
            <span className="text-[10px] uppercase tracking-wider text-text-primary/50">
              {current.designation}
            </span>
          </div>

          {/* Nav buttons */}
          <div className="absolute inset-x-4 md:inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-sacred-gold/20 bg-black/40 text-sacred-gold hover:text-saffron hover:border-sacred-gold flex items-center justify-center pointer-events-auto transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-sacred-gold/20 bg-black/40 text-sacred-gold hover:text-saffron hover:border-sacred-gold flex items-center justify-center pointer-events-auto transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bullet indicators */}
        <div className="flex gap-2 mt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { playBell(); setActiveIdx(idx); }}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeIdx === idx ? "bg-saffron w-6" : "bg-sacred-gold/30 hover:bg-sacred-gold/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
