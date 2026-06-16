import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { ColorToggle } from './ColorToggle'
import { LanguageToggle } from './LanguageToggle'
import { useI18n } from '../i18n/I18nContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
    isActive
      ? 'text-accent'
      : 'text-text-muted hover:text-text-strong'
  }`

export function Navbar() {
  const { t } = useI18n()

  const navLinks = [
    { to: '/blog', label: t.navbar.blog },
    { to: '/notes', label: t.navbar.notes },
    { to: '/projects', label: t.navbar.projects },
    { to: '/about', label: t.navbar.about },
  ]

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-2">
          {/* Logo */}
          <Link
            to="/"
            className="text-base sm:text-lg font-bold text-text-strong tracking-tight shrink-0"
          >
            Ruopu Lin
          </Link>

          {/* Nav links — always visible (mobile navbar) */}
          <nav className="flex items-center gap-3 sm:gap-5 overflow-x-auto">
            {navLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Toggles */}
          <div className="flex items-center gap-0.5 shrink-0">
            <LanguageToggle />
            <ColorToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
