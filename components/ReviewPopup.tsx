"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const STORAGE_KEY = "rf_popup_shown";       // localStorage: data ostatniego pokazania
const SESSION_KEY = "rf_popup_closed";      // sessionStorage: zamknięty w tej sesji
const SHOW_AFTER_MS = 5000;
const HIDE_FOR_MS = 7 * 24 * 60 * 60 * 1000; // 7 dni
const CLOSE_MS = 200;
const SWAP_MS = 200;      // crossfade: wygaszenie pierwszego ekranu
const COPIED_MS = 2000;
const KOD_RABATOWY = "OPINIA5";

// Link do dodania opinii w Profilu Firmy Google kwiaciarni
const GOOGLE_REVIEW_URL = "https://g.page/r/CVIWigBLbqVOEBM/review";

// Popup nie pojawia się w panelu administracyjnym
const WYKLUCZONE = ["/admin"];

function wolnoPokazac(): boolean {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const kiedy = Number(raw);
    return !Number.isFinite(kiedy) || Date.now() - kiedy > HIDE_FOR_MS;
  } catch {
    // Brak dostępu do storage (np. tryb prywatny) — nie męcz użytkownika
    return false;
  }
}

export default function ReviewPopup() {
  const pathname = usePathname();
  const [stan, setStan] = useState<"ukryty" | "otwarty" | "zamykanie">("ukryty");
  const [ekran, setEkran] = useState<"prosba" | "kod">("prosba");
  const [wygaszanie, setWygaszanie] = useState(false);
  const [skopiowano, setSkopiowano] = useState(false);
  const glownyRef = useRef<HTMLAnchorElement>(null);
  const kopiujRef = useRef<HTMLButtonElement>(null);
  const timery = useRef<number[]>([]);
  const poprzedniFocus = useRef<HTMLElement | null>(null);
  const wykluczona = WYKLUCZONE.some((p) => pathname?.startsWith(p));

  // Pokaż po 5 sekundach (raz na 7 dni, nie po zamknięciu w tej sesji)
  useEffect(() => {
    if (wykluczona || !wolnoPokazac()) return;
    const id = window.setTimeout(() => {
      if (!wolnoPokazac()) return;
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
      poprzedniFocus.current = document.activeElement as HTMLElement | null;
      setStan("otwarty");
    }, SHOW_AFTER_MS);
    return () => window.clearTimeout(id);
  }, [wykluczona]);

  const zamknij = useCallback(() => {
    setStan((s) => (s === "otwarty" ? "zamykanie" : s));
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => () => timery.current.forEach((t) => window.clearTimeout(t)), []);

  // Klik "Zostaw opinię": link otwiera się w nowej karcie (domyślne działanie <a>),
  // a modal przechodzi (crossfade) na ekran z kodem rabatowym
  function pokazKod() {
    setWygaszanie(true);
    timery.current.push(
      window.setTimeout(() => {
        setEkran("kod");
        setWygaszanie(false);
      }, SWAP_MS)
    );
  }

  async function kopiujKod() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(KOD_RABATOWY);
      ok = true;
    } catch {
      // Starsze przeglądarki / brak HTTPS — awaryjnie przez zaznaczenie tekstu
      try {
        const ta = document.createElement("textarea");
        ta.value = KOD_RABATOWY;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {}
    }
    if (!ok) return;
    setSkopiowano(true);
    timery.current.push(window.setTimeout(() => setSkopiowano(false), COPIED_MS));
  }

  // Focus na przycisku kopiowania po pokazaniu kodu
  useEffect(() => {
    if (ekran === "kod") kopiujRef.current?.focus();
  }, [ekran]);

  // Po animacji zamykania — usuń z DOM i oddaj focus
  useEffect(() => {
    if (stan !== "zamykanie") return;
    const id = window.setTimeout(() => {
      setStan("ukryty");
      setEkran("prosba");
      setSkopiowano(false);
      poprzedniFocus.current?.focus?.();
    }, CLOSE_MS);
    return () => window.clearTimeout(id);
  }, [stan]);

  // ESC zamyka; focus na głównym przycisku po otwarciu
  useEffect(() => {
    if (stan !== "otwarty") return;
    glownyRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") zamknij();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [stan, zamknij]);

  if (stan === "ukryty") return null;
  const zamykanie = stan === "zamykanie";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-[4px] ${
        zamykanie ? "popup-backdrop-out" : "popup-backdrop-in"
      }`}
      onClick={zamknij}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rf-popup-title"
        aria-describedby="rf-popup-desc"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-[rgba(212,168,67,0.2)] bg-[#1a1a1a] shadow-2xl ${
          zamykanie ? "popup-modal-out" : "popup-modal-in"
        }`}
      >
        {/* Zdjęcie */}
        <div className="relative h-[180px]">
          <img
            src="/images/kwiaciarnia/DSCF1834.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
        </div>

        <button
          type="button"
          onClick={zamknij}
          aria-label="Zamknij"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-[#666] hover:text-white transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {/* Treść — crossfade między ekranami */}
        <div
          className={`px-6 pb-7 -mt-8 relative text-center transition-opacity ease-out ${
            wygaszanie ? "opacity-0 duration-200" : "opacity-100 duration-300"
          }`}
        >
          {ekran === "prosba" ? (
            <>
              <span className="popup-emoji-pulse text-[40px] leading-none" aria-hidden="true">🌹</span>
              <h2 id="rf-popup-title" className="font-jost text-2xl font-bold text-white mt-3 mb-2">
                Odbierz 5% rabatu!
              </h2>
              <p id="rf-popup-desc" className="font-jost text-sm text-[#999] leading-relaxed px-5 mb-6">
                Zostaw opinię o naszej kwiaciarni w Google, a otrzymasz kod rabatowy 5% na kolejne zamówienie
              </p>

              <a
                ref={glownyRef}
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={pokazKod}
                className="block w-full rounded-lg bg-[#D4A843] px-8 py-3.5 font-jost text-sm font-medium uppercase tracking-[1px] text-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,168,67,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Zostaw opinię w Google ⭐
              </a>
              <button
                type="button"
                onClick={zamknij}
                className="mt-4 font-jost text-[13px] text-[#666] hover:text-[#999] transition-colors duration-200 cursor-pointer"
              >
                Może później
              </button>
            </>
          ) : (
            <>
              <span className="popup-emoji-bounce text-[40px] leading-none" aria-hidden="true">🎉</span>
              <h2 id="rf-popup-title" className="font-jost text-2xl font-bold text-white mt-3 mb-5">
                Dziękujemy za opinię!
              </h2>

              <p
                id="rf-popup-desc"
                className="inline-block rounded-lg border-2 border-dashed border-[#D4A843] bg-[rgba(212,168,67,0.05)] px-6 py-3 text-center font-jost text-[28px] font-bold tracking-[0.15em] text-[#D4A843] select-all"
              >
                {KOD_RABATOWY}
              </p>

              <div className="mt-4">
                <button
                  ref={kopiujRef}
                  type="button"
                  onClick={kopiujKod}
                  aria-live="polite"
                  className={`min-w-[180px] rounded-lg border px-6 py-2.5 font-jost text-xs font-medium uppercase tracking-[1px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                    skopiowano
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                      : "border-[#D4A843] text-[#D4A843] hover:bg-[rgba(212,168,67,0.1)]"
                  }`}
                >
                  {skopiowano ? "Skopiowano ✓" : "Kopiuj kod"}
                </button>
              </div>

              <p className="font-jost text-[13px] text-[#999] leading-relaxed mt-5 mb-6 px-4">
                Podaj ten kod przy składaniu zamówienia online lub w kwiaciarni
              </p>

              <button
                type="button"
                onClick={zamknij}
                className="w-full rounded-lg bg-[#D4A843] px-8 py-3.5 font-jost text-sm font-medium uppercase tracking-[1px] text-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,168,67,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Zamknij
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
