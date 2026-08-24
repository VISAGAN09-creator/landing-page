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
};

const brands: Brand[] = [
  { name: 'XKUVZUT', number: '01', tagline: 'Undefined. Unmatched.', description: 'A study in self-definition, built for the ones who never fit the frame.', accent: '#1a3d2b', mark: 'X', image: 'https://images.pexels.com/photos/1066171/pexels-photo-1066171.jpeg?auto=compress&cs=tinysrgb&h=900&w=600' },
  { name: 'VARATAAA', number: '02', tagline: 'Rooted in culture. Worn with purpose.', description: 'Modern uniforms for a new generation of independent thinkers.', accent: '#162e1f', mark: 'V', image: 'https://images.pexels.com/photos/20437814/pexels-photo-20437814.jpeg?auto=compress&cs=tinysrgb&h=900&w=600' },
  { name: 'KIDNAP', number: '03', tagline: 'Bold enough to steal the scene.', description: 'A sharper take on streetwear, designed to command the room.', accent: '#0d1f14', mark: 'K', image: 'https://images.pexels.com/photos/19658525/pexels-photo-19658525.jpeg?auto=compress&cs=tinysrgb&h=900&w=600' },
  { name: 'KOHLEYED', number: '04', tagline: 'See the world differently.', description: 'Unexpected perspective, cut into every considered detail.', accent: '#112918', mark: 'O', image: 'https://images.pexels.com/photos/30492648/pexels-photo-30492648.jpeg?auto=compress&cs=tinysrgb&h=900&w=600' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

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
            </div>
            <div className="hero-bottom brand-fade" style={{ animationDelay: '1.8s' }} />
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
                <BrandCard brand={brand} />
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
          <div className="about-images">
            <ImageReveal src="https://images.pexels.com/photos/10370358/pexels-photo-10370358.jpeg?auto=compress&cs=tinysrgb&h=1000&w=640" alt="Editorial fashion portrait" parallax={40} className="about-img-left" />
            <ImageReveal src="https://images.pexels.com/photos/31168037/pexels-photo-31168037.jpeg?auto=compress&cs=tinysrgb&h=1000&w=640" alt="Dramatic fashion portrait" parallax={-30} delay={150} className="about-img-right" />
          </div>
        </section>


        {/* PHILOSOPHY */}
        <section className="philosophy section-pad" id="philosophy">
          <span className="watermark" aria-hidden>HANDLE</span>
          <div className="philosophy-inner">
            <Reveal><div className="section-meta"><span>03</span><span>The standard</span></div></Reveal>
            <Reveal variant="line" delay={100}>
              <h2>Not made for everyone.<br /><em>Made for the ones who lead.</em></h2>
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

function BrandCard({ brand }: { brand: Brand }) {
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
          <h3>{brand.name}</h3>
          <p>{brand.tagline}</p>
        </div>
        <div className="brand-card-bottom">
          <p>{brand.description}</p>
          <a href="#contact" aria-label={`Learn more about ${brand.name}`}>Learn more <ArrowRight size={15} /></a>
        </div>
      </div>
    </article>
  );
}

export default App;
