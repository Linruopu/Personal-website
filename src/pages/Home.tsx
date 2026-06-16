import { Link } from 'react-router-dom'
import { getArticles, getNotes, getProjects } from '../lib/content'
import { ArticleCard } from '../components/ArticleCard'
import { ProjectCard } from '../components/ProjectCard'
import { useI18n } from '../i18n/I18nContext'

export function Home() {
  const { t } = useI18n()
  const blogPosts = getArticles().slice(0, 5)
  const latestNotes = getNotes().slice(0, 5)
  const featuredProjects = getProjects().slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="pb-12 mb-8 border-b border-border">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-strong">
          {t.home.heroTitle}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-text leading-relaxed">
          {t.home.heroP1}
        </p>
        <p className="mt-3 text-sm text-text-muted leading-relaxed">
          {t.home.heroP2}
        </p>
      </section>

      {/* Technical Articles */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-text-strong">{t.home.technicalArticles}</h2>
          <Link to="/blog" className="text-sm font-medium text-accent hover:underline">
            {t.home.allArticles}
          </Link>
        </div>
        <div>
          {blogPosts.map(article => (
            <ArticleCard key={article.slug} article={article} basePath="/blog" />
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-text-strong">{t.home.notes}</h2>
          <Link to="/notes" className="text-sm font-medium text-accent hover:underline">
            {t.home.allNotes}
          </Link>
        </div>
        <div>
          {latestNotes.map(note => (
            <ArticleCard key={note.slug} article={note} basePath="/notes" />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-text-strong">{t.home.projects}</h2>
          <Link to="/projects" className="text-sm font-medium text-accent hover:underline">
            {t.home.allProjects}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {featuredProjects.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
