import { ArticleCard } from './ArticleCard'
import type { ArticleMeta, ContentEntry } from '../lib/content'

interface Props {
  articles: ContentEntry<ArticleMeta>[]
  basePath?: string
}

export function ArticleList({ articles, basePath = '/blog' }: Props) {
  if (articles.length === 0) {
    return (
      <p className="text-sm text-text-muted py-8 text-center">
        No articles yet.
      </p>
    )
  }

  return (
    <div>
      {articles.map(article => (
        <ArticleCard key={article.slug} article={article} basePath={basePath} />
      ))}
    </div>
  )
}
