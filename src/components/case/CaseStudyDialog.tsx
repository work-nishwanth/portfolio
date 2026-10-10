import React, { useRef, useEffect } from 'react';
import type { Project } from '../../content/projects';

interface CaseStudyDialogProps {
  isOpen: boolean;
  project: Project;
  projectIndex: number;
  totalProjects: number;
  onClose: () => void;
  onNext: () => void;
  clickPos?: { x: number; y: number } | null;
}

export const CaseStudyDialog: React.FC<CaseStudyDialogProps> = ({
  isOpen,
  project,
  projectIndex,
  totalProjects: _totalProjects,
  onClose,
  onNext,
  clickPos
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      if (clickPos) {
        dialog.style.setProperty('--cx', `${clickPos.x}px`);
        dialog.style.setProperty('--cy', `${clickPos.y}px`);
      } else {
        dialog.style.setProperty('--cx', '50%');
        dialog.style.setProperty('--cy', '50%');
      }

      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      previousFocusRef.current?.focus();
    }
  }, [isOpen, clickPos]);

  const handleNextClick = () => {
    onNext();
    dialogRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const kickerStr = `PROJECT / ${String(projectIndex + 1).padStart(2, '0')} — ${project.category}`;

  return (
    <dialog
      ref={dialogRef}
      id="case"
      className="case"
      aria-label="Project case study"
      onClick={handleBackdropClick}
      onCancel={handleCancel}
    >
      <div className="case-top">
        <span className="label muted">NY / PROJECT CASE STUDY</span>
        <button
          type="button"
          id="close-case"
          className="case-close label"
          onClick={onClose}
        >
          CLOSE ×
        </button>
      </div>

      <div className="case-body">
        <div id="case-kicker" className="label kicker">
          {kickerStr}
        </div>
        <h2 id="case-title">{project.title}</h2>

        <div className="case-grid">
          <div className="case-visual" aria-label="Project illustration">
            <svg
              id="case-art"
              className="case-art art"
              viewBox="0 0 200 140"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: project.art }}
            />
          </div>

          <div className="case-copy">
            <div className="case-facts">
              <div>
                <div className="label kicker">ROLE</div>
                <span id="case-role">{project.role}</span>
              </div>
              <div>
                <div className="label kicker">STAGE / PERIOD</div>
                <span id="case-stage">{project.stage}</span>
              </div>
              <div>
                <div className="label kicker">STACK</div>
                <span id="case-stack">{project.stack}</span>
              </div>
              <div>
                <div className="label kicker">STATUS</div>
                <span id="case-status">{project.status}</span>
              </div>
            </div>

            <h3>Problem</h3>
            <p id="case-problem">{project.problem}</p>

            <h3>Approach</h3>
            <p id="case-approach">{project.approach}</p>

            <h3>Result</h3>
            <p id="case-result">{project.result}</p>

            <h3>What I learned</h3>
            <p id="case-learned">{project.learned}</p>

            <div id="case-tags" className="case-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="case-buttons">
              {project.live && (
                <a
                  id="case-live"
                  className="btn primary"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LIVE SITE ↗
                </a>
              )}
              {project.repo && (
                <a
                  id="case-repo"
                  className="btn"
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GITHUB ↗
                </a>
              )}
              <button
                id="case-next"
                className="btn"
                type="button"
                onClick={handleNextClick}
              >
                NEXT PROJECT <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};
