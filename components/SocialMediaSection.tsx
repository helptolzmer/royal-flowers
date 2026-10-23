"use client";

import type { ReactNode } from "react";
import Script from "next/script";
import FallingPetals from "@/components/FallingPetals";
import { useReveal } from "@/lib/animations";

function IconInstagram() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

type Kafelek = {
  nazwa: string;
  handle: string;
  opis?: string;
  href: string;
  ikona: ReactNode;
  gradient: string;
};

const KAFELKI: Kafelek[] = [
  {
    nazwa: "Kwiaciarnia Royal Flowers",
    handle: "@kwiaciarnia_royal_flowers",
    href: "https://www.instagram.com/kwiaciarnia_royal_flowers/",
    ikona: <IconInstagram />,
    gradient: "linear-gradient(135deg, #140e18 0%, #3d1a45 40%, #8e2f6b 75%, #c2447a 100%)",
  },
  {
    nazwa: "Kwiatomaty Royal Flowers",
    handle: "@kwiatomaty_royalflowers",
    href: "https://www.instagram.com/kwiatomaty_royalflowers/",
    ikona: <IconInstagram />,
    gradient: "linear-gradient(135deg, #120e1c 0%, #34205e 40%, #7a3a8c 75%, #d0625e 100%)",
  },
  {
    nazwa: "Facebook",
    handle: "Royal Flowers",
    href: "https://www.facebook.com/KwiaciarniaRoyalFlowers",
    ikona: <IconFacebook />,
    gradient: "linear-gradient(135deg, #0c111e 0%, #152a55 40%, #1f4fa3 75%, #3b74d6 100%)",
  },
  {
    nazwa: "Party Renting",
    handle: "partyrenting.pl",
    opis: "Dekoracje i akcesoria na wynajem — wesela, eventy, imprezy",
    href: "https://partyrenting.pl",
    ikona: <IconGlobe />,
    gradient: "linear-gradient(135deg, #15110a 0%, #3e2c12 40%, #85602a 75%, #c9a84c 100%)",
  },
];

export default function SocialMediaSection() {
  const [headerRef, headerVisible] = useReveal<HTMLDivElement>();
  const [gridRef, gridVisible] = useReveal<HTMLDivElement>();

  return (
    <div className="relative overflow-hidden">
      <FallingPetals />

      {/* Nagłówek */}
      <section className="relative z-10 py-24 px-6 md:px-16 border-b border-gold/10">
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(ellipse at 50% 80%, #c9a84c28 0%, transparent 65%)" }}
        />
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center relative transition-all duration-1000 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-jost text-xs tracking-[0.6em] uppercase text-gold mb-6">
            Royal Flowers
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream leading-tight mb-5">
            Znajdź nas<br />
            <span className="italic">w social mediach</span>
          </h1>
          <div className="w-14 h-px bg-gold mx-auto mb-6" />
          <p className="font-jost text-base text-cream/55 leading-relaxed">
            Śledź nasze codzienne realizacje i inspiracje kwiatowe
          </p>
        </div>
      </section>

      {/* Kafelki */}
      <section className="relative z-10 py-20 px-6 md:px-16">
        <div
          ref={gridRef}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {KAFELKI.map((k, i) => (
            <div
              key={k.href}
              className={`transition-all duration-700 ease-out ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: gridVisible ? `${i * 120}ms` : "0ms" }}
            >
              <a
                href={k.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${k.nazwa} – ${k.handle} (otwiera się w nowej karcie)`}
                className="group animated-gradient relative flex flex-col items-center justify-center text-center gap-3 aspect-square rounded-2xl p-6 overflow-hidden shadow-lg shadow-black/40 ring-1 ring-white/5 transition-[transform,filter,box-shadow] duration-500 ease-out hover:scale-105 hover:brightness-125 hover:shadow-2xl focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:hover:scale-100"
                style={{ backgroundImage: k.gradient }}
              >
                <span className="icon-pulse text-white mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  {k.ikona}
                </span>
                <span className="font-cormorant text-2xl font-light text-white leading-tight">
                  {k.nazwa}
                </span>
                <span className="font-jost text-sm text-white/80 tracking-wide break-all">
                  {k.handle}
                </span>
                {k.opis && (
                  <span className="font-jost text-xs text-white/60 leading-relaxed max-w-[220px]">
                    {k.opis}
                  </span>
                )}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Feed z Instagrama (Elfsight) */}
      <section className="relative z-10 px-6 md:px-16 pb-24">
        <div className="max-w-6xl mx-auto">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-44e417c1-cde3-4911-8f7d-d977b4f17362" data-elfsight-app-lazy />
        </div>
      </section>
    </div>
  );
}
