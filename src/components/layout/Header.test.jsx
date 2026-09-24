import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../../config/site.js';
import { services } from '../../data/services.js';
import { serviceAreas } from '../../data/serviceAreas.js';
import Header from './Header.jsx';

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe('desktop and mobile navigation', () => {
  it('has the requested parent destinations and inspection CTA', () => {
    renderHeader();
    const nav = within(screen.getByRole('navigation', { name: 'Main navigation' }));
    [
      ['Home', '/'],
      ['About Us', '/about'],
      ['Services', '/services'],
      ['Service Areas', '/areas'],
      ['Contact Us', '/contact'],
    ].forEach(([label, to]) =>
      expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', to),
    );
    expect(screen.getByRole('link', { name: 'AFEEZTECHSOLAR home' })).toHaveAttribute('href', '/');
    expect(nav.getByRole('link', { name: siteConfig.phone })).toHaveAttribute(
      'href',
      siteConfig.phoneHref,
    );
    expect(screen.getByRole('link', { name: siteConfig.email })).toHaveAttribute(
      'href',
      `mailto:${siteConfig.email}`,
    );
    expect(nav.getByRole('link', { name: 'Free Site Inspection' })).toHaveAttribute(
      'href',
      '/contact#quote',
    );
    expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('exposes Blog, all seven services and ten area pages through exclusive dropdowns', async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole('button', { name: 'Toggle About Us menu' }));
    expect(screen.getByRole('link', { name: 'Blog', exact: true })).toHaveAttribute(
      'href',
      '/blog',
    );
    await user.click(screen.getByRole('button', { name: 'Toggle Services menu' }));
    expect(screen.queryByRole('link', { name: 'Blog', exact: true })).not.toBeInTheDocument();
    const serviceLinks = within(screen.getByRole('list', { name: 'Services links' })).getAllByRole(
      'link',
    );
    expect(serviceLinks).toHaveLength(7);
    services.forEach((service, index) =>
      expect(serviceLinks[index]).toHaveAttribute('href', `/services/${service.id}`),
    );
    await user.click(screen.getByRole('button', { name: 'Toggle Service Areas menu' }));
    expect(screen.queryByRole('list', { name: 'Services links' })).not.toBeInTheDocument();
    const areas = within(screen.getByRole('list', { name: 'Service Areas links' }));
    expect(areas.getAllByRole('link')).toHaveLength(10);
    serviceAreas.forEach((area) =>
      expect(areas.getByRole('link', { name: area.name })).toHaveAttribute(
        'href',
        `/areas/${area.slug}`,
      ),
    );
    await user.click(areas.getByRole('link', { name: 'Ikoyi' }));
    expect(screen.getByRole('button', { name: 'Toggle Service Areas menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('closes a dropdown with Escape before closing mobile navigation', async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('button', { name: 'Toggle About Us menu' }));
    screen.getByRole('link', { name: 'Blog', exact: true }).focus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Toggle About Us menu' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });
});
