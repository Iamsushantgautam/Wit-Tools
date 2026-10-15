# AGENT RULES — Wit Tools

## RULE: AUTO-UPDATE DOCS

### Mandatory Documentation Sync

1. **Whenever you create, edit, or delete any code file, you MUST update the relevant file in `/docs/`.**
2. **Never ask to read the whole project again.** Read only `/docs/LLM_CONTEXT.md` for context.
3. If you add a new API or external service call, update `/docs/API_DOCS.md` and `/docs/LLM_CONTEXT.md`.
4. If you add a new component, update `/docs/COMPONENTS.md` and `/docs/FOLDER_STRUCTURE.md`.
5. If you add a new tool, follow the steps in `/docs/RULES.md` → "How to Add a New Tool".
6. If you change data schemas or JSON structures, update `/docs/SCHEMA.md`.
7. **Always update `/docs/CHANGELOG.md`** with the date, file changed, what changed, and why.
8. **Follow `/docs/RULES.md` strictly.** Do not break existing patterns.

---

### Quick Reference

| Need | Read This |
|------|-----------|
| Full project context | `/docs/LLM_CONTEXT.md` |
| Coding patterns & rules | `/docs/RULES.md` |
| All routes & APIs | `/docs/API_DOCS.md` |
| All reusable components | `/docs/COMPONENTS.md` |
| Folder descriptions | `/docs/FOLDER_STRUCTURE.md` |
| Data schemas | `/docs/SCHEMA.md` |
| Architecture diagrams | `/docs/ARCHITECTURE.md` |

---

### Key Constraints

- **No TypeScript** — JSX only
- **No Tailwind** — Vanilla CSS only  
- **No backend** — client-side SPA
- **Lazy-load** all tools via `React.lazy()`
- **Co-locate** CSS with component
- **Use CSS custom properties** for colors
- **No global state** — local `useState` only
- **Process files in browser** — download via `URL.createObjectURL()`
