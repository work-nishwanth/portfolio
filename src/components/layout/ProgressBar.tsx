import React, { useEffect, useRef } from 'react';

export const ProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const el = barRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${current})`;
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
      ref={barRef}
      id="progress"
      className="progress"
      aria-hidden="true"
      style={{ transform: 'scaleX(0)' }}
    />
  );
};
