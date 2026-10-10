import React, { useEffect, useState } from 'react';

export const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(current);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      id="progress"
      className="progress"
      aria-hidden="true"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
};
