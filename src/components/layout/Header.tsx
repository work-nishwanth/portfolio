import React, { useState, useEffect } from 'react';
import { siteConfig, navItems } from '../../content/site';

interface HeaderProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        href="#home"
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
            href={`#${item.id}`}
            className={activeSection === item.id ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <span className="nav-status label">
        <span className="dot"></span>
        {siteConfig.availability}
      </span>

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
    </header>
  );
};
