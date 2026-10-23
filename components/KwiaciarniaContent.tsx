"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import AktualnosciKarty from "@/components/AktualnosciKarty";
import type { Aktualnosc } from "@/lib/aktualnosci";
import JezykKwiatow from "@/components/JezykKwiatow";
import FallingPetals from "@/components/FallingPetals";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import TypedHeading from "@/components/TypedHeading";
import { prefersReducedMotion, useReveal } from "@/lib/animations";
import Footer from "@/components/Footer";

const galeria = [
  { src: "/images/kwiaciarnia/DSCF1768.jpg", alt: "Kompozycja w wazonie – róże pomarańczowe", kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/DSCF1834.jpg", alt: "Różowy bukiet z protea", kategoria: "Bukiety" },
  { src: "/images/kwiaciarnia/DSCF1861.jpg", alt: "Kolorowa kompozycja w pomarańczowym wazonie", kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/DSCF1874.jpg", alt: "Niebieskie tulipany", kategoria: "Bukiety" },
  { src: "/images/kwiaciarnia/DSCF1885.jpg", alt: "Zbliżenie niebieskich kwiatów", kategoria: "Detale" },
  { src: "/images/kwiaciarnia/DSCF1887.jpg", alt: "Kompozycja z orchideami", kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/DSCF1256.jpg", alt: "Box Royal Flowers", kategoria: "Opakowania" },
  { src: "/images/kwiaciarnia/DSCF1275.jpg", alt: "Box z zewnątrz", kategoria: "Opakowania" },
  { src: "/images/kwiaciarnia/DSCF1285.jpg", alt: "Żółta kompozycja w zielonym wazonie", kategoria: "Kompozycje" },
];

// Masonry: przeplatane proporcje między 3:4 a 4:3 (stałe, żeby SSR i klient się zgadzały)
const PROPORCJE = ["3 / 4", "4 / 3", "1 / 1", "4 / 5", "5 / 4", "3 / 4", "4 / 3", "4 / 5", "1 / 1"];

const uslugi = [
  { emoji: "💒", label: "Wesela & Śluby", desc: "Kompleksowa florystyka ślubna", href: "/wesele" },
  { emoji: "💐", label: "Bukiety", desc: "Na każdą okazję", href: "/sklep" },
  { emoji: "🕊️", label: "Wieńce", desc: "Żałobne i okolicznościowe", href: "/sklep/kompozycje-pogrzebowe" },
  { emoji: "✨", label: "Dekoracje", desc: "Eventy i biura", href: "/dekoracje-slubne" },
];

const PARALLAX_MAX = 50;

// Zdjęcie hero przesuwa się wolniej niż strona — maks. 50px
function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY * 0.3, PARALLAX_MAX);
      if (ref.current) ref.current.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div ref={ref} className="absolute -top-[50px] inset-x-0 bottom-0 will-change-transform">
      {children}
    </div>
  );
}

function UslugaItem({ u, index, visible }: { u: (typeof uslugi)[number]; index: number; visible: boolean }) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      <Link
        href={u.href}
        className="group flex h-full flex-col items-center text-center rounded-xl border border-[rgba(212,168,67,0.15)] bg-white/[0.03] p-4 sm:p-6 transition-all duration-300 ease-out hover:border-[#D4A843] hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(212,168,67,0.1)] focus-visible:outline-none focus-visible:border-[#D4A843] focus-visible:shadow-[0_0_15px_rgba(212,168,67,0.1)]"
      >
        {/* Zewnętrzny span — podskok na hover; wewnętrzny — ciągłe "oddychanie" */}
        <span className="mb-3 inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[5px] group-focus-visible:-translate-y-[5px]">
          <span className="breathe text-[36px] leading-none" aria-hidden="true">{u.emoji}</span>
        </span>
        <span className="font-jost text-base font-bold text-white transition-colors duration-300 group-hover:text-[#D4A843]">
          {u.label}
        </span>
        <span className="font-jost text-[13px] text-[#999] mt-1">{u.desc}</span>
      </Link>
    </div>
  );
}

function GaleriaItem({ g, index, onOpen }: { g: (typeof galeria)[number]; index: number; onOpen: () => void }) {
  const [ref, visible] = useReveal<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`break-inside-avoid mb-3 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Powiększ zdjęcie: ${g.alt}`}
        className="group relative block w-full overflow-hidden rounded-[2px] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        style={{ aspectRatio: PROPORCJE[index % PROPORCJE.length] }}
      >
        <img
          src={g.src}
          alt={g.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 group-focus-visible:bg-black/30 transition-colors duration-500 flex items-center justify-center">
          <span className="w-11 h-11 rounded-full border border-cream/70 flex items-center justify-center text-cream opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 transition-all duration-500 ease-out">
            <Search size={18} strokeWidth={1.5} />
          </span>
        </span>
      </button>
    </div>
  );
}

