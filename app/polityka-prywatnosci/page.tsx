import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Polityka prywatności – Royal Flowers",
  description: "Polityka prywatności i ochrony danych osobowych Kwiaciarni Royal Flowers zgodna z RODO.",
};

const FIRMA = "Małgorzata Pasiut Partyserwis Kwiaciarnia Royal Flowers";
const ADRES = "Podgrodzie 416, 33-386 Podgrodzie";
const NIP   = "7342527300";
const EMAIL = "kwiaciarniaroyalflowers@gmail.com";
const TEL   = "532 688 820";
const DATA  = "5 maja 2026 r.";

const sekcje = [
  {
    tytul: "1. Administrator danych osobowych",
    tresc: [
      `Administratorem Twoich danych osobowych jest ${FIRMA}, z siedzibą pod adresem ${ADRES}, NIP: ${NIP} (dalej: „Administrator").`,
      `W sprawach dotyczących ochrony danych osobowych możesz skontaktować się z Administratorem:`,
      `– drogą e-mailową: ${EMAIL}`,
      `– telefonicznie: ${TEL}`,
      `– pisemnie na adres: ${ADRES}`,
    ],
  },
  {
    tytul: "2. Jakie dane zbieramy i w jakim celu",
    tresc: [
      `Administrator przetwarza następujące kategorie danych osobowych:`,
      `a) Dane podane przy składaniu zamówienia: imię i nazwisko, numer telefonu, adres e-mail (opcjonalnie), preferowany termin i miejsce odbioru – w celu realizacji zamówienia (podstawa prawna: art. 6 ust. 1 lit. b RODO – wykonanie umowy).`,
      `b) Dane przetwarzane w celu obsługi reklamacji: imię i nazwisko, numer zamówienia, opis wady – w celu rozpatrzenia reklamacji (podstawa prawna: art. 6 ust. 1 lit. c RODO – obowiązek prawny).`,
      `c) Dane przetwarzane w celach podatkowych i rachunkowych (podstawa prawna: art. 6 ust. 1 lit. c RODO – obowiązek prawny wynikający z przepisów prawa podatkowego).`,
      `d) Dane zbierane w celu marketingu bezpośredniego własnych usług (podstawa prawna: art. 6 ust. 1 lit. f RODO – uzasadniony interes Administratora), wyłącznie w stosunku do osób, które złożyły wcześniej zamówienie.`,
    ],
  },
  {
    tytul: "3. Okres przechowywania danych",
    tresc: [
      `Dane osobowe przetwarzane w celu realizacji zamówień przechowywane są przez okres niezbędny do wykonania umowy, a następnie do upływu terminu przedawnienia roszczeń wynikających z umowy (zasadniczo 3 lata, z uwzględnieniem art. 118 Kodeksu cywilnego).`,
      `Dane przetwarzane w celu wypełnienia obowiązków podatkowych i rachunkowych przechowywane są przez 5 lat od końca roku obrotowego, w którym wystawiono dokument.`,
      `Dane przetwarzane w celach marketingowych przechowywane są do czasu wniesienia sprzeciwu przez osobę, której dane dotyczą.`,
    ],
  },
  {
    tytul: "4. Odbiorcy danych",
    tresc: [
      `Twoje dane osobowe mogą być przekazywane:`,
      `– podmiotom świadczącym usługi IT i hosting na rzecz Administratora (przetwarzającym dane w imieniu Administratora na podstawie umów powierzenia przetwarzania danych),`,
      `– dostawcom usług e-mail (w tym EmailJS) wyłącznie w zakresie niezbędnym do wysłania potwierdzenia zamówienia,`,
      `– organom publicznym uprawnionym do żądania dostępu do danych na podstawie przepisów prawa.`,
      `Administrator nie przekazuje danych osobowych do państw trzecich poza Europejskim Obszarem Gospodarczym, z wyjątkiem sytuacji, gdy wymaga tego prawo lub jest to niezbędne do wykonania umowy, z zachowaniem odpowiednich zabezpieczeń.`,
    ],
  },
  {
    tytul: "5. Twoje prawa",
    tresc: [
      `Na podstawie przepisów RODO (Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679) przysługują Ci następujące prawa:`,
      `– prawo dostępu do swoich danych (art. 15 RODO),`,
      `– prawo do sprostowania danych (art. 16 RODO),`,
      `– prawo do usunięcia danych („prawo do bycia zapomnianym") (art. 17 RODO),`,
      `– prawo do ograniczenia przetwarzania (art. 18 RODO),`,
      `– prawo do przenoszenia danych (art. 20 RODO),`,
      `– prawo do sprzeciwu wobec przetwarzania (art. 21 RODO),`,
      `– prawo do cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania przed cofnięciem zgody.`,
      `Aby skorzystać z powyższych praw, skontaktuj się z Administratorem pod adresem: ${EMAIL}.`,
      `Jeśli uważasz, że przetwarzanie Twoich danych narusza przepisy RODO, masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO), ul. Stawki 2, 00-193 Warszawa.`,
    ],
  },
  {
    tytul: "6. Pliki cookies",
    tresc: [
      `Strona internetowa Royal Flowers może wykorzystywać pliki cookies (ciasteczka) – małe pliki tekstowe zapisywane w przeglądarce użytkownika.`,
      `Cookies sesyjne są usuwane po zamknięciu przeglądarki. Cookies trwałe przechowywane są do czasu ich usunięcia przez użytkownika lub upływu określonego czasu.`,
      `Użytkownik może w każdej chwili zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej – w tym zablokować lub usunąć pliki cookies. Ograniczenie stosowania plików cookies może wpłynąć na niektóre funkcjonalności strony.`,
    ],
  },
  {
    tytul: "7. Bezpieczeństwo danych",
    tresc: [
      `Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych odpowiednią do zagrożeń i kategorii danych objętych ochroną, a w szczególności zabezpiecza dane przed udostępnieniem osobom nieupoważnionym, zabraniem przez osobę nieuprawnioną, przetwarzaniem z naruszeniem przepisów oraz zmianą, utratą, uszkodzeniem lub zniszczeniem.`,
    ],
  },
  {
    tytul: "8. Zmiany Polityki prywatności",
    tresc: [
      `Administrator zastrzega sobie prawo do zmiany niniejszej Polityki prywatności. O wszelkich zmianach użytkownicy będą informowani przez opublikowanie zaktualizowanej wersji na stronie internetowej.`,
      `Niniejsza Polityka prywatności obowiązuje od dnia ${DATA}.`,
    ],
  },
];

export default function PolitykaPrywatnosciPage() {
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
            Polityka prywatności
          </h1>
          <div className="w-16 h-px bg-gold mb-6" />
          <p className="font-jost text-xs text-cream/40 tracking-wider">
            Zgodna z RODO (Rozporządzenie UE 2016/679) &nbsp;·&nbsp; Obowiązuje od: {DATA}
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

        {/* Dane administratora */}
        <div className="mt-16 border border-gold/20 bg-gold/5 p-8">
          <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Administrator danych osobowych
          </p>
          <div className="space-y-1">
            {[
              ["Firma",  FIRMA],
              ["Adres",  ADRES],
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
            href="/regulamin"
            className="font-jost text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300 underline underline-offset-4 decoration-gold/30"
          >
            Regulamin sprzedaży →
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
