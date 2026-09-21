import { ArrowRight } from 'lucide-react';
import { processSteps } from '../../data/process.js';

export default function ProcessSection() {
  return (
    <section className="process process-modern" id="process">
      <div className="container">
        <div className="process-intro">
          <div>
            <div className="eyebrow gold">HOW IT WORKS</div>
            <h2>
              Simple steps to
              <br />
              <i>reliable solar power.</i>
            </h2>
          </div>
          <p>From your power needs to a fully installed system, we make going solar simple.</p>
        </div>
        <div className="process-track">
          {processSteps.map((step) => (
            <article className="process-card" key={step.number}>
              <div className="process-icon">
                <span>{step.number}</span>
                <ArrowRight size={20} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
