import { useId } from 'react';
import { ShieldCheck } from 'lucide-react';
import QuoteForm from './QuoteForm.jsx';

export default function QuoteSection({ serviceTitle }) {
  const headingId = useId();

  return (
    <section className="section quote" id="quote" aria-labelledby={headingId}>
      <div className="container quote-grid">
        <div className="quote-copy">
          <div className="eyebrow gold">
            {serviceTitle ? 'LET’S TALK ABOUT YOUR PROJECT' : 'LET’S TALK SOLAR'}
          </div>
          <h2 id={headingId}>
            {serviceTitle ? (
              <>
                Your next step starts <br />
                <i>with a conversation.</i>
              </>
            ) : (
              <>
                Good energy starts <br />
                <i>with a conversation.</i>
              </>
            )}
          </h2>
          <p>
            {serviceTitle
              ? `Tell us about your ${serviceTitle.toLowerCase()} requirements. We’ll help you understand the next practical step.`
              : 'Tell us about your home or business and what you want to power.'}
          </p>
          <div className="contact-note">
            <span className="contact-note-icon" aria-hidden="true">
              <ShieldCheck size={24} />
            </span>
            <div>
              Designed around you.<b>Practical advice. Thoughtful solutions.</b>
            </div>
          </div>
        </div>
        <QuoteForm
          serviceTitle={serviceTitle}
          ariaLabel={serviceTitle ? 'Service quote request' : 'Solar quote request'}
        />
      </div>
    </section>
  );
}
