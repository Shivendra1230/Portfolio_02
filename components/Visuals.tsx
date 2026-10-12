import type { ReactNode } from "react";

const Win = ({ t, children }: { t: string; children: ReactNode }) => (
  <g>
    <rect x="1" y="1" width="338" height="198" rx="14" fill="var(--s)" stroke="var(--line)" />
    <circle cx="16" cy="14" r="3.5" fill="#ef4444" opacity=".8" /><circle cx="28" cy="14" r="3.5" fill="#f59e0b" opacity=".8" /><circle cx="40" cy="14" r="3.5" fill="#22c55e" opacity=".8" />
    <text x="170" y="17" textAnchor="middle" className="vt">{t}</text>
    <path d="M1 26H339" stroke="var(--line)" />
    {children}
  </g>
);
const Ln = ({ x, y, w, o = 0.45 }: { x: number; y: number; w: number; o?: number }) => <rect x={x} y={y} width={w} height={4} rx={2} fill="var(--mute)" opacity={o} />;
const Pill = ({ x, y, w, l, c = "#22d3ee", h = 16 }: { x: number; y: number; w: number; l: string; c?: string; h?: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} opacity=".16" /><rect x={x} y={y} width={w} height={h} rx={h / 2} fill="none" stroke={c} opacity=".6" />
    <text x={x + w / 2} y={y + h / 2 + 3.4} textAnchor="middle" className="vp" fill={c}>{l}</text>
  </g>
);

function EduPath() {
  const steps: [string, number][] = [["Python", 1], ["Machine learning", 1], ["LLMs & RAG", 2], ["Deploy", 0]];
  const gaps: [string, number, number][] = [["Deep learning", 70, 92], ["RAG", 42, 80], ["Deployment", 22, 70]];
  return (
    <Win t="EduPath · learner dashboard">
      <text x="14" y="44" className="vs">Roadmap</text>
      <path d="M24 60V141" stroke="var(--line)" strokeWidth="2" />
      {steps.map(([l, s], i) => { const y = 60 + i * 27; return (
        <g key={l}>
          <circle cx="24" cy={y} r="7.5" fill={s === 1 ? "url(#vg)" : "var(--s)"} stroke={s === 2 ? "#22d3ee" : "var(--line)"} strokeWidth="2" />
          {s === 1 && <path d={`M20.5 ${y}l2.5 2.6l4.2-5`} stroke="#fff" strokeWidth="1.8" fill="none" />}
          <text x="38" y={y + 4} className={s === 0 ? "vt" : "vs2"}>{l}</text>
        </g>); })}
      <text x="140" y="44" className="vs">Skill gaps</text>
      {gaps.map(([l, h, n], i) => { const y = 62 + i * 19; return (
        <g key={l}><text x="140" y={y} className="vt">{l}</text><rect x="214" y={y - 7} width="110" height="6" rx="3" fill="var(--s2)" /><rect x="214" y={y - 7} width={h * 1.1} height="6" rx="3" fill="url(#vg)" /><rect x={214 + n * 1.1} y={y - 10} width="2" height="12" fill="#22d3ee" /></g>); })}
      <rect x="138" y="124" width="190" height="64" rx="11" fill="var(--s2)" stroke="var(--line)" />
      <circle cx="154" cy="140" r="6" fill="url(#vg)" /><text x="166" y="143" className="vc">Copilot</text>
      <text x="150" y="160" className="vs2">Build a small RAG project</text><text x="150" y="175" className="vt">to close your biggest gap<tspan className="blink">▍</tspan></text>
    </Win>
  );
}

