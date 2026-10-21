"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useReveal } from "@/lib/animations";

function IconInstagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconFacebook({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconGlobe({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const socialKafelki = [
  {
    ikona: "ig" as const,
    handle: "@kwiaciarnia_royal_flowers",
    nazwa: "Instagram – Kwiaciarnia Royal Flowers",
    href: "https://instagram.com/kwiaciarnia_royal_flowers",
    tlo: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
    glow: "rgba(225,48,108,0.45)",
  },
  {
    ikona: "ig" as const,
    handle: "@kwiatomaty_royalflowers",
    nazwa: "Instagram – Kwiatomaty Royal Flowers",
    href: "https://instagram.com/kwiatomaty_royalflowers",
    tlo: "linear-gradient(135deg, #F77737, #E1306C, #833AB4)",
    glow: "rgba(247,119,55,0.45)",
  },
  {
    ikona: "fb" as const,
    handle: "KwiaciarniaRoyalFlowers",
    nazwa: "Facebook – Kwiaciarnia Royal Flowers",
    href: "https://facebook.com/KwiaciarniaRoyalFlowers",
    tlo: "#1877F2",
    glow: "rgba(24,119,242,0.45)",
  },
  {
    ikona: "web" as const,
    handle: "partyrenting.pl",
    nazwa: "Party Renting – partyrenting.pl",
    href: "https://partyrenting.pl",
    tlo: "linear-gradient(135deg, #D4A843, #B8942E)",
    glow: "rgba(212,168,67,0.45)",
  },
];

const kontakt = [
  // Link do wizytówki kwiaciarni w Google Maps (ten sam co przy kwiatomacie #3)
  { ikona: "📍", tekst: "ul. Długosza 23, Nowy Sącz", href: "https://maps.app.goo.gl/qoMMwg95DWk7NCGd7", zewn: true },
  { ikona: "📞", tekst: "694 285 505", href: "tel:+48694285505" },
  { ikona: "✉️", tekst: "kwiaciarniaroyalflowers@gmail.com", href: "mailto:kwiaciarniaroyalflowers@gmail.com" },
  { ikona: "🕐", tekst: "Pon–Pt: 9:00–17:00 · Sob: 9:00–14:00" },
];

const szybkieLinki = [
  { label: "Kwiaciarnia", href: "/kwiaciarnia" },
  { label: "Sklep", href: "/sklep" },
  { label: "Kwiatomaty", href: "/kwiatomaty" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "O nas", href: "/o-nas" },
  { label: "Social Media", href: "/social-media" },
];

function SocialIkona({ typ, className }: { typ: "ig" | "fb" | "web"; className?: string }) {
  if (typ === "ig") return <IconInstagram className={className} />;
  if (typ === "fb") return <IconFacebook className={className} />;
  return <IconGlobe className={className} />;
}

export default function Home() {
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const [socialRef, socialVisible] = useReveal<HTMLDivElement>(0.15);
  const [stopkaRef, stopkaVisible] = useReveal<HTMLDivElement>(0.15);
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

      {/* ── Stopka z danymi kontaktowymi ── */}
      <footer className="bg-dark-800 border-t border-gold/10 pt-16 pb-8 px-6 md:px-16">
        <div
          ref={stopkaRef}
          className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${stopkaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12">
            {/* Kolumna 1 — marka */}
            <div>
              <p className="font-cormorant text-xl tracking-[0.25em] text-gold mb-4">ROYAL FLOWERS</p>
              <p className="font-jost text-[13px] text-[#888] leading-relaxed max-w-[280px] mb-6">
                Kwiaciarnia artystyczna w Nowym Sączu. Bukiety, dekoracje, kwiatomaty 24/7.
              </p>
              <div className="flex items-center gap-3">
                {socialKafelki
                  .filter((k) => k.ikona !== "web")
                  .map((k) => (
                    <a
                      key={k.href}
                      href={k.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${k.nazwa} (otwiera się w nowej karcie)`}
                      className="text-gold transition-transform duration-200 ease-out hover:scale-[1.15] hover:rotate-[5deg] focus-visible:scale-[1.15] focus-visible:outline-none"
                    >
                      <SocialIkona typ={k.ikona} className="w-5 h-5" />
                    </a>
                  ))}
              </div>
            </div>

            {/* Kolumna 2 — kontakt */}
            <div>
              <h3 className="font-jost text-xs tracking-[0.3em] uppercase text-cream mb-5">Kontakt</h3>
              <ul className="space-y-3.5">
                {kontakt.map((c) => (
                  <li key={c.tekst} className="flex items-start gap-3 font-jost text-sm text-[#999]">
                    <span aria-hidden="true" className="w-5 shrink-0 text-center">{c.ikona}</span>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.zewn ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="break-all transition-all duration-200 hover:text-[#D4A843] hover:translate-x-[3px]"
                      >
                        {c.tekst}
                      </a>
                    ) : (
                      <span>{c.tekst}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolumna 3 — szybkie linki */}
            <div>
              <h3 className="font-jost text-xs tracking-[0.3em] uppercase text-cream mb-5">Szybkie linki</h3>
              <ul className="space-y-3">
                {szybkieLinki.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-block font-jost text-xs uppercase tracking-[1px] text-[#888] transition-all duration-200 hover:text-[#D4A843] hover:translate-x-[3px]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dół stopki */}
          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-jost text-xs text-[#666]">
              © {new Date().getFullYear()} Royal Flowers. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/regulamin" className="font-jost text-xs text-[#666] transition-colors duration-200 hover:text-[#D4A843]">
                Regulamin sprzedaży
              </Link>
              <Link href="/polityka-prywatnosci" className="font-jost text-xs text-[#666] transition-colors duration-200 hover:text-[#D4A843]">
                Polityka prywatności
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
