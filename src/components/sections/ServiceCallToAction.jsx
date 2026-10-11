import { MessageCircle, Phone } from 'lucide-react';
import { siteConfig, whatsappHref } from '../../config/site.js';
import ButtonLink from '../ui/ButtonLink.jsx';

/** Closing CTA for service pages. Reuses the About banner styling; the quote link stays on the page. */
export default function ServiceCallToAction({ title, copy, to = '#quote' }) {
  return (
    <section className="section service-cta-section" aria-labelledby="service-cta-heading">
      <div className="container">
        <div className="about-cta service-cta">
          <div className="about-cta-title" id="service-cta-heading">
            {title}
          </div>
          <div>
            <p>
              <b>Start with a conversation.</b> {copy}
            </p>
            <ul className="service-cta-contacts" aria-label="Prefer to talk? Contact us directly">
              <li>
                <a href={siteConfig.phoneHref}>
                  <Phone size={15} aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={15} aria-hidden="true" />
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
          <ButtonLink to={to}>Get a free quote</ButtonLink>
        </div>
      </div>
    </section>
  );
}
