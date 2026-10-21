import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import ShopCategoryGrid from "@/components/ShopCategoryGrid";
import BestsellersMarquee from "@/components/BestsellersMarquee";
import PromoBanner, { type PromoTekst } from "@/components/PromoBanner";

// Krótki opis w banerze kategorii. Brak wpisu → opis z danych kategorii.
const BANNER_TEXT: Record<string, string> = {
  "bukiety-naturalne":
    "Kolekcja bukietów naturalnych łączy lekkość z elegancką kompozycją florystyczną",
  "bukiety-nowoczesne": "Nowoczesne aranżacje kwiatowe o odważnym, designerskim charakterze",
  flowerboxy: "Eleganckie kompozycje w pudełkach — idealny prezent na każdą okazję",
  "bukiety-roz": "Klasyka w luksusowym wydaniu. Róże na każdą okazję",
  "bukiety-polne": "Naturalne piękno prosto z łąki — romantyczne bukiety z polnych kwiatów",
  "kompozycje-pogrzebowe": "Kompozycje wykonane z troską i szacunkiem",
  "kwiaty-pamieci": "Wyjątkowe kompozycje upamiętniające bliskich",
  "kosze-kwiatowe": "Okazałe kosze pełne świeżych kwiatów",
  naturalnosc: "Naturalna elegancja w każdym detalu",
};

// Tekst banera promocyjnego per kategoria
const PROMO: Record<string, PromoTekst> = {
  "bukiety-roz": { naglowek: "Klasyka w luksusowym wydaniu", podtytul: "Róże na każdą okazję — od subtelnych po spektakularne bukiety MEGA." },
  flowerboxy: { naglowek: "Idealny prezent? FlowerBox", podtytul: "Elegancja zamknięta w pudełku — kwiaty, które nie potrzebują wazonu." },
  "bukiety-naturalne": { naglowek: "Lekkość prosto z natury", podtytul: "Bukiety naturalne wiązane ręcznie z sezonowych kwiatów — na co dzień i od święta." },
  "bukiety-nowoczesne": { naglowek: "Odważny design w kwiatach", podtytul: "Nowoczesne aranżacje dla tych, którzy cenią wyrazisty styl." },
  "bukiety-polne": { naglowek: "Łąka zamknięta w bukiecie", podtytul: "Romantyczne kompozycje z polnych kwiatów — naturalne piękno bez sztuczności." },
  "kompozycje-pogrzebowe": { naglowek: "Z szacunkiem i troską", podtytul: "Wieńce i wiązanki przygotowane starannie, by godnie pożegnać bliską osobę." },
  "kwiaty-pamieci": { naglowek: "Pamięć, która trwa", podtytul: "Trwałe kompozycje na groby i miejsca pamięci — skromne i eleganckie." },
  "kosze-kwiatowe": { naglowek: "Prezent, który robi wrażenie", podtytul: "Okazałe kosze pełne świeżych kwiatów — na urodziny, gratulacje i powitania." },
  naturalnosc: { naglowek: "Naturalna elegancja", podtytul: "Minimalizm i zieleń w nowoczesnym wydaniu — świeżość w każdym detalu." },
};

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ kategoria: c.slug }));
}

export function generateMetadata({ params }: { params: { kategoria: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.kategoria);
  return { title: category ? `${category.name} – Royal Flowers` : "Sklep – Royal Flowers" };
}

export default function KategoriaPage({
  params,
}: {
  params: { kategoria: string };
}) {
  const category = CATEGORIES.find((c) => c.slug === params.kategoria);
  if (!category) notFound();

  return (
    <main className="pt-28 min-h-screen bg-white">
      {/* Hero banner kategorii */}
      <section className="relative h-[300px] md:h-[340px] overflow-hidden">
        {/* Tło — placeholder. Prawdziwe zdjęcie:
            <img className="absolute inset-0 w-full h-full object-cover" /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-400 via-stone-500 to-stone-700" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Breadcrumby */}
        <nav
          aria-label="Ścieżka nawigacji"
          className="absolute top-0 inset-x-0 max-w-7xl mx-auto px-6 md:px-16 pt-6 flex items-center gap-2 font-jost text-xs tracking-wider text-white/80"
        >
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Strona główna
          </Link>
          <ChevronRight size={12} />
          <Link
            href="/sklep"
            className="uppercase hover:text-white transition-colors duration-200"
          >
            Sklep
          </Link>
          <ChevronRight size={12} />
          <span className="text-white">{category.name}</span>
        </nav>

        {/* Nazwa i opis */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
          <h1 className="font-cormorant text-5xl md:text-6xl font-light mb-4 animate-slide-up motion-reduce:animate-none">
            {category.name}
          </h1>
          <div className="w-16 h-px bg-gold mb-4" />
          <p className="font-jost text-sm md:text-base text-white/90 max-w-xl leading-relaxed">
            {BANNER_TEXT[category.slug] ?? category.description}
          </p>
        </div>
      </section>

      {/* Bestsellery */}
      <BestsellersMarquee />

      {/* Baner promocyjny */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-10">
        <PromoBanner {...(PROMO[category.slug] ?? { naglowek: category.name, podtytul: category.description })} />
      </section>

      {/* Siatka produktów */}
      <section id="produkty" className="scroll-mt-32 px-6 md:px-16 pt-12 pb-24 max-w-7xl mx-auto">
        {/* key — reset filtra cen przy przejściu do innej kategorii */}
        <ShopCategoryGrid key={category.slug} category={category} allCategories={CATEGORIES} />
      </section>

      <footer className="border-t border-gold/10 py-8 px-6 bg-dark">
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
