import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FounderSection from './FounderSection.jsx';
import SolarCallToAction from './SolarCallToAction.jsx';
import { services } from '../../data/services.js';

export default function ServicesSection() {
  return (
    <section className="section services-wall" id="services">
      <FounderSection />
      <SolarCallToAction />
      <div className="container">
        <div className="services-intro">
          <div>
            <div className="eyebrow gold">SOLARA SERVICES</div>
            <h2>
              Solar, inverter & electrical
              <br />
              <i>services you can count on.</i>
            </h2>
          </div>
          <p>
            Whether you need solar power for your home, a dependable energy solution for your
            business, or professional electrical and electronic services, we’re here to help you get
            the job done properly.
          </p>
        </div>
        <div className="service-mosaic">
          {services.map((service) => (
            <Link className="mosaic-card" to={'/services/' + service.id} key={service.title}>
              <div className="mosaic-image" style={{ backgroundImage: `url(${service.image})` }}>
                <span className="mosaic-arrow">
                  <ArrowRight size={20} />
                </span>
              </div>
              <div className="mosaic-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-learn">
                  Learn more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
