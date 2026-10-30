import { projects } from '../../content/projects';
import { siteConfig } from '../../content/site';
import { ProjectPreview } from './ProjectPreview';

export function ProjectsPage({ onOpenCase }: { onOpenCase: (index: number) => void }) {
  return (
    <div className="projects-page">
      <div className="shell">
        <a className="projects-back label" href="/#work">← BACK TO SELECTED WORK</a>
        <div className="projects-page-heading">
          <div>
            <p className="label kicker">THE FULL COLLECTION / {String(projects.length).padStart(2, '0')} PROJECTS</p>
            <h1>ALL <em>projects.</em></h1>
          </div>
          <p className="sub">Web products, applied AI, and data experiments. Explore the work, the approach, and what went into each build.</p>
        </div>
        <div className="projects-collection">
          {projects.map((project, index) => (
            <article className="collection-project" key={project.id}>
              <button className="collection-preview" type="button" onClick={() => onOpenCase(index)} aria-label={`Preview case study: ${project.title}`}>
                <ProjectPreview project={project} />
                <span className="collection-preview-hint label">EXPLORE PROJECT <span aria-hidden="true">↗</span></span>
              </button>
              <div className="collection-meta label muted"><span>{String(index + 1).padStart(2, '0')} / {project.category}</span><span>{project.live ? 'LIVE DEMO' : 'SOURCE AVAILABLE'}</span></div>
              <h2>{project.title}</h2>
              <p className="collection-summary">{project.summary}</p>
              <p className="collection-stack label muted">{project.tags.slice(0, 4).join(' / ')}</p>
              <div className="collection-actions">
                <button className="collection-link label" type="button" onClick={() => onOpenCase(index)}>VIEW CASE STUDY <span aria-hidden="true">→</span></button>
                <a className="collection-link label muted" href={project.live ?? project.repo} target="_blank" rel="noopener noreferrer">{project.live ? 'LIVE SITE' : 'GITHUB'} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <footer className="projects-footer">
          <a className="label" href="/#work">← BACK TO PORTFOLIO</a>
          <a className="label muted" href={`mailto:${siteConfig.email}`}>LET’S TALK ↗</a>
        </footer>
      </div>
    </div>
  );
}
