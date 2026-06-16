import { useParams } from 'react-router-dom'
import { getNoteBySlug } from '../lib/content'
import { ArticleDetail } from '../components/ArticleDetail'
import { useI18n } from '../i18n/I18nContext'

export function NoteDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useI18n()
  const entry = slug ? getNoteBySlug(slug) : undefined

  if (!entry) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-text-strong">{t.noteDetail.notFound}</h1>
        <p className="mt-2 text-text-muted">{t.noteDetail.notFoundDesc}</p>
      </div>
    )
  }

  return <ArticleDetail entry={entry} backTo="/notes" backLabel={t.articleDetail.backToNotes} />
}
