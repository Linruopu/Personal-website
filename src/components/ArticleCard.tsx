import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import type { ArticleMeta, ContentEntry } from '../lib/content'

interface Props {
  article: ContentEntry<ArticleMeta>
  basePath?: string
}

export function ArticleCard({ article, basePath = '/blog' }: Props) {
  const { lang } = useI18n()

  const meta = article.meta
  const title = lang === 'zh' && meta.titleZh ? meta.titleZh : meta.title
  const summary = lang === 'zh' && meta.summaryZh ? meta.summaryZh : meta.summary
  const tags = lang === 'zh' && meta.tagsZh?.length ? meta.tagsZh : meta.tags

  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const href = `${basePath}/${article.slug}`
  const readingTimeSuffix = lang === 'zh' ? ' 分钟阅读' : ' min read'

  return (
    <article className="group py-6 border-b border-border first:pt-0 last:border-b-0">
      <div className="flex items-center gap-3 text-xs text-text-muted font-mono mb-1.5">
        <time>{formattedDate}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{meta.readingTime}{readingTimeSuffix}</span>
      </div>

      <h3 className="text-base font-semibold text-text-strong mb-1.5">
        <Link to={href} className="hover:text-accent transition-colors">
          {title}
        </Link>
      </h3>

      <p className="text-sm text-text leading-relaxed line-clamp-2 mb-2.5">{summary}</p>

      <div className="flex flex-wrap items-center gap-1.5">
        {tags.map(tag => (
          <span key={tag} className="inline-block px-2 py-0.5 text-xs font-mono rounded-md bg-bg-soft text-text-muted">
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
