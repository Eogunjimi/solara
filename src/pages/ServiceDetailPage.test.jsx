import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import ServiceDetailPage from './ServiceDetailPage.jsx';
import { services } from '../data/services.js';
import { serviceDetails } from '../data/serviceDetails.js';

function renderService(id) {
  return render(
    <MemoryRouter initialEntries={[`/services/${id}`]}>
      <Routes>
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

afterEach(() => {
  document.querySelectorAll('script[data-page="service"]').forEach((node) => node.remove());
});

describe('individual service landing pages', () => {
  it('has complete, distinct content for every published service', () => {
    expect(Object.keys(serviceDetails).sort()).toEqual(
      services.map((service) => service.id).sort(),
    );
    const details = Object.values(serviceDetails);
    expect(new Set(details.map((detail) => detail.overview[0])).size).toBe(services.length);
    expect(new Set(details.map((detail) => detail.heroTitle)).size).toBe(services.length);
    expect(new Set(details.map((detail) => detail.seo.title)).size).toBe(services.length);
    expect(new Set(details.map((detail) => detail.seo.description)).size).toBe(services.length);
    details.forEach((detail) => {
      expect(detail.seo.title.length).toBeLessThanOrEqual(70);
      expect(detail.seo.description.length).toBeLessThanOrEqual(160);
      expect(detail.faqs.length).toBeGreaterThanOrEqual(1);
      expect(detail.faqs.length).toBeLessThanOrEqual(5);
      expect(detail.included).toHaveLength(4);
      expect(detail.includedIcons).toHaveLength(4);
      expect(detail.steps).toHaveLength(4);
      expect(detail.options).toHaveLength(3);
    });
  });

  it.each(services)('composes a complete, tailored page for $title', (service) => {
    const { container } = renderService(service.id);
    const detail = serviceDetails[service.id];
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(detail.heroTitle);
    expect(detail.heroTitle).toMatch(/Lagos/);
    detail.overview.forEach((paragraph) => expect(screen.getByText(paragraph)).toBeInTheDocument());
    expect(container.querySelector('.service-hero + .trust-badges')).toBeInTheDocument();
    expect(container.querySelector('.service-hero .social-badge')).toHaveTextContent('5.0');
    expect(container.querySelector('#projects')).toBeInTheDocument();
    expect(container.querySelector('#projects + #reviews')).toBeInTheDocument();
    expect(container.querySelector('.service-cta')).toBeInTheDocument();
    detail.included.forEach((point) =>
      expect(screen.getByText(point.description)).toBeInTheDocument(),
    );
    expect(container.querySelectorAll('.standard-point')).toHaveLength(4);
    expect(container.querySelectorAll('.standard-point svg')).toHaveLength(4);
    const list = screen.getByRole('list', { name: `${service.title} process steps` });
    expect(within(list).getAllByRole('listitem')).toHaveLength(4);
    detail.steps.forEach((step) =>
      expect(within(list).getByText(step.description)).toBeInTheDocument(),
    );
    const faqSection = screen.getByRole('region', { name: 'Frequently Asked Questions' });
    const faq = within(faqSection);
    expect(faq.getAllByRole('button')).toHaveLength(detail.faqs.length);
    detail.faqs.forEach((item) => {
      const trigger = faq.getByRole('button', { name: item.question, exact: true });
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      expect(panel.textContent).toBe(item.answer);
    });
    const form = screen.getByRole('form', { name: 'Service quote request' });
    expect(container.querySelector('.service-quote-for')).toHaveTextContent(service.title);
    expect(within(form).getByLabelText('Tell us what you need')).toBeInTheDocument();
    expect(within(form).getByText(/details are not sent or saved/)).toBeInTheDocument();
    expect(container.querySelector('#quote.service-quote-card')).toBeInTheDocument();
    expect(screen.getAllByRole('form')).toHaveLength(1);
    const ids = [...container.querySelectorAll('[id]')].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(container.querySelector('.service-hero .btn')).toHaveAttribute(
      'href',
      `/services/${service.id}#quote`,
    );
  });

  it.each(services)('publishes service structured data for $title', (service) => {
    renderService(service.id);
    const script = document.querySelector('script[data-page="service"]');
    expect(script).toBeInTheDocument();
    const json = JSON.parse(script.textContent);
    expect(json['@context']).toBe('https://schema.org');
    const serviceNode = json['@graph'].find((node) => node['@type'] === 'Service');
    expect(serviceNode.name).toBe(service.title);
    expect(serviceNode.provider.name).toBe('AFEEZTECHSOLAR');
  });

  it('resets the selected service and enquiry when navigating between detail pages', async () => {
    const user = userEvent.setup();
    const { container } = renderService('6');
    await user.type(screen.getByLabelText('Full name'), 'Test Customer');
    await user.type(screen.getByLabelText('Phone number'), '08000000000');
    await user.type(screen.getByLabelText('Location'), 'Lagos');
    await user.type(screen.getByLabelText('Tell us what you need'), 'Two cameras for our office');
    await user.click(screen.getByRole('button', { name: 'Review my request' }));
    expect(screen.getByRole('status')).toHaveTextContent('has not been sent or saved');
    await user.click(
      within(container.querySelector('.service-related')).getByRole('link', {
        name: 'Residential Solar',
      }),
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      serviceDetails[0].heroTitle,
    );
    expect(container.querySelector('.service-quote-for')).toHaveTextContent('Residential Solar');
    expect(screen.getByLabelText('Full name')).toHaveValue('');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: serviceDetails[0].faqs[0].question }),
    ).toHaveAttribute('aria-expanded', 'true');
  });
});
