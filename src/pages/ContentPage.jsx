import PageHero from '../components/ui/PageHero.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import ServicesSection from '../components/sections/ServicesSection.jsx';
import StandardsSection from '../components/sections/StandardsSection.jsx';
import QuoteSection from '../features/quote/QuoteSection.jsx';
import { contentPages } from '../data/pages.js';
import { images } from '../data/images.js';
import NotFoundPage from './NotFoundPage.jsx';

/** The existing brochure pages share this template; their copy lives in data/pages.js. */
export default function ContentPage({ type }) {
  const page = contentPages[type];
  if (!page) return <NotFoundPage />;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} copy={page.description} />
      <section className="section">
        <div className="container content-page">
          <div
            className="feature-image"
            style={{ backgroundImage: `url(${type === 'about' ? images.install : images.roof})` }}
          />
          <div>
            <div className="eyebrow">A THOUGHTFUL APPROACH</div>
            <h2>
              Designed around
              <br />
              <i>your everyday.</i>
            </h2>
            <p className="lead">We make solar clearer, more personal and easier to act on.</p>
            <p>
              Every project begins with understanding your property, your priorities and the power
              challenges you want to solve. Then we recommend a solution that makes sense.
            </p>
            <ButtonLink>Start a conversation</ButtonLink>
          </div>
        </div>
      </section>
      {type === 'services' && <ServicesSection />}
      {type === 'projects' && <StandardsSection />}
      {type === 'contact' && <QuoteSection />}
    </>
  );
}
