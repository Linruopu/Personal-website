import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import type { ProjectMeta, ContentEntry } from '../lib/content'

interface Props {
  project: ContentEntry<ProjectMeta>
}

export function ProjectCard({ project }: Props) {
  const { lang } = useI18n()
  const m = project.meta

  const title = lang === 'zh' && m.titleZh ? m.titleZh : m.title
  const subtitle = lang === 'zh' && m.subtitleZh ? m.subtitleZh : m.subtitle
  const description = lang === 'zh' && m.descriptionZh ? m.descriptionZh : m.description
  const highlights = lang === 'zh' && m.highlightsZh?.length ? m.highlightsZh : m.highlights

  return (
    <article
      className="flex flex-col justify-between rounded-[18px] border border-border
                 bg-bg-soft px-6 sm:px-7 py-6 sm:py-7
                 transition-all duration-200 ease-out
                 hover:-translate-y-0.5 hover:border-accent
                 hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)]
                 dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
    >
      <div>
        <h3 className="text-[1.7rem] sm:text-[1.8rem] font-bold text-text-strong leading-tight mb-3">
          <Link to={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
            {title}
          </Link>
        </h3>

        {subtitle && (
          <p className="text-sm text-text-muted font-medium mb-2">{subtitle}</p>
        )}

        <p className="text-[0.95rem] sm:text-base text-text leading-relaxed mb-5 max-w-[90%]">
          {description}
        </p>

        {highlights.length > 0 && (
          <ul className="space-y-1 mb-4 text-sm text-text">
            {highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 block w-1 h-1 rounded-full shrink-0 bg-accent" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2.5">
          {m.techStack.map(t => (
            <span key={t} className="inline-block px-3 py-1.5 text-[0.82rem] font-mono rounded-full border border-border bg-bg text-accent leading-none">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border">
        <Link
          to={`/projects/${project.slug}`}
          className="font-semibold text-accent hover:underline"
          style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '4px' }}
        >
          Details &rarr;
        </Link>
      </div>
    </article>
  )
}
