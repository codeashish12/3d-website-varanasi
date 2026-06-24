"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Compass, CreditCard, DollarSign, Hotel, Map, Sparkles, Star, Users } from "lucide-react";

interface HotelData {
  name: string;
  type: string;
  rating: number;
  price: string;
  desc: string;
  highlights: string[];
}

const hotels: HotelData[] = [
  {
    name: "BrijRama Palace Heritage Hotel",
    type: "Heritage Palace on the Ganges",
    rating: 5,
    price: "₹35,000 / Night",
    desc: "A 210-year-old sandstone fortress at Darbhanga Ghat, accessible only by boat. It features exquisite 18th-century Maratha architecture, royal high-ceiling rooms, and daily classical music recitals in the central atrium.",
    highlights: ["Riverside view", "Zero alcohol/vegetarian gourmet", "Private boat arrival", "Heritage spa"]
  },
  {
    name: "Taj Nadesar Palace",
    type: "Royal Sanctuary of Maharajas",
    rating: 5,
    price: "₹45,000 / Night",
    desc: "Set amidst 40 acres of mango orchards and jasmine fields. Built in the 19th century by the East India Company and later home to the Maharaja, it offers ultimate privacy, butler services, and vintage horse-carriage arrivals.",
    highlights: ["Maharaja suites", "Golf course", "Royal dining experience", "Private butler service"]
  },
  {
    name: "Taj Ganges Varanasi",
    type: "Modern Luxury Oasis",
    rating: 5,
    price: "₹20,000 / Night",
    desc: "A modern resort spread over 12 acres of landscaped gardens in the city's cantonment area. Ideal for travelers seeking premium modern hospitality, global cuisine, and a central swimming pool.",
    highlights: ["Spacious rooms", "Global dining", "Proximity to temples", "Fitness center"]
  }
];

interface ItineraryActivity {
  time: string;
  title: string;
  desc: string;
  costTip: string;
}

interface ItineraryDay {
  day: number;
  activities: ItineraryActivity[];
}

