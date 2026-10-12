"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MessageCircle, X, Send, Square, Trash2, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant" | "note"; content: string };
const SUGGEST = ["What are his strongest skills?", "Tell me about EduPilot", "Is he open to freelance work?", "What would a RAG chatbot cost?", "Can I see his resume?", "How can I contact him?"];
const MAIL = "utyo135@gmail.com";

function inline(s: string): ReactNode[] {
  return s.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((p, i) => {
    if (/^\*\*.+\*\*$/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(p)) {
      const c = p.replace(/[.,;:!?]+$/, "");
      return <span key={i}><a href={c} target="_blank" rel="noopener noreferrer">{c}</a>{p.slice(c.length)}</span>;
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(p)) { const c = p.replace(/\.$/, ""); return <span key={i}><a href={`mailto:${c}`}>{c}</a>{p.slice(c.length)}</span>; }
    return p;
  });
}

function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let list: string[] = [];
  const flush = (k: number) => { if (list.length) { out.push(<ul key={`u${k}`}>{list.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>); list = []; } };
  const lines = text.split("\n");
  lines.forEach((l, i) => {
    const m = l.match(/^\s*[-•*]\s+(.*)/);
    if (m) list.push(m[1]);
    else { flush(i); if (l.trim()) out.push(<p key={i}>{inline(l)}</p>); }
  });
  flush(lines.length);
  return <>{out}</>;
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ctl = useRef<AbortController | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const inp = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { const o = () => setOpen(true); window.addEventListener("open-chat", o); return () => window.removeEventListener("open-chat", o); }, []);
  useEffect(() => { if (open) { const t = setTimeout(() => inp.current?.focus(), 80); return () => clearTimeout(t); } }, [open]);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [msgs, open]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  useEffect(() => () => ctl.current?.abort(), []);

  function fail(text: string) {
    setMsgs((m) => { const n = [...m]; if (n.length && n[n.length - 1].role === "assistant" && !n[n.length - 1].content) n.pop(); return [...n, { role: "note", content: text }]; });
  }

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history = msgs.filter((m) => m.role !== "note" && m.content).slice(-8).map((m) => ({ role: m.role, content: m.content }));
    setMsgs((m) => [...m, { role: "user", content: q }, { role: "assistant", content: "" }]);
    setInput(""); setBusy(true);
    const c = new AbortController(); ctl.current = c;
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [...history, { role: "user", content: q }] }), signal: c.signal });
      if (!res.ok || !res.body) {
        const detail = res.status === 502 ? ((await res.json().catch(() => null)) as { detail?: string } | null)?.detail : undefined;
        if (detail) { fail(`Could not get an answer. Server says: ${detail}`); return; }
        fail(res.status === 503 ? `The AI assistant is not switched on yet. Please email ${MAIL} directly.`
          : res.status === 429 ? `Too many questions in a short time. Please wait a few minutes or email ${MAIL}.`
          : `Could not get an answer right now. Please try again, or email ${MAIL}.`);
        return;
      }
      const rd = res.body.getReader(); const dec = new TextDecoder(); let acc = "";
      for (;;) {
        const { done, value } = await rd.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs((m) => { const n = [...m]; n[n.length - 1] = { role: "assistant", content: acc }; return n; });
      }
      if (!acc.trim()) fail(`The assistant returned an empty answer. Please try again, or email ${MAIL}.`);
    } catch (e) {
      if ((e as Error).name === "AbortError") setMsgs((m) => (m.length && m[m.length - 1].role === "assistant" && !m[m.length - 1].content ? m.slice(0, -1) : m));
      else fail(`Network problem. Please try again, or email ${MAIL}.`);
    } finally { setBusy(false); }
  }

  const waiting = busy && msgs.length > 0 && msgs[msgs.length - 1].role === "assistant" && !msgs[msgs.length - 1].content;

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat: ask about Shivendra">
          <Sparkles size={20} /><span>Ask my AI</span><i className="ping" />
        </button>
      )}
      {open && (
        <section className="chat" role="dialog" aria-label="Chat about Shivendra Pratap Singh">
          <header className="chat-h">
            <span className="chat-av">S</span>
            <div><b>Ask about Shivendra</b><small>Answers only from his resume &amp; projects</small></div>
            <button onClick={() => { ctl.current?.abort(); setMsgs([]); setBusy(false); }} aria-label="Clear chat" title="Clear chat" disabled={!msgs.length}><Trash2 size={16} /></button>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </header>
          <div className="chat-b" role="log" aria-live="polite">
            <div className="msg a"><span className="mav">AI</span><div className="bub"><p>Hi! I can answer questions about Shivendra&apos;s skills, projects, education and freelance services. Everything I say comes from his resume and project details.</p></div></div>
            {!msgs.length && <div className="sugg">{SUGGEST.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>}
            {msgs.map((m, i) => m.role === "note"
              ? <p key={i} className="cnote">{m.content}</p>
              : m.role === "user"
                ? <div key={i} className="msg u"><div className="bub"><p>{m.content}</p></div></div>
                : m.content ? <div key={i} className="msg a"><span className="mav">AI</span><div className="bub"><Rich text={m.content} /></div></div> : null)}
            {waiting && <div className="msg a"><span className="mav">AI</span><div className="bub typing" aria-label="Assistant is typing"><i /><i /><i /></div></div>}
            <div ref={end} />
          </div>
          <form className="chat-f" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <textarea ref={inp} value={input} rows={1} maxLength={500} placeholder="Ask about skills, projects, pricing…" aria-label="Your question"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }} />
            {busy
              ? <button type="button" className="stop" onClick={() => ctl.current?.abort()} aria-label="Stop"><Square size={16} /></button>
              : <button type="submit" disabled={!input.trim()} aria-label="Send"><Send size={17} /></button>}
          </form>
          <p className="chat-d">AI can make mistakes. For anything important, email {MAIL}.</p>
        </section>
      )}
    </>
  );
}
