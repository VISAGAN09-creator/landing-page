import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, MoveUpRight, Music2, X } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import Reveal from '@/components/Reveal';
import ImageReveal from '@/components/ImageReveal';
import IntroWordmark from '@/components/IntroWordmark';

type Brand = {
  name: string;
  tagline: string;
  description: string;
  accent: string;
  mark: string;
  image: string;
  logo: string;
  link?: BrandLink;
};

type BrandLink =
  | { type: 'external'; href: string }
  | { type: 'internal'; href: string }
  | { type: 'coming-soon' };

const INTERNAL_BRAND_ROUTES: Record<string, { title: string; url: string }> = {
  '/varataaa': {
    title: 'Varataaa',
    url: 'https://ecommerce-f1448.web.app/',
  },
  '/kohleyed': {
    title: 'Kohleyed',
    url: 'https://kohleyed-a8060.web.app/',
  },
};

const brands: Brand[] = [
  { name: 'XKUVZUT', tagline: 'Undefined. Unmatched.', description: 'A study in self-definition, built for the ones who never fit the frame.', accent: '#1a3d2b', mark: 'X', image: 'https://images.pexels.com/photos/1066171/pexels-photo-1066171.jpeg?auto=compress&cs=tinysrgb&h=900&w=600', logo: '/logos/xkuvzut.png', link: { type: 'coming-soon' } },
  { name: 'VARATAAA', tagline: 'Rooted in culture. Worn with purpose.', description: 'Modern uniforms for a new generation of independent thinkers.', accent: '#162e1f', mark: 'V', image: 'https://images.pexels.com/photos/20437814/pexels-photo-20437814.jpeg?auto=compress&cs=tinysrgb&h=900&w=600', logo: '/logos/varataaa.png', link: { type: 'internal', href: '/varataaa' } },
  { name: 'KOHLEYED', tagline: 'See the world differently.', description: 'Unexpected perspective, cut into every considered detail.', accent: '#112918', mark: 'O', image: 'https://images.pexels.com/photos/30492648/pexels-photo-30492648.jpeg?auto=compress&cs=tinysrgb&h=900&w=600', logo: '/logos/kohleyed.jpg', link: { type: 'internal', href: '/kohleyed' } },
  { name: 'KIDNAP', tagline: 'Bold enough to steal the scene.', description: 'A sharper take on streetwear, designed to command the room.', accent: '#0d1f14', mark: 'K', image: 'https://images.pexels.com/photos/19658525/pexels-photo-19658525.jpeg?auto=compress&cs=tinysrgb&h=900&w=600', logo: '/logos/kidnap.jpg', link: { type: 'external', href: 'https://www.instagram.com/kid_naph/' } },
];

