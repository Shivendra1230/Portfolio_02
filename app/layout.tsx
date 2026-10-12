import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivendra Pratap Singh | AI/ML Engineer, RAG Chatbots & AI Agents (India)",
  description: "Freelance AI/ML engineer from India building RAG chatbots, LLM agents, machine learning models and Python AI backends. Explore live projects and request a quote.",
  keywords: ["AI/ML Engineer India", "Generative AI Developer", "RAG Chatbot Developer", "AI Agent Developer", "Python AI Developer", "Freelance AI Developer"],
  openGraph: { title: "Shivendra Pratap Singh | AI/ML Engineer", description: "Turning AI ideas into working products: RAG, agents, ML and deployment.", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#07080d" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="bgfx" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
