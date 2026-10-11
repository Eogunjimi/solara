import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { serviceAreas } from '../data/serviceAreas.js';
import { areaPages } from '../data/areaPages.js';
import { services } from '../data/services.js';
import { serviceDetails } from '../data/serviceDetails.js';
import { reviews } from '../data/reviews.js';
import { siteConfig, whatsappHref } from '../config/site.js';
import PageHero from '../components/ui/PageHero.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import HeroSocialProof from '../components/ui/HeroSocialProof.jsx';
import { serviceIcons } from '../components/ui/serviceIcons.js';
import TrustSection from '../components/sections/TrustSection.jsx';
import StandardsSection from '../components/sections/StandardsSection.jsx';
import ProcessSection from '../components/sections/ProcessSection.jsx';
import ReviewsSection from '../components/sections/ReviewsSection.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import ServiceCallToAction from '../components/sections/ServiceCallToAction.jsx';
import QuoteForm from '../features/quote/QuoteForm.jsx';
import useJsonLd from '../app/useJsonLd.js';
import NotFoundPage from './NotFoundPage.jsx';
import { buildAreaSchema } from './areaSchema.js';

/** Builds the four process steps for one area, using the area's own access and assessment notes. */
function buildAreaSteps(area, page) {
  return [
    {
      number: '01',
      title: 'Tell us about your property',
      description: page.accessNote,
    },
    {
      number: '02',
      title: 'Site assessment',
      description: page.assessmentNote,
    },
    {
      number: '03',
      title: 'Quote and approval',
      description: `You receive a written quote for your ${area.name} property to review. Nothing is installed until you approve it.`,
    },
    {
      number: '04',
      title: 'Installation, testing and handover',
      description:
        'We install and test the system, then walk you through how it works and the support terms in your quote.',
    },
  ];
}

