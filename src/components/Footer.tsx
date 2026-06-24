"use client";

<<<<<<< HEAD
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { mode, playBell } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    playBell();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleLinkClick = (id: string) => {
    playBell();
    const sec = document.getElementById(id);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
=======
import React from "react";
import { Compass } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
>>>>>>> ec82f9ac2e3c4bf13acc00866314c61be1d44b7f
    }
  };

  return (
<<<<<<< HEAD
    <footer
      className="relative pt-20 pb-10 px-6 border-t border-sacred-gold/20 transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#050505" : "#F8F5F0"
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Left Side: Brand */}
        <div className="lg:col-span-4 flex flex-col gap-4 text-left">
          <h3 className="text-xl font-serif text-sacred-gold font-bold tracking-[0.2em] uppercase">
            THE ETERNAL VARANASI
          </h3>
          <p className="text-xs text-text-primary/60 italic font-serif mt-1">
            "Where Time Stops And The Soul Awakens"
          </p>
          <p className="text-xs text-text-primary/70 font-light leading-relaxed mt-2 max-w-sm">
            A cinematic gateway to the spiritual capital of India. Explore ancient heritage, luxury palace lodging, and deep mystical rituals on the banks of River Ganga.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" onClick={() => playBell()} className="text-text-primary/60 hover:text-sacred-gold transition-colors" title="Instagram">
              <svg className="w-[18px] h-[18px] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" onClick={() => playBell()} className="text-text-primary/60 hover:text-sacred-gold transition-colors" title="Facebook">
              <svg className="w-[18px] h-[18px] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" onClick={() => playBell()} className="text-text-primary/60 hover:text-sacred-gold transition-colors" title="Youtube">
              <svg className="w-[18px] h-[18px] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>


        {/* Center: Navigation */}
        <div className="lg:col-span-3 flex flex-col gap-4 text-left">
          <h4 className="text-xs uppercase tracking-widest text-saffron font-bold">
            Quick Navigation
          </h4>
          <div className="w-8 h-[1px] bg-sacred-gold/40 mb-2" />
          <ul className="flex flex-col gap-2.5 text-xs text-text-primary/70 font-light">
            <li>
              <button onClick={() => handleLinkClick("about")} className="hover:text-sacred-gold transition-colors cursor-pointer">
                Chronicles (History)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("ghats")} className="hover:text-sacred-gold transition-colors cursor-pointer">
                Sacred Ghats Portal
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("aarti")} className="hover:text-sacred-gold transition-colors cursor-pointer">
                Divine Ganga Aarti
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("temples")} className="hover:text-sacred-gold transition-colors cursor-pointer">
                Sanctuary Temples
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("planner")} className="hover:text-sacred-gold transition-colors cursor-pointer">
                AI Travel Planner
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick("map")} className="hover:text-sacred-gold transition-colors cursor-pointer">
                Interactive Map
              </button>
            </li>
          </ul>
        </div>

        {/* Center-Right: Contacts */}
        <div className="lg:col-span-2 flex flex-col gap-4 text-left">
          <h4 className="text-xs uppercase tracking-widest text-saffron font-bold">
            Contact
          </h4>
          <div className="w-8 h-[1px] bg-sacred-gold/40 mb-2" />
          <ul className="flex flex-col gap-3 text-xs text-text-primary/70 font-light">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-sacred-gold shrink-0 mt-0.5" />
              <span>Nadesar Palace Compound, Varanasi, UP, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-sacred-gold shrink-0" />
              <span>+91 542 2450001</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-sacred-gold shrink-0" />
              <span>curator@eternalvaranasi.gov</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Newsletter */}
        <div className="lg:col-span-3 flex flex-col gap-4 text-left">
          <h4 className="text-xs uppercase tracking-widest text-saffron font-bold">
            Newsletter
          </h4>
          <div className="w-8 h-[1px] bg-sacred-gold/40 mb-2" />
          <p className="text-xs text-text-primary/75 font-light leading-relaxed">
            Subscribe to receive celestial warnings, festival calendars, and exclusive travel guides.
          </p>

          <form onSubmit={handleSubscribe} className="mt-2 flex gap-2 w-full">
            {subscribed ? (
              <p className="text-xs text-sacred-gold font-serif italic animate-pulse">
                Blessings sent to your inbox.
              </p>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-full border border-sacred-gold/30 bg-black/40 text-white placeholder-white/30 focus:outline-none focus:border-sacred-gold shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full border border-sacred-gold/40 bg-sacred-gold/10 text-sacred-gold hover:bg-sacred-gold hover:text-deep-black transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-text-primary/40 font-light gap-4">
        <span>© {new Date().getFullYear()} The Eternal Varanasi. Built for the Divine Soul.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-sacred-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-sacred-gold transition-colors">Terms of Pilgrimage</a>
=======
    <footer className="relative bg-deep-black border-t border-white/5 pt-16 pb-12 overflow-hidden z-10">
      {/* Background soft glow */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[300px] bg-sacred-gold/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-sacred-gold/30 bg-luxury-dark/40">
                <Compass className="w-5 h-5 text-sacred-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg font-bold tracking-[0.15em] bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent">
                  MYSTIC
                </span>
                <span className="font-cinzel text-[9px] tracking-[0.35em] text-saffron uppercase -mt-1">
                  Varanasi
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Discover the eternal heartbeat of Varanasi (Kashi), the oldest living city on Earth, where spiritual energy runs alongside the sacred flows of the Ganges. Experience timeless rituals with premium luxury concierge assistance.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-widest uppercase">
              Explore Shrines
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Sacred Ghats", href: "#ghats" },
                { name: "Spiritual Experiences", href: "#experiences" },
                { name: "Famous Temples", href: "#temples" },
                { name: "Hidden Gems", href: "#hidden-gems" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  className="text-xs text-zinc-500 hover:text-sacred-gold transition-colors duration-300 w-fit"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Planners & Maps */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-widest uppercase">
              Travel Utilities
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Food Discovery", href: "#food" },
                { name: "Luxury Itineraries", href: "#planner" },
                { name: "Virtual Mapping", href: "#virtual-tour" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  className="text-xs text-zinc-500 hover:text-sacred-gold transition-colors duration-300 w-fit"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-zinc-600 font-light text-center sm:text-left">
            © {new Date().getFullYear()} Mystic Varanasi Tourism. Concocted with ancient spirituality & futuristic luxury. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            {[
              {
                icon: (
                  <svg className="w-4 h-4 fill-current animate-diya-float" viewBox="0 0 24 24" style={{ animationDuration: "5s" }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                ),
                label: "Instagram",
                url: "#"
              },
              {
                icon: (
                  <svg className="w-4 h-4 fill-current animate-diya-float" viewBox="0 0 24 24" style={{ animationDuration: "6s" }}>
                    <path d="M23.498 6.163c-.272-1.02-1.077-1.825-2.097-2.1l-2.736-.3C15.64 3.5 12 3.5 12 3.5s-3.64 0-6.665.263l-2.736.3c-1.02.275-1.825 1.08-2.097 2.1C.263 9.188.263 12 .263 12s0 2.812.263 5.837c.272 1.02 1.077 1.825 2.097 2.1l2.736.3C8.36 20.5 12 20.5 12 20.5s3.64 0 6.665-.263l2.736-.3c1.02-.275 1.825-1.08 2.097-2.1.263-3.025.263-5.837.263-5.837s0-2.812-.263-5.837zm-14.12 7.76V10.08l6.23 2.92-6.23 2.923z" />
                  </svg>
                ),
                label: "Youtube",
                url: "#"
              },
              {
                icon: (
                  <svg className="w-4 h-4 fill-current animate-diya-float" viewBox="0 0 24 24" style={{ animationDuration: "4s" }}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                label: "Twitter",
                url: "#"
              }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                className="p-2 rounded-full border border-white/5 bg-luxury-dark/40 text-zinc-500 hover:text-sacred-gold hover:border-sacred-gold/30 hover:shadow-[0_0_10px_rgba(212,175,55,0.15)] transition-all duration-300 flex items-center justify-center"
                aria-label={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
>>>>>>> ec82f9ac2e3c4bf13acc00866314c61be1d44b7f
        </div>
      </div>
    </footer>
  );
}
