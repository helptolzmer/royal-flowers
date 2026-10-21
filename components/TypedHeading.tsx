"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/animations";

// Nagłówek z efektem pisania (litera po literze + migający kursor).
// Startuje, gdy `start` = true; `onDone` wywołuje się po wypisaniu całego tekstu.
export default function TypedHeading({
  text,
  start,
  onDone,
  className = "",
  speedMs = 55,
  as: Tag = "h2",
}: {
  text: string;
  start: boolean;
  onDone?: () => void;
  className?: string;
  speedMs?: number;
  // "span" — gdy pisany tekst jest tylko częścią większego nagłówka
  as?: "h2" | "span";
}) {
  const [count, setCount] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setCount(text.length);
      return;
    }
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speedMs);
    return () => window.clearInterval(id);
  }, [start, text, speedMs]);

  useEffect(() => {
    if (start && count === text.length) onDoneRef.current?.();
  }, [start, count, text.length]);

  return (
    <Tag className={className} aria-label={Tag === "h2" ? text : undefined}>
      {Tag === "span" && <span className="sr-only">{text}</span>}
      {/* Niewidoczny pełny tekst trzyma miejsce, żeby nic nie skakało */}
      <span aria-hidden="true" className="relative inline-block">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0 text-left">
          {text.slice(0, count)}
          <span className="typing-caret inline-block w-px h-[0.85em] bg-gold align-middle ml-1" />
        </span>
      </span>
    </Tag>
  );
}
