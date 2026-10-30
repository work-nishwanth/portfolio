import React, { useState, useEffect } from 'react';
import { siteConfig, navItems } from '../../content/site';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  onNavigate?: (id: string) => void;
  sectionBase?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, sectionBase = '' }) => {
  const [activeSection, setActiveSection] = useState(sectionBase ? 'work' : 'home');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (sectionBase) return;
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="top">
      <a
        href={`${sectionBase}#home`}
        className="mark"
        aria-label={`${siteConfig.name}, home`}
        onClick={(e) => handleLinkClick(e, 'home')}
      >
        NY<span>.</span>
      </a>

      <nav
        id="navlinks"
        className={`navlinks label ${menuOpen ? 'open' : ''}`}
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`${sectionBase}#${item.id}`}
            className={activeSection === item.id ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
      <span className="nav-status label">
        <span className="dot"></span>
        {siteConfig.availability}
      </span>

      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />}
        </svg>
      </button>

      <button
        id="menu-toggle"
        className="menu-toggle label"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="navlinks"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>
      </div>
    </header>
  );
};
