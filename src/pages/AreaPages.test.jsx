import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../app/App.jsx';
import { serviceAreas } from '../data/serviceAreas.js';
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
  it.each(serviceAreas)('renders a tailored page and prefilled local enquiry for $name', (area) => {
    renderRoute(`/areas/${area.slug}`);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      `Solar & electrical services in ${area.name}.`,
    );
    expect(document.title).toBe(`${area.name} Solar & Electrical Services | Solara Energy`);
    area.focus.forEach((point) => expect(screen.getByText(point)).toBeInTheDocument());
    const serviceSection = screen.getByRole('region', {
      name: 'Explore services for your property.',
    });
    expect(within(serviceSection).getAllByRole('link')).toHaveLength(services.length);
    expect(screen.getAllByRole('form')).toHaveLength(1);
    const form = screen.getByRole('form', { name: `Site inspection request in ${area.name}` });
    expect(within(form).getByLabelText('Location')).toHaveValue(area.name);
    expect(within(form).getByText(/details are not sent or saved/)).toBeInTheDocument();
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: 'Free Site Inspection' })).toHaveAttribute(
      'href',
      `/areas/${area.slug}#quote`,
    );
    expect(screen.getAllByRole('banner')).toHaveLength(1);
  });
  it('shows recovery for an unknown location', () => {
    renderRoute('/areas/not-a-location');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('back on track');
    expect(document.title).toBe('Page not found | Solara Energy');
  });
});
