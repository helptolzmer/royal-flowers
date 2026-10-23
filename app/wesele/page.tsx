"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { ArrowLeft, ArrowRight, Check, ImagePlus, X } from "lucide-react";
import { prefersReducedMotion, useCountUp, useParallax, useReveal } from "@/lib/animations";

const style_opcje = [
  { nazwa: "Romantyczny", ikona: "🌹" },
  { nazwa: "Rustykalny", ikona: "🪵" },
  { nazwa: "Glamour", ikona: "✨" },
  { nazwa: "Minimalistyczny", ikona: "🤍" },
  { nazwa: "Boho", ikona: "🌾" },
  { nazwa: "Inny", ikona: "🎨" },
];

const interesuje_opcje = [
  { nazwa: "Bukiet Ślubny", ikona: "💐" },
  { nazwa: "Dekoracja kościoła", ikona: "⛪" },
  { nazwa: "Dekoracja sali", ikona: "🥂" },
  { nazwa: "Kwiaty do włosów", ikona: "🌸" },
  { nazwa: "Boutonniere", ikona: "🤵" },
  { nazwa: "Dekoracja stołów", ikona: "🕯️" },
  { nazwa: "Łuk kwiatowy", ikona: "🌿" },
  { nazwa: "Całościowa oprawa", ikona: "👑" },
];

const dlaczegoMy = [
  { ikona: "🏆", licznik: 15, sufiks: "+", tytul: "15 lat doświadczenia", opis: "Setki ślubów i wesel, przy których mogłyśmy być częścią Waszego wielkiego dnia." },
  { ikona: "🎓", licznik: null, sufiks: "", tytul: "Mistrzyni Florystyki", opis: "Kompozycje tworzone przez dyplomowaną florystkę z pasją do detalu." },
  { ikona: "💐", licznik: 100, sufiks: "%", tytul: "Indywidualne podejście", opis: "Każdą dekorację projektujemy od zera — pod Waszą historię, salę i kolory." },
];

const galeriaSlubna = [
  { src: "/images/kwiaciarnia/DSCF1666.jpg", alt: "Elegancka dekoracja ślubna" },
  { src: "/images/kwiaciarnia/DSCF1231.jpg", alt: "Dekoracja kwiatowa" },
  { src: "/images/wypozyczalnia/wypo-01.jpg", alt: "Dekoracje na wesele" },
  { src: "/images/wypozyczalnia/wypo-02.jpg", alt: "Aranżacja eventowa" },
  { src: "/images/wypozyczalnia/wypo-03.jpg", alt: "Akcesoria ślubne" },
  { src: "/images/wypozyczalnia/wypo-04.jpg", alt: "Dekoracje sali" },
];

const KROKI = ["Para & uroczystość", "Styl & usługi", "Wizja & kontakt"];
const STEP_OUT_MS = 250;
// EmailJS — to samo konto i szablon właściciela co zamówienia ze sklepu (app/potwierdzenie/page.tsx)
const EJS_SERVICE = "service_pw7x0df";
const EJS_KEY     = "-Yp8zoOj7V9bdLb_O";
const EJS_T_OWNER = "template_jn31zqm";
const SUCCESS_MS = 2400;  // czas na "✓ Wysłano!" + confetti przed ekranem podziękowania

// Confetti — stałe kierunki rozrzutu
const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist = 70 + ((i * 37) % 50);
  return {
    dx: Math.round(Math.cos(angle) * dist),
    dy: Math.round(Math.sin(angle) * dist * 0.7 - 50),
    rot: (i % 2 ? 1 : -1) * (180 + i * 25),
    color: ["#c9a84c", "#e8c96a", "#e8a6b8", "#f0c4cf"][i % 4],
    size: 5 + (i % 3) * 2,
  };
});

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
  styleOpis: string;
  interesyOpis: string;
}

