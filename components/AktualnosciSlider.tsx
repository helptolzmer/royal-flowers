"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Aktualnosc = {
  id: string;
  tytul: string;
  opis: string;
  data: string;
  zdjecie: string;
};


export default function AktualnosciSlider({ items }: { items: Aktualnosc[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % items.length),
      5000
    );
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <div className="relative">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="min-w-full">
              <div className="grid md:grid-cols-2 border border-gold/10">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.zdjecie}
                    alt={item.tytul}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="bg-dark-800 p-8 md:p-12 flex flex-col justify-center">
                  <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-4">
                    {item.data}
                  </p>
                  <h3 className="font-cormorant text-3xl md:text-4xl font-light text-cream mb-4 leading-tight">
                    {item.tytul}
                  </h3>
                  <div className="w-8 h-px bg-gold mb-6" />
                  <p className="font-jost text-sm text-cream/60 leading-relaxed">
                    {item.opis}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow – left */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-gold/30 text-gold bg-dark/60 hover:border-gold hover:bg-gold/10 transition-all duration-300 z-10"
        aria-label="Poprzedni"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Arrow – right */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-gold/30 text-gold bg-dark/60 hover:border-gold hover:bg-gold/10 transition-all duration-300 z-10"
        aria-label="Następny"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Aktualność ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold w-6" : "bg-gold/30 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
