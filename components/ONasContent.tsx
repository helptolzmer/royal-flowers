"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Award, Leaf, Star } from "lucide-react";
import FallingPetals from "@/components/FallingPetals";
import Lightbox from "@/components/Lightbox";
import TypedHeading from "@/components/TypedHeading";
import { prefersReducedMotion, useCountUp, useParallax, useReveal } from "@/lib/animations";
import Footer from "@/components/Footer";

const wartosci = [
  { icon: Heart, tytul: "Pasja", opis: "Każda kompozycja powstaje z miłości do kwiatów i dbałości o najdrobniejszy detal.", licznik: 1000, sufiks: "+", podpis: "stworzonych kompozycji" },
  { icon: Award, tytul: "Jakość", opis: "Pracujemy wyłącznie ze sprawdzonymi dostawcami, by kwiaty były zawsze świeże i piękne.", licznik: 100, sufiks: "%", podpis: "świeżych kwiatów" },
  { icon: Leaf, tytul: "Ekologia", opis: "Dbamy o środowisko – nasze opakowania są biodegradowalne, a odpady minimalizowane.", licznik: 0, sufiks: "", podpis: "plastikowych opakowań" },
  { icon: Star, tytul: "Doświadczenie", opis: "Ponad 10 lat na rynku florystycznym i setki zadowolonych klientów.", licznik: 15, sufiks: "+", podpis: "lat na rynku" },
];

const historia = [
  { rok: "2007", tytul: "Pierwsza kwiaciarnia", opis: "Otwarcie pierwszej kwiaciarni Royal Flowers w Nowym Sączu." },
  { rok: "2023", tytul: "Nowa kwiaciarnia", opis: "Otwarcie nowej, większej kwiaciarni przy al. Wolności 10A." },
  { rok: "2023", tytul: "Pierwszy kwiatomat", opis: "Uruchomienie pierwszego kwiatomatu 24/7 w Nowym Sączu." },
  { rok: "2025", tytul: "Sieć kwiatomatów", opis: "6 kwiatomatów w Nowym Sączu i okolicach." },
  { rok: "2025", tytul: "Sklep online", opis: "Uruchomienie sklepu online." },
];

const naszaPraca = [
  { src: "/images/kwiaciarnia/kulisami-wianek.jpg",  alt: "Florystka w wianku z kwiatów – rzemiosło Royal Flowers" },
  { src: "/images/kwiaciarnia/DSCF1375.jpg",         alt: "Florystka Royal Flowers – pasja i uśmiech przy pracy" },
  { src: "/images/kwiaciarnia/DSCF1366.jpg",         alt: "Florystka skupiona na tworzeniu kompozycji" },
  { src: "/images/kwiaciarnia/DSCF1163.jpg",         alt: "Zespół Royal Flowers z pudełkiem kwiatowym" },
];

const zespol = [
  { src: "/images/kwiaciarnia/DSCF1155.jpg", alt: "Właścicielka Royal Flowers", imie: "Małgorzata", rola: "Główna Florystka & Założycielka" },
  { src: "/images/kwiaciarnia/DSCF1210.jpg", alt: "Zuza – Florystka Royal Flowers", imie: "Zuza", rola: "Florystka, Royal Flowers Nowy Sącz" },
];

const CTA_TEKST = "Masz pytania? Porozmawiajmy.";

// Linia czasu rysuje się w LINE_MS; każdy punkt "zapala się", gdy linia do niego dojdzie.
const STEP_MS = 200;
const LINE_MS = historia.length * STEP_MS + STEP_MS;

// Tło sekcji przesuwające się wolniej niż treść
function ParallaxGlow({ background, speed = 0.2 }: { background: string; speed?: number }) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute -inset-y-[30%] inset-x-0 pointer-events-none will-change-transform"
      style={{ background }}
    />
  );
}

function WartoscKarta({ w, index, visible }: { w: (typeof wartosci)[number]; index: number; visible: boolean }) {
  const value = useCountUp(w.licznik, visible);
  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
    >
      <div className="group relative h-full text-center p-8 border border-gold/10 bg-dark/40 transition-all duration-500 ease-out hover:-translate-y-2.5 hover:border-gold/50 hover:shadow-[0_18px_40px_-12px_rgba(201,168,76,0.25)]">
        {/* Złota linia rysująca się od środka na hover */}
        <span className="absolute top-0 inset-x-0 h-px bg-gold scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
        <w.icon className="text-cream/50 mx-auto mb-5 transition-all duration-500 ease-out group-hover:text-gold group-hover:scale-125" size={24} />
        <h3 className="font-cormorant text-xl text-cream mb-3">{w.tytul}</h3>
        <p className="font-jost text-sm text-cream/45 leading-relaxed mb-6">{w.opis}</p>
        <div className="w-8 h-px bg-gold/20 mx-auto mb-5" />
        <p className="font-cormorant text-4xl text-gold tabular-nums leading-none mb-2">
          {value}
          {w.sufiks}
        </p>
        <p className="font-jost text-[11px] tracking-widest uppercase text-cream/40">{w.podpis}</p>
      </div>
    </div>
  );
}

