import { BadgeCheck, FileText, Mail, MessageCircle, Phone, UserRound, Wrench } from 'lucide-react';
import { processSteps } from '../../data/process.js';
import { siteConfig, whatsappHref } from '../../config/site.js';
import QuoteForm from '../../features/quote/QuoteForm.jsx';

const stepIcons = {
  '01': UserRound,
  '02': FileText,
  '03': Wrench,
  '04': BadgeCheck,
};

const quoteNextSteps = [
  'Tell us what you need to power, and where.',
  'We assess your property and recommend the right system.',
  'You receive a clear quote to review at your own pace.',
];

export function ProcessQuoteSection() {
  return (
    <section className="section quote process-quote" id="quote" aria-labelledby="quote-heading">
      <div className="container quote-grid process-quote-grid">
        <div className="quote-copy process-quote-copy">
          <div className="eyebrow gold">GET YOUR FREE SOLAR QUOTE</div>
          <h2 id="quote-heading">
            Ready to take control of <i>your power?</i>
          </h2>
          <p>
            Tell us what you need to power, where you&apos;re located and how we can reach you. Our
            team will review your request and recommend the right next step.
          </p>
          <ol className="quote-steps" aria-label="How your request is handled">
            {quoteNextSteps.map((step, index) => (
              <li key={step}>
                <span aria-hidden="true">0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <ul className="quote-contact" aria-label="Prefer to talk? Contact us directly">
            <li>
              <a href={siteConfig.phoneHref}>
                <Phone size={16} aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`}>
                <Mail size={16} aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="process-form">
          <QuoteForm ariaLabel="Start your solar request" compact />
        </div>
      </div>
    </section>
  );
}

export default function ProcessSection({
  steps = processSteps,
  title,
  description,
  withForm = true,
  standalone = false,
  listLabel = 'Solar installation steps',
}) {
  return (
    <>
      <section
        className={`section process${withForm ? '' : ' process--steps'}`}
        id="process"
        aria-labelledby="process-heading"
      >
        <div className="container">
          <div
            className={`process-panel${withForm || standalone ? ' process-panel--standalone' : ''}`}
          >
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
          </div>
        </div>
      </section>
      {withForm && <ProcessQuoteSection />}
    </>
  );
}
