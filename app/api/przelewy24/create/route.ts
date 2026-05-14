import { NextResponse } from "next/server";
import crypto from "crypto";

const MERCHANT_ID = parseInt((process.env.P24_MERCHANT_ID ?? "").trim(), 10);
const CRC         = (process.env.P24_CRC         ?? "").trim();
const API_KEY     = (process.env.P24_API_KEY      ?? "").trim();
const P24_BASE    = "https://secure.przelewy24.pl";
const SITE_URL    = (process.env.SITE_URL         ?? "https://royalflowers.pl").trim();

function sha384hex(json: string): string {
  return crypto.createHash("sha384").update(json, "utf8").digest("hex");
}

export async function POST(req: Request) {
  try {
    const { orderCode, amountPLN, email, description } = await req.json();

    const amount = Math.round(parseFloat(amountPLN) * 100);
    if (!amount || isNaN(amount) || amount < 10000) {
      return NextResponse.json(
        { error: "Minimalna kwota zamówienia to 100 zł." },
        { status: 400 }
      );
    }

    // Kolejność kluczy musi być dokładnie taka jak w dokumentacji P24
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

    // Basic Auth: base64(merchantId:apiKey)
    const rawCredentials = `${MERCHANT_ID}:${API_KEY}`;
    const credentials    = Buffer.from(rawCredentials).toString("base64");

    console.log("[P24] >>> REQUEST", {
      url:              `${P24_BASE}/api/v1/transaction/register`,
      merchantId:       MERCHANT_ID,
      posId:            MERCHANT_ID,
      sessionId:        orderCode,
      amount,
      currency:         "PLN",
      urlReturn:        payload.urlReturn,
      urlNotify:        payload.urlNotify,
      // dokładny string wchodzący do SHA384
      signJsonString,
      sign,
      // weryfikacja auth – widoczny merchantId, zamaskowany klucz
      authRaw:          `${MERCHANT_ID}:${API_KEY.slice(0, 4)}…${API_KEY.slice(-4)}`,
      authBase64Prefix: credentials.slice(0, 12) + "…",
    });

    const p24Res = await fetch(`${P24_BASE}/api/v1/transaction/register`, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${credentials}`,
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
      return NextResponse.json(
        {
          error:      "Błąd rejestracji płatności.",
          p24Status:  p24Res.status,
          p24Body:    p24Data,
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
