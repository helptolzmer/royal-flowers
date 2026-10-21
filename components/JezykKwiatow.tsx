"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, useReveal } from "@/lib/animations";

const kwiaty = [
  {
    nazwa: "Czerwona Róża",
    haslo: "Miłość & Namiętność",
    znaczenie:
      "Symbol głębokiej miłości i namiętności. Czerwona róża to najsilniejszy kwiatowy wyraz uczuć – wyznanie miłości bez słów, gest, który mówi więcej niż tysiąc zdań.",
    zdjecie: "/images/czerwona-roza-1.png",
  },
  {
    nazwa: "Różowa Róża",
    haslo: "Wdzięczność & Podziw",
    znaczenie:
      "Wyraża wdzięczność, delikatną sympatię i podziw. Różowe róże to idealny dar dla kogoś, kogo cenimy – łączą elegancję z ciepłem i szczerą troską.",
    zdjecie: "/images/rozowa-roza.png",
  },
  {
    nazwa: "Biała Róża",
    haslo: "Czystość & Nowy Początek",
    znaczenie:
      "Czystość, niewinność i nowy początek. Biała róża towarzyszy ślubom i chwilom głębokiej refleksji. Symbolizuje szczerość intencji i czystość ducha.",
    zdjecie: "/images/biala-roza.png",
  },
  {
    nazwa: "Tulipan",
    haslo: "Doskonała Miłość",
    znaczenie:
      "Doskonała, bezwarunkowa miłość. W języku kwiatów tulipan wyraża deklarację uczuć – czerwony oznacza namiętność, żółty beztroską radość, fioletowy – królewską dumę.",
    zdjecie: "/images/tulipan.png",
  },
  {
    nazwa: "Słonecznik",
    haslo: "Wierność & Radość",
    znaczenie:
      "Symbol słońca, ciepła i lojalności. Słonecznik podąża za słońcem przez cały dzień – jak oddany przyjaciel, który zawsze jest po Twojej stronie.",
    zdjecie: "/images/slonecznik.png",
  },
  {
    nazwa: "Lilia",
    haslo: "Majestat & Wzniosłość",
    znaczenie:
      "Symbol królewskiej godności i wzniosłości duchowej. Biała lilia od wieków towarzyszy uroczystościom i refleksji – kwiat wyjątkowych, niepowtarzalnych chwil.",
    zdjecie: "/images/lilia.png",
  },
  {
    nazwa: "Frezja",
    haslo: "Zaufanie & Przyjaźń",
    znaczenie:
      "Symbolizuje niewinność, szczerość i trwałą przyjaźń. Jej intensywny, słodki zapach pozostaje w pamięci na długo – tak jak wierna, sprawdzona przyjaźń.",
    zdjecie: "/images/frezja.png",
  },
];

const PARALLAX_PX = 10;

// Zdjęcie przesuwa się w pionie od -10px do +10px zależnie od położenia karty na ekranie
function useImageParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
      const y = Math.max(-1, Math.min(1, t)) * -PARALLAX_PX;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return ref;
}

function KartaKwiatu({ k, index, visible }: { k: (typeof kwiaty)[number]; index: number; visible: boolean }) {
  const parallaxRef = useImageParallax<HTMLDivElement>();
  const delay = index * 80;

  return (
    <li
      className={`relative hover:z-30 focus-within:z-30 w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      <div
        tabIndex={0}
        aria-label={`${k.nazwa} — ${k.haslo}`}
        className="group relative transition-transform duration-300 ease-out hover:-translate-y-1.5 focus-visible:-translate-y-1.5 focus-visible:outline-none"
      >
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.06] bg-dark-700 transition-colors duration-300 group-hover:border-[rgba(212,168,67,0.3)] group-focus-visible:border-[rgba(212,168,67,0.6)]">
          {/* Parallax na wrapperze, zoom na samym zdjęciu — żeby transformacje się nie gryzły */}
          <div ref={parallaxRef} className="absolute -inset-y-[10px] inset-x-0 will-change-transform">
            <img
              src={k.zdjecie}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.08]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          <div
            className={`absolute inset-x-0 bottom-0 p-4 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: visible ? `${delay + 350}ms` : "0ms" }}
          >
            <h3 className="font-jost text-xl font-bold text-white leading-tight">{k.nazwa}</h3>
            <p className="font-jost text-xs uppercase tracking-[1px] text-[#D4A843] mt-1">{k.haslo}</p>
          </div>
        </div>

        {/* Opis — rozwija się pod kartą (na dotykowych widoczny zawsze) */}
        <div className="flower-desc">
          <div className="overflow-hidden">
            <p className="mt-2 rounded-xl bg-[#1a1a1a] border border-white/[0.06] p-4 font-jost text-[13px] leading-relaxed text-[#999] shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
              {k.znaczenie}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

// 7 kwiatów → siatka 4 + 3 (ostatni rząd wycentrowany)
export default function JezykKwiatow() {
  const [ref, visible] = useReveal<HTMLUListElement>(0.15);
  return (
    <ul ref={ref} className="flex flex-wrap justify-center gap-6">
      {kwiaty.map((k, i) => (
        <KartaKwiatu key={k.nazwa} k={k} index={i} visible={visible} />
      ))}
    </ul>
  );
}
