"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ArrowDown, Bell, BellOff } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FloatingDiya {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  wobbleSpeed: number;
  wobbleRange: number;
  opacity: number;
}

export default function Hero() {
  const { mode, soundEnabled, toggleSound, playBell } = useTheme();
  const [diyas, setDiyas] = useState<FloatingDiya[]>([]);
  const nextDiyaId = useRef(0);
  const riverRef = useRef<HTMLDivElement | null>(null);

  // GSAP Animation Refs
  const heroRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLSpanElement | null>(null);
  const title1Ref = useRef<HTMLHeadingElement | null>(null);
  const title2Ref = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  // Auto-spawn some initial diyas drifting on the river
  useEffect(() => {
    const initialDiyas: FloatingDiya[] = Array.from({ length: 8 }).map((_, i) => ({
      id: nextDiyaId.current++,
      x: Math.random() * 80 + 10,
      y: Math.random() * 30 + 60,
      size: Math.random() * 12 + 8,
      speed: Math.random() * 0.05 + 0.02,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleRange: Math.random() * 5 + 3,
      opacity: Math.random() * 0.5 + 0.4
    }));
    setDiyas(initialDiyas);

    const interval = setInterval(() => {
      setDiyas((prev) => {
        if (prev.length > 20) return prev;
        return [
          ...prev,
          {
            id: nextDiyaId.current++,
            x: -5,
            y: Math.random() * 25 + 65,
            size: Math.random() * 12 + 8,
            speed: Math.random() * 0.05 + 0.02,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
            wobbleRange: Math.random() * 5 + 3,
            opacity: Math.random() * 0.5 + 0.4
          }
        ];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Update diya positions
  useEffect(() => {
    let animId: number;
    const update = () => {
      setDiyas((prev) =>
        prev
          .map((diya) => ({
            ...diya,
            x: diya.x + diya.speed,
            y: diya.y + Math.sin(diya.x * diya.wobbleSpeed) * 0.02
          }))
          .filter((diya) => diya.x < 110)
      );
      animId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(animId);
  }, []);

  // GSAP Animations Effect
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Parallax Scroll Trigger on Background
    if (bgRef.current && heroRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // 2. Entrance Stagger Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial resets
    gsap.set([taglineRef.current, title1Ref.current, title2Ref.current, descRef.current, buttonsRef.current], {
      opacity: 0,
      y: 35
    });

    if (backdropRef.current) {
      tl.fromTo(backdropRef.current, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 0.95, duration: 1.6, ease: "power2.out" });
    }

    tl.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=1.0")
      .to(title1Ref.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .to(title2Ref.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .to(descRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .to(buttonsRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4");
  }, []);

  const handleRiverClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!riverRef.current) return;
    const rect = riverRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    if (clickY > 55) {
      playBell();
      setDiyas((prev) => [
        ...prev,
        {
          id: nextDiyaId.current++,
          x: clickX,
          y: clickY,
          size: Math.random() * 14 + 10,
          speed: Math.random() * 0.05 + 0.02,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleRange: Math.random() * 5 + 3,
          opacity: 0.9
        }
      ]);
    }
  };

  const handleExploreClick = () => {
    playBell();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePlanClick = () => {
    playBell();
    const plannerSection = document.getElementById("planner");
    if (plannerSection) {
      plannerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Parallax Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none transition-[background-image] duration-1000"
        style={{
          backgroundImage: mode === "night" ? "url('/hero_night.png')" : "url('/sunrise_boat.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.15)" // Slightly scaled up for parallax translation buffer
        }}
      />

      {/* Overlay to ensure readability and dynamic theme support */}
      <div 
        className={`absolute inset-0 z-0 transition-colors duration-1000 ${
          mode === "night" ? "bg-black/60" : "bg-white/40"
        }`} 
      />

      {/* Background Cinematic Video Loop (Local high-quality water flow with theme-adaptive styles) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-all duration-1000 opacity-60"
        style={{
          filter: mode === "night" 
            ? "brightness(0.3) contrast(1.1) saturate(0.8) sepia(0.2) hue-rotate(15deg)"
            : "brightness(0.85) contrast(1.0)"
        }}
      >
        <source src="/videos/hero_day.mp4" type="video/mp4" />
      </video>

      {/* Background Moon / Sun Glow (subtle backdrop glow behind the title text) */}
      <div
        ref={backdropRef}
        className={`absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[1200ms] cubic-bezier(0.25, 0.8, 0.25, 1) pointer-events-none z-0 ${
          mode === "night"
            ? "w-72 h-72 bg-gradient-to-tr from-white/10 to-ivory-white/5 shadow-[0_0_120px_rgba(255,255,255,0.15)] opacity-20 blur-2xl"
            : "w-80 h-80 bg-gradient-to-tr from-[#FF9933]/15 to-[#FFF0B3]/5 shadow-[0_0_150px_rgba(255,153,51,0.2)] opacity-20 blur-2xl"
        }`}
      />

      {/* Silhouette Flying Birds */}
      <div className="absolute top-[25%] left-[20%] pointer-events-none opacity-40">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="stroke-current text-text-primary">
          <path d="M5,15 Q15,5 25,15 Q35,5 45,15" strokeWidth="1" strokeLinecap="round" className="animate-pulse" />
          <path d="M70,25 Q78,17 86,25 Q94,17 102,25" strokeWidth="1" strokeLinecap="round" className="animate-pulse delay-700" />
        </svg>
      </div>

      {/* Floating Fog / Mist Layers */}
      <div className="absolute bottom-[20%] inset-x-0 h-32 bg-gradient-to-t from-transparent via-white/5 to-transparent blur-md pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Main Header / Text Content */}
      <div className="z-30 flex-1 flex flex-col items-center justify-center text-center px-6 mt-12 max-w-4xl mx-auto pointer-events-none">
        <span
          ref={taglineRef}
          className="text-xs md:text-sm font-serif tracking-[0.4em] uppercase text-text-secondary mb-3 font-semibold"
        >
          Where Time Stops And The Soul Awakens
        </span>
        <h2
          ref={title1Ref}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[0.15em] uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-sacred-gold to-saffron"
        >
          THE ETERNAL
        </h2>
        <h2
          ref={title2Ref}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[0.2em] uppercase leading-none mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sacred-gold to-saffron"
        >
          VARANASI
        </h2>

        <p
          ref={descRef}
          className="text-sm md:text-lg max-w-2xl font-light text-text-primary/80 mt-6 tracking-wide leading-relaxed"
        >
          Walk through timeless ghats, sacred temples, hidden alleys, and centuries of living history in the spiritual capital of India.
        </p>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="mt-10 flex flex-wrap gap-4 justify-center pointer-events-auto">
          <button
            onClick={handleExploreClick}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-sacred-gold to-saffron text-deep-black font-serif text-xs tracking-widest uppercase font-bold hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
          >
            Explore Varanasi
          </button>
          <button
            onClick={handlePlanClick}
            className="px-8 py-3.5 rounded-full border-2 border-sacred-gold bg-transparent text-sacred-gold font-serif text-xs tracking-widest uppercase font-bold hover:bg-sacred-gold hover:text-deep-black hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
          >
            Plan My Journey
          </button>
        </div>
      </div>


      {/* Clickable River Area */}
      <div
        ref={riverRef}
        onClick={handleRiverClick}
        className="absolute inset-x-0 bottom-0 h-[40%] cursor-crosshair z-20"
        title="Click on the river to release a floating diya"
      >
        {/* River Waves Silhouette SVG */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full fill-current text-deep-black/60 backdrop-blur-[2px]"
          style={{
            color: mode === "night" ? "rgba(5, 5, 5, 0.7)" : "rgba(93, 173, 226, 0.25)",
            transition: "color 1s ease"
          }}
        >
          <path
            className="wave-animation"
            d="M0,224 C280,256 560,192 840,224 C1120,256 1400,192 1680,224 L1680,320 L0,320 Z"
            opacity="0.8"
          />
          <path
            className="wave-animation"
            style={{ animationDuration: "10s", animationDirection: "reverse" }}
            d="M0,160 C240,128 480,224 720,192 C960,160 1200,224 1440,192 L1440,320 L0,320 Z"
            opacity="0.5"
          />
        </svg>

        {/* Shimmer reflections */}
        <div className="absolute inset-x-0 bottom-4 h-24 bg-gradient-to-t from-saffron/10 to-transparent pointer-events-none water-shimmer" />

        {/* Floating Diyas Render */}
        {diyas.map((diya) => (
          <div
            key={diya.id}
            className="absolute transition-all duration-300 pointer-events-none float-diya"
            style={{
              left: `${diya.x}%`,
              top: `${diya.y}%`,
              opacity: diya.opacity
            }}
          >
            <div
              className="relative rounded-full"
              style={{
                width: `${diya.size}px`,
                height: `${diya.size}px`
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-t from-saffron to-yellow-200 animate-pulse"
                style={{
                  width: `${diya.size * 0.4}px`,
                  height: `${diya.size * 0.7}px`,
                  boxShadow: "0 0 10px #FF9933"
                }}
              />
              <div
                className="absolute bottom-0 inset-x-0 rounded-b-full bg-gradient-to-b from-[#8B4513] to-[#5C2E0B]"
                style={{ height: `${diya.size * 0.4}px` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating sound toggle */}
      <div className="absolute bottom-6 left-6 z-30 flex items-center gap-2">
        <button
          onClick={() => {
            toggleSound();
            if (!soundEnabled) setTimeout(() => playBell(), 100);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-gold bg-bg-secondary/80 text-text-primary hover:text-text-secondary transition-all duration-300 font-serif text-[10px] tracking-widest uppercase cursor-pointer shadow-md backdrop-blur-md"
        >
          {soundEnabled ? (
            <>
              <Bell size={12} className="animate-swing" /> Sounds On
            </>
          ) : (
            <>
              <BellOff size={12} /> Sounds Muted
            </>
          )}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-90 animate-bounce text-text-secondary drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
        <span className="text-[10px] font-serif tracking-[0.3em] uppercase">
          Scroll Down
        </span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
