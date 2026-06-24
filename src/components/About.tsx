"use client";

import React, { useState } from "react";
import { Landmark, Compass, Award, ShieldAlert } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import ScrollReveal from "@/components/ScrollReveal";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fact: string;
}

export default function About() {
  const { mode, playBell } = useTheme();
  const [activeEvent, setActiveEvent] = useState(0);

  const events: TimelineEvent[] = [
    {
      year: "1200 BCE",
      title: "Vedic Foundations",
      description: "Originating as the city of Kashi ('The Luminous One'), Varanasi emerges as the spiritual heartland of Vedic civilization, dedicated to Lord Shiva.",
      icon: <Landmark size={18} />,
      fact: "Oldest continuously inhabited city in India, and one of the oldest in the world."
    },
    {
      year: "528 BCE",
      title: "Buddha's First Sermon",
      description: "Lord Buddha walks to nearby Sarnath, just 10km from Varanasi, to deliver his first sermon (Dhammacakkappavattana Sutta) after attaining enlightenment.",
      icon: <Compass size={18} />,
      fact: "This event established the wheel of Dharma and founded the Buddhist Sangha."
    },
    {
      year: "8th Century CE",
      title: "Adi Shankara's Arrival",
      description: "The great philosopher Adi Shankara arrives in Kashi, writing his commentaries on Upanishads and establishing the city as the center of Advaita Vedanta philosophy.",
      icon: <Award size={18} />,
      fact: "He composed the famous 'Kashi Panchakam' here, praising the city's spiritual wisdom."
    },
    {
      year: "15th-16th Century",
      title: "Mystic Poets & Saints",
      description: "The era of great saints like Kabir and Goswami Tulsidas, who translated the epic Ramayana into the local language (Awadhi) as Ramcharitmanas.",
      icon: <Landmark size={18} />,
      fact: "Kabir's poetry challenged social dogmas, writing and preaching on the banks of Ganga."
    },
    {
      year: "Modern Era",
      title: "Living Heritage",
      description: "Varanasi remains a global center of classical Indian music (Benares Gharana), silk weaving, and spiritual pilgrimage, retaining its ancient rituals unchanged.",
      icon: <Compass size={18} />,
      fact: "Granted UNESCO City of Music status, celebrating its rich oral and musical traditions."
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#050505" : "#F8F5F0"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade" duration={1.0}>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
              History & Mythology
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
              3,000 Years of Light
            </h2>
            <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* Alternate Grid: Intro text & Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Cinematic text */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl md:text-3xl font-serif text-sacred-gold tracking-wide leading-snug">
                  "Older than history, older than tradition, older even than legend..."
                </h3>
                <p className="text-sm md:text-base text-text-primary/75 font-light leading-relaxed">
                  Mark Twain famously remarked that Varanasi is older than history. Known as Kashi or Banaras, it is the city of Lord Shiva, who is believed to hold the city on the tip of his trident.
                </p>
                <p className="text-sm md:text-base text-text-primary/75 font-light leading-relaxed">
                  To walk its ghats is to step outside of linear time. Every stone, every temple bell, and the perpetual flow of the Ganges tell a story of liberation (Moksha) and the eternal connection between the human soul and the cosmos.
                </p>

                {/* Floating wisdom card */}
                <div className="p-5 rounded-xl border border-sacred-gold/20 bg-sacred-gold/5 flex gap-4 mt-4">
                  <ShieldAlert className="text-saffron shrink-0 mt-1" size={20} />
                  <div>
                    <span className="text-xs uppercase font-serif tracking-widest text-saffron block font-semibold">
                      Spiritual Fact
                    </span>
                    <p className="text-xs text-text-primary/80 mt-1 leading-relaxed">
                      In Hindu cosmology, Varanasi is not situated on the physical earth, but rather exists as a spiritual crossing point (Tirth) where the veil between the material world and the divine is thinnest.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Column 2: Timeline Museum Component */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 items-stretch">
            <ScrollReveal direction="right" delay={0.3}>
              <div className="flex flex-col md:flex-row gap-6 items-stretch w-full">
                {/* Left timeline line nodes */}
                <div className="flex md:flex-col justify-between items-center md:items-start relative py-2 md:py-6 border-b md:border-b-0 md:border-r border-sacred-gold/20 shrink-0 md:w-36 gap-2">
                  {events.map((event, idx) => (
                    <button
                      key={event.year}
                      onClick={() => {
                        playBell();
                        setActiveEvent(idx);
                      }}
                      className={`relative flex items-center md:justify-between w-full text-left py-2 px-3 transition-all duration-300 rounded-lg group cursor-pointer ${
                        activeEvent === idx
                          ? "text-sacred-gold bg-sacred-gold/5"
                          : "text-text-primary/40 hover:text-text-primary/80"
                      }`}
                    >
                      <span className="text-xs md:text-sm font-serif font-bold tracking-widest">
                        {event.year}
                      </span>
                      <div
                        className={`hidden md:block absolute right-0 translate-x-1/2 w-3 h-3 rounded-full border border-sacred-gold transition-all duration-300 ${
                          activeEvent === idx
                            ? "bg-saffron scale-125 shadow-[0_0_10px_#FF9933]"
                            : "bg-deep-black group-hover:bg-sacred-gold/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Right details panel */}
                <div className="flex-1 rounded-2xl glass-panel p-6 md:p-8 flex flex-col justify-between border border-sacred-gold/20 min-h-[300px]">
                  <div>
                    <div className="flex items-center gap-3 text-sacred-gold mb-3">
                      <div className="w-8 h-8 rounded-full border border-sacred-gold/30 bg-sacred-gold/5 flex items-center justify-center">
                        {events[activeEvent].icon}
                      </div>
                      <span className="text-xs uppercase tracking-widest text-saffron font-semibold">
                        {events[activeEvent].year} Event
                      </span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-serif text-text-primary font-semibold tracking-wider">
                      {events[activeEvent].title}
                    </h4>
                    <div className="w-12 h-[1px] bg-sacred-gold my-4" />
                    <p className="text-sm text-text-primary/80 font-light leading-relaxed">
                      {events[activeEvent].description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-sacred-gold/10">
                    <span className="text-[10px] uppercase tracking-widest text-sacred-gold font-semibold">
                      Historical Chronicle
                    </span>
                    <p className="text-xs text-text-primary/60 italic mt-1 font-light">
                      {events[activeEvent].fact}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
