export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
}

// Zdjęcia: /public/images/extras/*.png (max 800×800). Gdy image = null — placeholder z ikoną (ExtraThumb).
export const EXTRAS: Extra[] = [
  { id: "raffaello", name: "Raffaello", description: "Pralinki kokosowe", price: 39, image: "/images/extras/raffaello.png" },
  { id: "merci", name: "Merci", description: "Bombonierka czekoladowa", price: 49, image: "/images/extras/merci.png" },
  { id: "ferrero", name: "Ferrero Rocher", description: "Pralinki czekoladowe", price: 49, image: "/images/extras/ferrero-rocher.png" },
  { id: "lindt", name: "Lindt LINDOR", description: "Praliny czekoladowe", price: 59, image: "/images/extras/lindt-lindor.png" },
  { id: "mis-maly", name: "Miś pluszowy 25cm", description: "Pluszowy miś 25cm", price: 39, image: "/images/extras/mis-pluszowy.png" },
  { id: "mis-duzy", name: "Miś pluszowy XL", description: "Pluszowy miś duży", price: 59, image: "/images/extras/mis-pluszowy-xl.png" },
  { id: "balon", name: "Balon serce z helem", description: "Balon foliowy czerwone serce", price: 49, image: "/images/extras/balon-serce.png" },
  { id: "kartka", name: "Kartka z dedykacją", description: "Elegancka kartka z Twoim tekstem", price: 5, image: "/images/extras/kartka-z-dedykacja.png" },
];

/** Losowe dodatki z pominięciem podanych id (np. tych już w koszyku). */
export function getRandomExtras(count: number, excludeIds: string[] = []): Extra[] {
  const pool = EXTRAS.filter((e) => !excludeIds.includes(e.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
