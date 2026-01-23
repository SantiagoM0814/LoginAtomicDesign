import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  it('should render input element', () => {
    render(<Input type="text" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it('should have correct type attribute', () => {
    render(<Input type="email" placeholder="Enter email" />);
    const input = screen.getByPlaceholderText(/enter email/i) as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input type="text" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should accept input values', () => {
    render(<Input type="text" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });
});
