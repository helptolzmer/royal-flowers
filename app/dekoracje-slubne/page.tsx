import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

const galeria = [
  { src: "/images/wypozyczalnia/wypo-01.jpg", alt: "Wypożyczalnia by Megi – dekoracje na wesele" },
  { src: "/images/wypozyczalnia/wypo-02.jpg", alt: "Wypożyczalnia by Megi – aranżacja eventowa" },
  { src: "/images/wypozyczalnia/wypo-03.jpg", alt: "Wypożyczalnia by Megi – akcesoria ślubne" },
  { src: "/images/wypozyczalnia/wypo-04.jpg", alt: "Wypożyczalnia by Megi – dekoracje sali" },
];

const uslugi = [
  { nr: "01", tytul: "Konsultacja", opis: "Spotykamy się, słuchamy Waszych marzeń i tworzymy spójną wizję dekoracji." },
  { nr: "02", tytul: "Projekt", opis: "Przygotowujemy szczegółowy plan dekoracji z doborem kwiatów i kolorystyki." },
  { nr: "03", tytul: "Realizacja", opis: "Kompleksowa dekoracja sali, kościoła i plenerów w dniu ślubu." },
  { nr: "04", tytul: "Uprzątnięcie", opis: "Po ceremonii zajmujemy się posprzątaniem dekoracji, abyś mogła cieszyć się weselem." },
];

export default function DekoracjeSlubneePage() {
  return (
    <main className="pt-20 min-h-screen bg-dark">
      {/* Hero ze zdjęciem DSCF1231 */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <img
          src="/images/kwiaciarnia/DSCF1231.jpg"
          alt="Dekoracje ślubne Royal Flowers"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.1) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-24 w-full">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Florystyka ślubna</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream leading-tight mb-6">
            Dekoracje<br />
            <span className="italic">Ślubne</span>
          </h1>
          <div className="w-16 h-px bg-gold mb-8" />
          <p className="font-jost text-base text-cream/70 max-w-md leading-relaxed mb-6">
            Tworzymy wyjątkowe dekoracje ślubne, które są odzwierciedleniem Waszej miłości
            i stylu. Od łuków przez dekoracje stołów, aż po bukiet panny młodej.
          </p>
          <p className="font-jost text-sm text-cream/50 max-w-sm leading-relaxed">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {uslugi.map((u) => (
              <div key={u.nr} className="relative pl-6 border-l border-gold/15">
                <div className="absolute -left-1.5 top-0 w-3 h-3 border border-gold bg-dark-800" />
                <p className="font-cormorant text-3xl text-gold/30 mb-3">{u.nr}</p>
                <h3 className="font-cormorant text-lg text-cream mb-2">{u.tytul}</h3>
                <p className="font-jost text-sm text-cream/45 leading-relaxed">{u.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria – 2 zdjęcia + miejsca na więcej */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">Galeria</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Nasze realizacje ślubne</h2>
          </div>
          <Link
            href="/realizacje"
            className="hidden md:inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold/60 hover:text-gold transition-colors duration-300"
          >
            Zobacz wszystkie <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {galeria.map((g, i) => (
            <div
              key={i}
              className="group relative overflow-hidden"
              style={{ borderRadius: "2px", border: "1px solid rgba(201,168,76,0.2)" }}
            >
              <img
                src={g.src}
                alt={g.alt}
                className="w-full object-cover object-center transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                style={{ aspectRatio: "4/3", borderRadius: "2px", display: "block" }}
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-300 flex items-end p-5 opacity-0 group-hover:opacity-100">
                <p className="font-cormorant text-base text-cream">{g.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA kontakt */}
      <section className="py-24 px-6 border-t border-gold/10 bg-dark-800">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">Zaplanuj swój dzień</p>
          <h2 className="font-cormorant text-4xl font-light text-cream mb-4 leading-tight">
            Zaplanujmy razem dekoracje<br />Waszego wesela
          </h2>
          <p className="font-jost text-sm text-cream/45 mb-10 leading-relaxed">
            Skontaktuj się z nami jak najwcześniej, najlepiej co najmniej 3 miesiące przed datą ślubu,
            aby zapewnić dostępność i najlepsze kompozycje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/wesele"
              className="inline-flex items-center justify-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Wyślij zapytanie <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+48694285505"
              className="inline-flex items-center justify-center gap-3 border border-gold/30 text-cream font-jost text-sm tracking-widest uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              <Phone size={14} /> Zadzwoń
            </a>
          </div>
        </div>
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