function EduPilot() {
  return (
    <Win t="EduPilot · study copilot">
      <rect x="12" y="38" width="86" height="148" rx="7" fill="var(--s2)" stroke="var(--line)" />
      <text x="20" y="52" className="vc">notes.pdf</text>
      {[62, 72, 82, 92, 126, 136, 146, 156].map((y, i) => <Ln key={y} x={20} y={y} w={i % 3 === 0 ? 70 : 58} />)}
      <rect x="18" y="102" width="74" height="18" rx="4" fill="#8b5cf6" opacity=".35" /><Ln x={22} y={106} w={60} o={0.9} /><Ln x={22} y={113} w={42} o={0.9} />
      <path d="M98 111C106 111 104 80 114 80" fill="none" stroke="#22d3ee" strokeWidth="1.8" markerEnd="url(#ar)" />
      <rect x="118" y="38" width="112" height="26" rx="9" fill="url(#vg)" /><text x="174" y="55" textAnchor="middle" className="vp" fill="#fff">Explain backprop simply</text>
      <rect x="118" y="72" width="112" height="70" rx="9" fill="var(--s2)" stroke="var(--line)" />
      <Ln x={126} y={82} w={96} o={0.7} /><Ln x={126} y={92} w={88} o={0.5} /><Ln x={126} y={102} w={70} o={0.5} />
      <Pill x={126} y={116} w={56} l="notes p.12" /><Pill x={188} y={116} w={34} l="video" c="#8b5cf6" />
      <rect x="118" y="154" width="112" height="28" rx="14" fill="var(--bg)" stroke="var(--line)" /><text x="132" y="172" className="vt">Ask your notes…</text>
      <rect x="240" y="38" width="88" height="148" rx="10" fill="var(--s2)" stroke="var(--line)" />
      <text x="250" y="54" className="vs">Quick quiz</text>
      {[64, 90, 116].map((y, i) => (
        <g key={y}><rect x="250" y={y} width="68" height="20" rx="7" fill={i === 1 ? "#22d3ee" : "var(--bg)"} fillOpacity={i === 1 ? 0.16 : 1} stroke={i === 1 ? "#22d3ee" : "var(--line)"} /><Ln x={258} y={y + 8} w={i === 1 ? 40 : 30} o={0.6} /></g>))}
      <text x="250" y="156" className="vt">Topic mastery</text><rect x="250" y="162" width="68" height="6" rx="3" fill="var(--bg)" /><rect x="250" y="162" width="46" height="6" rx="3" fill="url(#vg)" />
    </Win>
  );
}

function Riskify() {
  const why: [string, number, string][] = [["Attendance", 52, "#ef4444"], ["Assignments", 38, "#ef4444"], ["Quiz scores", 30, "#22d3ee"]];
  return (
    <Win t="Riskify · early-warning">
      <rect x="12" y="38" width="100" height="78" rx="10" fill="var(--s2)" stroke="var(--line)" />
      <circle cx="34" cy="62" r="12" fill="url(#vg)" /><Ln x={54} y={56} w={46} o={0.7} /><Ln x={54} y={66} w={30} />
      <Pill x={22} y={86} w={64} l="High risk" c="#f59e0b" /><Ln x={22} y={108} w={80} o={0.3} />
      <path d="M133 104A42 42 0 0 1 217 104" fill="none" stroke="url(#rg)" strokeWidth="11" strokeLinecap="round" />
      <path d="M175 104L203 82" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" /><circle cx="175" cy="104" r="5" fill="var(--ink)" />
      <text x="175" y="124" textAnchor="middle" className="vt">Risk level</text>
      <text x="236" y="48" className="vs">Key factors</text>
      {why.map(([l, w, c], i) => { const y = 62 + i * 22; return (<g key={l}><text x="236" y={y} className="vt">{l}</text><rect x="236" y={y + 8} width="92" height="4" rx="2" fill="var(--bg)" /><rect x="236" y={y + 8} width={w} height="4" rx="2" fill={c} /></g>); })}
      <rect x="12" y="130" width="316" height="58" rx="11" fill="var(--s2)" stroke="#22d3ee" strokeOpacity=".4" />
      <circle cx="34" cy="159" r="11" fill="#22d3ee" opacity=".18" /><text x="34" y="164" textAnchor="middle" className="vc">AI</text>
      <text x="54" y="150" className="vc">Suggested intervention</text><text x="54" y="165" className="vs2">Weekly mentor check-in + attendance plan</text><text x="54" y="179" className="vt">Generated from the model&apos;s explanation</text>
    </Win>
  );
}

function Fraud() {
  const rows = [0, 1, 0, 1];
  return (
    <Win t="Fraud detector · batch CSV">
      <text x="16" y="42" className="vt">Transaction</text><text x="136" y="42" className="vt">Amount</text><text x="262" y="42" className="vt">Prediction</text>
      {rows.map((f, i) => { const y = 48 + i * 27; return (
        <g key={i}>
          <rect x="10" y={y} width="320" height="23" rx="7" fill={f ? "#ef4444" : "var(--s2)"} fillOpacity={f ? 0.12 : 1} stroke={f ? "#ef4444" : "var(--line)"} strokeOpacity={f ? 0.5 : 1} />
          <Ln x={18} y={y + 9} w={70} o={0.5} /><Ln x={136} y={y + 9} w={f ? 56 : 34} o={0.7} />
          <Pill x={262} y={y + 3} w={58} l={f ? "Fraud" : "Legit"} c={f ? "#ef4444" : "#22d3ee"} />
        </g>); })}
      <text x="16" y="170" className="vt">Decision threshold</text>
      <rect x="16" y="178" width="150" height="4" rx="2" fill="var(--s2)" /><rect x="16" y="178" width="108" height="4" rx="2" fill="url(#vg)" /><circle cx="124" cy="180" r="6" fill="#fff" stroke="#8b5cf6" strokeWidth="2" />
      <rect x="226" y="164" width="94" height="24" rx="12" fill="var(--s2)" stroke="var(--line)" /><text x="273" y="180" textAnchor="middle" className="vc">↑ upload batch.csv</text>
    </Win>
  );
}

