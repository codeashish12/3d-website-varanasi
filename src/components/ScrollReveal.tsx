"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  distance?: number;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 40
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = containerRef.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;

    if (direction === "left") startX = -distance;
    else if (direction === "right") startX = distance;
    else if (direction === "up") startY = distance;
    else if (direction === "down") startY = -distance;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: startX,
        y: startY
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: duration,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%", // Triggers when the top of the element is 88% down the screen
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, [direction, delay, duration, distance]);

  return <div ref={containerRef} className="w-full flex justify-center">{children}</div>;
}
