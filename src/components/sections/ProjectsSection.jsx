import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { projects, projectCategories } from '../../data/projects.js';

export default function ProjectsSection() {
  const [filter, setFilter] = useState('ALL');
  const visible =
    filter === 'ALL' ? projects : projects.filter((project) => project.category === filter);
  return (
    <section className="past-work" id="projects">
      <div className="container">
        <div className="past-head">
          <div className="eyebrow">OUR PAST WORK</div>
          <h2>
            Power projects,
            <br />
            <i>properly delivered.</i>
          </h2>
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
        </div>
        <div className="past-grid">
          {visible.map((project, i) => (
            <Link className={'past-item past-' + i} to="/projects" key={project.title}>
              <img src={project.image} alt={project.title} />
              <span>
                {project.title} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
