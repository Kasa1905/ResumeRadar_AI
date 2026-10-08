# ResumeRadar AI — Landing Page & Web Client

A modern, startup-quality landing page and interactive profile exploration deck built for **Kasata** and its open-source product **ResumeRadar AI**.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)

---

## Overview

This web client presents **ResumeRadar AI** as a developer/AI product from **Kasata**. It includes:
- **Hero Section**: Tagline *"AI-powered insights for developer profiles"*, dynamic radar background visualization, and direct CTAs.
- **Interactive Product Dashboard**: Live GitHub profile analysis playground with preset profiles, repository quality audits, technology occurrence bars, and LinkedIn structure preview.
- **Built-in Capabilities**: Faithfully describes the 5 core features in the FastAPI repository (GitHub API extraction, Languages API + README heuristic tech detection, 6-point project quality checklist, optional LinkedIn schema, and AI-assisted profile synthesis).
- **Workflow Lifecycle**: Step-by-step 4-stage guide explaining how ResumeRadar AI works.
- **Developer / API Reference**: Interactive code snippets for cURL, Python (`httpx`), and Node.js (`fetch`) with copy buttons and documentation links.
- **Open Source Showcase**: Prominently features the MIT License, 41/41 passing pytest tests, repository clone command, and GitHub star CTA.
- **About Kasata**: Professional, concise introduction to Kasata without fabricated numbers or marketing fluff.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom glassmorphism and radar keyframes
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand marks
- **Font**: Inter & JetBrains Mono via `next/font/google`

---

## Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts         # Proxy to FastAPI backend with graceful fallback
│   │   ├── globals.css              # Dark theme tokens, glassmorphism, radar animations
│   │   ├── layout.tsx               # SEO, OpenGraph, Twitter Cards, Google Fonts
│   │   └── page.tsx                 # Main landing page component assembly
│   ├── components/
│   │   ├── AboutKasata.tsx          # Kasata company & philosophy section
│   │   ├── DeveloperApi.tsx         # Interactive API snippets (cURL, Python, TS)
│   │   ├── Features.tsx             # 5 core features grounded in backend repo
│   │   ├── Footer.tsx               # Comprehensive footer with links and MIT License
│   │   ├── Hero.tsx                 # Animated radar sweeps, headline, and metrics teaser
│   │   ├── HowItWorks.tsx           # 4-stage workflow cards
│   │   ├── Icons.tsx                # Accessible SVG icons (GitHub, LinkedIn)
│   │   ├── Navbar.tsx               # Sticky glassmorphic navbar with mobile menu
│   │   ├── OpenSource.tsx           # Open source credentials, clone snippet, star CTA
│   │   └── ProductDashboard.tsx     # Realistic interactive dashboard mockup
│   └── lib/
│       ├── sample-data.ts           # Verified model data matching models.py
│       └── types.ts                 # TypeScript types mirroring FastAPI models
├── .env.example                     # Environment template
├── .env.local                       # Local environment configuration
├── next.config.ts                   # Next.js & Turbopack configuration
├── package.json
└── tsconfig.json
```

---

## Quick Start (Local Development)

### Prerequisites

- **Node.js**: v18.18+ or v20+ (Node v26+ supported)
- **npm** or **pnpm**
- **Python**: 3.12+ (to run the companion FastAPI backend)

### 1. Install Dependencies

```bash
cd web
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Default variables:
```ini
# URL of the ResumeRadar AI FastAPI backend
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
RESUMERADAR_API_URL=http://127.0.0.1:8000
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Running with the FastAPI Backend

To test live analysis with real GitHub profiles:

1. In the repository root, start the FastAPI server:
   ```bash
   # From root of ResumeRadar AI
   source venv/bin/activate
   uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```

2. In a separate terminal, start the Next.js frontend:
   ```bash
   cd web
   npm run dev
   ```

3. Navigate to [http://localhost:3000](http://localhost:3000). The interactive dashboard will automatically route requests to `http://127.0.0.1:8000/analyze`. If the backend is not running, the dashboard automatically provides verified sample data so visitors can explore all dashboard tabs and features.

---

## Production Build & Deployment

### Build for Production

```bash
cd web
npm run build
npm start
```

### Deploying to kasata.me (Vercel Custom Domain)

1. **Push to GitHub**:
   Ensure all changes are pushed to your remote repository:
   ```bash
   git push origin main
   ```

2. **Connect Project on Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Import `Kasa1905/ResumeRadar_AI`.
   - Set **Root Directory** to `web`.
   - Framework preset will automatically detect **Next.js**.
   - (Optional) Add environment variables:
     - `NEXT_PUBLIC_API_URL`: Hosted FastAPI backend URL (if deployed) or leave default to run with built-in route handlers.

3. **Configure Custom Domain (`kasata.me`)**:
   - In your Vercel project dashboard, go to **Settings** &rarr; **Domains**.
   - Add `kasata.me` and `www.kasata.me`.
   - Point your DNS records (in Cloudflare, Namecheap, GoDaddy, etc.) to Vercel:
     | Type | Name | Value | Proxy status |
     |---|---|---|---|
     | `A` | `@` | `76.76.21.21` | DNS only (or Cloudflare Full SSL) |
     | `CNAME` | `www` | `cname.vercel-dns.com` | DNS only |
   - Vercel will automatically generate and renew free SSL certificates for `kasata.me`.

4. **Email Routing (`kasata@kasta.me` / `kasata@kasata.me`)**:
   - In Cloudflare DNS under **Email Routing** (or your registrar's email forwarding):
     - Create custom address: `kasata@kasta.me` (or `kasata@kasata.me`).
     - Route to your primary personal email inbox (e.g., your personal Gmail/Outlook).
     - Verify destination email.
     - Outgoing & incoming messages are now tied directly to your verified startup identity!

---

## License

This project is licensed under the [MIT License](../LICENSE). Created by **Kasata** and maintained by **Kaushik Sambe** ([@Kasa1905](https://github.com/Kasa1905)).
