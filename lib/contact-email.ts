export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmailHtml(payload: ContactPayload): string {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const phone = payload.phone.trim()
    ? escapeHtml(payload.phone)
    : "—";
  const message = escapeHtml(payload.message).replace(/\n/g, "<br>");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a172b; color: #f5f0e8; padding: 40px; border-radius: 4px;">
      <div style="border-left: 3px solid #F5A623; padding-left: 20px; margin-bottom: 32px;">
        <h1 style="font-size: 24px; font-weight: 300; margin: 0 0 4px; color: #F5A623;">Farol Digital</h1>
        <p style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #5c5650; margin: 0;">New Contact Enquiry</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #a8a090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #f5f0e8;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #a8a090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #f5f0e8;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #a8a090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #f5f0e8;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px 12px 0; color: #a8a090; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
          <td style="padding: 12px 0; color: #f5f0e8; line-height: 1.6;">${message}</td>
        </tr>
      </table>

      <p style="font-size: 11px; color: #5c5650; margin-top: 40px; border-top: 1px solid #1a1a1a; padding-top: 20px;">
        Sent from faroltech.io contact form · ${new Date().toUTCString()}
      </p>
    </div>
  `.trim();
}

export function buildContactEmailText(payload: ContactPayload): string {
  const phone = payload.phone.trim() || "—";

  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${phone}`,
    "",
    payload.message,
  ].join("\n");
}
