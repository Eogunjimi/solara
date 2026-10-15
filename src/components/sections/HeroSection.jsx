import { useState } from 'react';
import { Headset, Pause, Phone, Play, ShieldCheck, Wrench } from 'lucide-react';
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
            <span /> ENGINEERING SERVICES · LAGOS
          </div>
          <h1>Solar Installation & Engineering Services in Lagos</h1>
          <p>
            Solar and inverter systems, plus engineering services, designed and installed by a team
            with 17 years of hands-on experience.
          </p>
          <ul className="hero-features">
            <li className="hero-feature">
              <span aria-hidden="true">
                <ShieldCheck size={17} />
              </span>
              Assessed before we quote
            </li>
            <li className="hero-feature">
              <span aria-hidden="true">
                <Wrench size={17} />
              </span>
              Installed and tested
            </li>
            <li className="hero-feature">
              <span aria-hidden="true">
                <Headset size={17} />
              </span>
              Support after handover
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
