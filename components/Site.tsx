"use client";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X, ArrowUpRight, Clock, Bot, Workflow, LineChart, Server, Check, Sparkles, Download, Eye, FileText, GraduationCap, Trophy } from "lucide-react";
import { projects, services, skills, steps, LINKS, type Project } from "@/lib/data";
import Visual, { HeroScene } from "./Visuals";
import Chat from "./Chat";

const NAV = ["About", "Resume", "Projects", "Services", "Skills", "Contact"];
const SECTIONS = ["home", "about", "resume", "projects", "services", "skills", "process", "contact"];
const ICONS = [Bot, Workflow, LineChart, Server];

function Reveal({ children, d = 0 }: { children: ReactNode; d?: number }) {
  const r = useReducedMotion();
  return (
    <motion.div initial={r ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: d }}>
      {children}
    </motion.div>
  );
}

const WORDS = ["RAG chatbots for your documents", "WhatsApp AI assistants for your business", "LLM agents that automate workflows"];
function Typer() {
  const r = useReducedMotion();
  const [i, setI] = useState(0); const [n, setN] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    if (r) return;
    const w = WORDS[i];
    const step = () => {
      if (!del && n === w.length) setDel(true);
      else if (del && n === 0) { setDel(false); setI((i + 1) % WORDS.length); }
      else setN(n + (del ? -1 : 1));
    };
    const t = setTimeout(step, !del && n === w.length ? 1400 : del ? 22 : 55);
    return () => clearTimeout(t);
  }, [n, del, i, r]);
  return <p className="typer" aria-label={WORDS.join(", ")}><span aria-hidden="true">{r ? WORDS[0] : WORDS[i].slice(0, n)}<i className="caret" /></span></p>;
}

const TECH = ["Python", "PyTorch", "TensorFlow", "LangGraph", "RAG", "FastAPI", "scikit-learn", "XGBoost", "Streamlit", "Docker", "Git", "LLM APIs"];
function Marquee() {
  return (
    <div className="marq" aria-hidden="true"><div className="mtrack">{[...TECH, ...TECH].map((t, i) => <span key={i}>{t}</span>)}</div></div>
  );
}
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true });
  const r = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (r) { setV(to); return; }
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, to, r]);
  return <b ref={ref} className="g">{v}{suffix}</b>;
}
function Facts() {
  const f: [number, string, string][] = [[6, "", "Projects with live demos"], [150, "+", "LeetCode problems solved in C++"], [7, "", "Agents in his hackathon LangGraph system"]];
  return <div className="w facts">{f.map(([n, sfx, l]) => <div key={l}><Count to={n} suffix={sfx} /><span>{l}</span></div>)}</div>;
}

