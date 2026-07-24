"use client";

import { useState } from "react";
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

const KOMPOZYCJE = [
  { emoji: "🌹", tag: "KLASYKA",     title: "Róża z przybraniem"  },
  { emoji: "🌸", tag: "PREMIUM",     title: "Bukiet Pastelowy"    },
  { emoji: "💐", tag: "ROMANTYCZNY", title: "Bukiet Romantyczny"  },
  { emoji: "🌻", tag: "KOLOROWY",    title: "Mix Kwiatów"         },
  { emoji: "🤍", tag: "ELEGANCJA",   title: "Bukiet Biały"        },
  { emoji: "🌹", tag: "KLASYKA",     title: "Róże Solo"           },
];

const CHIPY = [
  { label: "Mały",   value: 150 },
  { label: "Średni", value: 250 },
  { label: "Duży",   value: 350 },
  { label: "MEGA",   value: 500 },
];

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
            <div
              className={`w-20 md:w-32 h-px mx-3 mb-5 transition-all duration-500 ${
                current > s.n ? "bg-gold" : "bg-cream/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── KartaKompozycji ──────────────────────────────────────────────────────────

function KartaKompozycji({
  emoji,
  tag,
  title,
  onZamow,
}: {
  emoji: string;
  tag: string;
  title: string;
  onZamow: (title: string, kwota: string) => void;
}) {
  const [kwota, setKwota] = useState("");
  const [touched, setTouched] = useState(false);
  const kwotaNum = parseFloat(kwota);
  const invalid = touched && kwota !== "" && kwotaNum < 150;
  const empty = touched && kwota === "";

  function handleZamow() {
    setTouched(true);
    if (!kwota || kwotaNum < 150) return;
    onZamow(title, kwota);
  }

  return (
    <div className="flex flex-col border border-cream/10 hover:border-gold/40 transition-all duration-300 bg-dark-800/30">
      <div className="flex flex-col items-center pt-8 pb-6 px-5 gap-3">
        <span className="text-4xl">{emoji}</span>
        <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-gold/70 border border-gold/25 px-3 py-1">
          {tag}
        </span>
        <h3 className="font-cormorant text-xl font-light text-cream text-center">
          {title}
        </h3>
      </div>

      <div className="px-5 pb-6 space-y-3 mt-auto">
        <div>
          <input
            type="number"
            placeholder="wpisz kwotę (min 150 zł)"
            value={kwota}
            onChange={(e) => {
              setKwota(e.target.value);
              setTouched(false);
            }}
            className={`w-full bg-dark border text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none transition-colors duration-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
              invalid || empty
                ? "border-red-400/60 focus:border-red-400"
                : "border-cream/10 focus:border-gold/50"
            }`}
          />
          {invalid && (
            <p className="font-jost text-[10px] text-red-400 mt-1">
              Minimalna kwota to 150 zł
            </p>
          )}
          {empty && (
            <p className="font-jost text-[10px] text-red-400 mt-1">
              Podaj kwotę
            </p>
          )}
        </div>

        <div className="flex gap-1.5">
          {CHIPY.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                setKwota(String(c.value));
                setTouched(false);
              }}
              className={`flex-1 font-jost text-[9px] tracking-widest uppercase py-1.5 border transition-all duration-200 ${
                kwota === String(c.value)
                  ? "bg-gold border-gold text-dark"
                  : "border-cream/15 bg-dark/40 text-cream/50 hover:border-gold/40 hover:text-cream/80"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleZamow}
          className="w-full font-jost text-xs tracking-widest uppercase px-4 py-3 border border-gold/40 text-gold hover:bg-gold hover:text-dark transition-all duration-300"
        >
          Zamów
        </button>
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

  // Sekcja 2 "Zdaj się na nas" — lokalny stan kwoty
  const [zdajKwota, setZdajKwota] = useState("");
  const [zdajTouched, setZdajTouched] = useState(false);
  const zdajKwotaNum = parseFloat(zdajKwota);
  const zdajInvalid = zdajTouched && zdajKwota !== "" && zdajKwotaNum < 150;
  const zdajEmpty = zdajTouched && zdajKwota === "";

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
    setZdajTouched(true);
    if (!zdajKwota || zdajKwotaNum < 150) return;
    goToStep2("Zdaj się na nas", zdajKwota);
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
    <main className="pt-20 min-h-screen bg-dark">
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
          Złóż zamówienie
        </h1>
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
                  Wybierz styl i podaj budżet — florysta dobierze najpiękniejsze kwiaty
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {KOMPOZYCJE.map((k) => (
                  <KartaKompozycji
                    key={k.title}
                    emoji={k.emoji}
                    tag={k.tag}
                    title={k.title}
                    onZamow={goToStep2}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Sekcja 2 — "Zdaj się na nas" */}
          <section
            className="relative flex items-center justify-center px-6 py-28"
            style={{
              backgroundImage: "url('/images/zdaj-sie-na-nas.png')",
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.55)" }}
            />

            <div className="relative z-10 w-full max-w-lg mx-auto text-center">
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

              {/* Pole kwoty */}
              <div className="mb-5">
                <input
                  type="number"
                  placeholder="Twoja kwota (zł)"
                  value={zdajKwota}
                  onChange={(e) => {
                    setZdajKwota(e.target.value);
                    setZdajTouched(false);
                  }}
                  className={`w-full max-w-xs mx-auto block bg-dark/50 backdrop-blur-sm border text-cream font-cormorant text-2xl text-center px-6 py-4 placeholder:text-cream/35 focus:outline-none transition-colors duration-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                    zdajInvalid || zdajEmpty
                      ? "border-red-400/70 focus:border-red-400"
                      : "border-cream/30 focus:border-gold"
                  }`}
                />
                {zdajInvalid && (
                  <p className="font-jost text-[11px] text-red-400 mt-2">
                    Minimalna kwota to 150 zł
                  </p>
                )}
                {zdajEmpty && (
                  <p className="font-jost text-[11px] text-red-400 mt-2">
                    Podaj kwotę
                  </p>
                )}
              </div>

              {/* Chip-buttony sugerowanych kwot */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                {CHIPY.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      setZdajKwota(String(c.value));
                      setZdajTouched(false);
                    }}
                    className={`font-jost text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 ${
                      zdajKwota === String(c.value)
                        ? "bg-gold border-gold text-dark"
                        : "border-cream/35 text-cream/70 hover:border-gold/60 hover:text-cream"
                    }`}
                  >
                    {c.label} · {c.value} zł
                  </button>
                ))}
              </div>

              <button
                onClick={handleZdajZamow}
                className="inline-flex items-center gap-3 font-jost text-sm tracking-widest uppercase px-12 py-4 bg-gold text-dark hover:bg-gold-light transition-all duration-300"
              >
                Zamów <ArrowRight size={16} />
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
                  setZdajKwota("");
                  setZdajTouched(false);
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
