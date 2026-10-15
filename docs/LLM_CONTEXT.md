# LLM Context — Wit Tools (Single Source of Truth)

> **Read this file first before making ANY code changes.** Max 500 lines.  
> Last updated: 2026-10-15

---

## 1. Project Purpose

Wit Tools is a **free, client-side web utility suite** for PDF manipulation, image processing, QR codes, and more. All processing happens in the browser — no backend. Hosted on Vercel as a PWA.

**Live:** `https://wittools.vercel.app/`  
**Author:** Sushant Gautam  

---

## 2. Tech Stack

| What | Tech |
|------|------|
| Framework | React 19 + Vite 7 |
| Language | JavaScript (JSX) — **no TypeScript** |
| Routing | React Router DOM v7 |
| Styling | Vanilla CSS (co-located per component) |
| PDF | jspdf, pdf-lib, pdfjs-dist |
| Image | browser-image-compression, react-image-crop, gifenc, gif.js |
| Utils | axios, file-saver, jszip, qrcode.react |
| PWA | vite-plugin-pwa (Workbox) |
| Analytics | @vercel/analytics |
| External API | remove.bg (BG Remover only) |
| Hosting | Vercel |
| Lint | ESLint 9 |

---

## 3. Folder Map

```
src/
├── main.jsx            # Entry: StrictMode + BrowserRouter
├── App.jsx             # Routes + lazy loading (ALL tools lazy-loaded)
├── App.css             # Fonts (Poppins, Inter), spinner
├── index.css           # Design tokens, global utility classes
├── Home/               # Landing page (search, category grid)
├── Tools/              # 19 tool folders (each has .jsx + .css)
│   ├── BgRemover/      ImgCompressor/   ImgConverter/   ImgOptimizer/
│   ├── ImgResizer/     ImgToPdf/        PassportPhotoMaker/
│   ├── PdfCompressor/  PdfMerge/        PdfPageNumber/  PdfSecurity/
│   ├── PdfSplit/       PdfToImg/        PngToWebp/      QrGenerator/
│   ├── SvgGenerator/   Watermark/       YTVideoScreenshot/
│   └── GooglDriveLinkConvertTODownoaldable/
├── components/
│   ├── Navbar/         # Mega-menu desktop + accordion mobile
│   ├── Footer/         # Links, social, PWA install
│   ├── ToolHeader/     # title + subtitle header
│   ├── CompareModal/   # Before/after slider comparison
│   ├── ComingSoon/     # Placeholder page
│   ├── NotFound/       # 404 page
│   ├── ScrollToTop.jsx # Scroll reset on route change
│   └── Common/
│       ├── Icons.jsx   # 19 SVG icon components
│       ├── Button/     # Universal button (link/anchor/button)
│       ├── Upload/     # Drag-and-drop file upload
│       ├── ToolCard/   # Homepage tool card
│       └── CustomSelect/ # Styled dropdown
├── data/               # JSON tool configs + toolsData.jsx aggregator
├── hooks/              # usePWAInstall.js
├── pages/              # About, Contact, FAQ, Feedback, Founder, Legal, Shopify
├── chatgpt-tools/      # ChatGPT slash commands library
└── WitPin/             # Browser extension landing page
```

---

## 4. Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | All routes defined here, lazy imports |
| `src/index.css` | Design tokens (colors, spacing, radii) |
| `src/data/toolsData.jsx` | Aggregates all JSON → enriched tool array |
| `src/data/internalTools.json` | Tool definitions (id, title, desc, icon, category, tags) |
| `src/components/Navbar/navData.jsx` | Nav links, mega-menu categories, mobile accordions |
| `src/components/Common/Icons.jsx` | All SVG icon components |
| `vite.config.js` | PWA config, manual chunk splitting |
| `vercel.json` | SPA rewrite rule |
| `.env` | `VITE_REMOVE_BG_API_KEY` |

---

## 5. All Routes

### Tools
`/img-to-pdf` `/img-resizer` `/img-optimizer` `/img-compressor` `/img-converter` `/png-to-webp` `/bg-remover` `/passport-photo-maker` `/pdf-compressor` `/pdf-merge` `/pdf-split` `/pdf-page-number` `/pdf-security` `/pdf-to-img` `/watermark` `/qr-generator` `/yt-screenshot` `/svg-generator` `/google-drive-downloader`

