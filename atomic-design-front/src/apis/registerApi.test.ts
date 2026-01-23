declare var global: any;
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { registerApi } from './registerApi';

describe('registerApi', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('debe retornar datos en registro exitoso', async () => {
    const mockResponse = { token: 'abc', user: { name: 'Nuevo' } };
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
    const result = await registerApi('Nuevo', 'nuevo@mail.com', 'pass');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/users/register',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('debe lanzar error en registro fallido', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Error al registrarse' }),
    });
    await expect(registerApi('Nuevo', 'nuevo@mail.com', 'pass')).rejects.toThrow('Error al registrarse');
  });
});