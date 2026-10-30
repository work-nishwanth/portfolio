/**
 * Pointer Position Hooks
 */

import { useEffect, useState } from 'react';
import { useReducedMotionQuery } from './useReducedMotion';

export function usePointerPosition(
  elementRef: React.RefObject<HTMLElement>,
  enabled = true
) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const reducedMotion = useReducedMotionQuery();

  useEffect(() => {
    if (!enabled || reducedMotion || !elementRef.current) return;

    const element = elementRef.current;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      setPosition({ x, y });
    };

    element.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => element.removeEventListener('pointermove', handlePointerMove);
  }, [elementRef, enabled, reducedMotion]);

  return position;
}

export function useGlobalPointerPosition(enabled = true) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const reducedMotion = useReducedMotionQuery();
  const finePointer = useFinePointerQuery();

  useEffect(() => {
    if (!enabled || reducedMotion || !finePointer) return;

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      setPosition({ x, y });
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, [enabled, reducedMotion, finePointer]);

  return position;
}

function useFinePointerQuery(): boolean {
  const [matches, setMatches] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener?.('change', handler);

    return () => mediaQuery.removeEventListener?.('change', handler);
  }, []);

  return matches;
}