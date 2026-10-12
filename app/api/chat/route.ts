import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_URL = process.env.GROQ_API_URL ?? "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";
const FALLBACK = "openai/gpt-oss-20b";
const MAX_MSG = 500, MAX_HISTORY = 8, LIMIT = 20, WINDOW = 10 * 60 * 1000;
const hits = new Map<string, { n: number; t: number }>();

const json = (body: object, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

function limited(ip: string) {
  const now = Date.now();
  if (hits.size > 500) for (const [k, v] of hits) if (now - v.t > WINDOW) hits.delete(k);
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n += 1;
  return h.n > LIMIT;
}

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const key = process.env.GROQ_API_KEY?.trim();
  if (!key || key.startsWith("your_")) return json({ error: "not_configured" }, 503);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (limited(ip)) return json({ error: "rate_limited" }, 429);

  let raw: unknown;
  try { raw = await req.json(); } catch { return json({ error: "bad_request" }, 400); }
  const list = (raw as { messages?: unknown })?.messages;
  if (!Array.isArray(list) || list.length === 0 || list.length > 30) return json({ error: "bad_request" }, 400);

  const msgs: Msg[] = [];
  for (const m of list) {
    const r = (m as Msg)?.role, c = (m as Msg)?.content;
    if ((r !== "user" && r !== "assistant") || typeof c !== "string") return json({ error: "bad_request" }, 400);
    const t = c.trim();
    if (!t || t.length > (r === "user" ? MAX_MSG : 2000)) return json({ error: "bad_request" }, 400);
    msgs.push({ role: r, content: t });
  }
  if (msgs[msgs.length - 1].role !== "user") return json({ error: "bad_request" }, 400);

  const recent = msgs.slice(-MAX_HISTORY);
  const last = recent[recent.length - 1];
  const reminder = "\n\n[Reminder: answer only from the KNOWLEDGE section. If it is not there, say you do not have that information. Do not guess.]";
  const payload = [
    { role: "system", content: SYSTEM_PROMPT },
    ...recent.slice(0, -1),
    { role: "user", content: last.content + reminder },
  ];

  const oss = MODEL.startsWith("openai/gpt-oss");
  const attempts = [
    { model: MODEL, effort: oss },
    ...(oss ? [{ model: MODEL, effort: false }] : []),
    ...(MODEL !== FALLBACK ? [{ model: FALLBACK, effort: true }] : []),
  ];
  let up: Response | null = null, detail = "", lastStatus = 0;
  for (const a of attempts) {
    try {
      const r = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: a.model, messages: payload, temperature: 0.1, max_tokens: 1200, stream: true, ...(a.effort ? { reasoning_effort: "low" } : {}) }),
      });
      if (r.ok && r.body) { up = r; break; }
      lastStatus = r.status;
      detail = `Groq ${r.status} (${a.model}): ${(await r.text().catch(() => "")).slice(0, 240)}`;
      console.error("[chat]", detail);
      if (![400, 404, 422].includes(r.status)) break; // only retry config/model problems
    } catch {
      detail = "Could not reach api.groq.com (network/firewall)";
      console.error("[chat]", detail);
      break;
    }
  }
  if (!up) return json({ error: lastStatus === 429 ? "busy" : "upstream", ...(process.env.NODE_ENV !== "production" ? { detail } : {}) }, 502);
  const upBody = up.body as ReadableStream<Uint8Array>;

  const enc = new TextEncoder(), dec = new TextDecoder();
  const reader = upBody.getReader();
  const stream = new ReadableStream({
    async start(ctrl) {
      let buf = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const l of lines) {
            const t = l.trim();
            if (!t.startsWith("data:")) continue;
            const d = t.slice(5).trim();
            if (d === "[DONE]") continue;
            try {
              const x = JSON.parse(d)?.choices?.[0]?.delta?.content;
              if (typeof x === "string" && x) ctrl.enqueue(enc.encode(x));
            } catch { /* ignore partial JSON */ }
          }
        }
      } catch { /* upstream dropped; end stream */ }
      ctrl.close();
    },
    cancel() { reader.cancel().catch(() => {}); },
  });
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
}
