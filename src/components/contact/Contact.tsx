import React from 'react';
import { siteConfig } from '../../content/site';
import { CopyEmailButton } from './CopyEmailButton';

interface ContactProps {
  onNavigate?: (id: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <section id="contact" className="section contact contact-studio" aria-labelledby="contact-heading">
      <div className="shell contact-shell">
        <div className="contact-index label">
          <span>04 / THE NEXT CHAPTER</span>
          <span className="contact-availability"><i aria-hidden="true" />{siteConfig.availability}</span>
        </div>

        <div className="contact-composition">
          <div className="contact-intro">
            <h2 id="contact-heading">GOOD THINGS<br />START WITH<br /><em>a hello.</em></h2>
            <p>A product to build. An idea to explore.<br />Or a team where I can make a difference.</p>
          </div>

          <div className="contact-desk">
            <a className="contact-letter" href={`mailto:${siteConfig.email}`} aria-label={`Start a conversation with ${siteConfig.name} by email`}>
              <span className="letter-address label">TO: NISHWANTH YARRA<br /><span>FULL-STACK & AI DEVELOPER</span></span>
              <span className="letter-stamp" aria-hidden="true">NY<span>INDIA / 2026</span></span>
              <span className="letter-message">LET’S TALK<span className="letter-arrow" aria-hidden="true">↗</span></span>
              <span className="letter-caption label">YOUR NEXT IDEA STARTS HERE</span>
              <svg className="letter-folds" viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 300 160 600 0M0 180 210 110M600 180 390 110" /></svg>
            </a>
            <div className="contact-address-row">
              <div><span className="label muted">DIRECT LINE</span><a className="contact-address" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
              <CopyEmailButton />
            </div>
          </div>
        </div>

        <div className="contact-connections">
          <p className="contact-location"><span className="label muted">BASED IN</span><span>{siteConfig.location}</span><span className="label muted">OPEN TO WHAT’S NEXT.</span></p>
          <a className="contact-social-link" href={siteConfig.github} target="_blank" rel="noopener noreferrer"><span className="label muted">01 / CODE & EXPERIMENTS</span><span>GitHub <span aria-hidden="true">↗</span></span></a>
          <a className="contact-social-link" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><span className="label muted">02 / KEEP IN TOUCH</span><span>LinkedIn <span aria-hidden="true">↗</span></span></a>
        </div>

        <footer className="contact-signoff label muted">
          <span>{siteConfig.copyright}</span>
          <a href="#home" onClick={handleBackToTop}>BACK TO TOP <span aria-hidden="true">↑</span></a>
        </footer>
      </div>
    </section>
  );
};