function Plant() {
  return (
    <Win t="Plant doctor · leaf scan">
      <rect x="12" y="38" width="150" height="148" rx="10" fill="url(#pg)" />
      <path d="M87 54C130 76 136 128 87 172C38 128 44 76 87 54Z" fill="#22c55e" opacity=".9" />
      <path d="M87 62V166M87 96L62 112M87 120L116 104M87 140L64 150" stroke="#14532d" strokeWidth="2" fill="none" />
      <circle cx="102" cy="104" r="7" fill="#92400e" opacity=".9" /><circle cx="76" cy="134" r="5" fill="#92400e" opacity=".9" /><circle cx="108" cy="130" r="3.5" fill="#92400e" opacity=".8" />
      <rect x="84" y="86" width="36" height="36" rx="5" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeDasharray="5 3" />
      <path d="M16 112H158" stroke="#22d3ee" strokeOpacity=".45" />
      <rect x="174" y="38" width="154" height="148" rx="10" fill="var(--s2)" stroke="var(--line)" />
      <text x="186" y="56" className="vt">Detected</text><text x="186" y="76" className="vh">Leaf blight</text>
      <text x="186" y="96" className="vt">Confidence</text><rect x="186" y="102" width="130" height="7" rx="3.5" fill="var(--bg)" /><rect x="186" y="102" width="104" height="7" rx="3.5" fill="url(#vg)" />
      <text x="186" y="128" className="vt">Other classes</text>
      <rect x="186" y="134" width="130" height="4" rx="2" fill="var(--bg)" /><rect x="186" y="134" width="22" height="4" rx="2" fill="var(--mute)" opacity=".6" />
      <rect x="186" y="144" width="130" height="4" rx="2" fill="var(--bg)" /><rect x="186" y="144" width="12" height="4" rx="2" fill="var(--mute)" opacity=".6" />
      <Pill x={186} y={160} w={100} l="EfficientNet-B0" c="#8b5cf6" />
    </Win>
  );
}

function EV() {
  const bars = [30, 24, 28, 40, 58, 72, 64, 50, 62, 78, 56, 38];
  const pins: [number, number, number][] = [[52, 84, 18], [112, 74, 11], [82, 134, 22], [134, 154, 9], [36, 156, 13]];
  return (
    <Win t="EV demand · station map">
      <rect x="12" y="38" width="150" height="148" rx="10" fill="var(--s2)" stroke="var(--line)" />
      <path d="M12 96H162M12 142H162M64 38V186M118 38V186M12 60L162 120" stroke="var(--line)" strokeWidth="1.5" />
      {pins.map(([x, y, r]) => <g key={`${x}${y}`}><circle cx={x} cy={y} r={r} fill="#8b5cf6" opacity=".28" /><circle cx={x} cy={y} r="4.5" fill="#22d3ee" /></g>)}
      <text x="20" y="180" className="vt">Larger glow = higher demand</text>
      <text x="176" y="52" className="vs">Demand by hour</text>
      <path d="M176 156H328" stroke="var(--line)" />
      {bars.map((h, i) => i < 8
        ? <rect key={i} x={178 + i * 12.5} y={156 - h} width="9" height={h} rx="2.5" fill="#3b82f6" opacity=".75" />
        : <rect key={i} x={178 + i * 12.5} y={156 - h} width="9" height={h} rx="2.5" fill="#22d3ee" fillOpacity=".14" stroke="#22d3ee" strokeDasharray="3 2" />)}
      <path d="M278 84L290 96" stroke="none" />
      <text x="212" y="174" textAnchor="middle" className="vt">Today</text><text x="296" y="174" textAnchor="middle" className="vc">Forecast</text>
    </Win>
  );
}

const visuals: Record<string, () => ReactNode> = { edupath: EduPath, edupilot: EduPilot, riskify: Riskify, fraud: Fraud, plant: Plant, ev: EV };
const names: Record<string, string> = { edupath: "EduPath learner dashboard with roadmap, skill gaps and AI copilot", edupilot: "EduPilot chat over a PDF with quiz and mastery", riskify: "Riskify risk gauge, explanation and suggested intervention", fraud: "Fraud detector table with flagged transactions and threshold", plant: "Plant disease scan of a leaf with detected class", ev: "EV charging station map and hourly demand forecast" };

export default function Visual({ k }: { k: string }) {
  const Body = visuals[k] ?? EduPath;
  return (
    <svg viewBox="0 0 340 200" className="visual" role="img" aria-label={names[k] ?? "Project preview"}>
      <defs>
        <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b82f6" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
        <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#22c55e" /><stop offset=".55" stopColor="#f59e0b" /><stop offset="1" stopColor="#ef4444" /></linearGradient>
        <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0f2a1d" /><stop offset="1" stopColor="#14532d" /></linearGradient>
        <marker id="ar" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#22d3ee" /></marker>
      </defs>
      <Body />
    </svg>
  );
}

