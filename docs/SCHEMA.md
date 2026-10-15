# Database & Schema

## Overview

**Wit Tools has no database.** All data is either:
- Static JSON files in `src/data/`
- Browser-local (files processed in memory, never persisted server-side)
- LocalStorage (WitPin extension stores bookmarks in `chrome.storage`)

---

## Data Schema: Tool Definitions

All tools are defined as JSON objects in data files and aggregated by `src/data/toolsData.jsx`.

### Internal Tool Schema (`internalTools.json`)

```json
{
  "id": "img-to-pdf",           // URL slug, used as route path
  "title": "Image to PDF",      // Display name
  "desc": "Convert images...",  // Short description
  "icon": "IconImage",          // Icon component key (mapped in toolsData.jsx)
  "category": "Image Tools",    // Category grouping
  "color": "icon-yellow",       // CSS class for icon color
  "tags": ["PDF", "Convert"],   // Search tags
  "isVisible": true             // Show/hide on homepage
}
```

### External Tool Schema (shopifyTools, chromeExtensions, usefulWebsites, myOwnWebsites)

```json
{
  "id": "witcet",
  "title": "Witcet.online",
  "desc": "Visit our partner site...",
  "category": "My Websites",
  "color": "icon-purple",
  "isExternal": true,           // Opens in new tab
  "url": "https://witcet.online",  // External URL
  "useFavicon": true,           // Fetch favicon from domain
  "faviconDomain": "witcet.online",  // Domain for favicon
  "tags": ["AI", "Resources"],
  "isVisible": true
}
```

### Multi-Button External Tool Schema

```json
{
  "id": "some-tool",
  "title": "Tool Name",
  "desc": "Description",
  "isExternal": true,
  "url": "https://example.com",
  "buttons": [
    { "label": "Visit", "url": "https://example.com", "primary": true },
    { "label": "GitHub", "url": "https://github.com/...", "icon": "github" }
  ]
}
```

---

## Data Sources

| File | Count | Category |
|------|-------|----------|
| `internalTools.json` | 20 tools | Image Tools, PDF Tools, Utility Tools |
| `shopifyTools.json` | 2 tools | Shopify Tools |
| `myOwnWebsites.json` | 2 links | My Websites |
| `chromeExtensions.json` | ~15 items | Chrome Extension |
| `UsefullChromeExtensions.json` | ~15 items | Useful Extensions |
| `usefulWebsites.json` | ~20 items | Design/AI/Developer Websites |

---

## Data Aggregation Flow

```
internalTools.json ─┐
shopifyTools.json ──┤
myOwnWebsites.json ─┤──→ toolsData.jsx ──→ tools[] (enriched with React icon components)
chromeExtensions.json┤                       ↕
usefulWebsites.json ─┘                   HOME_CATEGORY_ORDER[] (display order)
                                              ↓
                                         Home.jsx (renders tool grid)
```

---

## ChatGPT Data Schema (`chatgptData.js`)

```json
{
  "id": "unique-id",
  "code": "/slashcommand",        // The slash command
  "title": "Display Title",
  "shortDesc": "Short description",
  "fullDesc": "Full description",
  "category": "category-id",
  "bestFor": ["tag1", "tag2"],
  "promptTemplate": "Full prompt text...",
  "imageUrl": "/path/to/preview.webp"  // Optional preview image
}
```

Categories are defined in `CHATGPT_CATEGORIES` array with `{ id, name, count }`.

---

## Navigation Data Schema (`navData.jsx`)

### TOP_NAV_LINKS
```js
{ title: "HOME", path: "/", highlight: false }
```

### NAV_TOOL_CATEGORIES
```js
{
  id: "pdf",
  categoryTitle: "PDF TOOLS",
  titleClass: "title-red",
  items: [
    { title: "Merge PDF", path: "/pdf-merge", iconBadgeClass: "badge-red", icon: <IconMerge /> }
  ]
}
```
