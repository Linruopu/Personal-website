import { useI18n } from '../i18n/I18nContext'

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
      className="text-sm font-medium text-text-muted hover:text-text-strong transition-colors px-2 py-1 rounded-md hover:bg-bg-soft"
      title={t.languageToggle.label}
      aria-label="Toggle language"
    >
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  )
}
