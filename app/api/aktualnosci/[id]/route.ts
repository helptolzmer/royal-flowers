import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_PATH = path.join(process.cwd(), "data", "aktualnosci.json");

function read(): { id: string }[] {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function write(data: unknown) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const data = read();
  const idx = data.findIndex((item) => item.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  data[idx] = { ...data[idx], ...body };
  write(data);
  return NextResponse.json(data[idx]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const data = read();
  write(data.filter((item) => item.id !== params.id));
  return NextResponse.json({ ok: true });
}
