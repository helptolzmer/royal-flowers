import fs from "fs";
import path from "path";
import type { Aktualnosc } from "@/lib/aktualnosci";
import KwiaciarniaContent from "@/components/KwiaciarniaContent";

function getAktualnosci(): Aktualnosc[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "data", "aktualnosci.json"),
      "utf-8"
    );
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export default function KwiaciarniaPage() {
  return <KwiaciarniaContent aktualnosci={getAktualnosci()} />;
}
