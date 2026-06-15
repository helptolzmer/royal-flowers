import { NextResponse } from "next/server";
import crypto from "crypto";

function sha384hex(json: string): string {
  return crypto.createHash("sha384").update(json, "utf8").digest("hex");
}

export async function POST(req: Request) {
  // Czytamy env wewnątrz handlera – gwarantuje runtime values (nie czas modułu)
  const MERCHANT_ID = parseInt((process.env.P24_MERCHANT_ID ?? "").trim(), 10);
  const CRC         = (process.env.P24_CRC    ?? "").trim();
  // P24_API_KEY = "Klucz API" (32 znaki) z panelu P24 → Konfiguracja API (NIE klucz CRC!)
  const API_KEY     = (process.env.P24_API_KEY ?? "").trim();
  const SITE_URL    = (process.env.SITE_URL    ?? "https://royalflowers.pl").trim();
  // P24_SANDBOX=true → sandbox.przelewy24.pl, brak/false → secure.przelewy24.pl
  const SANDBOX     = (process.env.P24_SANDBOX ?? "").trim().toLowerCase() === "true";
  const P24_BASE    = SANDBOX
    ? "https://sandbox.przelewy24.pl"
    : "https://secure.przelewy24.pl";

  console.log("[P24] ENV CHECK", {
    P24_MERCHANT_ID_raw: process.env.P24_MERCHANT_ID,
    MERCHANT_ID_parsed:  MERCHANT_ID,
    CRC_length:          CRC.length,
    CRC_first5:          CRC.slice(0, 5),
    P24_API_KEY_length: API_KEY.length,
    P24_API_KEY_first5: API_KEY.slice(0, 5),
    SITE_URL,
    SANDBOX,
    P24_BASE,
  });

  try {
    const { orderCode, amountPLN, email, description } = await req.json();

    const amount = Math.round(parseFloat(amountPLN) * 100);
    if (!amount || isNaN(amount) || amount < 10000) {
      return NextResponse.json(
        { error: "Minimalna kwota zamówienia to 100 zł." },
        { status: 400 }
      );
    }

    // Kolejność kluczy dokładnie wg dokumentacji P24
    const signJsonString = JSON.stringify({
      sessionId:  orderCode,
      merchantId: MERCHANT_ID,
      amount,
      currency:   "PLN",
      crc:        CRC,
    });
    const sign = sha384hex(signJsonString);

    const payload = {
      merchantId:  MERCHANT_ID,
      posId:       MERCHANT_ID,
      sessionId:   orderCode,
      amount,
      currency:    "PLN",
      description: description || "Zamówienie Royal Flowers",
      email:       email || "zamowienie@royalflowers.pl",
      country:     "PL",
      language:    "pl",
      urlReturn:   `${SITE_URL}/potwierdzenie?orderCode=${encodeURIComponent(orderCode)}`,
      urlNotify:   `${SITE_URL}/api/przelewy24/notify`,
      sign,
    };

    // Basic Auth: "Basic " + base64("merchantId:apiKey")
    const rawCredentials  = `${MERCHANT_ID}:${API_KEY}`;
    const credentials     = Buffer.from(rawCredentials, "utf8").toString("base64");
    const authHeaderValue = `Basic ${credentials}`;

    console.log("[P24] >>> REQUEST", {
      url:             `${P24_BASE}/api/v1/transaction/register`,
      merchantId:      MERCHANT_ID,
      posId:           MERCHANT_ID,
      sessionId:       orderCode,
      amount,
      signJsonString,
      sign,
      authRaw:         `${MERCHANT_ID}:${API_KEY.slice(0, 5)}…${API_KEY.slice(-4)}  (len=${rawCredentials.length})`,
      authHeaderStart: authHeaderValue.slice(0, 20) + "…",
    });

    const p24Res = await fetch(`${P24_BASE}/api/v1/transaction/register`, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": authHeaderValue,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await p24Res.text();

    let p24Data: unknown;
    try {
      p24Data = JSON.parse(responseText);
    } catch {
      p24Data = responseText;
    }

    console.log("[P24] <<< RESPONSE", {
      status:  p24Res.status,
      headers: Object.fromEntries(p24Res.headers.entries()),
      body:    p24Data,
    });

    if (!p24Res.ok || !(p24Data as Record<string, unknown>)?.data) {
      const hints: string[] = [];
      if (p24Res.status === 401) {
        hints.push(
          "401 Unauthorized – sprawdź:",
          "1. P24_API_KEY musi być 'Klucz API' (32 znaki) z panelu P24 → Konfiguracja API (NIE klucz CRC)",
          "2. W panelu P24 → Moje dane → API → dodaj '%' do listy dozwolonych IP",
          "3. Upewnij się, że REST API jest aktywowane w panelu P24",
          SANDBOX
            ? "4. Używasz SANDBOX – upewnij się, że credentials są z konta sandbox (sandbox.przelewy24.pl)"
            : "4. Używasz PRODUKCJI – jeśli testujesz, ustaw P24_SANDBOX=true",
        );
      }
      console.error("[P24] błąd rejestracji", { hints });
      return NextResponse.json(
        {
          error:      "Błąd rejestracji płatności.",
          p24Status:  p24Res.status,
          p24Body:    p24Data,
          hints,
        },
        { status: 502 }
      );
    }

    const token = (p24Data as { data: { token?: string } }).data?.token;
    if (!token) {
      console.error("[P24] brak tokenu w odpowiedzi:", p24Data);
      return NextResponse.json(
        {
          error:   "P24 nie zwróciło tokenu płatności.",
          p24Body: p24Data,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      redirectUrl: `${P24_BASE}/trnRequest/${token}`,
    });
  } catch (err) {
    console.error("[P24] create – nieoczekiwany błąd:", err);
    return NextResponse.json(
      { error: "Błąd serwera", details: String(err) },
      { status: 500 }
    );
  }
}
