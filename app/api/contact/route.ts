import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/contact-email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "circulovirtuoso8@gmail.com";
const FROM_EMAIL = "Farol Digital <contato@faroldigital.app>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact API: RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const ip = getClientIp(
      req.headers.get("x-forwarded-for"),
      req.headers.get("x-real-ip")
    );
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "rate_limit", retryAfter: rateLimit.retryAfterSeconds },
        { status: 429 }
      );
    }

    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 });
    }

    const payload = { name, email, phone, message };

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: buildContactEmailText(payload),
      html: buildContactEmailHtml(payload),
    });

    if (error) {
      console.error("[Resend error]", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact route error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
