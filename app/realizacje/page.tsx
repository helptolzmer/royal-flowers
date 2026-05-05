"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Lightbox from "@/components/Lightbox";

const wszystkieZdjecia = [
  { src: "/images/kwiaciarnia/DSCF1155.jpg",  alt: "Właścicielka Royal Flowers – portret",         kategoria: "Zespół" },
  { src: "/images/kwiaciarnia/DSCF1163.jpg",  alt: "Właścicielka z bukietem",                       kategoria: "Zespół" },
  { src: "/images/kwiaciarnia/DSCF1210.jpg",  alt: "Właścicielka z córką",                          kategoria: "Zespół" },
  { src: "/images/kwiaciarnia/DSCF1217.jpg",  alt: "Sesja florystyczna",                            kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/DSCF1231.jpg",  alt: "Dekoracja kwiatowa",                            kategoria: "Dekoracje" },
  { src: "/images/kwiaciarnia/DSCF1256.jpg",  alt: "Box Royal Flowers",                             kategoria: "Opakowania" },
  { src: "/images/kwiaciarnia/DSCF1275.jpg",  alt: "Box z zewnątrz",                                kategoria: "Opakowania" },
  { src: "/images/kwiaciarnia/DSCF1285.jpg",  alt: "Żółta kompozycja w zielonym wazonie",           kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/DSCF1315.jpg",  alt: "Właścicielka przy pracy z wazonem",             kategoria: "Za kulisami" },
  { src: "/images/kwiaciarnia/DSCF1336.jpg",  alt: "Tworzenie kompozycji kwiatowej",                kategoria: "Za kulisami" },
  { src: "/images/kwiaciarnia/DSCF1366.jpg",  alt: "Praca z bukietem",                              kategoria: "Za kulisami" },
  { src: "/images/kwiaciarnia/DSCF1375.jpg",  alt: "Florystka przy kompozycji",                     kategoria: "Za kulisami" },
  { src: "/images/kwiaciarnia/DSCF1666.jpg",  alt: "Elegancka dekoracja ślubna",                    kategoria: "Dekoracje" },
  { src: "/images/kwiaciarnia/DSCF1679.jpg",  alt: "Właścicielka z bukietem z boku",                kategoria: "Zespół" },
  { src: "/images/kwiaciarnia/DSCF1768.jpg",  alt: "Kompozycja w wazonie – róże pomarańczowe",      kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/DSCF1834.jpg",  alt: "Różowy bukiet z protea",                        kategoria: "Bukiety" },
  { src: "/images/kwiaciarnia/DSCF1861.jpg",  alt: "Kolorowa kompozycja w pomarańczowym wazonie",   kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/DSCF1874.jpg",  alt: "Niebieskie tulipany",                           kategoria: "Bukiety" },
  { src: "/images/kwiaciarnia/DSCF1885.jpg",  alt: "Zbliżenie niebieskich kwiatów",                 kategoria: "Detale" },
  { src: "/images/kwiaciarnia/DSCF1887.jpg",         alt: "Kompozycja z orchideami",                       kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/realizacja-maki-miks.jpg",   alt: "Kolorowe maki i letnie kwiaty w kwiaciarni",    kategoria: "Kompozycje" },
  { src: "/images/kwiaciarnia/realizacja-frezje-miks.jpg", alt: "Frezje i egzotyczne kwiaty – wiosenny miks",   kategoria: "Bukiety" },
];

const kategorie = ["Wszystkie", "Bukiety", "Kompozycje", "Dekoracje", "Opakowania", "Za kulisami", "Zespół", "Detale"];

export default function RealizacjePage() {
  const [activeKat, setActiveKat] = useState("Wszystkie");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeKat === "Wszystkie"
    ? wszystkieZdjecia
    : wszystkieZdjecia.filter((z) => z.kategoria === activeKat);

  function openLightbox(i: number) { setLightboxIndex(i); }
  function closeLightbox() { setLightboxIndex(null); }
  function prevPhoto() { setLightboxIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length); }
  function nextPhoto() { setLightboxIndex((i) => i === null ? null : (i + 1) % filtered.length); }

  return (
    <main className="pt-20 min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden border-b border-gold/10">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 70% 40%, #c9a84c22 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto relative">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Portfolio</p>
          <h1 className="font-cormorant text-6xl md:text-7xl font-light text-cream leading-none mb-6">
            Realizacje
          </h1>
          <div className="w-16 h-px bg-gold mb-8" />
          <p className="font-jost text-base text-cream/60 max-w-md leading-relaxed">
            Każda praca to unikalna historia. Przeglądaj nasze kompozycje ślubne,
            bukiety okolicznościowe i dekoracje eventowe.
          </p>
        </div>
      </section>

      {/* Filtry */}
      <section className="border-b border-gold/10 bg-dark-800 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-5 overflow-x-auto">
          {kategorie.map((k) => (
            <button
              key={k}
              onClick={() => setActiveKat(k)}
              className={`font-jost text-xs tracking-widest uppercase whitespace-nowrap pb-1 border-b transition-all duration-200 ${
                activeKat === k
                  ? "border-gold text-gold"
                  : "border-transparent text-cream/40 hover:text-cream"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </section>

      {/* Siatka 3 kolumny */}
      <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto">
        <p className="font-jost text-xs text-cream/25 tracking-wider mb-8">
          {filtered.length} {filtered.length === 1 ? "zdjęcie" : "zdjęć"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((z, i) => (
            <button
              key={z.src}
              className="group relative overflow-hidden rounded-[2px] text-left cursor-zoom-in focus:outline-none focus:ring-1 focus:ring-gold/50"
              onClick={() => openLightbox(i)}
            >
              <img
                src={z.src}
                alt={z.alt}
                className="w-full aspect-[3/4] object-cover object-center transition-transform duration-[400ms] ease-out group-hover:scale-105"
                style={{ borderRadius: "2px" }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100">
                <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold mb-1">
                  {z.kategoria}
                </span>
                <span className="font-cormorant text-base text-cream leading-tight">
                  {z.alt}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      {/* CTA */}
      <section className="py-20 px-6 border-t border-gold/10 text-center bg-dark-800">
        <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">Zainspiruj się</p>
        <h2 className="font-cormorant text-4xl font-light text-cream mb-8">
          Chcesz podobną realizację?
        </h2>
        <Link
          href="/zamow"
          className="inline-flex items-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
        >
          Zamów teraz <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="border-t border-gold/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cormorant text-xl tracking-widest text-cream/50">
            ROYAL <span className="text-gold">FLOWERS</span>
          </p>
          <p className="font-jost text-xs text-cream/30">© 2025 Royal Flowers. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </main>
  );
}
