# Portfolio Redesign Plan

## Executive Summary
This document outlines the redesign strategy for the portfolio, transforming it from a solid implementation to a senior-level, production-ready codebase with modern patterns, better performance, enhanced accessibility, and maintainable architecture.

---

## Current State Analysis

### Strengths
- Well-structured component architecture
- CSS custom properties for theming
- Custom motion system with IntersectionObserver
- Responsive design with paged/scroll modes
- Good TypeScript usage
- Accessibility considerations (ARIA labels, focus management)

### Areas for Improvement

#### 1. Architecture & State Management
- **Issue**: State scattered across App.tsx (case study, selected project, click position)
- **Solution**: Centralized state with React Context + useReducer or Zustand
- **Benefit**: Predictable state, easier testing, better DevTools

#### 2. Motion System
- **Issue**: CSS custom property-based animation with RAF loop
- **Solution**: Framer Motion for declarative, spring-based animations
- **Benefit**: Better performance, easier stagger/orchestration, reduced boilerplate

#### 3. Component Composition
- **Issue**: Prop drilling, tight coupling between components
- **Solution**: Compound components, render props, custom hooks
- **Benefit**: Reusability, cleaner APIs

#### 4. CSS Architecture
- **Issue**: Single global.css with 1800+ lines, magic numbers, no scoping
- **Solution**: CSS Modules + design tokens + utility classes
- **Benefit**: Scoped styles, maintainability, dead code elimination

#### 5. Performance
- **Issue**: No code splitting, all components loaded upfront
- **Solution**: React.lazy + Suspense for route-based splitting
- **Benefit**: Faster initial load

#### 6. Accessibility
- **Issue**: Basic ARIA, could improve focus management, live regions
- **Solution**: Comprehensive a11y audit and fixes
- **Benefit**: WCAG 2.1 AA compliance

#### 7. Developer Experience
- **Issue**: No Storybook, limited testing, no E2E tests
- **Solution**: Add Vitest + React Testing Library + Playwright
- **Benefit**: Confidence in refactors, documentation

---

## Redesign Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up design token system (JSON/TS)
- [ ] Migrate to CSS Modules with token integration
- [ ] Create centralized state store (Zustand)
- [ ] Set up Framer Motion
- [ ] Add Error Boundaries & Suspense boundaries

### Phase 2: Core Components (Week 2)
- [ ] Refactor Hero with Framer Motion
- [ ] Refactor Work/ProjectStrip with spring animations
- [ ] Refactor CaseStudyDialog with proper focus trap
- [ ] Refactor About/Experience with staggered reveals
- [ ] Refactor Contact

### Phase 3: Motion & Interactions (Week 3)
- [ ] Scroll-linked animations with Framer Motion useScroll
- [ ] Pointer-tracking effects (beams, spotlight)
- [ ] Page transitions (paged mode)
- [ ] Micro-interactions (buttons, cards, inputs)

### Phase 4: Performance & Quality (Week 4)
- [ ] Code splitting with React.lazy
- [ ] Virtualized lists for large datasets
- [ ] Image optimization (WebP, lazy loading)
- [ ] Bundle analysis & optimization
- [ ] Accessibility audit & fixes

### Phase 5: Testing & Polish (Week 5)
- [ ] Unit tests (Vitest + RTL)
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests (Chromatic/Storybook)
- [ ] Performance budgets
- [ ] Documentation

---

## Technical Decisions

### State Management: Zustand
```typescript
// Lightweight, no Provider needed, great DevTools
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
```

### Motion: Framer Motion
```typescript
// Declarative, spring-based, excellent for scroll animations
import { motion, useScroll, useTransform } from 'framer-motion'
```

### Styling: CSS Modules + Design Tokens
```typescript
// tokens.ts - single source of truth
// Component.module.css - scoped styles using tokens
```

### Component Patterns
- Compound components for complex UI (Select, Tabs, Dialog)
- Custom hooks for shared logic (useIntersectionObserver, useReducedMotion)
- Render props for flexible composition

---

## File Structure (Target)

```
src/
├── app/
│   ├── providers/          # Context providers
│   ├── store/              # Zustand stores
│   └── routes/             # Route definitions (future)
├── components/
│   ├── ui/                 # Primitive components (Button, Card, etc.)
│   ├── layout/             # Layout components (Header, Footer, Container)
│   ├── sections/           # Page sections (Hero, Work, About, etc.)
│   ├── case-study/         # Case study specific components
│   └── common/             # Shared components
├── hooks/                  # Custom hooks
├── lib/                    # Utilities, constants
├── motion/                 # Motion variants, transitions
├── styles/
│   ├── tokens.css          # Design tokens (CSS custom props)
│   ├── globals.css         # Reset, base styles
│   └── utilities.css       # Utility classes
├── content/                # Content/data files
├── types/                  # Shared TypeScript types
└── utils/                  # Helper functions
```

