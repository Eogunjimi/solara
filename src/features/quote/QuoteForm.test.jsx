import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import QuoteForm from './QuoteForm.jsx';

describe('demo quote form', () => {
  it('requires all fields and a valid email before confirmation', async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.click(screen.getByRole('button', { name: 'Review my request' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInvalid();
    await user.type(screen.getByLabelText('Email address'), 'not-an-email');
    expect(screen.getByLabelText('Email address')).toBeInvalid();
  });

  it('confirms locally, does not send a request, and resets feedback on edit', async () => {
    const user = userEvent.setup();
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<QuoteForm />);
    await user.type(screen.getByLabelText('Full name'), 'Test Customer');
    await user.type(screen.getByLabelText('Phone number'), '08000000000');
    await user.type(screen.getByLabelText('Email address'), 'test@example.com');
    await user.type(screen.getByLabelText('Location'), 'Lagos');
    await user.selectOptions(screen.getByLabelText('Interested in'), 'Residential solar');
    await user.type(screen.getByLabelText('Your power needs'), 'Lights and a refrigerator');
    await user.click(screen.getByRole('button', { name: 'Review my request' }));
    expect(screen.getByRole('status')).toHaveTextContent('has not been sent or saved');
    expect(fetchSpy).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText('Location'), ' Island');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
