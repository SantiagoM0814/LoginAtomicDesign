import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

vi.mock('../../organisms/LoginForm/LoginForm', () => {
  return {
    default: ({ onSubmit }: any) => (
      <button onClick={() => onSubmit('UsuarioMock')}>MockLogin</button>
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

describe('LoginPage', () => {
  it('renderiza correctamente el título y el link de registro', () => {
    render(
      <MemoryRouter>
        <LoginPage onLogin={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText('Inicio de sesión')).toBeInTheDocument();
    expect(screen.getByText(/¿No tienes cuenta?/)).toBeInTheDocument();
    expect(screen.getByText(/Regístrate aquí/)).toBeInTheDocument();
  });

  it('llama a onLogin y navega a /dashboard después del login', () => {
    const mockOnLogin = vi.fn();
    render(
      <MemoryRouter>
        <LoginPage onLogin={mockOnLogin} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('MockLogin'));

    expect(mockOnLogin).toHaveBeenCalledWith('UsuarioMock');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});