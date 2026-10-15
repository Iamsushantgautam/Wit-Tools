# Coding Rules & Conventions

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| **Tool folder** | PascalCase | `ImgToPdf/`, `PdfCompressor/` |
| **Component file** | PascalCase `.jsx` | `BgRemover.jsx`, `Button.jsx` |
| **CSS file** | Same name as component | `BgRemover.css`, `Button.css` |
| **Data file** | camelCase `.json` or `.js/.jsx` | `internalTools.json`, `toolsData.jsx` |
| **Hook file** | camelCase with `use` prefix | `usePWAInstall.js` |
| **Config file** | lowercase with dots | `vite.config.js`, `eslint.config.js` |

## Component Patterns

### Tool Component Pattern
Every tool follows this exact structure:

```jsx
import React, { useState } from 'react';
import Upload from '../../components/Common/Upload/Upload';  // if file-based
import './ToolName.css';

const ToolName = () => {
    // State declarations
    const [file, setFile] = useState(null);
    
    // Handler functions
    const handleUpload = (selectedFile) => { /* ... */ };
    const handleProcess = () => { /* ... */ };
    const handleDownload = () => { /* ... */ };
    
    return (
        <div className="tool-container tool-name-container">
            <div className="tool-header-card">
                <h2>Tool Title</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Subtitle</p>
            </div>
            
            <div className={`tool-card ${!result ? 'no-hover-arrow' : ''}`}>
                {/* Upload state or Result state */}
            </div>
        </div>
    );
};

export default ToolName;
```

### Page Component Pattern
```jsx
import React from 'react';
import './PageName.css';

const PageName = () => {
    return (
        <div className="tool-container page-name-container">
            {/* Page content */}
        </div>
    );
};

export default PageName;
```

## CSS Conventions

- **One CSS file per component** — co-located in the same folder
- **Global design tokens** defined in `src/index.css` using CSS custom properties
- **Class naming** — BEM-inspired but not strict: `.tool-card`, `.tool-card-content`, `.btn-primary`
- **No CSS modules** — plain CSS imports
- **No Tailwind** — Vanilla CSS only
- **Responsive** — Mobile-first with `@media (max-width: 640px)` breakpoint
- **Color usage** — Always use CSS variables: `var(--primary)`, `var(--text-muted)`, etc.
- **No shadows** — Design uses flat/minimal shadow-free aesthetic
- **Hidden scrollbars** — Global rule hides all scrollbars

## Design Token Variables (from `index.css`)

```css
--primary: #e5322d;           /* Brand red */
--primary-hover: #c8231e;
--secondary: #33333b;         /* Dark gray */
--text-main: #47474f;
--text-muted: #707078;
--bg-main: #f5f5fa;           /* Light gray background */
--card-bg: #ffffff;
--border-color: #e2e2e8;
--radius-xs: 8px;
--radius-sm: 16px;
```

## DOs ✅

1. **DO** lazy-load all tool/page components via `React.lazy()`
2. **DO** co-locate CSS with its component (same folder)
3. **DO** use the `Upload` component for file input (not raw `<input type="file">`)
4. **DO** use CSS custom properties from `index.css` for colors/spacing
5. **DO** use the `.tool-container` → `.tool-header-card` → `.tool-card` layout hierarchy
6. **DO** use `btn-primary` / `btn-secondary` classes for buttons
7. **DO** add tool metadata to `internalTools.json` when creating a new tool
8. **DO** add the route to `App.jsx` and nav data to `navData.jsx`
9. **DO** process files client-side whenever possible (no server uploads)
10. **DO** provide download functionality using `URL.createObjectURL()` + anchor click
11. **DO** handle loading states with a spinner/message
12. **DO** use `import.meta.env.VITE_*` for environment variables

## DON'Ts ❌

1. **DON'T** add Tailwind CSS or any CSS framework
2. **DON'T** use CSS modules or styled-components
3. **DON'T** use `useContext` or Redux — no global state management exists
4. **DON'T** create backend API endpoints — this is a static SPA
5. **DON'T** upload user files to any server (except remove.bg for BG Remover)
6. **DON'T** use box-shadow on tool cards (flat design is intentional)
7. **DON'T** forget to add the lazy import in `App.jsx` for new tools
8. **DON'T** hardcode colors — use CSS variables
9. **DON'T** add dependencies without considering the chunk strategy in `vite.config.js`
10. **DON'T** use TypeScript — this is a JS/JSX project

## How to Add a New Tool (Step-by-Step)

### Step 1: Create the Tool Folder
```
src/Tools/NewToolName/
├── NewToolName.jsx
└── NewToolName.css
```

### Step 2: Build the Component
Follow the Tool Component Pattern above. Use `Upload` for file input, `btn-primary`/`btn-secondary` for buttons.

### Step 3: Register the Tool in Data
Add entry to `src/data/internalTools.json`:
```json
{
  "id": "new-tool-name",
  "title": "New Tool Name",
  "desc": "Short description of what it does.",
  "icon": "IconImage",
  "category": "Image Tools",
  "color": "icon-cyan",
  "tags": ["Tag1", "Tag2"],
  "isVisible": true
}
```

### Step 4: Add Route in `App.jsx`
```jsx
// Add lazy import at top
const NewToolName = lazy(() => import('./Tools/NewToolName/NewToolName'));

// Add route inside <Routes>
<Route path="/new-tool-name" element={<NewToolName />} />
```

### Step 5: Add to Navigation
Update `src/components/Navbar/navData.jsx`:
- Add to the appropriate category in `NAV_TOOL_CATEGORIES`
- It will auto-appear in mobile accordions and footer

### Step 6: Update Documentation
- Update `/docs/FOLDER_STRUCTURE.md`
- Update `/docs/API_DOCS.md` (route table)
- Update `/docs/COMPONENTS.md` (if new reusable components)
- Update `/docs/CHANGELOG.md`
- Update `/docs/LLM_CONTEXT.md`

## Error Handling Rules

- Use `try/catch` around all async operations
- Show user-friendly `alert()` messages for errors (current pattern)
- Log errors to `console.error()` for debugging
- Handle specific API error codes (402, 401, 403) with meaningful messages

## State Management

- **No global state** — each tool is self-contained with local `useState`
- **No Context API** usage — data flows via props and imports
- **Route params** via `useSearchParams` (e.g., ComingSoon page)
- **Tool data** is imported directly from `toolsData.jsx`

## Import Order Convention

```jsx
// 1. React
import React, { useState, useRef } from 'react';
// 2. Third-party libraries
import { QRCodeCanvas } from 'qrcode.react';
// 3. Components
import Upload from '../../components/Common/Upload/Upload';
// 4. Styles
import './ToolName.css';
```