function Rails() {
  return (
    <>
      <aside className="rail l" aria-label="Social links">
        <a href={LINKS.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer"><Github size={17} /></a>
        <a href={LINKS.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={17} /></a>
        <a href={`mailto:${LINKS.email}`} aria-label="Email"><Mail size={17} /></a>
        <a href={LINKS.resume} aria-label="Download resume" download><FileText size={17} /></a>
      </aside>
      <aside className="rail r" aria-hidden="true"><span>AI/ML Engineer · Generative AI · Agents</span></aside>
    </>
  );
}

function Notice({ host }: { host: Project["host"] }) {
  return (
    <p className="wait">
      <Clock size={15} aria-hidden />
      {host === "streamlit"
        ? "Hosted on free Streamlit: apps go to sleep when idle. If you see a sleeping screen, press “Yes, get this app back up” and wait 30–60 seconds."
        : "Hosted on a free Render plan: the first load can take up to a minute while the server wakes up."}
    </p>
  );
}

function ProjectCard({ p, i, wide }: { p: Project; i: number; wide?: boolean }) {
  return (
    <Reveal d={(i % 2) * 0.08}>
      <article className={`card proj ${p.flagship ? "flag" : ""} ${wide ? "wide" : ""}`}>
        <div className="vis"><Visual k={p.id} /><ol className="flow">{p.flow.map((f, n) => <li key={f}><b>{n + 1}</b>{f}</li>)}</ol><span className="cap">Illustrative preview</span></div>
        <div className="body">
          <span className="cat">{p.flagship ? "Flagship · " : ""}{p.cat}</span>
          <h3>{p.name}</h3>
          <p>{p.desc}</p>
          <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
          {p.note && <p className="note">{p.note}</p>}
          <div className="badges">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
          <Notice host={p.host} />
          <div className="acts">
            <a className="btn p" href={p.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16} /></a>
            {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Contact({ service }: { service: string }) {
  const [st, setSt] = useState<"idle" | "invalid" | "mail" | "sending" | "sent" | "fail">("idle");
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (!v("name") || !/^\S+@\S+\.\S+$/.test(v("email")) || !v("message")) return setSt("invalid");
    const data = { name: v("name"), email: v("email"), company: v("company"), service: v("service"), budget: v("budget"), message: v("message") };
    if (endpoint) {
      setSt("sending");
      try {
        const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        setSt(r.ok ? "sent" : "fail");
      } catch { setSt("fail"); }
      return;
    }
    const body = Object.entries(data).map(([k, x]) => `${k}: ${x}`).join("\n");
    window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent("Project inquiry: " + data.service)}&body=${encodeURIComponent(body)}`;
    setSt("mail");
  }
  const msg = {
    idle: endpoint ? "Your message is sent to my inbox when you submit." : "This form opens your email app with the details filled in. Nothing is sent until you press send there.",
    invalid: "Please add your name, a valid email and a short project description.",
    mail: `Your email app should open now. If it does not, write to ${LINKS.email} directly.`,
    sending: "Sending…", sent: "Message sent. I will get back to you as soon as I can.",
    fail: `Could not send the message. Please email ${LINKS.email} directly.`,
  }[st];
  return (
    <form onSubmit={submit} noValidate>
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Company or project name<input name="company" /></label>
      <label>Service
        <select name="service" key={service} defaultValue={service}>
          {services.map((s) => <option key={s.title}>{s.title}</option>)}<option>Not sure yet</option>
        </select>
      </label>
      <label className="full">Estimated budget
        <select name="budget"><option>Under ₹5,000</option><option>₹5,000 – ₹15,000</option><option>₹15,000 – ₹40,000</option><option>₹40,000+</option><option>Not sure yet</option></select>
      </label>
      <label className="full">Project description<textarea name="message" required /></label>
      <input name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="full"><button className="btn p" type="submit" disabled={st === "sending"}>{endpoint ? "Send inquiry" : "Prepare email"}</button></div>
      <p className="full fmsg" role="status" aria-live="polite">{msg}</p>
    </form>
  );
}

export default function Site() {
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(services[0].title);
  const r = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [act, setAct] = useState("home");
  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setAct(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      const c = (e.target as HTMLElement | null)?.closest?.(".card") as HTMLElement | null;
      if (!c) return;
      const b = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - b.left}px`);
      c.style.setProperty("--my", `${e.clientY - b.top}px`);
    };
    document.addEventListener("mousemove", mv);
    return () => document.removeEventListener("mousemove", mv);
  }, []);
  return (
    <>
      <motion.div className="prog" style={{ scaleX: sx }} aria-hidden="true" />
      <Rails />
      <header className="top">
        <div className="w bar">
          <a className="logo" href="#home"><span className="dot" />Shivendra Pratap Singh</a>
          <button className="burger" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
          <nav id="nav" className={`links ${open ? "open" : ""}`} aria-label="Main">
            {NAV.map((n) => <a key={n} className={act === n.toLowerCase() ? "act" : ""} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>)}
            <a className="btn p" href="#projects" onClick={() => setOpen(false)}>View Projects</a>
            <a className="btn" href="#contact" onClick={() => setOpen(false)}>Hire Me</a>
          </nav>
        </div>
      </header>
      <main>
        <section className="w hero" id="home">
          <motion.div initial={r ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pill"><i /> Open to Freelance Projects &amp; AI/ML Opportunities</span>
            <p className="hi">Hi, I&apos;m <b>Shivendra Pratap Singh</b></p>
            <h1>Turning AI Ideas <span className="g">Into Working Products.</span></h1>
            <Typer />
            <p>I build practical AI applications, RAG-powered assistants, intelligent agent workflows, machine learning models and deployable Python solutions, taking projects from an initial idea to a functional, tested application.</p>
            <div className="row">
              <a className="btn p" href="#contact">Let&apos;s Work Together</a><a className="btn" href="#projects">Explore My Projects</a>
              <button className="btn ask" onClick={() => window.dispatchEvent(new Event("open-chat"))}><Sparkles size={16} /> Ask my AI</button>
              <a className="btn" href={LINKS.resume} download><Download size={16} /> Resume</a>
              <a className="btn ic" href={LINKS.github} aria-label="GitHub"><Github size={18} /></a>
              <a className="btn ic" href={LINKS.linkedin} aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
            <div className="tech">{["Python", "PyTorch", "TensorFlow", "LangGraph", "RAG", "FastAPI"].map((t) => <span key={t}>{t}</span>)}</div>
          </motion.div>
          <div className="hv"><HeroScene /></div>
        </section>
        <Facts />
        <Marquee />

        <section className="w" id="about">
          <Reveal><h2 className="h2">Engineering Intelligence Into Applications</h2></Reveal>
          <div className="about">
            <Reveal><div className="stack">
              <div>
                <p>I&apos;m an AI/ML developer focused on building practical intelligent applications. My work spans machine learning, deep learning, Generative AI, NLP, retrieval-augmented generation and agentic workflows.</p>
                <p>Through hands-on projects, I&apos;ve explored the process of transforming datasets, models and LLM capabilities into usable applications. I enjoy solving engineering problems, experimenting with new approaches and deploying solutions that people can interact with.</p>
                <p>I&apos;m currently interested in freelance AI development projects, contract-based implementation work, and opportunities to grow as an AI/ML engineer.</p>
              </div>
              <div className="card"><span className="ico"><GraduationCap size={22} /></span><h3>Education</h3><ul>
                <li>B.Tech in Computer Science (AI), IIMT Group of Colleges, expected 2028</li>
                <li>Senior Secondary (CBSE), Sukhrawati Public School, 2024</li></ul></div>
            </div></Reveal>
            <Reveal d={0.1}><div className="stack">
              <div className="card"><h3>Technical focus</h3><ul>
                {["Generative AI and LLM applications", "RAG and document question answering", "Agentic AI and multi-step workflows", "Machine learning and deep learning", "Computer vision and NLP", "Python backend, APIs and deployment"].map((x) => <li key={x}>{x}</li>)}
              </ul></div>
              <div className="card"><span className="ico"><Trophy size={22} /></span><h3>Achievements</h3><ul>
                <li>Agentic AI Hackathon (Product Space): built EduPath, a 7-agent LangGraph system, deployed live</li>
                <li>150+ LeetCode problems solved in C++</li></ul></div>
            </div></Reveal>
          </div>
        </section>

        <section className="w" id="resume">
          <Reveal><h2 className="h2">Resume</h2><p className="sub">One page, ATS-friendly. View it in your browser or download the PDF.</p></Reveal>
          <div className="resume">
            <Reveal><a className="paper" href={LINKS.resume} target="_blank" rel="noopener noreferrer" aria-label="Open resume PDF in a new tab">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/resume-preview.webp" alt="Preview of Shivendra Pratap Singh's one-page resume" width={1075} height={1521} loading="lazy" />
              <span className="peek"><Eye size={18} /> Open full resume</span>
            </a></Reveal>
            <Reveal d={0.1}><div className="rinfo">
              <h3>Shivendra Pratap Singh</h3>
              <p className="rsub">AI/ML Engineer | Generative AI Engineer</p>
              <ul className="rlist">
                <li><b>Focus</b>RAG pipelines, multi-agent workflows (LangGraph), PyTorch and TensorFlow models, FastAPI services</li>
                <li><b>Education</b>B.Tech Computer Science (AI), IIMT Group of Colleges, expected 2028</li>
                <li><b>Projects</b>EduPath 2.0, EduPilot, Riskify and Credit Card Fraud Detection, each with a live demo</li>
                <li><b>Location</b>Greater Noida, Uttar Pradesh, India</li>
              </ul>
              <div className="row">
                <a className="btn p" href={LINKS.resume} target="_blank" rel="noopener noreferrer"><Eye size={16} /> View resume</a>
                <a className="btn" href={LINKS.resume} download="Shivendra_Pratap_Singh_Resume.pdf"><Download size={16} /> Download PDF</a>
              </div>
            </div></Reveal>
          </div>
        </section>

        <section className="w" id="projects">
          <Reveal><h2 className="h2">Featured Projects</h2>
            <p className="sub">Six live applications you can open right now. Previews are illustrative sketches of each app, so open the demo to see the real interface.</p></Reveal>
          <div className="plist">{projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} wide={i === projects.length - 1} />)}</div>
          <p className="more"><a className="btn" href={`${LINKS.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">View All Projects on GitHub <ArrowUpRight size={16} /></a></p>
        </section>

        <section className="w" id="services">
          <Reveal><h2 className="h2">Have an AI Idea? Let&apos;s Build It.</h2>
            <p className="sub">I help startups, founders and businesses turn AI use cases into functional, deployable applications. Prices are starting estimates; the final quote depends on requirements, integrations, complexity, deployment and third-party costs.</p></Reveal>
          <div className="grid g4">
            {services.map((s, i) => { const I = ICONS[i]; return (
              <Reveal key={s.title} d={i * 0.06}><div className="card svc">
                <span className="ico"><I size={22} /></span><h3>{s.title}</h3><p>{s.desc}</p>
                <ul>{s.items.map((x) => <li key={x}><Check size={14} />{x}</li>)}</ul>
                <p className="price">Starting at {s.price}</p>
                <a className="btn p" href="#contact" onClick={() => setSvc(s.title)}>Discuss Your Project</a>
              </div></Reveal>); })}
          </div>
        </section>

        <section className="w" id="skills">
          <Reveal><h2 className="h2">Technical Skills</h2><p className="sub">Grouped by what I build with them.</p></Reveal>
          <div className="grid g3">{skills.map((s, i) => <Reveal key={s.t} d={i * 0.04}><div className="card"><h3>{s.t}</h3><div className="chips">{s.d.split(", ").map((x) => <span key={x}>{x}</span>)}</div></div></Reveal>)}</div>
        </section>

        <section className="w" id="process">
          <Reveal><h2 className="h2">How I Work</h2><p className="sub">A simple four-step process, so you always know what happens next.</p></Reveal>
          <div className="grid steps g4">{steps.map((s, i) => <Reveal key={s.t} d={i * 0.06}><div className="card"><b className="g">0{i + 1}</b><h3>{s.t}</h3><p>{s.d}</p></div></Reveal>)}</div>
          <p className="more"><a className="btn p" href="#contact">Let&apos;s Discuss Your Requirements</a></p>
        </section>

        <section className="w" id="contact">
          <Reveal><h2 className="h2">Let&apos;s Build Something Intelligent.</h2>
            <p className="sub">Have a chatbot idea, an AI workflow to automate, or an ML application to develop? Tell me about the problem, and let&apos;s explore a practical solution.</p></Reveal>
          <div className="cwrap">
            <Contact service={svc} />
            <div className="card">
              <h3>Prefer to reach out directly?</h3>
              <p><Mail size={15} /> <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></p>
              <p><Linkedin size={15} /> <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">Shivendra Pratap Singh</a></p>
              <p><Github size={15} /> <a href={LINKS.github} target="_blank" rel="noopener noreferrer">Shivendra1230</a></p>
              <p className="note">I reply to project inquiries as soon as I can. Response times are not guaranteed.</p>
            </div>
          </div>
        </section>
<section className="w">
          <Reveal><div className="ctaband">
            <div><h2>Let&apos;s build something that works.</h2><p>Hiring for an AI/ML role, or have a project in mind? Send a message or grab the resume.</p></div>
            <div className="row"><a className="btn p" href="#contact">Hire Me</a><a className="btn" href={LINKS.resume} download="Shivendra_Pratap_Singh_Resume.pdf"><Download size={16} /> Resume</a></div>
          </div></Reveal>
        </section>
      </main>
      <footer><div className="w foot">
        <div><b>Shivendra Pratap Singh</b><br />AI/ML Engineer &amp; Freelance AI Developer<br />Built with curiosity and code. © {new Date().getFullYear()}</div>
        <div className="fl">{NAV.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}<a href={`mailto:${LINKS.email}`}>Email</a></div>
      </div></footer>
      <Chat />
    </>
  );
}
