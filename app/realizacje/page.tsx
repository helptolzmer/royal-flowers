"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import Lightbox from "@/components/Lightbox";
import FallingPetals from "@/components/FallingPetals";
import TypedHeading from "@/components/TypedHeading";
import { prefersReducedMotion, useCountUp, useReveal } from "@/lib/animations";
import realizacjeConfig from "@/lib/realizacje-config";
import Footer from "@/components/Footer";

const zdjeciaKwiaciarni = [
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

// Realizacje z lib/realizacje-config.ts (public/images/realizacje/[kategoria]/[plik]) — 221 zdjęć
const KATEGORIA_REALIZACJI: Record<keyof typeof realizacjeConfig, string> = {
  bukiety: "Bukiety",
  flowerbox: "FlowerBoxy",
  wience: "Wieńce",
};

const zdjeciaRealizacji = (Object.keys(KATEGORIA_REALIZACJI) as (keyof typeof realizacjeConfig)[]).flatMap((folder) =>
  realizacjeConfig[folder].flatMap((grupa) =>
    grupa.zdjecia.map((plik) => ({
      src: `/images/realizacje/${folder}/${plik}`,
      alt: grupa.opis,
      kategoria: KATEGORIA_REALIZACJI[folder],
    }))
  )
);

const wszystkieZdjecia = [...zdjeciaKwiaciarni, ...zdjeciaRealizacji];

type Zdjecie = (typeof wszystkieZdjecia)[number];

const kategorie = ["Wszystkie", "Bukiety", "FlowerBoxy", "Wieńce", "Kompozycje", "Dekoracje", "Opakowania", "Za kulisami", "Zespół", "Detale"];

const EMOJI_KATEGORII: Record<string, string> = {
  Wszystkie: "✨",
  Bukiety: "💐",
  FlowerBoxy: "🌷",
  Wieńce: "🕊️",
  Kompozycje: "🎨",
  Dekoracje: "🏛️",
  Opakowania: "🎁",
  "Za kulisami": "📸",
  Zespół: "👩‍🌾",
  Detale: "🔍",
};

const NAGLOWEK = "Realizacje";
const PAGE_SIZE = 9;
const LEAVE_MS = 200; // fade-out galerii przy zmianie filtra

// Masonry: siatka z wierszami po 10px — wysokość kafelka = liczba wierszy.
// Wzór powtarza się co 9 zdjęć; "wide" zajmuje 2 kolumny (od tabletu w górę).
const MASONRY_WZOR: { rows: number; wide?: boolean }[] = [
  { rows: 44 },
  { rows: 30 },
  { rows: 36 },
  { rows: 34, wide: true },
  { rows: 26 },
  { rows: 40 },
  { rows: 30 },
  { rows: 44 },
  { rows: 34, wide: true },
];

function liczbaZdjec(n: number) {
  if (n === 1) return "zdjęcie";
  const r10 = n % 10;
  const r100 = n % 100;
  if (r10 >= 2 && r10 <= 4 && (r100 < 12 || r100 > 14)) return "zdjęcia";
  return "zdjęć";
}

function MasonryItem({
  z,
  index,
  instant,
  delayMs,
  onOpen,
}: {
  z: Zdjecie;
  index: number;
  instant: boolean;
  delayMs: number;
  onOpen: () => void;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>(0.1);
  const wzor = MASONRY_WZOR[index % MASONRY_WZOR.length];

  const pokaz = instant || visible;
  const stan = pokaz ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[30px] scale-95";

  return (
    <div
      ref={ref}
      className={`pb-[10px] transition-all ease-out duration-700 ${stan} ${
        wzor.wide ? "sm:col-span-2" : ""
      }`}
      style={{ gridRow: `span ${wzor.rows}`, transitionDelay: !instant && visible ? `${delayMs}ms` : "0ms" }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Powiększ zdjęcie: ${z.alt}`}
        className="group relative block w-full h-full overflow-hidden rounded-[2px] cursor-pointer transition-opacity duration-500 group-hover/gal:opacity-70 hover:!opacity-100 focus-visible:!opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <img
          src={z.src}
          alt={z.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Overlay z kategorią */}
        <span className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 group-focus-visible:bg-dark/40 transition-colors duration-500 flex flex-col items-center justify-center gap-3">
          <span className="flex flex-col items-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-500 ease-out">
            <span className="w-11 h-11 rounded-full border border-cream/60 flex items-center justify-center text-cream">
              <Search size={18} strokeWidth={1.5} />
            </span>
            <span className="font-jost text-xs tracking-[0.3em] uppercase text-cream">
              {z.kategoria}
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}

export default function RealizacjePage() {
  const [activeKat, setActiveKat] = useState("Wszystkie");
  const [shownKat, setShownKat] = useState("Wszystkie"); // kategoria aktualnie wyświetlana w siatce
  const [leaving, setLeaving] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);
  const [pulse, setPulse] = useState(0); // zmiana klucza restartuje animację pulsu
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const leaveTimer = useRef<number>();
  const [ctaRef, ctaVisible] = useReveal<HTMLDivElement>(0.3);
  const [ctaTyped, setCtaTyped] = useState(false);
  const [ctaButton, setCtaButton] = useState(false);

  // Przycisk CTA pojawia się 1s po wypisaniu nagłówka
  useEffect(() => {
    if (!ctaTyped) return;
    const id = window.setTimeout(() => setCtaButton(true), prefersReducedMotion() ? 0 : 1000);
    return () => window.clearTimeout(id);
  }, [ctaTyped]);

  const filtered =
    shownKat === "Wszystkie" ? wszystkieZdjecia : wszystkieZdjecia.filter((z) => z.kategoria === shownKat);
  const widoczne = filtered.slice(0, limit);
  const licznik = useCountUp(filtered.length, true, 700);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  function zmienFiltr(k: string) {
    if (k === activeKat) return;
    setActiveKat(k);
    setPulse((n) => n + 1);
    window.clearTimeout(leaveTimer.current);
    const swap = () => {
      setShownKat(k);
      setLimit(PAGE_SIZE);
      setFilterChanged(true);
      setLeaving(false);
    };
    if (prefersReducedMotion()) {
      swap();
      return;
    }
    // Stare zdjęcia wychodzą, potem podmieniamy listę
    setLeaving(true);
    leaveTimer.current = window.setTimeout(swap, LEAVE_MS);
  }

  function prevPhoto() { setLightboxIndex((i) => i === null ? null : (i - 1 + widoczne.length) % widoczne.length); }
  function nextPhoto() { setLightboxIndex((i) => i === null ? null : (i + 1) % widoczne.length); }

  return (
    <main className="pt-28 min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden border-b border-gold/10">
        <FallingPetals intensity={0.7} />
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 70% 40%, #c9a84c22 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto relative">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Portfolio</p>
          <h1
            aria-label={NAGLOWEK}
            className="font-cormorant text-6xl md:text-7xl font-light text-cream leading-none mb-6"
          >
            {NAGLOWEK.split("").map((litera, i) => (
              <span key={i} aria-hidden="true" className="letter-in" style={{ animationDelay: `${i * 50}ms` }}>
                {litera}
              </span>
            ))}
          </h1>
          <div className="line-grow h-px bg-gold mb-8" style={{ animationDelay: "300ms" }} />
          <p
            className="fade-up font-jost text-base text-cream/60 max-w-md leading-relaxed"
            style={{ animationDelay: `${NAGLOWEK.length * 50 + 500}ms` }}
          >
            Każda praca to unikalna historia. Przeglądaj nasze kompozycje ślubne,
            bukiety okolicznościowe i dekoracje eventowe.
          </p>
        </div>
      </section>

      {/* Filtry — pille z emoji */}
      <section className="border-b border-gold/10 bg-dark-800 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-[10px] overflow-x-auto no-scrollbar md:flex-wrap md:justify-center md:overflow-visible">
          {kategorie.map((k, i) => {
            const active = activeKat === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => zmienFiltr(k)}
                aria-pressed={active}
                className="fade-up shrink-0"
                style={{ animationDelay: `${i * 50}ms`, animationDuration: "500ms" }}
              >
                <span
                  key={active ? `${k}-${pulse}` : k}
                  className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 cursor-pointer transition-colors duration-300 ${
                    active
                      ? "pill-pulse bg-[rgba(212,168,67,0.15)] border-[#D4A843] text-[#D4A843]"
                      : "bg-white/[0.04] border-white/10 text-cream/60 hover:border-[rgba(212,168,67,0.4)] hover:bg-[rgba(212,168,67,0.05)] hover:text-cream"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`text-xl leading-none inline-block transition-transform duration-200 ease-out ${
                      active ? "scale-110" : "group-hover:-translate-y-[3px]"
                    }`}
                  >
                    {EMOJI_KATEGORII[k]}
                  </span>
                  <span className="font-jost text-[13px] uppercase tracking-[1px] whitespace-nowrap">{k}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Galeria — masonry */}
      <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto">
        <p className="font-jost text-xs text-cream/25 tracking-wider mb-8 tabular-nums" aria-live="polite">
          {licznik} {liczbaZdjec(filtered.length)}
        </p>

        <div
          className={`group/gal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[10px] auto-rows-[10px] grid-flow-row-dense transition-opacity ease-out ${
            leaving ? "opacity-0 duration-200" : "opacity-100 duration-300"
          }`}
        >
          {widoczne.map((z, i) => (
            <MasonryItem
              key={`${shownKat}-${z.src}`}
              z={z}
              index={i}
              // Po zmianie filtra zdjęcia są od razu widoczne (fade robi cała galeria);
              // przy pierwszym wczytaniu i "Pokaż więcej" — wjazd przy przewijaniu, 100ms na zdjęcie
              instant={filterChanged}
              delayMs={(i % PAGE_SIZE) * 100}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </div>

        {filtered.length > limit && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => {
                setFilterChanged(false);
                setLimit((l) => l + PAGE_SIZE);
              }}
              className="border border-gold/30 text-cream font-jost text-xs tracking-widest uppercase px-10 py-4 hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Pokaż więcej ({filtered.length - limit})
            </button>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={widoczne}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      {/* CTA */}
      <section className="relative py-24 px-6 border-t border-gold/10 text-center overflow-hidden">
        {/* Powoli przesuwający się gradient w ciemnych tonach */}
        <div
          aria-hidden="true"
          className="animated-gradient absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(120deg, #0e0c0a 0%, #1a1714 25%, #2a2116 50%, #1a1714 75%, #0e0c0a 100%)",
            animationDuration: "20s",
          }}
        />
        <div ref={ctaRef} className="relative">
          <p
            className={`font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6 transition-all duration-700 ease-out ${
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Zainspiruj się
          </p>
          <TypedHeading
            text="Chcesz podobną kompozycję?"
            start={ctaVisible}
            onDone={() => setCtaTyped(true)}
            className="font-cormorant text-4xl md:text-5xl font-light text-cream mb-10"
          />
          <div
            className={`transition-all duration-700 ease-out ${
              ctaButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
            }`}
          >
            <Link
              href="/zamow"
              tabIndex={ctaButton ? undefined : -1}
              className={`inline-flex items-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300 ${
                ctaButton ? "gold-pulse" : ""
              }`}
            >
              Zamów teraz <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
