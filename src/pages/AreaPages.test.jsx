import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../app/App.jsx';
import { serviceAreas } from '../data/serviceAreas.js';
import { areaPages } from '../data/areaPages.js';
import { siteConfig } from '../config/site.js';
import { services } from '../data/services.js';

function renderRoute(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('Lagos location pages', () => {
  it('lists ten distinct locations in the directory', () => {
    renderRoute('/areas');
    const directory = screen.getByRole('region', { name: 'Local needs. Thoughtful solutions.' });
    expect(serviceAreas).toHaveLength(10);
    expect(new Set(serviceAreas.map((area) => area.slug)).size).toBe(10);
    serviceAreas.forEach((area) =>
      expect(
        within(directory).getByRole('link', {
          name: `${area.zone} ${area.name} ${area.intro}`,
          exact: true,
        }),
      ).toHaveAttribute('href', `/areas/${area.slug}`),
    );
  });

  it('gives every location its own content, metadata and FAQs', () => {
    const titles = new Set();
    const descriptions = new Set();
    const heroTitles = new Set();
    for (const area of serviceAreas) {
      const page = areaPages[area.slug];
      expect(page, area.slug).toBeDefined();
      expect(page.seo.title.length, area.slug).toBeLessThanOrEqual(60);
      expect(page.seo.title).toContain(area.name);
      expect(page.seo.description.length, area.slug).toBeLessThanOrEqual(160);
      expect(page.seo.description).toContain(area.name);
      expect(page.faqs.length, area.slug).toBeGreaterThanOrEqual(3);
      expect(page.faqs.length, area.slug).toBeLessThanOrEqual(5);
      expect(page.featuredServiceIds.length, area.slug).toBeGreaterThanOrEqual(4);
      expect(page.featuredServiceIds.length, area.slug).toBeLessThanOrEqual(6);
      page.featuredServiceIds.forEach((id) =>
        expect(services.some((service) => service.id === id)).toBe(true),
      );
      page.nearby.forEach((slug) => {
        expect(slug).not.toBe(area.slug);
        expect(serviceAreas.some((item) => item.slug === slug)).toBe(true);
      });
      titles.add(page.seo.title);
      descriptions.add(page.seo.description);
      heroTitles.add(page.heroTitle);
    }
    expect(titles.size).toBe(10);
    expect(descriptions.size).toBe(10);
    expect(heroTitles.size).toBe(10);
  });

  it.each(serviceAreas)('renders a tailored page and prefilled local enquiry for $name', (area) => {
    const page = areaPages[area.slug];
    renderRoute(`/areas/${area.slug}`);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(page.heroTitle);
    expect(document.title).toBe(page.seo.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      page.seo.description,
    );
    expect(screen.getByRole('heading', { level: 2, name: page.aboutTitle })).toBeInTheDocument();
    area.focus.forEach((point) => expect(screen.getByText(point)).toBeInTheDocument());
    const serviceSection = screen.getByRole('region', {
      name: `Solar and electrical services available in ${area.name}.`,
    });
    expect(within(serviceSection).getAllByRole('link')).toHaveLength(
      page.featuredServiceIds.length,
    );
    expect(screen.getAllByRole('form')).toHaveLength(1);
    const form = screen.getByRole('form', { name: `Site inspection request in ${area.name}` });
    expect(within(form).getByLabelText('Location')).toHaveValue(area.name);
    expect(within(form).getByText(/details are not sent or saved/)).toBeInTheDocument();
    expect(screen.getAllByRole('banner')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'View our projects' })).toHaveAttribute(
      'href',
      `/areas/${area.slug}#projects`,
    );
    expect(screen.getByText('Let’s discuss your project').closest('a')).toHaveAttribute(
      'href',
      `/areas/${area.slug}#quote`,
    );
    expect(screen.getAllByRole('link', { name: siteConfig.phone })[0]).toHaveAttribute(
      'href',
      siteConfig.phoneHref,
    );
  });

  it('shows recovery for an unknown location', () => {
    renderRoute('/areas/not-a-location');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('back on track');
    expect(document.title).toBe(`Page not found | ${siteConfig.title}`);
  });
});
