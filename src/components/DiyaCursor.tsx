"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  decay: number;
}

export default function DiyaCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect touch device or small screen
    const checkMobile = () => {
      const mobile =
        window.matchMedia("(max-width: 768px)").matches ||
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initial positioning
    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;
    mouseRef.current.targetX = mouseRef.current.x;
    mouseRef.current.targetY = mouseRef.current.y;

    let animationFrameId: number;

    const addParticle = (x: number, y: number) => {
      const colors = [
        "rgba(255, 153, 51, ",  // Saffron
        "rgba(212, 175, 55, ",  // Gold
        "rgba(255, 99, 71, ",   // Tomato/Deep Saffron
        "rgba(255, 215, 0, ",   // Yellow Gold
      ];
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      
      particlesRef.current.push({
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        vx: (Math.random() * 1.5 - 0.75),
        vy: -(Math.random() * 2 + 0.5), // Float upwards
        size: Math.random() * 3 + 1.5,
        alpha: 0.9,
        color: baseColor,
        decay: Math.random() * 0.02 + 0.015,
      });
    };

    const drawLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      // Lerp mouse movement for buttery smoothness
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Spawn embers if mouse moves
      const dist = Math.hypot(mouse.targetX - mouse.x, mouse.targetY - mouse.y);
      if (dist > 1 || Math.random() < 0.25) {
        addParticle(mouse.x, mouse.y - 12); // Spawn near flame peak
      }

      // Draw embers / particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        // Bloom/glow filter for embers
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color.replace(", ", ")");
        ctx.fill();
        ctx.restore();
      }

      // Draw Diya / Flame follow representation
      const x = mouse.x;
      const y = mouse.y;

      ctx.save();
      
      // 1. Draw Outer Golden Aura (Glow)
      const auraGrad = ctx.createRadialGradient(x, y - 8, 2, x, y - 8, 30);
      auraGrad.addColorStop(0, "rgba(255, 153, 51, 0.4)");
      auraGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.15)");
      auraGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.beginPath();
      ctx.arc(x, y - 8, 30, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // 2. Draw Flame (tear drop shape)
      const flameHeight = 15;
      const flameWidth = 8;
      
      ctx.beginPath();
      ctx.moveTo(x, y - 8 - flameHeight); // Tip
      ctx.bezierCurveTo(
        x + flameWidth, y - 8 - flameHeight/3,
        x + flameWidth, y - 8 + flameHeight/3,
        x, y - 8 + flameHeight/2
      );
      ctx.bezierCurveTo(
        x - flameWidth, y - 8 + flameHeight/3,
        x - flameWidth, y - 8 - flameHeight/3,
        x, y - 8 - flameHeight
      );
      
      const flameGrad = ctx.createLinearGradient(x, y - 8 - flameHeight, x, y - 8 + flameHeight/2);
      flameGrad.addColorStop(0, "#FFCC00"); // Yellow tip
      flameGrad.addColorStop(0.5, "#FF9933"); // Saffron mid
      flameGrad.addColorStop(1, "#FF3300"); // Red base
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#FF9933";
      ctx.fillStyle = flameGrad;
      ctx.fill();

      // 3. Draw Little Diya Base (oil lamp shape)
      ctx.beginPath();
      // Draw standard clay pot curve
      ctx.moveTo(x - 10, y + 2);
      ctx.quadraticCurveTo(x, y + 10, x + 10, y + 2);
      ctx.quadraticCurveTo(x + 12, y - 1, x, y - 1);
      ctx.quadraticCurveTo(x - 12, y - 1, x - 10, y + 2);
      
      const clayGrad = ctx.createLinearGradient(x - 10, y, x + 10, y + 6);
      clayGrad.addColorStop(0, "#8B5A2B"); // Dark bronze/clay
      clayGrad.addColorStop(0.5, "#D4AF37"); // Golden highlight
      clayGrad.addColorStop(1, "#5C3A21");
      
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.fillStyle = clayGrad;
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
