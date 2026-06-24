"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, Calendar, Wallet, Compass, Landmark, Hotel, Utensils } from "lucide-react";

interface ItineraryItem {
  time: string;
  activity: string;
  details: string;
  icon: React.ReactNode;
}

interface TravelPlan {
  hotel: string;
  tips: string;
  days: {
    title: string;
    items: ItineraryItem[];
  }[];
}

export default function AiPlanner() {
  const { mode, playBell } = useTheme();
  
  // States
  const [duration, setDuration] = useState<number>(3); // 1, 3, 5 days
  const [theme, setTheme] = useState<string>("spiritual"); // spiritual, heritage, culinary
  const [budget, setBudget] = useState<string>("luxury"); // spiritual, heritage, royal
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    playBell();
    setGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      let generatedPlan: TravelPlan = {
        hotel: "",
        tips: "",
        days: []
      };

      if (budget === "royal") {
        generatedPlan.hotel = "Taj Nadesar Palace (Royal Maharaja suite, featuring private horse-carriage arrivals)";
      } else if (budget === "luxury") {
        generatedPlan.hotel = "Brijrama Palace (A boutique heritage palace right on the ghats, accessed via boat)";
      } else {
        generatedPlan.hotel = "Alka Sanctuary (Heritage guest house on the steps of Dashashwamedh)";
      }

      generatedPlan.tips = theme === "spiritual" 
        ? "Wear modest clothing for temple visits. Attend the morning Subah-e-Banaras at Assi Ghat for quiet contemplation before crowds arrive."
        : theme === "heritage"
        ? "Carry a good camera. Start exploring the lanes of Madanpura early to see silk weavers at work."
        : "Always choose hot, freshly prepared street food. Avoid tap water, stick to clay-pot lassi (kulhad) and hot Malaiyyo.";

      // Mock day itineraries based on duration
      const dayTemplates = [
        {
          title: "Day 1: Mystic Revelations & Fire Rituals",
          items: [
            { time: "05:00 AM", activity: "Dawn River Sailing", details: "Board a private wooden boat at Assi Ghat. Watch the sunrise while listening to live classical flute music over the river currents.", icon: <Compass size={14} /> },
            { time: "09:00 AM", activity: "Kashi Vishwanath Darshan", details: "VIP entry through the golden temple corridor. Perform sacred offerings to the Jyotirlinga.", icon: <Landmark size={14} /> },
            { time: "01:30 PM", activity: "Royal Heritage Lunch", details: "Savor a traditional satvik thali cooked in pure ghee at Brijrama Palace's dining hall.", icon: <Utensils size={14} /> },
            { time: "06:00 PM", activity: "Ganga Aarti Front Row", details: "Watch the fire ritual from a private docked luxury bajra boat, enjoying hot ginger tea.", icon: <Sparkles size={14} /> }
          ]
        },
        {
          title: "Day 2: Labyrinths, Silk & Whispering Forts",
          items: [
            { time: "07:30 AM", activity: "Gali Heritage Walk", details: "Explore the labyrinth of narrow alleys behind the temples. Visit centuries-old bookstores.", icon: <Compass size={14} /> },
            { time: "11:00 AM", activity: "Silk Weaver Sanctuary", details: "Meet master weavers who create custom handloom Banarasi sarees for royalty. Watch Zari work.", icon: <Landmark size={14} /> },
            { time: "03:00 PM", activity: "Ramnagar Fort Cruise", details: "Take a boat across the river to visit the 18th-century sandstone fort and its vintage museum.", icon: <Compass size={14} /> },
            { time: "08:30 PM", activity: "Banarasi Paan Tasting", details: "Conclude the day with a legendary sweet Banarasi Paan at Chowk.", icon: <Utensils size={14} /> }
          ]
        },
        {
          title: "Day 3: Sarnath's Dhamma & Musical Heritage",
          items: [
            { time: "08:00 AM", activity: "Sarnath Excursion", details: "Explore the ancient ruins where Buddha preached his first sermon. See the Ashoka pillar.", icon: <Landmark size={14} /> },
            { time: "12:00 PM", activity: "Bharat Kala Bhavan Art", details: "Explore the grand university campus (BHU) and its vast museum of miniature paintings.", icon: <Landmark size={14} /> },
            { time: "05:00 PM", activity: "Classical Sitar Soiree", details: "Attend a private concert at a Kabir Chaura music sanctuary, celebrating the Benares Gharana.", icon: <Sparkles size={14} /> },
            { time: "08:00 PM", activity: "Culinary Feast", details: "Delight in hot Tamatar Chaat and cold Malaiyyo served in clay pots.", icon: <Utensils size={14} /> }
          ]
        }
      ];

      // Slice day templates based on duration
      generatedPlan.days = dayTemplates.slice(0, duration);
      setPlan(generatedPlan);
      setGenerating(false);
    }, 1500);
  };

  return (
    <section
      id="planner"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#050505" : "#F8F5F0"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
            Itinerary Portal
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
            AI Travel Planner
          </h2>
          <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
          <p className="text-sm text-text-primary/75 max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Co-create your mystical journey. Select your duration, travel vibe, and lodging class to generate a bespoke pilgrimage.
          </p>
        </div>

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-5 rounded-2xl glass-panel p-6 md:p-8 border border-sacred-gold/30 flex flex-col gap-6 shadow-xl">
            {/* Duration */}
            <div>
              <label className="text-xs font-serif uppercase tracking-widest text-sacred-gold block font-semibold mb-3">
                <Calendar className="inline mr-1" size={14} /> Duration of Journey
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 3, 5].map((d) => (
                  <button
                    key={d}
                    onClick={() => { playBell(); setDuration(d); }}
                    className={`py-2 text-xs font-serif border rounded-lg cursor-pointer transition-colors ${
                      duration === d
                        ? "bg-sacred-gold text-deep-black border-sacred-gold font-bold"
                        : "border-sacred-gold/30 text-text-primary hover:border-sacred-gold"
                    }`}
                  >
                    {d} {d === 1 ? "Day" : "Days"}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Vibe */}
            <div>
              <label className="text-xs font-serif uppercase tracking-widest text-sacred-gold block font-semibold mb-3">
                <Compass className="inline mr-1" size={14} /> Traveling Vibe
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "spiritual", label: "Spiritual Pilgrimage (Temples & Rituals)" },
                  { id: "heritage", label: "Heritage & Art (Crafts, Forts & Galis)" },
                  { id: "culinary", label: "Gastronomic Trail (Famous Local Feasts)" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { playBell(); setTheme(t.id); }}
                    className={`py-2.5 px-4 text-xs text-left border rounded-lg cursor-pointer transition-all ${
                      theme === t.id
                        ? "bg-sacred-gold/15 text-sacred-gold border-sacred-gold font-bold shadow-[inset_0_0_10px_rgba(212,175,55,0.15)]"
                        : "border-sacred-gold/30 text-text-primary/70 hover:border-sacred-gold"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-xs font-serif uppercase tracking-widest text-sacred-gold block font-semibold mb-3">
                <Wallet className="inline mr-1" size={14} /> Lodging Standard
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "spiritual", label: "Spiritual" },
                  { id: "luxury", label: "Palace" },
                  { id: "royal", label: "Royal" }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => { playBell(); setBudget(b.id); }}
                    className={`py-2 text-[10px] font-serif border rounded-lg cursor-pointer transition-colors ${
                      budget === b.id
                        ? "bg-sacred-gold text-deep-black border-sacred-gold font-bold"
                        : "border-sacred-gold/30 text-text-primary hover:border-sacred-gold"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-sacred-gold to-saffron text-deep-black font-serif text-xs tracking-widest uppercase font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,153,51,0.3)] transition-all duration-300 disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              {generating ? "Consulting Stars..." : "Generate Sacred Itinerary"}
            </button>
          </div>

          {/* Output Itinerary (Right) */}
          <div className="lg:col-span-7 rounded-2xl glass-panel p-6 md:p-8 border border-sacred-gold/25 shadow-xl min-h-[420px] flex flex-col justify-center">
            {generating ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-sacred-gold border-t-transparent rounded-full animate-spin" />
                <p className="text-xs font-serif tracking-widest text-sacred-gold mt-4 uppercase animate-pulse">
                  Consulting cosmic pathways...
                </p>
              </div>
            ) : plan ? (
              <div className="animate-fade-in flex flex-col gap-6 text-left">
                {/* Accommodation info */}
                <div className="p-4 rounded-xl bg-sacred-gold/5 border border-sacred-gold/25 flex gap-3">
                  <Hotel className="text-saffron shrink-0" size={16} />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-saffron block font-semibold">
                      Recommended Palace/Hotel
                    </span>
                    <p className="text-xs text-text-primary/95 mt-0.5 font-light">
                      {plan.hotel}
                    </p>
                  </div>
                </div>

                {/* Day-by-Day Activities */}
                <div className="flex flex-col gap-8 mt-2">
                  {plan.days.map((day, idx) => (
                    <div key={day.title} className="flex flex-col gap-4">
                      <h4 className="text-md font-serif text-sacred-gold tracking-wider uppercase border-b border-sacred-gold/20 pb-1.5 font-bold">
                        {day.title}
                      </h4>
                      <div className="flex flex-col gap-4 border-l border-sacred-gold/20 pl-4 ml-1">
                        {day.items.map((item, iIdx) => (
                          <div key={iIdx} className="relative flex gap-3">
                            {/* Bullet node */}
                            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-saffron border border-deep-black" />
                            <span className="text-[10px] font-mono text-saffron shrink-0 mt-0.5">
                              {item.time}
                            </span>
                            <div>
                              <strong className="text-xs text-text-primary block tracking-wide font-semibold">
                                {item.activity}
                              </strong>
                              <p className="text-[11px] text-text-primary/70 font-light mt-0.5 leading-relaxed">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className="mt-4 pt-4 border-t border-sacred-gold/10">
                  <span className="text-[9px] uppercase tracking-widest text-text-primary/40 block font-semibold">
                    Pilgrim Guide Tip
                  </span>
                  <p className="text-[11px] text-text-primary/60 italic font-light leading-relaxed mt-0.5">
                    {plan.tips}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <Compass className="mx-auto text-sacred-gold/40 animate-pulse mb-4" size={40} />
                <h4 className="text-md font-serif text-sacred-gold tracking-widest uppercase">
                  Awaiting Input
                </h4>
                <p className="text-xs text-text-primary/50 font-light max-w-xs mx-auto mt-2 leading-relaxed">
                  Select your options on the dashboard and click generate to visualize your personalized luxury Varanasi retreat.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
