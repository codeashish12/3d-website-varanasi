<<<<<<< HEAD
"use client";

import React, { useState } from "react";
import Loader from "@/components/Loader";
import CursorTrail from "@/components/CursorTrail";
import Controls from "@/components/Controls";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Ghats from "@/components/Ghats";
import Aarti from "@/components/Aarti";
import Temples from "@/components/Temples";
import Gems from "@/components/Gems";
import Food from "@/components/Food";
import Boat from "@/components/Boat";
import Festivals from "@/components/Festivals";
import AiPlanner from "@/components/AiPlanner";
import MapSection from "@/components/Map";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import QuoteGenerator from "@/components/QuoteGenerator";
import VirtualTour from "@/components/VirtualTour";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader onFinish={() => setIsLoading(false)} />
      ) : (
        <SmoothScroll>
          <div className="relative min-h-screen flex flex-col overflow-x-hidden">
            {/* Custom Trail and Particle Canvas */}
            <CursorTrail />

            {/* Floating Controls Dashboard */}
            <Controls 
              onOpenQuote={() => setQuoteOpen(true)} 
              onOpenTour={() => setTourOpen(true)} 
            />

            {/* Page content */}
            <main className="flex-1 flex flex-col">
              <Hero />
              <About />
              <Ghats />
              <Aarti />
              <Temples />
              <Gems />
              <Food />
              <Boat />
              <Festivals />
              <AiPlanner />
              <MapSection />
              <Gallery />
              <Testimonials />
            </main>

            {/* Footer */}
            <Footer />

            {/* Modal Overlays */}
            <QuoteGenerator isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
            <VirtualTour isOpen={tourOpen} onClose={() => setTourOpen(false)} />
          </div>
        </SmoothScroll>
      )}
    </>
=======
import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SacredGhats from "@/components/SacredGhats";
import SpiritualExperiences from "@/components/SpiritualExperiences";
import FamousTemples from "@/components/FamousTemples";
import HiddenGems from "@/components/HiddenGems";
import FoodDiscovery from "@/components/FoodDiscovery";
import TravelPlanner from "@/components/TravelPlanner";
import VirtualVaranasi from "@/components/VirtualVaranasi";
import Footer from "@/components/Footer";
import AmbientAudio from "@/components/AmbientAudio";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-deep-black text-foreground flex flex-col">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Floating Ambient Synthesizer Control */}
      <AmbientAudio />

      {/* 3. Main Page Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* Hero Landing */}
        <HeroSection />

        {/* 3D Sacred Ghats Cards */}
        <SacredGhats />

        {/* Immersive Spiritual Experiences */}
        <SpiritualExperiences />

        {/* Golden Famous Temples */}
        <FamousTemples />

        {/* Alternating Parallax Hidden Gems */}
        <HiddenGems />

        {/* Interactive Food Tasting Profiles */}
        <FoodDiscovery />

        {/* Interactive Luxury Travel Planner & Budgeter */}
        <TravelPlanner />

        {/* Holographic Location Mapping */}
        <VirtualVaranasi />
      </main>

      {/* 4. Footer branding */}
      <Footer />
    </div>
>>>>>>> ec82f9ac2e3c4bf13acc00866314c61be1d44b7f
  );
}
