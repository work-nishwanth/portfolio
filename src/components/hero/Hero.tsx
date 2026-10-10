import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../content/site';
import { Beams } from './Beams';
import { Skyline } from './Skyline';
import { Ticker } from './Ticker';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const baseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const heading = nameRef.current;
    const base = baseRef.current;
    const parent = heading?.parentElement;
    if (!heading || !base || !parent) return;

    const fitName = () => {
      const avail = parent.clientWidth;
      heading.style.fontSize = '100px';
      const w = base.offsetWidth;
      if (w > 0) {
        heading.style.fontSize = `${(100 * avail / w * 0.997)}px`;
      }
    };

    fitName();
    if (document.fonts?.ready) {
      document.fonts.ready.then(fitName);
    }

    const ro = new ResizeObserver(() => {
      fitName();
    });
    ro.observe(parent);

    return () => {
      ro.disconnect();
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="section hero">
      <Beams />
      <Skyline />

      <div className="hero-copy stage">
        <div className="top-row label">
          <span className="kicker">{siteConfig.hero.kicker}</span>
          <span className="muted">{siteConfig.hero.portfolioYear}</span>
        </div>

        <h1 ref={nameRef} className="name" aria-label={siteConfig.name}>
          <span ref={baseRef} className="name-base" aria-hidden="true">
            {siteConfig.name}
          </span>
          <span className="name-lit" aria-hidden="true">
            {siteConfig.name}
          </span>
        </h1>

        <div className="mid">
          <p className="statement">
            Crafting <em>thoughtful</em> systems
            <span style={{ color: 'var(--warm)' }}>.</span>
          </p>

          <div className="side">
            <p className="sub">{siteConfig.hero.sub}</p>

            <div className="hero-actions">
              <a
                className="btn primary"
                href="#work"
                onClick={(e) => handleCtaClick(e, 'work')}
              >
                {siteConfig.hero.ctaWork} <span className="arr" aria-hidden="true">↘</span>
              </a>
              <a
                className="btn"
                href="#contact"
                onClick={(e) => handleCtaClick(e, 'contact')}
              >
                {siteConfig.hero.ctaContact} <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mobile-availability label">
              <span className="dot"></span> {siteConfig.availability}
            </div>
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
};
