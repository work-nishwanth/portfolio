import React from 'react';
import type { Project } from '../../content/projects';

interface ProjectPanelProps {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
  onOpenCase: (index: number) => void;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
  project,
  index,
  isActive,
  onSelect,
  onOpenCase
}) => {
  const numStr = String(index + 1).padStart(2, '0');

  const handleClick = () => {
    if (isActive) {
      onOpenCase(index);
    } else {
      onSelect(index);
    }
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && !isActive) {
      onSelect(index);
    }
  };

  return (
    <button
      type="button"
      className={`strip-item ${isActive ? 'active' : ''}`}
      data-n={numStr}
      aria-label={`Select project ${project.title}`}
      aria-pressed={isActive}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      style={{ '--i': index } as React.CSSProperties}
    >
      <i className="pj-line" />

      <span className="pj-top">
        <span className="label pj-n">{numStr}</span>
        <span className="label pj-cat">{project.category}</span>
      </span>

      <span className="pj-vt">{project.title}</span>

      <span className="pj-body">
        <span className="pj-title">{project.title}</span>
        <span className="pj-role">
          {project.role} — {project.stage}
        </span>
        <span className="pj-sum">{project.summary}</span>
        <span className="label pj-metric">{project.metric}</span>
        <span
          className="label pj-cta"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCase(index);
          }}
        >
          VIEW CASE STUDY <b aria-hidden="true">→</b>
        </span>
      </span>

      <svg
        className="strip-art art"
        viewBox="0 0 200 140"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: project.art }}
      />
    </button>
  );
};
