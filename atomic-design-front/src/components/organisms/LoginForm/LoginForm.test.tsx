import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

// 🔹 Mock del API
vi.mock('../../../apis/authApi', () => ({
  loginApi: vi.fn()
}));

import { loginApi } from '../../../apis/authApi';

describe('LoginForm Component', () => {
  const mockOnSubmit = vi.fn();

  // 👉 versión tipada del mock
  const mockedLoginApi = vi.mocked(loginApi);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el formulario correctamente', () => {
    const { container } = render(<LoginForm onSubmit={mockOnSubmit} />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('renderiza el botón de envío', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toBeInTheDocument();
  });

  it('renderiza los campos email y contraseña', () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('muestra error si el email es inválido', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await userEvent.click(
      screen.getByRole('button', { name: /iniciar sesión/i })
    );

    expect(
      await screen.findByText('Email inválido')
    ).toBeInTheDocument();
  });

  it('muestra error si la contraseña está vacía', async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await userEvent.type(
      screen.getByLabelText('Email'),
      'test@test.com'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /iniciar sesión/i })
    );

    expect(
      await screen.findByText('La contraseña es obligatoria')
    ).toBeInTheDocument();
  });

  it('realiza login exitoso y llama onSubmit', async () => {
    mockedLoginApi.mockResolvedValue({ nombre: 'Juan' });

    render(<LoginForm onSubmit={mockOnSubmit} />);

    await userEvent.type(
      screen.getByLabelText('Email'),
      'juan@test.com'
    );
    await userEvent.type(
      screen.getByLabelText('Contraseña'),
      '123456'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /iniciar sesión/i })
    );

    expect(
      await screen.findByText('¡Login exitoso!')
    ).toBeInTheDocument();

    expect(mockOnSubmit).toHaveBeenCalledWith('Juan');
  });

  it('muestra error cuando el API falla', async () => {
    mockedLoginApi.mockRejectedValue(
      new Error('Credenciales inválidas')
    );

    render(<LoginForm onSubmit={mockOnSubmit} />);

    await userEvent.type(
      screen.getByLabelText('Email'),
      'test@test.com'
    );
    await userEvent.type(
      screen.getByLabelText('Contraseña'),
      '123456'
    );

    await userEvent.click(
      screen.getByRole('button', { name: /iniciar sesión/i })
    );

    expect(
      await screen.findByText('Credenciales inválidas')
    ).toBeInTheDocument();
  });
});
