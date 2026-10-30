/**
 * Animation Frame Hook
 */

import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (time: number) => void) {
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = (time: number) => {
      callback(time);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [callback]);
}