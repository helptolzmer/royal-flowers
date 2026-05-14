"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { Check, Flower2 } from "lucide-react";

const EJS_SERVICE  = "service_pw7x0df";
const EJS_KEY      = "-Yp8zoOj7V9bdLb_O";
const EJS_T_OWNER  = "template_jn31zqm";
const EJS_T_CLIENT = "template_4r8akwm";

interface StoredOrder {
  orderCode:   string;
  bukiet:      string;
  kwota:       string;
  pickupInfo:  string;
  data:        string;
  godzina:     string;
  imie:        string;
  telefon:     string;
  email:       string;
  uwagi:       string;
  pickupTab:   "automat" | "kwiaciarnia";
  automatNazwa?: string;
}

function PotwierdzeniePage() {
  const params    = useSearchParams();
  const orderCode = params.get("orderCode") || "";
  const [order, setOrder]       = useState<StoredOrder | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("royalflowers_order");
    if (!raw) return;

    let stored: StoredOrder;
    try {
      stored = JSON.parse(raw);
    } catch {
      return;
    }

    setOrder(stored);

    // Wyślij maile tylko raz po powrocie z P24
    const flagKey = `rf_email_sent_${stored.orderCode}`;
    if (sessionStorage.getItem(flagKey)) {
      setEmailSent(true);
      return;
    }

    const baseParams = {
      order_code:     stored.orderCode,
      client_name:    stored.imie,
      client_phone:   stored.telefon,
      client_email:   stored.email || "nie podano",
      bukiet:         stored.bukiet,
      kwota:          stored.kwota ? `${stored.kwota} zł` : "nie podano",
      pickup_type:    stored.pickupInfo,
      data_odbioru:   stored.data,
      godzina_odbioru: stored.godzina,
      uwagi:          stored.uwagi || "brak",
    };

    emailjs
      .send(EJS_SERVICE, EJS_T_OWNER, { ...baseParams, to_email: "kwiaciarniaroyalflowers@gmail.com" }, EJS_KEY)
      .then(() => {
        if (stored.email) {
          return emailjs.send(EJS_SERVICE, EJS_T_CLIENT, { ...baseParams, to_email: stored.email }, EJS_KEY);
        }
      })
      .then(() => {
        sessionStorage.setItem(flagKey, "1");
        setEmailSent(true);
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        sessionStorage.setItem(flagKey, "1");
        setEmailSent(true);
      });
  }, []);

  const displayCode = orderCode || order?.orderCode || "";

  return (
    <main className="pt-20 min-h-screen bg-dark">
      <section
        className="py-16 px-6 text-center border-b border-gold/10 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at 50% 80%, #c9a84c33 0%, transparent 60%)" }}
        />
        <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4 relative">
          Royal Flowers
        </p>
        <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cream relative">
          Potwierdzenie
        </h1>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 border border-gold mx-auto mb-8 flex items-center justify-center">
            <Check size={32} className="text-gold" />
          </div>

          <p className="font-jost text-xs tracking-[0.5em] uppercase text-gold mb-4">
            Płatność zakończona pomyślnie
          </p>
          <h2 className="font-cormorant text-4xl font-light text-cream mb-4">
            {order ? `Dziękujemy, ${order.imie.split(" ")[0]}!` : "Dziękujemy za zamówienie!"}
          </h2>

          {order?.pickupTab === "automat" ? (
            <p className="font-jost text-sm text-cream/50 mb-10 leading-relaxed">
              Potwierdzenie zostało wysłane na numer{" "}
              <span className="text-cream">{order.telefon}</span>.{" "}
              Okaż kod przy automacie, aby odebrać kwiaty.
            </p>
          ) : (
            <p className="font-jost text-sm text-cream/50 mb-10 leading-relaxed">
              Twoje zamówienie zostało opłacone. Okaż poniższy kod w kwiaciarni przy odbiorze.
            </p>
          )}

          {displayCode && (
            <div className="border border-gold/30 bg-gold/5 px-12 py-8 mb-10 inline-block">
              <p className="font-jost text-xs tracking-[0.6em] uppercase text-gold/60 mb-3">
                Twój kod zamówienia
              </p>
              <p className="font-cormorant text-5xl font-light text-gold tracking-widest">
                {displayCode}
              </p>
            </div>
          )}

          {order && (
            <div className="border border-cream/10 bg-dark-800 p-6 text-left space-y-4 mb-10">
              <h3 className="font-cormorant text-lg text-cream mb-4">Podsumowanie zamówienia</h3>
              {[
                { label: "Bukiet",       val: order.bukiet },
                { label: "Kwota",        val: order.kwota ? `${order.kwota} zł` : undefined },
                { label: "Odbiór",       val: order.pickupInfo },
                { label: "Data odbioru", val: order.data },
                { label: "Godzina",      val: order.godzina },
              ]
                .filter((r) => r.val)
                .map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center py-2 border-b border-cream/5 last:border-0"
                  >
                    <span className="font-jost text-xs text-cream/40 tracking-wider uppercase">
                      {row.label}
                    </span>
                    <span className="font-jost text-sm text-cream">{row.val}</span>
                  </div>
                ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/zamow"
              className="inline-flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase border border-gold/30 text-gold px-8 py-3 hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              <Flower2 size={14} /> Nowe zamówienie
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 font-jost text-xs tracking-widest uppercase bg-gold text-dark px-8 py-3 hover:bg-gold-light transition-colors duration-300"
            >
              Strona główna
            </Link>
          </div>

          {emailSent && order?.email && (
            <p className="font-jost text-xs text-cream/30 mt-8">
              Potwierdzenie wysłano na adres {order.email}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense>
      <PotwierdzeniePage />
    </Suspense>
  );
}
