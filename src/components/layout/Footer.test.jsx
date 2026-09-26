import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { siteConfig } from '../../config/site.js';
import Footer from './Footer.jsx';

describe('site footer', () => {
  it('offers real routes and native contact actions with a current copyright year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const footer = screen.getByRole('contentinfo');
    const links = within(footer);
    expect(links.getByRole('link', { name: 'Get a free quote' })).toHaveAttribute(
      'href',
      '/contact#quote',
    );
    expect(links.getByRole('link', { name: 'Privacy notice' })).toHaveAttribute('href', '/privacy');
    expect(links.getByRole('link', { name: 'Website terms' })).toHaveAttribute('href', '/terms');
    expect(links.getByRole('link', { name: 'FAQs' })).toHaveAttribute('href', '/#faq');
    expect(links.getByRole('link', { name: 'Email our team' })).toHaveAttribute(
      'href',
      `mailto:${siteConfig.email}`,
    );
    expect(links.getByRole('link', { name: 'Give us a call' })).toHaveAttribute(
      'href',
      siteConfig.phoneHref,
    );
    expect(footer).toHaveTextContent(
      `© ${new Date().getFullYear()} ${siteConfig.title}. All rights reserved.`,
    );
    expect(
      links.getByRole('heading', { name: 'Solar energy. Powering possibility.' }),
    ).toBeInTheDocument();
    for (const link of links.getAllByRole('link')) expect(link.getAttribute('href')).not.toBe('#');
  });

  it('lets visitors explicitly pause and resume the marquee', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('button', { name: 'Pause footer animation' }));
    expect(container.querySelector('.footer-marquee-track')).toHaveClass('is-paused');
    await user.click(screen.getByRole('button', { name: 'Resume footer animation' }));
    expect(container.querySelector('.footer-marquee-track')).not.toHaveClass('is-paused');
  });
});
