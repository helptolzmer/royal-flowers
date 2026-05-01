"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Flower2, MapPin, Calendar, User, Phone, MessageSquare } from "lucide-react";

const bukiety = [
  { id: 1,  nazwa: "Romantyczne Czerwone Róże", opis: "12 szt.",      cena: 120, emoji: "🌹", kategoria: "Klasyka"     },
  { id: 2,  nazwa: "Pastelowe Peonie",           opis: "7 szt.",       cena: 150, emoji: "🌸", kategoria: "Premium"     },
  { id: 3,  nazwa: "Słoneczny Tulipan Mix",      opis: "15 szt.",      cena: 100, emoji: "🌷", kategoria: "Wiosna"      },
  { id: 4,  nazwa: "Biały Elegancki Bukiet",     opis: "10 szt.",      cena: 130, emoji: "🤍", kategoria: "Ślub"        },
  { id: 5,  nazwa: "Lila Lawenda & Frezja",      opis: "Kompozycja",   cena: 100, emoji: "💜", kategoria: "Aromatyczny" },
  { id: 6,  nazwa: "Złota Mimoza & Tulipan",     opis: "Mix 20 szt.",  cena: 110, emoji: "🌼", kategoria: "Wiosna"      },
  { id: 7,  nazwa: "Orchidea Premium",           opis: "3 łodygi",     cena: 200, emoji: "🪷", kategoria: "Premium"     },
  { id: 8,  nazwa: "Rustykalny Polny Mix",       opis: "Kompozycja",   cena: 100, emoji: "🌾", kategoria: "Boho"        },
  { id: 9,  nazwa: "Chryzantema Biała",          opis: "12 szt.",      cena: 100, emoji: "🌺", kategoria: "Klasyka"     },
  { id: 10, nazwa: "Egzotyczna Anthurium",       opis: "5 szt.",       cena: 180, emoji: "🔴", kategoria: "Egzotyczny"  },
];

const kwiatomaty = [
  { id: 1, nazwa: "ul. Wincentego Witosa 110",               dzielnica: "Nowy Sącz"  },
  { id: 2, nazwa: "Naprzeciwko Galerii Trzy Korony",          dzielnica: "Nowy Sącz"  },
  { id: 3, nazwa: "al. Wolności 10A",                        dzielnica: "Nowy Sącz"  },
  { id: 4, nazwa: "Plac Dąbrowskiego 2",                     dzielnica: "Nowy Sącz"  },
  { id: 5, nazwa: "Przy wejściu do Galerii Gołąbkowice",     dzielnica: "Nowy Sącz"  },
  { id: 6, nazwa: "Przed wejściem Stacja Orlen",             dzielnica: "Stary Sącz" },
];

type Step = 1 | 2 | 3;

interface FormData {
  bukiet: number | null;
  kwota: string;
  automat: number | null;
  data: string;
  godzina: string;
  imie: string;
  telefon: string;
  uwagi: string;
}

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: "Wybierz bukiet" },
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

function generateCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `RF-${num}`;
}

