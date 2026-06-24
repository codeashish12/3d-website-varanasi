"use client";

import React, { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Ghats", href: "#ghats" },
    { name: "Experiences", href: "#experiences" },
    { name: "Temples", href: "#temples" },
    { name: "Hidden Gems", href: "#hidden-gems" },
    { name: "Food", href: "#food" },
    { name: "Planner", href: "#planner" },
    { name: "Virtual Tour", href: "#virtual-tour" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-deep-black/75 backdrop-blur-md border-b border-sacred-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, "#hero")}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-sacred-gold/30 bg-luxury-dark/40 overflow-hidden">
            <Compass className="w-5 h-5 text-sacred-gold group-hover:text-saffron transition-all duration-500 group-hover:rotate-45" />
            <div className="absolute inset-0 bg-gradient-to-tr from-sacred-gold/0 to-sacred-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg md:text-xl font-bold tracking-[0.15em] bg-gradient-to-r from-sacred-gold via-sacred-gold-light to-saffron bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300">
              MYSTIC
            </span>
            <span className="font-cinzel text-[9px] tracking-[0.35em] text-saffron uppercase -mt-1">
              Varanasi
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="relative py-1 text-sm font-medium tracking-wider text-foreground/80 hover:text-sacred-gold transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-sacred-gold to-saffron transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden lg:block">
          <a
            href="#planner"
            onClick={(e) => handleScrollTo(e, "#planner")}
            className="relative px-6 py-2.5 rounded-full border border-sacred-gold text-xs font-semibold tracking-widest text-sacred-gold hover:text-deep-black bg-transparent hover:bg-sacred-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            PLAN JOURNEY
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center p-2 text-foreground/90 hover:text-sacred-gold transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[73px] z-30 lg:hidden w-full h-[calc(100vh-73px)] bg-deep-black/95 backdrop-blur-xl border-t border-sacred-gold/10 transition-all duration-500 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 pb-20">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xl font-medium font-cinzel tracking-widest text-foreground hover:text-sacred-gold transition-colors duration-300"
              style={{
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#planner"
            onClick={(e) => handleScrollTo(e, "#planner")}
            className="mt-6 px-8 py-3 rounded-full border border-sacred-gold text-sm font-semibold tracking-widest text-sacred-gold hover:bg-sacred-gold hover:text-deep-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
          >
            PLAN YOUR JOURNEY
          </a>
        </div>
      </div>
    </nav>
  );
}
