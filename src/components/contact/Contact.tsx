import React from 'react';
import { siteConfig } from '../../content/site';
import { CopyEmailButton } from './CopyEmailButton';

interface ContactProps {
  onNavigate?: (id: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="shell">
        <div className="label kicker">{siteConfig.contact.kicker}</div>

        <h2>
          {siteConfig.contact.headingLine1}
          <br />
          <span className="outline">{siteConfig.contact.headingLine2}</span>
          <br />
          {siteConfig.contact.headingLine3}
        </h2>

        <div className="contact-cta">
          <a className="email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          <CopyEmailButton />
        </div>

        <div className="bottom">
          <div className="social label">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN ↗
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              EMAIL ↗
            </a>
          </div>

          <a className="label muted" href="#home" onClick={handleBackToTop}>
            BACK TO TOP ↑
          </a>

          <span className="label muted">{siteConfig.copyright}</span>
        </div>
      </div>
    </section>
  );
};
