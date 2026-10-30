/**
 * Unique ID Hook
 */

import { useRef } from 'react';

export function useId(prefix = 'id'): string {
  const idRef = useRef(`${prefix}-${Math.random().toString(36).slice(2, 9)}`);
  return idRef.current;
}