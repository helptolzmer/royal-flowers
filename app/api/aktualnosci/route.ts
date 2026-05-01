import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_PATH = path.join(process.cwd(), "data", "aktualnosci.json");

function read() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function write(data: unknown) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(read());
}

export async function POST(req: Request) {
  const body = await req.json();
  const data = read();
  const item = { ...body, id: Date.now().toString() };
  data.push(item);
  write(data);
  return NextResponse.json(item, { status: 201 });
}
