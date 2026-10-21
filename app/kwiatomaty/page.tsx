"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useCountUp, useParallax, useReveal } from "@/lib/animations";

/**
 * ZDJĘCIE TŁA HERO:
 * Wrzuć plik do /public/images/ i ustaw:
 *   const HERO_BG = "/images/NAZWA_PLIKU.jpg"
 * Gdy null → wyświetla gradient placeholder.
 * Zdjęcie kwiatomatu jest już dostępne jako /images/kwiatomat.jpg
 */
const HERO_BG: string | null = "/images/kwiatomat-dscf1491.jpg";

/**
 * ZDJĘCIA KWIATOMATÓW: /public/images/kwiatomaty/kwiatomat-{id}.jpg
 * Dopóki pliku nie ma, karta pokazuje placeholder z numerem.
 */
const zdjecieKwiatomatu = (id: number) => `/images/kwiatomaty/kwiatomat-${id}.jpg`;

/**
 * MAPA: zrzut mapy w /public/images/mapa.png (1488×812).
 * Piny ustawione w % (left/top) względem obrazu — kontener ma te same proporcje,
 * więc piny trzymają się swoich miejsc przy każdej szerokości ekranu.
 */
const MAPA_IMG = "/images/mapa.png";
const MAPA_PROPORCJE = "1488 / 812";

const kwiatomaty = [
  {
    id: 1,
    nazwa: "Kwiatomat #1 – ul. Witosa",
    adres: "ul. Wincentego Witosa 110, Nowy Sącz",
    online: true,
    opis: "Kwiatomat przy ul. Witosa – dostępny całą dobę, świeże kompozycje każdego dnia.",
    // Link do lokalizacji w Google Maps (nawigacja)
    mapa: "https://maps.app.goo.gl/uDRqatBX3986T3bPA",
    pin: { left: 50.8, top: 6.5, etykieta: "Witosa" },
  },
  {
    id: 2,
    nazwa: "Kwiatomat #2 – Galeria Trzy Korony",
    adres: "Naprzeciwko Galerii Trzy Korony, Nowy Sącz",
    online: true,
    opis: "Doskonała lokalizacja przy centrum handlowym, łatwy dojazd i parking.",
    // Link do lokalizacji w Google Maps (nawigacja)
    mapa: "https://maps.app.goo.gl/s9pnq9jUz9mPWUhv7",
    pin: { left: 55.1, top: 22.5, etykieta: "Trzy Korony" },
  },
  {
    id: 3,
    nazwa: "Kwiatomat #3 – ul. Długosza",
    adres: "ul. Długosza 23, Nowy Sącz",
    online: true,
    opis: "Tuż obok kwiaciarni Royal Flowers — najwygodniejszy odbiór w mieście",
    // Link do lokalizacji w Google Maps (nawigacja)
    mapa: "https://maps.app.goo.gl/qoMMwg95DWk7NCGd7",
    pin: { left: 50.2, top: 28.0, etykieta: "Długosza" },
  },
  {
    id: 4,
    nazwa: "Kwiatomat #4 – Stacja Huzar",
    adres: "ul. Papieska 11, Nowy Sącz",
    online: true,
    opis: "Przy wejściu do stacji Huzar — kwiaty w drodze do pracy lub do domu",
    // Link do lokalizacji w Google Maps (nawigacja)
    mapa: "https://maps.app.goo.gl/uSMGXoDSPVTExGFK8",
    pin: { left: 37.2, top: 14.9, etykieta: "Huzar" },
  },
  {
    id: 5,
    nazwa: "Kwiatomat #5 – Galeria Gołąbkowice",
    adres: "Przy wejściu do Galerii Gołąbkowice, Nowy Sącz",
    online: true,
    opis: "Wygodna lokalizacja przy wejściu do galerii – kwiaty po zakupach.",
    // Link do lokalizacji w Google Maps (nawigacja)
    mapa: "https://maps.app.goo.gl/R7knEuLUcQqAMV8LA",
    pin: { left: 61.3, top: 25.4, etykieta: "Gołąbkowice" },
  },
  {
    id: 6,
    nazwa: "Kwiatomat #6 – Stacja Orlen Stary Sącz",
    adres: "Przed wejściem Stacja Orlen, Stary Sącz",
    online: true,
    opis: "Kwiatomat przy stacji paliw w Starym Sączu – dostępny całą dobę, 7 dni w tygodniu.",
    // Link do lokalizacji w Google Maps (nawigacja)
    mapa: "https://maps.app.goo.gl/YVkTrKcDDTbVLnLq9",
    pin: { left: 35.9, top: 86.5, etykieta: "Orlen Stary Sącz" },
  },
];

