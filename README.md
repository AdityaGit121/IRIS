# 🌸 Iris Bloom AI — Flower Vision

React + Vite frontend, Express API backend, flower classification via the
Gemini API (`gemini-3.5-flash` vision). Classifies photos into **daisy,
dandelion, rose, sunflower, tulip**.

> **Note:** This repo also contains a separate, older Streamlit + local
> Keras/MobileNetV2 implementation, kept for reference in
> `legacy-streamlit-app/`. It is **not** part of this app and is not wired
> into either deployment below (Streamlit cannot run on Vercel's serverless
> runtime — it would need its own separate Render service).

## Project structure

```
├── src/                   # React frontend (Vite)
├── server/
│   ├── app.ts              # Express app — all /api/* routes (shared by both deploys)
│   └── index.ts             # Local dev + Render entry point (calls app.listen)
├── api/
│   └── index.ts              # Vercel serverless function entry (no app.listen)
├── public/flowers/            # Demo images, served as static assets
├── vercel.json                 # Vercel build/routing config
├── render.yaml                  # Render service config (Node)
└── legacy-streamlit-app/         # Unrelated old Python/Streamlit variant (not deployed)
```

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `GEMINI_API_KEY` | Recommended | Server-side only. Without it, custom photo uploads return a "missing key" error; the 4 built-in demo images still work via a local mock prediction. Get a key at https://aistudio.google.com/apikey |

Copy `.env.example` to `.env` for local dev if you want to set it via a
file (the app just reads `process.env.GEMINI_API_KEY`, so any method your
shell/host provides works).

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Deploy to Vercel

- **Root Directory:** repo root (the folder containing `package.json`)
- **Framework Preset:** Vite (auto-detected; `vercel.json` also pins this)
- **Build Command:** `vite build` (set in `vercel.json`; leave Vercel's UI field on default)
- **Output Directory:** `dist`
- **Install Command:** `npm install` (default)
- **Serverless Function:** `api/index.ts` — Vercel auto-detects this and builds it as a Node function. `vercel.json` rewrites all `/api/*` requests to it, so the same Express routes (`/api/health`, `/api/demo-images`, `/api/predict`, `/api/flower-facts`) work unchanged.
- **Environment Variables:** add `GEMINI_API_KEY` in Project Settings → Environment Variables (all environments).

Steps:
```bash
npm install -g vercel   # if you don't have it
vercel                  # first deploy, follow prompts — root directory = this folder
vercel --prod           # promote to production
```
Or connect the GitHub repo in the Vercel dashboard — it reads
`vercel.json` automatically and deploys on every push.

## Deploy to Render

- **Root Directory:** repo root (the folder containing `package.json`)
- **Environment:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Node Version:** 20.x (set via `NODE_VERSION` in `render.yaml`, or the Render dashboard)
- **Environment Variables:** add `GEMINI_API_KEY` in the Render dashboard (marked `sync: false` in `render.yaml`, so Render prompts you to fill it in rather than committing it)

`render.yaml` (Render "Blueprint") is already configured — in the Render
dashboard choose **New → Blueprint**, point it at this repo, and it reads
`render.yaml` and sets everything up. Or configure a plain **New → Web
Service** manually with the settings above.

`npm run build` does two things:
1. `vite build` → builds the frontend into `dist/` (including `public/flowers` → `dist/flowers`)
2. `esbuild` → bundles `server/index.ts` into `dist/server.cjs`

`npm start` runs `node dist/server.cjs`, which serves the built frontend and
mounts the same `/api/*` routes, listening on `process.env.PORT` (Render
sets this automatically).

## How the two deploy targets share code

Both platforms run the exact same Express routes from `server/app.ts`:
- **Render** imports it into `server/index.ts`, which adds `app.listen()` and static file serving — a normal long-running Node server.
- **Vercel** imports it into `api/index.ts` with no `listen()` call — Vercel's Node runtime invokes the Express app directly as a request handler per invocation.

Route changes only need to be made once, in `server/app.ts`.
