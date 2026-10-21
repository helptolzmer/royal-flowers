"use client";

import { useEffect, useRef, useState } from "react";
import { Balloon, Candy, Cookie, Flame, Gift, Mail, PawPrint, Ribbon, Wine, type LucideIcon } from "lucide-react";
import { EXTRAS } from "@/lib/extras";

const IKONY: Record<string, LucideIcon> = {
  raffaello: Candy,
  merci: Cookie,
  "mis-maly": PawPrint,
  "mis-duzy": PawPrint,
  kartka: Mail,
  wstazka: Ribbon,
  swieczka: Flame,
  balon: Balloon,
  wine: Wine,
};

// Miniatura dodatku: zdjęcie z /images/extras/…, a dopóki go nie ma — placeholder z ikoną (i nazwą w większych rozmiarach)
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
  const [brak, setBrak] = useState(!extra?.image);
  const imgRef = useRef<HTMLImageElement>(null);
  const Ikona = IKONY[extraId] ?? Gift;

  // Zdjęcie mogło nie wczytać się jeszcze przed hydracją — sprawdź po montażu
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setBrak(true);
  }, []);

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 ${className}`}>
      {!brak && extra?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={extra.image}
          alt={extra.name}
          loading="lazy"
          onError={() => setBrak(true)}
          className="absolute inset-0 w-full h-full object-cover"
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
