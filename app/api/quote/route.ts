import { NextResponse } from "next/server";

const TO_EMAIL = "greg@bloomerang.solutions";
const CLIENT_EMAIL = "Martinsmoving2002@aol.com";
const FROM_EMAIL = "Martin's Moving Quotes <quotes@bloomerang.solutions>";

const escapeHtml = (s: string) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const field = (body: Record<string, unknown>, key: string) => {
  const v = body?.[key];
  return v == null ? "" : String(v).trim();
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  // Honeypot. Accept silently so bots learn nothing.
  if (body.botcheck) return NextResponse.json({ ok: true });

  const name = field(body, "name");
  const phone = field(body, "phone");
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required" }, { status: 400 });
  }

  const email = field(body, "email");
  const page = field(body, "page");
  const lines: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "(not provided)"],
    ["Move date", field(body, "move_date") || "(not provided)"],
    ["Moving from", field(body, "move_from") || "(not provided)"],
    ["Moving to", field(body, "move_to") || "(not provided)"],
    ["Details", field(body, "details") || "(none)"],
    ["Submitted from", page || "(unknown)"],
    ["Time", new Date().toISOString()],
  ];

  const payload: Record<string, unknown> = {
    from: FROM_EMAIL,
    to: [TO_EMAIL, CLIENT_EMAIL],
    subject: `New quote request — ${name}${page ? ` (${page})` : ""}`.replace("—", "-"),
    text:
      "New quote request from the Martin's Moving website.\n\n" +
      lines.map(([k, v]) => `${k}: ${v}`).join("\n") +
      "\n",
    html:
      "<p>New quote request from the Martin's Moving website.</p>" +
      '<table style="border-collapse:collapse">' +
      lines
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>${escapeHtml(k)}</strong></td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`
        )
        .join("") +
      "</table>",
  };
  if (email) payload.reply_to = email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.json().catch(() => ({})));
      return NextResponse.json({ ok: false, error: "Email send failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend network error", err);
    return NextResponse.json({ ok: false, error: "Network error" }, { status: 502 });
  }
}