const CAROUSEL_SETS = [0, 1, 2, 3];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const brandCarouselRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<number | null>(null);

  const scrollToBrand = useCallback((index: number) => {
    const container = brandCarouselRef.current;
    if (!container) return;
    isInteractingRef.current = true;
    container.classList.add('is-user-scrolling');
    if (interactionTimeoutRef.current) {
      window.clearTimeout(interactionTimeoutRef.current);
    }

    const items = Array.from(container.children) as HTMLElement[];
    const matchingItems = items.filter(
      (el) => Number(el.getAttribute('data-brand-index')) === index
    );
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestItem = matchingItems[0];
    let minDiff = Infinity;
    matchingItems.forEach((item) => {
      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const diff = Math.abs(containerCenter - itemCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestItem = item;
      }
    });

    if (closestItem) {
      const targetLeft =
        closestItem.offsetLeft -
        (container.clientWidth - closestItem.clientWidth) / 2;
      container.scrollTo({ left: targetLeft, behavior: 'smooth' });
      setActiveBrandIndex(index);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      container.classList.remove('is-user-scrolling');
      isInteractingRef.current = false;
    }, 2200);
  }, []);

  useEffect(() => {
    const container = brandCarouselRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTimestamp = performance.now();
    let isVisible = false;
    const speed = 0.045; // pixels per ms (~45px/s) for smooth infinite motion

    const getSetWidth = () => {
      const items = Array.from(container.children) as HTMLElement[];
      if (items.length < 8) return 0;
      return items[4].offsetLeft - items[0].offsetLeft;
    };

    const initTimer = window.setTimeout(() => {
      if (window.innerWidth <= 760) {
        const setWidth = getSetWidth();
        if (setWidth > 0 && container.scrollLeft === 0) {
          const items = Array.from(container.children) as HTMLElement[];
          if (items[4]) {
            container.scrollLeft =
              items[4].offsetLeft -
              (container.clientWidth - items[4].clientWidth) / 2;
          }
        }
      }
    }, 100);

    const updateActiveDot = () => {
      const items = Array.from(container.children) as HTMLElement[];
      if (items.length === 0) return;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;
      items.forEach((item, idx) => {
        const itemCenter = item.offsetLeft + item.clientWidth / 2;
        const diff = Math.abs(containerCenter - itemCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveBrandIndex(closestIdx % brands.length);
    };

    const handleScroll = () => {
      updateActiveDot();
      const setWidth = getSetWidth();
      if (setWidth > 0) {
        if (container.scrollLeft >= setWidth * 2.8) {
          container.scrollLeft -= setWidth;
        } else if (container.scrollLeft <= setWidth * 0.3) {
          container.scrollLeft += setWidth;
        }
      }
    };

    const handleInteractionStart = () => {
      isInteractingRef.current = true;
      container.classList.add('is-user-scrolling');
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    };

    const handleInteractionEnd = () => {
      if (interactionTimeoutRef.current) {
        window.clearTimeout(interactionTimeoutRef.current);
      }
      interactionTimeoutRef.current = window.setTimeout(() => {
        container.classList.remove('is-user-scrolling');
        lastTimestamp = performance.now();
        isInteractingRef.current = false;
      }, 2000);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('touchstart', handleInteractionStart, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd, { passive: true });
    container.addEventListener('pointerenter', handleInteractionStart);
    container.addEventListener('pointerleave', handleInteractionEnd);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTimestamp = performance.now();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const tick = (now: number) => {
      const dt = Math.min(now - lastTimestamp, 50);
      lastTimestamp = now;

      if (
        !isInteractingRef.current &&
        isVisible &&
        window.innerWidth <= 760 &&
        document.visibilityState === 'visible'
      ) {
        const setWidth = getSetWidth();
        if (setWidth > 0) {
          container.scrollLeft += speed * dt;
          if (container.scrollLeft >= setWidth * 2.8) {
            container.scrollLeft -= setWidth;
          } else if (container.scrollLeft <= setWidth * 0.3) {
            container.scrollLeft += setWidth;
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(initTimer);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (interactionTimeoutRef.current) window.clearTimeout(interactionTimeoutRef.current);
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
      container.removeEventListener('pointerenter', handleInteractionStart);
      container.removeEventListener('pointerleave', handleInteractionEnd);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const navigateInternal = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setPathname(path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const internalBrandRoute = INTERNAL_BRAND_ROUTES[normalizedPathname];

  if (internalBrandRoute) {
    return (
      <EmbeddedBrandRoute
        title={internalBrandRoute.title}
        url={internalBrandRoute.url}
        onNavigate={navigateInternal}
      />
    );
  }

  return (
    <div className={`site-shell ${introFinished ? 'intro-finished' : ''}`}>
      <CustomCursor />
      {!introFinished && <IntroWordmark onComplete={() => setIntroFinished(true)} />}

      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="nav-wordmark" href="#top" aria-label="HANDLE home" onClick={closeMenu}>
          <span className="shimmer-text">THEHANDLE.IN</span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <a className="nav-index" href="#brands" onClick={closeMenu}>Explore <ArrowRight size={14} /></a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grain" />
          <div className={`hero-content ${introFinished ? 'hero-ready' : ''}`}>
            <p className="hero-eyebrow brand-fade" style={{ animationDelay: '0.3s' }}>
            </p>
            <div className="hero-title-row">
              <p className="hero-kicker">The house<br />behind the names.</p>
              <h1 className="hero-title">
                <span className="hero-shimmer" data-cursor="hover" data-text="HANDLE">HANDLE</span>
              </h1>
              <div className="hero-bottom brand-fade" style={{ animationDelay: '1.8s' }} aria-label="Our principles">
                <span>ELEVATE</span>
                <span>EXCEL</span>
                <span>ENDORSE</span>
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="brands-section section-pad" id="brands">
          <div className="section-heading">
            <Reveal><div className="section-meta"><span>The portfolio</span></div></Reveal>
            <div className="section-heading-copy">
              <Reveal variant="line" delay={100}>
                <h2>Our brands<span className="green-dot">.</span></h2>
              </Reveal>
              <Reveal delay={200}><p>Four brands. One vision. Infinite identity.</p></Reveal>
            </div>
          </div>
          <div className="brand-grid" ref={brandCarouselRef}>
            {CAROUSEL_SETS.flatMap((setIndex) =>
              brands.map((brand, i) => (
                <div
                  key={`${brand.name}-${setIndex}`}
                  className="brand-carousel-item"
                  data-brand-index={i}
                >
                  <BrandCard brand={brand} />
                </div>
              ))
            )}
          </div>
          <div className="brand-carousel-dots" aria-label="Brand pagination">
            {brands.map((brand, i) => (
              <button
                key={brand.name}
                type="button"
                className={`carousel-dot ${activeBrandIndex === i ? 'is-active' : ''}`}
                onClick={() => scrollToBrand(i)}
                aria-label={`View ${brand.name}`}
              />
            ))}
          </div>
        </section>

        {/* CTA STRIP */}
                <section className="cta-strip section-pad">
          <Reveal variant="line">
            <h2 className="cta-title">Step into<br /><em>the house.</em></h2>
          </Reveal>
          <Reveal delay={150}>
            <a className="solid-button" href="#contact">
              <span>Begin the conversation</span>
              <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </section>
      </main>

  
        {/* ABOUT */}
        <section className="about section-pad" id="about">
          <Reveal><div className="section-meta"><span>Who we are</span></div></Reveal>
          <div className="about-grid">
            <Reveal variant="line" delay={100}>
              <h2 className="about-title">A house of<br /><em>distinct</em> voices.</h2>
            </Reveal>
            <div className="about-story">
              <Reveal delay={150}><p className="large-copy">HANDLE is the force behind the names you wear and the identities you keep.</p></Reveal>
              <Reveal delay={250}><p className="muted-copy">We build fashion brands with their own language, their own rhythm, and a point of view that refuses to be diluted. Four worlds, connected by an obsession with craft.</p></Reveal>
              <Reveal delay={350}><a className="text-link" href="#philosophy">Our philosophy <ArrowUpRight size={15} /></a></Reveal>
            </div>
          </div>
        </section>


        {/* PHILOSOPHY */}
        <section className="philosophy section-pad" id="philosophy">
          <span className="watermark" aria-hidden>HANDLE</span>
          <div className="philosophy-inner">
            <Reveal><div className="section-meta"><span>The standard</span></div></Reveal>
            <Reveal variant="line" delay={100}>
              <h2>Not made for everyone.<br /><em>Made for the one's who lead.</em></h2>
            </Reveal>
            <div className="pillars">
              <Reveal delay={150}><div className="pillar"><h3>Legacy</h3><p>Built to last beyond seasons.</p></div></Reveal>
              <Reveal delay={250}><div className="pillar"><h3>Identity</h3><p>Every brand tells a distinct story.</p></div></Reveal>
              <Reveal delay={350}><div className="pillar"><h3>Culture</h3><p>Worn by those who lead, not follow.</p></div></Reveal>
            </div>
          </div>
        </section>



      {/* FOOTER */}
      <footer className="footer section-pad" id="contact">
        <div className="footer-top">
          <a className="nav-wordmark" href="#top"><span className="shimmer-text">HANDLE</span></a>
          <Reveal delay={100}><p>Building the future of independent fashion.</p></Reveal>
        </div>
        <div className="footer-mid">
          
          
          <div className="socials">
            <a href="#contact" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#contact" aria-label="X"><X size={15} /></a>
            <a href="#contact" aria-label="TikTok"><Music2 size={16} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2024 HANDLE Group. All rights reserved.</span>
          <span>India / Worldwide</span>
        </div>
      </footer>
    </div>
  );
}

function EmbeddedBrandRoute({
  title,
  url,
  onNavigate,
}: {
  title: string;
  url: string;
  onNavigate: (path: string) => void;
}) {
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate('/');
  };

  return (
    <div className="site-shell intro-finished">
      <CustomCursor />
      <header className="site-nav is-scrolled">
        <a className="nav-wordmark" href="/" aria-label="HANDLE home" onClick={goHome}>
          <span className="shimmer-text">THEHANDLE.IN</span>
        </a>
        <nav className="nav-links varataaa-nav-links" aria-label={`${title} navigation`}>
          <a className="nav-index" href="/" onClick={goHome}>Back to HANDLE <ArrowRight size={14} /></a>
        </nav>
      </header>
      <main className="varataaa-route" aria-label={`${title} embedded store`}>
        <iframe
          className="varataaa-frame"
          src={url}
          title={title}
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </main>
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  const [showToast, setShowToast] = useState(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPos.current.x);
    const dy = Math.abs(touch.clientY - touchStartPos.current.y);
    if (dx > 8 || dy > 8) {
      isDragging.current = true;
    }
  };

  const handleCardClick = () => {
    if (isDragging.current) {
      isDragging.current = false;
      return;
    }
    if (!brand.link) return;

    if (brand.link.type === 'coming-soon') {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    const href = brand.link.href;
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const isClickable = !!brand.link;

  return (
    <article
      className={`brand-card ${isClickable ? 'brand-card-clickable' : ''}`}
      style={{ '--brand-accent': brand.accent } as React.CSSProperties}
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      role={isClickable ? 'link' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(); } } : undefined}
      aria-label={isClickable ? `Visit ${brand.name}` : undefined}
    >
      {showToast && (
        <div className="brand-toast">
          <span>Coming Soon</span>
        </div>
      )}
      <div className="brand-card-body">
        <div className="brand-card-center">
          <div className="brand-logo-wrap">
            <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
          </div>
          <p>{brand.tagline}</p>
        </div>
        <div className="brand-card-bottom">
          <p>{brand.description}</p>
          <span className="brand-card-cta">
            {brand.link?.type === 'coming-soon' ? 'Coming soon' : 'Explore'} <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default App;