type Kwiatomat = (typeof kwiatomaty)[number];

const kroki = [
  { ikona: "👀", tytul: "Wybierz bukiet", opis: "Obejrzyj bukiety przez szybę i wybierz ten, który Ci się podoba" },
  { ikona: "💳", tytul: "Zapłać kartą", opis: "Na terminalu wpisz numer bukietu i zapłać kartą płatniczą" },
  { ikona: "🌸", tytul: "Odbierz kwiaty", opis: "Szafka otworzy się automatycznie — zabierz swój bukiet!" },
];

// Statystyka w pasku pod hero: liczba (+ sufiks) → count-up, tekst (np. "24/7") → fade-in
function Statystyka({
  liczba, sufiks = "", tekst, podpis, start, index,
}: {
  liczba?: number; sufiks?: string; tekst?: string; podpis: string; start: boolean; index: number;
}) {
  const v = useCountUp(liczba ?? 0, start && liczba !== undefined, 1400);
  return (
    <div
      className={`text-center transition-all duration-700 ease-out ${start ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: start ? `${index * 150}ms` : "0ms" }}
    >
      <p className="font-jost text-5xl font-bold leading-none text-[#D4A843] tabular-nums">
        {liczba !== undefined ? `${v}${sufiks}` : tekst}
      </p>
      <p className="font-jost text-sm text-[#999] mt-2">{podpis}</p>
    </div>
  );
}

function KwiatomatKarta({ k, index, visible }: { k: Kwiatomat; index: number; visible: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [maZdjecie, setMaZdjecie] = useState(true);

  // Zdjęcie mogło nie wczytać się jeszcze przed hydracją — sprawdź po montażu
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setMaZdjecie(false);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      <article
        className={`group relative aspect-[16/10] rounded-xl overflow-hidden border border-gold/15 transition-all duration-500 ease-out hover:border-gold/40 hover:shadow-[0_0_40px_-6px_rgba(201,168,76,0.4)] ${
          k.online ? "" : "grayscale opacity-75"
        }`}
      >
        {/* Placeholder — widoczny, dopóki nie ma zdjęcia */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-700 via-dark-800 to-dark flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 18px)",
            }}
          />
          <span className="relative font-cormorant text-[7rem] md:text-[8rem] font-light text-gold/15 leading-none -translate-y-6">
            #{k.id}
          </span>
        </div>

        {maZdjecie && (
          <img
            ref={imgRef}
            src={zdjecieKwiatomatu(k.id)}
            alt={k.nazwa}
            loading="lazy"
            onError={() => setMaZdjecie(false)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Gradient u dołu — jaśnieje na hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-75" />

        {/* Treść */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full ${k.online ? "bg-green-400 status-pulse" : "bg-cream/30"}`}
                aria-hidden="true"
              />
              <span className={`font-jost text-[11px] tracking-widest uppercase ${k.online ? "text-green-300" : "text-cream/40"}`}>
                {k.online ? "Online" : "Offline"}
              </span>
            </div>
            <h2 className="font-cormorant text-2xl md:text-[1.7rem] text-cream leading-tight mb-1">{k.nazwa}</h2>
            <p className="flex items-center gap-2 font-jost text-sm text-cream/70">
              <MapPin size={13} className="text-gold shrink-0" />
              <span className="truncate">{k.adres}</span>
            </p>
            <p className="font-jost text-xs text-cream/45 leading-relaxed mt-2 line-clamp-2 max-w-md">{k.opis}</p>
          </div>

          <div className="shrink-0 flex flex-col items-start sm:items-end gap-1.5">
            <a
              href={k.mapa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-jost text-xs font-medium tracking-widest uppercase text-[#D4A843] hover:text-gold-light transition-colors duration-300 group/nav"
            >
              Nawiguj
              <ArrowRight size={13} className="transition-transform duration-300 group-hover/nav:translate-x-1" />
            </a>
            <span className="inline-flex items-center gap-1.5 font-jost text-[11px] text-cream/50">
              <Clock size={11} /> Otwarte 24/7
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function KwiatomatyPage() {
  const heroBgRef = useParallax<HTMLDivElement>(0.3);
  const [statsRef, statsVisible] = useReveal<HTMLDivElement>(0.3);
  const [gridRef, gridVisible] = useReveal<HTMLDivElement>(0.1);
  const [krokiRef, krokiVisible] = useReveal<HTMLDivElement>(0.3);
  const [mapaRef, mapaVisible] = useReveal<HTMLDivElement>(0.2);
  const [aktywny, setAktywny] = useState<number | null>(null);

  return (
    <main className="pt-28 min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden min-h-[500px] flex items-center">
        {/* === ZDJĘCIE TŁA – podmień HERO_BG na ścieżkę pliku === */}
        {HERO_BG ? (
          <div ref={heroBgRef} className="absolute -inset-y-[15%] inset-x-0 will-change-transform">
            <Image
              src={HERO_BG}
              alt="Zespół Royal Flowers przy kwiatomacie – odbiór bukietów 24h"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        ) : null}
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: HERO_BG
              ? "linear-gradient(to right, rgba(14,12,10,0.92) 0%, rgba(14,12,10,0.6) 60%, rgba(14,12,10,0.2) 100%)"
              : "radial-gradient(ellipse at 80% 50%, #c9a84c22 0%, transparent 60%)",
          }}
        />
        {/* Grid pattern overlay */}
        {!HERO_BG && (
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 60px)",
            }}
          />
        )}
        <div className="max-w-7xl mx-auto relative w-full">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
            Sieć automatów kwiatowych
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light text-cream leading-none mb-6 whitespace-nowrap">
            Kwiatomaty
          </h1>
          <div className="w-16 h-px bg-gold mb-8" />
          <p className="font-jost text-base text-cream/60 max-w-md leading-relaxed">
            Świeże kwiaty dostępne 24 godziny na dobę, 7 dni w tygodniu.
            Znajdź najbliższy automat i odbierz zamówienie w kilka sekund.
          </p>
        </div>
      </section>

      {/* Pasek statystyk */}
      <section className="bg-[#1a1a1a] border-y border-[rgba(212,168,67,0.2)] py-10 px-6">
        <div
          ref={statsRef}
          className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:justify-around gap-8 sm:gap-6"
        >
          <Statystyka liczba={kwiatomaty.length} podpis="Kwiatomatów" start={statsVisible} index={0} />
          <Statystyka tekst="24/7" podpis="Dostępność" start={statsVisible} index={1} />
          <Statystyka liczba={15} sufiks="+" podpis="Lat doświadczenia" start={statsVisible} index={2} />
        </div>
      </section>

      {/* Karty automatów */}
      <section id="lokalizacje" className="scroll-mt-28 pt-16 pb-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px bg-gold/40" />
          <p className="font-jost text-xs tracking-[0.4em] uppercase text-cream/40">
            Wszystkie lokalizacje
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {kwiatomaty.map((k, i) => (
            <KwiatomatKarta key={k.id} k={k} index={i} visible={gridVisible} />
          ))}
        </div>
      </section>

      {/* Mapa kwiatomatów */}
      <section id="mapa" className="scroll-mt-28 border-t border-gold/10 py-20 px-6 md:px-16">
        <div
          ref={mapaRef}
          className={`max-w-7xl mx-auto transition-all duration-1000 ease-out ${mapaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Gdzie nas znajdziesz</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Mapa kwiatomatów</h2>
          </div>
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-center">
            <div
              className="relative w-full rounded-xl overflow-hidden border border-gold/15 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] bg-cover bg-center"
              style={{ aspectRatio: MAPA_PROPORCJE, backgroundImage: `url(${MAPA_IMG})` }}
              role="group"
              aria-label="Mapa kwiatomatów — kliknij pin, aby nawigować"
            >
              <div className="absolute inset-0 bg-black/55" />

              {kwiatomaty.map((k) => {
                const on = aktywny === k.id;
                return (
                  <a
                    key={k.id}
                    href={k.mapa}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-pin={k.id}
                    aria-label={`Nawiguj do: ${k.nazwa}, ${k.adres} (otwiera Google Maps)`}
                    onMouseEnter={() => setAktywny(k.id)}
                    onMouseLeave={() => setAktywny(null)}
                    onFocus={() => setAktywny(k.id)}
                    onBlur={() => setAktywny(null)}
                    className={`group/pin absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none ${on ? "z-20" : "z-10"}`}
                    style={{ left: `${k.pin.left}%`, top: `${k.pin.top}%` }}
                  >
                    <span
                      className={`pin-pulse flex items-center justify-center w-6 h-6 sm:w-[30px] sm:h-[30px] rounded-full bg-[#D4A843] text-[#1a1a1a] font-jost text-[11px] sm:text-sm font-bold shadow-lg transition-transform duration-200 group-focus-visible/pin:ring-2 group-focus-visible/pin:ring-white ${
                        on ? "scale-[1.2]" : ""
                      }`}
                    >
                      {k.id}
                    </span>
                    <span
                      className={`absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-[6px] border border-[rgba(212,168,67,0.3)] bg-[#1a1a1a] px-2.5 py-1 font-jost text-[11px] text-[#D4A843] pointer-events-none transition-all duration-200 ${
                        on ? "opacity-100 brightness-125" : "opacity-0 sm:opacity-75"
                      }`}
                    >
                      {k.pin.etykieta}
                    </span>
                  </a>
                );
              })}

              {/* Pasek u dołu (z lewej — nie zasłania podpisu Google Maps na obrazie) */}
              <p className="absolute bottom-0 left-0 px-4 py-2 font-jost text-[11px] text-[#D4A843] opacity-60 pointer-events-none">
                Kliknij pin, aby nawigować
              </p>
            </div>
            <ol className="space-y-1">
              {kwiatomaty.map((k) => (
                <li key={k.id}>
                  <a
                    href={k.mapa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setAktywny(k.id)}
                    onMouseLeave={() => setAktywny(null)}
                    onFocus={() => setAktywny(k.id)}
                    onBlur={() => setAktywny(null)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg border-l-2 transition-colors duration-300 ${
                      aktywny === k.id ? "border-gold bg-gold/[0.06]" : "border-transparent hover:bg-cream/[0.03]"
                    }`}
                  >
                    <span className="w-7 h-7 shrink-0 rounded-full bg-gold text-dark font-jost text-xs font-semibold flex items-center justify-center">
                      {k.id}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-cormorant text-lg text-cream leading-tight truncate">{k.nazwa.replace(/^Kwiatomat #\d+ – /, "")}</span>
                      <span className="block font-jost text-xs text-cream/40 truncate">{k.adres}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Jak to działa */}
      <section className="border-t border-gold/10 bg-dark-800 py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">
            Jak to działa?
          </p>
          <h2 className="font-cormorant text-4xl font-light text-cream mb-14">
            Jak kupić kwiaty z kwiatomatu?
          </h2>

          <div ref={krokiRef} className="relative">
            {/* Linia postępu między krokami (desktop) */}
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gold/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold origin-left transition-transform ease-out"
                style={{
                  transform: krokiVisible ? "scaleX(1)" : "scaleX(0)",
                  transitionDuration: "1200ms",
                  transitionDelay: krokiVisible ? "200ms" : "0ms",
                }}
              />
            </div>

            <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {kroki.map((s, i) => (
                <li
                  key={s.tytul}
                  className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
                    krokiVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: krokiVisible ? `${i * 400}ms` : "0ms" }}
                >
                  <div className="relative mb-6">
                    <div
                      className={`w-24 h-24 rounded-full border-2 bg-dark flex items-center justify-center text-4xl transition-all duration-500 ${
                        krokiVisible ? "border-gold shadow-[0_0_30px_rgba(201,168,76,0.25)]" : "border-gold/20"
                      }`}
                      style={{ transitionDelay: krokiVisible ? `${200 + i * 500}ms` : "0ms" }}
                    >
                      <span aria-hidden="true">{s.ikona}</span>
                    </div>
                    <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gold text-dark font-jost text-xs font-semibold flex items-center justify-center shadow-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-cormorant text-2xl text-cream mb-2">{s.tytul}</h3>
                  <p className="font-jost text-sm text-cream/45 leading-relaxed max-w-[240px]">{s.opis}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-14 font-jost text-sm md:text-base tracking-wide text-gold text-center">
            Bez aplikacji, bez rejestracji — wystarczy karta płatnicza
          </p>
        </div>
      </section>

      <footer className="border-t border-gold/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cormorant text-xl tracking-widest text-cream/50">
            ROYAL <span className="text-gold">FLOWERS</span>
          </p>
          <p className="font-jost text-xs text-cream/30">
            © 2025 Royal Flowers. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </main>
  );
}

/*
 * JAK PRZESUNĄĆ PIN NA MAPIE KWIATOMATÓW
 * Pozycje pinów są w danych na górze pliku: `pin: { left, top }` przy każdym kwiatomacie
 * (numer pina = id kwiatomatu = atrybut data-pin w HTML). Wartości to % szerokości/wysokości mapy,
 * liczone do środka kółka.
 * Na desktopie (mapa ok. 690 × 375 px): 1% left ≈ 7 px w prawo, 1% top ≈ 4 px w dół.
 * Na telefonie mapa jest mniejsza, więc 1% to proporcjonalnie mniej pikseli — pin zostaje w tym samym miejscu mapy.
 * Podgląd na żywo: w DevTools zaznacz element [data-pin="3"] i zmieniaj style left/top, potem przepisz wartości tutaj.
 */
