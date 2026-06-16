import { useTheme } from './ThemeProvider'
import type { AccentColor } from '../types'

const COLORS: { key: AccentColor; ring: string }[] = [
  { key: 'blue', ring: 'ring-accent' },
  { key: 'green', ring: 'ring-accent' },
  { key: 'violet', ring: 'ring-accent' },
]

const BG_MAP: Record<AccentColor, string> = {
  blue: 'bg-accent',
  green: 'bg-accent',
  violet: 'bg-accent',
}

export function ColorToggle() {
  const { accent, setAccent } = useTheme()

  const cycle = () => {
    const idx = COLORS.findIndex(c => c.key === accent)
    const next = COLORS[(idx + 1) % COLORS.length]
    setAccent(next.key)
  }

  return (
    <button
      onClick={cycle}
      className="p-1.5 rounded-md text-text-muted hover:text-text-strong hover:bg-bg-soft transition-colors relative"
      aria-label={`Current accent: ${accent}. Click to cycle.`}
      title={`Accent: ${accent}`}
    >
      <span className={`block w-4 h-4 rounded-full ${BG_MAP[accent]} ring-1 ring-inset ring-text/10`} />
    </button>
  )
}
