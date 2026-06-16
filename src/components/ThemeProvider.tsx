import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { AccentColor, ThemeContextValue } from '../types'

const ACCENT_COLORS: Record<AccentColor, { primary: string; hover: string }> = {
  blue: { primary: '47 113 180', hover: '31 95 158' },
  green: { primary: '22 127 107', hover: '15 100 85' },
  violet: { primary: '109 67 175', hover: '88 52 149' },
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
  accent: 'blue',
  setAccent: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') return stored
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    }
    return 'light'
  })

  const [accent, setAccentState] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('accent') as AccentColor | null
      if (stored === 'blue' || stored === 'green' || stored === 'violet') return stored
    }
    return 'blue'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const colors = ACCENT_COLORS[accent]
    document.documentElement.style.setProperty('--color-accent', colors.primary)
    document.documentElement.style.setProperty('--color-accent-hover', colors.hover)
    localStorage.setItem('accent', accent)
  }, [accent])

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const setAccent = useCallback((color: AccentColor) => {
    setAccentState(color)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}
