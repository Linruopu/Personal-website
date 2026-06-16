// ─── Types ──────────────────────────────────────────────────────────

export interface ArticleMeta {
  title: string
  titleZh?: string
  date: string
  tags: string[]
  tagsZh?: string[]
  summary: string
  summaryZh?: string
  readingTime: number
}

export interface ProjectMeta {
  title: string
  titleZh?: string
  year: string
  subtitle: string
  subtitleZh?: string
  description: string
  descriptionZh?: string
  techStack: string[]
  highlights: string[]
  highlightsZh?: string[]
  article?: string
  demo?: string
  source?: string
}

export interface ContentEntry<T = ArticleMeta> {
  slug: string
  meta: T
  contentEn?: string
  contentZh?: string
  getContent(lang: 'en' | 'zh'): string
}

// ─── Blog ─────────────────────────────────────────────────────────

const blogMdx = import.meta.glob<string>(
  '../content/blog/*/index.*.mdx',
  { query: '?raw', eager: true, import: 'default' },
)

const blogMeta = import.meta.glob<{ default: ArticleMeta }>(
  '../content/blog/*/meta.ts',
  { eager: true },
)

function parseContentModules<T>(
  mdxModules: Record<string, string>,
  metaModules: Record<string, { default: T }>,
): Map<string, { en?: string; zh?: string; meta: T }> {
  const map = new Map<string, { en?: string; zh?: string; meta: T }>()

  for (const [path, content] of Object.entries(mdxModules)) {
    const segments = path.split('/')
    const slug = segments[segments.length - 2]
    const langMatch = path.match(/index\.(\w+)\.mdx$/)
    const lang = langMatch?.[1] as 'en' | 'zh' | undefined
    if (!slug || !lang) continue

    if (!map.has(slug)) map.set(slug, {} as any)
    const entry = map.get(slug)!
    entry[lang] = content
  }

  for (const [path, mod] of Object.entries(metaModules)) {
    const segments = path.split('/')
    const slug = segments[segments.length - 2]
    if (slug && map.has(slug)) {
      map.get(slug)!.meta = mod.default
    }
  }

  return map
}

function buildEntries<T>(
  modules: Map<string, { en?: string; zh?: string; meta: T }>,
): ContentEntry<T>[] {
  return Array.from(modules.entries())
    .map(([slug, data]) => ({
      slug,
      meta: data.meta,
      contentEn: data.en,
      contentZh: data.zh,
      getContent(lang: 'en' | 'zh'): string {
        if (lang === 'zh') return data.zh ?? data.en ?? ''
        return data.en ?? data.zh ?? ''
      },
    }))
    .sort((a, b) => {
      const da = (a.meta as any).date ?? ''
      const db = (b.meta as any).date ?? ''
      return db.localeCompare(da)
    })
}

const blogMap = parseContentModules<ArticleMeta>(blogMdx, blogMeta)

// ─── Notes ────────────────────────────────────────────────────────

const notesMdx = import.meta.glob<string>(
  '../content/notes/*/index.*.mdx',
  { query: '?raw', eager: true, import: 'default' },
)

const notesMeta = import.meta.glob<{ default: ArticleMeta }>(
  '../content/notes/*/meta.ts',
  { eager: true },
)

const notesMap = parseContentModules<ArticleMeta>(notesMdx, notesMeta)

// ─── Projects ─────────────────────────────────────────────────────

const projectsMeta = import.meta.glob<{ default: ProjectMeta }>(
  '../content/projects/*/meta.ts',
  { eager: true },
)

function parseProjectModules(
  metaModules: Record<string, { default: ProjectMeta }>,
): ContentEntry<ProjectMeta>[] {
  const entries: ContentEntry<ProjectMeta>[] = []
  for (const [path, mod] of Object.entries(metaModules)) {
    const segments = path.split('/')
    const slug = segments[segments.length - 2]
    if (!slug) continue
    entries.push({
      slug,
      meta: mod.default,
      getContent(_lang: 'en' | 'zh'): string {
        return '' // projects are rendered from meta only
      },
    })
  }
  return entries.sort((a, b) => b.meta.year.localeCompare(a.meta.year))
}

// ─── Public API ───────────────────────────────────────────────────

export function getArticles(): ContentEntry<ArticleMeta>[] {
  return buildEntries(blogMap)
}

export function getArticleBySlug(slug: string): ContentEntry<ArticleMeta> | undefined {
  return getArticles().find(a => a.slug === slug)
}

export function getNotes(): ContentEntry<ArticleMeta>[] {
  return buildEntries(notesMap)
}

export function getNoteBySlug(slug: string): ContentEntry<ArticleMeta> | undefined {
  return getNotes().find(n => n.slug === slug)
}

export function getProjects(): ContentEntry<ProjectMeta>[] {
  return parseProjectModules(projectsMeta)
}

export function getProjectBySlug(slug: string): ContentEntry<ProjectMeta> | undefined {
  return getProjects().find(p => p.slug === slug)
}
