import { CheckCircle2 } from 'lucide-react';
import ButtonLink from '../ui/ButtonLink.jsx';
import { images } from '../../data/images.js';

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" style={{ backgroundImage: `url(${images.hero})` }} />
      <div className="hero-shade" />
      <div className="container hero-content">
        <div className="eyebrow light">
          <span /> SOLAR ENERGY, MADE SIMPLE
        </div>
        <h1>
          Power your day.
          <br />
          <em>Own your energy.</em>
        </h1>
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
        <div className="hero-social-proof">
          <div className="proof-avatars">
            <i>A</i>
            <i>K</i>
            <i>J</i>
            <i>N</i>
          </div>
          <b className="facebook-mark">f</b>
          <div className="proof-rating">
            <strong>
              5.0 <span>★★★★★</span>
            </strong>
            <small>Trusted by 200 Contractors Nationwide</small>
          </div>
        </div>
      </div>
      <div className="scroll">
        SCROLL TO EXPLORE <span />
      </div>
    </section>
  );
}
