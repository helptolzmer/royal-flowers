export interface ProductVariant {
  size: string;
  price: number;
  // Zdjęcie danego wariantu wielkościowego (null → placeholder)
  image: string | null;
  // Opcjonalny opis tego rozmiaru (np. "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni.")
  description?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  priceFrom: number;
  description: string;
  details: string[];
  variants: ProductVariant[];
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  description: string;
  products: Product[];
}

// Warianty wielkościowe liczone od priceFrom (= "Mały"), ten sam wzorzec
// przyrostu dla wszystkich produktów: Średni +70, Duży +170, MEGA +320.
// Zdjęcia: /public/images/produkty/[slug]-[maly|sredni|duzy|mega].jpg
function variantsFrom(priceFrom: number, slug: string): ProductVariant[] {
  const img = (rozmiar: string) => `/images/produkty/${slug}-${rozmiar}.jpg`;
  return [
    { size: "Mały", price: priceFrom, image: img("maly") },
    { size: "Średni", price: priceFrom + 70, image: img("sredni") },
    { size: "Duży", price: priceFrom + 170, image: img("duzy") },
    { size: "MEGA", price: priceFrom + 320, image: img("mega") },
  ];
}

const NATURALNE_DETAILS = [
  "Skład: kwiaty sezonowe dobierane według dostępności danego dnia",
  "Okazja: na co dzień, w prezencie lub jako dekoracja wnętrza",
  "Trwałość: 5–7 dni przy regularnej wymianie wody",
];

const NOWOCZESNE_DETAILS = [
  "Skład: kwiaty premium w starannie dobranej kolorystyce",
  "Okazja: prezent na specjalne okazje lub do eleganckiego wnętrza",
  "Trwałość: 6–8 dni przy regularnej wymianie wody",
];

const FLOWERBOX_DETAILS = [
  "Skład: kwiaty świeże osadzone w piance florystycznej z zapasem wody",
  "Okazja: idealny prezent — urodziny, rocznica, podziękowanie",
  "Trwałość: 7–10 dni bez konieczności przycinania łodyg",
];

const POGRZEBOWE_DETAILS = [
  "Skład: kwiaty i zieleń dobierane indywidualnie do charakteru uroczystości",
  "Okazja: ceremonie pogrzebowe i żałobne",
  "Realizacja: przygotowanie w dniu odbioru, na indywidualne zamówienie",
];

const PAMIECI_DETAILS = [
  "Skład: kwiaty i zieleń odporne na warunki zewnętrzne",
  "Okazja: odwiedziny na cmentarzu, rocznice, Wszystkich Świętych",
  "Trwałość: dostosowana do ekspozycji na zewnątrz",
];

const ROZ_DETAILS = [
  "Skład: róże premium w wybranej kolorystyce, liczba łodyg dobierana do budżetu",
  "Okazja: rocznice, Walentynki, wyznanie uczuć, ślub",
  "Trwałość: 7–9 dni przy regularnej wymianie wody",
];

const POLNE_DETAILS = [
  "Skład: kwiaty polne i łąkowe zbierane sezonowo",
  "Okazja: na co dzień, prezent bez okazji, dekoracja wnętrza",
  "Trwałość: 4–6 dni — kwiaty polne są delikatniejsze niż szklarniowe",
];

const KOSZE_DETAILS = [
  "Skład: kwiaty świeże osadzone w koszu wiklinowym z wkładem florystycznym",
  "Okazja: prezent, który robi wrażenie — urodziny, gratulacje, powitanie",
  "Trwałość: 6–9 dni bez konieczności przycinania łodyg",
];

const NATURALNOSC_DETAILS = [
  "Skład: zieleń i kwiaty w stonowanej, naturalnej kolorystyce",
  "Okazja: minimalistyczne wnętrza, prezent dla osób ceniących prostotę",
  "Trwałość: 5–7 dni przy regularnej wymianie wody",
];

