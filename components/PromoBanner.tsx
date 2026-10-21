import { ArrowDown } from "lucide-react";

export interface PromoTekst {
  naglowek: string;
  podtytul: string;
}

// Baner promocyjny bez zdjęć — ciemny gradient, złoty akcent, przycisk przewijający do produktów
export default function PromoBanner({
  naglowek,
  podtytul,
  celId = "produkty",
  przycisk = "Zobacz kolekcję",
}: PromoTekst & { celId?: string; przycisk?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] border border-[#D4A843]/25 px-6 py-10 md:px-14 md:py-12">
      {/* Złote akcenty dekoracyjne */}
      <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4A843] via-[#D4A843]/60 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,168,67,0.18) 0%, transparent 70%)" }}
      />
      <div aria-hidden="true" className="absolute right-10 bottom-6 w-40 h-40 rounded-full border border-[#D4A843]/10" />
      <div aria-hidden="true" className="absolute right-16 bottom-12 w-24 h-24 rounded-full border border-[#D4A843]/15" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#D4A843] mb-3">Royal Flowers poleca</p>
          <h2 className="font-cormorant text-3xl md:text-4xl font-light text-white leading-tight">{naglowek}</h2>
          <div className="w-12 h-px bg-[#D4A843] my-4" />
          <p className="font-jost text-sm md:text-base text-white/60 leading-relaxed">{podtytul}</p>
        </div>
        <a
          href={`#${celId}`}
          className="group shrink-0 self-start md:self-center inline-flex items-center gap-3 rounded-lg border border-[#D4A843] px-7 py-3.5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#D4A843] transition-all duration-300 hover:bg-[#D4A843] hover:text-[#1a1a1a] hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]"
        >
          {przycisk}
          <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
