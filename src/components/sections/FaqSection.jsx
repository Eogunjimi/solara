import { useId, useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqs } from '../../data/faqs.js';

export default function FaqSection({
  items = faqs,
  quoteTo = '/#quote',
  quoteLabel = 'Get a Solar Quote',
  contactCopy = 'Talk to our team and get professional advice based on your actual power needs.',
}) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <section className="section faq" id="faq" aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className="faq-intro">
          <div className="eyebrow">GOOD TO KNOW</div>
          <h2 id={`${id}-heading`}>
            Frequently Asked <br />
            <i>Questions</i>
          </h2>
        </div>

        <div className="faq-accordion">
          {items.map((faq, index) => {
            const isOpen = active === index;
            const questionId = `${id}-question-${index}`;
            const answerId = `${id}-answer-${index}`;

            return (
              <div className={`faq-item${isOpen ? ' active' : ''}`} key={faq.question}>
                <h3 className="faq-question">
                  <button
                    className="faq-trigger"
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setActive((current) => (current === index ? -1 : index))}
                  >
                    <span className="faq-question-label">{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-panel"
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                >
                  <p>
                    {faq.answerIntro}
                    {faq.emphasizeAnswer ? <strong>{faq.answer}</strong> : faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-contact">
          <p>
            <strong>Still have questions?</strong>
            <br />
            {contactCopy}
          </p>
          <Link className="text-link" to={quoteTo}>
            {quoteLabel} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
