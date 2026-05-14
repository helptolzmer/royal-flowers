import { NextResponse } from "next/server";
import crypto from "crypto";

const MERCHANT_ID = parseInt(process.env.P24_MERCHANT_ID!, 16);
const CRC         = process.env.P24_CRC!;
const API_KEY     = process.env.P24_API_KEY!;
const P24_BASE    = "https://secure.przelewy24.pl";
const SITE_URL    = process.env.SITE_URL || "https://royalflowers.pl";

function sha384hex(json: string): string {
  return crypto.createHash("sha384").update(json, "utf8").digest("hex");
}

export async function POST(req: Request) {
  try {
    const { orderCode, amountPLN, email, description } = await req.json();

    const amount = Math.round(parseFloat(amountPLN) * 100);
    if (!amount || isNaN(amount) || amount < 100) {
      return NextResponse.json(
        { error: "Minimalna kwota zamówienia to 1 zł." },
        { status: 400 }
      );
    }

    const sign = sha384hex(
      JSON.stringify({ sessionId: orderCode, merchantId: MERCHANT_ID, amount, currency: "PLN", crc: CRC })
    );

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

    const credentials = Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString("base64");

    const p24Res = await fetch(`${P24_BASE}/api/v1/transaction/register`, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${credentials}`,
      },
      body: JSON.stringify(payload),
    });

    const p24Data = await p24Res.json();

    if (!p24Res.ok || !p24Data.data?.token) {
      console.error("[P24] register error:", p24Data);
      return NextResponse.json(
        { error: "Błąd rejestracji płatności. Spróbuj ponownie.", details: p24Data },
        { status: 502 }
      );
    }

    return NextResponse.json({
      redirectUrl: `${P24_BASE}/trnRequest/${p24Data.data.token}`,
    });
  } catch (err) {
    console.error("[P24] create error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
