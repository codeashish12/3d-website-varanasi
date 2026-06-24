"use client";

import React, { useState } from "react";
import { X, RefreshCw } from "lucide-react";

interface Quote {
  sanskrit: string;
  transliteration: string;
  english: string;
  source: string;
}

const QUOTES: Quote[] = [
  {
    sanskrit: "तमेव भान्तमनुभाति सर्वं तस्य भासा सर्वमिदं विभाति।",
    transliteration: "tameva bhāntamanubhāti sarvaṁ tasya bhāsā sarvamidaṁ vibhāti.",
    english: "When He shines, everything shines after Him; by His light, all this is illuminated.",
    source: "Katha Upanishad 2.2.15"
  },
  {
    sanskrit: "ऋते ज्ञानान्न मुक्तिः।",
    transliteration: "ṛte jñānānna muktiḥ.",
    english: "Liberation is not possible without spiritual wisdom.",
    source: "Ancient Upanishadic Proverb"
  },
  {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    transliteration: "karmaṇyevādhikāraste mā phaleṣu kadācana.",
    english: "Your right is to perform your duty, but never to claim its fruits.",
    source: "Bhagavad Gita 2.47"
  },
  {
    sanskrit: "काशी मरणात् मुक्तिः।",
    transliteration: "kāśī maraṇāt muktiḥ.",
    english: "In Kashi, even death is celebrated as a door to ultimate liberation.",
    source: "Skanda Purana"
  },
  {
    sanskrit: "पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते।",
    transliteration: "pūrṇamadaḥ pūrṇamidaṁ pūrṇāt pūrṇamudacyate.",
    english: "That is whole, this is whole; from wholeness, wholeness emerges.",
    source: "Isha Upanishad"
  }
];

interface QuoteGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteGenerator({ isOpen, onClose }: QuoteGeneratorProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  if (!isOpen) return null;

  const currentQuote = QUOTES[quoteIndex];

  const handleNextQuote = () => {
    setAnimating(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      setAnimating(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-sacred-gold/40 p-8 md:p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Glow corner elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-sacred-gold/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-saffron/10 rounded-full blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ivory-white/60 hover:text-sacred-gold transition-colors p-1 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Spiritual icon */}
        <div className="mx-auto mb-6 w-12 h-12 flex items-center justify-center rounded-full border border-sacred-gold/30 bg-sacred-gold/5 text-sacred-gold">
          <span className="font-serif text-lg">ॐ</span>
        </div>

        {/* Quote display */}
        <div
          className={`transition-all duration-300 min-h-[180px] flex flex-col justify-center ${
            animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-serif text-sacred-gold font-semibold tracking-wide leading-relaxed">
            {currentQuote.sanskrit}
          </h3>
          <p className="text-xs italic text-ivory-white/40 mt-3 font-mono">
            {currentQuote.transliteration}
          </p>
          <p className="text-sm md:text-base text-ivory-white/80 font-light mt-6 leading-relaxed max-w-md mx-auto">
            "{currentQuote.english}"
          </p>
          <p className="text-xs text-saffron tracking-widest uppercase mt-4 font-semibold">
            — {currentQuote.source}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNextQuote}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sacred-gold/30 bg-sacred-gold/5 text-sacred-gold hover:bg-sacred-gold hover:text-deep-black transition-all duration-300 font-serif text-xs tracking-widest uppercase cursor-pointer"
          >
            <RefreshCw size={14} className={animating ? "animate-spin" : ""} />
            Draw Verse
          </button>
        </div>
      </div>
    </div>
  );
}
