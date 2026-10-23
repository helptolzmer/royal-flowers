"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useReveal } from "@/lib/animations";
import Footer from "@/components/Footer";
import { SocialIkona, socialKafelki } from "@/components/SocialIkony";

export default function Home() {
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const [socialRef, socialVisible] = useReveal<HTMLDivElement>(0.15);
  const [glow, setGlow] = useState<number | null>(null);

  return (
    <main>
      {/* Split screen – pełna wysokość ekranu */}
      <div className="flex h-screen flex-col md:flex-row overflow-hidden">

        {/* Left – Kwiaciarnia */}
        <Link
          href="/kwiaciarnia"
          className="relative flex-1 group flex items-center justify-center overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredLeft(true)}
          onMouseLeave={() => setHoveredLeft(false)}
        >
          <img
            src="/images/kwiaciarnia/DSCF1163.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: "rgba(0,0,0,0.45)", opacity: hoveredLeft ? 0.35 : 0.45 }}
          />
          <div
            className="absolute top-20 bottom-20 right-0 w-px transition-all duration-500"
            style={{
              background: "linear-gradient(to bottom, transparent, #c9a84c, transparent)",
              opacity: hoveredLeft ? 0 : 0.4,
            }}
          />
          <div className="relative z-10 text-center px-12 animate-slide-up">
            <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-6 opacity-80">
              Royal Flowers
            </p>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light text-cream leading-none mb-4 whitespace-nowrap">
              Kwiaciarnia
            </h1>
            <div
              className="w-12 h-px bg-gold mx-auto mb-6 transition-all duration-500"
              style={{ width: hoveredLeft ? "80px" : "48px" }}
            />
            <p className="font-jost text-sm text-cream/50 tracking-wider mb-8 max-w-xs mx-auto">
              Eleganckie kompozycje na każdą okazję
            </p>
            <div
              className="inline-flex items-center gap-3 font-jost text-xs tracking-widest uppercase text-gold transition-all duration-300"
              style={{ opacity: hoveredLeft ? 1 : 0, transform: hoveredLeft ? "translateY(0)" : "translateY(8px)" }}
            >
              Odkryj realizacje <ArrowRight size={14} />
            </div>
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: "radial-gradient(ellipse at center, #c9a84c08 0%, transparent 70%)",
              opacity: hoveredLeft ? 1 : 0,
            }}
          />
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px bg-gold/20 z-10" />

        {/* Right – Kwiatomaty */}
        <Link
          href="/kwiatomaty"
          className="relative flex-1 group flex items-center justify-center overflow-hidden cursor-pointer"
          onMouseEnter={() => setHoveredRight(true)}
          onMouseLeave={() => setHoveredRight(false)}
        >
          <img
            src="/images/kwiatomat.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: "rgba(0,0,0,0.55)", opacity: hoveredRight ? 0.45 : 0.55 }}
          />
          <div className="relative z-10 text-center px-12 animate-slide-up">
            <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-6 opacity-80">
              24 / 7
            </p>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light text-cream leading-none mb-4 whitespace-nowrap">
              Kwiatomaty
            </h1>
            <div
              className="h-px bg-gold mx-auto mb-6 transition-all duration-500"
              style={{ width: hoveredRight ? "80px" : "48px" }}
            />
            <p className="font-jost text-sm text-cream/50 tracking-wider mb-8 max-w-xs mx-auto">
              Świeże kwiaty dostępne przez całą dobę
            </p>
            <div
              className="inline-flex items-center gap-3 font-jost text-xs tracking-widest uppercase text-gold transition-all duration-300"
              style={{ opacity: hoveredRight ? 1 : 0, transform: hoveredRight ? "translateY(0)" : "translateY(8px)" }}
            >
              Znajdź automat <ArrowRight size={14} />
            </div>
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background: "radial-gradient(ellipse at center, #c9a84c08 0%, transparent 70%)",
              opacity: hoveredRight ? 1 : 0,
            }}
          />
        </Link>

        {/* Bottom brand */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <p className="font-jost text-xs tracking-[0.6em] uppercase text-cream/20">
            Florystyka Premium
          </p>
        </div>
      </div>

      {/* ── Obserwuj nas ── */}
      <section className="bg-dark border-t border-gold/10 py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ease-out ${socialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
              Bądź z nami w kontakcie
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
              Obserwuj nas
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>

          <div ref={socialRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[880px] mx-auto">
            {socialKafelki.map((k, i) => (
              <div
                key={k.href}
                className={`transition-all duration-700 ease-out ${socialVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: socialVisible ? `${i * 100}ms` : "0ms" }}
              >
                <a
                  href={k.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${k.nazwa} (otwiera się w nowej karcie)`}
                  onMouseEnter={() => setGlow(i)}
                  onMouseLeave={() => setGlow(null)}
                  onFocus={() => setGlow(i)}
                  onBlur={() => setGlow(null)}
                  className="group flex aspect-square w-full max-w-[200px] mx-auto flex-col items-center justify-center gap-3 rounded-2xl overflow-hidden text-white transition-all duration-300 ease-out hover:scale-105 focus-visible:scale-105 focus-visible:outline-none"
                  style={{
                    background: k.tlo,
                    boxShadow: glow === i ? `0 0 32px 4px ${k.glow}` : "0 8px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="transition-transform duration-300 ease-out group-hover:rotate-[10deg] group-focus-visible:rotate-[10deg]">
                    <SocialIkona typ={k.ikona} className="w-10 h-10" />
                  </span>
                  <span className="font-jost text-xs px-3 text-center break-all leading-snug">{k.handle}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
