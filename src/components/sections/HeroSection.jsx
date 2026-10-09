import { useState } from 'react';
import { CheckCircle2, Pause, Phone, Play } from 'lucide-react';
import ButtonLink from '../ui/ButtonLink.jsx';
import HeroSocialProof from '../ui/HeroSocialProof.jsx';
import HeroQuoteForm from '../../features/quote/HeroQuoteForm.jsx';
import { siteConfig } from '../../config/site.js';

export default function HeroSection() {
  const [backgroundPaused, setBackgroundPaused] = useState(false);

  return (
    <section className="hero" id="home">
      <link
        rel="preload"
        as="image"
        href="/hero-rooftop-installers.webp"
        media="(min-width: 601px)"
      />
      <link
        rel="preload"
        as="image"
        href="/hero-rooftop-installers-mobile.webp"
        media="(max-width: 600px)"
      />
      <div className={`hero-background${backgroundPaused ? ' is-paused' : ''}`} aria-hidden="true">
        <div className="hero-background-image" />
      </div>
      <div className="container hero-content hero-layout">
        <div className="hero-copy">
          <div className="eyebrow light">
            <span /> SOLAR INSTALLATION · LAGOS
          </div>
          <h1>Reliable solar installation for Lagos homes &amp; businesses.</h1>
          <p>
            Right-sized solar and battery systems, installed and tested by our team, with support
            after handover. Tell us what you need to power and get a clear recommendation.
          </p>
          <ul className="hero-proof" aria-label="What you get">
            <li>
              <CheckCircle2 size={16} aria-hidden="true" /> Personal system design
            </li>
            <li>
              <CheckCircle2 size={16} aria-hidden="true" /> Careful installation
            </li>
            <li>
              <CheckCircle2 size={16} aria-hidden="true" /> Support that stays
            </li>
          </ul>
          <HeroSocialProof />
          <div className="hero-actions">
            <ButtonLink outline to="#services">
              Explore solutions
            </ButtonLink>
            <a className="hero-call" href={siteConfig.phoneHref}>
              <Phone size={16} aria-hidden="true" /> Call {siteConfig.phone}
            </a>
          </div>
        </div>
        <HeroQuoteForm />
      </div>
      <button
        type="button"
        className="hero-motion-toggle"
        aria-label={backgroundPaused ? 'Play background animation' : 'Pause background animation'}
        title={backgroundPaused ? 'Play background animation' : 'Pause background animation'}
        onClick={() => setBackgroundPaused((paused) => !paused)}
      >
        {backgroundPaused ? (
          <Play size={17} aria-hidden="true" />
        ) : (
          <Pause size={17} aria-hidden="true" />
        )}
      </button>
    </section>
  );
}