function ZdjecieZespolu({ z }: { z: (typeof zespol)[number] }) {
  const imgRef = useRef<HTMLImageElement>(null);

  // Delikatny parallax — zdjęcie przesuwa się w stronę kursora
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;
    if (prefersReducedMotion()) {
      img.style.transform = "scale(1.05)";
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `scale(1.08) translate(${(x * 14).toFixed(1)}px, ${(y * 14).toFixed(1)}px)`;
  };
  const onLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = "";
  };

  return (
    <div className="overflow-hidden rounded-[2px] group relative" onMouseMove={onMove} onMouseLeave={onLeave}>
      <img
        ref={imgRef}
        src={z.src}
        alt={z.alt}
        className="w-full aspect-[3/4] object-cover object-center transition-transform duration-500 ease-out"
        style={{ borderRadius: "2px" }}
      />
      <div className="hover-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent pt-24 p-6 transition-all duration-500 ease-out">
        <p className="font-cormorant text-2xl text-cream">{z.imie}</p>
        <p className="font-jost text-xs text-gold tracking-wider">{z.rola}</p>
      </div>
    </div>
  );
}

// Złota gałązka rysująca się między zdjęciami zespołu
function ZlotaGalazka({ visible }: { visible: boolean }) {
  const draw = (delay: number, duration = 900) => ({
    strokeDasharray: 1,
    strokeDashoffset: visible ? 0 : 1,
    transition: `stroke-dashoffset ${duration}ms ease-out ${delay}ms`,
  });
  return (
    <svg width="44" height="260" viewBox="0 0 44 260" fill="none" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true" className="opacity-70">
      <path pathLength={1} style={draw(0, 1400)} d="M22 255 C 16 200, 28 140, 22 80 C 19 50, 22 30, 22 14" />
      <path pathLength={1} style={draw(500)} d="M21 210 C 10 205, 4 192, 6 182 C 15 186, 20 196, 21 210" />
      <path pathLength={1} style={draw(650)} d="M24 170 C 35 165, 41 152, 39 142 C 30 146, 25 156, 24 170" />
      <path pathLength={1} style={draw(800)} d="M22 128 C 11 123, 5 110, 7 100 C 16 104, 21 114, 22 128" />
      <path pathLength={1} style={draw(950)} d="M22 88 C 33 83, 38 71, 36 62 C 28 66, 23 75, 22 88" />
      <circle cx="22" cy="10" r="4" pathLength={1} style={draw(1150, 600)} />
    </svg>
  );
}

