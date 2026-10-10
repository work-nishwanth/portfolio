import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { ProgressBar } from './components/layout/ProgressBar';
import { Hero } from './components/hero/Hero';
import { Work } from './components/work/Work';
import { About } from './components/about/About';
import { Experience } from './components/experience/Experience';
import { Contact } from './components/contact/Contact';
import { CaseStudyDialog } from './components/case/CaseStudyDialog';
import { projects } from './content/projects';
import { usePagedMode } from './hooks/usePagedMode';

export const App: React.FC = () => {
  usePagedMode();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(0);
  const [isCaseOpen, setIsCaseOpen] = useState(false);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'work', 'about', 'experience', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Hash synchronization for Case Study modal deep-links
  const openCaseWithIndex = useCallback((index: number, push = true, pos?: { x: number; y: number }) => {
    setSelectedProject(index);
    if (pos) {
      setClickPos(pos);
    }
    setIsCaseOpen(true);
    if (push) {
      const proj = projects[index];
      if (proj) {
        history.pushState({ portfolioCase: true }, '', `#case-${proj.id}`);
      }
    }
  }, []);

  const closeCase = useCallback((fromHistory = false) => {
    setIsCaseOpen(false);
    if (!fromHistory && window.location.hash.startsWith('#case-')) {
      history.back();
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#case-')) {
        const id = hash.replace('#case-', '');
        const idx = projects.findIndex((p) => p.id === id);
        if (idx !== -1) {
          openCaseWithIndex(idx, false);
        }
      } else {
        closeCase(true);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial load check
    const initialHash = window.location.hash;
    if (initialHash.startsWith('#case-')) {
      const id = initialHash.replace('#case-', '');
      const idx = projects.findIndex((p) => p.id === id);
      if (idx !== -1) {
        openCaseWithIndex(idx, false);
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [openCaseWithIndex, closeCase]);

  const handleOpenCase = (index: number) => {
    openCaseWithIndex(index, true);
  };

  const handleNextProject = () => {
    const nextIndex = (selectedProject + 1) % projects.length;
    setSelectedProject(nextIndex);
    const nextProj = projects[nextIndex];
    if (nextProj) {
      history.replaceState({ portfolioCase: true }, '', `#case-${nextProj.id}`);
    }
  };

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ProgressBar />
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <Work
          selectedIndex={selectedProject}
          onSelect={setSelectedProject}
          onOpenCase={handleOpenCase}
        />
        <About />
        <Experience />
        <Contact onNavigate={handleNavigate} />
      </main>

      <CaseStudyDialog
        isOpen={isCaseOpen}
        project={projects[selectedProject]}
        projectIndex={selectedProject}
        totalProjects={projects.length}
        onClose={() => closeCase(false)}
        onNext={handleNextProject}
        clickPos={clickPos}
      />
    </>
  );
};

export default App;