---

## Design Tokens (Proposed)

```typescript
// tokens.ts
export const tokens = {
  color: {
    bg: '#050505',
    surface: '#111111',
    surfaceElevated: '#1a1a1a',
    ink: '#f6f5f2',
    inkMuted: '#b8b8b8',
    inkFaint: '#6f6f6f',
    warm: '#ffab77',
    cool: '#86d5ff',
    violet: '#b083ec',
    border: '#333333',
    borderHover: '#555555',
    focus: '#86d5ff',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '128px',
  },
  typography: {
    fontFamilies: {
      display: '"Anton", Impact, "Arial Narrow", sans-serif',
      body: '"Manrope", system-ui, sans-serif',
      mono: '"DM Mono", monospace',
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
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.0,
      snug: 1.1,
      normal: 1.5,
      relaxed: 1.65,
    },
    letterSpacing: {
      tight: '-0.04em',
      normal: '0',
      wide: '0.02em',
      wider: '0.1em',
    },
  },
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.3)',
    md: '0 4px 12px rgba(0,0,0,0.4)',
    lg: '0 12px 40px rgba(0,0,0,0.5)',
    glow: '0 0 60px rgba(134, 213, 255, 0.15)',
  },
  transitions: {
    fast: '150ms ease',
    base: '250ms ease',
    slow: '400ms ease',
    spring: 'cubic-bezier(0.19, 1, 0.22, 1)',
  },
  breakpoints: {
    sm: '520px',
    md: '800px',
    lg: '1100px',
    xl: '1400px',
  },
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 40,
    popover: 50,
    tooltip: 60,
    toast: 70,
  },
} as const
```

---

## Motion System Design

### Variants
```typescript
// motion/variants.ts
export const variants = {
  // Page section reveals
  sectionReveal: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] } },
  },
  // Staggered children
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  },
  // Button hover/tap
  button: {
    hover: { y: -3, transition: { type: 'spring', stiffness: 400, damping: 17 } },
    tap: { scale: 0.98 },
  },
  // Card hover
  card: {
    hover: { y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  },
  // Modal/dialog
  modal: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.6 } 
    },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  },
  // Slide in from bottom
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  },
  // Fade in/out
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
}
```

### Scroll-Linked Animations
```typescript
// Using Framer Motion's useScroll and useTransform
// Replaces the custom RAF loop in usePortfolioMotion
```

---

## Migration Strategy

### 1. Incremental Migration
- Keep existing global.css during transition
- Migrate one component at a time to CSS Modules
- Use `@import` for tokens in CSS Modules

### 2. State Migration
- Create Zustand store alongside existing state
- Migrate one piece of state at a time
- Remove App.tsx state once fully migrated

### 3. Motion Migration
- Add Framer Motion as dependency
- Create motion variants file
- Migrate one section at a time
- Remove usePortfolioMotion once fully migrated

### 4. Testing
- Add tests for critical paths first
- Target 80% coverage for utilities/hooks
- Target 60% coverage for components

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Lighthouse Performance | ~85 | ≥95 |
| Lighthouse Accessibility | ~90 | 100 |
| Lighthouse Best Practices | ~90 | 100 |
| Bundle Size (JS) | ~180KB | <100KB |
| First Contentful Paint | ~1.2s | <0.8s |
| Time to Interactive | ~2.5s | <1.5s |
| Test Coverage | 0% | ≥70% |
| TypeScript Strict Mode | Partial | Full |

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Visual regressions during migration | High | High | Visual regression tests, incremental migration |
| Motion behavior changes | Medium | High | Side-by-side comparison, motion variants documentation |
| Bundle size increase (Framer Motion) | Medium | Medium | Tree-shaking, code splitting, bundle analysis |
| Browser compatibility | Low | High | Polyfills, progressive enhancement, testing matrix |

---

## Dependencies to Add

```json
{
  "dependencies": {
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "vitest": "^1.3.0",
    "@testing-library/react": "^14.2.0",
    "@testing-library/user-event": "^14.5.0",
    "playwright": "^1.42.0",
    "@chromatic-com/storybook": "^1.2.0",
    "storybook": "^8.0.0",
    "@storybook/react": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "stylelint": "^16.2.0",
    "stylelint-config-standard": "^36.0.0"
  }
}
```

---

## Next Steps

1. **Immediate**: Create design token system and CSS Modules setup
2. **Week 1**: Implement Zustand store, add Framer Motion
3. **Week 2**: Refactor Hero and Work sections
4. **Week 3**: Refactor remaining sections, add scroll animations
5. **Week 4**: Performance optimization, code splitting
6. **Week 5**: Testing, documentation, polish

---

*This plan will be updated as implementation progresses.*