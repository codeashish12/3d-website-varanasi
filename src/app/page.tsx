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
  );
}
