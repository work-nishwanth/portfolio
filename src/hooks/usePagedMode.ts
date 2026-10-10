import { useEffect, useState } from 'react';

export function usePagedMode(): boolean {
  const [isPaged, setIsPaged] = useState<boolean>(false);

  useEffect(() => {
    const checkPaged = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hoverFine = window.matchMedia('(hover: hover)').matches;
      const matches =
        window.innerWidth > 900 &&
        window.innerHeight >= 620 &&
        hoverFine &&
        !reducedMotion;

      setIsPaged(matches);
      if (matches) {
        document.documentElement.setAttribute('data-paged', 'true');
        document.documentElement.classList.add('paged');
      } else {
        document.documentElement.removeAttribute('data-paged');
        document.documentElement.classList.remove('paged');
      }
    };

    checkPaged();
    window.addEventListener('resize', checkPaged);
    const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqlHover = window.matchMedia('(hover: hover)');
    mqlMotion.addEventListener?.('change', checkPaged);
    mqlHover.addEventListener?.('change', checkPaged);

    return () => {
      window.removeEventListener('resize', checkPaged);
      mqlMotion.removeEventListener?.('change', checkPaged);
      mqlHover.removeEventListener?.('change', checkPaged);
      document.documentElement.removeAttribute('data-paged');
      document.documentElement.classList.remove('paged');
    };
  }, []);

  return isPaged;
}
