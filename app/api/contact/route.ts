import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const body = await req.json();
    const { name, phone, message } = schema.parse(body);

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Farol Tech Contact <noreply@faroltech.io>",
      to: [process.env.CONTACT_EMAIL ?? "hello@faroltech.io"],
      replyTo: undefined,
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f0e8; padding: 40px; border-radius: 4px;">
          <div style="border-left: 3px solid #F5A623; padding-left: 20px; margin-bottom: 32px;">
            <h1 style="font-size: 24px; font-weight: 300; margin: 0 0 4px; color: #F5A623;">Farol Tech</h1>
            <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #5c5650; margin: 0;">New Contact Enquiry</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #a8a090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #f5f0e8;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #a8a090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #f5f0e8;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px 12px 0; color: #a8a090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #f5f0e8; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
          
          <p style="font-size: 11px; color: #5c5650; margin-top: 40px; border-top: 1px solid #1a1a1a; padding-top: 20px;">
            Sent from faroltech.io contact form · ${new Date().toUTCString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
