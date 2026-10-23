import { Metadata } from "next";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Social Media – Royal Flowers",
  description: "Obserwuj Royal Flowers na Instagramie i Facebooku. Codzienne inspiracje florystyczne, nowości w kwiatomatach i dekoracje ślubne.",
};

export default function SocialMediaPage() {
  return (
    <main className="pt-28 min-h-screen bg-dark">
      <SocialMediaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
