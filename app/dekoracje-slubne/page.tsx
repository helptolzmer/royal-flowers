"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Search } from "lucide-react";
import FallingPetals from "@/components/FallingPetals";
import Lightbox from "@/components/Lightbox";
import TypedHeading from "@/components/TypedHeading";
import { prefersReducedMotion, useCountUp, useParallax, useReveal } from "@/lib/animations";
import Footer from "@/components/Footer";

const galeria = [
  { src: "/images/wypozyczalnia/wypo-01.jpg", alt: "Wypożyczalnia by Megi – dekoracje na wesele" },
  { src: "/images/wypozyczalnia/wypo-02.jpg", alt: "Wypożyczalnia by Megi – aranżacja eventowa" },
  { src: "/images/wypozyczalnia/wypo-03.jpg", alt: "Wypożyczalnia by Megi – akcesoria ślubne" },
  { src: "/images/wypozyczalnia/wypo-04.jpg", alt: "Wypożyczalnia by Megi – dekoracje sali" },
];

const uslugi = [
  { nr: 1, ikona: "💬", tytul: "Konsultacja", opis: "Spotykamy się, słuchamy Waszych marzeń i tworzymy spójną wizję dekoracji." },
  { nr: 2, ikona: "📐", tytul: "Projekt", opis: "Przygotowujemy szczegółowy plan dekoracji z doborem kwiatów i kolorystyki." },
  { nr: 3, ikona: "🌸", tytul: "Realizacja", opis: "Kompleksowa dekoracja sali, kościoła i plenerów w dniu ślubu." },
  { nr: 4, ikona: "✨", tytul: "Uprzątnięcie", opis: "Po ceremonii zajmujemy się posprzątaniem dekoracji, abyś mogła cieszyć się weselem." },
];

type Opinia = { tekst: string; para: string; rok: string };

const opinieGora: Opinia[] = [
  { tekst: "Małgorzata stworzyła dekoracje, o których marzyliśmy. Każdy detal był idealny! Goście do dziś wspominają kwiaty na stołach.", para: "Anna & Piotr", rok: "Wesele 2024" },
  { tekst: "Od pierwszej konsultacji wiedziałyśmy, że jesteśmy w dobrych rękach. Zero stresu, same piękne efekty.", para: "Magda & Paweł", rok: "Wesele 2024" },
  { tekst: "Profesjonalizm na najwyższym poziomie. Dekoracja kościoła zapierała dech w piersiach.", para: "Kasia & Tomek", rok: "Wesele 2023" },
  { tekst: "Łuk kwiatowy, o który prosiłam, przeszedł moje najśmielsze oczekiwania. Zdjęcia wyszły bajkowo!", para: "Ola & Michał", rok: "Wesele 2024" },
  { tekst: "Kwiaciarnia Royal Flowers to najlepsza decyzja jaką podjęliśmy przy organizacji wesela.", para: "Justyna & Kamil", rok: "Wesele 2023" },
];

const opinieDol: Opinia[] = [
  { tekst: "Bukiet ślubny był dokładnie taki jak sobie wyobrażałam — delikatny, romantyczny i pachnący.", para: "Natalia & Adam", rok: "Wesele 2024" },
  { tekst: "Pani Małgorzata doradziła nam kolory, o których sami byśmy nie pomyśleli. Efekt? Wow!", para: "Ewa & Bartek", rok: "Wesele 2023" },
  { tekst: "Całościowa oprawa florystyczna — kościół, sala, samochód — wszystko spójne i piękne.", para: "Monika & Łukasz", rok: "Wesele 2024" },
  { tekst: "Współpraca z Royal Flowers to czysta przyjemność. Elastyczni, kreatywni i zawsze z uśmiechem.", para: "Dominika & Marcin", rok: "Wesele 2023" },
  { tekst: "Nasze wesele w stylu boho wyglądało jak z Pinteresta. Dzięki Wam spełniło się marzenie!", para: "Aleksandra & Jakub", rok: "Wesele 2024" },
];

const LITERY_DELAY = 40;
const STEP_DELAY = 200;

