import { PencilRuler, Headset, Package, ShieldCheck, Wrench } from 'lucide-react';
import { standards } from '../../data/standards.js';
import { images } from '../../data/images.js';

const pointIcons = [Package, Wrench, PencilRuler, Headset];

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
          <div className="eyebrow gold standard-eyebrow">{eyebrow}</div>
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
            {points.map((point, i) => {
              const Icon = pointIcons[i] ?? ShieldCheck;
              return (
                <div className="standard-point" key={point.title}>
                  <span className="standard-point-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <div>
                    <span className="standard-point-index" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </div>
              );
            })}
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
