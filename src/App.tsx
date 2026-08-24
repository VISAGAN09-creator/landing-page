import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, MoveUpRight, Music2, X } from 'lucide-react';
import CustomCursor from '@/components/CustomCursor';
import Reveal from '@/components/Reveal';
import ImageReveal from '@/components/ImageReveal';
import IntroWordmark from '@/components/IntroWordmark';

type Brand = {
  name: string;
  number: string;
  tagline: string;
  description: string;
  accent: string;
  mark: string;
  image: string;
  link?: BrandLink;
};

type BrandLink =
  | { type: 'external'; href: string }
  | { type: 'internal'; href: string };

const VARATAAA_URL = 'https://ecommerce-f1448.web.app/';

const brands: Brand[] = [
  { name: 'XKUVZUT', number: '01', tagline: 'Undefined. Unmatched.', description: 'A study in self-definition, built for the ones who never fit the frame.', accent: '#1a3d2b', mark: 'X', image: 'https://images.pexels.com/photos/1066171/pexels-photo-1066171.jpeg?auto=compress&cs=tinysrgb&h=900&w=600' },
  { name: 'VARATAAA', number: '02', tagline: 'Rooted in culture. Worn with purpose.', description: 'Modern uniforms for a new generation of independent thinkers.', accent: '#162e1f', mark: 'V', image: 'https://images.pexels.com/photos/20437814/pexels-photo-20437814.jpeg?auto=compress&cs=tinysrgb&h=900&w=600', link: { type: 'internal', href: '/varataaa' } },
  { name: 'KIDNAP', number: '03', tagline: 'Bold enough to steal the scene.', description: 'A sharper take on streetwear, designed to command the room.', accent: '#0d1f14', mark: 'K', image: 'https://images.pexels.com/photos/19658525/pexels-photo-19658525.jpeg?auto=compress&cs=tinysrgb&h=900&w=600', link: { type: 'external', href: 'https://www.instagram.com/kid_naph/' } },
  { name: 'KOHLEYED', number: '04', tagline: 'See the world differently.', description: 'Unexpected perspective, cut into every considered detail.', accent: '#112918', mark: 'O', image: 'https://images.pexels.com/photos/30492648/pexels-photo-30492648.jpeg?auto=compress&cs=tinysrgb&h=900&w=600', link: { type: 'external', href: 'https://www.instagram.com/koh_leyed/' } },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [pathname, setPathname] = useState(() => window.location.pathname);

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

  if (pathname === '/varataaa') {
    return <VarataaaRoute onNavigate={navigateInternal} />;
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
                <span>ENGAGE</span>
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="brands-section section-pad" id="brands">
          <div className="section-heading">
            <Reveal><div className="section-meta"><span>01</span><span>The portfolio</span></div></Reveal>
            <div className="section-heading-copy">
              <Reveal variant="line" delay={100}>
                <h2>Our brands<span className="green-dot">.</span></h2>
              </Reveal>
              <Reveal delay={200}><p>Four brands. One vision. Infinite identity.</p></Reveal>
            </div>
          </div>
          <div className="brand-grid">
            {brands.map((brand, i) => (
              <Reveal key={brand.name} delay={i * 120} threshold={0.15}>
                <BrandCard brand={brand} onInternalNavigate={navigateInternal} />
              </Reveal>
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
          <Reveal><div className="section-meta"><span>02</span><span>Who we are</span></div></Reveal>
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
            <Reveal><div className="section-meta"><span>03</span><span>The standard</span></div></Reveal>
            <Reveal variant="line" delay={100}>
              <h2>Not made for everyone.<br /><em>Made for the one's who lead.</em></h2>
            </Reveal>
            <div className="pillars">
              <Reveal delay={150}><div className="pillar"><span className="pillar-number">01</span><h3>Legacy</h3><p>Built to last beyond seasons.</p></div></Reveal>
              <Reveal delay={250}><div className="pillar"><span className="pillar-number">02</span><h3>Identity</h3><p>Every brand tells a distinct story.</p></div></Reveal>
              <Reveal delay={350}><div className="pillar"><span className="pillar-number">03</span><h3>Culture</h3><p>Worn by those who lead, not follow.</p></div></Reveal>
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

function VarataaaRoute({ onNavigate }: { onNavigate: (path: string) => void }) {
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
        <nav className="nav-links varataaa-nav-links" aria-label="Varataaa navigation">
          <a className="nav-index" href="/" onClick={goHome}>Back to HANDLE <ArrowRight size={14} /></a>
        </nav>
      </header>
      <main className="varataaa-route" aria-label="Varataaa embedded store">
        <iframe
          className="varataaa-frame"
          src={VARATAAA_URL}
          title="Varataaa"
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </main>
    </div>
  );
}

function BrandAction({
  brand,
  children,
  className,
  onInternalNavigate,
}: {
  brand: Brand;
  children: React.ReactNode;
  className?: string;
  onInternalNavigate: (path: string) => void;
}) {
  if (!brand.link) {
    return <a className={className} href="#contact" aria-label={`Learn more about ${brand.name}`}>{children}</a>;
  }

  if (brand.link.type === 'external') {
    return (
      <a className={className} href={brand.link.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${brand.name}`}>
        {children}
      </a>
    );
  }

  const internalHref = brand.link.href;
  // Open internal brand routes in a separate tab while preserving the
  // relative URL (for example, localhost:5173/varataaa).
  if (brand.name === 'VARATAAA') {
    return (
      <a className={className} href={internalHref} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${brand.name}`}>
        {children}
      </a>
    );
  }

  const handleInternalClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onInternalNavigate(internalHref);
  };

  return (
    <a className={className} href={internalHref} onClick={handleInternalClick} aria-label={`Visit ${brand.name}`}>
      {children}
    </a>
  );
}

function BrandCard({ brand, onInternalNavigate }: { brand: Brand; onInternalNavigate: (path: string) => void }) {
  return (
    <article className="brand-card" style={{ '--brand-accent': brand.accent } as React.CSSProperties}>
      <div className="brand-card-image">
        <ImageReveal src={brand.image} alt={`${brand.name} campaign`} parallax={25} />
        <div className="brand-card-overlay" />
      </div>
      <div className="brand-card-body">
        <div className="brand-card-top">
          <span>{brand.number} / 04</span>
          <span className="brand-mark">{brand.mark}</span>
        </div>
        <div className="brand-card-center">
          <h3>
            <BrandAction brand={brand} className="brand-title-link" onInternalNavigate={onInternalNavigate}>
              {brand.name}
            </BrandAction>
          </h3>
          <p>{brand.tagline}</p>
        </div>
        <div className="brand-card-bottom">
          <p>{brand.description}</p>
          <BrandAction brand={brand} onInternalNavigate={onInternalNavigate}>
            Learn more <ArrowRight size={15} />
          </BrandAction>
        </div>
      </div>
    </article>
  );
}

export default App;
