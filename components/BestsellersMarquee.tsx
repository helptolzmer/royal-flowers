import Link from "next/link";
import { Flower2 } from "lucide-react";
import { getBestsellers } from "@/lib/products";

export default function BestsellersMarquee() {
  const items = getBestsellers();
  const track = [...items, ...items];

  return (
    <section className="w-full bg-stone-50 py-10 md:py-12 overflow-hidden">
      <div className="text-center mb-6 md:mb-8 px-6">
        <h2 className="font-cormorant text-2xl md:text-3xl font-light text-stone-800 mb-1.5">
          Bestsellery
        </h2>
        <p className="font-jost text-xs text-stone-400">
          Najczęściej wybierane przez naszych klientów
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`/sklep/${p.categorySlug}/${p.slug}`}
              className="group shrink-0 w-32 md:w-40 lg:w-44 transition-transform duration-300 hover:scale-[1.03]"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-200 shadow-sm group-hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                {p.variants[0]?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.variants[0].image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1.5">
                    <Flower2 className="text-stone-400" size={18} strokeWidth={1.25} />
                    <span className="font-jost text-[8px] tracking-widest uppercase text-stone-400">
                      Zdjęcie wkrótce
                    </span>
                  </div>
                )}
                <span className="absolute z-10 top-2 left-2 bg-gold text-white font-jost text-[9px] rounded-full px-2 py-0.5">
                  Bestseller
                </span>
              </div>
              <p className="font-jost text-xs text-stone-700 mt-2 truncate">{p.name}</p>
              <p className="font-jost text-sm font-medium text-stone-900">od {p.priceFrom} zł</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
