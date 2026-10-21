"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/animations";

// Pojawienie się bloku przy przewijaniu: fade-in + slide-up (domyślnie) lub fade-in + scale(0.95→1)
export default function Reveal({
  children,
  className = "",
  variant = "up",
  delayMs = 0,
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "scale";
  delayMs?: number;
  threshold?: number;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>(threshold);
  const ukryty = variant === "scale" ? "opacity-0 scale-95" : "opacity-0 translate-y-8";
  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : ukryty} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
