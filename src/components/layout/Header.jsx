import { useRef, useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { navigation, siteConfig } from '../../config/site.js';
import ButtonLink from '../ui/ButtonLink.jsx';
import Logo from './Logo.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const closeMenu = () => setOpen(false);

  const navLink = ({ label, to }) => (
    <NavLink key={to} to={to} end={to === '/'} onClick={closeMenu}>
      {label}
    </NavLink>
  );

  return (
    <div className="masthead">
      <div className="topbar">
        <div>Solar made practical for Lagos homes & businesses.</div>
        <a href={`mailto:${siteConfig.email}`}>
          <Mail size={13} aria-hidden="true" /> {siteConfig.email}
        </a>
      </div>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) {
            closeMenu();
            toggle.current?.focus();
          }
        }}
      >
        <Link className="logo" to="/" aria-label="Solara home" onClick={closeMenu}>
          <Logo />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={open ? 'open' : ''}>
          <div className="nav-links nav-links--left">{navigation.slice(0, 5).map(navLink)}</div>
          <div className="nav-links nav-links--right">
            {navigation.slice(5).map(navLink)}
            <a className="nav-phone" href={siteConfig.phoneHref} onClick={closeMenu}>
              <Phone size={15} aria-hidden="true" /> {siteConfig.phone}
            </a>
            <ButtonLink to="/contact#quote" onClick={closeMenu}>
              Get a free quote
            </ButtonLink>
          </div>
        </nav>
      </header>
    </div>
  );
}
