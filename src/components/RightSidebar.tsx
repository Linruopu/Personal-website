import { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { TocItem } from '../types'
import { useI18n } from '../i18n/I18nContext'
import { getArticles, getNotes, getProjects } from '../lib/content'

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function useTocItems(contentSelector: string) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const el = document.querySelector(contentSelector)
    if (!el) return

    const headings = el.querySelectorAll('h2, h3')
    const tocItems: TocItem[] = []
    headings.forEach(h => {
      const id = h.id
      const text = h.textContent ?? ''
      const level = h.tagName === 'H2' ? 2 : 3
      if (id) tocItems.push({ id, text, level })
    })
    setItems(tocItems)
  }, [contentSelector])

  useEffect(() => {
    if (items.length === 0) return

    const headingElements = items
      .map(item => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (headingElements.length === 0) return

    observerRef.current?.disconnect()

    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    )

    headingElements.forEach(el => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [items])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { items, activeId, handleClick }
}

/* ------------------------------------------------------------------ */
/*  Section: Browse (list pages)                                      */
/* ------------------------------------------------------------------ */

function BrowseSection() {
  const { t } = useI18n()

  const categories = [
    { label: t.rightSidebar.technicalArticles, to: '/blog', count: getArticles().length },
    { label: t.rightSidebar.notes, to: '/notes', count: getNotes().length },
    { label: t.rightSidebar.projects, to: '/projects', count: getProjects().length },
  ]

  const popularTags = [
    'AI Agent',
    'RAG',
    'LangGraph',
    'Industrial AIOps',
    'Agent Architecture',
    'Pipeline',
    'Diagnosis',
    'EMS',
  ]

  return (
    <>
      {/* Browse */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          {t.rightSidebar.browse}
        </h4>
        <nav className="space-y-1">
          {categories.map(c => (
            <Link
              key={c.to}
              to={c.to}
              className="flex items-center justify-between text-sm py-1.5 px-2 rounded-md
                         text-text hover:text-text-strong hover:bg-bg-soft
                         hover:text-text-strong hover:bg-bg-soft
                         transition-colors"
            >
              <span>{c.label}</span>
              <span className="text-xs text-text-muted font-mono">
                {c.count}
              </span>
            </Link>
          ))}
        </nav>
      </section>

      {/* Popular Tags */}
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          {t.rightSidebar.popularTags}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map(tag => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs font-mono rounded-md
                         bg-bg-soft text-text-muted
                         bg-bg-soft text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Article Meta (detail pages)                              */
/* ------------------------------------------------------------------ */

function ArticleMetaSection({
  date,
  readingTime,
  tags,
}: {
  date: string
  readingTime: number
  tags: string[]
}) {
  const { t } = useI18n()

  return (
    <section className="mb-8">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
        {t.rightSidebar.aboutThisArticle}
      </h4>
      <div className="space-y-2.5 text-sm text-text-muted">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span>{t.rightSidebar.published} {date}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{readingTime} {t.rightSidebar.minRead}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs font-mono rounded-md
                         bg-bg-soft text-text-muted
                         bg-bg-soft text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Table of Contents                                        */
/* ------------------------------------------------------------------ */

function TocSection() {
  const { t } = useI18n()
  const { items, activeId, handleClick } = useTocItems('#article-content')

  if (items.length === 0) return null

  return (
    <section>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
        {t.rightSidebar.tableOfContents}
      </h4>
      <nav className="space-y-0.5 border-l border-border">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`toc-link block text-left w-full py-1 pl-3 border-l-2 -ml-px transition-colors ${
              activeId === item.id
                ? 'border-accent text-accent font-medium'
                : 'border-transparent hover:border-border text-text-muted'
            } ${item.level === 3 ? 'pl-6 text-xs' : 'text-sm'}`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Project Meta                                             */
/* ------------------------------------------------------------------ */

function ProjectMetaSection({ projectSlug }: { projectSlug: string }) {
  const { t, lang } = useI18n()
  const project = getProjects().find(p => p.slug === projectSlug)

  if (!project) return null

  return (
    <>
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          {t.rightSidebar.projectInfo}
        </h4>
        <div className="space-y-2.5 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span>{project.meta.year}</span>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          {t.rightSidebar.techStack}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {project.meta.techStack.map((t: string) => (
            <span
              key={t}
              className="inline-block px-2 py-0.5 text-xs font-mono rounded-md
                         bg-bg-soft text-text-muted
                         bg-bg-soft text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  About page sidebar                                                */
/* ------------------------------------------------------------------ */

function AboutSidebar() {
  const { t } = useI18n()

  return (
    <>
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          {t.rightSidebar.connect}
        </h4>
        <div className="space-y-2">
          <a
            href="https://github.com/ruopulin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text hover:text-text-strong py-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {t.rightSidebar.github}
          </a>
          <a
            href="mailto:ruopu.lin@example.com"
            className="flex items-center gap-2 text-sm text-text hover:text-text-strong py-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {t.rightSidebar.email}
          </a>
          <a
            href="/resume.pdf"
            className="flex items-center gap-2 text-sm text-text hover:text-text-strong py-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            {t.rightSidebar.resume}
          </a>
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Route resolver                                                    */
/* ------------------------------------------------------------------ */

type PageType = 'list' | 'article' | 'project' | 'about' | 'none'

function resolvePageType(pathname: string): { type: PageType; slug?: string; category?: string } {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return { type: 'list' }
  }

  if (segments.length === 1) {
    if (segments[0] === 'about') return { type: 'about' }
    return { type: 'list' }
  }

  if (segments.length === 2) {
    if (segments[0] === 'projects') return { type: 'project', slug: segments[1] }
    return { type: 'article', slug: segments[1], category: segments[0] }
  }

  return { type: 'none' }
}

function findArticleMeta(category: string, slug: string) {
  const allArticles = category === 'notes' ? getNotes() : getArticles()
  return allArticles.find(a => a.slug === slug) ?? null
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export function RightSidebar() {
  const { pathname } = useLocation()
  const { lang } = useI18n()
  const { type, slug, category } = resolvePageType(pathname)

  const renderContent = () => {
    switch (type) {
      case 'article': {
        const article = category && slug ? findArticleMeta(category, slug) : null
        if (!article) return <BrowseSection />
        const formattedDate = new Date(article.meta.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        return (
          <>
            <ArticleMetaSection
              date={formattedDate}
              readingTime={article.meta.readingTime}
              tags={lang === "zh" && article.meta.tagsZh?.length ? article.meta.tagsZh : article.meta.tags}
            />
            <TocSection />
          </>
        )
      }

      case 'project':
        return <ProjectMetaSection projectSlug={slug ?? ''} />

      case 'about':
        return <AboutSidebar />

      case 'list':
      default:
        return <BrowseSection />
    }
  }

  return <>{renderContent()}</>
}
