import { ProjectCard } from './ProjectCard'
import type { ProjectMeta, ContentEntry } from '../lib/content'

interface Props {
  projects: ContentEntry<ProjectMeta>[]
}

export function ProjectList({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-text-muted py-8 text-center">
        No projects yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {projects.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
