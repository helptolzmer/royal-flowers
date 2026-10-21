import { CATEGORIES } from "@/lib/products";
import CategoryCard from "@/components/CategoryCard";
import CategoryPicker from "@/components/CategoryPicker";
import NowosciCarousel from "@/components/NowosciCarousel";
import BestsellersMarquee from "@/components/BestsellersMarquee";

// Kategorie wyświetlane jako karty w siatce (w tej kolejności). Pozostałe kategorie
// są dostępne w "Wybierz kategorię" i w sidebarze stron kategorii.
const FEATURED_CATEGORY_SLUGS = [
  "bukiety-roz",
  "bukiety-naturalne",
  "bukiety-nowoczesne",
  "flowerboxy",
  "kompozycje-pogrzebowe",
];

const FEATURED_CATEGORIES = FEATURED_CATEGORY_SLUGS.map((slug) =>
  CATEGORIES.find((c) => c.slug === slug)
).filter((c): c is (typeof CATEGORIES)[number] => c !== undefined);

export const metadata = {
  title: "Sklep – Royal Flowers",
  description: "Przeglądaj naszą ofertę bukietów, flowerboxów i kompozycji kwiatowych.",
};

export default function SklepPage() {
  return (
    <main className="pt-28 min-h-screen bg-white">
      {/* Bestsellery */}
      <BestsellersMarquee />

      {/* Nagłówek strony */}
      <section className="py-20 px-6 text-center bg-white">
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-stone-800 mb-4 animate-slide-up motion-reduce:animate-none">
          Nasz sklep
        </h1>
        <p
          className="font-jost text-sm text-stone-400 animate-slide-up motion-reduce:animate-none"
          style={{ animationDelay: "150ms" }}
        >
          Wybierz kategorię i zamów kompozycję online
        </p>
      </section>

      {/* Siatka kart kategorii — pierwsza wyróżniona na pełną szerokość */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {FEATURED_CATEGORIES.map((c, i) => (
            <CategoryCard key={c.slug} category={c} featured={i === 0} />
          ))}
        </div>
      </section>

      {/* Jakich kwiatów potrzebujesz? */}
      <CategoryPicker />

      {/* Nowości */}
      <NowosciCarousel />

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
