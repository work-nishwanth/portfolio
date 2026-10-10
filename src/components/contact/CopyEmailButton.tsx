import React, { useState } from 'react';
import { siteConfig } from '../../content/site';

export const CopyEmailButton: React.FC = () => {
  const [buttonText, setButtonText] = useState('COPY EMAIL');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setButtonText('COPIED');
      setTimeout(() => {
        setButtonText('COPY EMAIL');
      }, 1700);
    } catch {
      setButtonText('SELECT EMAIL ABOVE');
    }
  };

  return (
    <button
      type="button"
      className="btn"
      id="copy-email"
      onClick={handleCopy}
    >
      {buttonText} <span className="arr" aria-hidden="true">⧉</span>
    </button>
  );
};
