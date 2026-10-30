import React from 'react';
import type { Project } from '../../content/projects';
import { ProjectPanel } from './ProjectPanel';

interface ProjectStripProps {
  projects: Project[];
  selectedIndex: number;
  startIndex: number;
  onSelect: (index: number) => void;
  onOpenCase: (index: number) => void;
}

export const ProjectStrip: React.FC<ProjectStripProps> = ({
  projects,
  selectedIndex,
  startIndex,
  onSelect,
  onOpenCase
}) => {
  return (
    <div className="strip" id="project-strip" aria-label="Select a project">
      {projects.map((project, idx) => (
        <ProjectPanel
          key={project.id}
          project={project}
          index={startIndex + idx}
          isActive={selectedIndex === startIndex + idx}
          onSelect={onSelect}
          onOpenCase={onOpenCase}
        />
      ))}
    </div>
  );
};
