import { Star } from 'lucide-react';

/** The same existing rating and trust message across the homepage and service heroes. */
export default function HeroSocialProof() {
  return (
    <div className="hero-social-proof">
      <div className="proof-avatars" aria-hidden="true">
        <i>A</i>
        <i>K</i>
        <i>J</i>
        <i>N</i>
      </div>
      <b className="facebook-mark" aria-hidden="true">
        f
      </b>
      <div className="proof-rating">
        <strong>
          5.0{' '}
          <span className="proof-stars" role="img" aria-label="5 stars">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} fill="currentColor" aria-hidden="true" />
            ))}
          </span>
        </strong>
        <small>Trusted by 200 Homes &amp; Businesses</small>
      </div>
    </div>
  );
}
