import React from 'react';
import { skillGroups } from '../../content/skills';

interface SkillGroupsProps {
  hoveredGroup: number | null;
  onHoverGroup: (id: number | null) => void;
}

export const SkillGroups: React.FC<SkillGroupsProps> = ({
  hoveredGroup,
  onHoverGroup
}) => {
  return (
    <div className="skillgroups">
      {skillGroups.map((g) => (
        <div
          key={g.id}
          className={`skillgroup ${hoveredGroup === g.id ? 'hl' : ''}`}
          data-g={g.id}
          onPointerEnter={() => onHoverGroup(g.id)}
          onPointerLeave={() => onHoverGroup(null)}
        >
          <span className="label">{g.label}</span>
          <p>{g.skills}</p>
        </div>
      ))}
    </div>
  );
};
