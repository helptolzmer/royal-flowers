"use client";

import { useEffect, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { getRandomExtras, type Extra } from "@/lib/extras";
import ExtraThumb from "@/components/ExtraThumb";

interface AddedProduct {
  name: string;
  size: string;
  price: number;
}

interface CrossSellModalProps {
  isOpen: boolean;
  onClose: () => void;
  addedProduct: AddedProduct | null;
  addedExtraNames: string[];
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function CrossSellModal({
  isOpen,
  onClose,
  addedProduct,
  addedExtraNames,
}: CrossSellModalProps) {
  const { items, addItem, getItemCount, getTotal, openDrawer } = useCart();
  const [suggestions, setSuggestions] = useState<Extra[]>([]);
  const [justAdded, setJustAdded] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) return;
    const excludeIds = items.filter((i) => i.isExtra).map((i) => i.productId);
    setSuggestions(getRandomExtras(4, excludeIds));
    setJustAdded(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !addedProduct) return null;

  function handleAddSuggestion(extra: Extra) {
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
    setJustAdded((prev) => new Set(prev).add(extra.id));
  }

  const reduced = prefersReducedMotion();
  const count = getItemCount();

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
      />
      <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center pointer-events-none">
        <div
          role="dialog"
          aria-label="Dodano do koszyka"
          className={`pointer-events-auto w-full md:max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto ${
            reduced ? "" : "animate-modal-in"
          }`}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-stone-100">
            <button
              onClick={onClose}
              aria-label="Zamknij"
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Check size={18} className="text-emerald-600" />
              <span className="font-jost font-medium text-emerald-600">
                Dodano do koszyka!
              </span>
            </div>
            <p className="font-jost text-sm text-stone-700">
              {addedProduct.name}{" "}
              <span className="text-stone-400">· {addedProduct.size}</span>{" "}
              <span className="font-medium">· {addedProduct.price} zł</span>
            </p>
            {addedExtraNames.length > 0 && (
              <p className="font-jost text-xs text-stone-400 mt-1">
                {addedExtraNames.map((n) => `+ ${n}`).join(", ")}
              </p>
            )}
          </div>

          {/* Cross-sell */}
          {suggestions.length > 0 && (
            <div className="p-6">
              <h3 className="font-cormorant text-lg text-stone-800">Może jeszcze coś?</h3>
              <p className="font-jost text-xs text-stone-400 mb-4">
                Inni klienci kupili też
              </p>
              <div className="space-y-3">
                {suggestions.map((extra) => {
                  const added = justAdded.has(extra.id);
                  return (
                    <div key={extra.id} className="flex items-center gap-3">
                      <ExtraThumb extraId={extra.id} className="w-12 h-12" iconSize={18} />
                      <div className="flex-1 min-w-0">
                        <p className="font-jost text-sm text-stone-700 truncate">
                          {extra.name}
                        </p>
                        <p className="font-jost text-xs text-stone-400">{extra.price} zł</p>
                      </div>
                      <button
                        onClick={() => handleAddSuggestion(extra)}
                        disabled={added}
                        aria-label={`Dodaj ${extra.name}`}
                        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          added
                            ? "bg-gold text-white border-gold scale-110"
                            : "border-gold text-gold hover:bg-gold/10"
                        }`}
                      >
                        {added ? <Check size={14} /> : <Plus size={14} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-stone-100 bg-stone-50">
            <button
              onClick={onClose}
              className="font-jost text-sm text-stone-500 underline underline-offset-2 hover:text-stone-700 transition-colors order-2 sm:order-1"
            >
              Kontynuuj zakupy
            </button>
            <p className="font-jost text-xs text-stone-400 order-1 sm:order-2">
              W koszyku: {count} {count === 1 ? "produkt" : "produktów"} · {getTotal()} zł
            </p>
            <button
              onClick={() => {
                openDrawer();
                onClose();
              }}
              className="bg-gold text-white font-jost text-sm px-6 py-3 rounded hover:bg-gold-light transition-colors duration-300 whitespace-nowrap order-3"
            >
              Przejdź do koszyka →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
