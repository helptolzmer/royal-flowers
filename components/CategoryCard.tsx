import Link from "next/link";
import type { Category } from "@/lib/products";

export default function CategoryCard({
  category,
  featured = false,
}: {
  category: Category;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/sklep/${category.slug}`}
      className={`group relative block aspect-square w-full rounded-xl overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Tło — zdjęcie kategorii (category.image); gradient pod spodem, gdyby zdjęcie się nie wczytało */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-stone-300 via-stone-400 to-stone-600 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={category.image ? { backgroundImage: `url("${category.image}"), linear-gradient(135deg, #d6d3d1, #a8a29e, #57534e)` } : undefined}
      />

      {/* Przyciemnienie — czytelność białego tekstu na zdjęciu */}
      <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/50" />

      {/* Treść */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
        <h2
          className={`font-cormorant font-light mb-2 ${
            featured ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
          }`}
        >
          {category.name}
        </h2>
        <p className="font-jost text-sm text-white/90 line-clamp-1 max-w-md mb-4">
          {category.description}
        </p>
        <span className="inline-block border border-white/80 px-5 py-2 font-jost text-xs tracking-widest uppercase transition-colors duration-300 group-hover:bg-white group-hover:text-stone-800 group-hover:[text-shadow:none]">
          Zobacz więcej
        </span>
      </div>
    </Link>
  );
}
