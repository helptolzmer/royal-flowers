"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: Props) {
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

  return (
    <div
      className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
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

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          className="max-w-full max-h-[85vh] object-contain shadow-2xl"
          style={{ borderRadius: "2px" }}
        />
      </div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 text-cream/50 hover:text-gold transition-colors duration-200 z-10 p-3"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Następne"
      >
        <ChevronRight size={36} />
      </button>

      {/* Alt / caption */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-jost text-xs text-cream/30 tracking-wider text-center px-4">
        {images[index].alt}
      </p>
    </div>
  );
}
