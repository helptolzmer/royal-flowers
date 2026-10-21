"use client";

import { useEffect, useCallback, useRef, type TouchEvent } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: { src: string; alt: string; kategoria?: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// Minimalna długość przesunięcia palcem (px), żeby uznać gest za swipe
const SWIPE_MIN = 50;

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Tylko wyraźnie poziomy gest
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  const current = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[100] bg-dark/90 backdrop-blur-md flex items-center justify-center animate-fade-in"
      style={{ animationDuration: "300ms" }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-cream/60 hover:text-gold transition-colors duration-200 z-10"
        onClick={onClose}
        aria-label="Zamknij"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <p className="absolute top-7 left-1/2 -translate-x-1/2 font-jost text-xs text-cream/40 tracking-widest">
        {index + 1} / {images.length}
      </p>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 text-cream/50 hover:text-gold transition-colors duration-200 z-10 p-3"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Poprzednie"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Image + podpis */}
      <figure
        className="lightbox-in max-w-[90vw] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[78vh] object-contain shadow-2xl animate-fade-in"
          style={{ borderRadius: "2px", animationDuration: "400ms" }}
        />
        <figcaption className="mt-4 text-center px-4">
          {current.kategoria && (
            <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
              {current.kategoria}
            </p>
          )}
          <p className="font-jost text-xs text-cream/50 tracking-wider">{current.alt}</p>
        </figcaption>
      </figure>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 text-cream/50 hover:text-gold transition-colors duration-200 z-10 p-3"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Następne"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
}
