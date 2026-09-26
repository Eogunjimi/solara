import { useState } from 'react';
import { CheckCircle2, Pause, Play } from 'lucide-react';
import ButtonLink from '../ui/ButtonLink.jsx';
import HeroSocialProof from '../ui/HeroSocialProof.jsx';

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
      <div className="container hero-content">
        <div className="eyebrow light">
          <span /> SOLAR ENERGY, MADE SIMPLE
        </div>
        <h1>Reliable solar energy for homes &amp; businesses that want more control.</h1>
        <p>
          Smart solar and battery systems for homes and businesses in Lagos—designed around how you
          actually use power.
        </p>
        <div className="hero-actions">
          <ButtonLink to="#quote">Get my free quote</ButtonLink>
          <ButtonLink outline to="#services">
            Explore solutions
          </ButtonLink>
        </div>
        <div className="hero-proof">
          <span>
            <CheckCircle2 size={16} /> Thoughtful system design
          </span>
          <span>
            <CheckCircle2 size={16} /> Professional installation
          </span>
        </div>
        <HeroSocialProof />
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
      <div className="scroll">
        SCROLL TO EXPLORE <span />
      </div>
    </section>
  );
}
