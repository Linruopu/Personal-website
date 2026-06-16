import { useI18n } from '../i18n/I18nContext'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="mt-16 border-t border-border pt-6 pb-8">
      <div className="w-full max-w-5xl mx-auto lg:mx-0 lg:pl-12 xl:pl-16 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Ruopu Lin. {t.footer.builtWith}
        </p>
        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a
            href="https://github.com/ruopulin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-strong transition-colors"
          >
            {t.footer.github}
          </a>
          <a
            href="https://linkedin.com/in/ruopulin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-strong transition-colors"
          >
            {t.footer.linkedin}
          </a>
          <a
            href="mailto:ruopu.lin@example.com"
            className="hover:text-text-strong transition-colors"
          >
            {t.footer.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
