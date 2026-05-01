import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Wifi, WifiOff, ArrowRight, Package } from "lucide-react";

/**
 * ZDJĘCIE TŁA HERO:
 * Wrzuć plik do /public/images/ i ustaw:
 *   const HERO_BG = "/images/NAZWA_PLIKU.jpg"
 * Gdy null → wyświetla gradient placeholder.
 * Zdjęcie kwiatomatu jest już dostępne jako /images/kwiatomat.jpg
 */
const HERO_BG: string | null = "/images/kwiatomat.jpg";

const kwiatomaty = [
  {
    id: 1,
    nazwa: "Kwiatomat #1 – ul. Witosa",
    adres: "ul. Wincentego Witosa 110, Nowy Sącz",
    dzielnica: "Nowy Sącz",
    godziny: "Całą dobę, 24/7",
    online: true,
    dostepne: 8,
    produkty: ["Róże", "Tulipany", "Lilie", "Goździki"],
    opis: "Kwiatomat przy ul. Witosa – dostępny całą dobę, świeże kompozycje każdego dnia.",
  },
  {
    id: 2,
    nazwa: "Kwiatomat #2 – Galeria Trzy Korony",
    adres: "Naprzeciwko Galerii Trzy Korony, Nowy Sącz",
    dzielnica: "Nowy Sącz",
    godziny: "Całą dobę, 24/7",
    online: true,
    dostepne: 11,
    produkty: ["Peonie", "Frezje", "Róże", "Stokrotki"],
    opis: "Doskonała lokalizacja przy centrum handlowym, łatwy dojazd i parking.",
  },
  {
    id: 3,
    nazwa: "Kwiatomat #3 – al. Wolności",
    adres: "al. Wolności 10A, Nowy Sącz",
    dzielnica: "Nowy Sącz",
    godziny: "Całą dobę, 24/7",
    online: true,
    dostepne: 6,
    produkty: ["Hortensje", "Orchidee", "Tulipany", "Róże"],
    opis: "W sercu miasta przy Alei Wolności – idealne miejsce na spontaniczny podarunek.",
  },
  {
    id: 4,
    nazwa: "Kwiatomat #4 – Plac Dąbrowskiego",
    adres: "Plac Dąbrowskiego 2, Nowy Sącz",
    dzielnica: "Nowy Sącz",
    godziny: "Całą dobę, 24/7",
    online: true,
    dostepne: 8,
    produkty: ["Róże", "Chryzantemy", "Mieczyki", "Tulipany"],
    opis: "Reprezentacyjna lokalizacja w centrum – największy wybór premium kompozycji.",
  },
  {
    id: 5,
    nazwa: "Kwiatomat #5 – Galeria Gołąbkowice",
    adres: "Przy wejściu do Galerii Gołąbkowice, Nowy Sącz",
    dzielnica: "Nowy Sącz",
    godziny: "Całą dobę, 24/7",
    online: true,
    dostepne: 8,
    produkty: ["Lawendy", "Narcyzy", "Frezje", "Peonie"],
    opis: "Wygodna lokalizacja przy wejściu do galerii – kwiaty po zakupach.",
  },
  {
    id: 6,
    nazwa: "Kwiatomat #6 – Stacja Orlen Stary Sącz",
    adres: "Przed wejściem Stacja Orlen, Stary Sącz",
    dzielnica: "Stary Sącz",
    godziny: "Całą dobę, 24/7",
    online: true,
    dostepne: 8,
    produkty: ["Róże", "Tulipany", "Goździki", "Lilie"],
    opis: "Kwiatomat przy stacji paliw w Starym Sączu – dostępny całą dobę, 7 dni w tygodniu.",
  },
];

