"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Aktualnosc } from "@/lib/aktualnosci";
import { useReveal } from "@/lib/animations";

const NA_START = 4;

// Placeholder, gdy aktualności jest mniej niż 3
const PLACEHOLDERY: Aktualnosc[] = [
  {
    id: "placeholder-jesien",
    tytul: "Nowa kolekcja jesienna",
    opis: "Chryzantemy, wrzosy, dynie — jesienna atmosfera już w naszej kwiaciarni i kwiatomatach.",
    data: "PAŹDZIERNIK 2026",
    zdjecie: "",
  },
];

function KartaAktualnosci({ a, index, visible }: { a: Aktualnosc; index: number; visible: boolean }) {
  const opisRef = useRef<HTMLParagraphElement>(null);
  const [rozwiniety, setRozwiniety] = useState(false);
  const [przyciety, setPrzyciety] = useState(false);

  // "Czytaj więcej" rozwija opis tylko wtedy, gdy faktycznie się nie mieści w 3 liniach
  useEffect(() => {
    const el = opisRef.current;
    if (!el) return;
    const sprawdz = () => setPrzyciety(el.scrollHeight > el.clientHeight + 1);
    sprawdz();
    window.addEventListener("resize", sprawdz);
    return () => window.removeEventListener("resize", sprawdz);
  }, []);

  const czytajWiecejClass =
    "mt-auto pt-4 self-start inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-[#D4A843] focus-visible:outline-none focus-visible:underline";
  const strzalka = (
    <ArrowRight
      size={13}
      className={`transition-transform duration-300 group-hover:translate-x-1 ${!a.link && rozwiniety ? "-rotate-90" : ""}`}
    />
  );
  // Z linkiem — cała karta jest linkiem; bez linku — przycisk rozwija opis
  const czytajWiecej = a.link ? (
    <span className={czytajWiecejClass}>Czytaj więcej {strzalka}</span>
  ) : (
    <button type="button" onClick={() => setRozwiniety((r) => !r)} aria-expanded={rozwiniety} className={czytajWiecejClass}>
      {rozwiniety ? "Zwiń" : "Czytaj więcej"} {strzalka}
    </button>
  );

  const tresc = (
    <>
      <div className="relative aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-dark-700 to-dark">
        {a.zdjecie ? (
          <img
            src={a.zdjecie}
            alt={a.tytul}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.08]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-40" aria-hidden="true">🍂</span>
        )}
        <span className="absolute top-3 left-3 rounded-[6px] bg-black/70 backdrop-blur-[4px] px-3 py-1 font-jost text-[11px] tracking-[1px] text-[#D4A843]">
          {a.data}
        </span>
      </div>
      <div className="flex flex-1 flex-col bg-[#1a1a1a] p-5 rounded-b-xl">
        <h3 className="font-jost text-lg font-bold text-white leading-snug mb-2">{a.tytul}</h3>
        <p ref={opisRef} className={`font-jost text-sm text-[#999] leading-relaxed ${rozwiniety ? "" : "line-clamp-3"}`}>
          {a.opis}
        </p>
        {(a.link || przyciety || rozwiniety) && czytajWiecej}
      </div>
    </>
  );

  const kartaClass =
    "group flex h-full flex-col rounded-xl border border-white/[0.06] text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[rgba(212,168,67,0.3)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:border-[rgba(212,168,67,0.6)] focus-within:border-[rgba(212,168,67,0.3)]";

  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: visible ? `${(index % NA_START) * 100}ms` : "0ms" }}
    >
      {a.link ? (
        <Link href={a.link} className={kartaClass}>{tresc}</Link>
      ) : (
        <article className={kartaClass}>{tresc}</article>
      )}
    </div>
  );
}

export default function AktualnosciKarty({ items }: { items: Aktualnosc[] }) {
  const [ref, visible] = useReveal<HTMLDivElement>(0.15);
  const [wszystkie, setWszystkie] = useState(false);

  const lista = items.length < 3 ? [...items, ...PLACEHOLDERY].slice(0, Math.max(items.length, 3)) : items;
  const widoczne = wszystkie ? lista : lista.slice(0, NA_START);

  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {widoczne.map((a, i) => (
          <KartaAktualnosci key={a.id} a={a} index={i} visible={visible} />
        ))}
      </div>
      {lista.length > NA_START && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setWszystkie((w) => !w)}
            className="group inline-flex items-center gap-3 border border-gold/30 text-cream font-jost text-xs tracking-widest uppercase px-8 py-3 hover:border-gold hover:text-gold transition-all duration-300"
          >
            {wszystkie ? "Mniej" : `Więcej (${lista.length - NA_START})`}
          </button>
        </div>
      )}
    </div>
  );
}
