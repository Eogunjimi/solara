import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { reviews } from '../../data/reviews.js';

function GoogleMark() {
  return (
    <span className="google-mark" role="img" aria-label="Google" />
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((x) => (x + 1) % reviews.length), 4500);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="reviews section" id="reviews">
      <div className="container">
        <div className="reviews-head">
          <div>
            <h2>
              What Our Clients
              <br />
              <i>Are Saying?</i>
            </h2>
          </div>
          <p className="lead">
            We have helped 50+ homeowners and businesses across Lagos enjoy reliable and efficient
            power solutions, providing quality solar products and professional solar installation
            services.
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
                  <div className="review-rating" aria-label="5 out of 5 stars on Google">
                    <GoogleMark />
                    <span className="review-stars" aria-hidden="true">
                      ★★★★★
                    </span>
                  </div>
                  <p
                    className="review-copy"
                    tabIndex="0"
                    aria-label={`Review by ${review.author}`}
                  >
                    “{review.title} {review.body}”
                  </p>
                  <div className="review-author">
                    <img src={review.image} alt="" loading="lazy" />
                    <div>
                      <b>{review.author}</b>
                      <small>{review.location}</small>
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
