import { createHash } from "node:crypto";
import { contactContent, contactFields, choiceValues, customChoiceText, validContactField, type ContactAnswers, type ContactField } from "@/features/contact/contact-content";
import { readJsonBody } from "@/lib/read-json-body";

// Bounded per-instance throttling; distributed hosts still need a shared edge limit.
// No visitor content is logged or stored here.
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
  const reply = (status: number, ok = false) => Response.json({ ok }, { status, headers: { "Cache-Control": "no-store" } });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415);
  const parsed = await readJsonBody(request, 8192);
  if (!parsed.ok) return reply(parsed.status);
  const body = parsed.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400);
  const fields = body as Record<string, unknown>;
  if (fields.company || (fields.locale !== "en" && fields.locale !== "pt-BR")) return reply(400);
  const answers = {} as ContactAnswers;
  for (const field of contactFields) {
    if (typeof fields[field] !== "string") return reply(400);
    const value = (fields[field] as string).trim();
    if (!validContactField(field, value)) return reply(400);
    answers[field] = field === "email" ? value.toLowerCase() : value;
  }
  const requestId = request.headers.get("idempotency-key");
  if (!requestId || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(requestId)) return reply(400);
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return reply(503);
  if (!allow(answers.email)) return reply(429);
  const copy = contactContent[fields.locale];
  function display(field: ContactField) {
    const custom = customChoiceText(answers[field]);
    if (choiceValues[field] && custom !== null) return custom.trim();
    const choices = choiceValues[field];
    if (!choices) return answers[field];
    return copy.choices[field as "type" | "stage" | "timing"][choices.indexOf(answers[field])];
  }
  const payload = {
    from: "Side <contato@sidecode.com.br>",
    to: ["contato@sidecode.com.br"],
    reply_to: answers.email,
    subject: "Side — Novo projeto / New project",
    text: contactFields.map(field => `${copy.questions[field]}\n${display(field)}`).join("\n\n"),
  };
  // Same request + same payload stays stable on retry; edits get a distinct key.
  const idempotencyKey = "side-project/" + createHash("sha256").update(requestId + JSON.stringify(payload)).digest("hex");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", cache: "no-store",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return reply(502);
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id) return reply(502);
    return reply(200, true);
  } catch { return reply(502); }
}
