import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DashboardPage', () => {
  it('renderiza correctamente el nombre de usuario', () => {
    render(
      <MemoryRouter>
        <DashboardPage userName="TestUser" />
      </MemoryRouter>
    );
    expect(screen.getByText('¡Bienvenido!')).toBeInTheDocument();
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('Has iniciado sesión correctamente.')).toBeInTheDocument();
  });

  it('navega al hacer logout', () => {
    render(
      <MemoryRouter>
        <DashboardPage userName="TestUser" />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});