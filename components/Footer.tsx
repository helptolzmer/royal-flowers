"use client";

import Link from "next/link";
import { useReveal } from "@/lib/animations";
import { SocialIkona, socialKafelki } from "@/components/SocialIkony";

const kontakt = [
  // Link do wizytówki kwiaciarni w Google Maps (ten sam co przy kwiatomacie #3)
  { ikona: "📍", tekst: "ul. Długosza 23, Nowy Sącz", href: "https://maps.app.goo.gl/qoMMwg95DWk7NCGd7", zewn: true },
  { ikona: "📞", tekst: "694 285 505", href: "tel:+48694285505" },
  { ikona: "✉️", tekst: "kwiaciarniaroyalflowers@gmail.com", href: "mailto:kwiaciarniaroyalflowers@gmail.com" },
  { ikona: "🕐", tekst: "Pon–Pt: 9:00–17:00 · Sob: 9:00–14:00" },
];

const szybkieLinki = [
  { label: "Kwiaciarnia", href: "/kwiaciarnia" },
  { label: "Sklep", href: "/sklep" },
  { label: "Kwiatomaty", href: "/kwiatomaty" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "O nas", href: "/o-nas" },
  { label: "Social Media", href: "/social-media" },
];

// Wspólna stopka z danymi kontaktowymi — używana na wszystkich stronach
export default function Footer({ className = "" }: { className?: string }) {
  const [stopkaRef, stopkaVisible] = useReveal<HTMLDivElement>(0.15);

  return (
    <footer className={`bg-dark-800 border-t border-gold/10 pt-16 pb-8 px-6 md:px-16 ${className}`}>
      <div
        ref={stopkaRef}
        className={`max-w-6xl mx-auto transition-all duration-700 ease-out ${stopkaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12">
          {/* Kolumna 1 — marka */}
          <div>
            <p className="font-cormorant text-xl tracking-[0.25em] text-gold mb-4">ROYAL FLOWERS</p>
            <p className="font-jost text-[13px] text-[#888] leading-relaxed max-w-[280px] mb-6">
              Kwiaciarnia artystyczna w Nowym Sączu. Bukiety, dekoracje, kwiatomaty 24/7.
            </p>
            <div className="flex items-center gap-3">
              {socialKafelki
                .filter((k) => k.ikona !== "web")
                .map((k) => (
                  <a
                    key={k.href}
                    href={k.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${k.nazwa} (otwiera się w nowej karcie)`}
                    className="text-gold transition-transform duration-200 ease-out hover:scale-[1.15] hover:rotate-[5deg] focus-visible:scale-[1.15] focus-visible:outline-none"
                  >
                    <SocialIkona typ={k.ikona} className="w-5 h-5" />
                  </a>
                ))}
            </div>
          </div>

          {/* Kolumna 2 — kontakt */}
          <div>
            <h3 className="font-jost text-xs tracking-[0.3em] uppercase text-cream mb-5">Kontakt</h3>
            <ul className="space-y-3.5">
              {kontakt.map((c) => (
                <li key={c.tekst} className="flex items-start gap-3 font-jost text-sm text-[#999]">
                  <span aria-hidden="true" className="w-5 shrink-0 text-center">{c.ikona}</span>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.zewn ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="break-all transition-all duration-200 hover:text-[#D4A843] hover:translate-x-[3px]"
                    >
                      {c.tekst}
                    </a>
                  ) : (
                    <span>{c.tekst}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 3 — szybkie linki */}
          <div>
            <h3 className="font-jost text-xs tracking-[0.3em] uppercase text-cream mb-5">Szybkie linki</h3>
            <ul className="space-y-3">
              {szybkieLinki.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block font-jost text-xs uppercase tracking-[1px] text-[#888] transition-all duration-200 hover:text-[#D4A843] hover:translate-x-[3px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dół stopki */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-jost text-xs text-[#666]">
            © {new Date().getFullYear()} Royal Flowers. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/regulamin" className="font-jost text-xs text-[#666] transition-colors duration-200 hover:text-[#D4A843]">
              Regulamin sprzedaży
            </Link>
            <Link href="/polityka-prywatnosci" className="font-jost text-xs text-[#666] transition-colors duration-200 hover:text-[#D4A843]">
              Polityka prywatności
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
