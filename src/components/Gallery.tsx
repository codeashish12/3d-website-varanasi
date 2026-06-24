"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { X, ZoomIn, Eye } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "ghats" | "temples" | "festivals" | "food" | "culture";
  description: string;
  quote: string;
  gradient: string;
  aspect: string; // for masonry: aspect-square, aspect-video, aspect-[3/4] etc
  image: string;
}

const ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Twilight on Assi",
    category: "ghats",
    description: "The serene silhouette of Assi Ghat as morning candles drift on the calm Ganges currents.",
    quote: "Kashi is the door to the infinite.",
    gradient: "from-[#0B132B] via-[#D4AF37]/20 to-[#FF9933]/30",
    aspect: "h-[240px]",
    image: "/images/ghat_assi.png"
  },
  {
    id: "g2",
    title: "Golden Dome",
    category: "temples",
    description: "Spire of Kashi Vishwanath, reflecting the sacred energy of Lord Shiva in gold plating.",
    quote: "By His light, everything is illuminated.",
    gradient: "from-[#D4AF37]/40 via-yellow-950/20 to-black",
    aspect: "h-[320px]",
    image: "/images/temple_kashi.png"
  },
  {
    id: "g3",
    title: "Aarti Conflagration",
    category: "festivals",
    description: "Multi-tiered brass fire lamps lit by priests during the sunset Dev Deepawali festival.",
    quote: "Offer your soul to the eternal flame.",
    gradient: "from-[#FF9933] via-red-950/40 to-black",
    aspect: "h-[200px]",
    image: "/ganga_aarti.png"
  },
  {
    id: "g4",
    title: "Saffron Froth",
    category: "food",
    description: "Sweet winter Malaiyyo foam served in earthen kulhads, decorated with gold leaves.",
    quote: "Sweetness born under the dew drops.",
    gradient: "from-amber-200/35 via-orange-400/10 to-black",
    aspect: "h-[280px]",
    image: "/images/food_malaiyyo.png"
  },
  {
    id: "g5",
    title: "Vedic Chants at Dawn",
    category: "culture",
    description: "Young Brahmin students performing group morning prayers on the riverbanks.",
    quote: "The vibration of ancient sounds.",
    gradient: "from-blue-900/30 via-[#D4AF37]/15 to-[#FF9933]/25",
    aspect: "h-[220px]",
    image: "/images/ghat_rajendra_prasad.png"
  },
  {
    id: "g6",
    title: "The Fire Ghat",
    category: "ghats",
    description: "Quiet eternal cremation pyres at Manikarnika Ghat, witnessing the cycle of life.",
    quote: "Life is a passing shadow; Kashi is truth.",
    gradient: "from-red-600/30 via-red-950/50 to-black",
    aspect: "h-[300px]",
    image: "/images/ghat_manikarnika.png"
  },
  {
    id: "g7",
    title: "Birla Shikhara",
    category: "temples",
    description: "The white marble tower of New Vishwanath temple rising into the morning mist.",
    quote: "Towering aspirations of modern devotion.",
    gradient: "from-teal-600/20 via-slate-900/30 to-black",
    aspect: "h-[250px]",
    image: "/images/temple_bhu.png"
  },
  {
    id: "g8",
    title: "Triangular Blessings",
    category: "food",
    description: "Fresh Banarasi Paan digestif loaded with rose jams and sweet fennel spices.",
    quote: "A burst of royal hospitality.",
    gradient: "from-emerald-400/20 via-green-950/30 to-black",
    aspect: "h-[210px]",
    image: "/images/food_paan.png"
  }
];

export default function Gallery() {
  const { mode, playBell } = useTheme();
  const [filter, setFilter] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = filter === "all" ? ITEMS : ITEMS.filter(item => item.category === filter);

  const handleFilterClick = (cat: string) => {
    playBell();
    setFilter(cat);
  };

  const handleItemClick = (item: GalleryItem) => {
    playBell();
    setActiveItem(item);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#050505" : "#F8F5F0"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
            Visual Anthology
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase mt-2 font-bold">
            The Colors of Kashi
          </h2>
          <div className="w-16 h-[2px] bg-sacred-gold mx-auto mt-4" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "ghats", "temples", "festivals", "food", "culture"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-5 py-2 rounded-full border text-[10px] font-serif tracking-widest uppercase transition-colors cursor-pointer ${
                filter === cat
                  ? "bg-sacred-gold text-deep-black border-sacred-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                  : "border-sacred-gold/30 text-text-primary/70 hover:border-sacred-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`break-inside-avoid relative w-full ${item.aspect} rounded-2xl overflow-hidden border border-border-gold/30 cursor-pointer shadow-lg group hover:border-sacred-gold/50 transition-all duration-300 text-left`}
            >
              {/* Real Photographic Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                style={{
                  backgroundImage: `url('${item.image}')`
                }}
              />
              
              {/* Dark overlay to ensure text readability - fades on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black/75 group-hover:via-black/20 z-0 transition-all duration-500 pointer-events-none" />

              {/* Gradient tint overlay for artistic color pop */}
              <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-20 z-0 pointer-events-none`} />

              {/* Hover overlay icons */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full border border-sacred-gold/40 bg-black/60 flex items-center justify-center text-sacred-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  <Eye size={18} />
                </div>
              </div>

              {/* Title label */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black via-black/45 to-transparent z-10 flex flex-col justify-end text-left">
                <span className="text-[8px] uppercase tracking-widest text-saffron font-bold">
                  {item.category}
                </span>
                <h4 className="text-sm font-serif text-white font-bold tracking-wider mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-sacred-gold/40 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[420px]">
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer z-20 p-1"
            >
              <X size={20} />
            </button>

            {/* Left side: Canvas display of colors */}
            <div className="flex-1 h-1/2 md:h-full relative flex items-center justify-center overflow-hidden">
              {/* Real Photographic Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${activeItem.image}')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/60 to-black/90 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
              
              {/* Spiritual Symbol in center */}
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-white/10 bg-white/5 pointer-events-none select-none relative z-10">
                <span className="font-serif text-5xl">ॐ</span>
              </div>
            </div>

            {/* Right side: Story & Quote */}
            <div className="flex-1 p-8 flex flex-col justify-between text-left bg-[#050505]">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-saffron font-bold block mb-1">
                  Category: {activeItem.category}
                </span>
                <h3 className="text-2xl font-serif text-sacred-gold font-bold uppercase tracking-wider">
                  {activeItem.title}
                </h3>
                <div className="w-12 h-[1px] bg-sacred-gold/30 my-4" />
                <p className="text-xs text-white/80 font-light leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="text-[8px] uppercase tracking-widest text-white/40 block">
                  Spiritual Mantra
                </span>
                <p className="text-xs text-saffron font-serif italic mt-0.5 leading-relaxed font-semibold">
                  "{activeItem.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