const emptyForm: FormState = {
  imieOna: "", imieOn: "", data: "", kosciol: "", sala: "",
  goscie: "", budzet: "", style: [], interesy: [], info: "", telefon: "", email: "",
  styleOpis: "", interesyOpis: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

// ── Pola formularza ────────────────────────────────────────

const fieldBase =
  "peer w-full bg-dark-800 border text-cream font-jost text-sm px-4 pt-6 pb-2 placeholder:text-transparent focus:placeholder:text-cream/25 focus:outline-none focus:border-gold focus:shadow-[0_0_16px_rgba(201,168,76,0.3)] transition-[border-color,box-shadow] duration-300 [color-scheme:dark]";

// Label "pływający": leży w polu, gdy jest puste, i przesuwa się do góry na focus / po wpisaniu
const labelFloating =
  "pointer-events-none absolute left-4 font-jost transition-all duration-300 top-2 text-[9px] tracking-[0.3em] uppercase text-gold/80 peer-placeholder-shown:text-xs peer-placeholder-shown:tracking-wide peer-placeholder-shown:normal-case peer-placeholder-shown:text-cream/40 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[9px] peer-focus:tracking-[0.3em] peer-focus:uppercase peer-focus:text-gold";

const labelFixed =
  "pointer-events-none absolute left-4 top-2 font-jost text-[9px] tracking-[0.3em] uppercase text-gold/80";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return <p id={id} className="font-jost text-xs text-red-400 mt-1">{msg}</p>;
}

function FloatingInput({
  id, label, type = "text", placeholder, value, onChange, error, autoComplete,
}: {
  id: string; label: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; error?: string; autoComplete?: string;
}) {
  // Pole daty zawsze pokazuje format (dd.mm.rrrr), więc label od razu stoi u góry
  const fixedLabel = type === "date";
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder ?? " "}
          value={value}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldBase} ${error ? "border-red-400/60" : "border-cream/10"}`}
        />
        <label
          htmlFor={id}
          className={
            fixedLabel
              ? labelFixed
              : `${labelFloating} peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2`
          }
        >
          {label}
        </label>
      </div>
      <FieldError id={`${id}-err`} msg={error} />
    </div>
  );
}

function FloatingTextarea({
  id, label, placeholder, value, onChange,
}: {
  id: string; label: string; placeholder?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder={placeholder ?? " "}
        value={value}
        rows={5}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldBase} border-cream/10 resize-none`}
      />
      <label htmlFor={id} className={`${labelFloating} peer-placeholder-shown:top-4`}>
        {label}
      </label>
    </div>
  );
}

