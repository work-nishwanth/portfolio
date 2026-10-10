import React from 'react';
import { skillGroups } from '../../content/skills';

interface PlateStackFallbackProps {
  hoveredGroup: number | null;
  onHoverGroup: (id: number | null) => void;
}

export const PlateStackFallback: React.FC<PlateStackFallbackProps> = ({
  hoveredGroup,
  onHoverGroup
}) => {
  return (
    <div className="stack" aria-hidden="true">
      <div className="stack-in">
        {skillGroups.map((g) => (
          <div
            key={g.id}
            className={`plate ${hoveredGroup === g.id ? 'on' : ''}`}
            data-g={g.id}
            style={{ '--k': g.id } as React.CSSProperties}
            onPointerEnter={() => onHoverGroup(g.id)}
            onPointerLeave={() => onHoverGroup(null)}
          >
            <span className="label">{g.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
