import { NextRequest, NextResponse } from "next/server";

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_OPTIONAL = 300;
const MAX_MESSAGE = 2000;
const RATE_LIMIT_MS = 60_000; // 1 request per minute per IP (in-memory; resets on deploy/cold start)

const rateLimitMap = new Map<string, number>();

interface Lead {
  type: "access" | "demo";
  name: string;
  email: string;
  school?: string;
  district?: string;
  role?: string;
  message?: string;
  status: string;
  createdAt: Date;
  userAgent?: string;
  ip?: string;
}

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

async function sendSendGridEmail(doc: Lead): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const toEmail = process.env.TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.warn("[leads] SendGrid skipped: missing SENDGRID_API_KEY, FROM_EMAIL, or TO_EMAIL");
    return;
  }

  const subject = `Lead: ${doc.type === "demo" ? "Demo request" : "Access request"} – ${doc.name}`;
  const lines = [
    `Type: ${doc.type}`,
    `Name: ${doc.name}`,
    `Email: ${doc.email}`,
    `School: ${doc.school ?? "(not provided)"}`,
    `District: ${doc.district ?? "(not provided)"}`,
    `Role: ${doc.role ?? "(not provided)"}`,
    `Message: ${doc.message ?? "(not provided)"}`,
    `IP: ${doc.ip ?? "(unknown)"}`,
    `User-Agent: ${doc.userAgent ?? "(unknown)"}`,
    `Created: ${doc.createdAt.toISOString()}`,
  ];
  const textBody = lines.join("\n");

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: toEmail }] }],
      from: { email: fromEmail, name: "Co-Teach AI Landing" },
      subject,
      content: [{ type: "text/plain", value: textBody }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.warn("[leads] SendGrid failed:", res.status, errText);
  }
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

  // Honeypot: if filled, pretend success and do not store or email
  const honeypot = String(obj.honeypot ?? "").trim();
  if (honeypot !== "") {
    return NextResponse.json({ ok: true });
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

  const doc: Lead = {
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

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[leads] GOOGLE_SHEETS_WEBHOOK_URL is not set");
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  const sheetsRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doc),
  });

  if (!sheetsRes.ok) {
    const errText = await sheetsRes.text();
    console.error("[leads] Google Sheets webhook failed:", sheetsRes.status, errText);
    return NextResponse.json(
      { error: "Failed to save request. Please try again." },
      { status: 500 }
    );
  }

  // Best effort: send email via SendGrid (do not fail the request if it errors)
  sendSendGridEmail(doc).catch((e) => {
    console.warn("[leads] SendGrid error:", e);
  });

  return NextResponse.json({ ok: true });
}
