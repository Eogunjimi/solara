import { ShieldCheck } from 'lucide-react';
import QuoteForm from './QuoteForm.jsx';

export default function QuoteSection() {
  return (
    <section className="quote" id="quote">
      <div className="container quote-grid">
        <div>
          <div className="eyebrow gold">LET’S TALK SOLAR</div>
          <h2>
            Good energy starts
            <br />
            <i>with a conversation.</i>
          </h2>
          <p>Tell us about your home or business and what you want to power.</p>
          <div className="contact-note">
            <ShieldCheck size={24} />
            <div>
              Designed around you.<b>Practical advice. Thoughtful solutions.</b>
            </div>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
