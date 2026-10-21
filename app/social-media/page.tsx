import { Metadata } from "next";
import SocialMediaSection from "@/components/SocialMediaSection";

export const metadata: Metadata = {
  title: "Social Media – Royal Flowers",
  description: "Obserwuj Royal Flowers na Instagramie i Facebooku. Codzienne inspiracje florystyczne, nowości w kwiatomatach i dekoracje ślubne.",
};

export default function SocialMediaPage() {
  return (
    <main className="pt-28 min-h-screen bg-dark">
      <SocialMediaSection />

      {/* Footer */}
      <footer className="border-t border-gold/10 py-8 px-6">
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
