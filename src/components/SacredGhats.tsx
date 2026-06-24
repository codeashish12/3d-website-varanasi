"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Compass, Flame, Heart, Info } from "lucide-react";

interface GhatData {
  id: string;
  name: string;
  sanskrit: string;
  desc: string;
  significance: string;
  luxuryExperience: string;
  imgUrl: string;
  color: string;
}

const ghatsList: GhatData[] = [
  {
    id: "dashashwamedh",
    name: "Dashashwamedh Ghat",
    sanskrit: "दशाश्वमेध घाट",
    desc: "The heart of Varanasi, known for the spectacular nightly Ganga Aarti ceremony, where priests worship the holy river with multi-tiered brass lamps.",
    significance: "According to myth, Lord Brahma sacrificed ten horses (dasa-aswa-medha) here to welcome Lord Shiva.",
    luxuryExperience: "Exclusive VIP terrace seating overlooking the Aarti with personal guide and premium local refreshments.",
    imgUrl: "/dashashwamedh.png",
    color: "from-saffron to-amber-600",
  },
  {
    id: "assi",
    name: "Assi Ghat",
    sanskrit: "अस्सी घाट",
    desc: "Located at the confluence of the Ganga and Assi rivers, Assi Ghat is a hub of cultural life and the home of the serene Subah-e-Banaras morning rituals.",
    significance: "Believed to be where Goddess Durga threw her sword after defeating demons Shumbha-Nishumbha.",
    luxuryExperience: "Sunrise private Bajra (traditional wooden houseboat) tour with live classical flute performance and organic herbal tea.",
    imgUrl: "/assi.png",
    color: "from-sacred-gold to-yellow-600",
  },
  {
    id: "manikarnika",
    name: "Manikarnika Ghat",
    sanskrit: "मणिकर्णिका घाट",
    desc: "The sacred cremation ghat where the eternal fires have burned for thousands of years, representing the cycle of life, death, and liberation (Moksha).",
    significance: "Considered one of the oldest ghats, where Goddess Parvati's ear ornament (Manikarnika) fell into a well.",
    luxuryExperience: "Private heritage walk with a cultural historian explaining the philosophy of life, death, and liberation in Hinduism.",
    imgUrl: "/manikarnika.png",
    color: "from-red-600 to-orange-700",
  },
  {
    id: "rajendra-prasad",
    name: "Rajendra Prasad Ghat",
    sanskrit: "राजेन्द्र प्रसाद घाट",
    desc: "A spacious, clean ghat adjacent to Dashashwamedh, named after India's first president. Known for its elegant traditional umbrellas and spectacular view of the river.",
    significance: "Formerly part of Dashashwamedh, it served as a primary point for bathing and royal ceremonies.",
    luxuryExperience: "Private sunset photography masterclass with a national award-winning guide, followed by a gourmet riverside setup.",
    imgUrl: "/rajendra_prasad.png",
    color: "from-amber-500 to-yellow-700",
  },
];

function Card3D({ ghat }: { ghat: GhatData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth return to center
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Map values to degrees of rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full flex justify-center py-6" style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-sm h-[480px] rounded-3xl overflow-hidden border border-sacred-gold/15 bg-luxury-dark/30 backdrop-blur-sm cursor-pointer shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-sacred-gold/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
      >
        {/* Background Image with Parallax Scale */}
        <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out" style={{ transform: hovered ? "scale(1.1)" : "scale(1.0)" }}>
          <Image
            src={ghat.imgUrl}
            alt={ghat.name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            priority
          />
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 to-transparent" />
          <div className="absolute inset-0 bg-sacred-gold/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* 3D Content Layout */}
        <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between" style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
          
          {/* Top Row: Sanskrit & Icon */}
          <div className="flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
            <span className="font-cinzel text-xs tracking-widest text-saffron bg-[#0B0B0B]/80 px-3 py-1 rounded-full border border-saffron/20 backdrop-blur-md">
              {ghat.sanskrit}
            </span>
            <div className="p-2 rounded-full bg-deep-black/60 border border-sacred-gold/20 text-sacred-gold backdrop-blur-md">
              {ghat.id === "manikarnika" ? <Flame className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="flex flex-col gap-3" style={{ transform: "translateZ(40px)" }}>
            <h3 className="font-cinzel text-2xl md:text-3xl font-semibold text-white tracking-wide leading-tight">
              {ghat.name}
            </h3>
            
            <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              {ghat.desc}
            </p>

            {/* Expandable/Interactive Hover Segment */}
            <div className="overflow-hidden max-h-[85px] hover:max-h-[200px] transition-all duration-500 ease-in-out border-t border-white/5 pt-3 mt-1">
              <div className="flex items-start gap-2 mb-2">
                <Info className="w-3.5 h-3.5 text-sacred-gold shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-400 font-light leading-normal">
                  <strong className="text-sacred-gold font-normal">Mythology: </strong>
                  {ghat.significance}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-saffron shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-400 font-light leading-normal">
                  <strong className="text-saffron font-normal">Luxury Experience: </strong>
                  {ghat.luxuryExperience}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SacredGhats() {
  return (
    <section id="ghats" className="relative py-24 md:py-32 bg-deep-black overflow-hidden">
      {/* Subtle background golden mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-sacred-gold/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-saffron text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 block"
          >
            Spiritual Conduits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-5xl font-bold tracking-wider text-white mb-6 font-cinzel"
          >
            The Sacred <span className="bg-gradient-to-r from-sacred-gold to-saffron bg-clip-text text-transparent gold-glow">Ghats</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="h-[1px] w-24 bg-gradient-to-r from-transparent via-sacred-gold to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed"
          >
            Varanasi is anchored by its stone ghats, where steps descend into the sacred river Ganga. Each ghat holds an eternal pulse of prayers, stories, and cosmic energy.
          </motion.p>
        </div>

        {/* 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {ghatsList.map((ghat, index) => (
            <motion.div
              key={ghat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <Card3D ghat={ghat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
