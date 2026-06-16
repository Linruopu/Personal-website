import { Link } from 'react-router-dom'
import { MarkdownRenderer } from './MarkdownRenderer'
import { useI18n } from '../i18n/I18nContext'
import type { ArticleMeta, ContentEntry } from '../lib/content'

interface Props {
  entry: ContentEntry<ArticleMeta>
  backTo: string
  backLabel: string
}

export function ArticleDetail({ entry, backTo, backLabel }: Props) {
  const { lang } = useI18n()

  const meta = entry.meta
  const title = lang === 'zh' && meta.titleZh ? meta.titleZh : meta.title
  const tags = lang === 'zh' && meta.tagsZh?.length ? meta.tagsZh : meta.tags
  const readingTimeSuffix = lang === 'zh' ? ' 分钟阅读' : ' min read'

  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const content = entry.getContent(lang)

  return (
    <div>
      <nav className="mb-8">
        <Link to={backTo} className="text-sm text-text-muted hover:text-text transition-colors">
          &larr; {backLabel}
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-strong">{title}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-text-muted font-mono">
          <time>{formattedDate}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{meta.readingTime}{readingTimeSuffix}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {tags.map(tag => (
            <span key={tag} className="inline-block px-2 py-0.5 text-xs font-mono rounded-md bg-bg-soft text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div id="article-content">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  )
}
