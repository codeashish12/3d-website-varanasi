"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ScrollReveal from "@/components/ScrollReveal";

interface Delicacy {
  name: string;
  sanskrit: string;
  type: string;
  description: string;
  ingredients: string;
  hot: boolean;
  story: string;
  gradient: string;
  image: string;
}

const FOODS_DATA: Delicacy[] = [
  {
    name: "Malaiyyo",
    sanskrit: "मलइयो",
    type: "Winter Sweet",
    description: "A highly delicate, airy, milk-froth dessert infused with saffron, cardamoms, and topped with chopped pistachios and almonds.",
    ingredients: "Milk froth, saffron, cardamom, sugar, pistachios, almonds",
    hot: false,
    story: "Prepared exclusively in winter. The milk is boiled, kept under the open night sky to absorb the morning dew, and then whipped into light froth.",
    gradient: "from-amber-200/20 via-orange-400/10 to-black/80",
    image: "/images/food_malaiyyo.png"
  },
  {
    name: "Kachori Sabzi",
    sanskrit: "कचौड़ी सब्जी",
    type: "Traditional Breakfast",
    description: "Crispy, deep-fried wheat lentil pastries (kachoris) served with a spicy, aromatic potato and chickpea gravy.",
    ingredients: "Lentils, wheat flour, potatoes, chickpeas, asafoetida, local spices",
    hot: true,
    story: "The quintessential morning meal in Benares, often eaten hot on a leaf plate (pattral) in narrow alleys.",
    gradient: "from-[#FF9933]/30 via-amber-700/10 to-black/80",
    image: "/images/food_kachori.png"
  },
  {
    name: "Tamatar Chaat",
    sanskrit: "टमाटर चाट",
    type: "Savory Street Food",
    description: "A spicy, tangy street delicacy made of mashed boiled tomatoes, potatoes, ginger, green chilies, and topped with sugar syrup.",
    ingredients: "Tomatoes, potatoes, ginger, ghee, sugar syrup, spices, sev",
    hot: true,
    story: "Unique to Varanasi, this chaat is cooked on a massive iron skillet (tawa) and served hot in clay cups (kulhads).",
    gradient: "from-red-500/20 via-orange-500/15 to-black/80",
    image: "/images/food_kachori.png"
  },
  {
    name: "Banarasi Paan",
    sanskrit: "बनारसी पान",
    type: "Royal Digestif",
    description: "A betel leaf bundle enclosing areca nuts, slaked lime, catechu, gulkand (sweet rose petals), and cardamoms.",
    ingredients: "Betel leaf, gulkand, cardamoms, cloves, sweet fennel, areca nut",
    hot: false,
    story: "Immortalized in Bollywood songs, this legendary digestif is folded in a special triangular shape and melted in the mouth.",
    gradient: "from-emerald-500/20 via-green-600/10 to-black/80",
    image: "/images/food_paan.png"
  },
  {
    name: "Rabri Jalebi",
    sanskrit: "रबड़ी जलेबी",
    type: "Indulgent Dessert",
    description: "Spiral, crispy, fermented batter-fried rings soaked in sugar syrup, paired with thick, condensed, caramelized milk cream.",
    ingredients: "Fermented flour batter, sugar syrup, condensed milk cream, saffron",
    hot: true,
    story: "The contrasting texture of hot, crispy, syrup-leaking jalebi with chilled, thick, creamy rabri is pure heaven.",
    gradient: "from-[#D4AF37]/35 via-yellow-950/15 to-black/80",
    image: "/images/food_malaiyyo.png"
  },
  {
    name: "Thandai",
    sanskrit: "ठंडाई",
    type: "Spiritual Brew",
    description: "A chilled, creamy milk beverage blended with a paste of almonds, fennel seeds, watermelon seeds, rose petals, and cardamoms.",
    ingredients: "Milk, almonds, poppy seeds, fennel seeds, black pepper, saffron, rosewater",
    hot: false,
    story: "Served as a sacred offering to Lord Shiva. Frequently enjoyed during Mahashivratri and Holi.",
    gradient: "from-blue-400/25 via-indigo-950/15 to-black/80",
    image: "/images/food_paan.png"
  }
];

