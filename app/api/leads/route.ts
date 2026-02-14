import { NextRequest, NextResponse } from "next/server";
import { getLeadsCollection, type LeadDocument } from "@/lib/mongodb";

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_OPTIONAL = 300;
const MAX_MESSAGE = 2000;
const RATE_LIMIT_MS = 60_000; // 1 request per minute per IP (in-memory; resets on deploy/cold start)

const rateLimitMap = new Map<string, number>();

function getClientIp(req: NextRequest): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? null;
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return null;
}

function rateLimit(ip: string | null): boolean {
  if (!ip) return false;
  const now = Date.now();
  const last = rateLimitMap.get(ip);
  if (last != null && now - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, now);
  return false;
}

function sanitize(str: unknown, maxLen: number): string {
  if (str == null || typeof str !== "string") return "";
  return str.slice(0, maxLen).trim();
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= MAX_EMAIL;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const ip = getClientIp(req);
  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body == null || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const obj = body as Record<string, unknown>;

  // Honeypot must be empty
  const honeypot = String(obj.honeypot ?? "").trim();
  if (honeypot !== "") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const typeRaw = obj.type;
  const type = typeRaw === "demo" ? "demo" : "access";

  const name = sanitize(obj.name, MAX_NAME);
  const email = sanitize(obj.email, MAX_EMAIL);

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const school = sanitize(obj.school, MAX_OPTIONAL) || undefined;
  const district = sanitize(obj.district, MAX_OPTIONAL) || undefined;
  const role = sanitize(obj.role, MAX_OPTIONAL) || undefined;
  const message = sanitize(obj.message, MAX_MESSAGE) || undefined;

  const userAgent = req.headers.get("user-agent") ?? undefined;

  const doc: LeadDocument = {
    type,
    name,
    email,
    school,
    district,
    role,
    message,
    status: "new",
    createdAt: new Date(),
    userAgent,
    ip: ip ?? undefined,
  };

  try {
    const leads = await getLeadsCollection();
    await leads.insertOne(doc);
  } catch (err) {
    console.error("[leads] MongoDB insert failed:", err);
    return NextResponse.json(
      { error: "Failed to save request. Please try again." },
      { status: 500 }
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    }).catch((e) => {
      console.warn("[leads] Google Sheets webhook failed:", e);
    });
  }

  return NextResponse.json({ ok: true });
}
