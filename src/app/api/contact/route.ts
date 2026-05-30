import { NextResponse } from "next/server";
import { Resend } from "resend";

import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, company, subject, message } = parsed.data;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resendKey || !to) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] submission (email not configured):", parsed.data);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: subject?.trim() ? `[RavinSec] ${subject}` : `[RavinSec] Contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch {
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
