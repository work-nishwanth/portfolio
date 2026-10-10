import React from 'react';
import { experienceSteps, currentFocus } from '../../content/experience';
import { siteConfig } from '../../content/site';
import { Beams } from '../hero/Beams';
import { TimelineStep } from './TimelineStep';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section experience">
      <Beams />

      <div className="shell">
        <div className="exp-head">
          <div>
            <div className="label kicker">{siteConfig.experience.kicker}</div>
            <h2
              className="headline spot"
              dangerouslySetInnerHTML={{ __html: siteConfig.experience.headingHtml }}
            />
          </div>
          <p className="sub">{siteConfig.experience.sub}</p>
        </div>

        <div className="timeline">
          {experienceSteps.map((step) => (
            <TimelineStep key={step.index} step={step} />
          ))}
        </div>

        <div className="now">
          <span className="label kicker">{currentFocus.label}</span>
          <p>{currentFocus.blurb}</p>
        </div>
      </div>
    </section>
  );
};
