export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
}

// Zdjęcia: /public/images/extras/*.jpg (kwadrat 800×800). Dopóki pliku nie ma — placeholder (ExtraThumb).
export const EXTRAS: Extra[] = [
  { id: "raffaello", name: "Raffaello", description: "Pralinki kokosowe 150g", price: 29, image: "/images/extras/raffaello.jpg" },
  { id: "merci", name: "Merci", description: "Bombonierka czekoladowa 250g", price: 35, image: "/images/extras/merci.jpg" },
  { id: "mis-maly", name: "Miś pluszowy", description: "Pluszowy miś 25cm", price: 39, image: "/images/extras/mis-pluszowy.jpg" },
  { id: "mis-duzy", name: "Miś pluszowy XL", description: "Pluszowy miś 50cm", price: 69, image: "/images/extras/mis-pluszowy-xl.jpg" },
  { id: "kartka", name: "Kartka z dedykacją", description: "Elegancka kartka z Twoim tekstem", price: 9, image: "/images/extras/kartka-z-dedykacja.jpg" },
  { id: "wstazka", name: "Wstążka premium", description: "Satynowa wstążka z nadrukiem", price: 15, image: "/images/extras/wstazka-premium.jpg" },
  { id: "swieczka", name: "Świeczka zapachowa", description: "Naturalna świeca sojowa", price: 45, image: "/images/extras/swieczka-zapachowa.jpg" },
  { id: "balon", name: "Balon z helem", description: "Balon foliowy z napisem", price: 25, image: "/images/extras/balon-z-helem.jpg" },
  { id: "wine", name: "Mini Prosecco", description: "Prosecco 200ml", price: 35, image: "/images/extras/mini-prosecco.jpg" },
];

/** Losowe dodatki z pominięciem podanych id (np. tych już w koszyku). */
export function getRandomExtras(count: number, excludeIds: string[] = []): Extra[] {
  const pool = EXTRAS.filter((e) => !excludeIds.includes(e.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
