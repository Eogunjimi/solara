import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SolarCallToAction() {
  return (
    <div className="about-cta">
      <div className="about-cta-title">
        Ready to take the
        <br />
        <i>next step with solar?</i>
      </div>
      <p>
        <b>Start with a conversation.</b> Tell us what you need and we’ll help you find a practical
        power solution for your home or business.
      </p>
      <Link className="btn" to="/contact#quote">
        GET YOUR FREE SOLAR QUOTE <ArrowRight size={17} />
      </Link>
    </div>
  );
}
