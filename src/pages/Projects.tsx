import { getProjects } from '../lib/content'
import { ProjectList } from '../components/ProjectList'
import { useI18n } from '../i18n/I18nContext'

export function Projects() {
  const { t } = useI18n()
  const projects = getProjects()

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-strong mb-2">
        {t.projects.title}
      </h1>
      <p className="text-sm text-text-muted mb-10">{t.projects.description}</p>
      <ProjectList projects={projects} />
    </div>
  )
}
