"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flower2 } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";

const CARDS_PER_PAGE = 4;
const AUTOSCROLL_MS = 4500;

const NOWOSCI = getFeaturedProducts();

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function NowosciCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalPages = Math.ceil(NOWOSCI.length / CARDS_PER_PAGE);

  function goNext() {
    const el = scrollerRef.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 4) {
      el.scrollTo({ left: 0, behavior: reduced ? "auto" : "smooth" });
    } else {
      el.scrollBy({ left: el.clientWidth, behavior: reduced ? "auto" : "smooth" });
    }
  }

  function goPrev() {
    const el = scrollerRef.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    el.scrollBy({ left: -el.clientWidth, behavior: reduced ? "auto" : "smooth" });
  }

  function handleScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setActivePage(Math.round(ratio * (totalPages - 1)));
  }

  // Auto-scroll, paused on hover, disabled for reduced motion
  useEffect(() => {
    if (isPaused || prefersReducedMotion()) return;
    const interval = setInterval(goNext, AUTOSCROLL_MS);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="mt-16 md:mt-20 pb-24 px-6 md:px-16 max-w-7xl mx-auto bg-white">
      {/* Nagłówek */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-5">
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-stone-800">
            Nowości
          </h2>
          <Link
            href="/sklep"
            className="font-jost text-sm text-stone-400 hover:text-gold transition-colors duration-300"
          >
            Wszystkie nowości →
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Poprzednie produkty"
            className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:border-gold hover:text-gold transition-colors duration-300"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Następne produkty"
            className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:border-gold hover:text-gold transition-colors duration-300"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Karuzela */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth motion-reduce:scroll-auto snap-x snap-mandatory"
      >
        {NOWOSCI.map((p) => (
          <Link
            key={p.id}
            href={`/sklep/${p.categorySlug}/${p.slug}`}
            className="group snap-start shrink-0 w-[80%] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[9/16] rounded-xl overflow-hidden transition-shadow duration-300 group-hover:shadow-lg">
              <div className="absolute inset-0 bg-stone-200 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {p.variants[0]?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.variants[0].image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Flower2 className="text-stone-400" size={28} strokeWidth={1.25} />
                    <span className="font-jost text-[10px] tracking-widest uppercase text-stone-400">
                      Zdjęcie wkrótce
                    </span>
                  </div>
                )}
              </div>

              <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-700 font-jost text-xs rounded-full px-3 py-1">
                Nowość
              </span>
            </div>

            <p className="font-jost text-sm text-stone-700 mt-3 group-hover:text-gold transition-colors duration-200">
              {p.name}
            </p>
            <p className="font-jost text-base font-medium text-stone-900">
              od {p.priceFrom.toFixed(2).replace(".", ",")} zł
            </p>
          </Link>
        ))}
      </div>

      {/* Paginacja */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === activePage ? "bg-stone-800" : "bg-stone-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
