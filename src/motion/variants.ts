/**
 * Motion Variants - Centralized Framer Motion variants
 * Replaces CSS custom property animations with declarative variants
 */

import type { Variants, Transition, Easing } from 'framer-motion';
import { tokens } from '../lib/tokens';

// ============================================================================
// Easing Functions
// ============================================================================

export const easings = {
  // Brand easing - used throughout the portfolio
  brand: tokens.motion.easings.easeOut,
  brandInOut: tokens.motion.easings.easeInOut,
  spring: tokens.motion.easings.spring,
  bounce: tokens.motion.easings.bounce,
  expoOut: tokens.motion.easings.easeOutExpo,

  // Standard easings
  linear: 'linear' as Easing,
  easeIn: 'easeIn' as Easing,
  easeOut: 'easeOut' as Easing,
  easeInOut: 'easeInOut' as Easing,
};

// ============================================================================
// Duration Constants (ms)
// ============================================================================

export const durations = {
  instant: tokens.motion.durations.instant,
  fast: tokens.motion.durations.fast,
  base: tokens.motion.durations.base,
  slow: tokens.motion.durations.slow,
  slower: tokens.motion.durations.slower,
  page: tokens.motion.durations.page,
  modal: tokens.motion.durations.modal,
};

// ============================================================================
// Base Transitions
// ============================================================================

import type { SpringOptions } from 'framer-motion';

type SpringTransition = SpringOptions & { type: 'spring' };

export const transitions = {
  // Instant
  none: { duration: 0 } as Transition,

  // Fast micro-interactions
  fast: { duration: durations.fast / 1000, ease: easings.brand } as Transition,

  // Base transitions
  base: { duration: durations.base / 1000, ease: easings.brand } as Transition,
  baseSpring: { type: 'spring', stiffness: 400, damping: 17 } as SpringTransition,

  // Slow transitions
  slow: { duration: durations.slow / 1000, ease: easings.brand } as Transition,
  slowSpring: { type: 'spring', stiffness: 300, damping: 20 } as SpringTransition,

  // Page-level transitions
  page: { duration: durations.page / 1000, ease: easings.brand } as Transition,
  pageSpring: { type: 'spring', stiffness: 280, damping: 25 } as SpringTransition,

  // Modal/dialog transitions
  modal: { duration: durations.modal / 1000, ease: easings.brand } as Transition,
  modalSpring: { type: 'spring', stiffness: 300, damping: 30 } as SpringTransition,

  // Specific use cases
  hover: { type: 'spring', stiffness: 400, damping: 17 } as SpringTransition,
  tap: { type: 'spring', stiffness: 600, damping: 10 } as SpringTransition,
  drag: { type: 'spring', stiffness: 500, damping: 30 } as SpringTransition,
  stagger: { duration: durations.base / 1000, ease: easings.brand } as Transition,
};

// ============================================================================
// Stagger Configurations
// ============================================================================

export const staggerConfigs = {
  tight: { staggerChildren: tokens.motion.stagger.tight, delayChildren: 0 },
  base: { staggerChildren: tokens.motion.stagger.base, delayChildren: 0.1 },
  loose: { staggerChildren: tokens.motion.stagger.loose, delayChildren: 0.15 },
  section: { staggerChildren: tokens.motion.stagger.section, delayChildren: 0.2 },
  reverse: { staggerChildren: -tokens.motion.stagger.base, delayChildren: 0 },
};

// ============================================================================
// Variants
// ============================================================================

/**
 * Section reveal - for page sections entering viewport
 */
export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.page / 1000,
      ease: easings.brand,
    },
  },
};

/**
 * Staggered container - wraps children with stagger
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: staggerConfigs.section,
  },
};

/**
 * Stagger item - individual items in stagger container
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow / 1000,
      ease: easings.brand,
    },
  },
};

/**
 * Button interactions
 */
export const buttonVariants: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    y: -3,
    transition: transitions.hover,
  },
  tap: {
    scale: 0.98,
    transition: transitions.tap,
  },
  focus: {
    scale: 1,
    y: -2,
    transition: transitions.fast,
  },
};

/**
 * Card/item hover
 */
