"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Play, Pause, Flame, Volume2, Info } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Aarti() {
  const { mode, soundEnabled, playBell } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const synthNodesRef = useRef<{ oscillators: OscillatorNode[]; gains: GainNode[] }>({
    oscillators: [],
    gains: []
  });
  const bellTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopAartiAudio();
    };
  }, []);

  const startAartiAudio = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      analyser.connect(audioCtx.destination);

      const oscillators: OscillatorNode[] = [];
      const gains: GainNode[] = [];

      const baseFreqs = [65.4, 130.8]; 
      baseFreqs.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = "sawtooth";
        osc.frequency.value = freq;
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 150;

        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(analyser);

        osc.start();
        oscillators.push(osc);
        gains.push(gainNode);
      });

      synthNodesRef.current = { oscillators, gains };

      const triggerAartiBell = () => {
        if (audioCtx.state === "suspended") return;
        const now = audioCtx.currentTime;
        const bellFreqs = [523.25, 783.99, 1046.5];

        bellFreqs.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);

          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.12 - idx * 0.03, now + 0.005);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

          osc.connect(gainNode);
          gainNode.connect(analyser);

          osc.start(now);
          osc.stop(now + 1.5);
        });

        bellTimerRef.current = setTimeout(triggerAartiBell, 1500);
      };

      triggerAartiBell();
      setIsPlaying(true);
    } catch (e) {
      console.warn("Aarti audio init failed:", e);
    }
  };

  const stopAartiAudio = () => {
    if (bellTimerRef.current) {
      clearTimeout(bellTimerRef.current);
      bellTimerRef.current = null;
    }

    const { oscillators, gains } = synthNodesRef.current;
    oscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    synthNodesRef.current = { oscillators: [], gains: [] };

    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setIsPlaying(false);
  };

  const toggleAarti = () => {
    playBell();
    if (isPlaying) {
      stopAartiAudio();
    } else {
      startAartiAudio();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const bufferLength = analyserRef.current ? analyserRef.current.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);
    const sparks: Array<{ x: number; y: number; vy: number; vx: number; alpha: number; size: number }> = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.sin(Date.now() * 0.005 + i * 0.2) * 15 + 20;
        }
      }

      ctx.save();
      const avgAmp = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      const baseRadius = 60 + avgAmp * 0.4;

      ctx.strokeStyle = mode === "night" ? "rgba(212, 175, 55, 0.15)" : "rgba(255, 153, 51, 0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius + 30, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = mode === "night" ? "rgba(255, 153, 51, 0.1)" : "rgba(93, 173, 226, 0.08)";
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius + 60, 0, Math.PI * 2);
      ctx.stroke();

      const numBars = 48;
      for (let i = 0; i < numBars; i++) {
        const angle = (i / numBars) * Math.PI * 2;
        const val = dataArray[i % bufferLength] || 10;
        const barHeight = val * 0.35;

        const x1 = cx + Math.cos(angle) * baseRadius;
        const y1 = cy + Math.sin(angle) * baseRadius;
        const x2 = cx + Math.cos(angle) * (baseRadius + barHeight);
        const y2 = cy + Math.sin(angle) * (baseRadius + barHeight);

        ctx.strokeStyle = mode === "night" 
          ? `hsla(${(i * 5) % 40 + 35}, 80%, 60%, ${0.3 + val / 255})`
          : `hsla(${(i * 4) % 30 + 195}, 70%, 55%, ${0.25 + val / 255})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.restore();

      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#FF9933";
      ctx.fillStyle = mode === "night" ? "#D4AF37" : "#E59866";
      ctx.beginPath();
      ctx.arc(cx, cy + 10, 20, 0, Math.PI);
      ctx.fill();

      ctx.fillStyle = mode === "night" ? "#B7950B" : "#D35400";
      ctx.fillRect(cx - 3, cy + 10, 6, 25);
      ctx.beginPath();
      ctx.ellipse(cx, cy + 35, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      const flameHeight = 35 + (avgAmp * 0.15);
      const flameGrad = ctx.createRadialGradient(cx, cy - 10, 2, cx, cy - 10, 20);
      flameGrad.addColorStop(0, "#FFFFFF");
      flameGrad.addColorStop(0.3, "#FFCC00");
      flameGrad.addColorStop(0.7, "#FF5500");
      flameGrad.addColorStop(1, "transparent");

      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 25 - flameHeight * 0.5);
      ctx.bezierCurveTo(cx - 15, cy - 10, cx - 15, cy + 10, cx, cy + 10);
      ctx.bezierCurveTo(cx + 15, cy + 10, cx + 15, cy - 10, cx, cy - 25 - flameHeight * 0.5);
      ctx.fill();
      ctx.restore();

      if (Math.random() < 0.15 + (avgAmp / 400)) {
        sparks.push({
          x: cx + (Math.random() - 0.5) * 15,
          y: cy - 10,
          vy: -Math.random() * 1.5 - 0.8,
          vx: (Math.random() - 0.5) * 0.8,
          alpha: 1.0,
          size: Math.random() * 2 + 1
        });
      }

      ctx.save();
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.y += s.vy;
        s.x += s.vx;
        s.alpha -= 0.015;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 153, 51, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, mode]);

  return (
    <section
      id="aarti"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-800"
      style={{
        backgroundColor: mode === "night" ? "#050505" : "#F8F5F0"
      }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10 mix-blend-luminosity transition-opacity duration-1000"
        style={{
          backgroundImage: "url('/ganga_aarti.png')"
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Column: Visualizer */}
        <div className="flex-1 flex justify-center items-center relative">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px]">
              <canvas ref={canvasRef} className={`w-full h-full ${mode === "night" ? "mix-blend-screen" : "mix-blend-normal"}`} />
              <div className="absolute inset-0 rounded-full border border-sacred-gold/15 pointer-events-none scale-90 shadow-[0_0_50px_rgba(255,153,51,0.05)]" />
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Audio & Meditation control */}
        <div className="flex-1 flex flex-col gap-6 text-left max-w-xl">
          <ScrollReveal direction="right" delay={0.3}>
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold">
                Immersive Experience
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-text-primary tracking-wider uppercase font-bold">
                Witness The Divine Light
              </h2>
              <div className="w-16 h-[2px] bg-sacred-gold" />
              
              <p className="text-sm md:text-base text-text-primary/75 font-light leading-relaxed">
                Every evening at twilight, Kashi performs the Ganga Aarti. Young priests clad in saffron robes wave massive brass lamps in perfect synchronization, chanting Vedic hymns to offer thanks to Mother Ganga and the universe.
              </p>

              <p className="text-sm md:text-base text-text-primary/75 font-light leading-relaxed">
                Activate the experience below to listen to the synthesized meditative hum and rhythmic temple bells. Watch the flame synchronize with the soundwaves in real time.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <button
                  onClick={toggleAarti}
                  className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-sacred-gold to-saffron text-deep-black font-serif text-xs tracking-widest uppercase font-bold hover:scale-105 hover:shadow-[0_0_25px_rgba(255,153,51,0.4)] transition-all duration-300 cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={14} fill="currentColor" /> Silence Aarti
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" /> Ignite Divine Aarti
                    </>
                  )}
                </button>
                
                <div className="flex items-center gap-2 text-xs text-text-primary/50 font-light">
                  <Info size={14} className="text-saffron shrink-0" />
                  <span>Make sure your device volume is enabled.</span>
                </div>
              </div>

              {/* Interactive quote box */}
              <div className="mt-6 p-5 rounded-2xl glass-panel border border-sacred-gold/25 bg-sacred-gold/5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                  <Flame size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-serif tracking-widest text-saffron block font-semibold">
                    Kashi Ritual
                  </span>
                  <p className="text-xs text-text-primary/70 mt-1 leading-relaxed">
                    "The lamps represent the fire element, which purifying the senses, helps one offer their ego into the fire of divine consciousness."
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
