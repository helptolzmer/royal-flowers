"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { getRandomExtras } from "@/lib/extras";
import ExtraThumb from "@/components/ExtraThumb";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    addItem,
    getTotal,
    getProductsTotal,
    getExtrasTotal,
    getItemCount,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const total = getTotal();
  const productsTotal = getProductsTotal();
  const extrasTotal = getExtrasTotal();
  const count = getItemCount();

  const products = items.filter((i) => !i.isExtra);
  const extraItems = items.filter((i) => i.isExtra);

  const bannerExtras = useMemo(
    () => getRandomExtras(3, items.filter((i) => i.isExtra).map((i) => i.productId)),
    [items]
  );

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
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        aria-hidden
        className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Koszyk"
        aria-hidden={!isDrawerOpen}
        className={`fixed top-0 right-0 h-full w-full max-w-md md:w-96 bg-white shadow-2xl z-[60] flex flex-col transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 shrink-0">
          <h2 className="font-cormorant text-xl text-stone-800">
            Twój koszyk{" "}
            {items.length > 0 && <span className="text-stone-400">({count})</span>}
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Zamknij koszyk"
            className="text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag size={48} className="text-stone-200" strokeWidth={1} />
            <p className="font-cormorant text-lg text-stone-400">
              Twój koszyk jest pusty
            </p>
            <p className="font-jost text-xs text-stone-300">Dodaj coś pięknego</p>
          </div>
        ) : (
          <>
            {/* Lista produktów */}
            <div className="flex-1 overflow-y-auto px-5">
              {products.map((item, i) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className={`flex gap-3 py-4 ${
                    i !== products.length - 1 || extraItems.length > 0
                      ? "border-b border-stone-100"
                      : ""
                  }`}
                >
                  <div className="relative w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-stone-100 flex items-center justify-center">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.productName} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <span className="font-jost text-[7px] tracking-widest uppercase text-stone-400 text-center leading-tight px-1">
                        Zdjęcie wkrótce
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-jost text-sm font-medium text-stone-800 truncate">
                          {item.productName}
                        </p>
                        <p className="font-jost text-xs text-stone-400 mt-0.5">
                          {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        aria-label={`Usuń ${item.productName} z koszyka`}
                        className="text-stone-300 hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1)
                          }
                          aria-label="Zmniejsz ilość"
                          className="p-1.5 text-stone-500 hover:text-gold transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="font-jost text-xs text-stone-700 w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1)
                          }
                          aria-label="Zwiększ ilość"
                          className="p-1.5 text-stone-500 hover:text-gold transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <p className="font-jost text-sm font-semibold text-stone-800">
                        {item.price * item.quantity} zł
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {extraItems.length > 0 && (
                <div className="pt-3">
                  <p className="font-jost text-xs uppercase tracking-widest text-stone-400 mb-2">
                    Dodatki
                  </p>
                  {extraItems.map((item, i) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className={`flex items-center gap-3 py-3 ${
                        i !== extraItems.length - 1 ? "border-b border-stone-100" : ""
                      }`}
                    >
                      <ExtraThumb extraId={item.productId} className="w-9 h-9" iconSize={14} />
                      <div className="flex-1 min-w-0">
                        <p className="font-jost text-xs font-medium text-stone-700 truncate">
                          {item.productName}
                        </p>
                      </div>
                      <div className="flex items-center border border-stone-200 shrink-0">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity - 1)
                          }
                          aria-label="Zmniejsz ilość"
                          className="p-1 text-stone-500 hover:text-gold transition-colors"
                        >
                          <Minus size={9} />
                        </button>
                        <span className="font-jost text-[10px] text-stone-700 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.quantity + 1)
                          }
                          aria-label="Zwiększ ilość"
                          className="p-1 text-stone-500 hover:text-gold transition-colors"
                        >
                          <Plus size={9} />
                        </button>
                      </div>
                      <p className="font-jost text-xs font-medium text-stone-700 w-12 text-right shrink-0">
                        {item.price * item.quantity} zł
                      </p>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        aria-label={`Usuń ${item.productName} z koszyka`}
                        className="text-stone-300 hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {bannerExtras.length > 0 && (
                <div className="mt-4 mb-2 p-3 bg-stone-50 rounded-lg">
                  <p className="font-jost text-xs text-stone-500 mb-2">Dodaj coś ekstra?</p>
                  <div className="flex items-center gap-3 overflow-x-auto">
                    {bannerExtras.map((extra) => (
                      <div key={extra.id} className="flex items-center gap-1.5 shrink-0">
                        <ExtraThumb extraId={extra.id} className="w-7 h-7 rounded-md border border-stone-200" iconSize={12} />
                        <span className="font-jost text-[10px] text-stone-500 whitespace-nowrap">
                          {extra.name}
                        </span>
                        <button
                          onClick={() => handleAddExtra(extra)}
                          aria-label={`Dodaj ${extra.name}`}
                          className="w-5 h-5 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-200 shrink-0"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-100 bg-white p-4 shrink-0">
              {extraItems.length > 0 ? (
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between font-jost text-xs text-stone-500">
                    <span>Produkty:</span>
                    <span>{productsTotal} zł</span>
                  </div>
                  <div className="flex items-center justify-between font-jost text-xs text-stone-500">
                    <span>Dodatki:</span>
                    <span>{extrasTotal} zł</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-jost text-sm text-stone-600">Razem:</span>
                    <span className="font-jost text-lg font-semibold text-stone-900">
                      {total} zł
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-4">
                  <span className="font-jost text-sm text-stone-600">Suma:</span>
                  <span className="font-jost text-lg font-semibold text-stone-900">
                    {total} zł
                  </span>
                </div>
              )}
              <Link
                href="/sklep/koszyk"
                onClick={closeDrawer}
                className="w-full flex items-center justify-center bg-gold text-white font-jost text-xs tracking-widest uppercase py-3 hover:bg-gold-light transition-colors duration-300"
              >
                Przejdź do koszyka
              </Link>
              <button
                onClick={closeDrawer}
                className="w-full text-center font-jost text-xs text-stone-400 hover:text-gold transition-colors duration-200 mt-3"
              >
                lub kontynuuj zakupy
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
