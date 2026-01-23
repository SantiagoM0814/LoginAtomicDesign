declare var global: any;
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { loginApi } from './authApi';

describe('loginApi', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('debe retornar datos en login exitoso', async () => {
    const mockResponse = { token: '123', user: { name: 'Test' } };
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
    const result = await loginApi('test@mail.com', 'pass');
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/users/login',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('debe lanzar error en login fallido', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Error al iniciar sesión' }),
    });
    await expect(loginApi('test@mail.com', 'pass')).rejects.toThrow('Error al iniciar sesión');
  });
});