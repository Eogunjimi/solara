import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { serviceAreas } from '../data/serviceAreas.js';
import { services } from '../data/services.js';
import PageHero from '../components/ui/PageHero.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import ProcessSection from '../components/sections/ProcessSection.jsx';
import QuoteSection from '../features/quote/QuoteSection.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function AreaDetailPage() {
  const { areaSlug } = useParams();
  const area = serviceAreas.find((item) => item.slug === areaSlug);
  if (!area) return <NotFoundPage />;
  return (
    <div className="area-page" key={area.slug}>
      <PageHero
        eyebrow={`SOLARA IN ${area.name.toUpperCase()}`}
        title={`Solar & electrical services in ${area.name}.`}
        copy={area.intro}
      >
        <div className="area-actions">
          <ButtonLink to="#quote">Free Site Inspection</ButtonLink>
          <ButtonLink to="#area-services" outline>
            Explore services
          </ButtonLink>
        </div>
        <Link className="area-back" to="/areas">
          All service areas <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </PageHero>
      <section className="section area-overview" aria-labelledby="area-overview-heading">
        <div className="container">
          <div className="eyebrow">BUILT AROUND YOUR PROPERTY</div>
          <h2 id="area-overview-heading">
            A practical power plan <i>for {area.name}.</i>
          </h2>
          <p className="lead">
            Your address is only the starting point. We assess your appliances, existing electrical
            setup and available space before recommending solar generation, inverter capacity or
            battery storage.
          </p>
          <ul className="area-focus">
            {area.focus.map((point) => (
              <li key={point}>
                <CheckCircle2 size={22} aria-hidden="true" />
                <p>{point}</p>
              </li>
            ))}
          </ul>
          <p className="area-note">
            Site visits are arranged after our team confirms your exact address, access permissions
            and availability. Please include any estate or building-management requirements when you
            enquire.
          </p>
        </div>
      </section>
      <section
        className="section area-services"
        id="area-services"
        aria-labelledby="area-services-heading"
      >
        <div className="container">
          <div className="eyebrow gold">HOW WE CAN HELP</div>
          <h2 id="area-services-heading">
            Explore services <i>for your property.</i>
          </h2>
          <div className="area-service-grid">
            {services.map((service) => (
              <Link to={`/services/${service.id}`} key={service.id}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span>
                  View service <ArrowRight size={17} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ProcessSection withForm={false} />
      <QuoteSection location={area.name} />
      <FaqSection quoteTo="#quote" />
      <section className="section area-other" aria-labelledby="other-areas-heading">
        <div className="container">
          <h2 id="other-areas-heading">
            Explore other <i>Lagos locations.</i>
          </h2>
          <div className="area-other-links">
            {serviceAreas
              .filter((item) => item.slug !== area.slug)
              .map((item) => (
                <Link to={`/areas/${item.slug}`} key={item.slug}>
                  {item.name}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
