import React from 'react';
import type { TimelineStep as StepData } from '../../content/experience';

interface TimelineStepProps {
  step: StepData;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({ step }) => {
  return (
    <article
      className="step"
      style={
        {
          '--i': step.index,
          '--hh': step.heightPct
        } as React.CSSProperties
      }
    >
      <span className="gy" aria-hidden="true">
        {step.ghostText}
      </span>

      <div className="label muted">{step.label}</div>

      <div className="sb">
        {step.titleHtml ? (
          <h3 dangerouslySetInnerHTML={{ __html: step.titleHtml }} />
        ) : (
          <h3>{step.title}</h3>
        )}
        <div className="company">{step.company}</div>
        <p>{step.blurb}</p>
      </div>
    </article>
  );
};
