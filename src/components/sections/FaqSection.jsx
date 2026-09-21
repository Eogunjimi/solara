import { siteConfig } from '../../config/site.js';
import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { faqs } from '../../data/faqs.js';

export default function FaqSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div>
          <div className="eyebrow">GOOD TO KNOW</div>
          <h2>
            Questions,
            <br />
            <i>answered.</i>
          </h2>
          <p>Still wondering? Our team is happy to talk through your specific situation.</p>
          <a className="text-link" href={`mailto:${siteConfig.email}`}>
            Ask us anything <ArrowRight size={16} />
          </a>
        </div>
        <div className="accordion">
          {faqs.map((faq, i) => (
            <div className={'faq-item ' + (active === i ? 'active' : '')} key={faq.question}>
              <button
                type="button"
                aria-expanded={active === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setActive(active === i ? -1 : i)}
              >
                <span>{faq.question}</span>
                <ChevronDown />
              </button>
              {active === i && <p id={`faq-answer-${i}`}>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
