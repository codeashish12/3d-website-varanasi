"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Info, Heart, Award, Sparkles } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  hindi: string;
  tagline: string;
  desc: string;
  origin: string;
  ingredients: string[];
  tastingProfile: {
    sweet: number;
    spicy: number;
    tangy: number;
    richness: number;
  };
  servingStyle: string;
}

const foodList: FoodItem[] = [
  {
    id: "kachori-sabzi",
    name: "Kachori Sabzi",
    hindi: "कचौड़ी सब्जी",
    tagline: "The Traditional Morning Fuel",
    desc: "A legendary Banarasi breakfast. Golden, deep-fried crispy wheat pastries stuffed with lentils (Urad Dal) or peas, served with a highly spiced, oil-free potato curry (Sabzi) and topped with fresh coriander, mint chutney, and green chilies.",
    origin: "Evolved over centuries in the lanes of Kachori Gali as the ultimate breakfast for merchants and pilgrims.",
    ingredients: ["Wheat Flour", "Urad Dal", "Potatoes", "Hing (Asafoetida)", "Coriander", "Green Chili"],
    tastingProfile: {
      sweet: 10,
      spicy: 85,
      tangy: 50,
      richness: 75
    },
    servingStyle: "Served hot in clay bowls (Dona) with sweet jalebis on the side for the ultimate contrast."
  },
  {
    id: "tamatar-chaat",
    name: "Banarasi Tamatar Chaat",
    hindi: "टमाटर चाट",
    tagline: "A Tangy, Spicy Masterpiece",
    desc: "Unique to Varanasi, this chaat features a spicy mash of ripe tomatoes, potatoes, ginger, and green chilies, simmered in a special clay pot. It is sweetened with cumin-infused sugar syrup (Hing-Jeera Chashni) and topped with crispy sev and ghee.",
    origin: "Concocted by local spice maestros to contrast Varanasi's humid river summers with bold flavors.",
    ingredients: ["Tomatoes", "Boiled Potatoes", "Hing-Jeera Syrup", "Ghee", "Cashew Nuts", "Sev"],
    tastingProfile: {
      sweet: 45,
      spicy: 80,
      tangy: 90,
      richness: 60
    },
    servingStyle: "Served smoking hot in traditional baked clay cups (Kulhad) with a drizzle of pure cow ghee."
  },
  {
    id: "malaiyyo",
    name: "Makhan Malaiyyo",
    hindi: "मलइयो",
    tagline: "A Cloud of Sweet Dew",
    desc: "A mystical winter dessert. Milk is boiled, cooled, and left on open terraces overnight to absorb the morning dew. It is then vigorously whisked in clay pots under the winter sky to create a light-as-air foam, flavored with saffron, cardamom, and pistachios.",
    origin: "A Persian-influenced royal winter sweet crafted exclusively during the misty months of November to February.",
    ingredients: ["Milk Foam", "Dew Drops", "Kesar (Saffron)", "Cardamom", "Pistachios", "Almonds"],
    tastingProfile: {
      sweet: 70,
      spicy: 5,
      tangy: 0,
      richness: 80
    },
    servingStyle: "Served chilled in earthen pots, garnished with silver leaf (Vark) and crushed dry fruit."
  },
  {
    id: "banarasi-paan",
    name: "Banarasi Paan",
    hindi: "बनारसी पान",
    tagline: "The Royal Digester",
    desc: "Famous worldwide, this is a betel leaf preparation containing lime, catechu, gulkand (rose petal preserve), grated coconut, fennel seeds, and cardamoms. It is folded into a triangular shape and placed whole into the mouth.",
    origin: "Lauded in Bollywood and ancient Indian literature as a symbol of hospitality, royal courtesy, and digestion.",
    ingredients: ["Betel Leaf", "Gulkand", "Catechu (Katha)", "Cardamom", "Fennel Seeds", "Areca Nut"],
    tastingProfile: {
      sweet: 60,
      spicy: 20,
      tangy: 35,
      richness: 40
    },
    servingStyle: "Presented folded inside silver leaf, held together with a single clove, eaten in one bite."
  }
];

