"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Flower2,
  HandHeart,
  Leaf,
  ShoppingBag,
  Timer,
} from "lucide-react";
import type { Category, Product } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { EXTRAS } from "@/lib/extras";
import CrossSellModal from "@/components/CrossSellModal";
import RecentlyViewed from "@/components/RecentlyViewed";
import ExtraThumb from "@/components/ExtraThumb";
import { useReveal } from "@/lib/animations";
import Footer from "@/components/Footer";

type Tab = "opis" | "szczegoly" | "dostawa";

const TRUST_ITEMS = [
  { icon: Leaf, label: "Gwarancja świeżości" },
  { icon: HandHeart, label: "Ręcznie wiązane" },
  { icon: Timer, label: "Gotowe nawet w 3 godziny" },
];

// Napisy gwarancyjne pod przyciskiem — pojawiają się kolejno przy przewijaniu
function TrustBadges() {
  const [ref, visible] = useReveal<HTMLUListElement>(0.3);
  return (
    <ul ref={ref} className="grid grid-cols-3 gap-2 mt-5">
      {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
        <li
          key={label}
          className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" }}
        >
          <div className="group flex flex-col items-center gap-2 text-center px-1 py-2 cursor-default">
            <span className="flex items-center justify-center w-11 h-11 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/[0.06] transition-all duration-300 group-hover:border-[#D4A843] group-hover:bg-[#D4A843]/[0.12]">
              <Icon size={20} strokeWidth={1.5} className="text-[#D4A843]" aria-hidden="true" />
            </span>
            <span className="relative font-jost text-[11px] leading-tight tracking-wide text-stone-500 transition-colors duration-300 group-hover:text-stone-800">
              {label}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[#D4A843] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

const TABS: { key: Tab; label: string }[] = [
  { key: "opis", label: "Opis" },
  { key: "szczegoly", label: "Szczegóły" },
  { key: "dostawa", label: "Dostawa" },
];

// Ikonka rośnie wraz z rozmiarem bukietu — Mały najmniejsza, MEGA największa.
const MAIN_ICON_SIZE: Record<string, number> = {
  Mały: 28,
  Średni: 38,
  Duży: 48,
  MEGA: 58,
};
const THUMB_ICON_SIZE: Record<string, number> = {
  Mały: 14,
  Średni: 18,
  Duży: 22,
  MEGA: 26,
};

// Placeholder tekst zależny od rozmiaru i rodzaju produktu (pierwsze słowo nazwy),
// np. "Mały bukiet" / "Bukiet MEGA", "Mały kosz" / "Kosz MEGA".
function sizePlaceholder(productName: string, size: string): string {
  const kind = productName.split(" ")[0];
  return size === "MEGA" ? `${kind} MEGA` : `${size} ${kind.toLowerCase()}`;
}

export default function ProductDetail({
  category,
  product,
}: {
  category: Category;
  product: Product;
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.variants.find((v) => v.size === "Średni")?.size ??
      product.variants[0]?.size
  );
  const [tab, setTab] = useState<Tab>("opis");
  const [added, setAdded] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{
    name: string;
    size: string;
    price: number;
  } | null>(null);
  const [lastAddedExtraNames, setLastAddedExtraNames] = useState<string[]>([]);

  const selectedVariant =
    product.variants.find((v) => v.size === selectedSize) ?? product.variants[0];

  // Fade-out (200ms) → fade-in (200ms) głównego zdjęcia przy zmianie rozmiaru.
  useEffect(() => {
    setImageVisible(false);
    const t = setTimeout(() => setImageVisible(true), 200);
    return () => clearTimeout(t);
  }, [selectedSize]);

  function toggleExtra(id: string) {
    setSelectedExtraIds((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  function handleAddToCart() {
    addItem({
      productId: product.id,
      productName: product.name,
      categorySlug: category.slug,
      size: selectedVariant.size,
      price: selectedVariant.price,
      quantity: 1,
      image: selectedVariant.image ?? "",
    });

    const chosenExtras = EXTRAS.filter((e) => selectedExtraIds.includes(e.id));
    chosenExtras.forEach((extra) => {
      addItem({
        productId: extra.id,
        productName: extra.name,
        categorySlug: "dodatki",
        size: "",
        price: extra.price,
        quantity: 1,
        image: extra.image ?? "",
        isExtra: true,
      });
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);

    setLastAdded({
      name: product.name,
      size: selectedVariant.size,
      price: selectedVariant.price,
    });
    setLastAddedExtraNames(chosenExtras.map((e) => e.name));
    setSelectedExtraIds([]);
    setModalOpen(true);
  }

  return (
    <main className="pt-28 min-h-screen bg-white">
      {/* Breadcrumby */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8">
        <nav className="flex items-center gap-2 font-jost text-xs tracking-wider text-stone-400">
          <Link href="/sklep" className="hover:text-gold transition-colors duration-200">
            Sklep
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/sklep/${category.slug}`}
            className="hover:text-gold transition-colors duration-200"
          >
            {category.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-stone-600">{product.name}</span>
        </nav>
      </div>

      <section className="px-6 md:px-16 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12">
          {/* Zdjęcia */}
          <div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center">
              {selectedVariant.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedVariant.image}
                  alt={`${product.name} — ${selectedVariant.size}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`flex flex-col items-center gap-3 transition-opacity duration-200 ${
                    imageVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Flower2
                    className="text-stone-400"
                    size={MAIN_ICON_SIZE[selectedVariant.size] ?? 36}
                    strokeWidth={1.25}
                  />
                  <span className="font-jost text-xs tracking-widest uppercase text-stone-400">
                    {sizePlaceholder(product.name, selectedVariant.size)}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-2 text-center font-jost text-xs italic text-[#999]">
              Zdjęcie poglądowe — kwiaty sezonowe mogą się różnić od prezentowanych
            </p>
            <div className="grid grid-cols-4 gap-3 mt-3">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  onClick={() => setSelectedSize(v.size)}
                  className={`relative overflow-hidden aspect-square rounded-lg bg-stone-100 flex flex-col items-center justify-center gap-1 border-2 transition-colors duration-200 ${
                    selectedSize === v.size
                      ? "border-gold"
                      : "border-transparent hover:border-stone-200"
                  }`}
                  aria-label={`Rozmiar ${v.size}`}
                >
                  {v.image ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/45 py-0.5 font-jost text-[9px] tracking-wider uppercase text-white text-center">
                        {v.size}
                      </span>
                    </>
                  ) : (
                    <>
                      <Flower2
                        className="text-stone-300"
                        size={THUMB_ICON_SIZE[v.size] ?? 16}
                        strokeWidth={1.25}
                      />
                      <span className="font-jost text-[9px] tracking-wider uppercase text-stone-400">
                        {v.size}
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Informacje */}
          <div>
            <h1 className="font-cormorant text-3xl font-light text-stone-800 mb-2">
              {product.name}
            </h1>
            <p className="font-jost text-2xl font-semibold text-stone-800 mb-4">
              od {selectedVariant.price.toFixed(2).replace(".", ",")} zł
            </p>
            <p className="font-jost text-sm text-stone-500 leading-relaxed mb-8">
              {product.description}
              {selectedVariant.description && (
                <span key={selectedVariant.size} className="block mt-2 text-stone-700 animate-fade-in">
                  <span className="font-medium">{selectedVariant.size}:</span> {selectedVariant.description}
                </span>
              )}
            </p>

            {/* Rozmiar */}
            <div className="mb-8">
              <p className="font-jost text-xs tracking-widest uppercase text-stone-500 mb-3">
                Rozmiar
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedSize(v.size)}
                    className={`font-jost text-xs tracking-widest uppercase px-4 py-2.5 border transition-all duration-200 ${
                      selectedSize === v.size
                        ? "bg-gold text-white border-gold"
                        : "border-stone-300 text-stone-600 hover:border-gold/60"
                    }`}
                  >
                    {v.size} · {v.price} zł
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 font-jost text-sm tracking-widest uppercase py-4 transition-all duration-300 ${
                added ? "bg-emerald-600 text-white" : "bg-gold text-white hover:bg-gold-light"
              }`}
            >
              {added ? (
                <>
                  <Check size={16} /> Dodano
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Dodaj do koszyka
                </>
              )}
            </button>

            <p className="font-jost text-xs text-stone-400 text-center mt-3">
              Odbiór w kwiaciarni lub kwiatomacie
            </p>

            <TrustBadges />

            {/* Dodatki */}
            <div className="border-t border-stone-200 mt-8 pt-6">
              <h2 className="font-cormorant text-xl text-stone-700">Dołóż coś ekstra</h2>
              <p className="font-jost text-xs text-stone-400 mb-4">
                Spraw, by prezent był jeszcze wyjątkowy
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRAS.map((extra) => {
                  const checked = selectedExtraIds.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors duration-200 ${
                        checked ? "border-gold bg-gold/5" : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <ExtraThumb extraId={extra.id} className="w-16 h-16" iconSize={20} showName />
                      <div className="flex-1 min-w-0">
                        <p className="font-jost text-sm font-medium text-stone-800">
                          {extra.name}
                        </p>
                        <p className="font-jost text-[10px] text-stone-400">
                          {extra.description}
                        </p>
                        <p className="font-jost text-sm text-gold font-semibold mt-0.5">
                          {extra.price} zł
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleExtra(extra.id)}
                        className="w-4 h-4 accent-gold shrink-0"
                        aria-label={`Dodaj ${extra.name}`}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Zakładki */}
        <div className="mt-16 max-w-3xl">
          <div className="flex gap-8 border-b border-stone-200">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`font-jost text-xs tracking-widest uppercase pb-4 border-b-2 transition-colors duration-200 ${
                  tab === t.key
                    ? "border-gold text-stone-800"
                    : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="py-8 font-jost text-sm text-stone-600 leading-relaxed">
            {tab === "opis" && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p>
                  Każdy bukiet wiążemy ręcznie w dniu odbioru, korzystając z najświeższych
                  kwiatów dostępnych danego dnia u naszych dostawców. Dzięki temu kompozycja,
                  którą otrzymasz, zawsze zachowuje pełnię koloru i świeżości.
                </p>
                <p>
                  Jeśli zależy Ci na konkretnej kolorystyce lub dodatkach — napisz uwagę przy
                  składaniu zamówienia, a nasi floryści uwzględnią ją podczas przygotowania.
                </p>
              </div>
            )}
            {tab === "szczegoly" && (
              <ul className="space-y-2 list-disc list-inside">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
            {tab === "dostawa" && (
              <div className="space-y-4">
                <p>
                  <span className="text-stone-800 font-medium">Odbiór w kwiaciarni:</span>{" "}
                  ul. Długosza 23, Nowy Sącz. Pon–pt 9:00–17:00, sobota 9:00–14:00.
                </p>
                <p>
                  <span className="text-stone-800 font-medium">Odbiór z kwiatomatu:</span>{" "}
                  dostępny całą dobę — po złożeniu zamówienia otrzymasz unikalny kod odbioru.
                </p>
              </div>
            )}
          </div>
        </div>

        <RecentlyViewed categorySlug={category.slug} productSlug={product.slug} />
      </section>

      <CrossSellModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        addedProduct={lastAdded}
        addedExtraNames={lastAddedExtraNames}
      />

      <Footer className="mt-16" />
    </main>
  );
}
