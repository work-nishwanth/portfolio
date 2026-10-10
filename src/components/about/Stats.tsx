import React from 'react';
import { statsData } from '../../content/stats';

export const Stats: React.FC = () => {
  return (
    <div className="stats">
      {statsData.map((item) => (
        <div key={item.id}>
          <b>{item.value}</b>
          <span className="label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
