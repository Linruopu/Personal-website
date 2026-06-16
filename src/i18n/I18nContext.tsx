import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Lang } from './translations'

type T = typeof translations.en | typeof translations.zh

interface I18nContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: T
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'zh',
  setLang: () => {},
  t: translations.zh,
})

export function useI18n() {
  return useContext(I18nContext)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang')
      if (stored === 'zh' || stored === 'en') return stored
    }
    return 'zh'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
  }, [])

  // translations.en and translations.zh share the same structure
  // but differ in literal string values; the cast is safe.
  const t = translations[lang] as T

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}
