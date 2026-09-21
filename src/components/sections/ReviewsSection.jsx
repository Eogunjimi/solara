import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { reviews } from '../../data/reviews.js';

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((x) => (x + 1) % reviews.length), 4500);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="reviews section" id="about">
      <div className="container">
        <div className="reviews-head">
          <div>
            <div className="eyebrow">A BETTER WAY TO POWER LIFE</div>
            <h2>
              Solar that works
              <br />
              <i>for your world.</i>
            </h2>
          </div>
          <p className="lead">
            Power cuts, fuel costs and noisy generators shouldn&apos;t dictate your day. We make the
            move to solar clear, considered and built to last.
          </p>
        </div>
        <div className="review-slider">
          <button
            className="review-arrow left"
            onClick={() => setActive((active - 1 + reviews.length) % reviews.length)}
            aria-label="Previous review"
          >
            ‹
          </button>
          <div className="review-viewport">
            <div
              className="review-track"
              style={{ transform: `translateX(-${active * (100 / reviews.length)}%)` }}
            >
              {reviews.map((review, i) => (
                <article
                  className={'review-card ' + (i === active ? 'featured' : '')}
                  key={review.title}
                >
                  <div className="review-stars">★★★★★</div>
                  <p>
                    “{review.title} {review.body}”
                  </p>
                  <div className="review-author">
                    <span>{review.author[0]}</span>
                    <div>
                      <b>{review.author}</b>
                      <small>Solara experience</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button
            className="review-arrow right"
            onClick={() => setActive((active + 1) % reviews.length)}
            aria-label="Next review"
          >
            ›
          </button>
        </div>
        <div className="review-actions">
          <Link className="btn" to="/contact">
            VIEW MORE REVIEWS
          </Link>
        </div>
      </div>
    </section>
  );
}
