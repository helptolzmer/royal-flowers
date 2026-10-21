"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShoppingBag,
  Store,
  User,
} from "lucide-react";
import {
  getAvailableHours,
  getFlowerDayMsg,
  getPickupDeadline,
  isHoliday,
  SHOP_ADDRESS,
} from "@/lib/orderRules";
import { useCart } from "@/lib/CartContext";

type PickupTab = "automat" | "kwiaciarnia";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "RF-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function formatDeadlineDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

export default function ZamowienieSklepPage() {
  const { items, getTotal, getProductsTotal, getExtrasTotal } = useCart();
  const total = getTotal();
  const extrasTotal = getExtrasTotal();

  const [pickupTab] = useState<PickupTab>("kwiaciarnia");
  const [data, setData] = useState("");
  const [godzina, setGodzina] = useState("");
  const [imie, setImie] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [uwagi, setUwagi] = useState("");
  const [regulamin, setRegulamin] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [kod] = useState(generateCode());

  const availableHours =
    data && !dataError ? getAvailableHours(data, new Date(), pickupTab) : [];
  const noHoursAvailable = !!data && !dataError && availableHours.length === 0;

  const deadlineHour = godzina ? parseInt(godzina.split(":")[0], 10) : null;
  const deadline =
    data && godzina && !dataError && deadlineHour !== null
      ? getPickupDeadline(data, deadlineHour, pickupTab)
      : null;

  const canSubmit =
    items.length > 0 &&
    data !== "" &&
    !dataError &&
    !noHoursAvailable &&
    godzina !== "" &&
    imie.trim() !== "" &&
    telefon.trim() !== "" &&
    regulamin === true;

  function handleDateChange(dateStr: string) {
    setData(dateStr);
    setGodzina("");
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

  async function handleSubmit() {
    if (!canSubmit) return;
    setSending(true);
    setSendError(null);

    const pickupInfo = `Kwiaciarnia: ${SHOP_ADDRESS}`;
    const bukietStr = items
      .map((i) => (i.size ? `${i.quantity}x ${i.productName} (${i.size})` : `${i.quantity}x ${i.productName}`))
      .join(", ");

    sessionStorage.setItem(
      "royalflowers_order",
      JSON.stringify({
        orderCode: kod,
        bukiet: bukietStr,
        kwota: String(total),
        pickupInfo,
        data,
        godzina,
        imie,
        telefon,
        email,
        uwagi,
        pickupTab,
        fromShopCart: true,
      })
    );

    try {
      const res = await fetch("/api/przelewy24/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode: kod,
          amountPLN: total,
          email,
          description: `Royal Flowers – ${bukietStr}`,
          data,
          godzina,
          pickupType: pickupTab,
        }),
      });

      const resData = await res.json();

      if (!res.ok || !resData.redirectUrl) {
        setSendError(resData.error || "Błąd inicjalizacji płatności. Spróbuj ponownie.");
        return;
      }

      window.location.href = resData.redirectUrl;
    } catch {
      setSendError(
        "Nie udało się połączyć z bramką płatności. Sprawdź połączenie i spróbuj ponownie."
      );
    } finally {
      setSending(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="pt-28 min-h-screen bg-white">
        <section className="py-28 px-6 text-center max-w-xl mx-auto">
          <ShoppingBag size={36} className="text-stone-300 mx-auto mb-6" />
          <h1 className="font-cormorant text-3xl font-light text-stone-800 mb-3">
            Twój koszyk jest pusty
          </h1>
          <p className="font-jost text-sm text-stone-400 mb-8">
            Dodaj produkty ze sklepu, aby złożyć zamówienie.
          </p>
          <Link
            href="/sklep"
            className="inline-flex items-center justify-center gap-2 bg-gold text-white font-jost text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-gold-light transition-colors duration-300"
          >
            Przejdź do sklepu
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-28 min-h-screen bg-white">
      <section className="py-10 px-6 md:px-16 max-w-5xl mx-auto">
        <h1 className="font-cormorant text-4xl font-light text-stone-800 mb-10">
          Dokończ zamówienie
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
          {/* Formularz */}
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-stone-500 mb-2">
                <User size={13} /> Imię i nazwisko
              </label>
              <input
                type="text"
                placeholder="Anna Kowalska"
                value={imie}
                onChange={(e) => setImie(e.target.value)}
                className="w-full border border-stone-200 text-stone-800 font-jost text-sm px-4 py-3 placeholder:text-stone-300 focus:outline-none focus:border-gold/60 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-stone-500 mb-2">
                <Phone size={13} /> Numer telefonu
              </label>
              <input
                type="tel"
                placeholder="+48 600 000 000"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                className="w-full border border-stone-200 text-stone-800 font-jost text-sm px-4 py-3 placeholder:text-stone-300 focus:outline-none focus:border-gold/60 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-stone-500 mb-2">
                <Mail size={13} /> E-mail (opcjonalnie — potwierdzenie zamówienia)
              </label>
              <input
                type="email"
                placeholder="anna@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-stone-200 text-stone-800 font-jost text-sm px-4 py-3 placeholder:text-stone-300 focus:outline-none focus:border-gold/60 transition-colors duration-300"
              />
            </div>

            {/* Odbiór */}
            <div className="flex border border-stone-200">
              <div className="flex-1 relative group">
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase px-4 py-3.5 cursor-not-allowed opacity-40 text-stone-400"
                >
                  <MapPin size={13} /> Wybierz automat
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-stone-800 text-white font-jost text-[10px] tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 rounded">
                  Kwiatomat tymczasowo niedostępny – trwa przebudowa
                </div>
              </div>
              <button
                className="flex-1 flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase px-4 py-3.5 border-l border-stone-200 bg-gold text-white"
              >
                <Store size={13} /> Odbierz w kwiaciarni
              </button>
            </div>

            <div className="border border-gold/30 bg-gold/5 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Store size={16} className="text-gold mt-0.5 shrink-0" />
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-1">
                      Adres
                    </p>
                    <p className="font-jost text-sm text-stone-700">{SHOP_ADDRESS}</p>
                  </div>
                  <div>
                    <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-1">
                      Godziny otwarcia
                    </p>
                    <p className="font-jost text-sm text-stone-700">Pon – Pt: 9:00 – 17:00</p>
                    <p className="font-jost text-sm text-stone-700">Sobota: 9:00 – 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data i godzina */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-stone-500 mb-2">
                  <Calendar size={13} /> Data odbioru
                </label>
                <input
                  type="date"
                  value={data}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className={`w-full border text-stone-800 font-jost text-sm px-4 py-3 focus:outline-none transition-colors duration-300 ${
                    dataError ? "border-red-400/60 focus:border-red-400" : "border-stone-200 focus:border-gold/60"
                  }`}
                />
                {dataError && (
                  <p className="font-jost text-[10px] text-red-500 mt-1.5 leading-relaxed">
                    {dataError}
                  </p>
                )}
              </div>

              <div>
                <label className="font-jost text-xs tracking-widest uppercase text-stone-500 mb-2 block">
                  Godzina odbioru
                </label>
                {noHoursAvailable ? (
                  <p className="font-jost text-[10px] text-amber-600 border border-amber-300 bg-amber-50 px-3 py-2.5 leading-relaxed">
                    W wybranym dniu nie ma już dostępnych godzin. Wybierz następny dzień roboczy.
                  </p>
                ) : (
                  <select
                    value={godzina}
                    onChange={(e) => setGodzina(e.target.value)}
                    disabled={!data || !!dataError}
                    className="w-full border border-stone-200 text-stone-800 font-jost text-sm px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!data || dataError ? "Najpierw wybierz datę" : "Wybierz godzinę"}
                    </option>
                    {availableHours.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                )}
                {deadline && (
                  <p className="font-jost text-[10px] text-gold mt-2 tracking-wide">
                    Odbierz do:{" "}
                    <span className="font-medium">
                      {formatDeadlineDate(deadline.dateStr)} godz. {deadline.time}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 font-jost text-xs tracking-widest uppercase text-stone-500 mb-2">
                <MessageSquare size={13} /> Uwagi (opcjonalnie)
              </label>
              <textarea
                placeholder="Np. dedykacja na karteczce, szczególne życzenia..."
                value={uwagi}
                onChange={(e) => setUwagi(e.target.value)}
                rows={3}
                className="w-full border border-stone-200 text-stone-800 font-jost text-sm px-4 py-3 placeholder:text-stone-300 focus:outline-none focus:border-gold/60 transition-colors duration-300 resize-none"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={regulamin}
                onChange={(e) => setRegulamin(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-gold shrink-0"
              />
              <span className="font-jost text-xs text-stone-500 leading-relaxed">
                Akceptuję{" "}
                <Link
                  href="/regulamin"
                  target="_blank"
                  className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors duration-200"
                >
                  regulamin sprzedaży
                </Link>{" "}
                Royal Flowers <span className="text-red-400">*</span>
              </span>
            </label>

            {sendError && (
              <p className="font-jost text-xs text-red-500 border border-red-200 bg-red-50 px-4 py-3">
                {sendError}
              </p>
            )}
          </div>

          {/* Podsumowanie koszyka */}
          <div className="h-fit border border-stone-200 p-6">
            <h2 className="font-cormorant text-2xl font-light text-stone-800 mb-5">
              Twoje zamówienie
            </h2>

            <ul className="space-y-3 mb-5">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex justify-between gap-3 font-jost text-sm"
                >
                  <span className="text-stone-600">
                    {item.quantity}x {item.productName}
                    {item.size && (
                      <span className="text-stone-400"> ({item.size})</span>
                    )}
                  </span>
                  <span className="text-stone-800 shrink-0">
                    {item.price * item.quantity} zł
                  </span>
                </li>
              ))}
            </ul>

            {extrasTotal > 0 ? (
              <div className="space-y-1.5 border-t border-stone-200 pt-4">
                <div className="flex items-center justify-between font-jost text-sm text-stone-500">
                  <span>Produkty</span>
                  <span>{getProductsTotal()} zł</span>
                </div>
                <div className="flex items-center justify-between font-jost text-sm text-stone-500">
                  <span>Dodatki</span>
                  <span>{extrasTotal} zł</span>
                </div>
                <div className="flex items-center justify-between font-jost text-base text-stone-800 font-medium pt-2">
                  <span>Razem</span>
                  <span className="font-cormorant text-2xl">{total} zł</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between font-jost text-base text-stone-800 font-medium border-t border-stone-200 pt-4">
                <span>Suma</span>
                <span className="font-cormorant text-2xl">{total} zł</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || sending}
              className={`w-full mt-6 flex items-center justify-center gap-2 font-jost text-sm tracking-widest uppercase py-4 transition-all duration-300 ${
                canSubmit && !sending
                  ? "bg-gold text-white hover:bg-gold-light"
                  : "bg-stone-100 text-stone-300 cursor-not-allowed"
              }`}
            >
              {sending ? "Przekierowanie do płatności…" : "Zamów i zapłać"}
              {!sending && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gold/10 py-8 px-6 bg-dark mt-16">
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
