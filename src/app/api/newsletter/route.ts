import { createHash } from "node:crypto";
import { readJsonBody } from "@/lib/read-json-body";

const attempts = new Map<string, { count: number; until: number }>();
let aggregate = { count: 0, until: 0 };

function allow(email: string) {
  const now = Date.now();
  if (aggregate.until <= now) aggregate = { count: 0, until: now + 60000 };
  if (aggregate.count >= 30) return false;
  for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
  const key = createHash("sha256").update(email).digest("hex");
  const entry = attempts.get(key);
  if (entry && entry.count >= 3) return false;
  if (entry) entry.count++;
  else {
    if (attempts.size >= 1000) return false;
    attempts.set(key, { count: 1, until: now + 60000 });
  }
  aggregate.count++;
  return true;
}

export async function POST(request: Request) {
  const reply = (status: number, ok = false) =>
    Response.json({ ok }, { status, headers: { "Cache-Control": "no-store" } });

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415);

  const parsed = await readJsonBody(request, 2048);
  if (!parsed.ok) return reply(parsed.status);

  const body = parsed.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400);

  const fields = body as Record<string, unknown>;
  // Honeypot check
  if (fields.company) return reply(400);

  if (typeof fields.email !== "string") return reply(400);
  const email = fields.email.trim().toLowerCase();
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return reply(503);
  if (!allow(email)) return reply(429);

  const payload = {
    from: "Side <contato@sidecode.com.br>",
    to: ["contato@sidecode.com.br"],
    reply_to: email,
    subject: "Side — Nova inscrição na newsletter",
    text: `Nova inscrição recebida via newsletter na landing page da Side.\n\nEmail do assinante: ${email}\nData: ${new Date().toISOString()}`,
  };

  const idempotencyKey = "side-newsletter/" + createHash("sha256").update(email + new Date().toISOString().slice(0, 10)).digest("hex");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return reply(502);
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id) return reply(502);
    return reply(200, true);
  } catch {
    return reply(502);
  }
}
