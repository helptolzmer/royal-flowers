"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { EXTRAS } from "@/lib/extras";
import ExtraThumb from "@/components/ExtraThumb";
import Footer from "@/components/Footer";

export default function KoszykPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    addItem,
    getTotal,
    getProductsTotal,
    getExtrasTotal,
  } = useCart();
  const [addedExtraId, setAddedExtraId] = useState<string | null>(null);

  const extraIdsInCart = items.filter((i) => i.isExtra).map((i) => i.productId);

  function handleAddExtra(extra: { id: string; name: string; price: number; image?: string | null }) {
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
    setAddedExtraId(extra.id);
    window.setTimeout(() => setAddedExtraId((id) => (id === extra.id ? null : id)), 2000);
  }

  if (items.length === 0) {
    return (
      <main className="pt-28 min-h-screen bg-white">
        <section className="py-28 px-6 text-center max-w-xl mx-auto">
          <ShoppingBag size={36} className="text-stone-300 mx-auto mb-6" />
          <h1 className="font-cormorant text-3xl font-light text-stone-800 mb-3">
            Twój koszyk jest pusty
          </h1>
          <p className="font-jost text-sm text-stone-400 mb-8">
            Dodaj produkty ze sklepu, aby złożyć zamówienie.
          </p>
          <Link
            href="/sklep"
            className="inline-flex items-center justify-center gap-2 bg-gold text-white font-jost text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-gold-light transition-colors duration-300"
          >
            Przejdź do sklepu
          </Link>
        </section>

        <Footer className="mt-16" />
      </main>
    );
  }

  const total = getTotal();

  return (
    <main className="pt-28 min-h-screen bg-white">
      <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto">
        <h1 className="font-cormorant text-4xl font-light text-stone-800 mb-10">
          Koszyk
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          {/* Lista produktów */}
          <div>
            <ul className="divide-y divide-stone-200">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center gap-5 py-6"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center">
                    {item.isExtra ? (
                      <ExtraThumb extraId={item.productId} className="absolute inset-0 w-full h-full rounded-none" iconSize={20} showName />
                    ) : item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.productName} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <span className="font-jost text-[8px] tracking-widest uppercase text-stone-400 text-center leading-tight px-1">
                        Zdjęcie wkrótce
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant text-xl text-stone-800 truncate">
                      {item.productName}
                    </p>
                    <p className="font-jost text-xs text-stone-400 mt-0.5">
                      {item.isExtra ? "Dodatek" : `Rozmiar: ${item.size}`}
                    </p>
                  </div>

                  <p className="font-jost text-sm text-stone-700 w-20 text-right shrink-0">
                    {item.price} zł
                  </p>

                  <div className="flex items-center border border-stone-200 shrink-0">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity - 1)
                      }
                      className="p-2 text-stone-500 hover:text-gold transition-colors"
                      aria-label="Zmniejsz ilość"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="font-jost text-sm text-stone-700 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.size, item.quantity + 1)
                      }
                      className="p-2 text-stone-500 hover:text-gold transition-colors"
                      aria-label="Zwiększ ilość"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <p className="font-jost text-sm font-medium text-stone-800 w-20 text-right shrink-0">
                    {item.price * item.quantity} zł
                  </p>

                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-stone-300 hover:text-red-400 transition-colors shrink-0"
                    aria-label={`Usuń ${item.productName} z koszyka`}
                  >
                    <Trash2 size={17} />
                  </button>
                </li>
              ))}
            </ul>

            <Link
              href="/sklep"
              className="inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-stone-500 hover:text-gold transition-colors duration-300 mt-8"
            >
              ← Kontynuuj zakupy
            </Link>

            {/* Dołóż do zamówienia */}
            <div className="border-t border-stone-200 mt-10 pt-8">
              <h2 className="font-cormorant text-2xl font-light text-stone-800 mb-1">
                Dołóż do zamówienia
              </h2>
              <p className="font-jost text-xs text-stone-400 mb-6">
                Spraw, by prezent był jeszcze wyjątkowy
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {EXTRAS.map((extra) => {
                  const inCart = extraIdsInCart.includes(extra.id);
                  const justAdded = addedExtraId === extra.id;
                  return (
                    <div
                      key={extra.id}
                      className="border border-stone-200 p-3 flex flex-col items-center text-center gap-2"
                    >
                      <ExtraThumb extraId={extra.id} className="w-16 h-16" iconSize={20} showName />
                      <p className="font-jost text-xs font-medium text-stone-800">
                        {extra.name}
                      </p>
                      <p className="font-jost text-xs text-gold font-semibold">
                        {extra.price} zł
                      </p>
                      <button
                        onClick={() => handleAddExtra(extra)}
                        className={`w-full flex items-center justify-center gap-1.5 font-jost text-[10px] tracking-widest uppercase py-2 transition-colors duration-300 ${
                          justAdded
                            ? "bg-emerald-600 text-white"
                            : inCart
                            ? "bg-stone-100 text-stone-400"
                            : "bg-gold text-white hover:bg-gold-light"
                        }`}
                      >
                        {justAdded ? (
                          <>
                            <Check size={11} /> Dodano
                          </>
                        ) : inCart ? (
                          "W koszyku"
                        ) : (
                          "Dodaj"
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Podsumowanie */}
          <div className="h-fit border border-stone-200 p-6">
            <h2 className="font-cormorant text-2xl font-light text-stone-800 mb-6">
              Podsumowanie
            </h2>

            <div className="flex items-center justify-between font-jost text-sm text-stone-500 mb-2">
              <span>Liczba pozycji</span>
              <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
            </div>

            {getExtrasTotal() > 0 ? (
              <div className="space-y-1.5 border-t border-stone-200 mt-4 pt-4">
                <div className="flex items-center justify-between font-jost text-sm text-stone-500">
                  <span>Produkty</span>
                  <span>{getProductsTotal()} zł</span>
                </div>
                <div className="flex items-center justify-between font-jost text-sm text-stone-500">
                  <span>Dodatki</span>
                  <span>{getExtrasTotal()} zł</span>
                </div>
                <div className="flex items-center justify-between font-jost text-base text-stone-800 font-medium pt-2">
                  <span>Razem</span>
                  <span className="font-cormorant text-2xl">{total} zł</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between font-jost text-base text-stone-800 font-medium border-t border-stone-200 mt-4 pt-4">
                <span>Suma</span>
                <span className="font-cormorant text-2xl">{total} zł</span>
              </div>
            )}

            <Link
              href="/sklep/zamowienie"
              className="w-full mt-6 flex items-center justify-center gap-2 bg-gold text-white font-jost text-sm tracking-widest uppercase py-4 hover:bg-gold-light transition-colors duration-300"
            >
              Przejdź do zamówienia
            </Link>
          </div>
        </div>
      </section>

      <Footer className="mt-16" />
    </main>
  );
}
