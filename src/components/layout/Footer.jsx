import { useState } from 'react';
import { ArrowUpRight, ArrowUp, Pause, Play, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site.js';
import ButtonLink from '../ui/ButtonLink.jsx';
import Logo from './Logo.jsx';

const exploreLinks = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'Our services', to: '/services' },
  { label: 'Past work', to: '/projects' },
  { label: 'Blog / Academy', to: '/blog' },
  { label: 'Service areas', to: '/areas' },
];

export default function Footer() {
  const [paused, setPaused] = useState(false);
  const year = new Date().getFullYear();

  function backToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }

  return (
    <footer className="site-footer">
      <div className="footer-marquee">
        <h2 className="sr-only">Solar energy. Powering possibility.</h2>
        <div className={`footer-marquee-track${paused ? ' is-paused' : ''}`} aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="footer-marquee-group" key={copy}>
              <span>SOLAR ENERGY</span>
              <Sun strokeWidth={1.7} />
              <span>POWERING POSSIBILITY</span>
              <Sun strokeWidth={1.7} />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="footer-motion-control"
          aria-label={paused ? 'Resume footer animation' : 'Pause footer animation'}
          title={paused ? 'Resume animation' : 'Pause animation'}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
        </button>
      </div>

      <div className="footer-body">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link className="logo" to="/" aria-label="Solara home">
                <Logo />
              </Link>
              <p className="footer-description">{siteConfig.description}</p>
              <address className="footer-address">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                <span>{siteConfig.location}</span>
              </address>
            </div>

            <div className="footer-link-group">
              <h3>Explore</h3>
              <ul>
                {exploreLinks.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-group">
              <h3>Let’s connect</h3>
              <ul>
                <li>
                  <Link to="/contact">
                    Contact us <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`}>
                    Email our team <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href={siteConfig.phoneHref}>
                    Give us a call <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <Link to="/#faq">
                    FAQs <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-action-column">
              <div className="footer-link-group">
                <h3>Terms & privacy</h3>
                <ul>
                  <li>
                    <Link to="/privacy">Privacy notice</Link>
                  </li>
                  <li>
                    <Link to="/terms">Website terms</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-cta">
                <p>
                  Good energy starts
                  <br />
                  with a conversation.
                </p>
                <ButtonLink to="/contact#quote">Get a free quote</ButtonLink>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <span className="footer-copyright-symbol" aria-hidden="true">
                ©
              </span>
              <div>
                <p>
                  © {year} {siteConfig.title}. All rights reserved.
                </p>
                <span>Powering possibility. Thoughtfully.</span>
              </div>
            </div>
            <span className="footer-year" aria-hidden="true">
              {year}
            </span>
            <button type="button" className="footer-back-top" onClick={backToTop}>
              <ArrowUp size={18} aria-hidden="true" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