function SelectField({
  id, label, value, onChange, opcje, placeholder,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  opcje: string[]; placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldBase} border-cream/10 appearance-none cursor-pointer ${value ? "" : "text-cream/40"}`}
      >
        <option value="">{placeholder}</option>
        {opcje.map((o) => <option key={o} value={o} className="text-cream">{o}</option>)}
      </select>
      <label htmlFor={id} className={labelFixed}>{label}</label>
      <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
    </div>
  );
}

// Kafelki zamiast checkboxów
function TileGroup({
  opcje, selected, onToggle, label,
}: {
  opcje: { nazwa: string; ikona: string }[];
  selected: string[];
  onToggle: (val: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {opcje.map((o) => {
        const checked = selected.includes(o.nazwa);
        return (
          <button
            key={o.nazwa}
            type="button"
            aria-pressed={checked}
            onClick={() => onToggle(o.nazwa)}
            className={`relative flex flex-col items-center justify-center gap-2 px-3 py-5 border rounded-xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
              checked
                ? "border-gold bg-gold/[0.08] scale-105 shadow-[0_0_20px_rgba(201,168,76,0.18)]"
                : "border-cream/10 bg-dark-800 hover:border-gold/30 hover:-translate-y-0.5"
            }`}
          >
            {checked && (
              <span className="check-pop absolute top-2 right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                <Check size={12} strokeWidth={3} className="text-dark" />
              </span>
            )}
            <span className="text-3xl leading-none" aria-hidden="true">{o.ikona}</span>
            <span className={`font-jost text-xs tracking-wide text-center transition-colors duration-300 ${checked ? "text-gold" : "text-cream/60"}`}>
              {o.nazwa}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Opcjonalne pole opisowe z etykietą nad polem (pod kafelkami)
function OpisTextarea({
  id, label, placeholder, value, onChange,
}: {
  id: string; label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="mt-6">
      <label htmlFor={id} className="block font-jost text-xs text-cream/50 mb-2">
        {label} <span className="text-cream/25">(opcjonalnie)</span>
      </label>
      <textarea
        id={id}
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-dark-800 border border-cream/10 rounded-lg text-cream font-jost text-sm px-4 py-3 placeholder:text-cream/25 focus:outline-none focus:border-gold focus:shadow-[0_0_16px_rgba(201,168,76,0.3)] transition-[border-color,box-shadow] duration-300 resize-none"
      />
    </div>
  );
}

interface Plik {
  id: string;
  file: File;
  url: string; // podgląd (URL.createObjectURL)
}

const MAX_PLIKOW = 5;
const MAX_ROZMIAR = 5 * 1024 * 1024;
const DOZWOLONE_TYPY = ["image/jpeg", "image/png"];

// Strefa uploadu zdjęć inspiracji (drag & drop lub kliknięcie)
function FileDropzone({
  pliki, onAdd, onRemove,
}: {
  pliki: Plik[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [blad, setBlad] = useState<string | null>(null);

  function przyjmij(lista: FileList | null) {
    if (!lista) return;
    const odrzucone: string[] = [];
    const ok: File[] = [];
    for (const f of Array.from(lista)) {
      if (!DOZWOLONE_TYPY.includes(f.type)) odrzucone.push(`${f.name} — tylko JPG lub PNG`);
      else if (f.size > MAX_ROZMIAR) odrzucone.push(`${f.name} — plik większy niż 5MB`);
      else ok.push(f);
    }
    const wolne = MAX_PLIKOW - pliki.length;
    if (ok.length > wolne) odrzucone.push(`Można dodać maksymalnie ${MAX_PLIKOW} plików`);
    const doDodania = ok.slice(0, Math.max(wolne, 0));
    if (doDodania.length) onAdd(doDodania);
    setBlad(odrzucone.length ? odrzucone.join(" · ") : null);
  }

  const pelne = pliki.length >= MAX_PLIKOW;

  return (
    <div>
      <button
        type="button"
        disabled={pelne}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!pelne) setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!pelne) przyjmij(e.dataTransfer.files);
        }}
        aria-describedby="pliki-info"
        className={`w-full flex flex-col items-center justify-center gap-3 px-6 py-10 rounded-xl border-2 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-40 disabled:cursor-not-allowed ${
          dragOver
            ? "border-solid border-gold bg-gold/10"
            : "border-dashed border-gold/40 bg-dark-800 enabled:hover:border-solid enabled:hover:border-gold/70 enabled:hover:bg-gold/[0.04]"
        }`}
      >
        <ImagePlus size={32} strokeWidth={1.25} className={`transition-colors duration-300 ${dragOver ? "text-gold" : "text-gold/60"}`} />
        <span className="font-jost text-sm text-cream/70">
          {pelne ? "Dodano maksymalną liczbę zdjęć" : "Przeciągnij zdjęcia inspiracji lub kliknij aby wybrać"}
        </span>
        <span id="pliki-info" className="font-jost text-[11px] text-cream/35">
          Maks. {MAX_PLIKOW} plików, JPG/PNG, do 5MB każdy
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          przyjmij(e.target.files);
          e.target.value = ""; // pozwala wybrać ten sam plik ponownie
        }}
      />

      {blad && <p role="alert" className="font-jost text-xs text-red-400 mt-2">{blad}</p>}

      {pliki.length > 0 && (
        <ul className="flex flex-wrap gap-3 mt-4">
          {pliki.map((p) => (
            <li key={p.id} className="check-pop relative w-20 h-20 rounded-lg overflow-hidden border border-gold/20 group">
              <img src={p.url} alt={p.file.name} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onRemove(p.id)}
                aria-label={`Usuń ${p.file.name}`}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-dark/80 text-cream flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="font-cormorant text-xl text-cream mb-5 pb-2 border-b border-gold/15">{children}</p>
  );
}

// Pasek postępu: 3 kółka połączone linią
function ProgressBar({ step }: { step: number }) {
  return (
    <div className="relative mb-14 px-4 sm:px-10">
      <div className="absolute top-4 left-[calc(16.66%)] right-[calc(16.66%)] h-px bg-cream/10" />
      <div
        className="absolute top-4 left-[calc(16.66%)] h-px bg-gold transition-all duration-500 ease-out"
        style={{ width: `calc(${(step / (KROKI.length - 1)) * 66.66}%)` }}
      />
      <ol className="relative grid grid-cols-3">
        {KROKI.map((k, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={k} className="flex flex-col items-center gap-3" aria-current={active ? "step" : undefined}>
              <span
                className={`w-8 h-8 rounded-full border flex items-center justify-center font-jost text-xs transition-all duration-500 ${
                  done || active
                    ? "border-gold bg-gold text-dark shadow-[0_0_14px_rgba(201,168,76,0.4)]"
                    : "border-cream/20 bg-dark text-cream/40"
                } ${active ? "scale-110" : ""}`}
              >
                {done ? <Check size={14} strokeWidth={2.5} /> : i + 1}
              </span>
              <span className={`font-jost text-[10px] sm:text-xs tracking-wider uppercase text-center transition-colors duration-300 ${active ? "text-gold" : "text-cream/40"}`}>
                {k}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function DlaczegoKarta({ k, index, visible }: { k: (typeof dlaczegoMy)[number]; index: number; visible: boolean }) {
  const value = useCountUp(k.licznik ?? 0, visible);
  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: visible ? `${index * 150}ms` : "0ms" }}
    >
      <div className="h-full text-center p-8 border border-gold/10 bg-dark/40 rounded-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40">
        <span className="block text-4xl mb-4" aria-hidden="true">{k.ikona}</span>
        {k.licznik !== null && (
          <p className="font-cormorant text-5xl text-gold tabular-nums leading-none mb-2">
            {value}{k.sufiks}
          </p>
        )}
        <h3 className="font-cormorant text-2xl text-cream mb-3">{k.tytul}</h3>
        <p className="font-jost text-sm text-cream/45 leading-relaxed">{k.opis}</p>
      </div>
    </div>
  );
}

export default function WeselePage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [leaving, setLeaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const timers = useRef<number[]>([]);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [pliki, setPliki] = useState<Plik[]>([]);
  const plikiRef = useRef<Plik[]>([]);
  plikiRef.current = pliki;

  const heroImgRef = useParallax<HTMLDivElement>(0.3);
  const [whyRef, whyVisible] = useReveal<HTMLDivElement>(0.2);
  const [galRef, galVisible] = useReveal<HTMLDivElement>(0.15);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  // Zwolnij podglądy zdjęć przy opuszczeniu strony
  useEffect(() => () => plikiRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  function dodajPliki(files: File[]) {
    setPliki((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
  }

  function usunPlik(id: string) {
    setPliki((prev) => {
      const p = prev.find((x) => x.id === id);
      if (p) URL.revokeObjectURL(p.url);
      return prev.filter((x) => x.id !== id);
    });
  }

  // Dane formularza jako tekst do maila (EmailJS nie przyjmuje plików — wysyłamy tylko informację o zdjęciach)
  function zbudujTresc(): string {
    const lub = (v: string) => v.trim() || "nie podano";
    const lista = (v: string[]) => (v.length ? v.join(", ") : "nie wybrano");
    return [
      "ZAPYTANIE WESELNE",
      "",
      `Para: ${form.imieOna} & ${form.imieOn}`,
      `Data ślubu: ${form.data}`,
      `Kościół / ceremonia: ${lub(form.kosciol)}`,
      `Sala: ${lub(form.sala)}`,
      `Liczba gości: ${lub(form.goscie)}`,
      `Budżet: ${lub(form.budzet)}`,
      "",
      `Styl: ${lista(form.style)}`,
      `Opis stylu: ${lub(form.styleOpis)}`,
      `Interesuje nas: ${lista(form.interesy)}`,
      `Opis usług: ${lub(form.interesyOpis)}`,
      "",
      `Wizja / dodatkowe informacje: ${lub(form.info)}`,
      "",
      `Telefon: ${form.telefon}`,
      `Email: ${form.email}`,
      pliki.length
        ? `\nZdjęcia inspiracji: klient dodał ${pliki.length} (nie są załączone — poproś o przesłanie mailem).`
        : "",
    ].join("\n");
  }

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function toggle(field: "style" | "interesy", val: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(val)
        ? f[field].filter((v) => v !== val)
        : [...f[field], val],
    }));
  }

  function set(field: keyof FormState) {
    return (v: string) => {
      setForm((f) => ({ ...f, [field]: v }));
      if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    };
  }

  function validateStep(s: number): boolean {
    const e: Errors = {};
    if (s === 0) {
      if (!form.imieOna.trim()) e.imieOna = "Wymagane";
      if (!form.imieOn.trim()) e.imieOn = "Wymagane";
      if (!form.data) e.data = "Wymagane";
    }
    if (s === 2) {
      if (!form.telefon.trim()) e.telefon = "Wymagane";
      if (!form.email.trim()) e.email = "Wymagane";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Nieprawidłowy email";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goTo(next: number) {
    if (next > step && !validateStep(step)) return;
    setDir(next > step ? 1 : -1);

    const swap = () => {
      setStep(next);
      setLeaving(false);
      // Jeśli góra formularza uciekła nad ekran — wróć do niej
      const top = formTopRef.current;
      if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (prefersReducedMotion()) {
      swap();
      return;
    }
    setLeaving(true);
    later(swap, STEP_OUT_MS);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < KROKI.length - 1) {
      goTo(step + 1);
      return;
    }
    if (status === "sending" || status === "sent" || !validateStep(step)) return;

    const tresc = zbudujTresc();
    // Pola jak w zamówieniach ze sklepu (szablon właściciela) + pełna treść w "uwagi" / "message"
    const params = {
      to_email:        "kwiaciarniaroyalflowers@gmail.com",
      order_code:      `WESELE-${form.data}`,
      client_name:     `${form.imieOna} & ${form.imieOn}`,
      client_phone:    form.telefon,
      client_email:    form.email,
      bukiet:          "Zapytanie weselne",
      kwota:           form.budzet || "nie podano",
      pickup_type:     "Wesele",
      pickup_tab:      "wesele",
      automat_address: "",
      data_odbioru:    form.data,
      godzina_odbioru: "",
      uwagi:           tresc,
      message:         tresc,
    };

    setStatus("sending");
    emailjs
      .send(EJS_SERVICE, EJS_T_OWNER, params, EJS_KEY)
      .then(() => {
        setStatus("sent");
        later(() => setSubmitted(true), SUCCESS_MS);
      })
      .catch((err: unknown) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  }

  function reset() {
    setSubmitted(false);
    setForm(emptyForm);
    setStep(0);
    setStatus("idle");
    setErrors({});
    pliki.forEach((p) => URL.revokeObjectURL(p.url));
    setPliki([]);
  }

  const stepClass = leaving
    ? `transition-all duration-[250ms] ease-in opacity-0 ${dir === 1 ? "-translate-x-12" : "translate-x-12"}`
    : dir === 1
      ? "step-in-right"
      : "step-in-left";

  return (
    <main className="pt-28 min-h-screen bg-dark">

      {/* Hero ze zdjęciem — parallax */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div ref={heroImgRef} className="absolute -inset-y-[15%] inset-x-0 will-change-transform">
          <img
            src="/images/kwiaciarnia/DSCF1231.jpg"
            alt="Dekoracje ślubne Royal Flowers"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20 w-full">
          <p className="fade-up font-jost text-xs tracking-[0.6em] uppercase text-gold mb-5">
            Royal Flowers — Nowy Sącz
          </p>
          <h1 className="fade-up font-cormorant text-5xl md:text-7xl font-light text-cream leading-tight mb-4" style={{ animationDelay: "100ms" }}>
            Florystyka &<br />
            <span className="italic text-gold">Dekoracje Ślubne</span>
          </h1>
          <div className="line-grow h-px bg-gold mb-6" style={{ animationDelay: "300ms", maxWidth: 64 }} />
          <p className="fade-up font-jost text-base text-cream/65 max-w-md leading-relaxed" style={{ animationDelay: "400ms" }}>
            Każde wesele zasługuje na wyjątkową oprawę kwiatową. Opowiedz nam
            o swojej wizji – stworzymy razem niezapomniane wspomnienia.
          </p>
        </div>
      </section>

      {/* Dlaczego my */}
      <section className="py-20 px-6 md:px-16 bg-dark-800 border-b border-gold/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Zaufaj nam</p>
            <h2 className="font-cormorant text-4xl font-light text-cream">Dlaczego my?</h2>
          </div>
          <div ref={whyRef} className="grid md:grid-cols-3 gap-6">
            {dlaczegoMy.map((k, i) => (
              <DlaczegoKarta key={k.tytul} k={k} index={i} visible={whyVisible} />
            ))}
          </div>
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
                onClick={reset}
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
          /* ── FORMULARZ KROKOWY ── */
          <form onSubmit={handleSubmit} noValidate>
            <div ref={formTopRef} className="scroll-mt-32 text-center mb-12">
              <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Florystyka ślubna</p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-cream">Złóż zapytanie</h2>
              <div className="w-12 h-px bg-gold mx-auto mt-5" />
            </div>

            <ProgressBar step={step} />

            <div className="overflow-x-clip -mx-3 px-3 py-2">
              <div key={step} className={stepClass}>
                {step === 0 && (
                  <div className="space-y-10">
                    <div>
                      <SectionTitle>Para Młoda</SectionTitle>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FloatingInput id="imieOna" label="Ona — imię i nazwisko *" placeholder="np. Anna Kowalska" value={form.imieOna} onChange={set("imieOna")} error={errors.imieOna} />
                        <FloatingInput id="imieOn" label="On — imię i nazwisko *" placeholder="np. Piotr Nowak" value={form.imieOn} onChange={set("imieOn")} error={errors.imieOn} />
                      </div>
                    </div>
                    <div>
                      <SectionTitle>Szczegóły uroczystości</SectionTitle>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FloatingInput id="data" type="date" label="Data ślubu *" value={form.data} onChange={set("data")} error={errors.data} />
                        <SelectField id="goscie" label="Liczba gości" value={form.goscie} onChange={set("goscie")} placeholder="Wybierz przedział" opcje={["Do 50 osób", "50–100 osób", "100–150 osób", "150+ osób"]} />
                        <FloatingInput id="kosciol" label="Miejsce ślubu / kościół" placeholder="np. Kościół pw. św. Małgorzaty" value={form.kosciol} onChange={set("kosciol")} />
                        <FloatingInput id="sala" label="Miejsce wesela / sala" placeholder="np. Restauracja Panorama" value={form.sala} onChange={set("sala")} />
                        <div className="sm:col-span-2">
                          <SelectField id="budzet" label="Budżet na florystykę" value={form.budzet} onChange={set("budzet")} placeholder="Wybierz przedział" opcje={["Do 2 000 zł", "2 000–5 000 zł", "5 000–10 000 zł", "Powyżej 10 000 zł"]} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-10">
                    <div>
                      <SectionTitle>Styl dekoracji</SectionTitle>
                      <TileGroup label="Styl dekoracji" opcje={style_opcje} selected={form.style} onToggle={(v) => toggle("style", v)} />
                      <OpisTextarea id="styleOpis" label="Masz własną wizję? Opowiedz nam o niej ✨" placeholder="Opisz swój wymarzony styl... kolory, motyw przewodni, inspiracje" value={form.styleOpis} onChange={set("styleOpis")} />
                    </div>
                    <div>
                      <SectionTitle>Co Was interesuje</SectionTitle>
                      <TileGroup label="Co Was interesuje" opcje={interesuje_opcje} selected={form.interesy} onToggle={(v) => toggle("interesy", v)} />
                      <OpisTextarea id="interesyOpis" label="Potrzebujesz czegoś innego? Napisz 💬" placeholder="Inne usługi lub szczegóły, które chcielibyście omówić..." value={form.interesyOpis} onChange={set("interesyOpis")} />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <SectionTitle>Wasza wizja & kontakt</SectionTitle>
                    <div className="space-y-4">
                      <FloatingTextarea id="info" label="Dodatkowe informacje / wizja" placeholder="Opiszcie swoje wyobrażenie dekoracji, ulubione kwiaty, kolory, styl…" value={form.info} onChange={set("info")} />
                      <FileDropzone pliki={pliki} onAdd={dodajPliki} onRemove={usunPlik} />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FloatingInput id="telefon" type="tel" label="Telefon kontaktowy *" placeholder="+48 600 000 000" value={form.telefon} onChange={set("telefon")} error={errors.telefon} autoComplete="tel" />
                        <FloatingInput id="email" type="email" label="Adres e-mail *" placeholder="wasza@poczta.pl" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Nawigacja */}
            <div className="mt-12 pt-6 flex flex-col-reverse sm:flex-row items-center gap-6 justify-between border-t border-gold/10">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  disabled={status === "sending" || status === "sent"}
                  className="inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-cream/50 hover:text-gold transition-colors duration-300 disabled:opacity-40"
                >
                  <ArrowLeft size={14} /> Wstecz
                </button>
              ) : (
                <p className="font-jost text-xs text-cream/30 leading-relaxed max-w-sm">
                  Odpiszemy w ciągu 24 godzin. Pola oznaczone * są wymagane.
                </p>
              )}

              {step < KROKI.length - 1 ? (
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-gold text-dark font-jost text-sm tracking-widest uppercase px-12 py-4 hover:bg-gold-light transition-colors duration-300 shrink-0"
                >
                  Dalej <ArrowRight size={16} />
                </button>
              ) : (
                <div className="relative shrink-0">
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "sent"}
                    aria-live="polite"
                    className={`relative inline-flex items-center justify-center gap-3 min-w-[260px] font-jost text-sm tracking-widest uppercase px-12 py-4 transition-colors duration-500 ${
                      status === "sent"
                        ? "bg-emerald-600 text-white"
                        : "bg-gold text-dark hover:bg-gold-light disabled:hover:bg-gold"
                    }`}
                  >
                    {status === "idle" && (<>Wyślij zapytanie <ArrowRight size={16} /></>)}
                    {status === "error" && (<>Wyślij ponownie <ArrowRight size={16} /></>)}
                    {status === "sending" && (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-dark/25 border-t-dark animate-spin" aria-hidden="true" />
                        Wysyłanie…
                      </>
                    )}
                    {status === "sent" && (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path className="check-draw" pathLength={1} d="M4 12.5l5 5L20 6.5" />
                        </svg>
                        Wysłano!
                      </>
                    )}
                  </button>
                  {status === "sent" && (
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                      {CONFETTI.map((c, i) => (
                        <span
                          key={i}
                          className="confetti-piece"
                          style={{
                            width: c.size,
                            height: c.size * 0.6,
                            background: c.color,
                            animationDelay: `${(i % 4) * 40}ms`,
                            ["--dx" as string]: `${c.dx}px`,
                            ["--dy" as string]: `${c.dy}px`,
                            ["--rot" as string]: `${c.rot}deg`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {status === "error" && (
              <p role="alert" className="font-jost text-sm text-red-400 text-center mt-6">
                Nie udało się wysłać zapytania. Spróbuj ponownie lub zadzwoń do kwiaciarni.
              </p>
            )}
          </form>
        )}
      </section>

      {/* Mini galeria ślubna */}
      <section className="py-20 border-t border-gold/10 bg-dark-800">
        <div className="text-center mb-12 px-6">
          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">Inspiracje</p>
          <h2 className="font-cormorant text-4xl font-light text-cream">Nasze realizacje ślubne</h2>
        </div>
        <div
          ref={galRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-16 lg:grid lg:grid-cols-6 lg:overflow-visible max-w-7xl mx-auto"
        >
          {galeriaSlubna.map((z, i) => (
            <div
              key={z.src}
              className={`shrink-0 w-[65%] sm:w-[38%] lg:w-auto snap-start overflow-hidden rounded-[2px] group transition-all duration-700 ease-out ${
                galVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: galVisible ? `${i * 100}ms` : "0ms" }}
            >
              <img
                src={z.src}
                alt={z.alt}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/realizacje"
            className="inline-flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300"
          >
            Zobacz wszystkie realizacje <ArrowRight size={14} />
          </Link>
        </div>
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
