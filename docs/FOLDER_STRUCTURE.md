# Folder Structure

```
wit-tools/
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Template for env vars
├── .gitignore                    # Git ignore rules
├── eslint.config.js              # ESLint 9 flat config (React Hooks + Refresh)
├── index.html                    # SPA entry point with SEO meta tags & PWA config
├── package.json                  # Dependencies and npm scripts
├── vercel.json                   # Vercel SPA rewrites (all routes → index.html)
├── vite.config.js                # Vite config: React plugin, PWA, manual chunks
├── README.md                     # Project readme
│
├── public/                       # Static assets served at root
│   ├── favicon.svg               # App icon (SVG, used everywhere)
│   ├── man.png                   # Founder profile photo
│   ├── gif.worker.js             # GIF encoding web worker
│   ├── pdf.worker.min.mjs        # PDF.js rendering web worker
│   ├── robots.txt                # Search engine crawl rules
│   ├── sitemap.xml               # XML sitemap for SEO
│   └── previews/                 # OG/social preview images
│
├── docs/                         # Project documentation (this folder)
│
└── src/                          # Application source code
    ├── main.jsx                  # React entry: StrictMode + BrowserRouter
    ├── App.jsx                   # Root component: routes, lazy loading, layout
    ├── App.css                   # App-level styles, fonts, spinner
    ├── index.css                 # Global design tokens, utility classes, drop-zone
    │
    ├── Home/                     # Landing page
    │   ├── Home.jsx              # Hero section, search bar, tool grid by category
    │   └── Home.css              # Home page styles
    │
    ├── Tools/                    # All 19 tool implementations
    │   ├── BgRemover/            # AI background removal (remove.bg API)
    │   │   ├── BgRemover.jsx
    │   │   └── BgRemover.css
    │   ├── GooglDriveLinkConvertTODownoaldable/  # Google Drive direct link converter
    │   │   ├── GooglDriveLinkConvertTODownoaldable.jsx
    │   │   └── GooglDriveLinkConvertTODownoaldable.css
    │   ├── ImgCompressor/        # Image file size compression
    │   │   ├── ImgCompressor.jsx
    │   │   └── ImgCompressor.css
    │   ├── ImgConverter/         # Image format conversion (JPG, PNG, WebP, etc.)
    │   │   ├── ImgConverter.jsx
    │   │   └── ImgConverter.css
    │   ├── ImgOptimizer/         # Combined resize + compress
    │   │   ├── ImgOptimizer.jsx
    │   │   └── ImgOptimizer.css
    │   ├── ImgResizer/           # Custom dimension image resizing
    │   │   ├── ImgResizer.jsx
    │   │   └── ImgResizer.css
    │   ├── ImgToPdf/             # Convert images to PDF document
    │   │   ├── ImgToPdf.jsx
    │   │   └── ImgToPdf.css
    │   ├── PassportPhotoMaker/   # Passport/profile photo cropper
    │   │   ├── PassportPhotoMaker.jsx
    │   │   └── PassportPhotoMaker.css
    │   ├── PdfCompressor/        # Compress PDF file size
    │   │   ├── PdfCompressor.jsx
    │   │   └── PdfCompressor.css
    │   ├── PdfMerge/             # Merge multiple PDFs into one
    │   │   ├── PdfMerge.jsx
    │   │   └── PdfMerge.css
    │   ├── PdfPageNumber/        # Add page numbers to PDF
    │   │   ├── PdfPageNumber.jsx
    │   │   └── PdfPageNumber.css
    │   ├── PdfSecurity/          # Lock/unlock PDF with password
    │   │   ├── PdfSecurity.jsx
    │   │   └── PdfSecurity.css
    │   ├── PdfSplit/             # Split PDF into parts
    │   │   ├── PdfSplit.jsx
    │   │   └── PdfSplit.css
    │   ├── PdfToImg/             # Convert PDF pages to images
    │   │   ├── PdfToImg.jsx
    │   │   └── PdfToImg.css
    │   ├── PngToWebp/            # Bulk PNG to WebP converter with comparison
    │   │   ├── PngToWebp.jsx
    │   │   └── PngToWebp.css
    │   ├── QrGenerator/          # QR code generator
    │   │   ├── QrGenerator.jsx
    │   │   └── QrGenerator.css
    │   ├── SvgGenerator/         # SVG wave & pattern studio
    │   │   ├── SvgGenerator.jsx
    │   │   └── SvgGenerator.css
    │   ├── Watermark/            # Add watermark to images/PDFs
    │   │   ├── Watermark.jsx
    │   │   └── Watermark.css
    │   └── YTVideoScreenshot/    # Capture video frames at intervals
    │       ├── YTVideoScreenshot.jsx
    │       └── YTVideoScreenshot.css
    │
    ├── components/               # Shared/reusable components
    │   ├── ScrollToTop.jsx       # Scrolls to top on route change
    │   ├── Navbar/               # Top navigation bar
    │   │   ├── Navbar.jsx        # Desktop mega-menu + mobile accordion nav
    │   │   ├── Navbar.css
    │   │   └── navData.jsx       # Navigation links, dropdowns, categories data
    │   ├── Footer/               # Site footer
    │   │   ├── Footer.jsx        # Links, social icons, PWA install button
    │   │   └── Footer.css
    │   ├── ToolHeader/           # Tool page header (title + subtitle)
    │   │   ├── ToolHeader.jsx
    │   │   └── ToolHeader.css
    │   ├── CompareModal/         # Before/after image comparison modal
    │   │   ├── CompareModal.jsx  # Slider + side-by-side compare modes
    │   │   └── CompareModal.css
    │   ├── ComingSoon/           # Placeholder for tools under development
    │   │   ├── ComingSoon.jsx
    │   │   └── ComingSoon.css
    │   ├── NotFound/             # 404 error page
    │   │   ├── NotFound.jsx
    │   │   └── NotFound.css
    │   └── Common/               # Primitive reusable components
    │       ├── Icons.jsx         # All SVG icon components (19 icons)
    │       ├── Button/           # Universal button (link, anchor, or button)
    │       │   ├── Button.jsx
    │       │   └── Button.css
    │       ├── ToolCard/         # Tool card for homepage grid
    │       │   ├── ToolCard.jsx  # Handles internal links, external links, favicon
    │       │   └── ToolCard.css
    │       ├── Upload/           # Drag-and-drop file upload zone
    │       │   ├── Upload.jsx
    │       │   └── Upload.css
    │       └── CustomSelect/     # Custom dropdown select
    │           ├── CustomSelect.jsx
    │           └── CustomSelect.css
    │
    ├── data/                     # Tool catalog and reference data
    │   ├── toolsData.jsx         # Aggregates all JSON → enriches with icon components
    │   ├── internalTools.json    # 20 internal tool definitions (id, title, desc, icon, category)
    │   ├── shopifyTools.json     # 2 Shopify tool definitions
    │   ├── myOwnWebsites.json   # 2 external website links
    │   ├── chromeExtensions.json # Chrome extension recommendations
    │   ├── UsefullChromeExtensions.json  # More useful extensions
    │   └── usefulWebsites.json   # External website links by category
    │
    ├── hooks/                    # Custom React hooks
    │   └── usePWAInstall.js      # Captures browser install prompt for PWA
    │
    ├── pages/                    # Static/informational pages
    │   ├── About/                # About the platform
    │   │   ├── About.jsx
    │   │   └── About.css
    │   ├── Contact/              # Contact form (FormSubmit.co)
    │   │   ├── Contact.jsx
    │   │   └── Contact.css
    │   ├── FAQ/                  # Frequently asked questions
    │   │   ├── Faq.jsx
    │   │   └── Faq.css
    │   ├── Feedback/             # User feedback form
    │   │   └── Feedback.jsx
    │   ├── Founder/              # Developer profile/portfolio
    │   │   ├── Founder.jsx
    │   │   └── Founder.css
    │   ├── Legal/                # Privacy Policy & Terms of Service
    │   │   ├── PrivacyPolicy.jsx
    │   │   ├── Terms.jsx
    │   │   └── Legal.css
    │   └── Shopify/              # Shopify developer resources
    │       ├── ShopifyDev.jsx    # AI prompts for Shopify section devs
    │       ├── ShopifyDev.css
    │       ├── ShopifyApps.jsx   # Curated Shopify apps directory
    │       └── ShopifyApps.css
    │
    ├── chatgpt-tools/            # ChatGPT Secret Codes feature
    │   ├── ChatGPTTools.jsx      # Main page: search, filter, grid of codes
    │   ├── ChatGPTCodeCard.jsx   # Individual code/prompt card component
    │   ├── ChatGPTTools.css      # Styles for the ChatGPT section
    │   ├── chatgptData.js        # All ChatGPT codes/prompts data (~130KB)
    │   └── preview-chatgpt-images/  # Preview images for visual prompts
    │
    ├── WitPin/                   # WitPin browser extension landing page
    │   ├── WitPin.jsx            # Full product page with features, install guide
    │   └── WitPin.css
    │
    └── assets/                   # Static assets
        └── WitPin-img/           # WitPin preview images
```
