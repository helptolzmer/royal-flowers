// lib/orderRules.ts
// Logika biznesowa rezerwacji — używana zarówno przez frontend (UI) jak i backend (API).

export type PickupType = "automat" | "kwiaciarnia";

// ─── Adresy ───────────────────────────────────────────────────────────────────

export const AUTOMAT_ADDRESS = "al. Wolności 10A, Nowy Sącz";
export const SHOP_ADDRESS    = "Al. Wolności 10/A, Nowy Sącz";

// ─── Godziny pracy ────────────────────────────────────────────────────────────

type DayHours = { open: number; close: number } | null;

// dow: 0=niedziela, 1=poniedziałek … 6=sobota
function getShopHours(dow: number): DayHours {
  if (dow === 0) return null;                    // niedziela: zamknięte
  if (dow === 6) return { open: 9, close: 14 }; // sobota: 9–14
  return { open: 9, close: 17 };                // pon–pt: 9–17
}

// ─── Obliczanie Wielkanocy (algorytm gregoriański) ────────────────────────────

function getEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=marzec, 4=kwiecień
  const day   = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// ─── Pomocnicze ───────────────────────────────────────────────────────────────

function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Parsuje "YYYY-MM-DD" jako lokalną datę (bez przesunięcia UTC).
function parseDateStr(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// ─── Święta państwowe ─────────────────────────────────────────────────────────

function getHolidays(year: number): Set<string> {
  const easter        = getEaster(year);
  const easterMonday  = addDays(easter, 1);
  const corpusChristi = addDays(easter, 60);

  const dates = [
    `${year}-01-01`,
    `${year}-01-06`,
    `${year}-05-01`,
    `${year}-05-03`,
    `${year}-08-15`,
    `${year}-11-01`,
    `${year}-11-11`,
    `${year}-12-25`,
    `${year}-12-26`,
    toYMD(easter),
    toYMD(easterMonday),
    toYMD(corpusChristi),
  ];

  return new Set(dates);
}

// ─── Dni kwiaciarskie ─────────────────────────────────────────────────────────
// Brak rezerwacji online — tylko obsługa osobista, z dedykowanym komunikatem.

const FLOWER_DAYS: Array<{ month: number; day: number }> = [
  { month: 2, day: 14 }, // Walentynki
  { month: 3, day: 8  }, // Dzień Kobiet
  { month: 5, day: 26 }, // Dzień Matki
  { month: 6, day: 23 }, // Dzień Ojca
];

const FLOWER_DAY_MSG =
  "W ten dzień obsługujemy tylko zamówienia osobiste w kwiaciarni przy al. Wolności 10A. Zapraszamy serdecznie!";

// ─── Publiczne funkcje diagnostyczne ─────────────────────────────────────────

export function isHoliday(date: Date): boolean {
  return getHolidays(date.getFullYear()).has(toYMD(date));
}

/** Zwraca komunikat dla dnia kwiaciarskiego lub null. */
export function getFlowerDayMsg(date: Date): string | null {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return FLOWER_DAYS.some((f) => f.month === m && f.day === d)
    ? FLOWER_DAY_MSG
    : null;
}

/** Dzień całkowicie zamknięty: niedziela, święto państwowe lub dzień kwiaciarski. */
export function isClosedDay(date: Date): boolean {
  if (date.getDay() === 0) return true;
  if (isHoliday(date)) return true;
  if (getFlowerDayMsg(date) !== null) return true;
  return false;
}

// ─── Następny dzień roboczy ───────────────────────────────────────────────────

function getNextWorkingDay(from: Date): Date {
  // Tworzy nową Date bez składowej czasu (samo datum).
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (isClosedDay(d)) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

// ─── Najwcześniejszy możliwy termin odbioru ───────────────────────────────────
//
// Reguła:
//  • Zamówienie złożone w godzinach pracy, a order_time+3h mieści się w dniu →
//    ten sam dzień, godzina = max(order_time+3h zaokr. w górę, open)
//  • W przeciwnym razie (po godzinach, zamknięty dzień, lub 3h nie mieści się):
//    następny dzień roboczy, godzina = open + 3h
//
// Przykłady:
//  pon 10:00 → pon 13:00
//  pon 16:00 → wt  12:00  (open 9 + 3 = 12)
//  sb  13:00 → pn  12:00  (sob zamkn. o 14, 13+3=16>13; niedz wolna)
//  pt  20:00 → sb  12:00  (po godzinach)

export function getEarliestPickupTime(now: Date): Date {
  const todayHours = getShopHours(now.getDay());
  // Zaokrąglenie w dół do pełnej godziny, + 3h zapasu.
  // 10:00, 10:30, 10:59 → rawHour=13; 11:00 → rawHour=14.
  const rawHour = now.getHours() + 3;

  const todayIsWorking = todayHours !== null && !isClosedDay(now);
  const fitsToday      = todayIsWorking && rawHour <= todayHours!.close - 1;

  if (fitsToday) {
    const earliest = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    earliest.setHours(Math.max(rawHour, todayHours!.open), 0, 0, 0);
    return earliest;
  }

  // Nie mieści się dzisiaj → następny dzień roboczy, open + 3h.
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const next     = getNextWorkingDay(tomorrow);
  const nextHours = getShopHours(next.getDay())!;
  next.setHours(nextHours.open + 3, 0, 0, 0); // np. 9 + 3 = 12:00
  return next;
}

// ─── Dostępne sloty godzinowe dla danej daty ─────────────────────────────────
//
// Zwraca tablicę stringów "HH:00" — pustą jeśli dzień zamknięty lub brak slotów.
// pickupType nie zmienia slotów (oba tryby — kwiaciarnia i automat — mają tę samą
// siatkę godzinową: ostatni slot = close - 1h, bo bukiet do automatu też wkładany
// przed zamknięciem).

export function getAvailableHours(
  dateStr: string,
  now: Date,
  pickupType: PickupType   // zarezerwowany na przyszłe rozróżnienie logiki
): string[] {
  const date = parseDateStr(dateStr);

  if (isClosedDay(date)) return [];

  const hours = getShopHours(date.getDay());
  if (!hours) return [];

  // Ostatni slot: godzinę przed zamknięciem.
  //   Pon–pt: 9…16 (zamknięcie 17:00, klient ma 1h na odbiór)
  //   Sob:    9…13 (zamknięcie 14:00)
  const lastSlot = hours.close - 1;

  const earliestPickup = getEarliestPickupTime(now);

  const slots: string[] = [];
  for (let h = hours.open; h <= lastSlot; h++) {
    const slotDt = new Date(
      date.getFullYear(), date.getMonth(), date.getDate(), h, 0, 0, 0
    );
    if (slotDt >= earliestPickup) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
    }
  }

  return slots;
}

// ─── Maksymalny czas odbioru ─────────────────────────────────────────────────
//
// Używana w podsumowaniu zamówienia i mailach EmailJS.
//
// kwiaciarnia → do zamknięcia kwiaciarni tego samego dnia
// automat     → do otwarcia kwiaciarni następnego dnia roboczego
//               (uwzględnia niedziele, święta i dni kwiaciarskie)

export type PickupDeadline = {
  dateStr: string; // "YYYY-MM-DD"
  time:    string; // "HH:00"
};

export function getPickupDeadline(
  dateStr:    string,
  hour:       number,    // godzina slotu (zarezerwowana, może przydać się w przyszłości)
  pickupType: PickupType
): PickupDeadline {
  const date  = parseDateStr(dateStr);
  const hours = getShopHours(date.getDay())!;

  if (pickupType === "kwiaciarnia") {
    // Klient musi odebrać przed zamknięciem tego dnia.
    return {
      dateStr: toYMD(date),
      time:    `${String(hours.close).padStart(2, "0")}:00`,
    };
  }

  // automat: bukiet wkładany przed zamknięciem, klient odbiera do otwarcia
  // następnego dnia roboczego (pomijamy niedziele, święta, dni kwiaciarskie).
  const nextDay     = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const nextWorking = getNextWorkingDay(nextDay);
  const nextHours   = getShopHours(nextWorking.getDay())!;

  return {
    dateStr: toYMD(nextWorking),
    time:    `${String(nextHours.open).padStart(2, "0")}:00`,
  };
}

// ─── Walidacja (frontend + backend) ──────────────────────────────────────────
//
// Używana identycznie w UI (preview) i w /api/przelewy24/create (ochrona przed
// manipulacją po stronie klienta).

export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

export function validatePickup(
  dateStr:    string,
  godzina:    string,
  pickupType: PickupType,
  now:        Date
): ValidationResult {
  if (!dateStr || !godzina) {
    return { ok: false, error: "Podaj datę i godzinę odbioru." };
  }

  const date = parseDateStr(dateStr);

  // Niedziela
  if (date.getDay() === 0) {
    return { ok: false, error: "Niedziela — kwiaciarnia jest zamknięta." };
  }

  // Święto państwowe
  if (isHoliday(date)) {
    return {
      ok: false,
      error: "Wybrany dzień to święto państwowe — kwiaciarnia jest zamknięta.",
    };
  }

  // Dzień kwiaciarski
  const flowerMsg = getFlowerDayMsg(date);
  if (flowerMsg) {
    return { ok: false, error: flowerMsg };
  }

  const hours = getShopHours(date.getDay())!;
  const hour  = parseInt(godzina.split(":")[0], 10);

  // Godzina poza zakresem pracy
  if (hour < hours.open || hour > hours.close - 1) {
    return {
      ok: false,
      error: `Godzina odbioru musi być między ${hours.open}:00 a ${hours.close - 1}:00.`,
    };
  }

  // Minimum 3h od złożenia zamówienia
  const earliestPickup = getEarliestPickupTime(now);
  const pickupDt = new Date(
    date.getFullYear(), date.getMonth(), date.getDate(), hour, 0, 0, 0
  );

  if (pickupDt < earliestPickup) {
    const eh = String(earliestPickup.getHours()).padStart(2, "0");
    return {
      ok: false,
      error: `Wymagane minimum 3 godziny na przygotowanie. Najwcześniejszy możliwy odbiór: ${toYMD(earliestPickup)} ${eh}:00.`,
    };
  }

  return { ok: true };
}
