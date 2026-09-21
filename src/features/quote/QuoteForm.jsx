import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// Deliberately local-only. Add a real API integration before accepting enquiries.
export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <form
      className="quote-form"
      aria-label="Solar quote request"
      onSubmit={submit}
      onChange={() => setSubmitted(false)}
    >
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
      <div className="form-row">
        <label>
          Location
          <input name="location" autoComplete="address-level2" required placeholder="Area / city" />
        </label>
        <label>
          Interested in
          <select name="service" defaultValue="" required>
            <option value="" disabled>
              Select a solution
            </option>
            <option>Residential solar</option>
            <option>Commercial solar</option>
            <option>Battery backup</option>
            <option>Inverters & upgrades</option>
            <option>Other / not sure yet</option>
          </select>
        </label>
      </div>
      <label>
        Your power needs
        <textarea name="message" rows={4} required placeholder="What would you like to power?" />
      </label>
      <small>
        Demo form: details are not sent or saved. Online quote requests are not yet connected.
      </small>
      <button className="btn" type="submit">
        Review my request <ArrowRight size={17} />
      </button>
      {submitted && (
        <div className="success" role="status">
          <CheckCircle2 size={18} />
          <span>
            Your details are complete. This is a demo only; your request has not been sent or saved.
          </span>
        </div>
      )}
    </form>
  );
}
