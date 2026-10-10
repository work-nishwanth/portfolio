import React from 'react';
import { heroPillars } from '../../content/site';

export const Skyline: React.FC = () => {
  return (
    <div className="sky" aria-hidden="true">
      {heroPillars.map((p) => (
        <div
          key={p.tag}
          className={`pl ${p.isLead ? 'lead' : ''}`}
          style={
            {
              '--h': p.height,
              '--d': p.delay,
              '--p': p.parallax
            } as React.CSSProperties
          }
        >
          <span className="tag label">{p.tag}</span>
        </div>
      ))}
    </div>
  );
};
