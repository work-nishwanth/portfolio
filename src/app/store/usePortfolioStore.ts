/**
 * Portfolio Store - Centralized state management using Zustand
 * Replaces scattered useState in App.tsx
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { Project } from '../../content/projects';

// ============================================================================
// Types
// ============================================================================

export interface CaseStudyState {
  isOpen: boolean;
  projectIndex: number;
  clickPosition: { x: number; y: number } | null;
}

export interface UIState {
  // Navigation
  activeSection: string;
  isMenuOpen: boolean;

  // Scroll/Progress
  scrollProgress: number;
  scrollDirection: 'up' | 'down' | null;

  // Viewport
  viewportWidth: number;
  viewportHeight: number;
  isPagedMode: boolean;
  prefersReducedMotion: boolean;
  hasFinePointer: boolean;

  // Interactions
  hoveredProjectIndex: number | null;
  hoveredSkillGroup: number | null;
  isHeaderHidden: boolean;
}

export interface PortfolioState extends CaseStudyState, UIState {
  // Actions - Case Study
  openCaseStudy: (index: number, position?: { x: number; y: number }) => void;
  closeCaseStudy: () => void;
  setCaseStudyIndex: (index: number) => void;
  nextProject: () => void;

  // Actions - Navigation
  setActiveSection: (section: string) => void;
  toggleMenu: () => void;
  closeMenu: () => void;

  // Actions - Scroll
  setScrollProgress: (progress: number) => void;
  setScrollDirection: (direction: 'up' | 'down' | null) => void;

  // Actions - Viewport
  setViewportSize: (width: number, height: number) => void;
  setPagedMode: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setFinePointer: (enabled: boolean) => void;
  setHeaderHidden: (hidden: boolean) => void;

  // Actions - Interactions
  setHoveredProject: (index: number | null) => void;
  setHoveredSkillGroup: (index: number | null) => void;

  // Actions - Reset
  reset: () => void;
}

// ============================================================================
// Initial State
// ============================================================================

const getInitialCaseStudy = (): CaseStudyState => {
  if (typeof window === 'undefined') {
    return { isOpen: false, projectIndex: 0, clickPosition: null };
  }

  const hash = window.location.hash;
  if (hash.startsWith('#case-')) {
    // Note: We can't access projects here directly, will be resolved in App
    hash.replace('#case-', '');
    return { isOpen: true, projectIndex: 0, clickPosition: null };
  }

  return { isOpen: false, projectIndex: 0, clickPosition: null };
};

const initialUIState: UIState = {
  activeSection: 'home',
  isMenuOpen: false,
  scrollProgress: 0,
  scrollDirection: null,
  viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
  viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 1080,
  isPagedMode: false,
  prefersReducedMotion: typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  hasFinePointer: typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : true,
  hoveredProjectIndex: null,
  hoveredSkillGroup: null,
  isHeaderHidden: false,
};

// ============================================================================
// Store
// ============================================================================

export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    (set, get) => ({
      // Case Study State
      ...getInitialCaseStudy(),

      // UI State
      ...initialUIState,

      // Actions - Case Study
      openCaseStudy: (index: number, position?: { x: number; y: number }) => {
        set({
          isOpen: true,
          projectIndex: index,
          clickPosition: position ?? null,
        }, false, 'openCaseStudy');

        // Update URL hash
        if (typeof window !== 'undefined') {
          const projects = getProjects();
          const project = projects?.[index];
          if (project) {
            window.history.pushState({ portfolioCase: true }, '', `#case-${project.id}`);
          }
        }
      },

      closeCaseStudy: () => {
        set({ isOpen: false }, false, 'closeCaseStudy');

        if (typeof window !== 'undefined' && window.location.hash.startsWith('#case-')) {
          if (window.history.state?.portfolioCase) {
            window.history.back();
          } else {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }
      },

      setCaseStudyIndex: (index: number) => {
        set({ projectIndex: index }, false, 'setCaseStudyIndex');

        if (typeof window !== 'undefined') {
          const projects = getProjects();
          const project = projects?.[index];
          if (project && get().isOpen) {
            window.history.replaceState({ portfolioCase: true }, '', `#case-${project.id}`);
          }
        }
      },

      nextProject: () => {
        const { projectIndex, isOpen } = get();
        if (!isOpen) return;

        const projects = getProjects();
        if (!projects?.length) return;

        const nextIndex = (projectIndex + 1) % projects.length;
        set({ projectIndex: nextIndex }, false, 'nextProject');

        const nextProject = projects[nextIndex];
        if (nextProject && typeof window !== 'undefined') {
          window.history.replaceState({ portfolioCase: true }, '', `#case-${nextProject.id}`);
        }
      },

      // Actions - Navigation
      setActiveSection: (section: string) => {
        set({ activeSection: section }, false, 'setActiveSection');
      },

      toggleMenu: () => {
        set((state) => ({ isMenuOpen: !state.isMenuOpen }), false, 'toggleMenu');
      },

      closeMenu: () => {
        set({ isMenuOpen: false }, false, 'closeMenu');
      },

      // Actions - Scroll
      setScrollProgress: (progress: number) => {
        const clamped = Math.max(0, Math.min(1, progress));
        const { scrollProgress } = get();
        const direction = clamped > scrollProgress ? 'down' : clamped < scrollProgress ? 'up' : null;

        set({
          scrollProgress: clamped,
          scrollDirection: direction,
        }, false, 'setScrollProgress');
      },

      setScrollDirection: (direction: 'up' | 'down' | null) => {
        set({ scrollDirection: direction }, false, 'setScrollDirection');
      },

      // Actions - Viewport
      setViewportSize: (width: number, height: number) => {
        set({ viewportWidth: width, viewportHeight: height }, false, 'setViewportSize');
      },

      setPagedMode: (enabled: boolean) => {
        set({ isPagedMode: enabled }, false, 'setPagedMode');

        if (typeof document !== 'undefined') {
          if (enabled) {
            document.documentElement.setAttribute('data-paged', 'true');
            document.documentElement.classList.add('paged');
          } else {
            document.documentElement.removeAttribute('data-paged');
            document.documentElement.classList.remove('paged');
          }
        }
      },

      setReducedMotion: (enabled: boolean) => {
        set({ prefersReducedMotion: enabled }, false, 'setReducedMotion');
      },

      setFinePointer: (enabled: boolean) => {
        set({ hasFinePointer: enabled }, false, 'setFinePointer');
      },

      setHeaderHidden: (hidden: boolean) => {
        set({ isHeaderHidden: hidden }, false, 'setHeaderHidden');
      },

      // Actions - Interactions
      setHoveredProject: (index: number | null) => {
        set({ hoveredProjectIndex: index }, false, 'setHoveredProject');
      },

      setHoveredSkillGroup: (index: number | null) => {
        set({ hoveredSkillGroup: index }, false, 'setHoveredSkillGroup');
      },

      // Actions - Reset
      reset: () => {
        set({
          ...getInitialCaseStudy(),
          ...initialUIState,
        }, false, 'reset');
      },
    }),
    {
      name: 'portfolio-store',
      // Only persist UI preferences, not transient state
      partialize: (state: PortfolioState) => ({
        isPagedMode: state.isPagedMode,
        prefersReducedMotion: state.prefersReducedMotion,
      }),
    }
  )
);

// ============================================================================
// External references (set during app initialization)
// ============================================================================

let projectsRef: Project[] = [];

export function setProjects(projects: Project[]) {
  projectsRef = projects;
}

function getProjects(): Project[] {
  return projectsRef;
}

// ============================================================================
// Selectors (for performance - subscribe to specific state slices)
// ============================================================================

export const useCaseStudy = () => usePortfolioStore(
  useShallow((state) => ({
    isOpen: state.isOpen,
    projectIndex: state.projectIndex,
    clickPosition: state.clickPosition,
    openCaseStudy: state.openCaseStudy,
    closeCaseStudy: state.closeCaseStudy,
    setCaseStudyIndex: state.setCaseStudyIndex,
    nextProject: state.nextProject,
  }))
);

export const useNavigation = () => usePortfolioStore(
  (state) => ({
    activeSection: state.activeSection,
    isMenuOpen: state.isMenuOpen,
    setActiveSection: state.setActiveSection,
    toggleMenu: state.toggleMenu,
    closeMenu: state.closeMenu,
  })
);

export const useScroll = () => usePortfolioStore(
  (state) => ({
    scrollProgress: state.scrollProgress,
    scrollDirection: state.scrollDirection,
    setScrollProgress: state.setScrollProgress,
    setScrollDirection: state.setScrollDirection,
  })
);

export const useViewport = () => usePortfolioStore(
  (state) => ({
    width: state.viewportWidth,
    height: state.viewportHeight,
    isPagedMode: state.isPagedMode,
    prefersReducedMotion: state.prefersReducedMotion,
    hasFinePointer: state.hasFinePointer,
    setViewportSize: state.setViewportSize,
    setPagedMode: state.setPagedMode,
    setReducedMotion: state.setReducedMotion,
    setFinePointer: state.setFinePointer,
  })
);

export const useInteractions = () => usePortfolioStore(
  (state) => ({
    hoveredProjectIndex: state.hoveredProjectIndex,
    hoveredSkillGroup: state.hoveredSkillGroup,
    isHeaderHidden: state.isHeaderHidden,
    setHoveredProject: state.setHoveredProject,
    setHoveredSkillGroup: state.setHoveredSkillGroup,
    setHeaderHidden: state.setHeaderHidden,
  })
);