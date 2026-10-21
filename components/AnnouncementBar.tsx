"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Darmowy odbiór w kwiaciarni · Świeże kwiaty codziennie",
  "Gotowe do odbioru nawet 3 godziny po zamówieniu",
  "Każdy bukiet wiązany ręcznie przez naszą florystkę",
];

// Wąski pasek komunikatów pod główną nawigacją (część Navbara).
export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Co 4 s: fade-out (300ms) → zmiana komunikatu → fade-in.
  useEffect(() => {
    let swap: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => {
      clearInterval(interval);
      clearTimeout(swap);
    };
  }, []);

  return (
    <div className="bg-dark-700 border-t border-cream/10 py-1.5 px-4">
      <p
        className={`font-jost text-[10px] leading-4 tracking-wider text-cream/50 text-center truncate transition-opacity duration-300 motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
