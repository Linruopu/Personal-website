import { getNotes } from '../lib/content'
import { ArticleList } from '../components/ArticleList'
import { useI18n } from '../i18n/I18nContext'

export function Notes() {
  const { t } = useI18n()
  const notes = getNotes()

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-strong mb-2">
        {t.notes.title}
      </h1>
      <p className="text-sm text-text-muted mb-10">{t.notes.description}</p>
      <ArticleList articles={notes} basePath="/notes" />
    </div>
  )
}
