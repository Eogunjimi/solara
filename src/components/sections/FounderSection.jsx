import { Handshake, Sun, Wrench } from 'lucide-react';
import { images } from '../../data/images.js';
import ButtonLink from '../ui/ButtonLink.jsx';

const pillars = [
  {
    icon: Sun,
    title: 'My Vision',
    text: 'I envision bringing reliable power to every home and business across Nigeria, one trusted relationship at a time.',
  },
  {
    icon: Wrench,
    title: 'My Mission',
    text: 'My mission is to deliver honest, high-quality energy solutions — from solar to inverters — with the care and expertise our customers deserve.',
  },
  {
    icon: Handshake,
    title: 'My Promise',
    text: 'With AfeezTechSolar, you get quality products, expert hands, and a team that genuinely cares about getting it right.',
  },
];

const stats = [
  { value: '17', label: 'Years in solar & inverter technology' },
  { value: '50+', label: 'Homes and businesses served' },
];

export default function FounderSection() {
  return (
    <section className="section about-founder" id="about" aria-labelledby="about-heading">
      <div className="container about-founder-grid">
        <div className="founder-portrait">
          <div className="founder-fallback" aria-hidden="true">
            <span>AO</span>
            <small>POWERING POSSIBILITY</small>
          </div>
          <img
            className="founder-photo"
            src={images.install}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
          <div className="founder-caption">
            <strong>AFEEZ ORIYOMI</strong>
            <span>Founder, Afeez Tech Solar Global Service Technology</span>
          </div>
        </div>

        <div className="founder-copy">
          <div className="eyebrow">ABOUT US</div>
          <h2 id="about-heading">
            A Legacy <i>Driven by Purpose</i>
          </h2>
          <p className="founder-lead">
            For 17 years, I&apos;ve been committed to one thing: bringing reliable, high-quality
            power solutions to homes and businesses across Nigeria. I built AfeezTechSolar Global
            Services Technology on a simple belief — good products, honest service, and the
            determination to always see things through.
          </p>
          <dl className="about-stats">
            {stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <p>
            I don&apos;t just install systems — I build relationships. Every customer gets my full
            commitment: quality products, expert installation, and a guarantee I stand behind.
            Whether it&apos;s solar power, inverters, batteries, or other energy solutions, I work
            with trusted brands like Felicity, Deye, C-Worth, Intel, and SMS, because you deserve
            nothing less than the best.
          </p>
          <ButtonLink to="/contact#quote">Talk to our team</ButtonLink>
        </div>
      </div>

      <ul className="container about-pillars">
        {pillars.map(({ icon: Icon, title, text }) => (
          <li className="about-pillar" key={title}>
            <span className="about-pillar-icon" aria-hidden="true">
              <Icon size={22} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
