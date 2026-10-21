"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Flower2,
  MapPin,
  Calendar,
  User,
  Phone,
  MessageSquare,
  Store,
  Mail,
} from "lucide-react";
import {
  getAvailableHours,
  getPickupDeadline,
  isHoliday,
  getFlowerDayMsg,
  AUTOMAT_ADDRESS,
  SHOP_ADDRESS,
} from "@/lib/orderRules";
import { useParallax, useReveal } from "@/lib/animations";
import { findProduct, type Category, type Product, type ProductVariant } from "@/lib/products";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  kompozycja: string | null;
  kwota: string;
  data: string;
  godzina: string;
  imie: string;
  telefon: string;
  email: string;
  uwagi: string;
  regulamin: boolean;
}

type Step = 1 | 2 | 3;
type PickupTab = "automat" | "kwiaciarnia";

// ─── Static data ──────────────────────────────────────────────────────────────

// 6 produktów ze sklepu (lib/products.ts) — ceny, zdjęcia i opisy z danych sklepu.
// Każdy ma Mały ≥ 150 zł (minimalna kwota zamówienia).
// Krótki, jednolinijkowy opis — to strona szybkiego zamówienia
const WYBRANE: { kategoria: string; slug: string; tag: string; opis: string }[] = [
  { kategoria: "bukiety-roz",        slug: "bukiet-biale-roze",                 tag: "ELEGANCJA",   opis: "Eleganckie białe róże premium" },
  { kategoria: "bukiety-roz",        slug: "bukiet-czerwona-namietnosc",        tag: "KLASYKA",     opis: "Klasyczne czerwone róże na każdą okazję" },
  { kategoria: "flowerboxy",         slug: "flowerbox-premium",                 tag: "PREMIUM",     opis: "Kwiaty w eleganckim pudełku — gotowy prezent" },
  { kategoria: "bukiety-nowoczesne", slug: "bukiet-pastelowe-hortensje",        tag: "NOWOCZESNY",  opis: "Pastelowe hortensje z delikatną gipsówką" },
  { kategoria: "bukiety-naturalne",  slug: "bukiet-piwoniowy-roz",              tag: "ROMANTYCZNY", opis: "Różowe piwonie i róże w pudrowym papierze" },
  { kategoria: "bukiety-polne",      slug: "bukiet-sloneczniki-i-kwiaty-polne", tag: "POLNY",       opis: "Słoneczniki i polne kwiaty w naturalnym stylu" },
];

const KOMPOZYCJE = WYBRANE.flatMap(({ kategoria, slug, tag, opis }) => {
  const found = findProduct(kategoria, slug);
  return found ? [{ ...found, tag, opis }] : [];
}) as { category: Category; product: Product; tag: string; opis: string }[];

const ZDAJ_MIN = 150;
const ZDAJ_MAX = 1000;
const ZDAJ_STEP = 50;
const IMG_FADE_OUT_MS = 200;
const KATALOG_LICZBA = 100; // "ponad 100" produktów w sklepie

const KWIACIARNIA_ADRES = SHOP_ADDRESS;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDeadlineDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

