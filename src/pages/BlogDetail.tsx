import { useParams } from 'react-router-dom'
import { getArticleBySlug } from '../lib/content'
import { ArticleDetail } from '../components/ArticleDetail'
import { useI18n } from '../i18n/I18nContext'

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useI18n()
  const entry = slug ? getArticleBySlug(slug) : undefined

  if (!entry) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-text-strong">{t.articleDetail.notFound}</h1>
        <p className="mt-2 text-text-muted">{t.articleDetail.notFoundDesc}</p>
      </div>
    )
  }

  return <ArticleDetail entry={entry} backTo="/blog" backLabel={t.articleDetail.backToBlog} />
}