export const cardVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -10,
    transition: transitions.hover,
  },
  tap: {
    scale: 0.98,
    transition: transitions.tap,
  },
  active: {
    y: -4,
    transition: transitions.baseSpring,
  },
};

/**
 * Modal/Dialog
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: transitions.modalSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(4px)',
    transition: { duration: durations.fast / 1000, ease: easings.easeIn },
  },
};

/**
 * Modal backdrop
 */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.base / 1000 } },
  exit: { opacity: 0, transition: { duration: durations.fast / 1000 } },
};

/**
 * Slide up (for content entering)
 */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slowSpring,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: durations.fast / 1000, ease: easings.easeIn },
  },
};

/**
 * Slide down (for content exiting)
 */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slowSpring,
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: durations.fast / 1000, ease: easings.easeIn },
  },
};

/**
 * Fade in/out
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.base / 1000, ease: easings.brand },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast / 1000, ease: easings.easeIn },
  },
};

/**
 * Scale in/out (for popovers, tooltips)
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.baseSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 4,
    transition: { duration: durations.fast / 1000, ease: easings.easeIn },
  },
};

/**
 * Project strip item
 */
export const stripItemVariants: Variants = {
  inactive: {
    flex: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
  active: {
    flex: 6,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
  hover: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    transition: transitions.fast,
  },
};

/**
 * Spotlight/reveal text (for hero name, section headings)
 */
export const spotlightVariants: Variants = {
  hidden: { width: '0%' },
  visible: (custom?: number) => ({
    width: '100%',
    transition: {
      duration: (durations.page / 1000) * 1.2,
      ease: easings.brand,
      delay: custom || 0,
    },
  }),
};

/**
 * Line draw (for accent lines, progress bars)
 */
export const lineDrawVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: { duration: durations.page / 1000, ease: easings.brand },
  },
};

/**
 * Parallax layers
 */
export const parallaxVariants = (depth: number): Variants => ({
  initial: { y: 0 },
  scroll: (progress: number) => ({
    y: progress * depth * 100,
    transition: { duration: 0 },
  }),
});

/**
 * Floating animation (for decorative elements)
 */
export const floatVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Pulse animation (for status indicators)
 */
export const pulseVariants: Variants = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(216, 246, 174, 0.47)',
      '0 0 0 12px rgba(216, 246, 174, 0)',
      '0 0 0 0 rgba(216, 246, 174, 0.47)',
    ],
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Breathing animation (for skyline pillars)
 */
export const breatheVariants: Variants = {
  animate: {
    scaleY: [1, 1.03, 1],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Skew/scroll-linked transform
 */
export const skewVariants: Variants = {
  initial: { skewX: 0, skewY: 0 },
  animate: (custom: { skewX: number; skewY: number }) => ({
    skewX: custom.skewX,
    skewY: custom.skewY,
    transition: { duration: 0 },
  }),
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a custom transition with overrides
 */
export function createTransition(
  base: Transition,
  overrides: Partial<Transition> = {}
): Transition {
  return { ...base, ...overrides };
}

/**
 * Create stagger config with custom values
 */
export function createStaggerConfig(
  staggerChildren: number,
  delayChildren = 0
): Variants['visible'] {
  return {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  };
}

/**
 * Get reduced motion transition
 * Returns instant transitions when prefers-reduced-motion is set
 */
export function getReducedMotionTransition(
  normalTransition: Transition,
  prefersReducedMotion: boolean
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return normalTransition;
}

/**
 * Create scroll-linked transform
 * Use with Framer Motion's useScroll and useTransform
 */
export function createScrollTransform(
  inputRange: [number, number],
  outputRange: [number, number]
) {
  return { inputRange, outputRange };
}

// ============================================================================
// Export all variants as a single object for easy importing
// ============================================================================

export const variants = {
  sectionReveal,
  staggerContainer,
  staggerItem,
  button: buttonVariants,
  card: cardVariants,
  modal: modalVariants,
  backdrop: backdropVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  fade: fadeVariants,
  scale: scaleVariants,
  stripItem: stripItemVariants,
  spotlight: spotlightVariants,
  lineDraw: lineDrawVariants,
  float: floatVariants,
  pulse: pulseVariants,
  breathe: breatheVariants,
  skew: skewVariants,
} as const;

export type VariantKey = keyof typeof variants;