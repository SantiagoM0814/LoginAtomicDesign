
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

// 🔹 Mock del API
vi.mock('../../../apis/registerApi', () => ({
  registerApi: vi.fn()
}));

import { registerApi } from '../../../apis/registerApi';

describe('RegisterForm Component', () => {
  const mockOnSubmit = vi.fn();

  // 👉 mock tipado (SIN any)
  const mockedRegisterApi = vi.mocked(registerApi);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el formulario correctamente', () => {
    const { container } = render(
      <RegisterForm onSubmit={mockOnSubmit} />
    );
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('renderiza los campos nombre, email y contraseña', () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('renderiza el botón de registro', () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    const button = screen.getByRole('button', {
      name: /registrarse/i
    });

    expect(button).toBeInTheDocument();
  });

  it('muestra error si el nombre está vacío', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    const user = userEvent.setup();

    await user.click(
      screen.getByRole('button', { name: /registrarse/i })
    );

    expect(
      await screen.findByText('El nombre es obligatorio')
    ).toBeInTheDocument();
  });

  it('muestra error si el email es inválido', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText('Nombre'),
      'Juan'
    );

    await user.click(
      screen.getByRole('button', { name: /registrarse/i })
    );

    expect(
      await screen.findByText('Email inválido')
    ).toBeInTheDocument();
  });

  it('muestra error si la contraseña está vacía', async () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText('Nombre'),
      'Juan'
    );
    await user.type(
      screen.getByLabelText('Email'),
      'juan@test.com'
    );

    await user.click(
      screen.getByRole('button', { name: /registrarse/i })
    );

    expect(
      await screen.findByText('La contraseña es obligatoria')
    ).toBeInTheDocument();
  });

  it('realiza registro exitoso y llama onSubmit', async () => {
    mockedRegisterApi.mockResolvedValue(undefined);

    render(<RegisterForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText('Nombre'),
      'Juan'
    );
    await user.type(
      screen.getByLabelText('Email'),
      'juan@test.com'
    );
    await user.type(
      screen.getByLabelText('Contraseña'),
      '123456'
    );

    await user.click(
      screen.getByRole('button', { name: /registrarse/i })
    );

    expect(
      await screen.findByText('¡Registro exitoso!')
    ).toBeInTheDocument();

    expect(mockOnSubmit).toHaveBeenCalledWith(
      'Juan',
      'juan@test.com',
      '123456'
    );
  });

  it('muestra error cuando el API falla', async () => {
    mockedRegisterApi.mockRejectedValue(
      new Error('Error al registrarse')
    );

    render(<RegisterForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText('Nombre'),
      'Juan'
    );
    await user.type(
      screen.getByLabelText('Email'),
      'juan@test.com'
    );
    await user.type(
      screen.getByLabelText('Contraseña'),
      '123456'
    );

    await user.click(
      screen.getByRole('button', { name: /registrarse/i })
    );

    expect(
      await screen.findByText('Error al registrarse')
    ).toBeInTheDocument();
  });
});