const itineraries: Record<string, Record<number, ItineraryDay[]>> = {
  spiritual: {
    1: [
      {
        day: 1,
        activities: [
          { time: "05:00 AM", title: "Subah-e-Banaras Rituals", desc: "Watch sunrise prayers, Vedic chants, and early classical music at Assi Ghat.", costTip: "Free (Boat optional)" },
          { time: "08:30 AM", title: "VIP Kashi Vishwanath Darshan", desc: "Walk through the golden corridors with fast-track entry for prayer rituals.", costTip: "Included in VIP plan" },
          { time: "05:30 PM", title: "Ganga Aarti from Private Boat", desc: "Experience the grand fire worship from a private cushioned boat on the river.", costTip: "VIP Boat Reservation" }
        ]
      }
    ],
    3: [
      {
        day: 1,
        activities: [
          { time: "05:00 AM", title: "Sunrise at Assi Ghat", desc: "Soak in early morning chants and yoga sessions by the river.", costTip: "Highly recommended" },
          { time: "09:00 AM", title: "Temple Corridor Walking Tour", desc: "Visit Kashi Vishwanath and Annapurna shrines with an expert guide.", costTip: "Tour guide included" },
          { time: "06:00 PM", title: "Evening Aarti at Dashashwamedh", desc: "Spectacular fire ceremony with front-row seats on a wooden platform.", costTip: "Private deck access" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "08:00 AM", title: "Sankat Mochan & Durga Temple", desc: "Visit the historical monkey temple and the red-sandstone Durga Kund temple.", costTip: "Casual dress required" },
          { time: "02:00 PM", title: "Tulsi Manas Heritage Hall", desc: "Read the entire epic of Ramayana engraved on marble walls.", costTip: "Free entry" },
          { time: "05:30 PM", title: "Death & Liberation Philosophy Walk", desc: "Private walk around Manikarnika Ghat with a local spiritual scholar.", costTip: "Respectful attire" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "05:30 AM", title: "Silent Boat Ride to Lalita Ghat", desc: "Meditation and breathing exercises on a slow-moving boat.", costTip: "Yoga guide on board" },
          { time: "11:00 AM", title: "Sarnath Buddhist Stupa", desc: "Excursion to the deer park where Lord Buddha gave his first sermon.", costTip: "30 mins drive from city" },
          { time: "07:00 PM", title: "Sitar Concert & Chanting", desc: "Private musical meditation inside a 200-year-old heritage mansion.", costTip: "BrijRama Palace guest exclusive" }
        ]
      }
    ]
  },
  luxury: {
    1: [
      {
        day: 1,
        activities: [
          { time: "05:30 AM", title: "Private Bajra Sunrise Cruise", desc: "Sail the Ganges on a private double-deck boat with a live classical flute maestro.", costTip: "Ultra-luxury selection" },
          { time: "09:30 AM", title: "Royal Butler Breakfast", desc: "Indulge in a customized heritage breakfast in the gardens of Nadesar Palace.", costTip: "Five-star dining" },
          { time: "05:30 PM", title: "VIP Aarti Platform & Royal Dinner", desc: "Exclusive platform seating at Ganga Aarti followed by dinner at BrijRama Palace.", costTip: "Pre-booked package" }
        ]
      }
    ],
    3: [
      {
        day: 1,
        activities: [
          { time: "06:00 AM", title: "Exclusive Sunrise Sailing & Flute Concert", desc: "Embark on a private wooden luxury yacht with custom catering.", costTip: "Live musicians on boat" },
          { time: "10:00 AM", title: "Fast-Track Corridor Access", desc: "Accompanied temple corridor walk with a Sanskrit scholar.", costTip: "Priority queue entry" },
          { time: "06:00 PM", title: "Varanasi from the Sky & Aarti", desc: "Sunset helicopter flight over the river Ganga followed by private Aarti platform.", costTip: "Subject to weather" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "09:00 AM", title: "Maharaja's Vintage Car Tour", desc: "Ride in the Maharaja's vintage car from Taj Nadesar Palace to Ramnagar Fort.", costTip: "Exclusionary access" },
          { time: "01:00 PM", title: "Gourmet Satvik Lunch", desc: "An organic, farm-to-table vegetarian feast cooked with local ingredients.", costTip: "Nadesar Palace chef" },
          { time: "04:00 PM", title: "Private Silk Showroom Viewing", desc: "Exquisite Banarasi sarees and brocades shown privately in a heritage Haveli.", costTip: "Purchases optional" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "08:30 AM", title: "Ayurveda Wellness & Abhyanga", desc: "A 90-minute traditional full-body rejuvenation massage with herbal oils.", costTip: "Resort Spa" },
          { time: "12:00 PM", title: "Private Helicopter to Sarnath", desc: "Visit Sarnath ruins and museum via private transfers.", costTip: "Fast transit" },
          { time: "07:30 PM", title: "Royal Banquet Dinner", desc: "Multi-course classical Banarasi dinner served in silver plates with live Kathak dance.", costTip: "Premium booking" }
        ]
      }
    ]
  }
};

