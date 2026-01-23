import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from './FormField';

describe('FormField Component', () => {
  const mockonChange = vi.fn();

  it('should render label and input', () => {
    render(
      <FormField label="Username" type="text" id="username" value="" onChange={mockonChange} />
    );
    const label = screen.getByText(/username/i);
    const input = screen.getByRole('textbox');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should render with correct input type', () => {
    const { container } = render(
      <FormField label="Password" type="password" id="password" value="" onChange={mockonChange} />
    );
    const input = container.querySelector('input[type="password"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('should link label to input via htmlFor', () => {
    const { container } = render(
      <FormField label="Email" type="email" id="email" value="" onChange={mockonChange} />
    );
    const label = container.querySelector('label[for="email"]');
    const input = container.querySelector('input#email');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should pass value to input', () => {
    const { container } = render(
      <FormField label="Test" type="text" id="test" value="test-value" onChange={mockonChange} />
    );
    const input = container.querySelector('input#test') as HTMLInputElement;
    expect(input.value).toBe('test-value');
  });
});
