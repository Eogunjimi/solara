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
  eyebrow = 'OUR PAST WORK',
  carousel = false,
  ctaTo = '/contact#quote',
  ctaLabel = 'Discuss your project',
}) {
  const id = useId();
  const [filter, setFilter] = useState('ALL');
  const visible = filter === 'ALL' ? items : items.filter((project) => project.category === filter);
  return (
    <section
      className={`past-work${showFilters ? '' : ' past-work--preview'}`}
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
                Power projects,
                <br />
                <i>properly delivered.</i>
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
          <div className="past-grid">
            {visible.map((project, i) => (
              <Link className={'past-item past-' + i} to="/projects" key={project.title}>
                <img src={project.image} alt={project.title} loading="lazy" />
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
