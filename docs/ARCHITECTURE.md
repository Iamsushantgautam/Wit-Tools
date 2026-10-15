# Architecture

## System Architecture Diagram

```mermaid
graph TB
    subgraph Client["Browser (Client-Side SPA)"]
        UI["React 19 UI Layer"]
        Router["React Router v7"]
        Tools["Tool Components<br/>19 tools"]
        Components["Shared Components<br/>Button, Upload, ToolCard, etc."]
        Hooks["Custom Hooks<br/>usePWAInstall"]
        Data["Data Layer<br/>JSON configs + toolsData.jsx"]
        PWA["PWA Service Worker<br/>Workbox"]
    end

    subgraph External["External Services"]
        RemoveBG["remove.bg API<br/>(BG Remover only)"]
        FormSubmit["FormSubmit.co<br/>(Contact form)"]
        Vercel["Vercel Hosting<br/>+ Analytics"]
        Fonts["Google Fonts"]
    end

    UI --> Router
    Router --> Tools
    Router --> Components
    Tools --> Components
    Tools --> Data
    UI --> Hooks
    Tools -->|"axios POST"| RemoveBG
    UI -->|"Form POST"| FormSubmit
    Client -->|"Deployed to"| Vercel
    Client -->|"Cached"| Fonts
    PWA -->|"Offline caching"| Client
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Tool as Tool Component
    participant Lib as JS Library (pdf-lib, jspdf, etc.)
    participant API as External API (remove.bg)

    User->>Browser: Upload file / Enter data
    Browser->>Tool: File/input state update
    
    alt Client-side processing (most tools)
        Tool->>Lib: Process file in memory
        Lib-->>Tool: Return processed result
        Tool-->>Browser: Display result + download link
    end

    alt API-based processing (BG Remover only)
        Tool->>API: POST image via axios
        API-->>Tool: Return processed blob
        Tool-->>Browser: Display result + download link
    end

    User->>Browser: Click download
    Browser-->>User: Save file locally
```

## Auth Flow

**There is no authentication in this project.** All tools are free and open to everyone. The only "auth" is the `VITE_REMOVE_BG_API_KEY` env variable used server-side for the remove.bg API calls.

## Folder Responsibility Map

| Folder | Responsibility |
|--------|---------------|
| `/src/App.jsx` | Root component, route definitions, lazy loading |
| `/src/main.jsx` | React entry point, BrowserRouter setup |
| `/src/Home/` | Landing page with search, category filters, tool grid |
| `/src/Tools/` | All 19 tool implementations (each has `.jsx` + `.css`) |
| `/src/components/` | Reusable UI components (Navbar, Footer, Button, etc.) |
| `/src/components/Common/` | Shared primitives (Button, Upload, ToolCard, CustomSelect, Icons) |
| `/src/data/` | Tool catalog data (JSON configs + toolsData.jsx aggregator) |
| `/src/hooks/` | Custom React hooks (PWA install) |
| `/src/pages/` | Static/info pages (About, Contact, FAQ, Legal, etc.) |
| `/src/chatgpt-tools/` | ChatGPT Secret Codes feature (prompt library) |
| `/src/WitPin/` | WitPin browser extension landing page |
| `/src/assets/` | Static images/assets |
| `/public/` | Favicon, workers, sitemap, robots.txt, preview images |
| `/docs/` | This documentation |

## Build & Chunk Strategy

Vite's Rollup config uses `manualChunks` to split vendor code:

| Chunk Name | Contents |
|-----------|----------|
| `vendor-core` | react, react-dom, react-router-dom, scheduler |
| `vendor-pdfjs` | pdfjs-dist |
| `vendor-jspdf` | jspdf |
| `vendor-pdflib` | pdf-lib |
| `vendor-media` | browser-image-compression, react-image-crop, jszip, gif.js, gifenc |
| `vendor-utils` | All other node_modules |

All tool pages are **lazy-loaded** via `React.lazy()` + `Suspense` for fast initial load.