export default function TravelPlanner() {
  const [activeTab, setActiveTab] = useState<"itinerary" | "hotels" | "budget">("itinerary");

  // Itinerary states
  const [days, setDays] = useState<1 | 3>(3);
  const [focus, setFocus] = useState<"spiritual" | "luxury">("spiritual");
  const selectedItinerary = itineraries[focus]?.[days] || [];

  // Budget states
  const [stayDays, setStayDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [hotelTier, setHotelTier] = useState<"modern" | "heritage" | "palace">("heritage");
  const [vipPasses, setVipPasses] = useState(true);
  const [boatTours, setBoatTours] = useState(true);

  // Budget calculations
  const hotelRates = { modern: 20000, heritage: 35000, palace: 45000 };
  const dailyAccommodation = hotelRates[hotelTier];
  const vipCost = vipPasses ? 3000 * travelers : 0;
  const boatCost = boatTours ? 5000 * travelers : 0;
  const foodAndLocalCost = 4000 * travelers * stayDays;
  const totalBudget = (dailyAccommodation * stayDays) + vipCost + boatCost + foodAndLocalCost;

  return (
    <section id="planner" className="relative py-24 md:py-32 bg-[#0B0B0B] border-t border-white/5">
      {/* Background soft gold glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-sacred-gold/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-saffron text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 block">
            Bespoke Concurrences
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-cinzel">
            Luxury Travel <span className="bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent gold-glow">Planner</span>
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Co-create your perfect pilgrimage. Access our dynamic itinerary blueprints, curated heritage suites, and real-time expense forecaster.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-4 md:gap-6 mb-12 md:mb-16">
          {[
            { id: "itinerary", label: "Smart Itinerary", icon: <Map className="w-4 h-4" /> },
            { id: "hotels", label: "Heritage Hotels", icon: <Hotel className="w-4 h-4" /> },
            { id: "budget", label: "Budget Calculator", icon: <CreditCard className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-sacred-gold to-saffron border-transparent text-deep-black shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                  : "bg-transparent border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Contents Panel */}
        <div className="glass-panel p-6 md:p-10 rounded-3xl border border-sacred-gold/15 shadow-2xl min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* 1. ITINERARY GENERATOR */}
            {activeTab === "itinerary" && (
              <motion.div
                key="itinerary-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              >
                {/* Form controls (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="pb-4 border-b border-white/5">
                    <span className="text-[10px] tracking-widest font-bold text-saffron uppercase block mb-1">
                      Itinerary Builder
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-white">
                      Select Preferences
                    </h3>
                  </div>

                  {/* Trip Duration */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                      Trip Duration
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 3].map((d) => (
                        <button
                          key={d}
                          onClick={() => setDays(d as any)}
                          className={`py-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                            days === d
                              ? "bg-sacred-gold/10 border-sacred-gold text-sacred-gold"
                              : "border-white/5 bg-deep-black/40 text-zinc-400 hover:border-white/15"
                          }`}
                        >
                          {d} {d === 1 ? "Day Quick Tour" : "Days Classic Tour"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trip Focus */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                      Travel Style
                    </label>
                    <div className="flex flex-col gap-3">
                      {[
                        { id: "spiritual", name: "Spiritual Path", desc: "Focuses on sacred temples, Ganga aarti, and ancient ashrams." },
                        { id: "luxury", name: "Ultra-Luxury", desc: "Focuses on private cruises, helicopter transits, and palace dinings." }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setFocus(item.id as any)}
                          className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            focus === item.id
                              ? "bg-saffron/10 border-saffron text-saffron"
                              : "border-white/5 bg-deep-black/40 text-zinc-400 hover:border-white/15"
                          }`}
                        >
                          <span className="text-xs font-semibold block">{item.name}</span>
                          <span className="text-[10px] text-zinc-500 font-light block mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline display (8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                  {selectedItinerary.map((dayItem, idx) => (
                    <div key={idx} className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-sacred-gold" />
                        <h4 className="font-cinzel text-lg font-bold text-white tracking-wide">
                          Day {dayItem.day} Schedule
                        </h4>
                      </div>

                      <div className="relative border-l border-sacred-gold/20 ml-2.5 pl-6 space-y-8">
                        {dayItem.activities.map((act, i) => (
                          <div key={i} className="relative">
                            {/* Dot on line */}
                            <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-saffron border border-deep-black shadow-[0_0_10px_rgba(255,153,51,0.8)]" />
                            
                            <span className="text-[10px] font-bold text-saffron uppercase tracking-widest block">
                              {act.time}
                            </span>
                            <h5 className="text-sm font-semibold text-white mt-0.5">
                              {act.title}
                            </h5>
                            <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
                              {act.desc}
                            </p>
                            <span className="inline-block text-[9px] text-sacred-gold font-medium bg-sacred-gold/5 px-2 py-0.5 rounded border border-sacred-gold/10 mt-2">
                              {act.costTip}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 2. HOTEL RECOMMENDATIONS */}
            {activeTab === "hotels" && (
              <motion.div
                key="hotels-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {hotels.map((h, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-deep-black/50 border border-white/5 hover:border-sacred-gold/25 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Stars & price */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-1">
                          {Array.from({ length: h.rating }).map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-sacred-gold text-sacred-gold" />
                          ))}
                        </div>
                        <span className="text-[10px] font-semibold text-saffron bg-saffron/5 px-2.5 py-0.5 rounded border border-saffron/15">
                          {h.price}
                        </span>
                      </div>

                      <span className="text-[10px] tracking-wider text-zinc-500 uppercase font-semibold block mb-1">
                        {h.type}
                      </span>
                      <h4 className="font-cinzel text-lg font-bold text-white mb-3">
                        {h.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                        {h.desc}
                      </p>
                    </div>

                    <div>
                      {/* Highlights */}
                      <span className="text-[9px] tracking-wider text-zinc-500 uppercase font-bold block mb-2">
                        Premium Highlights
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {h.highlights.map((high, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] text-zinc-300 bg-[#0B0B0B]/80 px-2 py-0.5 rounded border border-white/5"
                          >
                            {high}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 3. BUDGET CALCULATOR */}
            {activeTab === "budget" && (
              <motion.div
                key="budget-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              >
                {/* Sliders panel (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-[10px] tracking-widest font-bold text-saffron uppercase block mb-1">
                      Cost Calculator
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-white">
                      Adjust Trip Parameters
                    </h3>
                  </div>

                  {/* stay days slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Stay Duration</span>
                      <span className="text-white font-medium">{stayDays} Days</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={stayDays}
                      onChange={(e) => setStayDays(parseInt(e.target.value))}
                      className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-sacred-gold"
                    />
                  </div>

                  {/* travelers slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Travelers</span>
                      <span className="text-white font-medium">{travelers} {travelers === 1 ? "Person" : "People"}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      value={travelers}
                      onChange={(e) => setTravelers(parseInt(e.target.value))}
                      className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-sacred-gold"
                    />
                  </div>

                  {/* hotel class selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                      Accommodation Class
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "modern", name: "Modern Luxury", rate: "₹20K/night" },
                        { id: "heritage", name: "Heritage Palace", rate: "₹35K/night" },
                        { id: "palace", name: "Maharaja Suite", rate: "₹45K/night" }
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setHotelTier(tier.id as any)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            hotelTier === tier.id
                              ? "bg-sacred-gold/10 border-sacred-gold text-sacred-gold"
                              : "border-white/5 bg-deep-black/40 text-zinc-400 hover:border-white/15"
                          }`}
                        >
                          <span className="text-xs font-semibold block">{tier.name}</span>
                          <span className="text-[9px] text-zinc-500 font-light block mt-0.5">{tier.rate}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* add ons checkboxes */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                      Futuristic VIP Add-Ons
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-deep-black/40 cursor-pointer hover:border-white/10">
                        <input
                          type="checkbox"
                          checked={vipPasses}
                          onChange={(e) => setVipPasses(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-saffron focus:ring-saffron accent-saffron"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-zinc-300">VIP Temple Passes</span>
                          <span className="text-[9px] text-zinc-500 font-light">Skip queues • ₹3,000/head</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-deep-black/40 cursor-pointer hover:border-white/10">
                        <input
                          type="checkbox"
                          checked={boatTours}
                          onChange={(e) => setBoatTours(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-300 text-saffron focus:ring-saffron accent-saffron"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-zinc-300">Private Bajra Cruise</span>
                          <span className="text-[9px] text-zinc-500 font-light">Musicians on-board • ₹5,000/head</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Estimate output panel (5 cols) */}
                <div className="lg:col-span-5 flex items-center">
                  <div className="w-full p-8 rounded-2xl bg-deep-black/80 border border-sacred-gold/25 shadow-2xl flex flex-col justify-between h-[380px]">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-sacred-gold" />
                        <span className="text-[10px] tracking-widest font-bold text-white uppercase">
                          Luxury Package Estimate
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-xs text-zinc-500 uppercase tracking-widest block">
                          Estimated Total Cost
                        </span>
                        <div className="font-cinzel text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent">
                          ₹{totalBudget.toLocaleString("en-IN")}
                        </div>
                        <span className="text-[9px] text-zinc-500 block">
                          Approx. ${(totalBudget / 83).toFixed(0)} USD • All inclusive taxes
                        </span>
                      </div>
                    </div>

                    {/* Breakdown graphics bars */}
                    <div className="space-y-4 pt-6 border-t border-white/5">
                      <div>
                        <div className="flex justify-between text-[9px] text-zinc-400 mb-1">
                          <span>Accommodation ({stayDays} nights)</span>
                          <span>₹{(dailyAccommodation * stayDays).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sacred-gold"
                            style={{ width: `${((dailyAccommodation * stayDays) / totalBudget) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[9px] text-zinc-400 mb-1">
                          <span>VIP Activities & Cruises</span>
                          <span>₹{(vipCost + boatCost).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-saffron"
                            style={{ width: `${(((vipCost + boatCost) || 1) / totalBudget) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[9px] text-zinc-400 mb-1">
                          <span>Dining & Local Transfers</span>
                          <span>₹{foodAndLocalCost.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-600"
                            style={{ width: `${(foodAndLocalCost / totalBudget) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* CTA to book */}
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-sacred-gold to-saffron text-deep-black text-xs font-semibold tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer">
                      RESERVE WITH CONCIERGE
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
