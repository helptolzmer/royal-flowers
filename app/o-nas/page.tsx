import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Award, Leaf, Star } from "lucide-react";

const wartosci = [
  { icon: Heart, tytul: "Pasja", opis: "Każda kompozycja powstaje z miłości do kwiatów i dbałości o najdrobniejszy detal." },
  { icon: Award, tytul: "Jakość", opis: "Pracujemy wyłącznie ze sprawdzonymi dostawcami, by kwiaty były zawsze świeże i piękne." },
  { icon: Leaf, tytul: "Ekologia", opis: "Dbamy o środowisko – nasze opakowania są biodegradowalne, a odpady minimalizowane." },
  { icon: Star, tytul: "Doświadczenie", opis: "Ponad 10 lat na rynku florystycznym i setki zadowolonych klientów." },
];

const naszaPraca = [
  { src: "/images/kwiaciarnia/kulisami-wianek.jpg",  alt: "Florystka w wianku z kwiatów – rzemiosło Royal Flowers" },
  { src: "/images/kwiaciarnia/DSCF1375.jpg",         alt: "Florystka Royal Flowers – pasja i uśmiech przy pracy" },
  { src: "/images/kwiaciarnia/DSCF1366.jpg",         alt: "Florystka skupiona na tworzeniu kompozycji" },
  { src: "/images/kwiaciarnia/DSCF1163.jpg",         alt: "Zespół Royal Flowers z pudełkiem kwiatowym" },
];

export default function ONasPage() {
  return (
    <main className="pt-20 min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden border-b border-gold/10">
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(ellipse at 30% 60%, #c9a84c22 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto relative grid md:grid-cols-2 gap-16 items-center">
          <div>
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
          <div className="flex items-center justify-center">
            <div className="relative w-72 h-72 flex items-center justify-center border border-gold/15 bg-dark-800">
              <Image src="/images/logo.png" alt="Royal Flowers logo" width={260} height={260} className="object-contain p-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Historia timeline */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { rok: "2007", tytul: "Pierwsza kwiaciarnia", opis: "Otwarcie pierwszej kwiaciarni Royal Flowers w Nowym Sączu." },
            { rok: "2023", tytul: "Nowa kwiaciarnia", opis: "Otwarcie nowej, większej kwiaciarni przy al. Wolności 10A." },
            { rok: "2023", tytul: "Pierwszy kwiatomat", opis: "Uruchomienie pierwszego kwiatomatu 24/7 w Nowym Sączu." },
          ].map((e, i) => (
            <div key={i} className="border-l border-gold/20 pl-8 relative">
              <div className="absolute -left-1.5 top-0 w-3 h-3 border border-gold bg-dark" />
              <p className="font-cormorant text-4xl text-gold/60 mb-2">{e.rok}</p>
              <h3 className="font-cormorant text-xl text-cream mb-3">{e.tytul}</h3>
              <p className="font-jost text-sm text-cream/50 leading-relaxed">{e.opis}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wartości */}
      <section className="py-20 px-6 md:px-16 bg-dark-800 border-y border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Co nas wyróżnia</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Nasze wartości</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wartosci.map((w) => (
              <div key={w.tytul} className="text-center p-8 border border-gold/10 hover:border-gold/25 transition-colors duration-300">
                <w.icon className="text-gold mx-auto mb-5" size={24} />
                <h3 className="font-cormorant text-xl text-cream mb-3">{w.tytul}</h3>
                <p className="font-jost text-sm text-cream/45 leading-relaxed">{w.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zespół – zdjęcia */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Ludzie</p>
          <h2 className="font-cormorant text-4xl font-light text-cream">Nasz zespół</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Duże zdjęcie – właścicielka solo */}
          <div className="overflow-hidden rounded-[2px] group relative">
            <img
              src="/images/kwiaciarnia/DSCF1155.jpg"
              alt="Właścicielka Royal Flowers"
              className="w-full aspect-[3/4] object-cover object-center transition-transform duration-[400ms] group-hover:scale-105"
              style={{ borderRadius: "2px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <p className="font-cormorant text-xl text-cream">Małgorzata</p>
                <p className="font-jost text-xs text-gold tracking-wider">Główna Florystka & Założycielka</p>
              </div>
            </div>
          </div>
          {/* Drugie zdjęcie – właścicielka z córką/pracownicą */}
          <div className="overflow-hidden rounded-[2px] group relative">
            <img
              src="/images/kwiaciarnia/DSCF1210.jpg"
              alt="Zuza – Florystka Royal Flowers"
              className="w-full aspect-[3/4] object-cover object-center transition-transform duration-[400ms] group-hover:scale-105"
              style={{ borderRadius: "2px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <p className="font-cormorant text-xl text-cream">Zuza</p>
                <p className="font-jost text-xs text-gold tracking-wider">Florystka, Royal Flowers Nowy Sącz</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nasza praca – 4 zdjęcia */}
      <section className="py-20 px-6 md:px-16 bg-dark-800 border-t border-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Za kulisami</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Nasza praca</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {naszaPraca.map((z, i) => (
              <div key={i} className="overflow-hidden rounded-[2px] group">
                <img
                  src={z.src}
                  alt={z.alt}
                  className="w-full aspect-[3/4] object-cover object-center transition-transform duration-[400ms] group-hover:scale-105"
                  style={{ borderRadius: "2px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-gold/10 text-center">
        <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-6">Dołącz do nas</p>
        <h2 className="font-cormorant text-4xl font-light text-cream mb-8">Masz pytania? Porozmawiajmy.</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/zamow"
            className="inline-flex items-center justify-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold-light transition-colors duration-300"
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
