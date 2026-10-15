import { PencilRuler, Headset, Package, ShieldCheck, Wrench } from 'lucide-react';
import { standards } from '../../data/standards.js';
import { images } from '../../data/images.js';

const pointIcons = [Package, Wrench, PencilRuler, Headset];

export default function StandardsSection({
  points = standards,
  title,
  description,
  eyebrow = 'WHY TRUST US',
  grid = false,
  icons,
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
                Good decisions,
                <br />
                <i>built into every system.</i>
              </>
            )}
          </h2>
          <p>
            {description ??
              'The principles behind every quote, installation and handover we deliver.'}
          </p>
          <div className="standard-points">
            {points.map((point, i) => {
              const Icon = icons?.[i] ?? pointIcons[i] ?? ShieldCheck;
              return (
                <div className="standard-point" key={point.title}>
                  <span className="standard-point-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
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