// ── Produkty ze zdjęć kwiaciarni (B01–B43, F01–F08, W01–W08) ──────────────────
// Indywidualne ceny per rozmiar i zdjęcia: /images/produkty/[slug]-[rozmiar].jpg
// UWAGA: ceny są sugerowane (wycena wstępna) — przed publikacją do potwierdzenia przez florystkę.
const NOWE_PRODUKTY: Record<string, Product[]> = {
  "bukiety-roz": [
    {
      id: "rf-b01", // B01
      slug: "bukiet-czerwonych-roz-z-misiem",
      name: "Bukiet Czerwonych Róż z Misiem",
      priceFrom: 190,
      description:
        "Bukiet Czerwonych Róż z Misiem łączy czerwone róże, biały pluszowy miś, czerwone opakowanie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Czerwone róże, biały pluszowy miś, czerwone opakowanie", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 190, image: "/images/produkty/bukiet-czerwonych-roz-z-misiem-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 280, image: "/images/produkty/bukiet-czerwonych-roz-z-misiem-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 410, image: "/images/produkty/bukiet-czerwonych-roz-z-misiem-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 590, image: "/images/produkty/bukiet-czerwonych-roz-z-misiem-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b03", // B03
      slug: "bukiet-roze-i-slodki-akcent",
      name: "Bukiet Róże i Słodki Akcent",
      priceFrom: 150,
      description:
        "Bukiet Róże i Słodki Akcent łączy czerwone róże i czekoladki, czerwona wstążka. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Czerwone róże i czekoladki, czerwona wstążka", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 150, image: "/images/produkty/bukiet-roze-i-slodki-akcent-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 230, image: "/images/produkty/bukiet-roze-i-slodki-akcent-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 350, image: "/images/produkty/bukiet-roze-i-slodki-akcent-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 500, image: "/images/produkty/bukiet-roze-i-slodki-akcent-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b04", // B04
      slug: "bukiet-kaskada-czerwonych-roz",
      name: "Bukiet Kaskada Czerwonych Róż",
      priceFrom: 480,
      description:
        "Bukiet Kaskada Czerwonych Róż łączy okazała piętrowa kompozycja czerwonych róż z zielenią. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Okazała piętrowa kompozycja czerwonych róż z zielenią", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 480, image: "/images/produkty/bukiet-kaskada-czerwonych-roz-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 690, image: "/images/produkty/bukiet-kaskada-czerwonych-roz-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 990, image: "/images/produkty/bukiet-kaskada-czerwonych-roz-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 1450, image: "/images/produkty/bukiet-kaskada-czerwonych-roz-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b05", // B05
      slug: "bukiet-czerwone-roze-w-rozku",
      name: "Bukiet Czerwone Róże w Rożku",
      priceFrom: 190,
      description:
        "Bukiet Czerwone Róże w Rożku łączy zbite czerwone róże w czerwonym papierze, złoty sznurek. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Zbite czerwone róże w czerwonym papierze, złoty sznurek", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 190, image: "/images/produkty/bukiet-czerwone-roze-w-rozku-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 290, image: "/images/produkty/bukiet-czerwone-roze-w-rozku-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 440, image: "/images/produkty/bukiet-czerwone-roze-w-rozku-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 660, image: "/images/produkty/bukiet-czerwone-roze-w-rozku-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b08", // B08
      slug: "bukiet-bordowe-roze",
      name: "Bukiet Bordowe Róże",
      priceFrom: 240,
      description:
        "Bukiet Bordowe Róże łączy ciemnoczerwone róże, drobne białe akcenty i czerwone opakowanie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Ciemnoczerwone róże, drobne białe akcenty i czerwone opakowanie", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 240, image: "/images/produkty/bukiet-bordowe-roze-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 360, image: "/images/produkty/bukiet-bordowe-roze-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 540, image: "/images/produkty/bukiet-bordowe-roze-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 790, image: "/images/produkty/bukiet-bordowe-roze-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b10", // B10
      slug: "bukiet-geste-czerwone-roze",
      name: "Bukiet Gęste Czerwone Róże",
      priceFrom: 230,
      description:
        "Bukiet Gęste Czerwone Róże łączy gęsty zaokrąglony bukiet samych czerwonych róż. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Gęsty zaokrąglony bukiet samych czerwonych róż", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 230, image: "/images/produkty/bukiet-geste-czerwone-roze-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 350, image: "/images/produkty/bukiet-geste-czerwone-roze-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 530, image: "/images/produkty/bukiet-geste-czerwone-roze-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 790, image: "/images/produkty/bukiet-geste-czerwone-roze-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b12", // B12
      slug: "bukiet-rubinowy-ogrod",
      name: "Bukiet Rubinowy Ogród",
      priceFrom: 420,
      description:
        "Bukiet Rubinowy Ogród łączy bardzo duża okrągła kompozycja czerwonych róż w wazonie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Bardzo duża okrągła kompozycja czerwonych róż w wazonie", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 420, image: "/images/produkty/bukiet-rubinowy-ogrod-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 640, image: "/images/produkty/bukiet-rubinowy-ogrod-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 930, image: "/images/produkty/bukiet-rubinowy-ogrod-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 1360, image: "/images/produkty/bukiet-rubinowy-ogrod-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b13", // B13
      slug: "bukiet-cieple-barwy-w-wazonie",
      name: "Bukiet Ciepłe Barwy w Wazonie",
      priceFrom: 270,
      description:
        "Bukiet Ciepłe Barwy w Wazonie łączy pomarańczowe, czerwone i różowe róże, drobna biel, wazon. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Pomarańczowe, czerwone i różowe róże, drobna biel, wazon", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 270, image: "/images/produkty/bukiet-cieple-barwy-w-wazonie-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 400, image: "/images/produkty/bukiet-cieple-barwy-w-wazonie-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 570, image: "/images/produkty/bukiet-cieple-barwy-w-wazonie-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 820, image: "/images/produkty/bukiet-cieple-barwy-w-wazonie-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b18", // B18
      slug: "bukiet-klasyczne-czerwone-roze",
      name: "Bukiet Klasyczne Czerwone Róże",
      priceFrom: 180,
      description:
        "Bukiet Klasyczne Czerwone Róże łączy klasyczny pęk czerwonych róż, bez masywnych dodatków. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Klasyczny pęk czerwonych róż, bez masywnych dodatków", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-klasyczne-czerwone-roze-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 270, image: "/images/produkty/bukiet-klasyczne-czerwone-roze-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 410, image: "/images/produkty/bukiet-klasyczne-czerwone-roze-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 610, image: "/images/produkty/bukiet-klasyczne-czerwone-roze-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b19", // B19
      slug: "bukiet-biale-roze-i-gipsowka",
      name: "Bukiet Białe Róże i Gipsówka",
      priceFrom: 180,
      description:
        "Bukiet Białe Róże i Gipsówka łączy białe róże i gipsówka w jasnym opakowaniu. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Białe róże i gipsówka w jasnym opakowaniu", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-biale-roze-i-gipsowka-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 270, image: "/images/produkty/bukiet-biale-roze-i-gipsowka-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 410, image: "/images/produkty/bukiet-biale-roze-i-gipsowka-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 610, image: "/images/produkty/bukiet-biale-roze-i-gipsowka-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b20", // B20
      slug: "bukiet-czerwonych-roz-xxl",
      name: "Bukiet Czerwonych Róż XXL",
      priceFrom: 380,
      description:
        "Bukiet Czerwonych Róż XXL łączy bardzo obfity bukiet samych czerwonych róż z wstążką. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Bardzo obfity bukiet samych czerwonych róż z wstążką", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 380, image: "/images/produkty/bukiet-czerwonych-roz-xxl-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 580, image: "/images/produkty/bukiet-czerwonych-roz-xxl-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 850, image: "/images/produkty/bukiet-czerwonych-roz-xxl-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 1250, image: "/images/produkty/bukiet-czerwonych-roz-xxl-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b22", // B22
      slug: "bukiet-pudrowe-roze",
      name: "Bukiet Pudrowe Róże",
      priceFrom: 180,
      description:
        "Bukiet Pudrowe Róże łączy jasnoróżowe róże i obfita gipsówka w różowym papierze. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Jasnoróżowe róże i obfita gipsówka w różowym papierze", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-pudrowe-roze-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 270, image: "/images/produkty/bukiet-pudrowe-roze-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 400, image: "/images/produkty/bukiet-pudrowe-roze-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 580, image: "/images/produkty/bukiet-pudrowe-roze-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b28", // B28
      slug: "bukiet-roz-i-pistacji",
      name: "Bukiet Róż i Pistacji",
      priceFrom: 190,
      description:
        "Bukiet Róż i Pistacji łączy pudrowe róże, jasnozielone kwiaty, kremowe opakowanie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Pudrowe róże, jasnozielone kwiaty, kremowe opakowanie", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 190, image: "/images/produkty/bukiet-roz-i-pistacji-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 280, image: "/images/produkty/bukiet-roz-i-pistacji-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 420, image: "/images/produkty/bukiet-roz-i-pistacji-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 610, image: "/images/produkty/bukiet-roz-i-pistacji-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b29", // B29
      slug: "bukiet-roze-bez-opakowania",
      name: "Bukiet Róże Bez Opakowania",
      priceFrom: 180,
      description:
        "Bukiet Róże Bez Opakowania łączy czerwone róże z długimi odsłoniętymi łodygami. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Czerwone róże z długimi odsłoniętymi łodygami", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-roze-bez-opakowania-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 280, image: "/images/produkty/bukiet-roze-bez-opakowania-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 420, image: "/images/produkty/bukiet-roze-bez-opakowania-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 630, image: "/images/produkty/bukiet-roze-bez-opakowania-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b32", // B32
      slug: "bukiet-jasny-roz",
      name: "Bukiet Jasny Róż",
      priceFrom: 170,
      description:
        "Bukiet Jasny Róż łączy jasnoróżowe i kremowe róże z delikatną gipsówką. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Jasnoróżowe i kremowe róże z delikatną gipsówką", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 170, image: "/images/produkty/bukiet-jasny-roz-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 250, image: "/images/produkty/bukiet-jasny-roz-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 380, image: "/images/produkty/bukiet-jasny-roz-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 550, image: "/images/produkty/bukiet-jasny-roz-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b36", // B36
      slug: "bukiet-male-rozowe-roze",
      name: "Bukiet Małe Różowe Róże",
      priceFrom: 180,
      description:
        "Bukiet Małe Różowe Róże łączy drobne różowe róże w zwartych pękach, ciemny papier. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Drobne różowe róże w zwartych pękach, ciemny papier", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-male-rozowe-roze-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 270, image: "/images/produkty/bukiet-male-rozowe-roze-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 410, image: "/images/produkty/bukiet-male-rozowe-roze-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 600, image: "/images/produkty/bukiet-male-rozowe-roze-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b40", // B40
      slug: "bukiet-czerwone-roze-wielki-gest",
      name: "Bukiet Czerwone Róże Wielki Gest",
      priceFrom: 460,
      description:
        "Bukiet Czerwone Róże Wielki Gest łączy bardzo szeroki gęsty bukiet czerwonych róż. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Bardzo szeroki gęsty bukiet czerwonych róż", ...ROZ_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 460, image: "/images/produkty/bukiet-czerwone-roze-wielki-gest-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 700, image: "/images/produkty/bukiet-czerwone-roze-wielki-gest-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 1020, image: "/images/produkty/bukiet-czerwone-roze-wielki-gest-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 1500, image: "/images/produkty/bukiet-czerwone-roze-wielki-gest-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
  ],
  "bukiety-naturalne": [
    {
      id: "rf-b02", // B02
      slug: "bukiet-rozowy-z-misiem",
      name: "Bukiet Różowy z Misiem",
      priceFrom: 170,
      description:
        "Bukiet Różowy z Misiem łączy różowe kwiaty, gipsówka, biały pluszowy miś, pudrowe opakowanie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe kwiaty, gipsówka, biały pluszowy miś, pudrowe opakowanie", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 170, image: "/images/produkty/bukiet-rozowy-z-misiem-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 250, image: "/images/produkty/bukiet-rozowy-z-misiem-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 370, image: "/images/produkty/bukiet-rozowy-z-misiem-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 540, image: "/images/produkty/bukiet-rozowy-z-misiem-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b06", // B06
      slug: "bukiet-swiateczna-elegancja",
      name: "Bukiet Świąteczna Elegancja",
      priceFrom: 240,
      description:
        "Bukiet Świąteczna Elegancja łączy białe lilie, czerwone róże, igliwie i czerwone dodatki. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Białe lilie, czerwone róże, igliwie i czerwone dodatki", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 240, image: "/images/produkty/bukiet-swiateczna-elegancja-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 350, image: "/images/produkty/bukiet-swiateczna-elegancja-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 510, image: "/images/produkty/bukiet-swiateczna-elegancja-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 740, image: "/images/produkty/bukiet-swiateczna-elegancja-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b07", // B07
      slug: "bukiet-kolorowa-kompozycja",
      name: "Bukiet Kolorowa Kompozycja",
      priceFrom: 250,
      description:
        "Bukiet Kolorowa Kompozycja łączy gerbery, róże i drobne kwiaty w ciepłych barwach, elegancki wazon. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Gerbery, róże i drobne kwiaty w ciepłych barwach, elegancki wazon", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 250, image: "/images/produkty/bukiet-kolorowa-kompozycja-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 380, image: "/images/produkty/bukiet-kolorowa-kompozycja-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 550, image: "/images/produkty/bukiet-kolorowa-kompozycja-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 790, image: "/images/produkty/bukiet-kolorowa-kompozycja-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b14", // B14
      slug: "bukiet-letni-rozmach",
      name: "Bukiet Letni Rozmach",
      priceFrom: 330,
      description:
        "Bukiet Letni Rozmach łączy duży mieszany bukiet w różach, kremie, czerwieni i pomarańczu. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Duży mieszany bukiet w różach, kremie, czerwieni i pomarańczu", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 330, image: "/images/produkty/bukiet-letni-rozmach-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 480, image: "/images/produkty/bukiet-letni-rozmach-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 690, image: "/images/produkty/bukiet-letni-rozmach-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 990, image: "/images/produkty/bukiet-letni-rozmach-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b25", // B25
      slug: "bukiet-mis-i-drobne-kwiaty",
      name: "Bukiet Miś i Drobne Kwiaty",
      priceFrom: 200,
      description:
        "Bukiet Miś i Drobne Kwiaty łączy brązowy miś w drobnych różowych i fioletowych kwiatach. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Brązowy miś w drobnych różowych i fioletowych kwiatach", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 200, image: "/images/produkty/bukiet-mis-i-drobne-kwiaty-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 290, image: "/images/produkty/bukiet-mis-i-drobne-kwiaty-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 420, image: "/images/produkty/bukiet-mis-i-drobne-kwiaty-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 590, image: "/images/produkty/bukiet-mis-i-drobne-kwiaty-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b26", // B26
      slug: "bukiet-brzoskwinia-i-sliwka",
      name: "Bukiet Brzoskwinia i Śliwka",
      priceFrom: 200,
      description:
        "Bukiet Brzoskwinia i Śliwka łączy brzoskwiniowe róże, fioletowe i bordowe kwiaty, jasnoróżowe opakowanie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Brzoskwiniowe róże, fioletowe i bordowe kwiaty, jasnoróżowe opakowanie", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 200, image: "/images/produkty/bukiet-brzoskwinia-i-sliwka-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 300, image: "/images/produkty/bukiet-brzoskwinia-i-sliwka-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 450, image: "/images/produkty/bukiet-brzoskwinia-i-sliwka-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 660, image: "/images/produkty/bukiet-brzoskwinia-i-sliwka-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b30", // B30
      slug: "bukiet-lilie-i-rozowe-kwiaty",
      name: "Bukiet Lilie i Różowe Kwiaty",
      priceFrom: 220,
      description:
        "Bukiet Lilie i Różowe Kwiaty łączy jasne lilie, różowe drobne kwiaty, biała osłona. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Jasne lilie, różowe drobne kwiaty, biała osłona", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 220, image: "/images/produkty/bukiet-lilie-i-rozowe-kwiaty-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 330, image: "/images/produkty/bukiet-lilie-i-rozowe-kwiaty-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 490, image: "/images/produkty/bukiet-lilie-i-rozowe-kwiaty-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 710, image: "/images/produkty/bukiet-lilie-i-rozowe-kwiaty-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b33", // B33
      slug: "bukiet-pastelowy-ogrod",
      name: "Bukiet Pastelowy Ogród",
      priceFrom: 190,
      description:
        "Bukiet Pastelowy Ogród łączy różowe róże, delikatne zielone kwiaty, gipsówka, jasny papier. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe róże, delikatne zielone kwiaty, gipsówka, jasny papier", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 190, image: "/images/produkty/bukiet-pastelowy-ogrod-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 280, image: "/images/produkty/bukiet-pastelowy-ogrod-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 420, image: "/images/produkty/bukiet-pastelowy-ogrod-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 610, image: "/images/produkty/bukiet-pastelowy-ogrod-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b37", // B37
      slug: "bukiet-pastelowe-gerbery",
      name: "Bukiet Pastelowe Gerbery",
      priceFrom: 190,
      description:
        "Bukiet Pastelowe Gerbery łączy jasne gerbery, kremowe róże, drobne kwiaty, biały papier. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Jasne gerbery, kremowe róże, drobne kwiaty, biały papier", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 190, image: "/images/produkty/bukiet-pastelowe-gerbery-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 280, image: "/images/produkty/bukiet-pastelowe-gerbery-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 420, image: "/images/produkty/bukiet-pastelowe-gerbery-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 610, image: "/images/produkty/bukiet-pastelowe-gerbery-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b38", // B38
      slug: "bukiet-pelen-kolorow",
      name: "Bukiet Pełen Kolorów",
      priceFrom: 220,
      description:
        "Bukiet Pełen Kolorów łączy wielobarwne róże, drobne żółte i fioletowe kwiaty, jasne opakowanie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Wielobarwne róże, drobne żółte i fioletowe kwiaty, jasne opakowanie", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 220, image: "/images/produkty/bukiet-pelen-kolorow-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 330, image: "/images/produkty/bukiet-pelen-kolorow-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 490, image: "/images/produkty/bukiet-pelen-kolorow-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 710, image: "/images/produkty/bukiet-pelen-kolorow-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b39", // B39
      slug: "bukiet-rozowe-tulipany",
      name: "Bukiet Różowe Tulipany",
      priceFrom: 150,
      description:
        "Bukiet Różowe Tulipany łączy różowe tulipany w różowym opakowaniu. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe tulipany w różowym opakowaniu", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 150, image: "/images/produkty/bukiet-rozowe-tulipany-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 220, image: "/images/produkty/bukiet-rozowe-tulipany-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 330, image: "/images/produkty/bukiet-rozowe-tulipany-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 490, image: "/images/produkty/bukiet-rozowe-tulipany-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b41", // B41
      slug: "bukiet-kolorowe-tulipany",
      name: "Bukiet Kolorowe Tulipany",
      priceFrom: 160,
      description:
        "Bukiet Kolorowe Tulipany łączy różowe i żółte tulipany w pudrowym opakowaniu. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe i żółte tulipany w pudrowym opakowaniu", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 160, image: "/images/produkty/bukiet-kolorowe-tulipany-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 240, image: "/images/produkty/bukiet-kolorowe-tulipany-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 360, image: "/images/produkty/bukiet-kolorowe-tulipany-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 530, image: "/images/produkty/bukiet-kolorowe-tulipany-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b43", // B43
      slug: "bukiet-piwoniowy-roz",
      name: "Bukiet Piwoniowy Róż",
      priceFrom: 290,
      description:
        "Bukiet Piwoniowy Róż łączy różowe piwonie i róże w pudrowym papierze. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe piwonie i róże w pudrowym papierze", ...NATURALNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 290, image: "/images/produkty/bukiet-piwoniowy-roz-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 430, image: "/images/produkty/bukiet-piwoniowy-roz-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 630, image: "/images/produkty/bukiet-piwoniowy-roz-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 920, image: "/images/produkty/bukiet-piwoniowy-roz-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
  ],
  "bukiety-polne": [
    {
      id: "rf-b09", // B09
      slug: "bukiet-slonecznikowy-klasyczny",
      name: "Bukiet Słonecznikowy Klasyczny",
      priceFrom: 130,
      description:
        "Bukiet Słonecznikowy Klasyczny łączy słoneczniki w prostym papierze kraftowym. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Słoneczniki w prostym papierze kraftowym", ...POLNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 130, image: "/images/produkty/bukiet-slonecznikowy-klasyczny-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 200, image: "/images/produkty/bukiet-slonecznikowy-klasyczny-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 300, image: "/images/produkty/bukiet-slonecznikowy-klasyczny-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 450, image: "/images/produkty/bukiet-slonecznikowy-klasyczny-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b15", // B15
      slug: "bukiet-sloneczniki-i-kwiaty-polne",
      name: "Bukiet Słoneczniki i Kwiaty Polne",
      priceFrom: 180,
      description:
        "Bukiet Słoneczniki i Kwiaty Polne łączy słoneczniki, drobne fioletowe kwiaty i ciemne róże, naturalny papier. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Słoneczniki, drobne fioletowe kwiaty i ciemne róże, naturalny papier", ...POLNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-sloneczniki-i-kwiaty-polne-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 270, image: "/images/produkty/bukiet-sloneczniki-i-kwiaty-polne-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 400, image: "/images/produkty/bukiet-sloneczniki-i-kwiaty-polne-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 590, image: "/images/produkty/bukiet-sloneczniki-i-kwiaty-polne-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b17", // B17
      slug: "bukiet-slonecznik-i-czerwone-roze",
      name: "Bukiet Słonecznik i Czerwone Róże",
      priceFrom: 200,
      description:
        "Bukiet Słonecznik i Czerwone Róże łączy słonecznik otoczony czerwonymi różami i drobnymi kwiatami. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Słonecznik otoczony czerwonymi różami i drobnymi kwiatami", ...POLNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 200, image: "/images/produkty/bukiet-slonecznik-i-czerwone-roze-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 300, image: "/images/produkty/bukiet-slonecznik-i-czerwone-roze-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 450, image: "/images/produkty/bukiet-slonecznik-i-czerwone-roze-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 660, image: "/images/produkty/bukiet-slonecznik-i-czerwone-roze-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b27", // B27
      slug: "bukiet-pastelowa-laka",
      name: "Bukiet Pastelowa Łąka",
      priceFrom: 180,
      description:
        "Bukiet Pastelowa Łąka łączy żółte, morelowe i różowe kwiaty w lekkiej ogrodowej formie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Żółte, morelowe i różowe kwiaty w lekkiej ogrodowej formie", ...POLNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-pastelowa-laka-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 270, image: "/images/produkty/bukiet-pastelowa-laka-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 400, image: "/images/produkty/bukiet-pastelowa-laka-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 580, image: "/images/produkty/bukiet-pastelowa-laka-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b31", // B31
      slug: "bukiet-slonecznikowy-mix",
      name: "Bukiet Słonecznikowy Mix",
      priceFrom: 150,
      description:
        "Bukiet Słonecznikowy Mix łączy słonecznik, kolorowe drobne kwiaty, żółte opakowanie. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Słonecznik, kolorowe drobne kwiaty, żółte opakowanie", ...POLNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 150, image: "/images/produkty/bukiet-slonecznikowy-mix-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 230, image: "/images/produkty/bukiet-slonecznikowy-mix-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 350, image: "/images/produkty/bukiet-slonecznikowy-mix-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 510, image: "/images/produkty/bukiet-slonecznikowy-mix-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b34", // B34
      slug: "bukiet-zywe-kolory",
      name: "Bukiet Żywe Kolory",
      priceFrom: 190,
      description:
        "Bukiet Żywe Kolory łączy czerwone, żółte i różowe kwiaty z niebieskim akcentem. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Czerwone, żółte i różowe kwiaty z niebieskim akcentem", ...POLNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 190, image: "/images/produkty/bukiet-zywe-kolory-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 290, image: "/images/produkty/bukiet-zywe-kolory-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 430, image: "/images/produkty/bukiet-zywe-kolory-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 630, image: "/images/produkty/bukiet-zywe-kolory-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
  ],
  "bukiety-nowoczesne": [
    {
      id: "rf-b11", // B11
      slug: "bukiet-fiolet-i-blekit",
      name: "Bukiet Fiolet i Błękit",
      priceFrom: 260,
      description:
        "Bukiet Fiolet i Błękit łączy fioletowe, różowe i błękitne kwiaty z kremowymi różami. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Fioletowe, różowe i błękitne kwiaty z kremowymi różami", ...NOWOCZESNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 260, image: "/images/produkty/bukiet-fiolet-i-blekit-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 390, image: "/images/produkty/bukiet-fiolet-i-blekit-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 580, image: "/images/produkty/bukiet-fiolet-i-blekit-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 840, image: "/images/produkty/bukiet-fiolet-i-blekit-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b16", // B16
      slug: "bukiet-blekitna-hortensja",
      name: "Bukiet Błękitna Hortensja",
      priceFrom: 260,
      description:
        "Bukiet Błękitna Hortensja łączy błękitna hortensja, kremowe róże, delikatna zieleń i niebieska wstążka. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Błękitna hortensja, kremowe róże, delikatna zieleń i niebieska wstążka", ...NOWOCZESNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 260, image: "/images/produkty/bukiet-blekitna-hortensja-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 390, image: "/images/produkty/bukiet-blekitna-hortensja-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 570, image: "/images/produkty/bukiet-blekitna-hortensja-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 830, image: "/images/produkty/bukiet-blekitna-hortensja-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b24", // B24
      slug: "bukiet-pastelowe-hortensje",
      name: "Bukiet Pastelowe Hortensje",
      priceFrom: 260,
      description:
        "Bukiet Pastelowe Hortensje łączy duże hortensje w błękicie, różu i bieli z gipsówką. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Duże hortensje w błękicie, różu i bieli z gipsówką", ...NOWOCZESNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 260, image: "/images/produkty/bukiet-pastelowe-hortensje-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 390, image: "/images/produkty/bukiet-pastelowe-hortensje-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 580, image: "/images/produkty/bukiet-pastelowe-hortensje-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 850, image: "/images/produkty/bukiet-pastelowe-hortensje-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b35", // B35
      slug: "bukiet-fioletowe-lilie",
      name: "Bukiet Fioletowe Lilie",
      priceFrom: 280,
      description:
        "Bukiet Fioletowe Lilie łączy fioletowe lilie, hortensje i jasne róże, brzoskwiniowy papier. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Fioletowe lilie, hortensje i jasne róże, brzoskwiniowy papier", ...NOWOCZESNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 280, image: "/images/produkty/bukiet-fioletowe-lilie-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 420, image: "/images/produkty/bukiet-fioletowe-lilie-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 610, image: "/images/produkty/bukiet-fioletowe-lilie-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 890, image: "/images/produkty/bukiet-fioletowe-lilie-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b42", // B42
      slug: "bukiet-blekitny-akcent",
      name: "Bukiet Błękitny Akcent",
      priceFrom: 220,
      description:
        "Bukiet Błękitny Akcent łączy białe i różowe róże, intensywne błękitne drobne dodatki. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Białe i różowe róże, intensywne błękitne drobne dodatki", ...NOWOCZESNE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 220, image: "/images/produkty/bukiet-blekitny-akcent-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 330, image: "/images/produkty/bukiet-blekitny-akcent-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 490, image: "/images/produkty/bukiet-blekitny-akcent-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 710, image: "/images/produkty/bukiet-blekitny-akcent-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
  ],
  "naturalnosc": [
    {
      id: "rf-b21", // B21
      slug: "bukiet-krem-i-zielen",
      name: "Bukiet Krem i Zieleń",
      priceFrom: 180,
      description:
        "Bukiet Krem i Zieleń łączy kremowe róże, jasnozielone pąki i liście w pudrowym papierze. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Kremowe róże, jasnozielone pąki i liście w pudrowym papierze", ...NATURALNOSC_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 180, image: "/images/produkty/bukiet-krem-i-zielen-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 270, image: "/images/produkty/bukiet-krem-i-zielen-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 400, image: "/images/produkty/bukiet-krem-i-zielen-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 580, image: "/images/produkty/bukiet-krem-i-zielen-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
    {
      id: "rf-b23", // B23
      slug: "bukiet-biala-gipsowka",
      name: "Bukiet Biała Gipsówka",
      priceFrom: 130,
      description:
        "Bukiet Biała Gipsówka łączy sama biała gipsówka z zielenią, lekki okrągły kształt. Układamy go ręcznie, zachowując charakter kompozycji widocznej na zdjęciach Royal Flowers. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Sama biała gipsówka z zielenią, lekki okrągły kształt", ...NATURALNOSC_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 130, image: "/images/produkty/bukiet-biala-gipsowka-maly.jpg", description: "Zgrabna wersja, którą wygodnie trzyma się w jednej dłoni." },
        { size: "Średni", price: 190, image: "/images/produkty/bukiet-biala-gipsowka-sredni.jpg", description: "Pełniejszy bukiet, który daje kwiatom więcej miejsca i objętości." },
        { size: "Duży", price: 280, image: "/images/produkty/bukiet-biala-gipsowka-duzy.jpg", description: "Wyrazista, obfita kompozycja o większej średnicy." },
        { size: "MEGA", price: 410, image: "/images/produkty/bukiet-biala-gipsowka-mega.jpg", description: "Najbardziej okazała odsłona tej kompozycji, przygotowana z rozmachem." },
      ],
    },
  ],
  "flowerboxy": [
    {
      id: "rf-f01", // F01
      slug: "flowerbox-pudrowa-roza",
      name: "Flowerbox Pudrowa Róża",
      priceFrom: 230,
      description:
        "Flowerbox Pudrowa Róża to kompozycja z różowe peonie i kremowe róże w różowym okrągłym pudełku. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe peonie i kremowe róże w różowym okrągłym pudełku", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 230, image: "/images/produkty/flowerbox-pudrowa-roza-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 330, image: "/images/produkty/flowerbox-pudrowa-roza-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 470, image: "/images/produkty/flowerbox-pudrowa-roza-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 660, image: "/images/produkty/flowerbox-pudrowa-roza-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
    {
      id: "rf-f02", // F02
      slug: "flowerbox-swiateczna-czerwien",
      name: "Flowerbox Świąteczna Czerwień",
      priceFrom: 260,
      description:
        "Flowerbox Świąteczna Czerwień to kompozycja z czerwone róże, biała bawełna, ciemnozielony pojemnik, świąteczne detale. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Czerwone róże, biała bawełna, ciemnozielony pojemnik, świąteczne detale", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 260, image: "/images/produkty/flowerbox-swiateczna-czerwien-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 370, image: "/images/produkty/flowerbox-swiateczna-czerwien-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 530, image: "/images/produkty/flowerbox-swiateczna-czerwien-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 740, image: "/images/produkty/flowerbox-swiateczna-czerwien-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
    {
      id: "rf-f03", // F03
      slug: "flowerbox-bordowa-zielen",
      name: "Flowerbox Bordowa Zieleń",
      priceFrom: 260,
      description:
        "Flowerbox Bordowa Zieleń to kompozycja z ciemnoczerwone róże i zielone liście w zielonym cylindrze. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Ciemnoczerwone róże i zielone liście w zielonym cylindrze", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 260, image: "/images/produkty/flowerbox-bordowa-zielen-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 380, image: "/images/produkty/flowerbox-bordowa-zielen-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 540, image: "/images/produkty/flowerbox-bordowa-zielen-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 760, image: "/images/produkty/flowerbox-bordowa-zielen-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
    {
      id: "rf-f04", // F04
      slug: "flowerbox-rozowy-ogrod",
      name: "Flowerbox Różowy Ogród",
      priceFrom: 230,
      description:
        "Flowerbox Różowy Ogród to kompozycja z różowe gerbery, róże i drobne kwiaty w pudrowym pudełku. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe gerbery, róże i drobne kwiaty w pudrowym pudełku", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 230, image: "/images/produkty/flowerbox-rozowy-ogrod-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 330, image: "/images/produkty/flowerbox-rozowy-ogrod-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 470, image: "/images/produkty/flowerbox-rozowy-ogrod-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 660, image: "/images/produkty/flowerbox-rozowy-ogrod-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
    {
      id: "rf-f05", // F05
      slug: "flowerbox-z-misiem-pastelowy",
      name: "Flowerbox z Misiem Pastelowy",
      priceFrom: 280,
      description:
        "Flowerbox z Misiem Pastelowy to kompozycja z biały miś, jasne róże i kwiaty w kremowym cylindrze. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Biały miś, jasne róże i kwiaty w kremowym cylindrze", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 280, image: "/images/produkty/flowerbox-z-misiem-pastelowy-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 390, image: "/images/produkty/flowerbox-z-misiem-pastelowy-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 550, image: "/images/produkty/flowerbox-z-misiem-pastelowy-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 770, image: "/images/produkty/flowerbox-z-misiem-pastelowy-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
    {
      id: "rf-f06", // F06
      slug: "flowerbox-fioletowa-hortensja",
      name: "Flowerbox Fioletowa Hortensja",
      priceFrom: 230,
      description:
        "Flowerbox Fioletowa Hortensja to kompozycja z fioletowe hortensje i drobne różowe kwiaty w jasnym pudełku. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Fioletowe hortensje i drobne różowe kwiaty w jasnym pudełku", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 230, image: "/images/produkty/flowerbox-fioletowa-hortensja-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 340, image: "/images/produkty/flowerbox-fioletowa-hortensja-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 480, image: "/images/produkty/flowerbox-fioletowa-hortensja-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 680, image: "/images/produkty/flowerbox-fioletowa-hortensja-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
    {
      id: "rf-f07", // F07
      slug: "flowerbox-rozowe-serce",
      name: "Flowerbox Różowe Serce",
      priceFrom: 250,
      description:
        "Flowerbox Różowe Serce to kompozycja z różowe kwiaty w okrągłym białym pudełku z motywem serca. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe kwiaty w okrągłym białym pudełku z motywem serca", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 250, image: "/images/produkty/flowerbox-rozowe-serce-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 360, image: "/images/produkty/flowerbox-rozowe-serce-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 510, image: "/images/produkty/flowerbox-rozowe-serce-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 720, image: "/images/produkty/flowerbox-rozowe-serce-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
    {
      id: "rf-f08", // F08
      slug: "flowerbox-ogrodowy-roz",
      name: "Flowerbox Ogrodowy Róż",
      priceFrom: 220,
      description:
        "Flowerbox Ogrodowy Róż to kompozycja z różowe gerbery i róże w prostym różowym cylindrze. Kwiaty układamy w pudełku tak, by zachować lekkość i proporcje pierwowzoru. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Różowe gerbery i róże w prostym różowym cylindrze", ...FLOWERBOX_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 220, image: "/images/produkty/flowerbox-ogrodowy-roz-maly.jpg", description: "Niewielki box, który łatwo postawić na biurku lub stoliku." },
        { size: "Średni", price: 320, image: "/images/produkty/flowerbox-ogrodowy-roz-sredni.jpg", description: "Pełniejsza kompozycja w pudełku o średniej wielkości." },
        { size: "Duży", price: 460, image: "/images/produkty/flowerbox-ogrodowy-roz-duzy.jpg", description: "Duży box z bogatszą liczbą kwiatów." },
        { size: "MEGA", price: 650, image: "/images/produkty/flowerbox-ogrodowy-roz-mega.jpg", description: "Najbardziej obfita wersja tej kompozycji w dużym pudełku." },
      ],
    },
  ],
  "kompozycje-pogrzebowe": [
    {
      id: "rf-w01", // W01
      slug: "wieniec-fioletowe-pozegnanie",
      name: "Wieniec Fioletowe Pożegnanie",
      priceFrom: 450,
      description:
        "Wieniec Fioletowe Pożegnanie to kompozycja pożegnalna: wysoki wieniec na stojaku, fioletowe hortensje, różowe kwiaty i biała szarfa. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Wysoki wieniec na stojaku, fioletowe hortensje, różowe kwiaty i biała szarfa", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 450, image: "/images/produkty/wieniec-fioletowe-pozegnanie-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 620, image: "/images/produkty/wieniec-fioletowe-pozegnanie-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 850, image: "/images/produkty/wieniec-fioletowe-pozegnanie-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1160, image: "/images/produkty/wieniec-fioletowe-pozegnanie-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
    {
      id: "rf-w02", // W02
      slug: "wieniec-roz-i-kremu",
      name: "Wieniec Róż i Kremu",
      priceFrom: 490,
      description:
        "Wieniec Róż i Kremu to kompozycja pożegnalna: wysoki wieniec na stojaku, jasne róże, kremowe lilie, różowe kwiaty i szarfa. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Wysoki wieniec na stojaku, jasne róże, kremowe lilie, różowe kwiaty i szarfa", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 490, image: "/images/produkty/wieniec-roz-i-kremu-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 680, image: "/images/produkty/wieniec-roz-i-kremu-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 930, image: "/images/produkty/wieniec-roz-i-kremu-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1270, image: "/images/produkty/wieniec-roz-i-kremu-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
    {
      id: "rf-w03", // W03
      slug: "wieniec-bordo-i-blekit",
      name: "Wieniec Bordo i Błękit",
      priceFrom: 520,
      description:
        "Wieniec Bordo i Błękit to kompozycja pożegnalna: wieniec na stojaku w czerwieni i błękicie z zielenią. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Wieniec na stojaku w czerwieni i błękicie z zielenią", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 520, image: "/images/produkty/wieniec-bordo-i-blekit-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 720, image: "/images/produkty/wieniec-bordo-i-blekit-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 980, image: "/images/produkty/wieniec-bordo-i-blekit-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1340, image: "/images/produkty/wieniec-bordo-i-blekit-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
    {
      id: "rf-w04", // W04
      slug: "serce-z-czerwonych-roz",
      name: "Serce z Czerwonych Róż",
      priceFrom: 580,
      description:
        "Serce z Czerwonych Róż to kompozycja pożegnalna: duże serce z czerwonych róż na stojaku, pusty środek. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Duże serce z czerwonych róż na stojaku, pusty środek", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 580, image: "/images/produkty/serce-z-czerwonych-roz-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 800, image: "/images/produkty/serce-z-czerwonych-roz-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 1110, image: "/images/produkty/serce-z-czerwonych-roz-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1530, image: "/images/produkty/serce-z-czerwonych-roz-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
    {
      id: "rf-w05", // W05
      slug: "wieniec-kolorowe-wspomnienie",
      name: "Wieniec Kolorowe Wspomnienie",
      priceFrom: 520,
      description:
        "Wieniec Kolorowe Wspomnienie to kompozycja pożegnalna: okrągły gęsty wieniec mieszany z kremem, różem i bordo. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Okrągły gęsty wieniec mieszany z kremem, różem i bordo", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 520, image: "/images/produkty/wieniec-kolorowe-wspomnienie-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 720, image: "/images/produkty/wieniec-kolorowe-wspomnienie-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 980, image: "/images/produkty/wieniec-kolorowe-wspomnienie-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1340, image: "/images/produkty/wieniec-kolorowe-wspomnienie-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
    {
      id: "rf-w06", // W06
      slug: "wieniec-bordowa-klasyka",
      name: "Wieniec Bordowa Klasyka",
      priceFrom: 540,
      description:
        "Wieniec Bordowa Klasyka to kompozycja pożegnalna: wysoki wieniec na stojaku, ciemnoczerwone róże, białe kwiaty i zielona szarfa. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Wysoki wieniec na stojaku, ciemnoczerwone róże, białe kwiaty i zielona szarfa", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 540, image: "/images/produkty/wieniec-bordowa-klasyka-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 750, image: "/images/produkty/wieniec-bordowa-klasyka-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 1020, image: "/images/produkty/wieniec-bordowa-klasyka-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1390, image: "/images/produkty/wieniec-bordowa-klasyka-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
    {
      id: "rf-w07", // W07
      slug: "wieniec-biala-cisza",
      name: "Wieniec Biała Cisza",
      priceFrom: 510,
      description:
        "Wieniec Biała Cisza to kompozycja pożegnalna: wysoki wieniec na stojaku, wyłącznie białe kwiaty i gęsta zieleń. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Wysoki wieniec na stojaku, wyłącznie białe kwiaty i gęsta zieleń", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 510, image: "/images/produkty/wieniec-biala-cisza-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 710, image: "/images/produkty/wieniec-biala-cisza-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 970, image: "/images/produkty/wieniec-biala-cisza-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1320, image: "/images/produkty/wieniec-biala-cisza-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
    {
      id: "rf-w08", // W08
      slug: "wieniec-czerwone-roze",
      name: "Wieniec Czerwone Róże",
      priceFrom: 580,
      description:
        "Wieniec Czerwone Róże to kompozycja pożegnalna: wysoki okrągły wieniec na stojaku, same czerwone róże, zielona szarfa. Każdy egzemplarz układamy ręcznie, z dbałością o spokojną i godną formę. Gatunki i odcienie mogą nieznacznie zmieniać się w zależności od sezonu i dostępności, przy zachowaniu kolorystyki, formy oraz wielkości zamówionego wariantu.",
      details: ["Skład: Wysoki okrągły wieniec na stojaku, same czerwone róże, zielona szarfa", ...POGRZEBOWE_DETAILS.slice(1)],
      variants: [
        { size: "Mały", price: 580, image: "/images/produkty/wieniec-czerwone-roze-maly.jpg", description: "Kameralna kompozycja na stojaku, zachowująca charakter wzoru." },
        { size: "Średni", price: 810, image: "/images/produkty/wieniec-czerwone-roze-sredni.jpg", description: "Pełniejszy wieniec na stojaku, przeznaczony na uroczystość pożegnalną." },
        { size: "Duży", price: 1130, image: "/images/produkty/wieniec-czerwone-roze-duzy.jpg", description: "Duży wieniec o wyraźnie bogatszym układzie kwiatów." },
        { size: "MEGA", price: 1560, image: "/images/produkty/wieniec-czerwone-roze-mega.jpg", description: "Najbardziej okazała wersja, z dużą konstrukcją i pełnym układem kwiatów." },
      ],
    },
  ],
};

const BAZOWE_KATEGORIE: Category[] = [
  {
    slug: "bukiety-naturalne",
    name: "Bukiety Naturalne",
    image: "/images/realizacje/bukiety/IMG_5313.jpg",
    description:
      "Naturalnie piękne kompozycje z sezonowych kwiatów. Lekkość i elegancja prosto z łąki.",
    products: [
      {
        id: "bn-1",
        slug: "bukiet-polny",
        name: "Bukiet Polny",
        priceFrom: 120,
        description:
          "Bukiet Polny to naturalnie piękna kompozycja z sezonowych kwiatów, wiązana ręcznie tak, by zachować lekkość i swobodny, łąkowy charakter.",
        details: NATURALNE_DETAILS,
        variants: variantsFrom(120, "bukiet-polny"),
        featured: true,
      },
      {
        id: "bn-2",
        slug: "bukiet-slonecznikowy",
        name: "Bukiet Słonecznikowy",
        priceFrom: 100,
        description:
          "Bukiet Słonecznikowy to naturalnie piękna kompozycja z sezonowych kwiatów, wiązana ręcznie tak, by zachować lekkość i swobodny, łąkowy charakter.",
        details: NATURALNE_DETAILS,
        variants: variantsFrom(100, "bukiet-slonecznikowy"),
        featured: true,
      },
      {
        id: "bn-3",
        slug: "bukiet-wiosenny",
        name: "Bukiet Wiosenny",
        priceFrom: 130,
        description:
          "Bukiet Wiosenny to naturalnie piękna kompozycja z sezonowych kwiatów, wiązana ręcznie tak, by zachować lekkość i swobodny, łąkowy charakter.",
        details: NATURALNE_DETAILS,
        variants: variantsFrom(130, "bukiet-wiosenny"),
      },
      {
        id: "bn-4",
        slug: "bukiet-rustykalny",
        name: "Bukiet Rustykalny",
        priceFrom: 150,
        description:
          "Bukiet Rustykalny to naturalnie piękna kompozycja z sezonowych kwiatów, wiązana ręcznie tak, by zachować lekkość i swobodny, łąkowy charakter.",
        details: NATURALNE_DETAILS,
        variants: variantsFrom(150, "bukiet-rustykalny"),
        featured: true,
      },
      {
        id: "bn-5",
        slug: "bukiet-lakowy",
        name: "Bukiet Łąkowy",
        priceFrom: 110,
        description:
          "Bukiet Łąkowy to naturalnie piękna kompozycja z sezonowych kwiatów, wiązana ręcznie tak, by zachować lekkość i swobodny, łąkowy charakter.",
        details: NATURALNE_DETAILS,
        variants: variantsFrom(110, "bukiet-lakowy"),
      },
      {
        id: "bn-6",
        slug: "bukiet-ziolowy",
        name: "Bukiet Ziołowy",
        priceFrom: 140,
        description:
          "Bukiet Ziołowy to naturalnie piękna kompozycja z sezonowych kwiatów, wiązana ręcznie tak, by zachować lekkość i swobodny, łąkowy charakter.",
        details: NATURALNE_DETAILS,
        variants: variantsFrom(140, "bukiet-ziolowy"),
      },
    ],
  },
  {
    slug: "bukiety-nowoczesne",
    name: "Bukiety Nowoczesne",
    image: "/images/realizacje/bukiety/IMG_4899.jpg",
    description:
      "Kwiaty inspirowane najnowszymi trendami florystycznymi. Odważne połączenia i nowoczesna forma.",
    products: [
      {
        id: "bw-1",
        slug: "bukiet-minimal",
        name: "Bukiet Minimal",
        priceFrom: 180,
        description:
          "Bukiet Minimal łączy odważne zestawienia kolorów i nowoczesną formę — wyrazista kompozycja dla osób ceniących oryginalny styl.",
        details: NOWOCZESNE_DETAILS,
        variants: variantsFrom(180, "bukiet-minimal"),
        featured: true,
      },
      {
        id: "bw-2",
        slug: "bukiet-geometric",
        name: "Bukiet Geometric",
        priceFrom: 220,
        description:
          "Bukiet Geometric łączy odważne zestawienia kolorów i nowoczesną formę — wyrazista kompozycja dla osób ceniących oryginalny styl.",
        details: NOWOCZESNE_DETAILS,
        variants: variantsFrom(220, "bukiet-geometric"),
      },
      {
        id: "bw-3",
        slug: "bukiet-monochrome",
        name: "Bukiet Monochrome",
        priceFrom: 200,
        description:
          "Bukiet Monochrome łączy odważne zestawienia kolorów i nowoczesną formę — wyrazista kompozycja dla osób ceniących oryginalny styl.",
        details: NOWOCZESNE_DETAILS,
        variants: variantsFrom(200, "bukiet-monochrome"),
        featured: true,
      },
      {
        id: "bw-4",
        slug: "bukiet-premium-black",
        name: "Bukiet Premium Black",
        priceFrom: 280,
        description:
          "Bukiet Premium Black łączy odważne zestawienia kolorów i nowoczesną formę — wyrazista kompozycja dla osób ceniących oryginalny styl.",
        details: NOWOCZESNE_DETAILS,
        variants: variantsFrom(280, "bukiet-premium-black"),
        featured: true,
      },
      {
        id: "bw-5",
        slug: "bukiet-art-deco",
        name: "Bukiet Art Deco",
        priceFrom: 250,
        description:
          "Bukiet Art Deco łączy odważne zestawienia kolorów i nowoczesną formę — wyrazista kompozycja dla osób ceniących oryginalny styl.",
        details: NOWOCZESNE_DETAILS,
        variants: variantsFrom(250, "bukiet-art-deco"),
      },
    ],
  },
  {
    slug: "flowerboxy",
    name: "FlowerBoxy",
    image: "/images/realizacje/flowerbox/IMG_4657.jpg",
    description:
      "Eleganckie kompozycje w pudełkach pełne emocji. Idealny prezent na każdą okazję.",
    products: [
      {
        id: "fb-1",
        slug: "flowerbox-maly",
        name: "FlowerBox Mały",
        priceFrom: 180,
        description:
          "FlowerBox Mały to elegancka kompozycja zamknięta w ozdobnym pudełku — gotowy prezent, który nie wymaga wazonu.",
        details: FLOWERBOX_DETAILS,
        variants: variantsFrom(180, "flowerbox-maly"),
      },
      {
        id: "fb-2",
        slug: "flowerbox-sredni",
        name: "FlowerBox Średni",
        priceFrom: 250,
        description:
          "FlowerBox Średni to elegancka kompozycja zamknięta w ozdobnym pudełku — gotowy prezent, który nie wymaga wazonu.",
        details: FLOWERBOX_DETAILS,
        variants: variantsFrom(250, "flowerbox-sredni"),
      },
      {
        id: "fb-3",
        slug: "flowerbox-premium",
        name: "FlowerBox Premium",
        priceFrom: 350,
        description:
          "FlowerBox Premium to elegancka kompozycja zamknięta w ozdobnym pudełku — gotowy prezent, który nie wymaga wazonu.",
        details: FLOWERBOX_DETAILS,
        variants: variantsFrom(350, "flowerbox-premium"),
        featured: true,
      },
      {
        id: "fb-4",
        slug: "flowerbox-okragly",
        name: "FlowerBox Okrągły",
        priceFrom: 220,
        description:
          "FlowerBox Okrągły to elegancka kompozycja zamknięta w ozdobnym pudełku — gotowy prezent, który nie wymaga wazonu.",
        details: FLOWERBOX_DETAILS,
        variants: variantsFrom(220, "flowerbox-okragly"),
      },
      {
        id: "fb-5",
        slug: "flowerbox-z-misiem",
        name: "FlowerBox z Misiem",
        priceFrom: 260,
        description:
          "FlowerBox z Misiem to elegancka kompozycja zamknięta w ozdobnym pudełku — gotowy prezent, który nie wymaga wazonu.",
        details: FLOWERBOX_DETAILS,
        variants: variantsFrom(260, "flowerbox-z-misiem"),
        featured: true,
      },
    ],
  },
  {
    slug: "kompozycje-pogrzebowe",
    name: "Kompozycje Pogrzebowe",
    image: "/images/realizacje/wience/IMG_5306.jpg",
    description:
      "Wieńce, wiązanki i dekoracje pogrzebowe. Z szacunkiem i troską o każdy detal.",
    products: [
      {
        id: "kp-1",
        slug: "wieniec-klasyczny",
        name: "Wieniec Klasyczny",
        priceFrom: 400,
        description:
          "Wieniec Klasyczny to kompozycja przygotowana z szacunkiem i troską o każdy detal, na pożegnanie bliskiej osoby.",
        details: POGRZEBOWE_DETAILS,
        variants: variantsFrom(400, "wieniec-klasyczny"),
      },
      {
        id: "kp-2",
        slug: "wieniec-premium",
        name: "Wieniec Premium",
        priceFrom: 600,
        description:
          "Wieniec Premium to kompozycja przygotowana z szacunkiem i troską o każdy detal, na pożegnanie bliskiej osoby.",
        details: POGRZEBOWE_DETAILS,
        variants: variantsFrom(600, "wieniec-premium"),
      },
      {
        id: "kp-3",
        slug: "wiazanka-zalobna",
        name: "Wiązanka Żałobna",
        priceFrom: 250,
        description:
          "Wiązanka Żałobna to kompozycja przygotowana z szacunkiem i troską o każdy detal, na pożegnanie bliskiej osoby.",
        details: POGRZEBOWE_DETAILS,
        variants: variantsFrom(250, "wiazanka-zalobna"),
      },
      {
        id: "kp-4",
        slug: "serce-z-kwiatow",
        name: "Serce z Kwiatów",
        priceFrom: 400,
        description:
          "Serce z Kwiatów to kompozycja przygotowana z szacunkiem i troską o każdy detal, na pożegnanie bliskiej osoby.",
        details: POGRZEBOWE_DETAILS,
        variants: variantsFrom(400, "serce-z-kwiatow"),
      },
      {
        id: "kp-5",
        slug: "wieniec-sosnowy",
        name: "Wieniec Sosnowy",
        priceFrom: 450,
        description:
          "Wieniec Sosnowy to kompozycja przygotowana z szacunkiem i troską o każdy detal, na pożegnanie bliskiej osoby.",
        details: POGRZEBOWE_DETAILS,
        variants: variantsFrom(450, "wieniec-sosnowy"),
      },
    ],
  },
  {
    slug: "kwiaty-pamieci",
    name: "Kwiaty Pamięci",
    image: "/images/realizacje/wience/IMG_5192.jpg",
    description:
      "Pamięć zapisana w kwiatach. Kompozycje na groby i miejsca pamięci.",
    products: [
      {
        id: "km-1",
        slug: "wiazanka-na-grob",
        name: "Wiązanka na Grób",
        priceFrom: 120,
        description:
          "Wiązanka na Grób to skromna, trwała kompozycja przeznaczona na groby i miejsca pamięci.",
        details: PAMIECI_DETAILS,
        variants: variantsFrom(120, "wiazanka-na-grob"),
      },
      {
        id: "km-2",
        slug: "stroik-okolicznosciowy",
        name: "Stroik Okolicznościowy",
        priceFrom: 150,
        description:
          "Stroik Okolicznościowy to skromna, trwała kompozycja przeznaczona na groby i miejsca pamięci.",
        details: PAMIECI_DETAILS,
        variants: variantsFrom(150, "stroik-okolicznosciowy"),
      },
      {
        id: "km-3",
        slug: "kompozycja-w-doniczce",
        name: "Kompozycja w Doniczce",
        priceFrom: 180,
        description:
          "Kompozycja w Doniczce to skromna, trwała kompozycja przeznaczona na groby i miejsca pamięci.",
        details: PAMIECI_DETAILS,
        variants: variantsFrom(180, "kompozycja-w-doniczce"),
      },
      {
        id: "km-4",
        slug: "wiazanka-pamiatkowa",
        name: "Wiązanka Pamiątkowa",
        priceFrom: 140,
        description:
          "Wiązanka Pamiątkowa to skromna, trwała kompozycja przeznaczona na groby i miejsca pamięci.",
        details: PAMIECI_DETAILS,
        variants: variantsFrom(140, "wiazanka-pamiatkowa"),
      },
    ],
  },
  {
    slug: "bukiety-roz",
    name: "Bukiety Róż",
    image: "/images/realizacje/bukiety/IMG_3832.jpg",
    description:
      "Klasyka w luksusowym wydaniu. Róże na każdą okazję — od pojedynczych po setki.",
    products: [
      {
        id: "br-1",
        slug: "bukiet-czerwona-namietnosc",
        name: "Bukiet Czerwona Namiętność",
        priceFrom: 180,
        description:
          "Bukiet Czerwona Namiętność to klasyczna kompozycja z róż premium w wybranej kolorystyce — na każdą okazję, od pojedynczych po setki.",
        details: ROZ_DETAILS,
        variants: variantsFrom(180, "bukiet-czerwona-namietnosc"),
      },
      {
        id: "br-2",
        slug: "bukiet-rozowa-elegancja",
        name: "Bukiet Różowa Elegancja",
        priceFrom: 200,
        description:
          "Bukiet Różowa Elegancja to klasyczna kompozycja z róż premium w wybranej kolorystyce — na każdą okazję, od pojedynczych po setki.",
        details: ROZ_DETAILS,
        variants: variantsFrom(200, "bukiet-rozowa-elegancja"),
      },
      {
        id: "br-3",
        slug: "bukiet-biale-roze",
        name: "Bukiet Białe Róże",
        priceFrom: 190,
        description:
          "Bukiet Białe Róże to klasyczna kompozycja z róż premium w wybranej kolorystyce — na każdą okazję, od pojedynczych po setki.",
        details: ROZ_DETAILS,
        variants: variantsFrom(190, "bukiet-biale-roze"),
      },
      {
        id: "br-4",
        slug: "bukiet-mix-roz",
        name: "Bukiet Mix Róż",
        priceFrom: 220,
        description:
          "Bukiet Mix Róż to klasyczna kompozycja z róż premium w wybranej kolorystyce — na każdą okazję, od pojedynczych po setki.",
        details: ROZ_DETAILS,
        variants: variantsFrom(220, "bukiet-mix-roz"),
      },
      {
        id: "br-5",
        slug: "bukiet-herbaciane-roze",
        name: "Bukiet Herbaciane Róże",
        priceFrom: 250,
        description:
          "Bukiet Herbaciane Róże to klasyczna kompozycja z róż premium w wybranej kolorystyce — na każdą okazję, od pojedynczych po setki.",
        details: ROZ_DETAILS,
        variants: variantsFrom(250, "bukiet-herbaciane-roze"),
      },
    ],
  },
  {
    slug: "bukiety-polne",
    name: "Bukiety Polne",
    image: "/images/realizacje/bukiety/IMG_3822.jpg",
    description:
      "Naturalne piękno prosto z łąki. Sezonowe kwiaty polne w artystycznych aranżacjach.",
    products: [
      {
        id: "bp-1",
        slug: "bukiet-lakowy-sen",
        name: "Bukiet Łąkowy Sen",
        priceFrom: 120,
        description:
          "Bukiet Łąkowy Sen to naturalne piękno prosto z łąki — sezonowe kwiaty polne w artystycznej aranżacji.",
        details: POLNE_DETAILS,
        variants: variantsFrom(120, "bukiet-lakowy-sen"),
      },
      {
        id: "bp-2",
        slug: "bukiet-polna-fantazja",
        name: "Bukiet Polna Fantazja",
        priceFrom: 150,
        description:
          "Bukiet Polna Fantazja to naturalne piękno prosto z łąki — sezonowe kwiaty polne w artystycznej aranżacji.",
        details: POLNE_DETAILS,
        variants: variantsFrom(150, "bukiet-polna-fantazja"),
      },
      {
        id: "bp-3",
        slug: "bukiet-sloneczne-pole",
        name: "Bukiet Słoneczne Pole",
        priceFrom: 140,
        description:
          "Bukiet Słoneczne Pole to naturalne piękno prosto z łąki — sezonowe kwiaty polne w artystycznej aranżacji.",
        details: POLNE_DETAILS,
        variants: variantsFrom(140, "bukiet-sloneczne-pole"),
      },
      {
        id: "bp-4",
        slug: "bukiet-rustykalny-urok",
        name: "Bukiet Rustykalny Urok",
        priceFrom: 160,
        description:
          "Bukiet Rustykalny Urok to naturalne piękno prosto z łąki — sezonowe kwiaty polne w artystycznej aranżacji.",
        details: POLNE_DETAILS,
        variants: variantsFrom(160, "bukiet-rustykalny-urok"),
      },
      {
        id: "bp-5",
        slug: "bukiet-lesna-polana",
        name: "Bukiet Leśna Polana",
        priceFrom: 170,
        description:
          "Bukiet Leśna Polana to naturalne piękno prosto z łąki — sezonowe kwiaty polne w artystycznej aranżacji.",
        details: POLNE_DETAILS,
        variants: variantsFrom(170, "bukiet-lesna-polana"),
      },
    ],
  },
  {
    slug: "kosze-kwiatowe",
    name: "Kosze Kwiatowe",
    image: "/images/realizacje/bukiety/IMG_3921.jpg",
    description:
      "Piękne kompozycje w koszach. Idealny prezent, który robi wrażenie.",
    products: [
      {
        id: "kk-1",
        slug: "kosz-obfitosc",
        name: "Kosz Obfitość",
        priceFrom: 250,
        description:
          "Kosz Obfitość to piękna kompozycja w koszu — idealny prezent, który robi wrażenie.",
        details: KOSZE_DETAILS,
        variants: variantsFrom(250, "kosz-obfitosc"),
      },
      {
        id: "kk-2",
        slug: "kosz-elegancki",
        name: "Kosz Elegancki",
        priceFrom: 300,
        description:
          "Kosz Elegancki to piękna kompozycja w koszu — idealny prezent, który robi wrażenie.",
        details: KOSZE_DETAILS,
        variants: variantsFrom(300, "kosz-elegancki"),
      },
      {
        id: "kk-3",
        slug: "kosz-wiosenny",
        name: "Kosz Wiosenny",
        priceFrom: 280,
        description:
          "Kosz Wiosenny to piękna kompozycja w koszu — idealny prezent, który robi wrażenie.",
        details: KOSZE_DETAILS,
        variants: variantsFrom(280, "kosz-wiosenny"),
      },
      {
        id: "kk-4",
        slug: "kosz-swiateczny",
        name: "Kosz Świąteczny",
        priceFrom: 350,
        description:
          "Kosz Świąteczny to piękna kompozycja w koszu — idealny prezent, który robi wrażenie.",
        details: KOSZE_DETAILS,
        variants: variantsFrom(350, "kosz-swiateczny"),
      },
    ],
  },
  {
    slug: "naturalnosc",
    name: "Naturalność",
    image: "/images/realizacje/bukiety/IMG_4562.jpg",
    description:
      "Naturalność w nowoczesnym wydaniu. Minimalizm i świeżość w każdym bukiecie.",
    products: [
      {
        id: "na-1",
        slug: "bukiet-eco-garden",
        name: "Bukiet Eco Garden",
        priceFrom: 150,
        description:
          "Bukiet Eco Garden to naturalność w nowoczesnym wydaniu — minimalizm i świeżość w każdym detalu.",
        details: NATURALNOSC_DETAILS,
        variants: variantsFrom(150, "bukiet-eco-garden"),
      },
      {
        id: "na-2",
        slug: "bukiet-zielony-akcent",
        name: "Bukiet Zielony Akcent",
        priceFrom: 180,
        description:
          "Bukiet Zielony Akcent to naturalność w nowoczesnym wydaniu — minimalizm i świeżość w każdym detalu.",
        details: NATURALNOSC_DETAILS,
        variants: variantsFrom(180, "bukiet-zielony-akcent"),
      },
      {
        id: "na-3",
        slug: "bukiet-botanical",
        name: "Bukiet Botanical",
        priceFrom: 200,
        description:
          "Bukiet Botanical to naturalność w nowoczesnym wydaniu — minimalizm i świeżość w każdym detalu.",
        details: NATURALNOSC_DETAILS,
        variants: variantsFrom(200, "bukiet-botanical"),
      },
      {
        id: "na-4",
        slug: "bukiet-dzikie-kwiaty",
        name: "Bukiet Dzikie Kwiaty",
        priceFrom: 160,
        description:
          "Bukiet Dzikie Kwiaty to naturalność w nowoczesnym wydaniu — minimalizm i świeżość w każdym detalu.",
        details: NATURALNOSC_DETAILS,
        variants: variantsFrom(160, "bukiet-dzikie-kwiaty"),
      },
    ],
  },
];

// Kategorie z dołączonymi produktami ze zdjęć kwiaciarni
export const CATEGORIES: Category[] = BAZOWE_KATEGORIE.map((c) => ({
  ...c,
  products: [...c.products, ...(NOWE_PRODUKTY[c.slug] ?? [])],
}));

export interface FeaturedProduct extends Product {
  categorySlug: string;
}

/** Produkty oznaczone jako `featured` we wszystkich kategoriach — sekcja "Nowości". */
export function getFeaturedProducts(): FeaturedProduct[] {
  return CATEGORIES.flatMap((category) =>
    category.products
      .filter((p) => p.featured)
      .map((p) => ({ ...p, categorySlug: category.slug }))
  );
}

export function findProduct(
  categorySlug: string,
  productSlug: string
): { category: Category; product: Product } | null {
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return null;
  const product = category.products.find((p) => p.slug === productSlug);
  if (!product) return null;
  return { category, product };
}

// Wybrane ręcznie, wymieszane produkty z różnych kategorii — sekcja "Bestsellery".
const BESTSELLER_REFS: Array<{ categorySlug: string; productSlug: string }> = [
  { categorySlug: "bukiety-naturalne", productSlug: "bukiet-polny" },
  { categorySlug: "bukiety-naturalne", productSlug: "bukiet-rustykalny" },
  { categorySlug: "bukiety-nowoczesne", productSlug: "bukiet-minimal" },
  { categorySlug: "bukiety-nowoczesne", productSlug: "bukiet-premium-black" },
  { categorySlug: "flowerboxy", productSlug: "flowerbox-premium" },
  { categorySlug: "flowerboxy", productSlug: "flowerbox-z-misiem" },
  { categorySlug: "bukiety-roz", productSlug: "bukiet-czerwona-namietnosc" },
  { categorySlug: "bukiety-roz", productSlug: "bukiet-rozowa-elegancja" },
  { categorySlug: "bukiety-roz", productSlug: "bukiet-mix-roz" },
  { categorySlug: "kosze-kwiatowe", productSlug: "kosz-elegancki" },
  { categorySlug: "kosze-kwiatowe", productSlug: "kosz-swiateczny" },
  { categorySlug: "naturalnosc", productSlug: "bukiet-botanical" },
];

export function isBestseller(categorySlug: string, productSlug: string): boolean {
  return BESTSELLER_REFS.some(
    (r) => r.categorySlug === categorySlug && r.productSlug === productSlug
  );
}

export interface BestsellerProduct extends Product {
  categorySlug: string;
}

/** Ręcznie wybrane produkty z różnych kategorii — pasek "Bestsellery". */
export function getBestsellers(): BestsellerProduct[] {
  return BESTSELLER_REFS.map(({ categorySlug, productSlug }) => {
    const found = findProduct(categorySlug, productSlug);
    if (!found) return null;
    return { ...found.product, categorySlug };
  }).filter((p): p is BestsellerProduct => p !== null);
}
