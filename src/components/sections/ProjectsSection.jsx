import { Link } from 'react-router-dom';
import { useId, useState } from 'react';
import WorkCarousel from './WorkCarousel.jsx';
import { ArrowRight } from 'lucide-react';
import { projects, projectCategories } from '../../data/projects.js';

export default function ProjectsSection({
  items = projects,
  showFilters = true,
  title,
  description,
  eyebrow = 'OUR RECENT WORK',
  carousel = false,
  gallery = false,
  ctaTo = '/contact#quote',
  ctaLabel = 'Discuss your project',
}) {
  const id = useId();
  const [filter, setFilter] = useState('ALL');
  const visible = filter === 'ALL' ? items : items.filter((project) => project.category === filter);
  return (
    <section
      className={`past-work${showFilters ? '' : ' past-work--preview'}${gallery ? ' past-work--gallery' : ''}`}
      id="projects"
      aria-labelledby={`${id}-heading`}
      aria-roledescription={carousel ? 'carousel' : undefined}
    >
      <div className="container">
        <div className="past-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2 id={`${id}-heading`}>
            {title ?? (
              <>
                Power systems built
                <br />
                <i>for everyday life.</i>
              </>
            )}
          </h2>
          {description && <p className="past-description">{description}</p>}
          {showFilters && (
            <div className="past-tabs">
              {projectCategories.map((t) => (
                <button
                  type="button"
                  aria-pressed={filter === t}
                  className={filter === t ? 'active' : ''}
                  onClick={() => setFilter(t)}
                  key={t}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
        {carousel ? (
          <WorkCarousel items={items} ctaTo={ctaTo} ctaLabel={ctaLabel} />
        ) : (
          <div className={gallery ? 'past-grid past-grid--gallery' : 'past-grid'}>
            {visible.map((project, i) => (
              <Link
                className={gallery ? 'past-item past-item--gallery' : 'past-item past-' + i}
                to={gallery ? '/contact#quote' : '/projects'}
                key={project.title}
              >
                <img
                  src={project.image}
                  alt={gallery ? `Illustrative image: ${project.title}` : project.title}
                  loading="lazy"
                />
                <span>
                  {project.title} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
