import { ShieldCheck } from 'lucide-react';
import { standards } from '../../data/standards.js';
import { images } from '../../data/images.js';

export default function StandardsSection({
  points = standards,
  title,
  description,
  eyebrow = 'THE SOLARA STANDARD',
  grid = false,
}) {
  return (
    <section
      className={`feature standard-section${grid ? ' standard-section--grid' : ''}`}
      id="standard"
    >
      <div className="container standard-grid">
        <div className="standard-copy">
          <div className="eyebrow">{eyebrow}</div>
          <h2>
            {title ?? (
              <>
                Why people choose
                <br />
                <i>to work with us.</i>
              </>
            )}
          </h2>
          <p>
            {description ??
              'Good energy is built on good decisions. Here’s what sets our approach apart.'}
          </p>
          <div className="standard-points">
            {points.map((point, i) => (
              <div className="standard-point" key={point.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {!grid && (
          <div className="standard-visual">
            <div className="standard-image" style={{ backgroundImage: `url(${images.roof})` }} />
            <div className="standard-badge">
              <ShieldCheck size={23} />
              <span>
                THE SOLARA
                <br />
                <b>STANDARD</b>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