// ─── StepIndicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: "Wybierz kompozycję" },
    { n: 2, label: "Szczegóły" },
    { n: 3, label: "Potwierdzenie" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-16">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-500 ${
                current > s.n
                  ? "bg-gold border-gold text-dark"
                  : current === s.n
                  ? "border-gold text-gold"
                  : "border-cream/15 text-cream/25"
              }`}
            >
              {current > s.n ? (
                <Check size={16} />
              ) : (
                <span className="font-cormorant text-lg">{s.n}</span>
              )}
            </div>
            <p
              className={`font-jost text-xs tracking-wider mt-2 whitespace-nowrap transition-colors duration-300 ${
                current === s.n ? "text-gold" : "text-cream/30"
              }`}
            >
              {s.label}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="relative w-20 md:w-32 h-px mx-3 mb-5 bg-cream/10 overflow-hidden">
              <div
                className="absolute inset-0 bg-gold origin-left transition-transform duration-700 ease-out"
                style={{ transform: current > s.n ? "scaleX(1)" : "scaleX(0)" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── KartaKompozycji ──────────────────────────────────────────────────────────

function KartaKompozycji({
  k,
  index,
  visible,
  onZamow,
}: {
  k: (typeof KOMPOZYCJE)[number];
  index: number;
  visible: boolean;
  onZamow: (title: string, kwota: string) => void;
}) {
  const { product, category, tag, opis } = k;
  const href = `/sklep/${category.slug}/${product.slug}`;
  const [rozmiar, setRozmiar] = useState<ProductVariant>(product.variants[0]);
  // Zdjęcie: najpierw wygasa (0.2s), potem podmiana i pojawienie się (0.3s)
  const [pokazany, setPokazany] = useState<ProductVariant>(product.variants[0]);
  const [wygaszanie, setWygaszanie] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function wybierz(v: ProductVariant) {
    if (v.size === rozmiar.size) return;
    setRozmiar(v);
    window.clearTimeout(timer.current);
    setWygaszanie(true);
    timer.current = window.setTimeout(() => {
      setPokazany(v);
      setWygaszanie(false);
    }, IMG_FADE_OUT_MS);
  }

  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      <div className="group h-full flex flex-col rounded-xl border border-cream/10 bg-dark-800/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D4A843]/60 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
        {/* Zdjęcie (zmienia się z rozmiarem) — klik prowadzi do produktu w sklepie */}
        <Link href={href} aria-label={`${product.name} — zobacz w sklepie`} className="relative block aspect-[3/4] min-h-[350px] rounded-t-xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
          <div
            className={`absolute inset-0 transition-opacity ease-out ${wygaszanie ? "opacity-0 duration-200" : "opacity-100 duration-300"}`}
          >
            {pokazany.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={pokazany.image}
                src={pokazany.image}
                alt={`${product.name} — rozmiar ${pokazany.size}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            )}
          </div>
          <span className="absolute top-3 left-3 rounded-[6px] bg-black/70 backdrop-blur-sm px-3 py-1 font-jost text-[10px] tracking-[0.25em] uppercase text-gold">
            {tag}
          </span>
        </Link>

        <p className="mt-2 px-4 text-center font-jost text-xs italic text-[#999]">
          Zdjęcie poglądowe — kwiaty sezonowe mogą się różnić od prezentowanych
        </p>
        <div className="flex flex-col flex-1 p-5 pt-3">
          <h3 className="font-jost text-lg font-bold text-cream">
            <Link href={href} className="hover:text-[#D4A843] transition-colors duration-200">{product.name}</Link>
          </h3>
          <p className="font-jost text-[13px] text-[#888] mt-1 mb-5 truncate">{opis}</p>

          {/* Rozmiary — kafelki z ceną z danych sklepu */}
          <div role="radiogroup" aria-label={`Rozmiar: ${product.name}`} className="grid grid-cols-2 gap-2 mb-5 mt-auto">
            {product.variants.map((v) => {
              const active = v.size === rozmiar.size;
              return (
                <button
                  key={v.size}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => wybierz(v)}
                  className={`rounded-lg border p-2.5 text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                    active
                      ? "border-[#D4A843] bg-[rgba(212,168,67,0.1)]"
                      : "border-white/10 hover:border-[rgba(212,168,67,0.4)]"
                  }`}
                >
                  <span className={`block font-jost text-xs uppercase tracking-wider ${active ? "text-cream" : "text-cream/60"}`}>
                    {v.size}
                  </span>
                  <span className="block font-jost text-base font-bold text-[#D4A843]">{v.price} zł</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onZamow(`${product.name} — ${rozmiar.size}`, String(rozmiar.price))}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#b8952f] via-[#D4A843] to-[#e0bf5c] text-dark font-jost text-sm font-medium uppercase tracking-[1px] px-4 py-3.5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]"
          >
            Zamów —{" "}
            <span key={rozmiar.size} className="price-bounce">{rozmiar.price} zł</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── generateCode ─────────────────────────────────────────────────────────────

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "RF-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ─── ZamowPage ────────────────────────────────────────────────────────────────

export default function ZamowPage() {
  const [step, setStep] = useState<Step>(1);
  const [pickupTab, setPickupTab] = useState<PickupTab>("kwiaciarnia");
  const [form, setForm] = useState<FormData>({
    kompozycja: null,
    kwota: "",
    data: "",
    godzina: "",
    imie: "",
    telefon: "",
    email: "",
    uwagi: "",
    regulamin: false,
  });
  const [kod] = useState(generateCode());
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  // Sekcja 2 "Zdaj się na nas" — kwota z suwaka
  const [zdajKwota, setZdajKwota] = useState(250);
  const zdajPct = ((zdajKwota - ZDAJ_MIN) / (ZDAJ_MAX - ZDAJ_MIN)) * 100;

  const [kartyRef, kartyVisible] = useReveal<HTMLDivElement>(0.1);
  const [zdajRef, zdajVisible] = useReveal<HTMLDivElement>(0.2);
  const zdajBgRef = useParallax<HTMLDivElement>(0.25);

  // Dynamiczne sloty godzinowe — przeliczane przy zmianie daty lub trybu odbioru
  const availableHours = form.data && !dataError
    ? getAvailableHours(form.data, new Date(), pickupTab)
    : [];
  const noHoursAvailable = !!form.data && !dataError && availableHours.length === 0;

  // Deadline odbioru — pokazywany po wyborze daty i godziny
  const deadlineHour = form.godzina ? parseInt(form.godzina.split(":")[0], 10) : null;
  const deadline =
    form.data && form.godzina && !dataError && deadlineHour !== null
      ? getPickupDeadline(form.data, deadlineHour, pickupTab)
      : null;

  const kwotaInvalid = form.kwota !== "" && parseFloat(form.kwota) < 150;
  const canGoStep3 =
    form.data !== "" &&
    !dataError &&
    !noHoursAvailable &&
    form.godzina !== "" &&
    form.imie.trim() !== "" &&
    form.telefon.trim() !== "" &&
    form.kwota.trim() !== "" &&
    !kwotaInvalid &&
    form.regulamin === true;

  function handleDateChange(dateStr: string) {
    // Reset godzina przy zmianie daty
    setForm((f) => ({ ...f, data: dateStr, godzina: "" }));
    setDataError(null);
    if (!dateStr) return;

    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);

    if (date.getDay() === 0) {
      setDataError("W niedziele kwiaciarnia jest zamknięta — wybierz inny dzień.");
      return;
    }
    if (isHoliday(date)) {
      setDataError("W tym dniu kwiaciarnia jest zamknięta (święto) — wybierz inny dzień.");
      return;
    }
    const flowerMsg = getFlowerDayMsg(date);
    if (flowerMsg) {
      setDataError(flowerMsg);
    }
  }

  function handlePickupTabChange(tab: PickupTab) {
    setPickupTab(tab);
    // Reset godzina bo dostępne sloty mogą się zmienić
    setForm((f) => ({ ...f, godzina: "" }));
  }

  function goToStep2(kompozycja: string, kwota: string) {
    setForm((f) => ({ ...f, kompozycja, kwota }));
    setStep(2);
  }

  function handleZdajZamow() {
    goToStep2("Zdaj się na nas", String(zdajKwota));
  }

  async function handleSubmit() {
    setSending(true);
    setSendError(null);

    const pickupInfo =
      pickupTab === "automat"
        ? `Automat: ${AUTOMAT_ADDRESS}`
        : `Kwiaciarnia: ${KWIACIARNIA_ADRES}`;

    sessionStorage.setItem(
      "royalflowers_order",
      JSON.stringify({
        orderCode: kod,
        bukiet: form.kompozycja ?? "Royal Flowers",
        kwota: form.kwota,
        pickupInfo,
        data: form.data,
        godzina: form.godzina,
        imie: form.imie,
        telefon: form.telefon,
        email: form.email,
        uwagi: form.uwagi,
        pickupTab,
        automatNazwa: pickupTab === "automat" ? AUTOMAT_ADDRESS : undefined,
      })
    );

    try {
      const res = await fetch("/api/przelewy24/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode: kod,
          amountPLN: form.kwota,
          email: form.email,
          description: `Royal Flowers – ${form.kompozycja ?? "Kompozycja"}`,
          data: form.data,
          godzina: form.godzina,
          pickupType: pickupTab,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.redirectUrl) {
        setSendError(data.error || "Błąd inicjalizacji płatności. Spróbuj ponownie.");
        return;
      }

      window.location.href = data.redirectUrl;
    } catch {
      setSendError(
        "Nie udało się połączyć z bramką płatności. Sprawdź połączenie i spróbuj ponownie."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="pt-28 min-h-screen bg-dark">
      {/* Hero nagłówek */}
      <section className="py-16 px-6 text-center border-b border-gold/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, #c9a84c33 0%, transparent 60%)",
          }}
        />
        <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4 relative">
          Royal Flowers
        </p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream relative">
          Szybkie zamówienie
        </h1>
        <p className="relative mt-4 font-jost text-base text-[#999]">
          Wybierz bukiet, rozmiar i zamów — gotowe w 3 godziny
        </p>
        <Link
          href="/sklep"
          className="relative inline-block mt-3 font-jost text-[13px] text-[#D4A843] underline-offset-4 hover:underline"
        >
          Szukasz czegoś więcej? Zobacz nasz sklep →
        </Link>
      </section>

      {/* ── STEP 1 ─────────────────────────────────────────────────────────── */}
      {step === 1 && (
        <>
          {/* Sekcja 1 — "Wybierz kompozycję" */}
          <section className="py-20 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <StepIndicator current={1} />

              <div className="text-center mb-14">
                <p className="font-jost text-xs tracking-[0.4em] uppercase text-gold mb-3">
                  Krok 1 z 2
                </p>
                <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream mb-3">
                  Wybierz kompozycję
                </h2>
                <p className="font-jost text-xs text-cream/40 tracking-wider">
                  Wybierz styl i rozmiar — florysta dobierze najpiękniejsze kwiaty
                </p>
              </div>

              <div ref={kartyRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                {KOMPOZYCJE.map((k, i) => (
                  <KartaKompozycji
                    key={k.product.slug}
                    k={k}
                    index={i}
                    visible={kartyVisible}
                    onZamow={goToStep2}
                  />
                ))}
              </div>

              {/* Baner — więcej w sklepie */}
              <div className="relative mt-12 overflow-hidden rounded-xl border border-[#D4A843]/25 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] px-6 py-8 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4A843] via-[#D4A843]/60 to-transparent" />
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 w-60 h-60 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)" }}
                />
                <div className="relative">
                  <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#D4A843] mb-2">Szukasz czegoś innego?</p>
                  <p className="font-cormorant text-2xl md:text-3xl font-light text-cream leading-snug">
                    W naszym sklepie znajdziesz ponad {KATALOG_LICZBA} bukietów, flowerboxów i kompozycji
                  </p>
                </div>
                <Link
                  href="/sklep"
                  className="relative shrink-0 inline-flex items-center gap-3 rounded-lg border border-[#D4A843] px-7 py-3.5 font-jost text-xs font-medium uppercase tracking-[0.2em] text-[#D4A843] transition-all duration-300 hover:bg-[#D4A843] hover:text-dark hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]"
                >
                  Przejdź do sklepu <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>

          {/* Sekcja 2 — "Zdaj się na nas" */}
          <section className="relative flex items-center justify-center px-6 py-28 overflow-hidden">
            {/* Tło z parallaxem */}
            <div
              ref={zdajBgRef}
              aria-hidden="true"
              className="absolute -inset-y-[20%] inset-x-0 will-change-transform"
              style={{
                backgroundImage: "url('/images/zdaj-sie-na-nas.png')",
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.55)" }}
            />

            <div
              ref={zdajRef}
              className={`relative z-10 w-full max-w-lg mx-auto text-center transition-all duration-1000 ease-out ${
                zdajVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="font-jost text-xs tracking-[0.6em] uppercase text-gold/80 mb-5">
                lub
              </p>
              <h2 className="font-cormorant text-6xl md:text-8xl font-light text-cream mb-5 leading-none">
                Zdaj się na nas
              </h2>
              <p className="font-jost text-sm text-cream/60 tracking-wide mb-10 leading-relaxed">
                Florysta przygotuje wyjątkowy bukiet
                <br />z aktualnie najświeższych kwiatów
              </p>

              {/* Suwak kwoty */}
              <div className="rounded-2xl border border-white/10 bg-dark/50 backdrop-blur-sm px-6 sm:px-10 py-8 mb-8">
                <label htmlFor="zdaj-kwota" className="block font-jost text-[10px] tracking-[0.4em] uppercase text-cream/50 mb-2">
                  Twój budżet
                </label>
                <p className="font-jost text-4xl font-bold text-[#D4A843] tabular-nums mb-6" aria-live="polite">
                  {zdajKwota} zł
                </p>
                <input
                  id="zdaj-kwota"
                  type="range"
                  min={ZDAJ_MIN}
                  max={ZDAJ_MAX}
                  step={ZDAJ_STEP}
                  value={zdajKwota}
                  onChange={(e) => setZdajKwota(Number(e.target.value))}
                  aria-valuetext={`${zdajKwota} zł`}
                  className="gold-range"
                  style={{ ["--pct" as string]: `${zdajPct}%` }}
                />
                <div className="flex justify-between font-jost text-[11px] text-cream/35 mt-2">
                  <span>{ZDAJ_MIN} zł</span>
                  <span>{ZDAJ_MAX} zł</span>
                </div>
                <p className="font-jost text-[13px] text-[#999] mt-4">
                  Im większa kwota, tym bogatszy bukiet
                </p>
              </div>

              <button
                onClick={handleZdajZamow}
                className="inline-flex items-center gap-3 rounded-lg font-jost text-sm tracking-widest uppercase px-12 py-4 bg-gradient-to-r from-[#b8952f] via-[#D4A843] to-[#e0bf5c] text-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]"
              >
                Zamów — {zdajKwota} zł <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </>
      )}

      {/* ── STEP 2 ─────────────────────────────────────────────────────────── */}
      {step === 2 && (
        <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
          <StepIndicator current={2} />

          <div className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="font-cormorant text-3xl font-light text-cream text-center mb-2">
              Szczegóły zamówienia
            </h2>
            <p className="font-jost text-xs text-cream/40 text-center tracking-wider mb-10">
              Uzupełnij dane odbioru
            </p>

            {/* Wybrana kompozycja */}
            {form.kompozycja && (
              <div className="flex items-center gap-4 border border-gold/20 p-4 bg-gold/5 mb-8">
                <div className="flex-1">
                  <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-0.5">
                    Wybrana kompozycja
                  </p>
                  <p className="font-cormorant text-lg text-cream">
                    {form.kompozycja}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-0.5">
                    Kwota
                  </p>
                  <p className="font-jost text-sm text-cream">{form.kwota} zł</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="font-jost text-[10px] tracking-wider uppercase text-gold/50 hover:text-gold transition-colors shrink-0 ml-2"
                >
                  Zmień
                </button>
              </div>
            )}

            {/* Kwota — edytowalna */}
            <div className="mb-8">
              <label className="font-jost text-xs tracking-widest uppercase text-gold mb-3 block">
                Budżet zamówienia (zł)
              </label>
              <input
                type="number"
                placeholder="np. 150"
                value={form.kwota}
                onChange={(e) =>
                  setForm((f) => ({ ...f, kwota: e.target.value }))
                }
                className={`w-full bg-dark-800 border text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none transition-colors duration-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                  kwotaInvalid
                    ? "border-red-400/60 focus:border-red-400"
                    : "border-cream/10 focus:border-gold/50"
                }`}
              />
              {kwotaInvalid && (
                <p className="font-jost text-[10px] text-red-400 mt-1.5">
                  Minimalna kwota to 150 zł
                </p>
              )}
            </div>

            {/* Zakładki odbioru */}
            <div className="flex border border-cream/10 mb-8">
              {/* TYMCZASOWO wyłączony automat — przywrócić: usunąć wrapper div + tooltip, przywrócić onClick i className */}
              <div className="flex-1 relative group">
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase px-4 py-3.5 cursor-not-allowed opacity-35 text-cream/30"
                >
                  <MapPin size={13} /> Wybierz automat
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-dark border border-gold/30 text-gold/80 font-jost text-[10px] tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                  Kwiatomat tymczasowo niedostępny – trwa przebudowa
                </div>
              </div>
              <button
                onClick={() => handlePickupTabChange("kwiaciarnia")}
                className={`flex-1 flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase px-4 py-3.5 border-l border-cream/10 transition-all duration-300 ${
                  pickupTab === "kwiaciarnia"
                    ? "bg-gold text-dark"
                    : "text-cream/50 hover:text-cream hover:bg-cream/5"
                }`}
              >
                <Store size={13} /> Odbierz w kwiaciarni
              </button>
            </div>

            <div className="space-y-6">
              {/* Automat — TYMCZASOWO niedostępny; kod przywrócić po przebudowie */}
              {pickupTab === "automat" && (
                <div className="border border-amber-400/30 bg-amber-400/5 p-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="font-jost text-sm text-amber-300/80 leading-relaxed">
                      Odbiór z kwiatomatu jest tymczasowo niedostępny z powodu przebudowy.
                      Prosimy o odbiór w kwiaciarni.
                    </p>
                  </div>
                </div>
              )}

              {/* Kwiaciarnia */}
              {pickupTab === "kwiaciarnia" && (
                <div className="border border-gold/20 bg-gold/5 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Store size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <div className="space-y-4 flex-1">
                      <div>
                        <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-1">
                          Adres
                        </p>
                        <p className="font-jost text-sm text-cream">
                          {KWIACIARNIA_ADRES}
                        </p>
                      </div>
                      <div>
                        <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-1">
                          Godziny otwarcia
                        </p>
                        <p className="font-jost text-sm text-cream">
                          Pon – Pt: 9:00 – 17:00
                        </p>
                        <p className="font-jost text-sm text-cream">
                          Sobota: 9:00 – 14:00
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gold/15 pt-4">
                    <p className="font-jost text-xs text-cream/40 leading-relaxed">
                      Po złożeniu zamówienia otrzymasz unikalny kod odbioru —
                      okaż go w kwiaciarni.
                    </p>
                  </div>
                </div>
              )}

              {/* Data i godzina */}
              <div className="grid grid-cols-2 gap-4">
                {/* Data odbioru */}
                <div>
                  <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                    <Calendar size={13} /> Data odbioru
                  </label>
                  <input
                    type="date"
                    value={form.data}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={`w-full bg-dark-800 border text-cream font-jost text-sm px-4 py-3 focus:outline-none transition-colors duration-300 [color-scheme:dark] ${
                      dataError
                        ? "border-red-400/60 focus:border-red-400"
                        : "border-cream/10 focus:border-gold/50"
                    }`}
                  />
                  {dataError && (
                    <p className="font-jost text-[10px] text-red-400 mt-1.5 leading-relaxed">
                      {dataError}
                    </p>
                  )}
                </div>

                {/* Godzina odbioru */}
                <div>
                  <label className="font-jost text-xs tracking-widest uppercase text-gold mb-3 block">
                    Godzina odbioru
                  </label>

                  {noHoursAvailable ? (
                    <p className="font-jost text-[10px] text-amber-400/90 border border-amber-400/20 bg-amber-400/5 px-3 py-2.5 leading-relaxed">
                      W wybranym dniu nie ma już dostępnych godzin. Wybierz następny dzień roboczy.
                    </p>
                  ) : (
                    <select
                      value={form.godzina}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, godzina: e.target.value }))
                      }
                      disabled={!form.data || !!dataError}
                      className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-300 appearance-none disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!form.data || dataError ? "Najpierw wybierz datę" : "Wybierz godzinę"}
                      </option>
                      {availableHours.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  )}

                  {/* Deadline odbioru */}
                  {deadline && (
                    <p className="font-jost text-[10px] text-gold/70 mt-2 tracking-wide">
                      Odbierz do:{" "}
                      <span className="text-gold font-medium">
                        {formatDeadlineDate(deadline.dateStr)} godz. {deadline.time}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                  <User size={13} /> Imię i nazwisko
                </label>
                <input
                  type="text"
                  placeholder="Anna Kowalska"
                  value={form.imie}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, imie: e.target.value }))
                  }
                  className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                  <Phone size={13} /> Numer telefonu
                  {pickupTab === "automat" ? " (SMS z kodem)" : ""}
                </label>
                <input
                  type="tel"
                  placeholder="+48 600 000 000"
                  value={form.telefon}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, telefon: e.target.value }))
                  }
                  className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                  <Mail size={13} /> E-mail (opcjonalnie – potwierdzenie
                  zamówienia)
                </label>
                <input
                  type="email"
                  placeholder="anna@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                  <MessageSquare size={13} /> Uwagi (opcjonalnie)
                </label>
                <textarea
                  placeholder="Np. dedykacja na karteczce, szczególne życzenia..."
                  value={form.uwagi}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, uwagi: e.target.value }))
                  }
                  rows={3}
                  className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
                />
              </div>
            </div>

            {/* Regulamin */}
            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={form.regulamin}
                  onClick={() =>
                    setForm((f) => ({ ...f, regulamin: !f.regulamin }))
                  }
                  className={`mt-0.5 w-4 h-4 shrink-0 border flex items-center justify-center transition-all duration-200 ${
                    form.regulamin
                      ? "bg-gold border-gold"
                      : "border-cream/30 hover:border-gold/50"
                  }`}
                >
                  {form.regulamin && (
                    <Check size={10} className="text-dark" />
                  )}
                </button>
                <span className="font-jost text-xs text-cream/60 leading-relaxed group-hover:text-cream/80 transition-colors duration-200">
                  Akceptuję{" "}
                  <Link
                    href="/regulamin"
                    target="_blank"
                    className="text-gold underline underline-offset-2 decoration-gold/40 hover:decoration-gold transition-all duration-200"
                  >
                    regulamin sprzedaży
                  </Link>{" "}
                  Royal Flowers <span className="text-red-400">*</span>
                </span>
              </label>
            </div>

            {sendError && (
              <p className="font-jost text-xs text-red-400 text-center mt-6 border border-red-400/20 bg-red-400/5 px-4 py-3">
                {sendError}
              </p>
            )}

            <div className="flex justify-between mt-10">
              <button
                onClick={() => setStep(1)}
                disabled={sending}
                className="inline-flex items-center gap-2 font-jost text-sm tracking-widest uppercase text-cream/40 hover:text-cream transition-colors duration-300 disabled:opacity-40"
              >
                <ArrowLeft size={16} /> Wróć
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canGoStep3 || sending}
                className={`inline-flex items-center gap-3 font-jost text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300 ${
                  canGoStep3 && !sending
                    ? "bg-gold text-dark hover:bg-gold-light"
                    : "bg-cream/10 text-cream/25 cursor-not-allowed"
                }`}
              >
                {sending
                  ? "Przekierowanie do płatności…"
                  : "Zamów i zapłać"}
                {!sending && <ArrowRight size={16} />}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── STEP 3 ─────────────────────────────────────────────────────────── */}
      {step === 3 && (
        <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
          <StepIndicator current={3} />

          <div className="animate-scale-in max-w-xl mx-auto text-center">
            <div className="w-20 h-20 border border-gold mx-auto mb-8 flex items-center justify-center">
              <Check size={32} className="text-gold" />
            </div>

            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
              Zamówienie przyjęte
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream mb-4">
              Dziękujemy, {form.imie.split(" ")[0]}!
            </h2>

            {pickupTab === "automat" ? (
              <p className="font-jost text-sm text-cream/50 mb-10 leading-relaxed">
                Wysłaliśmy SMS z kodem odbioru na numer{" "}
                <span className="text-cream">{form.telefon}</span>. Okaż kod
                przy automacie, aby odebrać kwiaty.
              </p>
            ) : (
              <p className="font-jost text-sm text-cream/50 mb-10 leading-relaxed">
                Twoje zamówienie zostało przyjęte. Okaż poniższy kod w
                kwiaciarni przy odbiorze.
              </p>
            )}

            <div className="border border-gold/30 bg-gold/5 px-12 py-8 mb-10 inline-block">
              <p className="font-jost text-xs tracking-[0.6em] uppercase text-gold/60 mb-3">
                Twój kod odbioru
              </p>
              <p className="font-cormorant text-5xl font-light text-gold tracking-widest">
                {kod}
              </p>
            </div>

            <div className="border border-cream/10 bg-dark-800 p-6 text-left space-y-4 mb-10">
              <h3 className="font-cormorant text-lg text-cream mb-4">
                Podsumowanie zamówienia
              </h3>
              {[
                {
                  label: "Kompozycja",
                  val: form.kompozycja ?? undefined,
                },
                {
                  label: "Kwota",
                  val: form.kwota ? `${form.kwota} zł` : undefined,
                },
                pickupTab === "automat"
                  ? { label: "Automat", val: AUTOMAT_ADDRESS }
                  : { label: "Odbiór", val: KWIACIARNIA_ADRES },
                { label: "Data odbioru", val: form.data },
                { label: "Godzina", val: form.godzina },
              ]
                .filter(Boolean)
                .map((row) => (
                  <div
                    key={row!.label}
                    className="flex justify-between items-center py-2 border-b border-cream/5 last:border-0"
                  >
                    <span className="font-jost text-xs text-cream/40 tracking-wider uppercase">
                      {row!.label}
                    </span>
                    <span className="font-jost text-sm text-cream">
                      {row!.val}
                    </span>
                  </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setStep(1);
                  setPickupTab("kwiaciarnia");
                  setForm({
                    kompozycja: null,
                    kwota: "",
                    data: "",
                    godzina: "",
                    imie: "",
                    telefon: "",
                    email: "",
                    uwagi: "",
                    regulamin: false,
                  });
                  setZdajKwota(250);
                  setDataError(null);
                  setSendError(null);
                }}
                className="inline-flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase border border-gold/30 text-gold px-8 py-3 hover:border-gold hover:bg-gold/5 transition-all duration-300"
              >
                <Flower2 size={14} /> Nowe zamówienie
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase bg-gold text-dark px-8 py-3 hover:bg-gold-light transition-colors duration-300"
              >
                Strona główna
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-gold/10 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cormorant text-xl tracking-widest text-cream/50">
            ROYAL <span className="text-gold">FLOWERS</span>
          </p>
          <p className="font-jost text-xs text-cream/30">
            © 2025 Royal Flowers. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </main>
  );
}
