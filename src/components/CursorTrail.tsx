"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const { mode } = useTheme();

  useEffect(() => {
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
      mouseRef.current.active = true;
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Spawn particles on movement
      const dist = Math.hypot(
        mouseRef.current.x - mouseRef.current.lastX,
        mouseRef.current.y - mouseRef.current.lastY
      );

      if (dist > 2) {
        const count = Math.min(Math.floor(dist / 4) + 1, 5);
        for (let i = 0; i < count; i++) {
          const t = i / count;
          const px = mouseRef.current.lastX + (mouseRef.current.x - mouseRef.current.lastX) * t;
          const py = mouseRef.current.lastY + (mouseRef.current.y - mouseRef.current.lastY) * t;
          
          particlesRef.current.push({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 1.5 - 0.5, // Float upwards
            alpha: 1.0,
            size: Math.random() * 3 + 1,
            color: mode === "night" 
              ? (Math.random() > 0.4 ? "#D4AF37" : "#FF9933") // Gold and Saffron
              : (Math.random() > 0.4 ? "#5DADE2" : "#FF9933") // Ganga Blue and Saffron
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015; // Slow fade
        p.size *= 0.98;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        // Drawing glowing spark
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, "#FFFFFF");
        grad.addColorStop(0.3, p.color);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw custom diya cursor if active
      if (mouseRef.current.active) {
        ctx.save();
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Draw soft golden aura
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, 25);
        aura.addColorStop(0, mode === "night" ? "rgba(212, 175, 55, 0.3)" : "rgba(255, 153, 53, 0.25)");
        aura.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mx, my, 25, 0, Math.PI * 2);
        ctx.fill();

        // Draw Diya Bowl
        ctx.beginPath();
        ctx.strokeStyle = mode === "night" ? "#D4AF37" : "#FF9933";
        ctx.lineWidth = 1.5;
        // Drawing a stylized half-circle bowl
        ctx.arc(mx, my + 4, 6, 0, Math.PI);
        ctx.stroke();

        // Draw flame
        ctx.beginPath();
        ctx.fillStyle = "#FF9933";
        ctx.moveTo(mx, my - 2);
        // Stylized flame shape
        ctx.bezierCurveTo(mx - 3, my + 2, mx - 3, my + 4, mx, my + 5);
        ctx.bezierCurveTo(mx + 3, my + 4, mx + 3, my + 2, mx, my - 2);
        ctx.fill();

        // Inner glowing core of flame
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.arc(mx, my + 3, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 ${mode === "night" ? "mix-blend-screen" : "mix-blend-normal"}`}
    />
  );
}