export default function ONasContent() {
  const [heroRef, heroVisible] = useReveal<HTMLDivElement>(0.2);
  const [timelineRef, timelineVisible] = useReveal<HTMLDivElement>(0.2);
  const [valuesRef, valuesVisible] = useReveal<HTMLDivElement>(0.2);
  const [teamRef, teamVisible] = useReveal<HTMLDivElement>(0.2);
  const [galleryRef, galleryVisible] = useReveal<HTMLDivElement>(0.15);
  const [ctaRef, ctaVisible] = useReveal<HTMLDivElement>(0.4);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <main className="pt-28 min-h-screen bg-dark">
      <FallingPetals fixed intensity={0.6} />

      {/* Hero */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden border-b border-gold/10">
        <ParallaxGlow background="radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.07) 0%, transparent 60%)" speed={0.25} />
        <div ref={heroRef} className="max-w-7xl mx-auto relative grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-[800ms] ease-out ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Nasza historia</p>
            <h1 className="font-cormorant text-6xl md:text-7xl font-light text-cream leading-none mb-6">O nas</h1>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="font-jost text-base text-cream/60 leading-relaxed mb-6">
              Royal Flowers to sądecka kwiaciarnia z pasji i z potrzeby serca. Zaczęłyśmy od małego
              stolika na targu, dziś prowadzimy sieć kwiatomatów w całym Nowym Sączu i okolicach.
            </p>
            <p className="font-jost text-base text-cream/60 leading-relaxed">
              Wierzymy, że kwiaty mówią tam, gdzie słowa nie wystarczają. Dlatego każdą kompozycję
              tworzymy z myślą o konkretnej chwili i konkretnej osobie.
            </p>
          </div>
          <div
            className={`flex items-center justify-center transition-all duration-[800ms] ease-out ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="relative w-72 h-72 flex items-center justify-center border border-gold/15 bg-dark-800 transition-all duration-700 ease-out hover:rotate-[5deg] hover:border-gold/40 hover:shadow-[0_0_60px_6px_rgba(201,168,76,0.22)]">
              <Image src="/images/logo.png" alt="Royal Flowers logo" width={260} height={260} className="object-contain p-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Historia — animowana linia czasu */}
      <section className="relative py-24 px-6 md:px-16">
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Linia: tło + złota część rysująca się od góry */}
          <svg
            aria-hidden="true"
            className="absolute top-0 left-3 md:left-1/2 -translate-x-1/2 h-full w-[2px]"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(201,168,76,0.15)" strokeWidth="2" />
            <line
              x1="1" y1="0" x2="1" y2="100"
              stroke="#c9a84c"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={timelineVisible ? 0 : 1}
              style={{ transition: `stroke-dashoffset ${LINE_MS}ms linear` }}
            />
          </svg>

          <ol className="space-y-12 md:space-y-14">
            {historia.map((e, i) => {
              const delay = STEP_MS / 2 + i * STEP_MS;
              const right = i % 2 === 1;
              return (
                <li key={i} className="relative md:grid md:grid-cols-2">
                  {/* Punkt na linii — wypełnia się złotem */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-3 left-3 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gold transition-all duration-500 ease-out ${
                      timelineVisible ? "bg-gold shadow-[0_0_14px_2px_rgba(201,168,76,0.45)] scale-100" : "bg-dark scale-75"
                    }`}
                    style={{ transitionDelay: timelineVisible ? `${delay}ms` : "0ms" }}
                  />
                  <div
                    className={`pl-10 md:pl-0 transition-all duration-700 ease-out ${
                      right ? "md:col-start-2 md:pl-14" : "md:pr-14 md:text-right"
                    } ${timelineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: timelineVisible ? `${delay}ms` : "0ms" }}
                  >
                    <p className="font-cormorant text-4xl text-gold/70 mb-1">{e.rok}</p>
                    <h3 className="font-cormorant text-xl text-cream mb-2">{e.tytul}</h3>
                    <p className="font-jost text-sm text-cream/50 leading-relaxed">{e.opis}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Wartości */}
      <section className="relative py-20 px-6 md:px-16 bg-dark-800 border-y border-gold/10 overflow-hidden">
        <ParallaxGlow background="radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.06) 0%, transparent 55%)" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Co nas wyróżnia</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Nasze wartości</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wartosci.map((w, i) => (
              <WartoscKarta key={w.tytul} w={w} index={i} visible={valuesVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Zespół */}
      <section className="relative py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Ludzie</p>
          <h2 className="font-cormorant text-4xl font-light text-cream">Nasz zespół</h2>
        </div>
        <div
          ref={teamRef}
          className={`grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <ZdjecieZespolu z={zespol[0]} />
          <div className="hidden md:flex justify-center">
            <ZlotaGalazka visible={teamVisible} />
          </div>
          <ZdjecieZespolu z={zespol[1]} />
        </div>
      </section>

      {/* Nasza praca */}
      <section className="relative py-20 px-6 md:px-16 bg-dark-800 border-t border-gold/10 overflow-hidden">
        <ParallaxGlow background="radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 55%)" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Za kulisami</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Nasza praca</h2>
          </div>
          <div ref={galleryRef} className="group/gal grid grid-cols-2 md:grid-cols-4 gap-4">
            {naszaPraca.map((z, i) => (
              <div
                key={z.src}
                className={`transition-all duration-[900ms] ease-out ${
                  galleryVisible ? "opacity-100 translate-x-0" : `opacity-0 ${i % 2 === 0 ? "-translate-x-16" : "translate-x-16"}`
                }`}
                style={{ transitionDelay: galleryVisible ? `${i * 120}ms` : "0ms" }}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  aria-label={`Powiększ zdjęcie: ${z.alt}`}
                  className="group block w-full overflow-hidden rounded-[2px] cursor-zoom-in transition-opacity duration-500 group-hover/gal:opacity-70 hover:!opacity-100 focus-visible:!opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <img
                    src={z.src}
                    alt={z.alt}
                    className="w-full aspect-[3/4] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ borderRadius: "2px" }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 border-t border-gold/10 text-center overflow-hidden">
        <div
          aria-hidden="true"
          className="animated-gradient absolute inset-0"
          style={{ backgroundImage: "linear-gradient(120deg, #0e0c0a 0%, #1d1810 30%, #2a2014 50%, #1a1714 70%, #0e0c0a 100%)" }}
        />
        <ParallaxGlow background="radial-gradient(ellipse at 50% 70%, rgba(201,168,76,0.08) 0%, transparent 60%)" speed={0.15} />
        <div ref={ctaRef} className="relative">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">Dołącz do nas</p>
          <TypedHeading text={CTA_TEKST} start={ctaVisible} className="font-cormorant text-4xl md:text-5xl font-light text-cream mb-10" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zamow"
              className="gold-pulse inline-flex items-center justify-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Złóż zamówienie <ArrowRight size={16} />
            </Link>
            <Link
              href="/realizacje"
              className="inline-flex items-center justify-center gap-3 border border-gold/30 text-cream font-jost text-sm tracking-widest uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Zobacz realizacje
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {lightbox !== null && (
        <Lightbox
          images={naszaPraca}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((i) => (i === null ? null : (i - 1 + naszaPraca.length) % naszaPraca.length))}
          onNext={() => setLightbox((i) => (i === null ? null : (i + 1) % naszaPraca.length))}
        />
      )}
    </main>
  );
}
