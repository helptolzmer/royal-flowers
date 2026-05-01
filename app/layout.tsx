import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royal Flowers – Kwiaciarnia & Kwiatomaty",
  description:
    "Eleganckie kompozycje kwiatowe i sieć kwiatomatów dostępnych całą dobę. Zamów online lub odbierz w automacie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-dark text-cream min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
