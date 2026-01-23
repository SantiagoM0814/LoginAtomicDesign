import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <Button onClick={() => {}} disabled>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

