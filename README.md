# Ruopu Lin — Personal Website

Personal website & digital garden for Ruopu Lin, an AI Engineer specializing in LLM applications, RAG systems, and AI Agent workflow design.

**Live preview**: `http://localhost:4173` (after `npm run dev`)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + CSS Variables |
| Routing | React Router v6 |
| Content | File-based MDX (static, no CMS) |
| Markdown | react-markdown + remark-gfm + rehype-highlight + rehype-slug |
| i18n | React Context (zh / en, localStorage persisted) |
| Theme | Light / Dark + Accent color cycling (CSS class toggle) |

---

## Project Structure

```
ruopu-lin-website/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│
└── src/
    ├── main.tsx                     # App entry
    ├── App.tsx                      # Route definitions
    ├── index.css                    # CSS variables, prose overrides, scrollbar
    ├── vite-env.d.ts                # Vite type declarations
    │
    ├── content/                     # Static content (file-driven)
    │   ├── blog/                    # 5 technical articles
    │   │   ├── {slug}/
    │   │   │   ├── index.en.mdx     # English markdown
    │   │   │   ├── index.zh.mdx     # Chinese markdown
    │   │   │   └── meta.ts          # Title, date, tags, summary, readingTime
    │   │   └── ...
    │   ├── notes/                   # 5 quick notes
    │   │   └── {slug}/
    │   │       ├── index.en.mdx
    │   │       ├── index.zh.mdx
    │   │       └── meta.ts
    │   └── projects/                # 3 portfolio projects
    │       └── {slug}/
    │           └── meta.ts          # Title, year, description, techStack, highlights...
    │
    ├── lib/
    │   └── content.ts               # Content loader (import.meta.glob scan)
    │
    ├── components/
    │   ├── Layout.tsx               # Fixed left sidebar (desktop) + mobile navbar
    │   ├── LeftSidebar.tsx          # Brand, nav, toggles, about, social
    │   ├── RightSidebar.tsx         # Browse, article meta, TOC (xl only)
    │   ├── Navbar.tsx               # Mobile-only top bar
    │   ├── Footer.tsx               # Site footer
    │   ├── ArticleCard.tsx          # Blog/notes list item
    │   ├── ArticleList.tsx          # Article list container
    │   ├── ArticleDetail.tsx        # Full article view
    │   ├── MarkdownRenderer.tsx     # react-markdown wrapper
    │   ├── ProjectCard.tsx          # Landscape portfolio card
    │   ├── ProjectList.tsx          # Project grid container
    │   ├── ThemeProvider.tsx        # Light/dark + accent context
    │   ├── ThemeToggle.tsx          # Sun/moon button
    │   ├── ColorToggle.tsx          # Accent color cycler
    │   └── LanguageToggle.tsx       # EN / 中文 toggle
    │
    ├── pages/
    │   ├── Home.tsx                 # Landing page (articles + notes + projects)
    │   ├── Blog.tsx / BlogDetail.tsx
    │   ├── Notes.tsx / NoteDetail.tsx
    │   ├── Projects.tsx / ProjectDetail.tsx
    │   └── About.tsx
    │
    ├── i18n/
    │   ├── I18nContext.tsx          # Language context + provider
    │   └── translations.ts          # UI translation strings (zh/en)
    │
    └── types/
        └── index.ts                 # BilingualString, TocItem, AccentColor types
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (listens on 0.0.0.0:4173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Access from another device on the same network:
```
http://<your-ip>:4173
```

---

## How to Add Content

### Add a Blog Post

Create a directory under `src/content/blog/`:

```
src/content/blog/my-new-post/
├── index.en.mdx       # Required — English markdown
├── index.zh.mdx       # Optional — Chinese markdown (falls back to English)
└── meta.ts            # Required — metadata
```

**meta.ts format**:

```ts
const meta = {
  title: "My Post Title",
  titleZh: "我的文章标题",       // Optional
  date: "2026-06-16",
  tags: ["AI", "Agent"],
  tagsZh: ["AI", "Agent"],       // Optional
  summary: "A short description.",
  summaryZh: "简短描述。",        // Optional
  readingTime: 8,
}

export default meta
```

The site automatically discovers new posts on rebuild. No component code changes needed.

### Add a Note

Same structure as blog, but place it under `src/content/notes/{slug}/`.

### Add a Project

Create a directory under `src/content/projects/` with a `meta.ts`:

```ts
const meta = {
  title: "Project Name",
  titleZh: "项目名称",
  year: "2026",
  subtitle: "One-line description",
  subtitleZh: "一句话描述",
  description: "Full description paragraph.",
  descriptionZh: "完整描述段落。",
  techStack: ["React", "FastAPI", "SQLite"],
  highlights: ["Built X", "Optimized Y"],
  highlightsZh: ["构建了 X", "优化了 Y"],
  article: "/blog/slug",          // Optional
  demo: "https://...",            // Optional
  source: "https://github.com/...", // Optional
}

export default meta
```

---

## Architecture

### Content Loading

`src/lib/content.ts` uses Vite's `import.meta.glob` to scan content directories at build time:

```ts
const blogMdx = import.meta.glob('../content/blog/*/index.*.mdx', {
  query: '?raw', eager: true, import: 'default'
})
```

- `.mdx` files are loaded as raw strings, rendered via `react-markdown`
- `meta.ts` files are imported as modules and provide structured metadata
- Language fallback: `zh` → `en` → first available

### i18n

- `I18nContext` provides `lang`, `setLang`, and `t` (translation object)
- Language preference is persisted in `localStorage`
- Default language: Chinese (`zh`)
- Fallback: English when Chinese content is missing

### Theme System

- `ThemeProvider` manages `light`/`dark` mode via `class="dark"` on `<html>`
- All colors defined as CSS custom properties in `:root` and `.dark`
- Tailwind `colors` config maps `bg`, `bg-soft`, `bg-card`, `text`, `text-strong`, `text-muted`, `border`, `accent`, `accent-hover` to CSS variables
- Accent color cycler: blue / green / violet (stored in `localStorage`)

### Responsive Layout

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 1024px) | Top navbar + full-width content |
| Desktop (≥ 1024px) | Fixed left sidebar (280px) + content (max-w-3xl) |
| XL (≥ 1280px) | Left sidebar + content + right sidebar (Browse/TOC) |

---

## Key Design Decisions

- **Fixed left sidebar** (desktop): Always visible, never scrolls. Contains brand, navigation, toggles, and social links. Inspired by Tania Rascia's blog.
- **File-based content**: No database, no CMS. Content lives in the repo as markdown files. Adding content = adding files.
- **CSS variable color system**: Single set of semantic color tokens drives both light and dark modes. Tailwind typography plugin wired to the same variables.
- **Dotted underlines**: All links use `text-decoration-style: dotted` for a subtle, literary feel.
- **Landscape project cards**: Single-column wide cards with title, description, tech tags, details link.

---

## Dependencies

### Runtime

| Package | Purpose |
|---------|---------|
| react / react-dom | UI framework |
| react-router-dom | Client-side routing |
| react-markdown | Markdown → HTML rendering |
| remark-gfm | GitHub Flavored Markdown (tables, strikethrough) |
| rehype-highlight | Code syntax highlighting |
| rehype-slug | Auto-generate heading IDs for TOC |

### Dev

| Package | Purpose |
|---------|---------|
| vite | Build tool |
| @vitejs/plugin-react | React Fast Refresh |
| typescript | Type checking |
| tailwindcss | Utility-first CSS |
| @tailwindcss/typography | Prose styling for markdown |
| postcss / autoprefixer | CSS processing |

---

## License

Private — Ruopu Lin
