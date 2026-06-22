// Quote form submission handler.
// Receives JSON POST from the .quote-form on the site, validates,
// and sends a notification email via Resend to greg@bloomerang.solutions
// and the Martin's Moving inbox (Martinsmoving2002@aol.com).
// CommonJS to avoid any ESM/package.json type coupling. Uses native fetch
// (Node 18+, project runs Node 24.x). No npm deps to install.

const TO_EMAIL = "greg@bloomerang.solutions";
const CLIENT_EMAIL = "Martinsmoving2002@aol.com";
const FROM_EMAIL = "Martin's Moving Quotes <quotes@bloomerang.solutions>";

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function readField(body, key) {
  const v = body && body[key];
  return v == null ? "" : String(v).trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ ok: false, error: "Server not configured" });
  }

  // Vercel parses application/json automatically. Fall back to manual parse just in case.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  // Honeypot — silently accept so bots don't learn anything.
  if (body.botcheck) return res.status(200).json({ ok: true });

  const name = readField(body, "name");
  const phone = readField(body, "phone");
  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: "Name and phone are required" });
  }

  const email = readField(body, "email");
  const moveDate = readField(body, "move_date");
  const moveFrom = readField(body, "move_from");
  const moveTo = readField(body, "move_to");
  const details = readField(body, "details");
  const page = readField(body, "page");

  const subject = `New quote request — ${name}${page ? ` (${page})` : ""}`;

  const lines = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "(not provided)"],
    ["Move date", moveDate || "(not provided)"],
    ["Moving from", moveFrom || "(not provided)"],
    ["Moving to", moveTo || "(not provided)"],
    ["Details", details || "(none)"],
    ["Submitted from", page || "(unknown)"],
    ["Time", new Date().toISOString()],
  ];

  const text =
    "New quote request from the Martin's Moving website.\n\n" +
    lines.map(([k, v]) => `${k}: ${v}`).join("\n") +
    "\n";

  const html =
    "<p>New quote request from the Martin's Moving website.</p>" +
    "<table style=\"border-collapse:collapse\">" +
    lines
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><strong>${escapeHtml(k)}</strong></td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`
      )
      .join("") +
    "</table>";

  const payload = {
    from: FROM_EMAIL,
    to: [TO_EMAIL, CLIENT_EMAIL],
    subject,
    text,
    html,
  };
  if (email) payload.reply_to = email;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      console.error("Resend error", r.status, data);
      return res.status(502).json({ ok: false, error: "Email send failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend network error", err);
    return res.status(502).json({ ok: false, error: "Network error" });
  }
};
