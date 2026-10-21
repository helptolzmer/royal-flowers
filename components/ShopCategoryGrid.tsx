"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Flower2 } from "lucide-react";
import { isBestseller, type Category } from "@/lib/products";

type SortOption = "domyslne" | "cena-rosnaco" | "cena-malejaco" | "nazwa";

const SORT_LABELS: Record<SortOption, string> = {
  domyslne: "Domyślne",
  "cena-rosnaco": "Cena rosnąco",
  "cena-malejaco": "Cena malejąco",
  nazwa: "Nazwa A-Z",
};

const PRICE_STEP = 10;

export default function ShopCategoryGrid({
  category,
  allCategories,
}: {
  category: Category;
  allCategories: Category[];
}) {
  // Zakres suwaka — od najtańszego do najdroższego produktu w kategorii,
  // zaokrąglony do pełnych dziesiątek.
  const [priceLo, priceHi] = useMemo(() => {
    const prices = category.products.map((p) => p.priceFrom);
    if (prices.length === 0) return [0, 0];
    return [
      Math.floor(Math.min(...prices) / PRICE_STEP) * PRICE_STEP,
      Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP,
    ];
  }, [category.products]);

  const [cenaOd, setCenaOd] = useState(priceLo);
  const [cenaDo, setCenaDo] = useState(priceHi);
  const [sort, setSort] = useState<SortOption>("domyslne");

  const filterActive = cenaOd > priceLo || cenaDo < priceHi;
  const rangeSpan = Math.max(priceHi - priceLo, 1);
  const fillLeft = ((cenaOd - priceLo) / rangeSpan) * 100;
  const fillRight = ((priceHi - cenaDo) / rangeSpan) * 100;

  const filtered = useMemo(() => {
    let list = category.products.filter(
      (p) => p.priceFrom >= cenaOd && p.priceFrom <= cenaDo
    );

    list = [...list];
    if (sort === "cena-rosnaco") list.sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "cena-malejaco") list.sort((a, b) => b.priceFrom - a.priceFrom);
    if (sort === "nazwa") list.sort((a, b) => a.name.localeCompare(b.name, "pl"));

    return list;
  }, [category.products, cenaOd, cenaDo, sort]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
      {/* Sidebar */}
      <aside className="space-y-10">
        <div>
          <h3 className="font-jost text-xs tracking-widest uppercase text-stone-400 mb-4">
            Kategorie
          </h3>
          <ul className="space-y-1">
            {allCategories.map((c) => {
              const active = c.slug === category.slug;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/sklep/${c.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`block border-l-2 pl-3 pr-2 py-1.5 rounded-r-md font-jost text-sm transition-colors duration-200 ${
                      active
                        ? "border-gold bg-gold/5 text-stone-900 font-semibold"
                        : "border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                    }`}
                  >
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {priceHi > priceLo && (
          <div>
            <h3 className="font-jost text-xs tracking-widest uppercase text-stone-400 mb-4">
              Cena
            </h3>

            {/* Suwak z dwoma uchwytami */}
            <div className="relative h-5">
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-1 rounded-full bg-stone-200" />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full bg-gold"
                style={{ left: `${fillLeft}%`, right: `${fillRight}%` }}
              />
              <input
                type="range"
                aria-label="Cena od"
                min={priceLo}
                max={priceHi}
                step={PRICE_STEP}
                value={cenaOd}
                onChange={(e) => setCenaOd(Math.min(Number(e.target.value), cenaDo))}
                className="dual-range"
                // Uchwyty na sobie przy prawej krawędzi → "od" na wierzch, żeby dało się go przesunąć
                style={{ zIndex: cenaOd > priceLo + rangeSpan / 2 ? 2 : 1 }}
              />
              <input
                type="range"
                aria-label="Cena do"
                min={priceLo}
                max={priceHi}
                step={PRICE_STEP}
                value={cenaDo}
                onChange={(e) => setCenaDo(Math.max(Number(e.target.value), cenaOd))}
                className="dual-range"
              />
            </div>

            <div className="flex items-center justify-between gap-2 mt-4">
              <span className="rounded-lg bg-white shadow-sm border border-stone-200 px-3 py-1.5 font-jost text-xs text-stone-700">
                {cenaOd} zł
              </span>
              <span className="text-stone-300">–</span>
              <span className="rounded-lg bg-white shadow-sm border border-stone-200 px-3 py-1.5 font-jost text-xs text-stone-700">
                {cenaDo} zł
              </span>
            </div>

            {filterActive && (
              <button
                onClick={() => {
                  setCenaOd(priceLo);
                  setCenaDo(priceHi);
                }}
                className="font-jost text-[11px] text-stone-400 hover:text-gold underline underline-offset-2 mt-3"
              >
                Wyczyść filtr
              </button>
            )}
          </div>
        )}
      </aside>

      {/* Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="font-jost text-xs text-stone-400">
            {filtered.length} {filtered.length === 1 ? "produkt" : "produktów"}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-stone-200 shadow-sm text-stone-600 font-jost text-xs px-3 py-2 focus:outline-none focus:border-gold/60"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="font-jost text-sm text-stone-400 py-16 text-center">
            Brak produktów w wybranym zakresie cenowym.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/sklep/${category.slug}/${p.slug}`}
                className="group flex flex-col bg-white border border-stone-100 rounded-xl shadow-sm overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02] motion-reduce:hover:scale-100"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#f3ece1] to-stone-200 flex items-center justify-center">
                  {p.variants[0]?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.variants[0].image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <Flower2 className="text-stone-400/60" size={36} strokeWidth={1} />
                  )}
                  {isBestseller(category.slug, p.slug) && (
                    <span className="absolute z-10 top-3 left-3 font-jost text-[9px] font-medium tracking-wider uppercase bg-gold text-white rounded-full px-2.5 py-1 shadow-sm">
                      Popularny
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col gap-1.5 flex-1">
                  <h3 className="font-cormorant text-xl font-medium text-stone-800 group-hover:text-gold transition-colors duration-200">
                    {p.name}
                  </h3>
                  <p className="font-jost text-sm font-semibold text-[#8b6b23] mt-auto">
                    od {p.priceFrom} zł
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-jost text-[11px] tracking-widest uppercase text-stone-500 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    Zobacz szczegóły
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
