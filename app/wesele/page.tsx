"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const style_opcje = [
  "Romantyczny", "Rustykalny", "Glamour", "Minimalistyczny", "Boho", "Inny",
];

const interesuje_opcje = [
  "Bukiet Ślubny",
  "Dekoracja kościoła",
  "Dekoracja sali",
  "Kwiaty do włosów",
  "Boutonniere",
  "Dekoracja stołów",
  "Łuk kwiatowy",
  "Całościowa oprawa",
];

interface FormState {
  imieOna: string;
  imieOn: string;
  data: string;
  kosciol: string;
  sala: string;
  goscie: string;
  budzet: string;
  style: string[];
  interesy: string[];
  info: string;
  telefon: string;
  email: string;
}

const emptyForm: FormState = {
  imieOna: "", imieOn: "", data: "", kosciol: "", sala: "",
  goscie: "", budzet: "", style: [], interesy: [], info: "", telefon: "", email: "",
};

function CheckboxGroup({
  opcje, selected, onChange,
}: {
  opcje: string[];
  selected: string[];
  onChange: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {opcje.map((o) => {
        const checked = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`flex items-center gap-2 px-4 py-2.5 border text-left transition-all duration-200 ${
              checked
                ? "border-gold bg-gold/8 text-gold"
                : "border-cream/10 text-cream/50 hover:border-gold/30 hover:text-cream/80"
            }`}
          >
            <div
              className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-all duration-200 ${
                checked ? "border-gold bg-gold" : "border-cream/20"
              }`}
            >
              {checked && <Check size={10} className="text-dark" />}
            </div>
            <span className="font-jost text-xs tracking-wide">{o}</span>
          </button>
        );
      })}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-jost text-[10px] tracking-[0.35em] uppercase text-gold/80 mb-2">
      {children}
    </label>
  );
}

function Input({
  type = "text", placeholder, value, onChange, required,
}: {
  type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 [color-scheme:dark]"
    />
  );
}

function SelectField({
  value, onChange, opcje, placeholder,
}: {
  value: string; onChange: (v: string) => void;
  opcje: string[]; placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-300 appearance-none"
    >
      <option value="" className="text-cream/30">{placeholder}</option>
      {opcje.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function WeselePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function toggle(field: "style" | "interesy", val: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(val)
        ? f[field].filter((v) => v !== val)
        : [...f[field], val],
    }));
  }

  function set(field: keyof FormState) {
    return (v: string) => setForm((f) => ({ ...f, [field]: v }));
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.imieOna.trim()) e.imieOna = "Wymagane";
    if (!form.imieOn.trim()) e.imieOn = "Wymagane";
    if (!form.data) e.data = "Wymagane";
    if (!form.telefon.trim()) e.telefon = "Wymagane";
    if (!form.email.trim()) e.email = "Wymagane";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Nieprawidłowy email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  return (
    <main className="pt-20 min-h-screen bg-dark">

      {/* Hero ze zdjęciem */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <img
          src="/images/kwiaciarnia/DSCF1231.jpg"
          alt="Dekoracje ślubne Royal Flowers"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20 w-full">
          <p className="font-jost text-xs tracking-[0.6em] uppercase text-gold mb-5">
            Royal Flowers — Nowy Sącz
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light text-cream leading-tight mb-4">
            Florystyka &<br />
            <span className="italic text-gold">Dekoracje Ślubne</span>
          </h1>
          <div className="w-16 h-px bg-gold mb-6" />
          <p className="font-jost text-base text-cream/65 max-w-md leading-relaxed">
            Każde wesele zasługuje na wyjątkową oprawę kwiatową. Opowiedz nam
            o swojej wizji – stworzymy razem niezapomniane wspomnienia.
          </p>
        </div>
      </section>

      {/* Formularz lub sukces */}
      <section className="py-20 px-6 md:px-16 max-w-4xl mx-auto">
        {submitted ? (
          /* ── SUKCES ── */
          <div className="text-center py-24 animate-scale-in">
            <div className="w-20 h-20 border border-gold mx-auto mb-8 flex items-center justify-center">
              <Check size={34} className="text-gold" />
            </div>
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
              Zapytanie wysłane
            </p>
            <h2 className="font-cormorant text-4xl font-light text-cream mb-4">
              Dziękujemy!
            </h2>
            <p className="font-jost text-base text-cream/55 mb-10 max-w-sm mx-auto leading-relaxed">
              Skontaktujemy się z Wami w ciągu <strong className="text-cream">24 godzin</strong>,
              aby omówić szczegóły Waszej florystyki ślubnej.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => { setSubmitted(false); setForm(emptyForm); }}
                className="inline-flex items-center justify-center gap-2 border border-gold/30 text-gold font-jost text-xs tracking-widest uppercase px-8 py-3 hover:border-gold hover:bg-gold/5 transition-all duration-300"
              >
                Nowe zapytanie
              </button>
              <Link
                href="/realizacje"
                className="inline-flex items-center justify-center gap-2 bg-gold text-dark font-jost text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold-light transition-colors duration-300"
              >
                Zobacz realizacje <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          /* ── FORMULARZ ── */
          <form onSubmit={handleSubmit} noValidate>
            <div className="text-center mb-14">
              <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Florystyka ślubna</p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">Złóż zapytanie</h2>
              <div className="w-12 h-px bg-gold mx-auto mt-5" />
            </div>

            <div className="space-y-10">

              {/* Para Młoda */}
              <div>
                <p className="font-cormorant text-xl text-cream mb-5 pb-2 border-b border-gold/15">
                  Para Młoda
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Ona — imię i nazwisko *</Label>
                    <Input
                      placeholder="np. Anna Kowalska"
                      value={form.imieOna}
                      onChange={set("imieOna")}
                      required
                    />
                    {errors.imieOna && <p className="font-jost text-xs text-red-400 mt-1">{errors.imieOna}</p>}
                  </div>
                  <div>
                    <Label>On — imię i nazwisko *</Label>
                    <Input
                      placeholder="np. Piotr Nowak"
                      value={form.imieOn}
                      onChange={set("imieOn")}
                      required
                    />
                    {errors.imieOn && <p className="font-jost text-xs text-red-400 mt-1">{errors.imieOn}</p>}
                  </div>
                </div>
              </div>

              {/* Szczegóły ślubu */}
              <div>
                <p className="font-cormorant text-xl text-cream mb-5 pb-2 border-b border-gold/15">
                  Szczegóły uroczystości
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Data ślubu *</Label>
                    <Input
                      type="date"
                      value={form.data}
                      onChange={set("data")}
                      required
                    />
                    {errors.data && <p className="font-jost text-xs text-red-400 mt-1">{errors.data}</p>}
                  </div>
                  <div>
                    <Label>Liczba gości</Label>
                    <SelectField
                      value={form.goscie}
                      onChange={set("goscie")}
                      placeholder="Wybierz przedział"
                      opcje={["Do 50 osób", "50–100 osób", "100–150 osób", "150+ osób"]}
                    />
                  </div>
                  <div>
                    <Label>Miejsce ślubu / kościół</Label>
                    <Input
                      placeholder="np. Kościół pw. św. Małgorzaty"
                      value={form.kosciol}
                      onChange={set("kosciol")}
                    />
                  </div>
                  <div>
                    <Label>Miejsce wesela / sala</Label>
                    <Input
                      placeholder="np. Restauracja Panorama"
                      value={form.sala}
                      onChange={set("sala")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Budżet na florystykę</Label>
                    <SelectField
                      value={form.budzet}
                      onChange={set("budzet")}
                      placeholder="Wybierz przedział"
                      opcje={["Do 2 000 zł", "2 000–5 000 zł", "5 000–10 000 zł", "Powyżej 10 000 zł"]}
                    />
                  </div>
                </div>
              </div>

              {/* Styl dekoracji */}
              <div>
                <p className="font-cormorant text-xl text-cream mb-5 pb-2 border-b border-gold/15">
                  Styl dekoracji
                </p>
                <CheckboxGroup
                  opcje={style_opcje}
                  selected={form.style}
                  onChange={(v) => toggle("style", v)}
                />
              </div>

              {/* Co interesuje */}
              <div>
                <p className="font-cormorant text-xl text-cream mb-5 pb-2 border-b border-gold/15">
                  Co Was interesuje
                </p>
                <CheckboxGroup
                  opcje={interesuje_opcje}
                  selected={form.interesy}
                  onChange={(v) => toggle("interesy", v)}
                />
              </div>

              {/* Wizja + kontakt */}
              <div>
                <p className="font-cormorant text-xl text-cream mb-5 pb-2 border-b border-gold/15">
                  Wasza wizja & kontakt
                </p>
                <div className="space-y-4">
                  <div>
                    <Label>Dodatkowe informacje / wizja</Label>
                    <textarea
                      placeholder="Opiszcie swoje wyobrażenie dekoracji, ulubione kwiaty, kolory, styl…"
                      value={form.info}
                      onChange={(e) => set("info")(e.target.value)}
                      rows={4}
                      className="w-full bg-dark-800 border border-cream/10 text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/20 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Telefon kontaktowy *</Label>
                      <Input
                        type="tel"
                        placeholder="+48 600 000 000"
                        value={form.telefon}
                        onChange={set("telefon")}
                        required
                      />
                      {errors.telefon && <p className="font-jost text-xs text-red-400 mt-1">{errors.telefon}</p>}
                    </div>
                    <div>
                      <Label>Adres e-mail *</Label>
                      <Input
                        type="email"
                        placeholder="wasza@poczta.pl"
                        value={form.email}
                        onChange={set("email")}
                        required
                      />
                      {errors.email && <p className="font-jost text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-6 justify-between border-t border-gold/10">
                <p className="font-jost text-xs text-cream/30 leading-relaxed max-w-sm">
                  Odpiszemy w ciągu 24 godzin. Pola oznaczone * są wymagane.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-12 py-4 hover:bg-gold-light transition-colors duration-300 shrink-0"
                >
                  Wyślij zapytanie <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </form>
        )}
      </section>

      <footer className="border-t border-gold/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-cormorant text-xl tracking-widest text-cream/50">
            ROYAL <span className="text-gold">FLOWERS</span>
          </p>
          <p className="font-jost text-xs text-cream/30">© 2025 Royal Flowers. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </main>
  );
}
