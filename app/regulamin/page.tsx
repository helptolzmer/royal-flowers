import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Regulamin sprzedaży – Royal Flowers",
  description: "Regulamin sprzedaży Kwiaciarni Royal Flowers w Nowym Sączu.",
};

const FIRMA = "Małgorzata Pasiut Partyserwis Kwiaciarnia Royal Flowers";
const ADRES_SIEDZIBY = "Podgrodzie 416, 33-386 Podgrodzie";
const ADRES = "Al. Wolności 10/A, 33-300 Nowy Sącz";
const NIP   = "7342527300";
const EMAIL = "kwiaciarniaroyalflowers@gmail.com";
const TEL   = "532 688 820";
const DATA  = "5 maja 2026 r.";

const sekcje = [
  {
    tytul: "§ 1. Postanowienia ogólne",
    tresc: [
      `Niniejszy Regulamin określa zasady składania zamówień i zawierania umów sprzedaży za pośrednictwem serwisu internetowego Royal Flowers (dalej: „Sklep").`,
      `Sprzedawcą jest: ${FIRMA}, z siedzibą pod adresem ${ADRES_SIEDZIBY}, NIP: ${NIP}, e-mail: ${EMAIL}, tel.: ${TEL} (dalej: „Sprzedawca").`,
      `Klientem jest każda osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba fizyczna prowadząca działalność gospodarczą, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, która złożyła zamówienie w Sklepie (dalej: „Klient").`,
      `Korzystanie ze Sklepu i składanie zamówień wymaga akceptacji niniejszego Regulaminu.`,
    ],
  },
  {
    tytul: "§ 2. Przedmiot sprzedaży",
    tresc: [
      `Przedmiotem sprzedaży są kompozycje kwiatowe, bukiety, wiązanki i inne produkty florystyczne oferowane przez Sprzedawcę (dalej: „Produkty").`,
      `Produkty są towarami o krótkim terminie przydatności do użytku (kwiaty żywe). Informacje o dostępności i szczegółach Produktów są wskazane w Sklepie.`,
      `Sprzedawca zastrzega sobie prawo do modyfikacji składu kompozycji w przypadku niedostępności konkretnych kwiatów, zachowując zbliżony charakter, kolorystykę i wartość zamówienia.`,
    ],
  },
  {
    tytul: "§ 3. Składanie zamówień",
    tresc: [
      `Zamówienia składane są za pośrednictwem formularza dostępnego na stronie internetowej Sklepu, przez całą dobę, 7 dni w tygodniu.`,
      `Złożenie zamówienia wymaga: wyboru Produktu, podania daty i godziny odbioru, wskazania miejsca odbioru (kwiatoamt lub kwiaciarnia), podania danych kontaktowych (imię, telefon) oraz akceptacji niniejszego Regulaminu.`,
      `Po złożeniu zamówienia Klient otrzymuje unikalny kod zamówienia w formacie RF-XXXXXX widoczny na stronie potwierdzenia. Opcjonalnie potwierdzenie może zostać wysłane na adres e-mail podany przez Klienta.`,
      `Umowa sprzedaży zostaje zawarta z chwilą złożenia zamówienia przez Klienta i przyjęcia go do realizacji przez Sprzedawcę.`,
    ],
  },
  {
    tytul: "§ 4. Ceny i płatności",
    tresc: [
      `Wszystkie ceny podane w Sklepie są cenami brutto i wyrażone są w złotych polskich (PLN), z uwzględnieniem podatku VAT.`,
      `Klient samodzielnie wskazuje kwotę zamówienia (wartość kompozycji), którą akceptuje i deklaruje przy składaniu zamówienia.`,
      `Aktualnie dostępne metody płatności: płatność gotówką przy odbiorze w kwiaciarni oraz płatność przy automacie kwiatowym. Sprzedawca zastrzega sobie prawo do rozszerzenia form płatności.`,
    ],
  },
  {
    tytul: "§ 5. Odbiór zamówienia",
    tresc: [
      `Klient może odebrać zamówienie osobiście w kwiaciarni pod adresem: ${ADRES}, w godzinach otwarcia (pon.–pt. 9:00–17:00, sob. 9:00–14:00) lub przy jednym z kwiatomatów Royal Flowers czynnych całą dobę.`,
      `Przy odbiorze Klient zobowiązany jest okazać kod zamówienia RF-XXXXXX.`,
      `W przypadku nieodebrania zamówienia w wyznaczonym terminie, Sprzedawca zastrzega sobie prawo do anulowania zamówienia, ze względu na perishable charakter Produktów.`,
    ],
  },
  {
    tytul: "§ 6. Prawo odstąpienia od umowy",
    tresc: [
      `Zgodnie z art. 38 pkt 4 ustawy z dnia 30 maja 2014 r. o prawach konsumenta (Dz. U. z 2020 r. poz. 287 ze zm.), prawo odstąpienia od umowy zawartej na odległość nie przysługuje Konsumentowi w odniesieniu do umów, w których przedmiotem świadczenia jest rzecz ulegająca szybkiemu zepsuciu lub mająca krótki termin przydatności do użycia.`,
      `Kwiaty żywe i kompozycje kwiatowe stanowią towar o krótkim terminie przydatności, dlatego Klientowi nie przysługuje prawo odstąpienia od umowy po złożeniu zamówienia.`,
      `Powyższe nie wyłącza uprawnień Klienta z tytułu rękojmi za wady Produktu.`,
    ],
  },
  {
    tytul: "§ 7. Reklamacje",
    tresc: [
      `Klient ma prawo złożyć reklamację w przypadku stwierdzenia wad Produktu (np. zwiędniętych lub uszkodzonych kwiatów w momencie odbioru).`,
      `Reklamację należy zgłosić niezwłocznie – najpóźniej w dniu odbioru – drogą e-mailową na adres: ${EMAIL} lub telefonicznie pod numerem: ${TEL}.`,
      `Reklamacja powinna zawierać: imię i nazwisko Klienta, numer zamówienia (kod RF-XXXXXX), opis wady oraz, jeśli to możliwe, dokumentację fotograficzną.`,
      `Sprzedawca rozpatruje reklamację w terminie 14 dni kalendarzowych od dnia jej otrzymania i informuje Klienta o sposobie rozpatrzenia.`,
      `W przypadku uznania reklamacji Sprzedawca zaproponuje wymianę Produktu, obniżenie ceny lub inną formę zadośćuczynienia.`,
    ],
  },
  {
    tytul: "§ 8. Ochrona danych osobowych",
    tresc: [
      `Administratorem danych osobowych Klientów jest ${FIRMA} z siedzibą pod adresem ${ADRES_SIEDZIBY}.`,
      `Dane osobowe przetwarzane są w celu realizacji zamówień, obsługi reklamacji oraz – za zgodą Klienta – w celach marketingowych.`,
      `Szczegółowe informacje o przetwarzaniu danych osobowych zawarte są w Polityce Prywatności dostępnej pod adresem /polityka-prywatnosci.`,
    ],
  },
  {
    tytul: "§ 9. Postanowienia końcowe",
    tresc: [
      `W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy powszechnie obowiązującego prawa polskiego, w szczególności Kodeksu Cywilnego oraz ustawy o prawach konsumenta.`,
      `Sprzedawca zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie w terminie 14 dni od dnia opublikowania nowej wersji Regulaminu na stronie internetowej Sklepu.`,
      `Zamówienia złożone przed wejściem w życie zmiany Regulaminu realizowane są na dotychczasowych zasadach.`,
      `Wszelkie spory wynikające z realizacji umów zawartych w Sklepie strony będą starały się rozwiązać polubownie. Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń (np. mediacja, platforma ODR dostępna pod adresem http://ec.europa.eu/consumers/odr/).`,
      `Regulamin obowiązuje od dnia ${DATA}.`,
    ],
  },
];

