import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '../data/services.js';
import { serviceDetails } from '../data/serviceDetails.js';
import PageHero from '../components/ui/PageHero.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import HeroSocialProof from '../components/ui/HeroSocialProof.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import ReviewsSection from '../components/sections/ReviewsSection.jsx';
import StandardsSection from '../components/sections/StandardsSection.jsx';
import ProcessSection from '../components/sections/ProcessSection.jsx';
import ProjectsSection from '../components/sections/ProjectsSection.jsx';
import FaqSection from '../components/sections/FaqSection.jsx';
import QuoteSection from '../features/quote/QuoteSection.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const gallery = [
  { title: 'Explore solar installations', image: '/hero-solar.jpg' },
  { title: 'Explore solar panel systems', image: '/panels/mono.jpg' },
  { title: 'Explore panel technology', image: '/panels/bifacial.webp' },
];

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = services.find((item) => item.id === serviceId);
  const detail = serviceDetails[serviceId];
  if (!service || !detail) return <NotFoundPage />;
  const related = services.filter((item) => item.id !== serviceId).slice(0, 3);

  return (
    <div className="service-detail" key={service.id}>
      <PageHero eyebrow="SOLARA SERVICES" title={detail.heroTitle} copy={service.description}>
        <p className="service-tagline">{detail.tagline}</p>
        <div className="service-hero-actions">
          <ButtonLink to="#quote">Get a service quote</ButtonLink>
          <ButtonLink to="#standard" outline>
            See what’s included
          </ButtonLink>
        </div>
        <ul className="service-highlights">
          {detail.highlights.map((item) => (
            <li key={item}>
              <CheckCircle2 size={15} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <HeroSocialProof />
        <Link className="service-back-link" to="/services">
          View all services <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </PageHero>
      <TrustSection />

      <section className="section service-overview" aria-labelledby="service-overview-heading">
        <div className="container service-overview-grid">
          <div>
            <div className="eyebrow">BUILT AROUND YOU</div>
            <h2 id="service-overview-heading">{detail.overviewTitle}</h2>
          </div>
          <div>
            {detail.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="text-link" to="#process">
              See how it works <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <StandardsSection
        grid
        eyebrow="THE SOLARA STANDARD"
        title={
          <>
            What goes into <i>a job done properly.</i>
          </>
        }
        description={`Our approach to ${service.title.toLowerCase()} combines a clear assessment, an agreed scope, and practical support.`}
        points={detail.included}
      />

      <ProcessSection
        withForm={false}
        title={
          <>
            A clear process. <i>From start to finish.</i>
          </>
        }
        description={`Here’s how we approach your ${service.title.toLowerCase()} request.`}
        steps={detail.steps}
        listLabel={`${service.title} process steps`}
      />

      <section className="section service-options" aria-labelledby="service-options-heading">
        <div className="container">
          <div className="service-section-heading">
            <div className="eyebrow gold">YOUR NEXT STEP</div>
            <h2 id="service-options-heading">
              Find your <i>starting point.</i>
            </h2>
            <p>
              Every quote follows an assessment. Start with the situation that best describes your
              needs.
            </p>
          </div>
          <div className="service-options-grid">
            {detail.options.map((option, index) => (
              <article className="service-option" key={option.title}>
                <span className="service-option-number">0{index + 1}</span>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <Link className="text-link" to="#quote">
                  Discuss this option <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection
        items={gallery}
        showFilters={false}
        carousel
        ctaTo="#quote"
        ctaLabel="Discuss your project"
        eyebrow="OUR WORK"
        title={
          <>
            See <i>our work.</i>
          </>
        }
        description="Explore our wider solar and power work. These solar technology images are illustrative; ask our team about examples relevant to your service."
      />

      <ReviewsSection />
      <QuoteSection serviceTitle={service.title} />
      <FaqSection quoteTo="#quote" />

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
        </div>
      </section>
    </div>
  );
}
