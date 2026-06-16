import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { ThemeToggle } from './ThemeToggle'
import { ColorToggle } from './ColorToggle'
import { LanguageToggle } from './LanguageToggle'

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const focusAreas = [
  'LLM Engineering',
  'RAG',
  'Agent Workflow',
  'Industrial AIOps',
  'Creative AI',
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 text-sm py-1.5 px-2 rounded-md transition-colors ${
    isActive
      ? 'text-accent bg-bg-soft font-medium'
      : 'text-text hover:text-text-strong'
  }`

const badgeBg = 'bg-bg-soft text-text-muted border border-border'

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function LeftSidebar() {
  const { t } = useI18n()

  const navItems = [
    { to: '/blog', label: t.leftSidebar.blog, icon: '📝' },
    { to: '/notes', label: t.leftSidebar.notes, icon: '📋' },
    { to: '/projects', label: t.leftSidebar.projects, icon: '⚡' },
    { to: '/about', label: t.leftSidebar.about, icon: '👤' },
  ]

  const aboutText = t.leftSidebar.aboutText
  const nameParts = aboutText.split('Ruopu Lin')

  return (
    <div className="flex flex-col h-full px-4 py-6 overflow-hidden">
      {/* ── Brand ────────────────────────────────────────────────── */}
      <Link
        to="/"
        className="inline-block text-xl font-bold text-text-strong tracking-tight mb-5 pb-0.5 border-b border-dashed border-border hover:text-accent transition-colors"
      >
        Ruopu Lin
      </Link>

      {/* ── Toggles ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-5">
        <LanguageToggle />
        <ColorToggle />
        <ThemeToggle />
      </div>

      <hr className="border-border mb-5" />

      {/* ── About Me ─────────────────────────────────────────────── */}
      <section className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {t.leftSidebar.aboutMe}
        </h4>
        <p className="text-sm text-text leading-relaxed">
          {nameParts.length > 1 ? (
            <>
              {nameParts[0]}
              <Link
                to="/about"
                className="inline-block pb-0.5 border-b border-dashed border-border hover:text-accent transition-colors"
              >
                Ruopu Lin
              </Link>
              {nameParts.slice(1).join('Ruopu Lin')}
            </>
          ) : (
            aboutText
          )}
        </p>
      </section>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <section className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {t.leftSidebar.navigation}
        </h4>
        <nav className="space-y-0.5">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </section>

      {/* ── Focus ────────────────────────────────────────────────── */}
      <section className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {t.leftSidebar.focus}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {focusAreas.map(f => (
            <span
              key={f}
              className={`inline-block px-2 py-0.5 text-xs font-mono rounded-md ${badgeBg}`}
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stay Connected ───────────────────────────────────────── */}
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {t.leftSidebar.stayConnected}
        </h4>
        <div className="space-y-1">
          <a
            href="https://github.com/ruopulin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text hover:text-text-strong py-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="mailto:ruopu.lin@example.com"
            className="flex items-center gap-2 text-sm text-text hover:text-text-strong py-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {t.leftSidebar.email}
          </a>
          <a
            href="/resume.pdf"
            className="flex items-center gap-2 text-sm text-text hover:text-text-strong py-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            {t.leftSidebar.resume}
          </a>
          <a
            href="/rss.xml"
            className="flex items-center gap-2 text-sm text-text hover:text-text-strong py-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {t.leftSidebar.rss}
          </a>
        </div>
      </section>
    </div>
  )
}
