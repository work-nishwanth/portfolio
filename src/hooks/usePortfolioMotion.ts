/**
 * Portfolio Motion Hook - Handles scroll-linked CSS custom properties
 * Works alongside Framer Motion for effects that need CSS variables
 */

import { useEffect } from 'react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function usePortfolioMotion(): void {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;

    root.classList.add('has-js');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-8% 0px -12%', threshold: 0.08 }
    );

    sections.forEach((section) => revealObserver.observe(section));

    const updateScrollMotion = () => {
      frame = 0;
      const viewportHeight = Math.max(window.innerHeight, 1);

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
        section.style.setProperty('--section-progress', progress.toFixed(3));
        section.style.setProperty('--gx', ((progress - 0.5) * 2).toFixed(3));
      });

      const contact = document.querySelector<HTMLElement>('.contact');
      if (contact) {
        const rect = contact.getBoundingClientRect();
        const rotation = clamp((viewportHeight - rect.top) / viewportHeight, 0, 1) * 18;
        contact.style.setProperty('--rot', rotation.toFixed(2));
      }

      // Timeline progress
      const timeline = document.querySelector<HTMLElement>('.timeline');
      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const tp = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
        timeline.style.setProperty('--tp', tp.toFixed(3));
      }

      // Experience step heights
      document.querySelectorAll<HTMLElement>('.step').forEach((step) => {
        const rect = step.getBoundingClientRect();
        const hh = clamp((viewportHeight - rect.top) / viewportHeight, 0, 1);
        step.style.setProperty('--hh', `${(hh * 100).toFixed(1)}%`);
      });
    };

    const requestScrollUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollMotion);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;

      const target = (event.target as Element | null)?.closest<HTMLElement>('.section');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      target.style.setProperty('--mx', ((x - 0.5) * 2).toFixed(3));
      target.style.setProperty('--my', ((y - 0.5) * 2).toFixed(3));
      target.style.setProperty('--lx', `${(x * 100).toFixed(2)}%`);
      target.style.setProperty('--ly', `${(y * 100).toFixed(2)}%`);

      const interactive = (event.target as Element | null)?.closest<HTMLElement>('.strip-item, .step, .plate');
      if (interactive) {
        const itemRect = interactive.getBoundingClientRect();
        interactive.style.setProperty('--x', `${event.clientX - itemRect.left}px`);
        interactive.style.setProperty('--y', `${event.clientY - itemRect.top}px`);
      }
    };

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', requestScrollUpdate);
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    updateScrollMotion();

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', requestScrollUpdate);
      document.removeEventListener('pointermove', handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('has-js');
    };
  }, []);
}
