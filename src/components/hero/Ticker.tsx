import React from 'react';
import { tickerItems } from '../../content/site';

export const Ticker: React.FC = () => {
  const renderGroup = () => (
    <div className="tg">
      {tickerItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>{item}</span>
          <i></i>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="ticker label" aria-hidden="true">
      <div className="tt">
        {renderGroup()}
        {renderGroup()}
      </div>
    </div>
  );
};
