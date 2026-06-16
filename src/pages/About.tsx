import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

function renderWithBold(text: string) {
  // Replace **text** with <strong>text</strong>
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-text-strong">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export function About() {
  const { t } = useI18n()

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-strong mb-2">
        {t.about.title}
      </h1>

      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-text">
        <p>{renderWithBold(t.about.p1)}</p>

        <h2 className="text-xl font-bold text-text-strong pt-4">{t.about.focusAreas}</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>{renderWithBold(t.about.fa1)}</li>
          <li>{renderWithBold(t.about.fa2)}</li>
          <li>{renderWithBold(t.about.fa3)}</li>
          <li>{renderWithBold(t.about.fa4)}</li>
        </ul>

        <h2 className="text-xl font-bold text-text-strong pt-4">{t.about.background}</h2>
        <p>{t.about.bgText}</p>

        <h2 className="text-xl font-bold text-text-strong pt-4">{t.about.thisSite}</h2>
        <p>
          {t.about.siteText.split('technical articles, notes, deep dives, and project case studies').length > 1 ? (
            <>
              {t.about.siteText.split('technical articles, notes, deep dives, and project case studies')[0]}
              <Link to="/blog" className="text-accent hover:underline">technical articles</Link>,{' '}
              <Link to="/notes" className="text-accent hover:underline">notes</Link>,{' '}
              <Link to="/deep-dives" className="text-accent hover:underline">deep dives</Link>, and{' '}
              <Link to="/projects" className="text-accent hover:underline">project case studies</Link>
              {t.about.siteText.split('project case studies')[1]}
            </>
          ) : (
            t.about.siteText
          )}
        </p>
      </div>
    </div>
  )
}
