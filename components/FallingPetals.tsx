// Subtelne spadające płatki w tle (czysty CSS — klasy .petal-track/.petal w globals.css).
// Stałe wartości zamiast Math.random, żeby SSR i klient się zgadzały.
const PLATKI = [
  { left: 6, size: 9, dur: 19, delay: 0, sway: 3.5, color: "#e8a6b8", opacity: 0.22 },
  { left: 15, size: 6, dur: 23, delay: 7, sway: 4.2, color: "#c9a84c", opacity: 0.18 },
  { left: 24, size: 13, dur: 17, delay: 3, sway: 3.1, color: "#d98aa3", opacity: 0.2 },
  { left: 35, size: 7, dur: 25, delay: 11, sway: 4.8, color: "#f0c4cf", opacity: 0.25 },
  { left: 46, size: 11, dur: 21, delay: 5, sway: 3.8, color: "#e8c96a", opacity: 0.15 },
  { left: 57, size: 5, dur: 16, delay: 9, sway: 2.9, color: "#e8a6b8", opacity: 0.28 },
  { left: 66, size: 14, dur: 24, delay: 1, sway: 4.5, color: "#d98aa3", opacity: 0.17 },
  { left: 75, size: 8, dur: 18, delay: 13, sway: 3.3, color: "#c9a84c", opacity: 0.2 },
  { left: 85, size: 10, dur: 22, delay: 6, sway: 4.0, color: "#f0c4cf", opacity: 0.22 },
  { left: 94, size: 6, dur: 20, delay: 15, sway: 3.6, color: "#e8a6b8", opacity: 0.3 },
];

export default function FallingPetals({
  fixed = false,
  intensity = 1,
  count = PLATKI.length,
}: {
  // fixed — płatki spadają przez okno przeglądarki zamiast przez sekcję (dla długich stron)
  fixed?: boolean;
  // mnożnik przezroczystości
  intensity?: number;
  // ile płatków (wybierane równomiernie z całej szerokości)
  count?: number;
}) {
  const n = Math.min(count, PLATKI.length);
  const platki = Array.from({ length: n }, (_, i) => PLATKI[Math.floor((i * PLATKI.length) / n)]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none inset-0 overflow-hidden ${fixed ? "fixed z-[5]" : "absolute z-0"}`}
    >
      {platki.map((p, i) => (
        <div
          key={i}
          className="petal-track"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `-${p.delay}s`,
          }}
        >
          <div
            className="petal"
            style={{
              width: p.size,
              height: p.size * 0.7,
              background: p.color,
              opacity: p.opacity * intensity,
              animationDuration: `${p.sway}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
