import { useEffect, useRef } from 'react';
import type { Project } from '../../content/projects';
import { projects } from '../../content/projects';
import { caseStudyFacts } from '../../content/caseStudyFacts';
import { ProjectPreview } from '../projects/ProjectPreview';
import { projectPreviews } from '../../content/projectPreviews';
import { useTheme } from '../../hooks/useTheme';

type IconName = 'arrow' | 'code' | 'external' | 'home' | 'person' | 'layers' | 'mail' | 'sun' | 'moon';
function CaseIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6" />,
    external: <><path d="M14 3h7v7m0-7L10 14" /><path d="M10 3H4v17h17v-6" /></>,
    home: <><path d="m3 10 9-7 9 7v11h-7v-8h-4v8H3Z" /></>,
    person: <><circle cx="12" cy="7" r="4" /><path d="M4 22v-3a8 8 0 0 1 16 0v3" /></>,
    layers: <path d="m12 2 10 6-10 6L2 8Zm-10 12 10 6 10-6M2 19l10 6 10-6" transform="translate(0 -1) scale(1 .9)" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 5 10 8L22 5" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" /></>,
    moon: <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z" />,
  };
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

interface CaseStudyDialogProps {
  isOpen: boolean;
  project: Project;
  projectIndex: number;
  totalProjects: number;
  onClose: () => void;
  onNext: () => void;
  onSelectProject: (index: number) => void;
  clickPos?: { x: number; y: number } | null;
}