export default function AreaDetailPage() {
  const { areaSlug } = useParams();
  const area = serviceAreas.find((item) => item.slug === areaSlug);
  const page = area ? areaPages[area.slug] : undefined;
  const schema = area && page ? buildAreaSchema(area, page, `/areas/${area.slug}`) : null;
  useJsonLd(schema, 'area');
  if (!area || !page) return <NotFoundPage />;

  const featured = page.featuredServiceIds
    .map((id) => services.find((item) => item.id === id))
    .filter(Boolean);
  const nearby = page.nearby
    .map((slug) => serviceAreas.find((item) => item.slug === slug))
    .filter(Boolean);
  const matchedReviews = reviews.filter((review) => page.reviewLocations.includes(review.location));
  const orderedReviews = [
    ...matchedReviews,
    ...reviews.filter((review) => !matchedReviews.includes(review)),
  ];
  const reviewLead =
    matchedReviews.length > 0
      ? `Reviews from customers in ${page.reviewLocations.join(', ')} appear first, followed by other reviews from across Lagos.`
      : undefined;
  const steps = buildAreaSteps(area, page);

  return (
    <div className="service-detail area-page" key={area.slug}>
      <div className="service-hero area-hero">
        <PageHero
          eyebrow={`SOLAR & ELECTRICAL · ${area.name.toUpperCase()}`}
          title={page.heroTitle}
          copy={area.intro}
        >
          <div className="service-hero-actions">
            <ButtonLink to="#quote">Get a free quote</ButtonLink>
            <ButtonLink to="#projects" outline>
              View our projects
            </ButtonLink>
          </div>
          <ul className="area-contacts" aria-label="Prefer to talk? Contact us directly">
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
          <HeroSocialProof />
          <Link className="service-back-link" to="/areas">
            All service areas <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </PageHero>
      </div>

      <TrustSection />

      <section className="section service-intro area-intro" aria-labelledby="area-intro-heading">
        <div className="container service-intro-grid">
          <div className="service-intro-copy">
            <div className="eyebrow">ABOUT POWER IN {area.name.toUpperCase()}</div>
            <h2 id="area-intro-heading">{page.aboutTitle}</h2>
            {page.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul className="service-benefits" aria-label={`How we approach ${area.name} properties`}>
              {area.focus.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="area-note">
              Site visits are arranged after our team confirms your exact address, access
              permissions and availability.
            </p>
          </div>
          <aside className="service-quote-card" id="quote" aria-labelledby="area-quote-heading">
            <div className="service-quote-intro">
              <div className="eyebrow gold">FREE SITE INSPECTION</div>
              <h2 id="area-quote-heading">Plan your inspection in {area.name}</h2>
              <p>Three quick details to start. We reply to confirm the next step.</p>
            </div>
            <p className="service-quote-for">
              Site inspection in <strong>{area.name}</strong>
            </p>
            <QuoteForm
              location={area.name}
              compact
              ariaLabel={`Site inspection request in ${area.name}`}
            />
          </aside>
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
            Solar and electrical services <i>available in {area.name}.</i>
          </h2>
          <div className="area-service-grid">
            {featured.map((service) => {
              const Icon = serviceIcons[serviceDetails[service.id].includedIcons[0]];
              return (
                <Link to={`/services/${service.id}`} key={service.id}>
                  {Icon && <Icon size={24} aria-hidden="true" />}
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span>
                    View service <ArrowRight size={17} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <StandardsSection
        grid
        eyebrow={`WHY CHOOSE US IN ${area.name.toUpperCase()}`}
        title={
          <>
            Practical reasons <i>to choose us.</i>
          </>
        }
        description={`Our approach for ${area.name} properties, from the first assessment to handover.`}
      />

      <section
        className="section service-portfolio-pending"
        id="projects"
        aria-labelledby="area-projects-heading"
      >
        <div className="container">
          <div className="eyebrow">OUR WORK</div>
          <h2 id="area-projects-heading">
            Our installation work <i>in {area.name}.</i>
          </h2>
          <p>
            We are preparing photographs of completed projects in {area.name}. We will publish only
            work we have completed and can describe accurately, with its location and the work
            carried out. Ask our team about comparable projects before you decide.
          </p>
          <ButtonLink to="#quote">Let’s discuss your project</ButtonLink>
        </div>
      </section>

      <ProcessSection
        withForm={false}
        title={
          <>
            How we plan your power <i>in {area.name}.</i>
          </>
        }
        description={`Four steps from your first message to a tested system in your ${area.name} property.`}
        steps={steps}
        listLabel={`Installation steps for ${area.name}`}
      />
      <div className="container service-step-cta">
        <ButtonLink to="#quote">Start with a free site inspection</ButtonLink>
      </div>

      <ReviewsSection items={orderedReviews} lead={reviewLead} />

      <section className="section area-coverage" aria-labelledby="area-coverage-heading">
        <div className="container">
          <div className="eyebrow">SERVICE COVERAGE</div>
          <h2 id="area-coverage-heading">
            Is your property in <i>{area.name}?</i>
          </h2>
          <p className="lead">
            Send us your exact address and what you need to power. We confirm coverage, access and
            property type before arranging a site visit.
          </p>
          {nearby.length > 0 && (
            <div className="area-nearby">
              <h3>Nearby service areas</h3>
              <ul>
                {nearby.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/areas/${item.slug}`}>
                      Solar and backup power in {item.name}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="area-coverage-actions">
            <ButtonLink to="#quote">Confirm my property is covered</ButtonLink>
            <Link className="text-link" to="/areas">
              All service areas <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        items={page.faqs}
        quoteTo="#quote"
        quoteLabel="Get a free quote"
        contactCopy={`Talk to our team about your ${area.name} property before you decide.`}
      />

      <ServiceCallToAction
        title={`Ready to plan power for your ${area.name} property?`}
        copy="Request a free site inspection. We confirm access and availability first, then agree on the next step."
      />
      <ol className="area-next" aria-label="What happens after you submit a request">
        <li>
          <span aria-hidden="true">01</span>
          We review the details you send us.
        </li>
        <li>
          <span aria-hidden="true">02</span>
          We reply to confirm access, availability and the best visit time.
        </li>
        <li>
          <span aria-hidden="true">03</span>
          After the site assessment, you receive a written quote to review.
        </li>
      </ol>
    </div>
  );
}