export default function ZamowPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    bukiet: null,
    kwota: "",
    automat: null,
    data: "",
    godzina: "",
    imie: "",
    telefon: "",
    uwagi: "",
  });
  const [kod] = useState(generateCode());
  const [kwoty, setKwoty] = useState<Record<number, string>>({});

  const selectedBukiet = bukiety.find((b) => b.id === form.bukiet);
  const selectedAutomat = kwiatomaty.find((k) => k.id === form.automat);

  const canGoStep2 = form.bukiet !== null;
  const canGoStep3 =
    form.automat !== null &&
    form.data !== "" &&
    form.godzina !== "" &&
    form.imie.trim() !== "" &&
    form.telefon.trim() !== "";

  function handleSubmit() {
    setStep(3);
  }

  return (
    <main className="pt-20 min-h-screen bg-dark">
      {/* Hero */}
      <section className="py-16 px-6 text-center border-b border-gold/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 80%, #c9a84c33 0%, transparent 60%)" }}
        />
        <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4 relative">
          Royal Flowers
        </p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream relative">
          Złóż zamówienie
        </h1>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-16 max-w-5xl mx-auto">
        <StepIndicator current={step} />

        {/* STEP 1 – Wybierz bukiet */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="font-cormorant text-3xl font-light text-cream text-center mb-2">
              Wybierz kompozycję
            </h2>
            <p className="font-jost text-xs text-cream/40 text-center tracking-wider mb-10">
              10 wyjątkowych propozycji od naszych florystów
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
              {bukiety.map((b) => (
                <div
                  key={b.id}
                  className={`relative flex flex-col border transition-all duration-300 ${
                    form.bukiet === b.id
                      ? "border-gold"
                      : "border-cream/10 hover:border-gold/30"
                  }`}
                >
                  {/* Selectable card area */}
                  <div
                    onClick={() => setForm((f) => ({ ...f, bukiet: b.id, kwota: kwoty[b.id] ?? "" }))}
                    className={`relative p-6 cursor-pointer flex-1 transition-colors duration-300 ${
                      form.bukiet === b.id ? "bg-gold/5" : "bg-dark-800"
                    }`}
                  >
                    {form.bukiet === b.id && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-gold flex items-center justify-center">
                        <Check size={11} className="text-dark" />
                      </div>
                    )}
                    <div className="text-3xl mb-4">{b.emoji}</div>
                    <span className="font-jost text-xs text-gold/60 tracking-[0.3em] uppercase block mb-1">
                      {b.kategoria}
                    </span>
                    <h3 className="font-cormorant text-base font-medium text-cream leading-tight mb-1">
                      {b.nazwa}
                    </h3>
                    <p className="font-jost text-xs text-cream/40 mb-3">{b.opis}</p>
                    <p className="font-cormorant text-lg text-gold">{b.cena} zł</p>
                  </div>

                  {/* Per-card price input */}
                  <div className={`px-4 py-3 border-t transition-colors duration-300 ${
                    form.bukiet === b.id ? "border-gold/30 bg-gold/5" : "border-cream/5 bg-dark-800"
                  }`}>
                    <label className="font-jost text-[10px] tracking-[0.25em] uppercase text-gold/50 block mb-1.5">
                      Twoja kwota (zł)
                    </label>
                    <input
                      type="number"
                      min={100}
                      placeholder="wpisz kwotę"
                      value={kwoty[b.id] ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setKwoty((prev) => ({ ...prev, [b.id]: val }));
                        if (form.bukiet === b.id) {
                          setForm((f) => ({ ...f, kwota: val }));
                        }
                      }}
                      className="w-full bg-transparent border border-cream/10 text-cream font-jost text-xs px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!canGoStep2}
                className={`inline-flex items-center gap-3 font-jost text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300 ${
                  canGoStep2
                    ? "bg-gold text-dark hover:bg-gold-light"
                    : "bg-cream/10 text-cream/25 cursor-not-allowed"
                }`}
              >
                Dalej <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 – Szczegóły */}
        {step === 2 && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="font-cormorant text-3xl font-light text-cream text-center mb-2">
              Szczegóły zamówienia
            </h2>
            <p className="font-jost text-xs text-cream/40 text-center tracking-wider mb-10">
              Uzupełnij dane odbioru
            </p>

            {/* Wybrany bukiet */}
            {selectedBukiet && (
              <div className="flex items-center gap-4 border border-gold/20 p-4 bg-gold/5 mb-8">
                <span className="text-2xl">{selectedBukiet.emoji}</span>
                <div className="flex-1">
                  <p className="font-cormorant text-lg text-cream">{selectedBukiet.nazwa}</p>
                  <p className="font-jost text-xs text-cream/40">{selectedBukiet.opis}</p>
                </div>
                <p className="font-cormorant text-xl text-gold">
                  {form.kwota ? `${form.kwota} zł` : `${selectedBukiet.cena} zł`}
                </p>
              </div>
            )}

            <div className="space-y-6">
              {/* Automat */}
              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                  <MapPin size={13} /> Wybierz automat
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {kwiatomaty.map((k) => (
                    <button
                      key={k.id}
                      onClick={() => setForm((f) => ({ ...f, automat: k.id }))}
                      className={`text-left p-4 border transition-all duration-300 ${
                        form.automat === k.id
                          ? "border-gold bg-gold/5"
                          : "border-cream/10 hover:border-gold/30 bg-dark-800"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-jost text-xs text-gold/60 tracking-wider uppercase">
                          {k.dzielnica}
                        </span>
                        {form.automat === k.id && (
                          <Check size={12} className="text-gold" />
                        )}
                      </div>
                      <p className="font-jost text-sm text-cream">{k.nazwa}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data i godzina */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                    <Calendar size={13} /> Data odbioru
                  </label>
                  <input
                    type="date"
                    value={form.data}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))}
                    className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-300 [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="font-jost text-xs tracking-widest uppercase text-gold mb-3 block">
                    Godzina odbioru
                  </label>
                  <select
                    value={form.godzina}
                    onChange={(e) => setForm((f) => ({ ...f, godzina: e.target.value }))}
                    className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-300 appearance-none"
                  >
                    <option value="">Wybierz godzinę</option>
                    {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"].map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dane osobowe */}
              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                  <User size={13} /> Imię i nazwisko
                </label>
                <input
                  type="text"
                  placeholder="Anna Kowalska"
                  value={form.imie}
                  onChange={(e) => setForm((f) => ({ ...f, imie: e.target.value }))}
                  className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold mb-3">
                  <Phone size={13} /> Numer telefonu (SMS z kodem)
                </label>
                <input
                  type="tel"
                  placeholder="+48 600 000 000"
                  value={form.telefon}
                  onChange={(e) => setForm((f) => ({ ...f, telefon: e.target.value }))}
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
                  onChange={(e) => setForm((f) => ({ ...f, uwagi: e.target.value }))}
                  rows={3}
                  className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-between mt-10">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 font-jost text-sm tracking-widest uppercase text-cream/40 hover:text-cream transition-colors duration-300"
              >
                <ArrowLeft size={16} /> Wróć
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canGoStep3}
                className={`inline-flex items-center gap-3 font-jost text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300 ${
                  canGoStep3
                    ? "bg-gold text-dark hover:bg-gold-light"
                    : "bg-cream/10 text-cream/25 cursor-not-allowed"
                }`}
              >
                Potwierdź zamówienie <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 – Potwierdzenie */}
        {step === 3 && (
          <div className="animate-scale-in max-w-xl mx-auto text-center">
            {/* Success icon */}
            <div className="w-20 h-20 border border-gold mx-auto mb-8 flex items-center justify-center">
              <Check size={32} className="text-gold" />
            </div>

            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
              Zamówienie przyjęte
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream mb-4">
              Dziękujemy, {form.imie.split(" ")[0]}!
            </h2>
            <p className="font-jost text-sm text-cream/50 mb-10 leading-relaxed">
              Wysłaliśmy SMS z kodem odbioru na numer{" "}
              <span className="text-cream">{form.telefon}</span>. Okaż kod przy
              automacie, aby odebrać kwiaty.
            </p>

            {/* Kod */}
            <div className="border border-gold/30 bg-gold/5 px-12 py-8 mb-10 inline-block">
              <p className="font-jost text-xs tracking-[0.6em] uppercase text-gold/60 mb-3">
                Twój kod odbioru
              </p>
              <p className="font-cormorant text-5xl font-light text-gold tracking-widest">
                {kod}
              </p>
            </div>

            {/* Podsumowanie */}
            <div className="border border-cream/10 bg-dark-800 p-6 text-left space-y-4 mb-10">
              <h3 className="font-cormorant text-lg text-cream mb-4">Podsumowanie zamówienia</h3>
              {[
                { label: "Bukiet",       val: selectedBukiet?.nazwa },
                { label: "Cena",         val: form.kwota ? `${form.kwota} zł` : selectedBukiet ? `${selectedBukiet.cena} zł` : undefined },
                { label: "Automat",      val: selectedAutomat?.nazwa },
                { label: "Data odbioru", val: form.data },
                { label: "Godzina",      val: form.godzina },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-cream/5 last:border-0">
                  <span className="font-jost text-xs text-cream/40 tracking-wider uppercase">{row.label}</span>
                  <span className="font-jost text-sm text-cream">{row.val}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setStep(1);
                  setForm({ bukiet: null, kwota: "", automat: null, data: "", godzina: "", imie: "", telefon: "", uwagi: "" });
                  setKwoty({});
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
        )}
      </section>

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
