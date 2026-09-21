import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ButtonLink from '../ui/ButtonLink.jsx';

export default function WorkCarousel({ items, ctaTo, ctaLabel }) {
  const id = useId();
  const [{ index, direction }, setPosition] = useState({ index: 0, direction: 1 });
  const touchStart = useRef(null);
  if (!items.length) return null;
  const ordered = [...items.slice(index), ...items.slice(0, index)];

  function move(step) {
    setPosition((current) => ({
      index: (current.index + step + items.length) % items.length,
      direction: step,
    }));
  }

  return (
    <div className="work-carousel">
      <p className="sr-only" id={`${id}-instructions`}>
        Use the arrow buttons, left and right arrow keys, or swipe to browse our work.
      </p>
      <div
        className="work-window"
        id={`${id}-gallery`}
        role="group"
        aria-label="Project gallery"
        aria-describedby={`${id}-instructions`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current =
            event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
        }}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          const end = event.changedTouches[0];
          touchStart.current = null;
          if (!start || !end) return;
          const dx = end.clientX - start.x;
          const dy = end.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            event.preventDefault();
            move(dx < 0 ? 1 : -1);
          }
        }}
      >
        <div className="work-track" key={index} style={{ '--work-direction': direction }}>
          {ordered.map((item) => (
            <Link className="past-item work-slide" to="/projects" key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <span>
                {item.title} <ArrowRight size={18} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="work-controls">
        <div className="work-navigation">
          <button
            type="button"
            className="work-arrow"
            aria-label="Previous work"
            aria-controls={`${id}-gallery`}
            onClick={() => move(-1)}
            disabled={items.length < 2}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <span className="work-count" aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="work-arrow"
            aria-label="Next work"
            aria-controls={`${id}-gallery`}
            onClick={() => move(1)}
            disabled={items.length < 2}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="work-pagination" role="group" aria-label="Choose a project">
          {items.map((item, position) => (
            <button
              type="button"
              key={item.title}
              className="work-dot"
              aria-label={`Show: ${item.title}`}
              aria-pressed={position === index}
              aria-controls={`${id}-gallery`}
              onClick={() =>
                setPosition({ index: position, direction: position >= index ? 1 : -1 })
              }
            >
              <span />
            </button>
          ))}
        </div>
        <ButtonLink to={ctaTo}>{ctaLabel}</ButtonLink>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing work starting with {items[index].title}, {index + 1} of {items.length}.
      </p>
    </div>
  );
}
