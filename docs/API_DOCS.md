# API Documentation

## Overview

Wit Tools is primarily a **client-side application**. It has **no custom backend API**. All file processing happens in the browser using JavaScript libraries. There are only two external API integrations:

---

## External API Calls

### 1. remove.bg — Background Removal

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `https://api.remove.bg/v1.0/removebg` |
| **Used By** | `src/Tools/BgRemover/BgRemover.jsx` |
| **Purpose** | Remove background from uploaded image |
| **Auth** | `X-Api-Key` header (from `VITE_REMOVE_BG_API_KEY` env var) |
| **Input** | `FormData` with `image_file` (blob) and `size: 'auto'` |
| **Output** | Image blob (PNG with transparent background) |
| **Error Codes** | `402` = credits exhausted, `401/403` = invalid API key |

### 2. FormSubmit.co — Contact/Feedback Forms

| Field | Value |
|-------|-------|
| **Method** | `POST` |
| **URL** | `https://formsubmit.co/<email-hash>` |
| **Used By** | `src/pages/Contact/Contact.jsx`, `src/pages/Feedback/Feedback.jsx` |
| **Purpose** | Submit contact/feedback form data via email |
| **Input** | Form fields (name, email, message) |
| **Output** | Redirect / success response |

---

## Client-Side Routes (All Pages)

### Tool Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with tool grid & search |
| `/img-to-pdf` | `ImgToPdf` | Convert images to PDF |
| `/img-resizer` | `ImgResizer` | Resize images to custom dimensions |
| `/img-optimizer` | `ImgOptimizer` | Resize + compress images in one step |
| `/img-compressor` | `ImgCompressor` | Compress image file size |
| `/img-converter` | `ImgConverter` | Convert image format (JPG, PNG, WebP) |
| `/png-to-webp` | `PngToWebp` | Bulk PNG → WebP with comparison |
| `/bg-remover` | `BgRemover` | AI background removal (remove.bg) |
| `/passport-photo-maker` | `PassportPhotoMaker` | Passport/profile photo maker |
| `/pdf-compressor` | `PdfCompressor` | Compress PDF file size |
| `/pdf-merge` | `PdfMerge` | Merge multiple PDFs |
| `/pdf-split` | `PdfSplit` | Split PDF into parts |
| `/pdf-page-number` | `PdfPageNumber` | Add page numbers to PDF |
| `/pdf-security` | `PdfSecurity` | Lock/unlock PDF with password |
| `/pdf-to-img` | `PdfToImg` | Convert PDF pages to images |
| `/watermark` | `Watermark` | Add watermark to images/PDFs |
| `/qr-generator` | `QrGenerator` | Generate QR codes |
| `/yt-screenshot` | `YTVideoScreenshot` | Capture video frame screenshots |
| `/svg-generator` | `SvgGenerator` | SVG wave & pattern studio |
| `/google-drive-downloader` | `GooglDriveLinkConvertTODownoaldable` | Google Drive direct link |

### Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/about` | `About` | About the platform |
| `/founder` | `Founder` | Developer profile |
| `/faq` | `Faq` | FAQ page |
| `/contact` | `Contact` | Contact form |
| `/feedback` | `Feedback` | User feedback form |
| `/coming-soon` | `ComingSoon` | Placeholder for upcoming tools |
| `/privacy` | `PrivacyPolicy` | Privacy policy |
| `/terms` | `Terms` | Terms of service |
| `/shopify-dev` | `ShopifyDev` | Shopify AI prompts |
| `/shopify-apps` | `ShopifyApps` | Shopify apps directory |
| `/chatgpt-tools` | `ChatGPTTools` | ChatGPT secret codes |
| `/chatgpt-secret-codes` | `ChatGPTTools` | Alias for chatgpt-tools |
| `/witpin` | `WitPin` | WitPin extension landing page |
| `*` | `NotFound` | 404 page |

---

## External Services Used

| Service | Purpose | Config Location |
|---------|---------|----------------|
| **Vercel** | Hosting + Analytics | `vercel.json`, `@vercel/analytics` in `App.jsx` |
| **remove.bg** | Background removal API | `.env` → `VITE_REMOVE_BG_API_KEY` |
| **FormSubmit.co** | Email form submissions | Hardcoded in Contact/Feedback components |
| **Google Fonts** | Poppins + Inter fonts | `App.css` import |
| **Google Favicons** | External tool favicons | `ToolCard.jsx` dynamic URL |
