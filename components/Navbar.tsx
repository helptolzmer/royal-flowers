"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ClipboardList,
  Flower2,
  Menu,
  ShoppingBag,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCart } from "@/lib/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";

type SubLink = { href: string; label: string; caption: string; icon: LucideIcon };
type NavLink = { href: string; label: string; children?: SubLink[] };

const links: NavLink[] = [
  { href: "/kwiaciarnia", label: "Kwiaciarnia" },
  { href: "/sklep", label: "Sklep" },
  { href: "/kwiatomaty", label: "Kwiatomaty" },
  {
    href: "/wesele",
    label: "Wesele",
    children: [
      {
        href: "/wesele",
        label: "Formularz weselny",
        caption: "Wypełnij brief ślubny",
        icon: ClipboardList,
      },
      {
        href: "/dekoracje-slubne",
        label: "Dekoracje ślubne",
        caption: "Zobacz nasze realizacje",
        icon: Flower2,
      },
    ],
  },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/o-nas", label: "O nas" },
  { href: "/social-media", label: "Social Media" },
];

function isActive(link: NavLink, pathname: string): boolean {
  return link.children
    ? link.children.some((c) => c.href === pathname)
    : link.href === pathname;
}

// Link z rozwijanym menu (desktop). Hover/focus otwiera, zamknięcie z 200ms
// opóźnieniem, żeby menu nie znikało przy przypadkowym zjechaniu kursorem.
function NavDropdown({ link, pathname }: { link: NavLink; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  function show() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function hide(delay = 200) {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), delay);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // Zamknij po przejściu na inną stronę.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <li
      className="relative"
      onMouseEnter={show}
      onMouseLeave={() => hide()}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide(0);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") hide(0);
      }}
    >
      <Link
        href={link.href}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 font-jost text-[11px] tracking-widest uppercase transition-colors duration-300 gold-underline whitespace-nowrap ${
          isActive(link, pathname) || open ? "text-gold" : "text-cream/70 hover:text-cream"
        }`}
      >
        {link.label}
        <ChevronDown
          size={11}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>

      {/* pt-4 = „mostek” między linkiem a menu, żeby hover nie gasł w szczelinie */}
      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="min-w-[220px] bg-dark-800 border-t-2 border-gold shadow-2xl py-4 px-6">
          {link.children!.map((c, i) => {
            const Icon = c.icon;
            return (
              <li
                key={c.href}
                className={i !== link.children!.length - 1 ? "border-b border-cream/10" : ""}
              >
                <Link
                  href={c.href}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-start gap-3 py-3 px-3 rounded-sm transition-all duration-200 hover:bg-cream/5"
                >
                  <Icon size={14} className="text-gold/60 mt-0.5 shrink-0" />
                  <span className="flex flex-col gap-0.5">
                    <span
                      className={`font-jost text-xs tracking-wider uppercase whitespace-nowrap transition-colors duration-200 group-hover:text-gold ${
                        pathname === c.href ? "text-gold" : "text-cream/80"
                      }`}
                    >
                      {c.label}
                    </span>
                    <span className="font-jost text-[10px] text-cream/30 whitespace-nowrap">
                      {c.caption}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { getItemCount, openDrawer } = useCart();
  const itemCount = getItemCount();

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
          {links.map((l) =>
            l.children ? (
              <NavDropdown key={l.href} link={l} pathname={pathname} />
            ) : (
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
            )
          )}
          <li>
            <Link
              href="/zamow"
              className="font-jost text-[11px] tracking-widest uppercase border border-gold text-gold px-5 py-2 hover:bg-gold hover:text-dark transition-all duration-300 whitespace-nowrap"
            >
              Zamów teraz
            </Link>
          </li>
          <li>
            <button
              onClick={openDrawer}
              className="relative flex items-center text-cream/80 hover:text-gold transition-colors"
              aria-label="Otwórz koszyk"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-gold text-white text-[10px] font-jost leading-none">
                  {itemCount}
                </span>
              )}
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-4 shrink-0 xl:hidden">
          {/* Koszyk — widoczny też poza rozwijanym menu mobilnym */}
          <button
            onClick={openDrawer}
            className="relative flex items-center text-cream hover:text-gold transition-colors"
            aria-label="Otwórz koszyk"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-gold text-white text-[10px] font-jost leading-none">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            className="text-cream hover:text-gold transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Pasek komunikatów — przyklejony razem z navbarem, na wszystkich stronach */}
      <AnnouncementBar />

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-dark-800 border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) =>
            l.children ? (
              <div key={l.href} className="flex flex-col gap-3">
                <span
                  className={`font-jost text-sm tracking-widest uppercase ${
                    isActive(l, pathname) ? "text-gold" : "text-cream/70"
                  }`}
                >
                  {l.label}
                </span>
                <div className="flex flex-col gap-3 pl-4 border-l border-gold/20">
                  {l.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`font-jost text-xs tracking-widest uppercase transition-colors ${
                        pathname === c.href ? "text-gold" : "text-cream/60 hover:text-gold"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
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
            )
          )}
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
