import React, { useRef, useEffect } from 'react';
import { siteConfig } from '../../content/site';
import { Beams } from './Beams';
import { Skyline } from './Skyline';
import { Ticker } from './Ticker';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const baseRef = useRef<HTMLSpanElement>(null);
  const pointerFrame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => () => { cancelAnimationFrame(pointerFrame.current); }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (pointerFrame.current) return;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = 0;
      const hero = heroRef.current;
      const name = nameRef.current;
      if (!hero || !name) return;
      const rect = hero.getBoundingClientRect();
      const heading = name.getBoundingClientRect();
      hero.style.setProperty('--mx', String((pointer.current.x - rect.left) / rect.width - .5));
      hero.style.setProperty('--my', String((pointer.current.y - rect.top) / rect.height - .5));
      name.style.setProperty('--lx', `${Math.min(heading.width, Math.max(0, pointer.current.x - heading.left))}px`);
      name.style.setProperty('--ly', `${Math.min(heading.height, Math.max(0, pointer.current.y - heading.top))}px`);
    });
  };

  const resetPointer = () => {
    cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = 0;
    heroRef.current?.style.setProperty('--mx', '0');
    heroRef.current?.style.setProperty('--my', '0');
    nameRef.current?.style.removeProperty('--lx');
    nameRef.current?.style.removeProperty('--ly');
  };

  const renderName = () => Array.from(siteConfig.name).map((letter, index) => (
    <span key={index} className={`hero-glyph${letter === ' ' ? ' hero-glyph-space' : ''}`} style={{ '--glyph-index': index } as React.CSSProperties}>{letter === ' ' ? '\u00a0' : letter}</span>
  ));

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
    <section ref={heroRef} id="home" className="section hero hero-animated" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <Beams />
      <Skyline />

      <div className="hero-copy stage">
        <div className="top-row label">
          <span className="kicker">{siteConfig.hero.kicker}</span>
          <span className="muted">{siteConfig.hero.portfolioYear}</span>
        </div>

        <h1 ref={nameRef} className="name" aria-label={siteConfig.name}>
          <span ref={baseRef} className="name-base" aria-hidden="true">
            {renderName()}
          </span>
          <span className="name-lit" aria-hidden="true">
            {renderName()}
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
