# Components Reference

## Shared / Reusable Components

### 1. `Button` — Universal Button
- **Path:** `src/components/Common/Button/Button.jsx`
- **Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'danger' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `to` | `string` | — | React Router `<Link>` path |
| `href` | `string` | — | External `<a>` URL |
| `icon` | `ReactNode` | — | Left icon |
| `iconRight` | `ReactNode` | — | Right icon |
| `fullWidth` | `boolean` | `false` | 100% width |
| `disabled` | `boolean` | `false` | Disabled state |
| `type` | `string` | `'button'` | HTML button type |
| `onClick` | `function` | — | Click handler |
| `className` | `string` | `''` | Extra CSS classes |

- **Used In:** Home, ToolCard, ComingSoon, tool pages
- **Notes:** Renders as `<button>`, `<Link>`, or `<a>` depending on props

---

### 2. `Upload` — Drag & Drop File Upload
- **Path:** `src/components/Common/Upload/Upload.jsx`
- **Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `'file-upload-input'` | Input element ID |
| `accept` | `string` | — | File type filter (e.g., `'image/*'`, `'.pdf'`) |
| `onUpload` | `function` | — | Callback with selected file(s) |
| `title` | `string` | `'Select files'` | Button text |
| `subtitle` | `string` | — | Subtitle text |
| `limitText` | `string` | `''` | Limit info shown below |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `acceptFormat` | `string` | — | Custom format label |

- **Used In:** BgRemover, ImgToPdf, ImgCompressor, PdfCompressor, all file-based tools
- **Features:** Drag-over highlight, smart button/hint text generation

---

### 3. `ToolCard` — Homepage Tool Card
- **Path:** `src/components/Common/ToolCard/ToolCard.jsx`
- **Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tool` | `object` | — | Tool data object (from `toolsData.jsx`) |
| `className` | `string` | `''` | Extra CSS classes |

- **Used In:** Home.jsx (tool grid)
- **Features:** Auto-fetches favicons for external tools (Google → domain → DuckDuckGo fallback chain), renders as `<Link>`, `<a>`, or `<div>` based on tool type

---

### 4. `ToolHeader` — Tool Page Header
- **Path:** `src/components/ToolHeader/ToolHeader.jsx`
- **Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Tool page title |
| `subtitle` | `string` | — | Description subtitle |
| `theme` | `'light' \| string` | `'light'` | Theme variant |

- **Used In:** Various tool pages for consistent headers

---

### 5. `CustomSelect` — Styled Dropdown
- **Path:** `src/components/Common/CustomSelect/CustomSelect.jsx`
- **Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `Array<{value, label}>` | `[]` | Dropdown options |
| `value` | `any` | — | Selected value |
| `onChange` | `function` | — | Change handler (receives `{ target: { name, value } }`) |
| `name` | `string` | — | Field name |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `className` | `string` | `''` | Extra CSS classes |

- **Used In:** Tool pages needing format/quality selectors
- **Features:** Click-outside-to-close, custom chevron icon

---

### 6. `CompareModal` — Before/After Image Comparison
- **Path:** `src/components/CompareModal/CompareModal.jsx`
- **Props:**

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Modal visibility |
| `onClose` | `function` | Close handler |
| `fileName` | `string` | File name display |
| `originalUrl` | `string` | Original image URL |
| `originalSizeText` | `string` | Original size (e.g., "2.4 MB") |
| `convertedUrl` | `string` | Converted image URL |
| `convertedSizeText` | `string` | Converted size (e.g., "0.8 MB") |

- **Used In:** PngToWebp, ImgCompressor
- **Features:** Slider overlay mode, side-by-side mode, savings % calculation, download button

---

### 7. `ScrollToTop` — Route Change Scroll Reset
- **Path:** `src/components/ScrollToTop.jsx`
- **Props:** None
- **Used In:** App.jsx (always rendered)
- **Behavior:** Scrolls window to top on every route change

---

### 8. `Navbar` — Main Navigation
- **Path:** `src/components/Navbar/Navbar.jsx`
- **Props:** None (data from `navData.jsx`)
- **Features:** Desktop mega-menu dropdowns, mobile hamburger with accordion sections, founder avatar link

---

### 9. `Footer` — Site Footer
- **Path:** `src/components/Footer/Footer.jsx`
- **Props:** None (data from `navData.jsx`)
- **Features:** Social links (GitHub, LinkedIn, Portfolio), PWA install button, dynamic tool category links

---

### 10. `ComingSoon` — Placeholder Page
- **Path:** `src/components/ComingSoon/ComingSoon.jsx`
- **Props:** None (reads `?tool=` query param)
- **Used In:** Route `/coming-soon?tool=ToolName`
- **Features:** Email notification form (client-only, no backend)

---

### 11. `NotFound` — 404 Page
- **Path:** `src/components/NotFound/NotFound.jsx`
- **Props:** None
- **Used In:** Catch-all `*` route

---

### 12. `Icons` — SVG Icon Library
- **Path:** `src/components/Common/Icons.jsx`
- **Exports:** `IconMerge`, `IconSplit`, `IconCompress`, `IconDoc`, `IconPdf`, `IconImage`, `IconPageNum`, `IconWatermark`, `IconLock`, `IconCrop`, `IconQr`, `IconCloud`, `IconVideo`, `UserIcon`, `WitcetIcon`, `ScreelyIcon`, `IconShopify`/`ShopifyIcon`, `ChromeIcon`, `IconChatgpt`/`ChatGPTIcon`
- **Used In:** navData.jsx, toolsData.jsx, Navbar, Footer, ToolCards

---

### 13. `ChatGPTCodeCard` — Prompt Card
- **Path:** `src/chatgpt-tools/ChatGPTCodeCard.jsx`
- **Props:**

| Prop | Type | Description |
|------|------|-------------|
| `item` | `object` | ChatGPT code data object |
| `onSelect` | `function` | Card click handler |
| `onCopyPrompt` | `function` | Copy feedback handler |

- **Used In:** ChatGPTTools.jsx

---

## Custom Hooks

### `usePWAInstall`
- **Path:** `src/hooks/usePWAInstall.js`
- **Returns:** `{ canInstall: boolean, installApp: function }`
- **Used In:** Footer.jsx
- **Purpose:** Captures browser `beforeinstallprompt` event, provides install trigger
