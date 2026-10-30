/**
 * Intersection Observer Hook
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
) {
  const { once = true, ...observerOptions } = options;
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            setHasIntersected(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsIntersecting(false);
          }
        });
      },
      {
        rootMargin: '-8% 0px -12%',
        threshold: 0.08,
        ...observerOptions,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, observerOptions.rootMargin, observerOptions.threshold]);

  return { ref, isIntersecting, hasIntersected };
}

export function useStaggeredIntersection(
  count: number,
  options: IntersectionObserverOptions = {}
) {
  const refs = useRef<(HTMLElement | null)[]>(new Array(count).fill(null));
  const [intersections, setIntersections] = useState<boolean[]>(new Array(count).fill(false));
  const { once = true, ...observerOptions } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target as HTMLElement);
          if (index !== -1 && entry.isIntersecting) {
            setIntersections((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '-8% 0px -12%',
        threshold: 0.08,
        ...observerOptions,
      }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [count, once, observerOptions.rootMargin, observerOptions.threshold]);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  }, []);

  return { refs: setRef, intersections };
}