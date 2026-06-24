"use client";

import React, { useEffect, useRef } from "react";

interface Diya {
  x: number;
  y: number;
  baseY: number;
  size: number;
  speed: number;
  angle: number;
  waveFrequency: number;
  waveAmplitude: number;
  glowSize: number;
  flameFlicker: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export default function GangaWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize floating Diyas
    const diyas: Diya[] = [];
    const numDiyas = 8;
    for (let i = 0; i < numDiyas; i++) {
      diyas.push({
        x: Math.random() * canvas.width,
        y: 0,
        baseY: canvas.height * (0.65 + Math.random() * 0.25), // Float in lower portion
        size: Math.random() * 6 + 6, // 6 to 12px
        speed: Math.random() * 0.4 + 0.2, // Drift speed
        angle: Math.random() * Math.PI * 2,
        waveFrequency: Math.random() * 0.02 + 0.01,
        waveAmplitude: Math.random() * 8 + 4,
        glowSize: Math.random() * 15 + 15,
        flameFlicker: Math.random() * Math.PI,
      });
    }

    // Initialize rising particles
    const particles: Particle[] = [];
    const maxParticles = 40;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height * (0.5 + Math.random() * 0.5),
        size: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 0.4 - 0.2,
        vy: -(Math.random() * 0.5 + 0.2),
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "rgba(212, 175, 55, " : "rgba(255, 153, 51, ",
      });
    }

    let animationId: number;
    let time = 0;

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Deep Night Sky/Water Base Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, "#030305");      // Near pitch black sky
      skyGrad.addColorStop(0.4, "#06060c");    // Very deep indigo horizon
      skyGrad.addColorStop(0.7, "#0b0b0e");    // Water surface
      skyGrad.addColorStop(1, "#050508");      // Deep river bottom
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Moon Reflection in Water (Down the center)
      const moonX = canvas.width * 0.75; // Position moon on the right side
      const reflectionGrad = ctx.createLinearGradient(moonX - 80, 0, moonX + 80, 0);
      reflectionGrad.addColorStop(0, "rgba(212, 175, 55, 0)");
      reflectionGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.05)");
      reflectionGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = reflectionGrad;
      ctx.fillRect(moonX - 80, canvas.height * 0.35, 160, canvas.height * 0.65);

      // 3. Draw Water Waves (Layered Sinusoids)
      const waveLayers = [
        { amplitude: 14, frequency: 0.003, speed: 0.015, color: "#06060d", heightFactor: 0.58, reflectionColor: "rgba(212,175,55,0.06)" },
        { amplitude: 10, frequency: 0.005, speed: 0.02, color: "#080812", heightFactor: 0.68, reflectionColor: "rgba(255,153,51,0.04)" },
        { amplitude: 8, frequency: 0.007, speed: 0.025, color: "#0a0a18", heightFactor: 0.78, reflectionColor: "rgba(212,175,55,0.08)" },
        { amplitude: 6, frequency: 0.009, speed: 0.03, color: "#0c0d1e", heightFactor: 0.88, reflectionColor: "rgba(255,153,51,0.06)" }
      ];

      waveLayers.forEach((wave, idx) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Map the wave curve
        for (let x = 0; x <= canvas.width; x += 10) {
          const waveHeight = Math.sin(x * wave.frequency + time * wave.speed * 100) * wave.amplitude;
          const y = canvas.height * wave.heightFactor + waveHeight;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        // Draw golden reflections on wave peaks
        ctx.strokeStyle = wave.reflectionColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 25) {
          // Only show reflection near the moon column
          const distToMoon = Math.abs(x - moonX);
          if (distToMoon < 250) {
            const factor = (250 - distToMoon) / 250;
            const waveHeight = Math.sin(x * wave.frequency + time * wave.speed * 100) * wave.amplitude;
            const y = canvas.height * wave.heightFactor + waveHeight;
            
            // Draw small horizontal dashes representing wave crest glints
            ctx.moveTo(x - 15 * factor, y);
            ctx.lineTo(x + 15 * factor, y);
          }
        }
        ctx.stroke();
      });

      // 4. Update and Draw Particles (Embers/Prayers rising)
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.1; // gentle sway

        // Wrap around boundaries
        if (p.y < canvas.height * 0.4) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.alpha = Math.random() * 0.5 + 0.1;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color.includes("212") ? "#D4AF37" : "#FF9933";
        ctx.fill();
        ctx.restore();
      });

      // 5. Update and Draw Floating Diyas
      diyas.forEach((diya) => {
        // Drift slowly to the left
        diya.x -= diya.speed;
        if (diya.x < -40) {
          diya.x = canvas.width + 40;
          diya.baseY = canvas.height * (0.65 + Math.random() * 0.25);
        }

        // Bob up and down on wave
        diya.angle += diya.waveFrequency;
        // Find height based on waves at the diya's position
        // Approximate height using the 3rd wave layer
        const waveIndex = 2;
        const wave = waveLayers[waveIndex];
        const waveHeight = Math.sin(diya.x * wave.frequency + time * wave.speed * 100) * wave.amplitude;
        diya.y = diya.baseY + waveHeight + Math.sin(diya.angle) * 3;

        // Flicker flame
        diya.flameFlicker += 0.15;
        const currentFlicker = Math.sin(diya.flameFlicker) * 1.5;

        ctx.save();
        
        // A. Draw Flame Aura / Soft Glow
        const aura = ctx.createRadialGradient(diya.x, diya.y - diya.size, 1, diya.x, diya.y - diya.size, diya.glowSize + currentFlicker);
        aura.addColorStop(0, "rgba(255, 153, 51, 0.5)"); // Saffron core
        aura.addColorStop(0.4, "rgba(212, 175, 55, 0.2)"); // Golden mid
        aura.addColorStop(1, "rgba(212, 175, 55, 0)"); // Fading edge
        ctx.beginPath();
        ctx.arc(diya.x, diya.y - diya.size, diya.glowSize + currentFlicker, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.fill();

        // B. Draw Flame
        ctx.beginPath();
        const fX = diya.x;
        const fY = diya.y - diya.size;
        const fH = diya.size * 1.4 + currentFlicker * 0.4;
        const fW = diya.size * 0.65;
        
        ctx.moveTo(fX, fY - fH);
        ctx.bezierCurveTo(fX + fW, fY - fH/3, fX + fW, fY + fH/3, fX, fY + fH/2);
        ctx.bezierCurveTo(fX - fW, fY + fH/3, fX - fW, fY - fH/3, fX, fY - fH);
        ctx.closePath();
        
        const flameGrad = ctx.createLinearGradient(fX, fY - fH, fX, fY + fH/2);
        flameGrad.addColorStop(0, "#FFFFD0"); // bright tip
        flameGrad.addColorStop(0.4, "#FFD700"); // gold
        flameGrad.addColorStop(0.7, "#FF8C00"); // orange
        flameGrad.addColorStop(1, "#FF3300"); // red base
        ctx.fillStyle = flameGrad;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#FF8C00";
        ctx.fill();

        // C. Draw Clay Diya Base
        ctx.beginPath();
        ctx.moveTo(diya.x - diya.size, diya.y);
        ctx.quadraticCurveTo(diya.x, diya.y + diya.size * 0.8, diya.x + diya.size, diya.y);
        ctx.quadraticCurveTo(diya.x + diya.size * 1.2, diya.y - diya.size * 0.2, diya.x, diya.y - diya.size * 0.1);
        ctx.quadraticCurveTo(diya.x - diya.size * 1.2, diya.y - diya.size * 0.2, diya.x - diya.size, diya.y);
        ctx.closePath();

        const clayGrad = ctx.createLinearGradient(diya.x - diya.size, diya.y, diya.x + diya.size, diya.y + diya.size * 0.5);
        clayGrad.addColorStop(0, "#5C3A21"); // Burnt umber
        clayGrad.addColorStop(0.5, "#D4AF37"); // Gold reflection
        clayGrad.addColorStop(1, "#3A2212");
        ctx.fillStyle = clayGrad;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
