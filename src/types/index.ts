// ---------------------------------------------------------------------------
// Bilingual helpers — used by UI translations, kept for i18n compatibility
// ---------------------------------------------------------------------------

export type BilingualString = string | { en: string; zh?: string }
export type BilingualArray = string[] | { en: string[]; zh?: string[] }

export function getLocalized(value: BilingualString, lang: 'en' | 'zh'): string {
  if (typeof value === 'string') return value
  return value[lang] ?? value.en
}

export function getLocalizedArray(value: BilingualArray, lang: 'en' | 'zh'): string[] {
  if (Array.isArray(value)) return value
  return value[lang] ?? value.en
}

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export type AccentColor = 'blue' | 'green' | 'violet'

export interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  accent: AccentColor
  setAccent: (color: AccentColor) => void
}