export default function KwiatomatyPage() {
  const onlineCount = kwiatomaty.filter((k) => k.online).length;

  return (
    <main className="pt-20 min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden min-h-[500px] flex items-center">
        {/* === ZDJĘCIE TŁA – podmień HERO_BG na ścieżkę pliku === */}
        {HERO_BG ? (
          <Image
            src={HERO_BG}
            alt="Kwiatomat Royal Flowers 24h"
            fill
            priority
            className="object-cover object-center"
          />
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
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
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <p className="font-cormorant text-5xl font-light text-gold">{kwiatomaty.length}</p>
                <p className="font-jost text-xs text-cream/40 tracking-wider mt-1">Automatów</p>
              </div>
              <div className="text-center">
                <p className="font-cormorant text-5xl font-light text-gold">{onlineCount}</p>
                <p className="font-jost text-xs text-cream/40 tracking-wider mt-1">Online</p>
              </div>
              <div className="text-center">
                <p className="font-cormorant text-5xl font-light text-gold">24/7</p>
                <p className="font-jost text-xs text-cream/40 tracking-wider mt-1">Dostęp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid automatów */}
      <section className="pb-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px bg-gold/40" />
          <p className="font-jost text-xs tracking-[0.4em] uppercase text-cream/40">
            Wszystkie lokalizacje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {kwiatomaty.map((k) => (
            <article
              key={k.id}
              className={`relative border transition-all duration-500 group hover:-translate-y-1 ${
                k.online
                  ? "border-gold/15 hover:border-gold/35 bg-dark-800"
                  : "border-cream/5 bg-dark-700 opacity-75"
              }`}
            >
              {/* Status bar */}
              <div
                className={`h-0.5 w-full transition-all duration-300 ${
                  k.online ? "bg-gold" : "bg-cream/10"
                }`}
              />

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="font-jost text-xs tracking-[0.3em] uppercase text-gold/60 block mb-2">
                      {k.dzielnica}
                    </span>
                    <h2 className="font-cormorant text-base font-medium text-cream leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                      {k.nazwa}
                    </h2>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-jost tracking-wider ${
                      k.online
                        ? "bg-gold/10 text-gold"
                        : "bg-cream/5 text-cream/30"
                    }`}
                  >
                    {k.online ? (
                      <>
                        <Wifi size={11} />
                        Online
                      </>
                    ) : (
                      <>
                        <WifiOff size={11} />
                        Offline
                      </>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-cream/50">
                    <MapPin size={14} className="text-gold/60 shrink-0" />
                    <span className="font-jost text-sm">{k.adres}</span>
                  </div>
                  <div className="flex items-center gap-3 text-cream/50">
                    <Clock size={14} className="text-gold/60 shrink-0" />
                    <span className="font-jost text-sm">{k.godziny}</span>
                  </div>
                  {k.online && (
                    <div className="flex items-center gap-3 text-cream/50">
                      <Package size={14} className="text-gold/60 shrink-0" />
                      <span className="font-jost text-sm">
                        {k.dostepne} kompozycji dostępnych
                      </span>
                    </div>
                  )}
                </div>

                {/* Opis */}
                <p className="font-jost text-xs text-cream/35 leading-relaxed mb-6 border-t border-gold/10 pt-4">
                  {k.opis}
                </p>

                {/* Produkty */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {k.produkty.map((p) => (
                    <span
                      key={p}
                      className="font-jost text-xs px-2.5 py-1 border border-gold/15 text-cream/50 tracking-wider"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {k.online && (
                  <Link
                    href="/zamow"
                    className="inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300 group-hover:gap-3"
                  >
                    Zamów odbiór <ArrowRight size={13} />
                  </Link>
                )}
                {!k.online && (
                  <p className="font-jost text-xs text-cream/25 tracking-wider uppercase">
                    Niedostępny tymczasowo
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Info sekcja */}
      <section className="border-t border-gold/10 bg-dark-800 py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">
            Jak to działa?
          </p>
          <h2 className="font-cormorant text-4xl font-light text-cream mb-12">
            Odbiór w 3 krokach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { krok: "01", tytul: "Zamów online", opis: "Wybierz kompozycję i automat na naszej stronie." },
              { krok: "02", tytul: "Odbierz SMS", opis: "Otrzymasz kod RF-XXXX potwierdzający zamówienie." },
              { krok: "03", tytul: "Wpisz kod", opis: "Podejdź do automatu, wpisz kod i odbierz kwiaty." },
            ].map((s) => (
              <div key={s.krok} className="text-center">
                <p className="font-cormorant text-5xl font-light text-gold/30 mb-3">{s.krok}</p>
                <h3 className="font-jost text-sm font-medium text-cream tracking-wider mb-2">{s.tytul}</h3>
                <p className="font-jost text-xs text-cream/40 leading-relaxed">{s.opis}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/zamow"
              className="inline-flex items-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Zamów teraz <ArrowRight size={16} />
            </Link>
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
