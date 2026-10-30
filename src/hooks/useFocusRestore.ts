/**
 * Focus Restore Hook
 */

import { useRef, useCallback } from 'react';

export function useFocusRestore() {
  const previousElement = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousElement.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    previousElement.current?.focus();
  }, []);

  return { saveFocus, restoreFocus };
}