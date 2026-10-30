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
import { ProjectsPage } from './components/projects/ProjectsPage';

function getInitialCase(): { isOpen: boolean; index: number } {
  if (typeof window === 'undefined') return { isOpen: false, index: 0 };
  const hash = window.location.hash;
  if (hash.startsWith('#case-')) {
    const id = hash.replace('#case-', '').replace(/^analytics$/, 'sales-analytics');
    const idx = projects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      return { isOpen: true, index: idx };
    }
  }
  return { isOpen: false, index: 0 };
}

export const App: React.FC = () => {
  const isProjectsPage = /^\/projects\/?$/.test(window.location.pathname);
  usePagedMode(!isProjectsPage);

  const [initialCase] = useState(getInitialCase);
  const [selectedProject, setSelectedProject] = useState<number>(initialCase.index);
  const [isCaseOpen, setIsCaseOpen] = useState<boolean>(initialCase.isOpen);
  const [clickPos, setClickPos] = useState<{ x: number; y: number } | null>(null);

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
        window.history.pushState({ portfolioCase: true }, '', `#case-${proj.id}`);
      }
    }
  }, []);

  const closeCase = useCallback((fromHistory = false) => {
    setIsCaseOpen(false);
    if (!fromHistory && window.location.hash.startsWith('#case-')) {
      if (window.history.state?.portfolioCase) {
        window.history.back();
      } else {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#case-')) {
        const id = hash.replace('#case-', '').replace(/^analytics$/, 'sales-analytics');
        const idx = projects.findIndex((p) => p.id === id);
        if (idx !== -1) {
          setSelectedProject(idx);
          setIsCaseOpen(true);
        }
      } else {
        closeCase(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [closeCase]);

  const handleOpenCase = (index: number) => {
    openCaseWithIndex(index, true);
  };

  const handleSwitchProject = (nextIndex: number) => {
    setSelectedProject(nextIndex);
    const nextProj = projects[nextIndex];
    if (nextProj) {
      window.history.replaceState(window.history.state, '', `#case-${nextProj.id}`);
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
      <Header onNavigate={handleNavigate} sectionBase={isProjectsPage ? '/' : ''} />

      <main>
        {isProjectsPage ? <ProjectsPage onOpenCase={handleOpenCase} /> : <>
        <Hero onNavigate={handleNavigate} />
        <Work
          selectedIndex={selectedProject}
          onSelect={setSelectedProject}
          onOpenCase={handleOpenCase}
        />
        <About />
        <Experience />
        <Contact onNavigate={handleNavigate} />
        </>}
      </main>

      <CaseStudyDialog
        isOpen={isCaseOpen}
        project={projects[selectedProject]}
        projectIndex={selectedProject}
        totalProjects={projects.length}
        onClose={() => closeCase(false)}
        onNext={() => handleSwitchProject((selectedProject + 1) % projects.length)}
        onSelectProject={handleSwitchProject}
        clickPos={clickPos}
      />
    </>
  );
};

export default App;
