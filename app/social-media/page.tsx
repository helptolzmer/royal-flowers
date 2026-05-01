import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media – Royal Flowers",
  description: "Obserwuj Royal Flowers na Instagramie i Facebooku. Codzienne inspiracje florystyczne, nowości w kwiatomatach i dekoracje ślubne.",
};

function IconInstagram() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const karty = [
  {
    numer: "01",
    tytul: "Kwiaciarnia Royal Flowers",
    opis: "Codzienne inspiracje, nowe kompozycje i życie naszej kwiaciarni",
    linki: [
      {
        ikona: "ig" as const,
        platforma: "Instagram",
        handle: "@kwiaciarnia_royal_flowers",
        href: "https://www.instagram.com/kwiaciarnia_royal_flowers/",
      },
      {
        ikona: "fb" as const,
        platforma: "Facebook",
        handle: "KwiaciarniaRoyalFlowers",
        href: "https://www.facebook.com/KwiaciarniaRoyalFlowers",
      },
    ],
  },
  {
    numer: "02",
    tytul: "Kwiatomaty Royal Flowers",
    opis: "Nowości w naszych kwiatomatach, nowe lokalizacje i promocje",
    linki: [
      {
        ikona: "ig" as const,
        platforma: "Instagram",
        handle: "@kwiatomaty_royalflowers",
        href: "https://www.instagram.com/kwiatomaty_royalflowers/",
      },
    ],
  },
  {
    numer: "03",
    tytul: "Wypożyczalnia by Megi",
    opis: "Dekoracje i akcesoria na wynajem — wesela, eventy, imprezy",
    linki: [
      {
        ikona: "ig" as const,
        platforma: "Instagram",
        handle: "@wypozyczalniabymegi",
        href: "https://www.instagram.com/wypozyczalniabymegi/",
      },
      {
        ikona: "fb" as const,
        platforma: "Facebook",
        handle: "Wypożyczalnia by Megi",
        href: "https://www.facebook.com/profile.php?id=61585446016344",
      },
      {
        ikona: "web" as const,
        platforma: "Strona www",
        handle: "partyrenting.pl",
        href: "https://partyrenting.pl",
      },
    ],
  },
];

function Ikona({ typ }: { typ: "ig" | "fb" | "web" }) {
  if (typ === "ig") return <IconInstagram />;
  if (typ === "fb") return <IconFacebook />;
  return <IconGlobe />;
}

export default function SocialMediaPage() {
  return (
    <main className="pt-20 min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden border-b border-gold/10">
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(ellipse at 50% 80%, #c9a84c28 0%, transparent 65%)" }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="font-jost text-xs tracking-[0.6em] uppercase text-gold mb-6">
            Royal Flowers
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream leading-tight mb-5">
            Znajdź nas<br />
            <span className="italic">w social mediach</span>
          </h1>
          <div className="w-14 h-px bg-gold mx-auto mb-6" />
          <p className="font-jost text-base text-cream/55 leading-relaxed">
            Obserwuj nas i bądź na bieżąco z nowościami Royal Flowers
          </p>
        </div>
      </section>

      {/* Karty – jedna pod drugą */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-[700px] mx-auto flex flex-col gap-6">
          {karty.map((karta) => (
            <article
              key={karta.numer}
              className="group border border-gold/15 bg-dark-800 p-10 transition-all duration-500 hover:border-gold/35 hover:shadow-[0_0_48px_0_rgba(201,168,76,0.14)]"
            >
              {/* Nagłówek karty */}
              <div className="flex items-start gap-6 mb-8">
                <span className="font-cormorant text-5xl font-light text-gold/18 leading-none select-none shrink-0 group-hover:text-gold/30 transition-colors duration-500">
                  {karta.numer}
                </span>
                <div className="pt-1">
                  <h2 className="font-cormorant text-2xl md:text-3xl font-light text-cream mb-2">
                    {karta.tytul}
                  </h2>
                  <p className="font-jost text-sm text-cream/45 leading-relaxed">
                    {karta.opis}
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-gold/10 mb-8" />

              {/* Linki */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {karta.linki.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-5 border border-gold/10 px-6 py-5 hover:border-gold/40 hover:bg-gold/[0.04] transition-all duration-300"
                  >
                    {/* Ikona */}
                    <span className="text-gold/55 group-hover/link:text-gold transition-colors duration-300 shrink-0">
                      <Ikona typ={l.ikona} />
                    </span>

                    {/* Tekst */}
                    <div className="min-w-0 flex-1">
                      <p className="font-jost text-[10px] tracking-[0.35em] uppercase text-gold/45 group-hover/link:text-gold/75 transition-colors duration-300 mb-1">
                        {l.platforma}
                      </p>
                      <p className="font-jost text-sm text-cream/55 group-hover/link:text-cream transition-colors duration-300 truncate">
                        {l.handle}
                      </p>
                    </div>

                    {/* Przycisk */}
                    <span className="shrink-0 font-jost text-[10px] tracking-widest uppercase border border-gold/20 text-gold/40 group-hover/link:border-gold group-hover/link:text-gold px-4 py-2 transition-all duration-300 hidden sm:block whitespace-nowrap">
                      {l.ikona === "web" ? "Odwiedź" : "Obserwuj"}
                    </span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
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
