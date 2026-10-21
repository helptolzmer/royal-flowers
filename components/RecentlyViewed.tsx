"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flower2 } from "lucide-react";
import { findProduct, type Category, type Product } from "@/lib/products";

const STORAGE_KEY = "rf-recently-viewed";
const MAX_STORED = 8;
const MAX_SHOWN = 4;

type Ref = { categorySlug: string; productSlug: string };

function readRefs(): Ref[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRefs(refs: Ref[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(refs));
  } catch {
    // Prywatne okno / zablokowany storage — historia po prostu się nie zapisze.
  }
}

// Produkty faktycznie oglądane wcześniej przez klienta (localStorage),
// bez bieżącego. Bieżący produkt trafia na początek historii.
export default function RecentlyViewed({
  categorySlug,
  productSlug,
}: {
  categorySlug: string;
  productSlug: string;
}) {
  const [items, setItems] = useState<{ category: Category; product: Product }[]>([]);

  useEffect(() => {
    const isCurrent = (r: Ref) =>
      r.categorySlug === categorySlug && r.productSlug === productSlug;
    const previous = readRefs().filter((r) => !isCurrent(r));

    setItems(
      previous
        .map((r) => findProduct(r.categorySlug, r.productSlug))
        .filter((f): f is { category: Category; product: Product } => f !== null)
        .slice(0, MAX_SHOWN)
    );

    writeRefs([{ categorySlug, productSlug }, ...previous].slice(0, MAX_STORED));
  }, [categorySlug, productSlug]);

  if (items.length === 0) return null;

  return (
    <div className="mt-8 pt-10 border-t border-stone-100">
      <h2 className="font-cormorant text-xl text-stone-700 mb-5">Ostatnio oglądane</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ category, product }) => (
          <Link
            key={`${category.slug}/${product.slug}`}
            href={`/sklep/${category.slug}/${product.slug}`}
            className="group flex flex-col bg-white border border-stone-200 rounded-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden bg-stone-100 flex items-center justify-center">
              {product.variants[0]?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.variants[0].image}
                  alt={product.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <Flower2 className="text-stone-300" size={22} strokeWidth={1.25} />
              )}
            </div>
            <div className="p-3">
              <p className="font-cormorant text-base text-stone-800 leading-tight group-hover:text-gold transition-colors duration-200">
                {product.name}
              </p>
              <p className="font-jost text-xs text-stone-500 mt-1">od {product.priceFrom} zł</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
