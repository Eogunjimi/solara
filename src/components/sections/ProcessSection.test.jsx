import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import QuoteForm from '../../features/quote/QuoteForm.jsx';
import { processSteps } from '../../data/process.js';
import ProcessSection from './ProcessSection.jsx';

describe('installation workflow', () => {
  it('retains the heading and introduction with four clear steps in order', () => {
    render(<ProcessSection />);
    const section = screen.getByRole('region', { name: /Simple steps to reliable solar power/ });
    expect(within(section).getByText('HOW IT WORKS')).toBeInTheDocument();
    expect(
      within(section).getByText(
        'From your power needs to a fully installed system, we make going solar simple.',
      ),
    ).toBeInTheDocument();

    const steps = within(section).getAllByRole('listitem');
    expect(steps).toHaveLength(4);
    expect(steps.map((step) => within(step).getByRole('heading').textContent)).toEqual([
      'Tell Us What You Need',
      'Assessment & Quote',
      'Schedule & Install',
      'Power Up & Support',
    ]);
    expect(processSteps.map((step) => step.number)).toEqual(['01', '02', '03', '04']);
    processSteps.forEach((step, index) => {
      expect(within(steps[index]).getByRole('heading', { name: step.title })).toBeInTheDocument();
      expect(within(steps[index]).getByText(step.description)).toBeInTheDocument();
      expect(within(steps[index]).getByText(step.number)).toBeInTheDocument();
    });
    expect(steps[3]).toHaveClass('process-step-complete');
  });

  it('requires contact details before reviewing the simplified request', async () => {
    const user = userEvent.setup();
    render(<ProcessSection />);
    await user.click(screen.getByRole('button', { name: 'Review my request' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInvalid();
    expect(screen.getByRole('list', { name: 'Solar installation steps' })).toBeInTheDocument();
  });

  it('reuses the solar form with unique notices and independent confirmation state', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ProcessSection />
        <QuoteForm />
      </>,
    );
    const form = screen.getByRole('form', { name: 'Start your solar request' });
    const originalForm = screen.getByRole('form', { name: 'Solar quote request' });
    expect(form.getAttribute('aria-describedby')).not.toBe(
      originalForm.getAttribute('aria-describedby'),
    );
    const fields = within(form);
    expect(fields.getByLabelText('Full name')).toBeRequired();
    expect(fields.getByLabelText('Phone number')).toBeRequired();
    expect(fields.queryByLabelText('Email address')).not.toBeInTheDocument();
    expect(fields.getByLabelText('Location')).toBeRequired();
    expect(fields.queryByLabelText('Interested in')).not.toBeInTheDocument();
    expect(fields.getByLabelText('Your power needs (optional)')).not.toBeRequired();
    expect(within(originalForm).getByLabelText('Email address')).toBeRequired();
    await user.type(fields.getByLabelText('Full name'), 'Test Customer');
    await user.type(fields.getByLabelText('Phone number'), '08000000000');
    await user.type(fields.getByLabelText('Location'), 'Lagos');
    await user.click(fields.getByRole('button', { name: 'Review my request' }));
    expect(fields.getByRole('status')).toHaveTextContent('has not been sent or saved');
    expect(within(originalForm).queryByRole('status')).not.toBeInTheDocument();
    expect(within(originalForm).getByLabelText('Full name')).toHaveValue('');
    await user.type(fields.getByLabelText('Location'), ' Island');
    expect(fields.queryByRole('status')).not.toBeInTheDocument();
  });
});
