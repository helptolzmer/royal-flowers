import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight, Heart, Star, Award, Flower2 } from "lucide-react";
import AktualnosciSlider, { Aktualnosc } from "@/components/AktualnosciSlider";
import KwiatySlider from "@/components/KwiatySlider";

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

const uslugi = [
  { icon: Heart, label: "Wesela & Śluby", desc: "Kompleksowa florystyka ślubna" },
  { icon: Flower2, label: "Bukiety", desc: "Na każdą okazję" },
  { icon: Star, label: "Wieńce", desc: "Żałobne i okolicznościowe" },
  { icon: Award, label: "Dekoracje", desc: "Eventy i biura" },
];

function getAktualnosci(): Aktualnosc[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "data", "aktualnosci.json"),
      "utf-8"
    );
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function KwiaciarniaPage() {
  const aktualnosci = getAktualnosci();

  return (
    <main className="pt-20 min-h-screen bg-dark">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <img
          src="/images/kwiaciarnia/DSCF1679.jpg"
          alt="Kwiaciarnia Royal Flowers – właścicielka z bukietem"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.15) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-24 w-full">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
            Florystyka Artystyczna
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light text-cream leading-none mb-6 whitespace-nowrap">
            Kwiaciarnia
          </h1>
          <div className="w-16 h-px bg-gold mb-8" />
          <p className="font-jost text-base text-cream/70 max-w-md leading-relaxed">
            Tworzymy wyjątkowe kompozycje kwiatowe, które opowiadają Twoją
            historię. Każdy bukiet to dzieło sztuki, stworzone z pasji i
            dbałości o detal.
          </p>
        </div>
      </section>

      {/* ── Pasek usług ──────────────────────────────────── */}
      <section className="border-y border-gold/15 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/15">
          {uslugi.map((u) => (
            <div key={u.label} className="px-8 py-4 flex items-center gap-4">
              <u.icon className="text-gold shrink-0" size={20} />
              <div>
                <p className="font-jost text-sm font-medium text-cream">{u.label}</p>
                <p className="font-jost text-xs text-cream/40">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Aktualności ──────────────────────────────────── */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
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
          <AktualnosciSlider items={aktualnosci} />
        </div>
      </section>

      {/* ── Znaczenie Kwiatów ────────────────────────────── */}
      <section className="py-20 bg-dark-800 border-y border-gold/10">
        <div className="max-w-5xl mx-auto px-6 md:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">
                Symbolika
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
                Znaczenie Kwiatów
              </h2>
            </div>
            <div className="hidden md:block w-24 h-px bg-gold/30" />
          </div>
          <KwiatySlider />
        </div>
      </section>

      {/* ── Nasze Realizacje ─────────────────────────────── */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">Portfolio</p>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">
              Nasze Realizacje
            </h2>
          </div>
          <div className="hidden md:block w-24 h-px bg-gold/30" />
        </div>

        <div className="gap-4" style={{ columnCount: 4, columnGap: "1rem" }}>
          {galeria.map((g, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 overflow-hidden rounded-[2px] group cursor-pointer relative"
            >
              <img
                src={g.src}
                alt={g.alt}
                className="w-full block object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
                style={{ borderRadius: "2px" }}
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-400 flex items-end p-4 opacity-0 group-hover:opacity-100">
                <span className="font-jost text-xs tracking-widest uppercase text-gold">
                  {g.kategoria}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/realizacje"
            className="inline-flex items-center gap-3 border border-gold/30 text-cream font-jost text-xs tracking-widest uppercase px-8 py-3 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Zobacz pełne portfolio <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-dark-800 border-t border-gold/10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">
            Zrealizujmy Twoje marzenie
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-6 leading-tight">
            Gotowy na wyjątkowe zamówienie?
          </h2>
          <p className="font-jost text-sm text-cream/50 mb-10 leading-relaxed">
            Skontaktuj się z nami, aby omówić szczegóły Twojej kompozycji.
            Każde zlecenie traktujemy indywidualnie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zamow"
              className="inline-flex items-center justify-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Zamów teraz <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+48600000000"
              className="inline-flex items-center justify-center gap-3 border border-gold/40 text-cream font-jost text-sm tracking-widest uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Zadzwoń do nas
            </a>
          </div>
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
