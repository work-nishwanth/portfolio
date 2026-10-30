import React from 'react';
import { projects } from '../../content/projects';
import { siteConfig } from '../../content/site';
import { Beams } from '../hero/Beams';
import { ProjectStrip } from './ProjectStrip';

interface WorkProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
  onOpenCase: (index: number) => void;
}

export const Work: React.FC<WorkProps> = ({
  selectedIndex,
  onSelect,
  onOpenCase
}) => {
  const featuredIndex = selectedIndex < 4 ? selectedIndex : 0;
  const currentNumStr = String(featuredIndex + 1).padStart(2, '0');
  const totalNumStr = String(projects.length).padStart(2, '0');

  return (
    <section id="work" className="section work">
      <Beams />

      <div className="shell">
        <div className="work-head">
          <div>
            <div className="label kicker">{siteConfig.work.kicker}</div>
            <h2
              className="headline spot"
              dangerouslySetInnerHTML={{ __html: siteConfig.work.headingHtml }}
            />
          </div>

          <div className="wh-r">
            <p className="sub">{siteConfig.work.sub}</p>
            <div className="wh-meta label">
              <span id="wk-count">{`${currentNumStr} / ${totalNumStr}`}</span>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>

        <div className="work-grid">
          <ProjectStrip
            projects={projects.slice(0, 4)}
            selectedIndex={featuredIndex}
            startIndex={0}
            onSelect={onSelect}
            onOpenCase={onOpenCase}
          />
        </div>
        <div className="project-pagination">
          <span className="label muted">04 FEATURED / {totalNumStr} PROJECTS</span>
          <a href="/projects/" className="btn label">MORE PROJECTS <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
};
