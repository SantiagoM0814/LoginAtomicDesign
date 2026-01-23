import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

// mock del componente RegisterForm para controlar el callback onSubmit
vi.mock('../../organisms/RegisterForm/RegisterForm', () => {
  return {
    default: ({ onSubmit }: any) => (
      <button onClick={() => queueMicrotask(() => onSubmit('Nombre', 'mail@mail.com', 'pass'))}>MockRegister</button>
    ),
  };
});

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RegisterPage', () => {
  it('renderiza correctamente el título y el link de login', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Registro')).toBeInTheDocument();
    expect(screen.getByText(/¿Ya tienes cuenta?/)).toBeInTheDocument();
    expect(screen.getByText(/Inicia sesión aquí/)).toBeInTheDocument();
  });

  it('navega después de registro usando el callback del formulario', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    // click en el mock de RegisterForm para simular registro exitoso
    const user = userEvent.setup();
    await user.click(screen.getByText('MockRegister'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});