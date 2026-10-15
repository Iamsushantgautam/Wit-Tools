# Project Overview

## What is Wit Tools?

Wit Tools is a free, fast, and secure all-in-one web utility suite. It provides browser-based tools for PDF manipulation, image processing, QR code generation, background removal, and more. **All processing happens locally in the browser** — no files are uploaded to any server (except Background Remover which uses the remove.bg API). Deployed as a PWA on Vercel.

**Live URL:** `https://wittools.vercel.app/`  
**Author:** Sushant Gautam ([sushant.online](https://sushant.online))

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + Vite 7 |
| **Language** | JavaScript (JSX) |
| **Routing** | React Router DOM v7 |
| **Styling** | Vanilla CSS (per-component CSS files) |
| **PDF Processing** | `jspdf`, `pdf-lib`, `pdfjs-dist` |
| **Image Processing** | `browser-image-compression`, `react-image-crop`, `gifenc`, `gif.js` |
| **Utilities** | `axios`, `file-saver`, `jszip`, `qrcode.react` |
| **PWA** | `vite-plugin-pwa` (Workbox-based) |
| **Analytics** | `@vercel/analytics` |
| **External API** | [remove.bg](https://www.remove.bg/api) (Background Remover only) |
| **Hosting** | Vercel (SPA rewrite via `vercel.json`) |
| **Linting** | ESLint 9 with React Hooks + React Refresh plugins |
| **Build Target** | ES2022 |

---

## How to Run Locally

```bash
# 1. Clone the repository
git clone <repo-url>
cd wit-tools

# 2. Install dependencies
npm install

# 3. Create .env file (copy from .env.example)
cp .env.example .env
# Edit .env and add your remove.bg API key

# 4. Start development server
npm run dev
# App runs at http://localhost:5173

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_REMOVE_BG_API_KEY` | Only for BG Remover | API key from [remove.bg](https://www.remove.bg/api) |

---

## NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start dev server with HMR |
| `build` | `vite build` | Production build |
| `lint` | `eslint .` | Run linter |
| `preview` | `vite preview` | Preview production build |
