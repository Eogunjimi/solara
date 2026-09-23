import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';
import { articles } from '../data/articles.js';
import { services } from '../data/services.js';
import { serviceDetails } from '../data/serviceDetails.js';

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('application routes', () => {
  it.each([
    ['/', /Reliable solar energy/],
    ['/about', /Powering possibility, thoughtfully/],
    ['/services', /The right system starts with listening/],
    ['/areas', /Solar for Lagos/],
    ['/projects', /Good energy, in the real world/],
    ['/contact', /Let’s talk about your power/],
    ['/blog', /Clear answers for/],
    ['/privacy', 'Privacy notice'],
    ['/terms', 'Website terms'],
    ['/about/', /Powering possibility, thoughtfully/],
    ...articles.map((article) => [`/blog/${article.id}`, article.title]),
    ...services.map((service) => [`/services/${service.id}`, serviceDetails[service.id].heroTitle]),
  ])('renders %s with one shared layout', (path, title) => {
    renderRoute(path);
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('navigation', { name: 'Main navigation' })).toHaveLength(1);
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  });

  it.each(['/missing', '/blog/missing', '/services/missing'])(
    'renders a real not-found page at %s',
    (path) => {
      renderRoute(path);
      expect(screen.getByRole('heading', { level: 1, name: /back on track/ })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Back to home/ })).toHaveAttribute('href', '/');
    },
  );

  it('redirects the legacy quote URL to the contact form', () => {
    renderRoute('/quote');
    expect(screen.getByRole('form', { name: 'Solar quote request' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Let’s talk about your power',
    );
  });

  it('navigates using the shared header and closes the menu', async () => {
    const user = userEvent.setup();
    renderRoute('/');
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'About' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Powering possibility');
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('keeps home section anchors unique', () => {
    const { container } = renderRoute('/');
    const ids = [...container.querySelectorAll('[id]')].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(container.querySelector('#process h2')).toHaveTextContent('Simple steps to');
  });

  it('ends the homepage with one Good to Know section and keeps only the workflow form', () => {
    const { container } = renderRoute('/');
    const sections = [...container.querySelectorAll('main > section')];
    expect(sections.slice(-3).map((section) => section.id)).toEqual(['process', 'academy', 'faq']);
    expect(screen.getAllByText('GOOD TO KNOW')).toHaveLength(1);
    expect(screen.queryByText('LET’S TALK SOLAR')).not.toBeInTheDocument();
    expect(screen.getAllByRole('form')).toHaveLength(1);
    expect(container.querySelector('#process #quote form')).toHaveAccessibleName(
      'Start your solar request',
    );
    expect(screen.getByRole('link', { name: 'Get my free quote' })).toHaveAttribute(
      'href',
      '/#quote',
    );
  });

  it('renders About Us and Services as separate homepage sections', () => {
    const { container } = renderRoute('/');
    const about = screen.getByRole('region', {
      name: 'Built on experience. Driven by better power.',
    });
    const serviceSection = screen.getByRole('region', {
      name: 'Solar, inverter & electrical services you can count on.',
    });
    expect(about.parentElement).toBe(screen.getByRole('main'));
    expect(about.nextElementSibling).toBe(serviceSection);
    expect(within(about).getByText('ABOUT US')).toBeInTheDocument();
    expect(within(about).getByText('17+ years')).toBeInTheDocument();
    expect(within(about).getByRole('link', { name: 'GET YOUR FREE SOLAR QUOTE' })).toHaveAttribute(
      'href',
      '/contact#quote',
    );
    expect(within(serviceSection).getAllByRole('link')).toHaveLength(services.length);
    expect(container.querySelector('#services .about-founder')).not.toBeInTheDocument();
    services.forEach((service) => {
      expect(
        within(serviceSection).getByRole('link', {
          name: new RegExp(service.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
        }),
      ).toHaveAttribute('href', '/services/' + service.id);
    });
  });

  it('keeps the founder story out of the Services page', () => {
    renderRoute('/services');
    expect(
      screen.queryByRole('region', { name: 'Built on experience. Driven by better power.' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('region', {
        name: 'Solar, inverter & electrical services you can count on.',
      }),
    ).toBeInTheDocument();
  });
});
