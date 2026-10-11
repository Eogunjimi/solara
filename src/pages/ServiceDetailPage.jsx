import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '../data/services.js';
import { serviceDetails } from '../data/serviceDetails.js';
import { serviceAreas } from '../data/serviceAreas.js';
import PageHero from '../components/ui/PageHero.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import HeroSocialProof from '../components/ui/HeroSocialProof.jsx';
import { serviceIcons } from '../components/ui/serviceIcons.js';
import TrustSection from '../components/sections/TrustSection.jsx';
import ReviewsSection from '../components/sections/ReviewsSection.jsx';
import StandardsSection from '../components/sections/StandardsSection.jsx';
import ProcessSection from '../components/sections/ProcessSection.jsx';
import ProjectsSection from '../components/sections/ProjectsSection.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import ServiceCallToAction from '../components/sections/ServiceCallToAction.jsx';
import QuoteForm from '../features/quote/QuoteForm.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { buildServiceSchema } from './serviceSchema.js';

const AREA_LINK_COUNT = 4;

/** Adds one JSON-LD block for the current service page and removes it when the page unmounts. */
function useServiceSchema(schema) {
  const json = schema ? JSON.stringify(schema) : null;
  useEffect(() => {
    if (!json) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.page = 'service';
    script.textContent = json;
    document.head.appendChild(script);
    return () => script.remove();
  }, [json]);
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = services.find((item) => item.id === serviceId);
  const detail = serviceDetails[serviceId];
  const schema =
    service && detail ? buildServiceSchema(service, detail, `/services/${service.id}`) : null;
  useServiceSchema(schema);
  if (!service || !detail) return <NotFoundPage />;

  const related = services.filter((item) => item.id !== serviceId).slice(0, 3);
  const areas = serviceAreas.slice(0, AREA_LINK_COUNT);
  const serviceName = service.title.toLowerCase();
  const heroStyle = detail.heroImage
    ? { '--service-hero-image': `url(${detail.heroImage})` }
    : undefined;

  return (
    <div className="service-detail" key={service.id}>
      <div className={`service-hero${detail.heroImage ? ' has-photo' : ''}`} style={heroStyle}>
        <PageHero eyebrow="OUR SERVICES · LAGOS" title={detail.heroTitle} copy={detail.heroCopy}>
          <p className="service-tagline">{detail.tagline}</p>
          <div className="service-hero-actions">
            <ButtonLink to="#quote">Get a free quote</ButtonLink>
            <ButtonLink to="#projects" outline>
              View our projects
            </ButtonLink>
          </div>
          <HeroSocialProof />
          <Link className="service-back-link" to="/services">
            All services <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </PageHero>
      </div>

      <TrustSection />

      <section className="section service-intro" aria-labelledby="service-intro-heading">
        <div className="container service-intro-grid">
          <div className="service-intro-copy">
            <div className="eyebrow">ABOUT THIS SERVICE</div>
            <h2 id="service-intro-heading">{detail.overviewTitle}</h2>
            {detail.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="service-benefits" aria-label={`Why choose us for ${serviceName}`}>
              {detail.benefits.map((benefit) => (
                <li key={benefit}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="service-start">
              <h3>Where to start</h3>
              <ul>
                {detail.options.map((option) => (
                  <li key={option.title}>
                    <strong>{option.title}</strong>
                    <span>{option.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="service-quote-card" id="quote" aria-labelledby="service-quote-heading">
            <div className="service-quote-intro">
              <div className="eyebrow gold">FREE ASSESSMENT</div>
              <h2 id="service-quote-heading">Request your {serviceName} quote</h2>
              <p>Three quick details to start. We reply to confirm the next step.</p>
            </div>
            <p className="service-quote-for">
              Quote for <strong>{service.title}</strong>
            </p>
            <QuoteForm serviceTitle={service.title} compact ariaLabel="Service quote request" />
          </aside>
        </div>
      </section>

      <StandardsSection
        grid
        eyebrow="WHAT’S INCLUDED"
        title={
          <>
            What your {serviceName} <i>covers.</i>
          </>
        }
        description={`The four stages of our ${serviceName} work, from the first review to the final handover.`}
        points={detail.included}
        icons={detail.includedIcons.map((name) => serviceIcons[name])}
      />

      <ProcessSection
        withForm={false}
        title={
          <>
            How your {serviceName} <i>is delivered.</i>
          </>
        }
        description={`Four steps from your first message to a finished, tested ${serviceName}.`}
        steps={detail.steps}
        listLabel={`${service.title} process steps`}
      />
      <div className="container service-step-cta">
        <ButtonLink to="#quote">Start with a free assessment</ButtonLink>
      </div>

      {detail.portfolio.length > 0 ? (
        <ProjectsSection
          items={detail.portfolio}
          showFilters={false}
          carousel
          ctaTo="#quote"
          ctaLabel="Let’s discuss your project"
          eyebrow="OUR WORK"
          title={
            <>
              Recent <i>{serviceName} work.</i>
            </>
          }
          description={`Completed ${serviceName} projects, shown with the location and the work carried out.`}
        />
      ) : (
        <section
          className="section service-portfolio-pending"
          id="projects"
          aria-labelledby="service-portfolio-heading"
        >
          <div className="container">
            <div className="eyebrow">OUR WORK</div>
            <h2 id="service-portfolio-heading">
              Our <i>{serviceName} work.</i>
            </h2>
            <p>
              We are preparing photographs and details of our completed {serviceName} projects. In
              the meantime, ask our team about comparable work before you decide.
            </p>
            <ButtonLink to="#quote">Let’s discuss your project</ButtonLink>
          </div>
        </section>
      )}

      <ReviewsSection />

      <ServiceCallToAction title={detail.ctaTitle} copy={detail.ctaCopy} />

      <FaqSection
        items={detail.faqs}
        quoteTo="#quote"
        quoteLabel="Get a free quote"
        contactCopy={`Talk to our team about your ${serviceName} needs before you decide.`}
      />

      <section className="service-related" aria-labelledby="service-related-heading">
        <div className="container">
          <div className="service-related-heading">
            <h2 id="service-related-heading">More ways we can help.</h2>
            <Link className="text-link" to="/services">
              All services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="service-related-grid">
            {related.map((item) => (
              <Link to={`/services/${item.id}`} key={item.id}>
                <span>{item.title}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="service-area-links">
            <h3>Service areas</h3>
            <ul>
              {areas.map((area) => (
                <li key={area.slug}>
                  <Link to={`/areas/${area.slug}`}>
                    Solar and electrical services in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="text-link" to="/areas">
              All service areas <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
