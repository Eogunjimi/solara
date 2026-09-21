import { useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles.js';
import ArticleCard from './ArticleCard.jsx';

export default function AcademyPreview() {
  const id = useId();
  const [{ index, direction }, setPosition] = useState({ index: 0, direction: 1 });
  const touchStart = useRef(null);
  const orderedArticles = [...articles.slice(index), ...articles.slice(0, index)];

  function move(step) {
    setPosition((current) => ({
      index: (current.index + step + articles.length) % articles.length,
      direction: step,
    }));
  }

  function handleKeyDown(event) {
    // Do not intercept keys intended for a link or another focused control.
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  }

  function handleTouchEnd(event) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !event.changedTouches[0]) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
  }

  return (
    <section
      className="section blog-preview"
      id="academy"
      aria-labelledby={`${id}-heading`}
      aria-roledescription="carousel"
    >
      <div className="container">
        <div className="academy-heading">
          <button
            type="button"
            className="academy-arrow"
            aria-label="Previous academy articles"
            aria-controls={`${id}-articles`}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <div className="academy-heading-copy">
            <div className="eyebrow gold">FROM THE ACADEMY</div>
            <h2 id={`${id}-heading`}>
              Useful thoughts on <br />
              <i>better energy.</i>
            </h2>
          </div>
          <button
            type="button"
            className="academy-arrow"
            aria-label="Next academy articles"
            aria-controls={`${id}-articles`}
            onClick={() => move(1)}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>

        <div
          className="academy-window"
          id={`${id}-articles`}
          role="group"
          aria-label="Academy articles. Use left and right arrow keys to browse."
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current =
              event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
        >
          <div className="academy-track" key={index} style={{ '--academy-direction': direction }}>
            {orderedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} showExcerpt headingLevel={3} />
            ))}
          </div>
        </div>

        <div className="academy-pagination" aria-label="Choose an academy article">
          {articles.map((article, articleIndex) => (
            <button
              type="button"
              className="academy-dot"
              key={article.id}
              aria-label={`Start with: ${article.title}`}
              aria-pressed={index === articleIndex}
              aria-controls={`${id}-articles`}
              onClick={() => {
                if (articleIndex !== index)
                  setPosition({ index: articleIndex, direction: articleIndex > index ? 1 : -1 });
              }}
            >
              <span />
            </button>
          ))}
          <span className="academy-count" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(articles.length).padStart(2, '0')}
          </span>
        </div>
        <p className="sr-only" role="status">
          Showing articles starting with: {articles[index].title}
        </p>
        <div className="academy-more">
          <Link className="text-link" to="/blog">
            Visit the academy <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
