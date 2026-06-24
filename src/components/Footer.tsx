"use client";

import React from "react";
import { Compass } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
        </div>
      </div>
    </footer>
  );
}
