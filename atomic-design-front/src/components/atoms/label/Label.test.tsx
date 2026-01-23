import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label Component', () => {
  it('should render label element', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText(/test label/i);
    expect(label).toBeInTheDocument();
  });

  it('should have correct htmlFor attribute', () => {
    render(<Label htmlFor="email">Email</Label>);
    const label = screen.getByText(/email/i) as HTMLLabelElement;
    expect(label.htmlFor).toBe('email');
  });

  it('should render as label element', () => {
    const { container } = render(<Label htmlFor="test">Test</Label>);
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
  });
});