export default function FoodDiscovery() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeFood = foodList[selectedIdx];

  return (
    <section id="food" className="relative py-24 md:py-32 bg-deep-black border-t border-white/5">
      {/* Saffron fire glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-saffron/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-saffron text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 block">
            Culinary Alchemy
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-cinzel">
            Food <span className="bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent gold-glow">Discovery</span>
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mx-auto mt-4 mb-6" />
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Unravel the taste layers of Varanasi. From fiery street chaats to dew-kissed winter clouds, culinary art here is a spiritual offering of flavors.
          </p>
        </div>

        {/* Interactive Food Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left panel: Food Menu Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {foodList.map((food, idx) => (
              <button
                key={food.id}
                onClick={() => setSelectedIdx(idx)}
                className={`relative w-full text-left p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col justify-between h-[120px] ${
                  selectedIdx === idx
                    ? "bg-luxury-dark/80 border-saffron/40 shadow-[0_4px_25px_rgba(255,153,51,0.08)]"
                    : "bg-transparent border-white/5 hover:border-white/15"
                }`}
              >
                {selectedIdx === idx && (
                  <motion.div
                    layoutId="active-food-indicator"
                    className="absolute left-0 top-1/4 w-[3px] h-1/2 bg-saffron rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="flex justify-between items-start w-full">
                  <div>
                    <span className="text-[10px] tracking-wider text-zinc-500 font-medium uppercase mb-1 block">
                      {food.hindi}
                    </span>
                    <h3 className={`font-cinzel text-lg md:text-xl font-bold transition-colors duration-300 ${
                      selectedIdx === idx ? "text-white" : "text-zinc-400"
                    }`}>
                      {food.name}
                    </h3>
                  </div>
                  <Flame className={`w-4 h-4 shrink-0 mt-1 transition-colors duration-300 ${
                    selectedIdx === idx ? "text-saffron" : "text-zinc-600"
                  }`} />
                </div>
                <p className="text-xs text-zinc-500 font-light truncate w-full">
                  {food.tagline}
                </p>
              </button>
            ))}
          </div>

          {/* Right panel: Deep Dive Showcase (7 cols) */}
          <div className="lg:col-span-7 flex">
            <div className="w-full rounded-3xl p-8 md:p-10 glass-panel border border-sacred-gold/15 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                  <div>
                    <span className="text-xs font-semibold tracking-widest text-saffron uppercase block mb-1">
                      {activeFood.tagline}
                    </span>
                    <h3 className="font-cinzel text-3xl font-bold text-white tracking-wide">
                      {activeFood.name}
                    </h3>
                  </div>
                  <div className="bg-saffron/10 border border-saffron/20 text-saffron px-3.5 py-1 rounded-full text-xs font-cinzel">
                    {activeFood.hindi}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-8">
                  {activeFood.desc}
                </p>

                {/* Interactive Tasting Gauges */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-sacred-gold" />
                    <span className="text-[10px] tracking-widest font-bold text-white uppercase">
                      Tasting Profile & Notes
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {/* Sweetness Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span className="font-medium">Sweetness</span>
                        <span>{activeFood.tastingProfile.sweet}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeFood.tastingProfile.sweet}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-sacred-gold rounded-full"
                        />
                      </div>
                    </div>

                    {/* Spiciness Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span className="font-medium">Spiciness</span>
                        <span>{activeFood.tastingProfile.spicy}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeFood.tastingProfile.spicy}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-saffron rounded-full"
                        />
                      </div>
                    </div>

                    {/* Tanginess Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span className="font-medium">Tanginess</span>
                        <span>{activeFood.tastingProfile.tangy}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeFood.tastingProfile.tangy}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-amber-600 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Richness Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span className="font-medium">Richness / Ghee</span>
                        <span>{activeFood.tastingProfile.richness}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeFood.tastingProfile.richness}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-yellow-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ingredients tag cloud */}
                <div className="mb-6">
                  <span className="text-[10px] tracking-wider text-zinc-500 uppercase font-semibold block mb-2">
                    Key Ingredients
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeFood.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] text-zinc-300 bg-deep-black/60 border border-white/5 px-2.5 py-1 rounded-md"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer card metrics: Origin & Serving Style */}
              <div className="border-t border-white/5 pt-6 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-sacred-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] tracking-wider text-zinc-500 uppercase font-bold">
                      Historical Lore
                    </span>
                    <p className="text-[10px] text-zinc-400 font-light leading-snug mt-0.5">
                      {activeFood.origin}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Heart className="w-4 h-4 text-saffron shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] tracking-wider text-zinc-500 uppercase font-bold">
                      Luxury Presentation
                    </span>
                    <p className="text-[10px] text-zinc-400 font-light leading-snug mt-0.5">
                      {activeFood.servingStyle}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
