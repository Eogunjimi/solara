import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import { serviceAreas } from '../data/serviceAreas.js';
import { contentPages } from '../data/pages.js';

export default function AreasPage() {
  const page = contentPages.areas;
  return (
    <div className="area-page">
      <PageHero eyebrow={page.eyebrow} title={page.title} copy={page.description}>
        <ButtonLink to="/contact#quote">Free Site Inspection</ButtonLink>
      </PageHero>
      <section className="section area-directory" aria-labelledby="areas-heading">
        <div className="container">
          <div className="eyebrow">FIND YOUR NEIGHBOURHOOD</div>
          <h2 id="areas-heading">
            Local needs. <i>Thoughtful solutions.</i>
          </h2>
          <p className="lead">
            Explore ten Lagos locations. Share your exact address so our team can confirm coverage,
            estate access and a suitable time to visit.
          </p>
          <div className="area-grid">
            {serviceAreas.map((area) => (
              <Link className="area-card" to={`/areas/${area.slug}`} key={area.slug}>
                <MapPin size={22} aria-hidden="true" />
                <span>
                  <small>{area.zone}</small>
                  <h3>{area.name}</h3>
                  <p>{area.intro}</p>
                </span>
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="area-availability">
            <h3>Not seeing your area?</h3>
            <p>
              We can discuss enquiries elsewhere in Lagos. Contact us to check availability for your
              property.
            </p>
            <ButtonLink to="/contact#quote">Check your location</ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
