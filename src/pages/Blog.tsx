import { getArticles } from '../lib/content'
import { ArticleList } from '../components/ArticleList'
import { useI18n } from '../i18n/I18nContext'

export function Blog() {
  const { t } = useI18n()
  const articles = getArticles()

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-strong mb-2">
        {t.blog.title}
      </h1>
      <p className="text-sm text-text-muted mb-10">{t.blog.description}</p>
      <ArticleList articles={articles} basePath="/blog" />
    </div>
  )
}
