import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  const mockonSubmit = vi.fn();

  it('should render login form', () => {
    const { container } = render(
      <BrowserRouter>
        <LoginForm onSubmit={mockonSubmit} />
      </BrowserRouter>
    );
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockonSubmit} />
      </BrowserRouter>
    );
    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toBeInTheDocument();
  });

  it('should render input fields for email and password', () => {
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockonSubmit} />
      </BrowserRouter>
    );
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it('should render labels for email and password', () => {
    render(
      <BrowserRouter>
        <LoginForm onSubmit={mockonSubmit} />
      </BrowserRouter>
    );
    const emailLabel = screen.getByText('Email');
    const passwordLabel = screen.getByText('Contraseña');
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });
});
