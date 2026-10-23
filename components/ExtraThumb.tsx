"use client";

import { Balloon, Candy, Cookie, Gift, Mail, PawPrint, type LucideIcon } from "lucide-react";
import { EXTRAS } from "@/lib/extras";

const IKONY: Record<string, LucideIcon> = {
  raffaello: Candy,
  merci: Cookie,
  ferrero: Candy,
  lindt: Candy,
  "mis-maly": PawPrint,
  "mis-duzy": PawPrint,
  kartka: Mail,
  balon: Balloon,
};

// Miniatura dodatku: zdjęcie z /images/extras/… (jpg/png), a gdy dodatek nie ma zdjęcia (image = null) — placeholder z ikoną (i nazwą w większych rozmiarach)
export default function ExtraThumb({
  extraId,
  className = "w-12 h-12",
  iconSize = 18,
  showName = false,
}: {
  extraId: string;
  className?: string;
  iconSize?: number;
  showName?: boolean;
}) {
  const extra = EXTRAS.find((e) => e.id === extraId);
  const Ikona = IKONY[extraId] ?? Gift;

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 ${className}`}>
      {extra?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={extra.image}
          alt={extra.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover bg-white"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-1 text-center" aria-label={extra?.name}>
          <Ikona size={iconSize} strokeWidth={1.4} className="text-stone-400" aria-hidden="true" />
          {showName && extra && (
            <span className="font-jost text-[8px] leading-tight tracking-wide uppercase text-stone-400 line-clamp-2">
              {extra.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
