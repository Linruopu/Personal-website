import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug } from '../lib/content'
import { useI18n } from '../i18n/I18nContext'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useI18n()
  const entry = slug ? getProjectBySlug(slug) : undefined

  if (!entry) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-text-strong">{t.projectDetail.notFound}</h1>
        <p className="mt-2 text-text-muted">{t.projectDetail.notFoundDesc}</p>
        <Link to="/projects" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
          {t.projectDetail.backToProjectsLink}
        </Link>
      </div>
    )
  }

  const m = entry.meta
  const title = lang === 'zh' && m.titleZh ? m.titleZh : m.title
  const subtitle = lang === 'zh' && m.subtitleZh ? m.subtitleZh : m.subtitle
  const description = lang === 'zh' && m.descriptionZh ? m.descriptionZh : m.description
  const highlights = lang === 'zh' && m.highlightsZh?.length ? m.highlightsZh : m.highlights

  return (
    <div>
      <nav className="mb-8">
        <Link to="/projects" className="text-sm text-text-muted hover:text-text transition-colors">
          &larr; {t.projectDetail.backToProjects}
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-strong">{title}</h1>
        <p className="mt-2 text-lg text-text-muted">{subtitle}</p>
        <div className="flex items-center gap-3 mt-3 text-sm text-text-muted font-mono">
          <span>{m.year}</span>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-text-strong mb-3">{t.projectDetail.overview}</h2>
        <p className="text-[15px] leading-relaxed text-text">{description}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-text-strong mb-3">{t.projectDetail.highlights}</h2>
        <ul className="space-y-2.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-text">
              <span className="mt-2 block w-1.5 h-1.5 rounded-full shrink-0 bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-text-strong mb-3">{t.projectDetail.techStack}</h2>
        <div className="flex flex-wrap gap-2">
          {m.techStack.map(t => (
            <span key={t} className="inline-block px-3 py-1 text-sm font-mono rounded-md bg-bg-soft text-text">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap gap-3">
          {m.article && m.article !== '#' && (
            <Link
              to={m.article}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg
                         bg-text-strong text-bg hover:bg-text transition-colors"
            >
              {t.projectDetail.readArticle}
            </Link>
          )}
          {m.demo && m.demo !== '#' && (
            <a
              href={m.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg
                         border border-border text-text hover:bg-bg-soft transition-colors"
            >
              {t.projectDetail.liveDemo}
            </a>
          )}
          {m.source && (
            <a
              href={m.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg
                         border border-border text-text hover:bg-bg-soft transition-colors"
            >
              {t.projectDetail.viewSource}
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
