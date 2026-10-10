import React, { useState } from 'react';
import { siteConfig } from '../../content/site';
import { Beams } from '../hero/Beams';
import { SkillGroups } from './SkillGroups';
import { PlateStackFallback } from './PlateStackFallback';
import { Stats } from './Stats';

export const About: React.FC = () => {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  return (
    <section id="about" className="section about">
      <Beams />

      <div className="about-l">
        <div className="label kicker">{siteConfig.about.kicker}</div>
        <h2
          className="spot"
          dangerouslySetInnerHTML={{ __html: siteConfig.about.headingHtml }}
        />
        <p
          className="sub"
          dangerouslySetInnerHTML={{ __html: siteConfig.about.bioHtml }}
        />
        <SkillGroups
          hoveredGroup={hoveredGroup}
          onHoverGroup={setHoveredGroup}
        />
      </div>

      <div className="about-r">
        <PlateStackFallback
          hoveredGroup={hoveredGroup}
          onHoverGroup={setHoveredGroup}
        />
        <Stats />
      </div>
    </section>
  );
};
