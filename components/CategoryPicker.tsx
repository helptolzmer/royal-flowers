"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

// Zdjęcie kategorii z lib/products.ts (pole image) po slugu z linku /sklep/[slug]
const zdjecieKategorii = (href: string) => CATEGORIES.find((c) => href.endsWith("/" + c.slug))?.image;
const DUZA_KARTA_HREF = "/sklep/bukiety-naturalne";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const CIRCLES = [
  {
    name: "Bukiety róż",
    caption: "klasyka w luksusowym wydaniu",
    href: "/sklep/bukiety-roz",
  },
  {
    name: "Bukiety polne",
    caption: "naturalne piękno prosto z łąki",
    href: "/sklep/bukiety-polne",
  },
  {
    name: "Kompozycje pogrzebowe",
    caption: "wieńce, wiązanki i dekoracje",
    href: "/sklep/kompozycje-pogrzebowe",
  },
  {
    name: "Bukiety nowoczesne",
    caption: "kwiaty inspirowane trendami",
    href: "/sklep/bukiety-nowoczesne",
  },
  {
    name: "FlowerBoxy",
    caption: "eleganckie kompozycje pełne emocji",
    href: "/sklep/flowerboxy",
  },
  {
    name: "Naturalność",
    caption: "w nowoczesnym wydaniu",
    href: "/sklep/naturalnosc",
  },
  {
    name: "Kosze kwiatowe",
    caption: "piękne kompozycje w koszach",
    href: "/sklep/kosze-kwiatowe",
  },
];

export default function CategoryPicker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-6 md:px-16 bg-white">
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto transition-[opacity,transform] duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Nagłówek */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-jost text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
            Jakich kwiatów potrzebujesz?
          </p>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-stone-800">
            Wybierz kategorię
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-12">
          {/* Lewa kolumna — duże zdjęcie */}
          <Link
            href={DUZA_KARTA_HREF}
            className="group relative block aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-stone-200"
          >
            {zdjecieKategorii(DUZA_KARTA_HREF) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={zdjecieKategorii(DUZA_KARTA_HREF)}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-10">
              <h3 className="font-cormorant text-5xl md:text-6xl font-light text-white mb-3">
                Bukiety
              </h3>
              <Heart size={20} className="text-white/80 mb-3" fill="currentColor" />
              <p className="font-cormorant italic text-xl text-white/80">
                wyjątkowe kompozycje na każdą okazję
              </p>
            </div>
          </Link>

          {/* Prawa kolumna — siatka kółek */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10 place-items-center content-start">
            {CIRCLES.map((c, i) => {
              const zdjecie = zdjecieKategorii(c.href);
              return (
              <Link
                key={c.name}
                href={c.href}
                className={`group flex flex-col items-center ${
                  i === CIRCLES.length - 1 ? "md:col-start-2" : ""
                }`}
              >
                <div className="relative w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden bg-stone-200 shadow-md group-hover:shadow-xl group-hover:scale-105 border-2 border-transparent group-hover:border-gold transition-all duration-300 flex flex-col items-center justify-center text-center px-4">
                  {zdjecie && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={zdjecie} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                      {/* przyciemnienie — czytelność napisu na zdjęciu */}
                      <span className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/30" />
                    </>
                  )}
                  <p className={`relative font-cormorant italic text-base md:text-xl leading-tight ${zdjecie ? "text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]" : "text-stone-500"}`}>
                    {c.name}
                  </p>
                  <p className={`relative font-jost text-[8px] md:text-[10px] mt-1.5 leading-tight px-1 ${zdjecie ? "text-white/85" : "text-stone-400"}`}>
                    {c.caption}
                  </p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
