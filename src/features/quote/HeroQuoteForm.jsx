import { useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Info, MapPin, Phone, Sun, User } from 'lucide-react';
import { siteConfig, whatsappHref } from '../../config/site.js';
import { serviceAreas } from '../../data/serviceAreas.js';

// Deliberately local-only, like every other quote form. Connect a real API before
// promising a call-back or showing a "sent" confirmation.
export default function HeroQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const noticeId = useId();
  const areasId = useId();

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
        <span className="hero-quote-badge" aria-hidden="true">
          <Sun size={24} />
        </span>
        <h2>Get your free solar quote</h2>
        <p>Three quick details to get started.</p>
      </div>
      <label className="hero-field">
        <span className="hero-field-label">Full name</span>
        <span className="hero-field-control">
          <User size={17} aria-hidden="true" />
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </span>
      </label>
      <label className="hero-field">
        <span className="hero-field-label">Phone number</span>
        <span className="hero-field-control">
          <Phone size={17} aria-hidden="true" />
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="Your phone number"
          />
        </span>
      </label>
      <label className="hero-field">
        <span className="hero-field-label">Area in Lagos</span>
        <span className="hero-field-control">
          <MapPin size={17} aria-hidden="true" />
          <input
            name="area"
            autoComplete="address-level2"
            required
            list={areasId}
            placeholder="e.g. Lekki, Yaba, Ikeja"
          />
        </span>
        <datalist id={areasId}>
          {serviceAreas.map((area) => (
            <option value={area.name} key={area.slug} />
          ))}
        </datalist>
      </label>
      <button className="btn hero-quote-submit" type="submit">
        Get my free quote <ArrowRight size={17} aria-hidden="true" />
      </button>
      <dl className="hero-quote-stats">
        <div>
          <dt>
            <span>17</span>
          </dt>
          <dd>Years of experience</dd>
        </div>
        <div>
          <dt>
            <span>50+</span>
          </dt>
          <dd>Clients served</dd>
        </div>
        <div>
          <dt>
            <span>7</span>
          </dt>
          <dd>Services offered</dd>
        </div>
      </dl>
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
