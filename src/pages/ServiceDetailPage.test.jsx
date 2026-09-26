import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ServiceDetailPage from './ServiceDetailPage.jsx';
import { services } from '../data/services.js';
import { serviceDetails } from '../data/serviceDetails.js';
import { faqs } from '../data/faqs.js';
import { serviceFaqCopy } from '../../tests/fixtures/serviceFaqCopy.js';

function renderService(id) {
  return render(
    <MemoryRouter initialEntries={[`/services/${id}`]}>
      <Routes>
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('individual service landing pages', () => {
  it('has complete, distinct content for every published service', () => {
    expect(Object.keys(serviceDetails).sort()).toEqual(
      services.map((service) => service.id).sort(),
    );
    expect(new Set(Object.values(serviceDetails).map((detail) => detail.overview)).size).toBe(7);
  });

  it.each(services)('composes a complete, tailored page for $title', (service) => {
    const { container } = renderService(service.id);
    const detail = serviceDetails[service.id];
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(detail.heroTitle);
    detail.overview.forEach((paragraph) => expect(screen.getByText(paragraph)).toBeInTheDocument());
    expect(container.querySelector('.service-visual')).not.toBeInTheDocument();
    expect(container.querySelector('.page-hero .hero-social-proof')).toHaveTextContent('5.0');
    expect(container.querySelector('.page-hero + .trust-badges')).toBeInTheDocument();
    expect(container.querySelector('#projects + #reviews')).toBeInTheDocument();
    detail.included.forEach((point) =>
      expect(screen.getByText(point.description)).toBeInTheDocument(),
    );
    expect(container.querySelectorAll('.standard-point')).toHaveLength(4);
    const list = screen.getByRole('list', { name: `${service.title} process steps` });
    expect(within(list).getAllByRole('listitem')).toHaveLength(4);
    detail.steps.forEach((step) =>
      expect(within(list).getByText(step.description)).toBeInTheDocument(),
    );
    expect(container.querySelectorAll('.service-option')).toHaveLength(3);
    const faqSection = screen.getByRole('region', { name: serviceFaqCopy.heading });
    const faq = within(faqSection);
    expect(faq.getAllByRole('button')).toHaveLength(6);
    serviceFaqCopy.items.forEach((item) => {
      const trigger = faq.getByRole('button', { name: item.question, exact: true });
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      expect(panel.textContent).toBe(item.answer);
      if (item.bold) expect(panel.querySelector('strong').textContent).toBe(item.bold);
    });
    expect(faq.getByText(serviceFaqCopy.closingHeading).tagName).toBe('STRONG');
    expect(faq.getByText(serviceFaqCopy.closingCopy)).toBeInTheDocument();
    const form = screen.getByRole('form', { name: 'Service quote request' });
    expect(within(form).getByLabelText('Interested in')).toHaveValue(service.title);
    expect(within(form).getByLabelText('Tell us what you need')).toBeRequired();
    expect(within(form).getByText(/details are not sent or saved/)).toBeInTheDocument();
    expect(screen.getAllByRole('form')).toHaveLength(1);
    const ids = [...container.querySelectorAll('[id]')].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(container.querySelector('.page-hero .btn')).toHaveAttribute(
      'href',
      `/services/${service.id}#quote`,
    );
    expect(faq.getByRole('link', { name: 'Get a Solar Quote' })).toHaveAttribute(
      'href',
      `/services/${service.id}#quote`,
    );
  });

  it('resets the selected service and enquiry when navigating between detail pages', async () => {
    const user = userEvent.setup();
    const { container } = renderService('6');
    await user.type(screen.getByLabelText('Full name'), 'Test Customer');
    await user.type(screen.getByLabelText('Phone number'), '08000000000');
    await user.type(screen.getByLabelText('Email address'), 'test@example.com');
    await user.type(screen.getByLabelText('Location'), 'Lagos');
    await user.type(screen.getByLabelText('Tell us what you need'), 'Two cameras for our office');
    await user.click(screen.getByRole('button', { name: 'Review my request' }));
    expect(screen.getByRole('status')).toHaveTextContent('has not been sent or saved');
    await user.click(
      within(container.querySelector('.service-related')).getByRole('link', {
        name: 'Residential Solar',
      }),
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Residential Solar');
    expect(screen.getByLabelText('Interested in')).toHaveValue('Residential Solar');
    expect(screen.getByLabelText('Full name')).toHaveValue('');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: faqs[0].question })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});
