import { NextResponse } from "next/server";
import crypto from "crypto";

function sha384hex(json: string): string {
  return crypto.createHash("sha384").update(json, "utf8").digest("hex");
}

export async function POST(req: Request) {
  const MERCHANT_ID = parseInt((process.env.P24_MERCHANT_ID ?? "").trim(), 10);
  const CRC         = (process.env.P24_CRC     ?? "").trim();
  const API_KEY     = (process.env.P24_API_KEY ?? "").trim();
  const SANDBOX     = (process.env.P24_SANDBOX  ?? "").trim().toLowerCase() === "true";
  const P24_BASE    = SANDBOX
    ? "https://sandbox.przelewy24.pl"
    : "https://secure.przelewy24.pl";

  console.log("[P24] ENV CHECK (notify)", {
    MERCHANT_ID,
    P24_API_KEY_length: API_KEY.length,
    P24_API_KEY_first5: API_KEY.slice(0, 5),
    SANDBOX,
    P24_BASE,
  });

  try {
    const body = await req.json();
    const {
      merchantId, posId, sessionId, amount, originAmount,
      currency, orderId, methodId, statement, sign,
    } = body;

    // 1. Zweryfikuj podpis przychodzącego IPN
    const expectedSign = sha384hex(
      JSON.stringify({
        merchantId, posId, sessionId, amount, originAmount,
        currency, orderId, methodId, statement, crc: CRC,
      })
    );

    if (sign !== expectedSign) {
      console.warn("[P24] IPN – nieprawidłowy podpis", { received: sign, expected: expectedSign });
      return NextResponse.json({ error: "Invalid sign" }, { status: 400 });
    }

    // 2. Potwierdź transakcję do P24
    const verifySign = sha384hex(
      JSON.stringify({ sessionId, orderId, amount, currency, crc: CRC })
    );

    const credentials = Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString("base64");

    const verifyRes = await fetch(`${P24_BASE}/api/v1/transaction/verify`, {
      method:  "PUT",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Basic ${credentials}`,
      },
      body: JSON.stringify({
        merchantId: MERCHANT_ID,
        posId:      MERCHANT_ID,
        sessionId,
        amount,
        currency,
        orderId,
        sign: verifySign,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok || verifyData.data?.status !== "success") {
      console.error("[P24] verify failed:", verifyData);
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });
    }

    console.log(
      `[P24] Płatność potwierdzona – sessionId=${sessionId}, orderId=${orderId}, kwota=${amount / 100} PLN`
    );

    return NextResponse.json({ status: "OK" });
  } catch (err) {
    console.error("[P24] notify error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