// Nagłówek hero: każda litera wjeżdża osobno, numeracja liter ciągnie się przez obie linie
function LiteryNaglowka({ linie }: { linie: { tekst: string; className?: string }[] }) {
  let n = 0;
  return (
    <>
      {linie.map((l, li) => (
        <span key={li} className={`block ${l.className ?? ""}`}>
          {l.tekst.split("").map((ch, i) => {
            const delay = n++ * LITERY_DELAY;
            return (
              <span key={i} aria-hidden="true" className="letter-in" style={{ animationDelay: `${delay}ms` }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

function KrokKarta({ u, index, visible }: { u: (typeof uslugi)[number]; index: number; visible: boolean }) {
  // Numer liczy się dopiero, gdy karta się pojawi
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => setStart(true), prefersReducedMotion() ? 0 : index * STEP_DELAY);
    return () => window.clearTimeout(id);
  }, [visible, index]);
  const nr = useCountUp(u.nr, start, 500);

  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: visible ? `${index * STEP_DELAY}ms` : "0ms" }}
    >
      <div className="group relative h-full pt-0 transition-transform duration-500 ease-out hover:-translate-y-2">
        {/* Ikona na linii */}
        <div className="relative z-10 w-14 h-14 rounded-full border border-gold/40 bg-dark-800 flex items-center justify-center text-2xl mb-6 transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]">
          <span aria-hidden="true">{u.ikona}</span>
        </div>
        <div className="relative p-6 border border-gold/10 bg-dark/40 rounded-lg overflow-hidden transition-colors duration-500 group-hover:border-gold/25">
          {/* Złoty border-top rysujący się na hover */}
          <span className="absolute top-0 left-0 right-0 h-0.5 bg-gold origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          <p className="font-cormorant text-4xl text-gold/50 mb-3 tabular-nums">{String(nr).padStart(2, "0")}</p>
          <h3 className="font-cormorant text-xl text-cream mb-2">{u.tytul}</h3>
          <p className="font-jost text-sm text-cream/45 leading-relaxed">{u.opis}</p>
        </div>
      </div>
    </div>
  );
}

function OpiniaKarta({ o }: { o: Opinia }) {
  return (
    <figure className="w-[300px] sm:w-[350px] shrink-0 mr-6 p-7 rounded-xl border border-gold/20 bg-dark-800/80 backdrop-blur-sm flex flex-col">
      <p className="text-gold tracking-[0.2em] text-sm mb-4" aria-label="Ocena 5 na 5">★★★★★</p>
      <blockquote className="font-cormorant italic text-lg text-cream/80 leading-relaxed flex-1">
        „{o.tekst}”
      </blockquote>
      <figcaption className="mt-5 font-jost text-xs tracking-wider">
        <span className="text-cream/70">{o.para}</span>
        <span className="text-gold"> · {o.rok}</span>
      </figcaption>
    </figure>
  );
}

// Taśma opinii — treść x2 i przesunięcie o 50% daje płynną pętlę
function MarqueeOpinii({ opinie, kierunek }: { opinie: Opinia[]; kierunek: "left" | "right" }) {
  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div className={`flex w-max ${kierunek === "left" ? "marquee-left" : "marquee-right"}`}>
        {opinie.map((o) => <OpiniaKarta key={o.para} o={o} />)}
        <div aria-hidden="true" className="flex">
          {opinie.map((o) => <OpiniaKarta key={`dup-${o.para}`} o={o} />)}
        </div>
      </div>
    </div>
  );
}

export default function DekoracjeSlubneePage() {
  const heroImgRef = useParallax<HTMLDivElement>(0.3);
  const [stepsRef, stepsVisible] = useReveal<HTMLDivElement>(0.2);
  const [promoRef, promoVisible] = useReveal<HTMLElement>(0.3);
  const [galRef, galVisible] = useReveal<HTMLDivElement>(0.15);
  const [opinieRef, opinieVisible] = useReveal<HTMLDivElement>(0.2);
  const [ctaRef, ctaVisible] = useReveal<HTMLDivElement>(0.4);
  const [ctaTyped, setCtaTyped] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const liczbaLiter = "Dekoracje".length + "Ślubne".length;

  return (
    <main className="pt-28 min-h-screen bg-dark">
      {/* Hero ze zdjęciem DSCF1231 — parallax */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <div ref={heroImgRef} className="absolute -inset-y-[15%] inset-x-0 will-change-transform">
          <img
            src="/images/kwiaciarnia/DSCF1231.jpg"
            alt="Dekoracje ślubne Royal Flowers"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.1) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-24 w-full">
          <p className="fade-up font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Florystyka ślubna</p>
          <h1
            aria-label="Dekoracje Ślubne"
            className="font-cormorant text-5xl md:text-6xl font-light text-cream leading-tight mb-6"
          >
            <LiteryNaglowka linie={[{ tekst: "Dekoracje" }, { tekst: "Ślubne", className: "italic" }]} />
          </h1>
          <div
            className="line-grow h-px bg-gold mb-8"
            style={{ ["--line-w" as string]: "60px", animationDelay: `${liczbaLiter * LITERY_DELAY}ms` }}
          />
          <p
            className="fade-up font-jost text-base text-cream/70 max-w-md leading-relaxed mb-6"
            style={{ animationDelay: `${liczbaLiter * LITERY_DELAY + 600}ms` }}
          >
            Tworzymy wyjątkowe dekoracje ślubne, które są odzwierciedleniem Waszej miłości
            i stylu. Od łuków przez dekoracje stołów, aż po bukiet panny młodej.
          </p>
          <p
            className="fade-up font-jost text-sm text-cream/50 max-w-sm leading-relaxed"
            style={{ animationDelay: `${liczbaLiter * LITERY_DELAY + 800}ms` }}
          >
            Każde wesele jest inne – dlatego każdy projekt tworzymy od podstaw,
            indywidualnie dla Was.
          </p>
        </div>
      </section>

      {/* Jak pracujemy */}
      <section className="py-20 px-6 md:px-16 bg-dark-800 border-b border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Proces</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Jak pracujemy</h2>
          </div>
          <div ref={stepsRef} className="relative">
            {/* Linia łącząca kroki — rysuje się od lewej (tylko gdy kroki są w jednym rzędzie) */}
            <svg
              aria-hidden="true"
              className="hidden lg:block absolute top-7 left-7 right-7 h-[2px] w-[calc(100%-3.5rem)]"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(201,168,76,0.12)" strokeWidth="2" />
              <line
                x1="0" y1="1" x2="100" y2="1"
                stroke="#c9a84c"
                strokeOpacity="0.6"
                strokeWidth="2"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={stepsVisible ? 0 : 1}
                style={{ transition: `stroke-dashoffset ${uslugi.length * STEP_DELAY + 400}ms ease-out` }}
              />
            </svg>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {uslugi.map((u, i) => (
                <KrokKarta key={u.nr} u={u} index={i} visible={stepsVisible} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Baner promocyjny */}
      <section
        ref={promoRef}
        className={`relative overflow-hidden transition-all duration-700 ease-out ${
          promoVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div
          className="animated-gradient group/promo transition-[filter] duration-500 hover:brightness-110"
          style={{
            backgroundImage: "linear-gradient(120deg, #5e4510 0%, #8a6a1f 30%, #b8952f 55%, #d4b452 75%, #8a6a1f 100%)",
            animationDuration: "15s",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <span className="text-5xl md:text-6xl leading-none drop-shadow-md" aria-hidden="true">🎨</span>
              <div className="[text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
                <h2 className="font-cormorant text-3xl md:text-5xl font-semibold text-white leading-tight">
                  Projekt wizualizacji GRATIS
                </h2>
                <p className="font-jost text-sm md:text-base text-white/90 mt-2">
                  Bez umowy, bez zobowiązań — po prostu porozmawiajmy o Waszym weselu
                </p>
              </div>
            </div>
            <Link
              href="/wesele"
              className="shrink-0 inline-flex items-center gap-3 border-2 border-white text-white font-jost text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300 hover:bg-white hover:text-dark focus-visible:bg-white focus-visible:text-dark focus-visible:outline-none"
            >
              Umów konsultację <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">Galeria</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Nasze realizacje ślubne</h2>
          </div>
          <Link
            href="/realizacje"
            className="group hidden md:inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold/60 hover:text-gold transition-colors duration-300"
          >
            Zobacz wszystkie
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-[5px]" />
          </Link>
        </div>

        <div ref={galRef} className="group/gal grid grid-cols-1 sm:grid-cols-2 gap-4">
          {galeria.map((g, i) => (
            <div
              key={g.src}
              className={`transition-all duration-[900ms] ease-out ${
                galVisible ? "opacity-100 translate-x-0" : `opacity-0 ${i % 2 === 0 ? "-translate-x-[50px]" : "translate-x-[50px]"}`
              }`}
              style={{ transitionDelay: galVisible ? `${i * 120}ms` : "0ms" }}
            >
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Powiększ zdjęcie: ${g.alt}`}
                className="group relative block w-full overflow-hidden cursor-pointer transition-opacity duration-500 group-hover/gal:opacity-60 hover:!opacity-100 focus-visible:!opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                style={{ borderRadius: "2px", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  className="w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ aspectRatio: "4/3", borderRadius: "2px", display: "block" }}
                />
                <span className="absolute inset-0 bg-dark/0 group-hover:bg-dark/45 group-focus-visible:bg-dark/45 transition-colors duration-500 flex items-center justify-center">
                  <span className="flex items-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-500 ease-out font-jost text-xs tracking-[0.3em] uppercase text-cream">
                    <Search size={18} strokeWidth={1.5} /> Zobacz więcej
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>

        <Link
          href="/realizacje"
          className="group md:hidden mt-8 inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold/60 hover:text-gold transition-colors duration-300"
        >
          Zobacz wszystkie
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-[5px]" />
        </Link>
      </section>

      {/* Opinie Par Młodych */}
      <section className="relative py-20 border-t border-gold/10 bg-dark-800 overflow-hidden">
        <div
          ref={opinieRef}
          className={`relative text-center mb-12 px-6 transition-all duration-1000 ease-out ${
            opinieVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -top-16 font-cormorant text-gold opacity-15 leading-none"
            style={{ fontSize: 200 }}
          >
            ❝
          </span>
          <p className="relative font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Opinie</p>
          <h2 className="relative font-cormorant text-4xl font-light text-cream">Co mówią o nas Pary Młode</h2>
        </div>
        <div className="space-y-6">
          <MarqueeOpinii opinie={opinieGora} kierunek="left" />
          <MarqueeOpinii opinie={opinieDol} kierunek="right" />
        </div>
      </section>

      {/* CTA kontakt */}
      <section className="relative py-24 px-6 border-t border-gold/10 overflow-hidden">
        <div
          aria-hidden="true"
          className="animated-gradient absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(120deg, #0e0c0a 0%, #1a1714 25%, #2a2116 50%, #1a1714 75%, #0e0c0a 100%)",
            animationDuration: "20s",
          }}
        />
        <FallingPetals intensity={0.6} />
        <div ref={ctaRef} className="relative max-w-2xl mx-auto text-center">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">Zaplanuj swój dzień</p>
          <h2 className="font-cormorant text-4xl font-light text-cream mb-4 leading-tight">
            <TypedHeading as="span" text="Zaplanujmy razem" start={ctaVisible} onDone={() => setCtaTyped(true)} />
            <span
              className={`block transition-all duration-700 ease-out ${ctaTyped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            >
              dekoracje Waszego wesela
            </span>
          </h2>
          <p
            className={`font-jost text-sm text-cream/45 mb-10 leading-relaxed transition-all duration-700 ease-out ${
              ctaTyped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: ctaTyped ? "250ms" : "0ms" }}
          >
            Skontaktuj się z nami jak najwcześniej, najlepiej co najmniej 3 miesiące przed datą ślubu,
            aby zapewnić dostępność i najlepsze kompozycje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/wesele"
              className="gold-pulse inline-flex items-center justify-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Wyślij zapytanie <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+48694285505"
              className="group inline-flex items-center justify-center gap-3 border border-gold/30 text-cream font-jost text-sm tracking-widest uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              <Phone size={14} className="phone-ring" /> Zadzwoń
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
