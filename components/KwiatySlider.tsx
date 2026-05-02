"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function KwiatySlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % kwiaty.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + kwiaty.length) % kwiaty.length);
  const next = () => setCurrent((c) => (c + 1) % kwiaty.length);

  return (
    <div className="relative">
      {/* Track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {kwiaty.map((k, i) => (
            <div key={i} className="min-w-full grid md:grid-cols-2 border border-gold/10">
              {/* Left – image */}
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative">
                <img
                  src={k.zdjecie}
                  alt={k.nazwa}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/10 to-transparent pointer-events-none" />
              </div>

              {/* Right – content */}
              <div className="bg-dark-700 p-8 md:p-14 flex flex-col justify-center">
                <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold/60 mb-2">
                  Znaczenie kwiatu
                </p>
                <p className="font-jost text-xs tracking-[0.3em] uppercase text-gold mb-5">
                  {k.haslo}
                </p>
                <h3 className="font-cormorant text-4xl md:text-5xl font-light text-cream mb-4 leading-none">
                  {k.nazwa}
                </h3>
                <div className="w-12 h-px bg-gold mb-6" />
                <p className="font-jost text-sm text-cream/65 leading-relaxed max-w-sm">
                  {k.znaczenie}
                </p>
                {/* Counter */}
                <p className="font-jost text-xs text-cream/20 mt-8 tracking-widest">
                  {String(current + 1).padStart(2, "0")} / {String(kwiaty.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow – left */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-gold/30 text-gold bg-dark/60 hover:border-gold hover:bg-gold/10 transition-all duration-300 z-10"
        aria-label="Poprzedni kwiat"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Arrow – right */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border border-gold/30 text-gold bg-dark/60 hover:border-gold hover:bg-gold/10 transition-all duration-300 z-10"
        aria-label="Następny kwiat"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {kwiaty.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={kwiaty[i].nazwa}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold w-6" : "bg-gold/30 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
