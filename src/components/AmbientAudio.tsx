"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Drone references
  const droneOscsRef = useRef<OscillatorNode[]>([]);
  const droneGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  
  // Periodic bell timer
  const bellIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    
    // Create audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create a master volume control
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    droneGainRef.current = masterGain;

    // Create a low-pass filter to make the drone warm and deep
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(180, ctx.currentTime);
    filter.Q.setValueAtTime(1, ctx.currentTime);
    filter.connect(masterGain);
    filterRef.current = filter;

    // Create a rich drone using three detuned oscillators
    const frequencies = [65.41, 130.81, 196.0]; // C2, C3, G3
    const oscs: OscillatorNode[] = [];

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      // Waveform type
      osc.type = idx === 1 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), ctx.currentTime);
      
      const oscGain = ctx.createGain();
      // Give each oscillator a different volume
      oscGain.gain.setValueAtTime(idx === 1 ? 0.03 : 0.08, ctx.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      oscs.push(osc);
    });

    droneOscsRef.current = oscs;
  };

  const playBell = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state === "suspended") return;

    const now = ctx.currentTime;
    
    // Create oscillators for the bell harmonics
    // Golden ratio and odd harmonics create a beautiful bell timbre
    const bellFreqs = [220, 330, 440, 570, 780, 1200];
    const bellGains = [0.15, 0.08, 0.06, 0.04, 0.02, 0.01];

    bellFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      
      // Detune slightly for an organic, hand-crafted bronze feel
      osc.frequency.setValueAtTime(freq + (Math.random() * 1 - 0.5), now);

      // Bell strike has immediate attack, and long exponential decay
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(bellGains[idx] * 0.2, now + 0.01);
      
      // Decay rates vary: higher harmonics decay faster, basic bell acoustics
      const decayTime = 5 - idx * 0.6;
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.5, decayTime));

      osc.connect(oscGain);
      // Connect directly to destination bypassing drone low-pass filter
      oscGain.connect(droneGainRef.current || ctx.destination);
      
      osc.start(now);
      osc.stop(now + Math.max(0.5, decayTime) + 0.1);
    });
  };

  const togglePlayback = async () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (isPlaying) {
      // Fade out master volume
      droneGainRef.current?.gain.setValueAtTime(droneGainRef.current.gain.value, ctx.currentTime);
      droneGainRef.current?.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      
      setTimeout(() => {
        if (ctx.state === "running") {
          ctx.suspend();
        }
      }, 1300);

      if (bellIntervalRef.current) {
        clearInterval(bellIntervalRef.current);
        bellIntervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
      // Fade in master volume
      droneGainRef.current?.gain.setValueAtTime(droneGainRef.current.gain.value, ctx.currentTime);
      droneGainRef.current?.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);

      // Play immediate bell
      playBell();

      // Setup periodic bell strikes (every 12-20 seconds dynamically)
      const triggerPeriodicBell = () => {
        playBell();
        const nextTime = Math.random() * 8000 + 12000; // 12-20s
        bellIntervalRef.current = setTimeout(triggerPeriodicBell, nextTime);
      };
      
      bellIntervalRef.current = setTimeout(triggerPeriodicBell, 14000);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (bellIntervalRef.current) {
        clearInterval(bellIntervalRef.current);
      }
    };
  }, []);

  return (
    <button
      onClick={togglePlayback}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full border border-sacred-gold/40 bg-deep-black/80 text-sacred-gold hover:text-saffron hover:border-saffron/60 backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_20px_rgba(255,153,51,0.3)] group cursor-pointer"
      title={isPlaying ? "Mute Ambient Chant" : "Play Ambient Chant & Bells"}
    >
      <div className={`absolute inset-0 rounded-full border border-sacred-gold/20 scale-100 ${isPlaying ? 'animate-ping opacity-60' : 'opacity-0'}`} />
      {isPlaying ? (
        <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <VolumeX className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 opacity-70" />
      )}
    </button>
  );
}
