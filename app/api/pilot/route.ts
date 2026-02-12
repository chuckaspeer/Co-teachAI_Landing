import { NextRequest, NextResponse } from "next/server";

const PILOT_SUCCESS_REDIRECT = "/pilot?submitted=1";
const PILOT_ERROR_REDIRECT = "/pilot?error=1";

function redirect(request: NextRequest, path: string) {
  const base = request.nextUrl.origin;
  return NextResponse.redirect(`${base}${path}`);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = formData.get("name")?.toString()?.trim();
  const email = formData.get("email")?.toString()?.trim();
  const school = formData.get("school")?.toString()?.trim();
  const role = formData.get("role")?.toString()?.trim() ?? "";
  const phone = formData.get("phone")?.toString()?.trim() ?? "";
  const notes = formData.get("notes")?.toString()?.trim() ?? "";

  if (!name || !email || !school) {
    return redirect(request, PILOT_ERROR_REDIRECT);
  }

  const webhookUrl = process.env.PILOT_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return redirect(request, PILOT_ERROR_REDIRECT);
  }

  const payload = {
    name,
    email,
    school,
    role: role || undefined,
    phone: phone || undefined,
    notes: notes || undefined,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return redirect(request, PILOT_ERROR_REDIRECT);
    }

    return redirect(request, PILOT_SUCCESS_REDIRECT);
  } catch {
    return redirect(request, PILOT_ERROR_REDIRECT);
  }
}
