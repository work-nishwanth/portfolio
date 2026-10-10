import React, { useRef, useEffect } from 'react';
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
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (isActive) {
      onOpenCase(index);
    } else {
      onSelect(index);
    }
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && !isActive) {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        onSelect(index);
      }, 70);
    }
  };

  const handlePointerLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const ariaLabel = isActive
    ? `Open case study: ${project.title}`
    : `Select project ${project.title}`;

  return (
    <button
      type="button"
      className={`strip-item ${isActive ? 'active' : ''}`}
      data-n={numStr}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
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
        <span className="label pj-cta">
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