export function CaseStudyDialog({ isOpen, project, projectIndex, totalProjects, onClose, onNext, onSelectProject }: CaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { theme, toggleTheme } = useTheme();
  const study = project.caseStudy;
  const previousIndex = (projectIndex - 1 + totalProjects) % totalProjects;
  const nextIndex = (projectIndex + 1) % totalProjects;
  const facts = caseStudyFacts[project.id] ?? [
    { label: 'Discipline', value: project.category, description: project.role },
    { label: 'Format', value: project.stage, description: project.fullTitle ?? project.title },
    { label: 'Availability', value: project.live ? 'Live demo' : 'Source code', description: project.status },
    { label: 'Tech stack', value: `${project.tags.length} tools`, description: project.tags.join(', ') },
  ];
  const sections = study ? [
    { title: 'Overview', text: study.overview },
    { title: 'My contribution', text: study.contribution },
    { title: 'The problem', text: study.problem },
    { title: 'Architecture', text: study.architecture },
    { title: 'Challenges', text: study.challenges },
    { title: 'Implementation decisions', text: study.decisions },
    { title: 'Results', text: study.results },
    { title: 'Limitations', text: study.limitation },
  ] : [{ title: 'Overview', text: project.overview }];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) {
        previousFocusRef.current = document.activeElement as HTMLElement;
        dialog.showModal();
        headingRef.current?.focus({ preventScroll: true });
      }
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previousOverflow; };
    }
    if (!isOpen && dialog.open) {
      dialog.close();
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => { dialogRef.current?.scrollTo({ top: 0, behavior: 'instant' }); }, [project.id]);

  return (
    <dialog ref={dialogRef} id="case" className="case case-editorial" aria-labelledby="case-title" onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="study-nav">
        <div className="study-nav-inner">
          <div className="study-nav-left">
            <button type="button" id="close-case" className="study-pill study-back" onClick={onClose}><CaseIcon name="arrow" />Back to Projects</button>
            <nav className="study-breadcrumbs" aria-label="Breadcrumb"><a href="/#home">Portfolio</a><span>/</span><a href="/projects/">Projects</a><span>/</span><span aria-current="page">{project.title}</span></nav>
          </div>
          <nav className="study-tabs" aria-label="Quick switch between case studies">
            {projects.map((item, index) => item.caseStudy && <button type="button" className={`study-tab ${item.id === project.id ? 'active' : ''}`} key={item.id} onClick={() => onSelectProject(index)} aria-current={item.id === project.id ? 'page' : undefined}>{item.title === 'Brahmi AI' ? 'Brahmi' : item.title}</button>)}
          </nav>
          <div className="study-nav-actions">
            {project.repo && <a className="study-pill study-header-code" href={project.repo} target="_blank" rel="noopener noreferrer"><CaseIcon name="code" />Code</a>}
            {project.live && <a className="study-pill study-solid" href={project.live} target="_blank" rel="noopener noreferrer"><CaseIcon name="external" />Live Demo</a>}
          </div>
        </div>
      </header>

      <div className="study-container">
        <section className="study-hero" aria-labelledby="case-title">
          <div className="study-badge"><span>{String(projectIndex + 1).padStart(3, '0')}</span>{study ? 'CASE STUDY' : 'PROJECT DETAILS'}</div>
          <h1 id="case-title" ref={headingRef} tabIndex={-1}>{project.title === 'Brahmi AI' ? 'Brahmi' : project.title}<span>.</span></h1>
          {study && <p className="study-headline">{study.headline}</p>}
          <p className="study-summary">{project.summary}</p>
          <div className="study-hero-actions">
            {project.repo && <a id="case-repo" className="study-pill study-solid" href={project.repo} target="_blank" rel="noopener noreferrer"><CaseIcon name="code" />View Source Code</a>}
            {project.live && <a id="case-live" className="study-pill" href={project.live} target="_blank" rel="noopener noreferrer"><CaseIcon name="external" />Launch Live Demo</a>}
            <a className="study-pill" href="/projects/">Explore All Projects</a>
          </div>
          <div className="study-facts">{facts.map((fact) => <div className="study-fact" key={fact.label}><span className="study-eyebrow">{fact.label}</span><strong>{fact.value}</strong><p>{fact.description}</p></div>)}</div>
        </section>

        {study && <section className="study-pipeline" aria-labelledby="study-pipeline-title"><h2 id="study-pipeline-title" className="study-eyebrow">Architectural Pipeline & Data Flow</h2><ol>{study.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}<span className="study-step-arrow" aria-hidden="true">→</span></li>)}<li className="study-output"><span aria-hidden="true">★</span>{study.output}</li></ol></section>}

        <figure className="study-showcase"><ProjectPreview project={project} /><figcaption><span>{projectPreviews[project.id]?.label}</span><span>{project.title} / {project.category}</span></figcaption></figure>
        <div className="study-stack"><span className="study-eyebrow">Tech stack</span><div>{project.tags.map((tag) => <span className="study-tag" key={tag}>{tag}</span>)}</div></div>

        <div className="study-narrative">{sections.map((section) => <section className="study-row" key={section.title}><h2>{section.title}</h2><div className="study-row-content"><p>{section.text}</p></div></section>)}
          <section className="study-row"><h2>Project highlights</h2><div className="study-row-content"><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></section>
        </div>

        <nav className="study-pagination" aria-label="Case study navigation">
          <button type="button" onClick={() => onSelectProject(previousIndex)}><span className="study-eyebrow">← Previous Case Study</span><strong>{projects[previousIndex].title}</strong><span>{projects[previousIndex].category}</span></button>
          <button type="button" id="case-next" onClick={onNext}><span className="study-eyebrow">Next Case Study →</span><strong>{projects[nextIndex].title}</strong><span>{projects[nextIndex].category}</span></button>
        </nav>

        <section className="study-hub" aria-labelledby="study-hub-title"><div className="study-hub-heading"><span className="study-eyebrow">Keep exploring</span><h2 id="study-hub-title">Continue Through The Portfolio</h2><p>More work, the skills behind it, and a way to get in touch.</p></div><div className="study-hub-grid">
          <a href="/projects/"><CaseIcon name="code" /><h3>All {totalProjects} Projects</h3><p>Explore web products, AI experiments, and data work.</p><span>View all projects →</span></a>
          <a href="/#about"><CaseIcon name="layers" /><h3>Skills & Tech Stack</h3><p>The tools and technologies behind the projects.</p><span>Explore my toolkit →</span></a>
          <a href="/#contact"><CaseIcon name="mail" /><h3>Get In Touch</h3><p>Have an opportunity or an idea in mind? Let’s talk.</p><span>Start a conversation →</span></a>
        </div></section>
      </div>

      <nav className="study-dock" aria-label="Portfolio navigation">
        <a href="/#home" aria-label="Home" title="Home"><CaseIcon name="home" /></a>
        <a href="/#about" aria-label="About" title="About"><CaseIcon name="person" /></a>
        <a href="/projects/" className="active" aria-label="All projects" title="All projects"><CaseIcon name="code" /></a>
        <a href="/#contact" aria-label="Contact" title="Contact"><CaseIcon name="mail" /></a>
        <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><CaseIcon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
      </nav>
    </dialog>
  );
}
