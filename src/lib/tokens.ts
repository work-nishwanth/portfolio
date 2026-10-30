/**
 * Design Tokens - Single source of truth for all design decisions
 * Used by both CSS (via CSS custom properties) and TypeScript
 */

export const tokens = {
  color: {
    // Base colors
    bg: '#050505',
    surface: '#111111',
    surfaceElevated: '#1a1a1a',
    surfaceOverlay: '#0d0d0d',

    // Text colors
    ink: '#f6f5f2',
    inkMuted: '#b8b8b8',
    inkFaint: '#6f6f6f',
    inkSubtle: '#4a4a4a',

    // Accent colors
    warm: '#ffab77',
    cool: '#86d5ff',
    violet: '#b083ec',

    // Semantic colors
    border: '#333333',
    borderHover: '#555555',
    borderFocus: '#86d5ff',
    focus: '#86d5ff',

    // State colors
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.75)',
    overlayLight: 'rgba(255, 255, 255, 0.05)',
  },

  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
  },

  typography: {
    fontFamilies: {
      display: '"Anton", Impact, "Arial Narrow", sans-serif',
      body: '"Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"DM Mono", "SF Mono", "Fira Code", monospace',
      serif: '"Instrument Serif", Georgia, serif',
    },

    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '48px',
      '5xl': '64px',
      '6xl': '96px',
      '7xl': '128px',
      // Fluid type scale
      fluid: {
        display: 'clamp(48px, 8vw, 150px)',
        headline: 'clamp(36px, 6vw, 96px)',
        title: 'clamp(28px, 4vw, 56px)',
        body: 'clamp(16px, 1.2vw, 18px)',
        caption: 'clamp(12px, 0.9vw, 14px)',
      },
    },

    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeights: {
      none: 1,
      tight: 1.02,
      snug: 1.1,
      normal: 1.5,
      relaxed: 1.65,
      loose: 1.8,
    },

    letterSpacing: {
      tightest: '-0.06em',
      tighter: '-0.04em',
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
      wider: '0.1em',
      widest: '0.14em',
    },
  },

  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.3)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.35)',
    md: '0 8px 24px rgba(0, 0, 0, 0.4)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.45)',
    xl: '0 24px 64px rgba(0, 0, 0, 0.5)',
    glow: '0 0 60px rgba(134, 213, 255, 0.15)',
    glowWarm: '0 0 60px rgba(255, 171, 119, 0.15)',
    glowViolet: '0 0 60px rgba(176, 131, 236, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
    focus: '0 0 0 2px #86d5ff',
  },

  transitions: {
    instant: '0ms',
    fast: '150ms cubic-bezier(0.19, 1, 0.22, 1)',
    base: '250ms cubic-bezier(0.19, 1, 0.22, 1)',
    slow: '400ms cubic-bezier(0.19, 1, 0.22, 1)',
    slower: '600ms cubic-bezier(0.19, 1, 0.22, 1)',
    spring: 'cubic-bezier(0.19, 1, 0.22, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  breakpoints: {
    sm: '520px',
    md: '800px',
    lg: '1100px',
    xl: '1400px',
    '2xl': '1600px',
  },

  container: {
    maxWidth: '1600px',
    padding: 'clamp(22px, 5vw, 88px)',
  },

  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    toast: 70,
    max: 9999,
  },

  // Motion tokens
  motion: {
    durations: {
      instant: 0,
      fast: 150,
      base: 250,
      slow: 400,
      slower: 600,
      page: 900,
      modal: 650,
    },
    easings: {
      easeOut: [0.19, 1, 0.22, 1],
      easeInOut: [0.4, 0, 0.2, 1],
      easeOutExpo: [0.16, 1, 0.3, 1],
      spring: [0.19, 1, 0.22, 1],
      bounce: [0.34, 1.56, 0.64, 1],
    },
    stagger: {
      tight: 0.05,
      base: 0.08,
      loose: 0.12,
      section: 0.15,
    },
  },
} as const;

// Type exports
export type ColorToken = keyof typeof tokens.color;
export type SpacingToken = keyof typeof tokens.spacing;
export type FontSizeToken = keyof typeof tokens.typography.fontSizes;
export type FontWeightToken = keyof typeof tokens.typography.fontWeights;
export type BorderRadiusToken = keyof typeof tokens.borderRadius;
export type ShadowToken = keyof typeof tokens.shadows;
export type TransitionToken = keyof typeof tokens.transitions;
export type BreakpointToken = keyof typeof tokens.breakpoints;
export type ZIndexToken = keyof typeof tokens.zIndex;

// CSS Custom Property generator
export function generateCSSVariables(): string {
  const lines: string[] = [':root {'];

  // Colors
  Object.entries(tokens.color).forEach(([key, value]) => {
    lines.push(`  --color-${kebabCase(key)}: ${value};`);
  });

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lines.push(`  --space-${key}: ${value};`);
  });

  // Typography - font families
  Object.entries(tokens.typography.fontFamilies).forEach(([key, value]) => {
    lines.push(`  --font-${kebabCase(key)}: ${value};`);
  });

  // Typography - font sizes
  Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
    if (typeof value === 'string') {
      lines.push(`  --text-${kebabCase(key)}: ${value};`);
    }
  });

  // Typography - fluid sizes
  Object.entries(tokens.typography.fontSizes.fluid).forEach(([key, value]) => {
    lines.push(`  --text-fluid-${kebabCase(key)}: ${value};`);
  });

  // Font weights
  Object.entries(tokens.typography.fontWeights).forEach(([key, value]) => {
    lines.push(`  --font-weight-${kebabCase(key)}: ${value};`);
  });

  // Line heights
  Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
    lines.push(`  --leading-${kebabCase(key)}: ${value};`);
  });

  // Letter spacing
  Object.entries(tokens.typography.letterSpacing).forEach(([key, value]) => {
    lines.push(`  --tracking-${kebabCase(key)}: ${value};`);
  });

  // Border radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    lines.push(`  --radius-${kebabCase(key)}: ${value};`);
  });

  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    lines.push(`  --shadow-${kebabCase(key)}: ${value};`);
  });

  // Transitions
  Object.entries(tokens.transitions).forEach(([key, value]) => {
    lines.push(`  --transition-${kebabCase(key)}: ${value};`);
  });

  // Breakpoints (for reference in JS)
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    lines.push(`  --bp-${kebabCase(key)}: ${value};`);
  });

  // Z-index
  Object.entries(tokens.zIndex).forEach(([key, value]) => {
    lines.push(`  --z-${kebabCase(key)}: ${value};`);
  });

  // Motion
  Object.entries(tokens.motion.durations).forEach(([key, value]) => {
    lines.push(`  --duration-${kebabCase(key)}: ${value}ms;`);
  });

  lines.push('}');

  return lines.join('\n');
}

function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Generate and export CSS variables string for injection
export const cssVariables = generateCSSVariables();

// Helper to get token value with fallback
export function getToken<T extends object>(obj: T, path: string, fallback?: unknown): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return fallback;
  }, obj);
}