export default function Food() {
  const { mode, playBell } = useTheme();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="food"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#0B132B" : "#EAE5D9"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
              Gastronomy
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
              The Banarasi Feast
            </h2>
            <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
            <p className="text-sm text-text-primary/75 max-w-xl mx-auto mt-4 font-light leading-relaxed">
              Savor the flavors of Benares, where street food is a form of worship and sweet creams are prepared under the winter moon.
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOODS_DATA.map((food, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <ScrollReveal key={food.name} direction="up" delay={idx * 0.12} duration={0.7}>
                <div
                  onMouseEnter={() => {
                    playBell();
                    setHoveredIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group relative h-[340px] w-full rounded-2xl overflow-hidden border border-border-gold/30 flex flex-col justify-between p-6 shadow-xl hover:shadow-[0_0_30px_rgba(255,153,51,0.2)] transition-all duration-300 cursor-pointer text-left"
                >
                  {/* Real Photographic Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                    style={{
                      backgroundImage: `url('${food.image}')`
                    }}
                  />
                  
                  {/* Dark gradient overlay to ensure text readability - fades on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black/75 group-hover:via-black/20 z-0 transition-all duration-500 pointer-events-none" />

                  {/* Gradient tint overlay for artistic color pop */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${food.gradient} opacity-20 z-0 pointer-events-none`} />

                  {food.hot && isHovered && (
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                      <div className="absolute bottom-16 left-1/4 w-[2px] h-[50px] bg-white/20 blur-[2px] rounded-full steam-particle" style={{ animationDelay: "0s" }} />
                      <div className="absolute bottom-16 left-1/2 w-[2px] h-[55px] bg-white/20 blur-[2px] rounded-full steam-particle" style={{ animationDelay: "1s" }} />
                      <div className="absolute bottom-16 right-1/4 w-[2px] h-[48px] bg-white/20 blur-[2px] rounded-full steam-particle" style={{ animationDelay: "2s" }} />
                    </div>
                  )}

                  <div className="z-10 flex justify-between items-start relative">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/60">
                      {food.type}
                    </span>
                    <span className="text-xs font-serif bg-sacred-gold/15 text-sacred-gold border border-sacred-gold/20 px-2 py-0.5 rounded">
                      {food.sanskrit}
                    </span>
                  </div>

                  <div className="z-10 mt-auto text-left relative">
                    <h3 className="text-xl font-serif text-white font-bold tracking-wider mb-2 group-hover:text-sacred-gold transition-colors">
                      {food.name}
                    </h3>
                    
                    <div className="relative overflow-hidden h-[120px]">
                      <div
                        className="absolute inset-0 flex flex-col justify-between transition-transform duration-500 ease-out"
                        style={{
                          transform: isHovered ? "translateY(-100%)" : "translateY(0%)"
                        }}
                      >
                        <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-3">
                          {food.description}
                        </p>
                        <span className="text-[10px] uppercase font-serif tracking-widest text-saffron mt-4 font-semibold block">
                          Hover to reveal story
                        </span>
                      </div>

                      <div
                        className="absolute inset-0 flex flex-col justify-between transition-transform duration-500 ease-out"
                        style={{
                          transform: isHovered ? "translateY(0%)" : "translateY(100%)"
                        }}
                      >
                        <div className="text-left">
                          <span className="text-[9px] uppercase tracking-widest text-sacred-gold font-semibold block">
                            Local Chronicle
                          </span>
                          <p className="text-[10px] text-white/70 font-light leading-relaxed mt-0.5 line-clamp-3">
                            {food.story}
                          </p>
                        </div>
                        <div className="mt-2 text-left">
                          <span className="text-[8px] uppercase tracking-widest text-white/40 block">
                            Ingredients
                          </span>
                          <p className="text-[9px] text-white/60 font-light truncate">
                            {food.ingredients}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
