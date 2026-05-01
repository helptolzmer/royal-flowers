"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/kwiaciarnia", label: "Kwiaciarnia" },
  { href: "/kwiatomaty", label: "Kwiatomaty" },
  { href: "/wesele", label: "Wesele" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/dekoracje-slubne", label: "Dekoracje ślubne" },
  { href: "/o-nas", label: "O nas" },
  { href: "/social-media", label: "Social Media" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur-sm border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">

        {/* Logo: obrazek + tekst */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <img
            src="/images/logo-nav.png"
            alt=""
            aria-hidden
            className="h-[50px] w-auto object-contain"
          />
          <span className="font-cormorant text-xl font-light tracking-[0.2em] text-cream group-hover:text-gold transition-colors duration-300">
            ROYAL <span className="text-gold">FLOWERS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden xl:flex items-center gap-5 2xl:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`font-jost text-[11px] tracking-widest uppercase transition-colors duration-300 gold-underline whitespace-nowrap ${
                  pathname === l.href
                    ? "text-gold"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/zamow"
              className="font-jost text-[11px] tracking-widest uppercase border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-dark transition-all duration-300 whitespace-nowrap"
            >
              Zamów teraz
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="xl:hidden text-cream hover:text-gold transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-dark-800 border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-jost text-sm tracking-widest uppercase transition-colors ${
                pathname === l.href ? "text-gold" : "text-cream/70 hover:text-gold"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/zamow"
            className="font-jost text-sm tracking-widest uppercase border border-gold text-gold px-5 py-2 text-center hover:bg-gold hover:text-dark transition-all duration-300"
            onClick={() => setOpen(false)}
          >
            Zamów teraz
          </Link>
        </div>
      )}
    </nav>
  );
}
