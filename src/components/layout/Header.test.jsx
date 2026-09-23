import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { navigation, siteConfig } from '../../config/site.js';
import Header from './Header.jsx';

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe('reference-inspired navigation', () => {
  it('retains every existing destination, brand, phone, email, and quote CTA', () => {
    renderHeader();
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    navigation.forEach(({ label, to }) => {
      expect(within(nav).getByRole('link', { name: label, exact: true })).toHaveAttribute(
        'href',
        to,
      );
    });
    expect(screen.getByRole('link', { name: 'Solara home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: siteConfig.phone })).toHaveAttribute(
      'href',
      siteConfig.phoneHref,
    );
    expect(screen.getByRole('link', { name: siteConfig.email })).toHaveAttribute(
      'href',
      `mailto:${siteConfig.email}`,
    );
    expect(within(nav).getByRole('link', { name: 'Get a free quote' })).toHaveAttribute(
      'href',
      '/contact#quote',
    );
    expect(within(nav).getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('closes with Escape and restores focus to the mobile menu toggle', async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const toggle = screen.getByRole('button', { name: 'Close menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    within(screen.getByRole('navigation')).getByRole('link', { name: 'Home', exact: true }).focus();
    await user.keyboard('{Escape}');
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
