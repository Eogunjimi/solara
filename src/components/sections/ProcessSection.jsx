import { BadgeCheck, FileText, UserRound, Wrench } from 'lucide-react';
import { processSteps } from '../../data/process.js';
import QuoteForm from '../../features/quote/QuoteForm.jsx';

const stepIcons = {
  '01': UserRound,
  '02': FileText,
  '03': Wrench,
  '04': BadgeCheck,
};

export default function ProcessSection({
  steps = processSteps,
  title,
  description,
  withForm = true,
  listLabel = 'Solar installation steps',
}) {
  return (
    <section
      className={`section process${withForm ? '' : ' process--steps'}`}
      id="process"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <div className="process-panel">
          <div className="process-details">
            <div className="process-intro">
              <div className="eyebrow gold process-eyebrow">
                <span className="process-heading-line" aria-hidden="true" />
                HOW IT WORKS
                <span className="process-heading-line" aria-hidden="true" />
              </div>
              <h2 id="process-heading">
                {title ?? (
                  <>
                    Simple steps to <br />
                    <i>reliable solar power.</i>
                  </>
                )}
              </h2>
              <p>
                {description ??
                  'From your power needs to a fully installed system, we make going solar simple.'}
              </p>
            </div>

            <div className="process-flow">
              <ol className="process-track" aria-label={listLabel} role="list">
                {steps.map((step, index) => {
                  const Icon = stepIcons[step.number] ?? FileText;
                  const isLast = index === steps.length - 1;

                  return (
                    <li
                      className={`process-step${isLast ? ' process-step-complete' : ''}`}
                      key={step.number}
                    >
                      <div className="process-card">
                        <div className="process-icon" aria-hidden="true">
                          <Icon size={28} strokeWidth={1.4} />
                        </div>
                        <div className="process-copy">
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </div>
                        <span className="process-number" aria-hidden="true">
                          {step.number}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          {withForm && (
            <div className="process-form" id="quote">
              <QuoteForm ariaLabel="Start your solar request" compact />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
