"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "night" | "day";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playBell: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("night");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Sync theme class to root HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(mode === "night" ? "dark-theme" : "light-theme");
  }, [mode]);

  // Load spiritual meditation background audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      const a = new Audio("https://assets.mixkit.co/music/preview/mixkit-spiritual-yoga-meditation-1463.mp3");
      a.loop = true;
      a.volume = 0.12; // low volume, chanting/spiritual meditation
      setAudio(a);
    }
  }, []);

  // Sync background audio playback state
  useEffect(() => {
    if (!audio) return;
    if (soundEnabled) {
      audio.play().catch((err) => console.log("Audio play deferred:", err));
    } else {
      audio.pause();
    }
  }, [soundEnabled, audio]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const toggleMode = () => {
    setMode((prev) => (prev === "night" ? "day" : "night"));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const playBell = () => {
    if (!soundEnabled) return;
    
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;
      const baseFreq = 220; // A3, nice deep resonance
      
      const harmonics = [
        { f: 1.0, a: 0.5 },   // Fundamental
        { f: 1.5, a: 0.25 },  // Quint
        { f: 2.0, a: 0.15 },  // Octave
        { f: 2.5, a: 0.08 },  // Decima
        { f: 3.0, a: 0.05 },  // Twelfth
        { f: 4.2, a: 0.03 }   // Metallic ring
      ];
      
      harmonics.forEach(({ f, a }) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq * f, now);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(a * 0.4, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + 5.0);
      });
    } catch (e) {
      console.warn("Audio Context failed:", e);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        soundEnabled,
        toggleSound,
        playBell
      }}
    >
      <div className={mode === "night" ? "dark-theme" : "light-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
