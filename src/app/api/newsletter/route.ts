import { createHash } from "node:crypto";

// A bounded, per-instance guard; infrastructure-level throttling may complement it.
const attempts = new Map<string, { count: number; until: number }>();
function allow(email: string) {
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
  const key = createHash("sha256").update(email).digest("hex");
  const entry = attempts.get(key);
  if (entry && entry.count >= 3) return false;
  if (entry) entry.count++;
  else {
    if (attempts.size >= 1000) return false;
    attempts.set(key, { count: 1, until: now + 60000 });
  }
  return true;
}

export async function POST(request: Request) {
  const reply = (status: number, ok = false) => Response.json({ ok }, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415);
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 2048) return reply(413);
    body = JSON.parse(raw);
  } catch { return reply(400); }
  if (!body || typeof body !== "object") return reply(400);
  const fields = body as Record<string, unknown>;
  const email = typeof fields.email === "string" ? fields.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || fields.company) return reply(400);
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return reply(503);
  if (!allow(email)) return reply(429);
  try {
    const segment = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
    const response = await fetch("https://api.resend.com/contacts", {
      method: "POST", cache: "no-store",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false, ...(segment ? { segments: [{ id: segment }] } : {}) }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return reply(502);
    const contact = await response.json();
    if (typeof contact.id !== "string" || !contact.id) return reply(502);
    return reply(200, true);
  } catch { return reply(502); }
}
