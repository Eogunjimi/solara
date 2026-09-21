import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site.js';
import ButtonLink from '../ui/ButtonLink.jsx';
import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div className="logo">
          <Logo />
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/#services">Solutions</Link>
          <Link to="/#projects">Our projects</Link>
          <Link to="/about">About us</Link>
        </div>
        <div>
          <h4>Get in touch</h4>
          <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>{siteConfig.location}</span>
        </div>
        <div className="footer-cta">
          <p>Good energy starts with a conversation.</p>
          <ButtonLink to="/contact#quote">Get a free quote</ButtonLink>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {siteConfig.title}. All rights reserved.
        </span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