### Pages
`/` `/about` `/founder` `/faq` `/contact` `/feedback` `/coming-soon` `/privacy` `/terms` `/shopify-dev` `/shopify-apps` `/chatgpt-tools` `/chatgpt-secret-codes` `/witpin` `*` (404)

---

## 6. External APIs

| API | Endpoint | Used By |
|-----|----------|---------|
| remove.bg | `POST https://api.remove.bg/v1.0/removebg` | BgRemover.jsx |
| FormSubmit.co | `POST https://formsubmit.co/<hash>` | Contact.jsx, Feedback.jsx |

---

## 7. Data Schema (Tool Object)

```json
{
  "id": "tool-slug",          // Used as URL path
  "title": "Display Title",
  "desc": "Short description",
  "icon": "IconName",          // Maps to Icons.jsx component
  "category": "Image Tools",   // Group: Image/PDF/Utility/Shopify Tools
  "color": "icon-cyan",        // CSS class
  "tags": ["Tag1", "Tag2"],
  "isVisible": true            // Show on homepage
}
```

External tools add: `isExternal: true`, `url: "https://..."`, optional `buttons: [...]`

---

## 8. Design System

- **Primary color:** `#e5322d` (red)
- **Background:** `#f5f5fa` (light gray)
- **Card bg:** `#ffffff`
- **Text:** `#47474f` (main), `#707078` (muted)
- **Font:** Inter, Poppins
- **No shadows** — flat/minimal design
- **No dark mode**
- **Hidden scrollbars**
- **Responsive breakpoint:** 640px

---

## 9. Component Pattern

Every tool follows:
```
<div className="tool-container">
  <div className="tool-header-card"><h2>Title</h2></div>
  <div className="tool-card">
    {/* Upload → Process → Result → Download */}
  </div>
</div>
```

Key reusable components:
- `Button` — universal (renders as button/link/anchor)
- `Upload` — drag-and-drop file input
- `ToolCard` — homepage card with favicon fallback chain
- `CompareModal` — before/after slider
- `CustomSelect` — styled dropdown
- `ToolHeader` — consistent tool page header

---

## 10. Adding a New Tool (Quick Guide)

1. Create `src/Tools/NewTool/NewTool.jsx` + `NewTool.css`
2. Add entry to `src/data/internalTools.json`
3. Add lazy import + `<Route>` in `src/App.jsx`
4. Add to nav category in `src/components/Navbar/navData.jsx`
5. Update docs: `FOLDER_STRUCTURE.md`, `API_DOCS.md`, `CHANGELOG.md`, this file

---

## 11. Critical Rules

- **No TypeScript** — JSX only
- **No Tailwind** — Vanilla CSS only
- **No global state** — each tool uses local `useState`
- **No backend** — client-side processing only
- **Lazy load** all tools via `React.lazy()`
- **Co-locate** CSS with component
- **Use CSS variables** for all colors
- Use `Upload` component (not raw file input)
- Use `btn-primary`/`btn-secondary` classes
- Files process in browser → download via `URL.createObjectURL()`

---

## 12. Environment

| Variable | Description |
|----------|-------------|
| `VITE_REMOVE_BG_API_KEY` | remove.bg API key (for BG Remover) |

---

## 13. Build & Deploy

```bash
npm run dev      # Dev server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview build
```

Deployed via Vercel. `vercel.json` rewrites all routes to `index.html`.

---

## 14. Doc Files Reference

| Doc | What's Inside |
|-----|--------------|
| `docs/PROJECT_OVERVIEW.md` | Tech stack, setup, env vars |
| `docs/ARCHITECTURE.md` | System diagrams, data flow, folder map |
| `docs/FOLDER_STRUCTURE.md` | Full annotated file tree |
| `docs/API_DOCS.md` | External APIs, all routes |
| `docs/SCHEMA.md` | Data object schemas |
| `docs/COMPONENTS.md` | Reusable components with props |
| `docs/RULES.md` | Coding rules, DOs/DONTs, how-to-add-tool |
| `docs/CHANGELOG.md` | Change tracking |
| `docs/LLM_CONTEXT.md` | This file — single source of truth |