export default function RegulaminPage() {
  return (
    <main className="pt-20 min-h-screen bg-dark">
      {/* Hero */}
      <section className="py-16 px-6 border-b border-gold/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 80%, #c9a84c22 0%, transparent 60%)" }}
        />
        <div className="max-w-3xl mx-auto relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-cream/40 hover:text-gold transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={13} /> Strona główna
          </Link>
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
            Royal Flowers
          </p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream mb-4">
            Regulamin sprzedaży
          </h1>
          <div className="w-16 h-px bg-gold mb-6" />
          <p className="font-jost text-xs text-cream/40 tracking-wider">
            Obowiązuje od: {DATA} &nbsp;·&nbsp; NIP: {NIP}
          </p>
        </div>
      </section>

      {/* Treść */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="space-y-12">
          {sekcje.map((s) => (
            <div key={s.tytul}>
              <h2 className="font-cormorant text-2xl font-light text-gold mb-5">
                {s.tytul}
              </h2>
              <div className="space-y-3">
                {s.tresc.map((akapit, i) => (
                  <p key={i} className="font-jost text-sm text-cream/65 leading-relaxed">
                    {akapit}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dane firmy */}
        <div className="mt-16 border border-gold/20 bg-gold/5 p-8">
          <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Dane sprzedawcy
          </p>
          <div className="space-y-1">
            {[
              ["Firma",  FIRMA],
              ["Adres",  ADRES_SIEDZIBY],
              ["NIP",    NIP],
              ["E-mail", EMAIL],
              ["Tel.",   TEL],
            ].map(([label, val]) => (
              <div key={label} className="flex gap-4">
                <span className="font-jost text-xs text-cream/35 w-16 shrink-0">{label}</span>
                <span className="font-jost text-sm text-cream/70">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <Link
            href="/polityka-prywatnosci"
            className="font-jost text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-4 decoration-gold/30"
          >
            Polityka prywatności →
          </Link>
          <Link
            href="/zamow"
            className="font-jost text-xs tracking-widest uppercase text-cream/40 hover:text-cream transition-colors duration-300"
          >
            Złóż zamówienie →
          </Link>
        </div>
      </section>

      <footer className="border-t border-gold/10 py-8 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cormorant text-xl tracking-widest text-cream/50">
            ROYAL <span className="text-gold">FLOWERS</span>
          </p>
          <p className="font-jost text-xs text-cream/30">
            © 2026 Royal Flowers. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </main>
  );
}
