"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const socialKolumny = [
  {
    tytul: "Kwiaciarnia Royal Flowers",
    linki: [
      {
        ikona: "ig" as const,
        label: "Instagram",
        handle: "@kwiaciarnia_royal_flowers",
        href: "https://www.instagram.com/kwiaciarnia_royal_flowers/",
      },
      {
        ikona: "fb" as const,
        label: "Facebook",
        handle: "KwiaciarniaRoyalFlowers",
        href: "https://www.facebook.com/KwiaciarniaRoyalFlowers",
      },
    ],
  },
  {
    tytul: "Kwiatomaty Royal Flowers",
    linki: [
      {
        ikona: "ig" as const,
        label: "Instagram",
        handle: "@kwiatomaty_royalflowers",
        href: "https://www.instagram.com/kwiatomaty_royalflowers/",
      },
    ],
  },
  {
    tytul: "Wypożyczalnia by Megi",
    linki: [
      {
        ikona: "ig" as const,
        label: "Instagram",
        handle: "@wypozyczalniabymegi",
        href: "https://www.instagram.com/wypozyczalniabymegi/",
      },
      {
        ikona: "fb" as const,
        label: "Facebook",
        handle: "Wypożyczalnia by Megi",
        href: "https://www.facebook.com/profile.php?id=61585446016344",
      },
      {
        ikona: "web" as const,
        label: "Strona www",
        handle: "partyrenting.pl",
        href: "https://partyrenting.pl",
      },
    ],
  },
];

export default function Home() {
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

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

      {/* ── Social Media ── */}
      <section className="bg-dark border-t border-gold/10 py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
              Bądź z nami w kontakcie
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
              Znajdź nas w social mediach
            </h2>
            <p className="font-jost text-sm text-cream/40 mt-3 tracking-wider">
              Obserwuj nas i bądź na bieżąco
            </p>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>

          {/* Trzy karty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {socialKolumny.map((kol) => (
              <div
                key={kol.tytul}
                className="border border-gold/15 bg-dark-800 px-8 py-10 flex flex-col items-center text-center gap-6 hover:border-gold/30 transition-colors duration-300"
              >
                <h3 className="font-cormorant text-xl font-light text-cream leading-tight">
                  {kol.tytul}
                </h3>

                <div className="w-8 h-px bg-gold/30" />

                <div className="flex flex-col gap-3 w-full">
                  {kol.linki.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 border border-gold/12 px-5 py-4 hover:border-gold/50 transition-all duration-300"
                      style={{
                        boxShadow: "0 0 0 0 #c9a84c00",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px 0 #c9a84c22";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 #c9a84c00";
                      }}
                    >
                      <span className="text-gold/70 group-hover:text-gold transition-colors duration-300">
                        {l.ikona === "ig" ? (
                          <IconInstagram />
                        ) : l.ikona === "fb" ? (
                          <IconFacebook />
                        ) : (
                          <IconGlobe />
                        )}
                      </span>
                      <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold/50 group-hover:text-gold transition-colors duration-300">
                        {l.label}
                      </span>
                      <span className="font-jost text-xs text-cream/35 group-hover:text-cream/60 transition-colors duration-300">
                        {l.handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dane kontaktowe ── */}
      <section className="bg-dark-800 border-t border-gold/10 py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
              Kontakt
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
              Dane kontaktowe
            </h2>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10">
            {[
              { label: "Firma",   value: "Małgorzata Pasiut Partyserwis Kwiaciarnia Royal Flowers" },
              { label: "NIP",     value: "7342527300" },
              { label: "Adres",   value: "Podgrodzie 416, 33-386 Podgrodzie" },
              { label: "Telefon", value: "532 688 820" },
              { label: "E-mail",  value: "kwiaciarniaroyalflowers@gmail.com" },
              { label: "Godziny", value: "Pon–Pt: 9:00–17:00  ·  Sob: 9:00–14:00" },
            ].map((row) => (
              <div key={row.label} className="bg-dark-800 px-8 py-6 flex items-center gap-6">
                <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold/50 w-20 shrink-0">
                  {row.label}
                </span>
                <span className="font-jost text-sm text-cream/75">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-6 justify-center">
            <Link
              href="/regulamin"
              className="font-jost text-xs tracking-widest uppercase text-cream/35 hover:text-gold transition-colors duration-300"
            >
              Regulamin sprzedaży
            </Link>
            <span className="text-cream/15">·</span>
            <Link
              href="/polityka-prywatnosci"
              className="font-jost text-xs tracking-widest uppercase text-cream/35 hover:text-gold transition-colors duration-300"
            >
              Polityka prywatności
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/10 bg-dark py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cormorant text-xl tracking-widest text-cream/50">
            ROYAL <span className="text-gold">FLOWERS</span>
          </p>
          <p className="font-jost text-xs text-cream/30">
            © 2026 Royal Flowers. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </main>
  );
}
