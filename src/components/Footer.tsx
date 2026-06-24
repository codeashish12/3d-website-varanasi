"use client";

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
    }
  };

  return (
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
        </div>
      </div>
    </footer>
  );
}
