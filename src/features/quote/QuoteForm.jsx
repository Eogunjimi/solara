import { useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Info, Sun } from 'lucide-react';
import { services } from '../../data/services.js';

// Deliberately local-only. Add a real API integration before accepting enquiries.
export default function QuoteForm({
  ariaLabel = 'Solar quote request',
  compact = false,
  serviceTitle,
  location = '',
}) {
  const [submitted, setSubmitted] = useState(false);
  const noticeId = useId();
  const serviceOptions = serviceTitle
    ? [...services.map((service) => service.title), 'Other / not sure yet']
    : [
        'Residential solar',
        'Commercial solar',
        'Battery backup',
        'Inverters & upgrades',
        'Other / not sure yet',
      ];
  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <form
      className="quote-form"
      aria-label={ariaLabel}
      aria-describedby={noticeId}
      onSubmit={submit}
      onChange={() => setSubmitted(false)}
    >
      <div className="quote-form-heading">
        {!compact && (
          <span className="quote-form-mark" aria-hidden="true">
            <Sun size={24} />
          </span>
        )}
        <div>
          <h3>{serviceTitle ? 'Your service request' : 'Your solar request'}</h3>
          <p>{compact ? 'Just a few details to get started.' : 'All fields are required.'}</p>
        </div>
      </div>
      <div className="form-row">
        <label>
          Full name
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          Phone number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="Your phone number"
          />
        </label>
      </div>
      {!compact && (
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </label>
      )}
      <div className={compact ? undefined : 'form-row'}>
        <label>
          Location
          <input
            name="location"
            autoComplete="address-level2"
            required
            placeholder="Area / city"
            defaultValue={location}
          />
        </label>
        {!compact && (
          <label>
            Interested in
            <select name="service" defaultValue={serviceTitle ?? ''} required>
              <option value="" disabled>
                Select a solution
              </option>
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <label>
        {serviceTitle
          ? 'Tell us what you need'
          : compact
            ? 'Your power needs (optional)'
            : 'Your power needs'}
        <textarea
          name="message"
          rows={compact ? 2 : 4}
          required={!compact}
          placeholder={
            serviceTitle
              ? 'Tell us about your property, equipment, or the issue you want to solve.'
              : 'What would you like to power?'
          }
        />
      </label>
      <div className="quote-demo-notice" id={noticeId}>
        <Info size={17} aria-hidden="true" />
        <small>
          {compact
            ? 'Demo only: details are not sent or saved.'
            : 'Demo form: details are not sent or saved. Online quote requests are not yet connected.'}
        </small>
      </div>
      <button className="btn" type="submit">
        Review my request <ArrowRight size={17} aria-hidden="true" />
      </button>
      {submitted && (
        <div className="quote-confirmation" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>
            Your details are complete. This is a demo only; your request has not been sent or saved.
          </span>
        </div>
      )}
    </form>
  );
}
