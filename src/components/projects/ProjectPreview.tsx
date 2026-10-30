import type { Project } from '../../content/projects';
import { projectPreviews } from '../../content/projectPreviews';

export function ProjectPreview({ project, className = '' }: { project: Project; className?: string }) {
  const preview = projectPreviews[project.id];
  if (!preview) return null;

  return (
    <div className={`project-preview screenshot-preview ${className}`}>
      <div className="preview-chrome" aria-hidden="true">
        <span className="preview-window-dots"><i /><i /><i /></span>
        <span>{project.title}</span>
      </div>
      <div className="preview-image-area">
        <img className={`preview-capture ${preview.dark ? 'preview-capture--light' : ''}`} src={preview.light} alt={preview.alt} width="1280" height="800" loading="lazy" decoding="async" />
        {preview.dark && <img className="preview-capture preview-capture--dark" src={preview.dark} alt={preview.alt} width="1280" height="800" loading="lazy" decoding="async" />}
      </div>
    </div>
  );
}
