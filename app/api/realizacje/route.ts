import { NextResponse } from "next/server";
import config from "@/lib/realizacje-config";
import type { RealizacjeConfig } from "@/lib/realizacje-config";

interface KompozycjaItem {
  main: string;
  extras: string[];
  opis: string;
  cena: string;
}

function buildItems(
  kategoria: keyof RealizacjeConfig,
  grupy: RealizacjeConfig[keyof RealizacjeConfig]
): KompozycjaItem[] {
  return grupy.map((g) => ({
    main: `/images/realizacje/${kategoria}/${encodeURIComponent(g.zdjecia[0])}`,
    extras: g.zdjecia
      .slice(1)
      .map((f) => `/images/realizacje/${kategoria}/${encodeURIComponent(f)}`),
    opis: g.opis,
    cena: g.cena,
  }));
}

export async function GET() {
  return NextResponse.json({
    bukiety: buildItems("bukiety", config.bukiety),
    flowerbox: buildItems("flowerbox", config.flowerbox),
    wience: buildItems("wience", config.wience),
  });
}