export function HeroScene() {
  return (
    <svg viewBox="0 0 520 440" className="scene" role="img" aria-label="Illustration of a document chatbot on a laptop, a WhatsApp assistant on a phone and an agent workflow">
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b82f6" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient>
        <radialGradient id="hc"><stop offset="0" stopColor="#8b5cf6" stopOpacity=".55" /><stop offset="1" stopColor="#3b82f6" stopOpacity="0" /></radialGradient>
        <filter id="gl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <ellipse cx="260" cy="230" rx="250" ry="200" fill="url(#hc)" />
      <path d="M0 318H400L384 336H16Z" fill="var(--s2)" stroke="var(--line)" />
      <rect x="20" y="70" width="360" height="248" rx="16" fill="var(--s)" stroke="#323a52" strokeWidth="2" />
      <circle cx="40" cy="88" r="4" fill="#ef4444" opacity=".8" /><circle cx="54" cy="88" r="4" fill="#f59e0b" opacity=".8" /><circle cx="68" cy="88" r="4" fill="#22c55e" opacity=".8" />
      <path d="M20 104H380M112 104V318" stroke="var(--line)" />
      {[["menu.pdf", 120], ["faq.docx", 150], ["website", 180]].map(([l, y], i) => (
        <g key={String(l)}><rect x="30" y={Number(y) - 8} width="72" height="24" rx="8" fill={i === 0 ? "#8b5cf6" : "var(--s2)"} fillOpacity={i === 0 ? 0.3 : 1} stroke="var(--line)" /><text x="66" y={Number(y) + 8} textAnchor="middle" className="hs">{String(l)}</text></g>))}
      <text x="32" y="228" className="hs2">Your knowledge</text>
      <rect x="196" y="120" width="172" height="34" rx="12" fill="url(#hg)" /><text x="282" y="142" textAnchor="middle" className="hs" fill="#fff">Do you deliver on Sundays?</text>
      <rect x="126" y="166" width="214" height="84" rx="12" fill="var(--s2)" stroke="var(--line)" />
      <text x="140" y="190" className="hv2">Yes, 11 am to 10 pm.</text><text x="140" y="208" className="hs2">Answered from your FAQ document.</text>
      <rect x="140" y="218" width="84" height="22" rx="11" fill="#22d3ee" opacity=".15" stroke="#22d3ee" strokeOpacity=".6" /><text x="182" y="233" textAnchor="middle" className="hs" fill="#22d3ee">faq.docx</text>
      <rect x="126" y="268" width="242" height="34" rx="17" fill="var(--bg)" stroke="var(--line)" />
      {[0, 1, 2].map((i) => <circle key={i} className="nd" style={{ animationDelay: `${i * 0.3}s` }} cx={146 + i * 12} cy="285" r="3.5" fill="#22d3ee" />)}
      <g className="fl2">
        <rect x="320" y="8" width="196" height="92" rx="16" fill="var(--s)" stroke="#323a52" />
        <path d="M352 52H488" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" />
        {[["Trigger", 352], ["LLM", 420], ["Action", 488]].map(([l, x]) => (<g key={String(l)}><circle cx={Number(x)} cy="52" r="14" fill="var(--bg)" stroke="url(#hg)" strokeWidth="2" /><text x={Number(x)} y="84" textAnchor="middle" className="hs2">{String(l)}</text></g>))}
        <text x="336" y="30" className="hs">Agent workflow</text>
      </g>
      <g className="fl1">
        <rect x="346" y="190" width="150" height="240" rx="26" fill="#0b0d14" stroke="#323a52" strokeWidth="3" />
        <rect x="353" y="217" width="136" height="32" rx="2" fill="#0f766e" /><circle cx="370" cy="233" r="9" fill="#22c55e" opacity=".85" /><text x="386" y="237" className="hs" fill="#fff">Kitchen assistant</text>
        <rect x="408" y="262" width="74" height="24" rx="9" fill="#134e4a" /><text x="445" y="278" textAnchor="middle" className="hs" fill="#d1fae5">Menu please</text>
        <rect x="360" y="294" width="116" height="52" rx="9" fill="var(--s2)" /><Ln x={368} y={304} w={92} o={0.7} /><Ln x={368} y={314} w={80} o={0.5} /><Ln x={368} y={324} w={60} o={0.5} />
        <Pill x={360} y={356} w={52} l="Order" /><Pill x={418} y={356} w={58} l="Book table" c="#8b5cf6" />
        <rect x="372" y="396" width="104" height="24" rx="12" fill="var(--bg)" stroke="var(--line)" />
      </g>
    </svg>
  );
}