export default function KwiaciarniaContent({ aktualnosci }: { aktualnosci: Aktualnosc[] }) {
  const [uslugiRef, uslugiVisible] = useReveal<HTMLDivElement>(0.15);
  const [ctaRef, ctaVisible] = useReveal<HTMLDivElement>(0.3);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <main className="pt-28 min-h-screen bg-dark">
      {/* Ziarno na tle całej strony — bardzo delikatne */}
      <div aria-hidden="true" className="grain-overlay pointer-events-none fixed inset-0 z-[1]" />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <HeroParallax>
          <img
            src="/images/kwiaciarnia/DSCF1679.jpg"
            alt="Kwiaciarnia Royal Flowers – właścicielka z bukietem"
            className="w-full h-full object-cover object-center"
          />
        </HeroParallax>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-24 w-full">
          <p className="hero-in font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4" style={{ animationDelay: "200ms" }}>
            Florystyka Artystyczna
          </p>
          <h1 className="hero-in font-cormorant text-5xl md:text-7xl font-light text-cream leading-none mb-6 whitespace-nowrap">
            Kwiaciarnia
          </h1>
          <div
            className="line-grow h-px bg-gold mb-8"
            style={{ ["--line-w" as string]: "60px", animationDuration: "600ms", animationDelay: "500ms" }}
          />
          <p className="hero-in font-jost text-base text-cream/70 max-w-md leading-relaxed" style={{ animationDelay: "400ms" }}>
            Tworzymy wyjątkowe kompozycje kwiatowe, które opowiadają Twoją
            historię. Każdy bukiet to dzieło sztuki, stworzone z pasji i
            dbałości o detal.
          </p>
        </div>
      </section>

      {/* ── Usługi — kafelki ─────────────────────────────── */}
      <section className="border-y border-[rgba(212,168,67,0.15)] bg-dark-800 px-4 sm:px-6 py-10">
        <div ref={uslugiRef} className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {uslugi.map((u, i) => (
            <UslugaItem key={u.label} u={u} index={i} visible={uslugiVisible} />
          ))}
        </div>
      </section>

      {/* ── Aktualności ──────────────────────────────────── */}
      <section className="py-20 px-6 md:px-16">
        <Reveal className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">
                Co nowego
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
                Aktualności
              </h2>
            </div>
            <div className="hidden md:block w-24 h-px bg-gold/30" />
          </div>
          <AktualnosciKarty items={aktualnosci} />
        </Reveal>
      </section>

      {/* ── Język Kwiatów ────────────────────────────────── */}
      <section className="py-20 bg-dark-800 border-y border-gold/10">
        <Reveal className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">
                Symbolika
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
                Język Kwiatów
              </h2>
            </div>
            <div className="hidden md:block w-24 h-px bg-gold/30" />
          </div>
          <JezykKwiatow />
        </Reveal>
      </section>

      {/* ── Nasze Realizacje — masonry ───────────────────── */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">Portfolio</p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
                Nasze Realizacje
              </h2>
            </div>
            <div className="hidden md:block w-24 h-px bg-gold/30" />
          </div>
        </Reveal>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {galeria.map((g, i) => (
            <GaleriaItem key={g.src} g={g} index={i} onOpen={() => setLightbox(i)} />
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Link
            href="/realizacje"
            className="group inline-flex items-center gap-3 border border-gold/30 text-cream font-jost text-xs tracking-widest uppercase px-8 py-3 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Zobacz więcej realizacji
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative py-24 px-6 bg-dark-800 border-t border-gold/10 overflow-hidden">
        <FallingPetals count={4} intensity={0.65} />
        <div
          ref={ctaRef}
          className={`relative max-w-2xl mx-auto text-center transition-all duration-[800ms] ease-out ${
            ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">
            Zrealizujmy Twoje marzenie
          </p>
          <TypedHeading
            text="Gotowy na wyjątkowe zamówienie?"
            start={ctaVisible}
            className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-6 leading-tight"
          />
          <p className="font-jost text-sm text-cream/50 mb-10 leading-relaxed">
            Skontaktuj się z nami, aby omówić szczegóły Twojej kompozycji.
            Każde zlecenie traktujemy indywidualnie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zamow"
              className="inline-flex items-center justify-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light hover:scale-105 hover:shadow-[0_0_20px_rgba(212,168,67,0.3)] transition-all duration-300"
            >
              Zamów teraz <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+48694285505"
              className="inline-flex items-center justify-center gap-3 border border-gold/40 text-cream font-jost text-sm tracking-widest uppercase px-10 py-4 hover:border-[#D4A843] hover:text-[#D4A843] transition-all duration-300"
            >
              Zadzwoń do nas
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {lightbox !== null && (
        <Lightbox
          images={galeria}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((i) => (i === null ? null : (i - 1 + galeria.length) % galeria.length))}
          onNext={() => setLightbox((i) => (i === null ? null : (i + 1) % galeria.length))}
        />
      )}
    </main>
  );
}
