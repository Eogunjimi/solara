import { useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { siteConfig, whatsappHref } from '../../config/site.js';

// Deliberately local-only, like every other quote form. Connect a real API before
// promising a call-back or showing a "sent" confirmation.
export default function HeroQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const noticeId = useId();

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form
      className="hero-quote"
      aria-label="Get your free solar quote"
      aria-describedby={noticeId}
      onSubmit={submit}
      onChange={() => setSubmitted(false)}
    >
      <div className="hero-quote-heading">
        <h2>Get your free solar quote</h2>
        <p>Three quick details to get started.</p>
      </div>
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
      <label>
        Area in Lagos
        <input
          name="area"
          autoComplete="address-level2"
          required
          placeholder="e.g. Lekki, Yaba, Ikeja"
        />
      </label>
      <button className="btn hero-quote-submit" type="submit">
        Get my free quote <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="hero-quote-notice" id={noticeId}>
        <Info size={15} aria-hidden="true" />
        <span>Demo form: details are not sent or saved yet.</span>
      </p>
      {submitted && (
        <div className="hero-quote-status" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>
            Thanks. This demo has not sent your details, so you can reach us directly:{' '}
            <a href={siteConfig.phoneHref}>{siteConfig.phone}</a> or{' '}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
            .
          </span>
        </div>
      )}
    </form>
  );
}
