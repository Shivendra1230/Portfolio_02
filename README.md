# Shivendra Pratap Singh — Portfolio (Next.js 14 + Groq chatbot)

## Run locally
1. `npm install`
2. Open `.env.local` and paste your Groq key after `GROQ_API_KEY=` (free key: https://console.groq.com/keys)
3. `npm run dev` → http://localhost:3000

The key is only used on the server (`app/api/chat/route.ts`); it never reaches the browser. Restart the dev server after editing `.env.local`.

## Chatbot grounding
The bot may only use `lib/knowledge.ts` (resume + project facts). To add or correct anything, edit that file. Default model is `openai/gpt-oss-120b` (Groq retired llama-3.3-70b-versatile on 16 Aug 2026; change with `GROQ_MODEL`). Temperature is 0.1, and the system prompt tells the model to say "I don't have that information" instead of guessing.

## Deploy on Vercel
Push to GitHub → import in Vercel → Settings → Environment Variables → add `GROQ_API_KEY` → Deploy.

## Contact form
Opens the visitor's email app (mailto). For a real form set `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree / Web3Forms).
