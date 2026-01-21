import { describe, it, expect } from 'vitest';
import type { User, LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from './index';

describe('Types', () => {
  describe('User type', () => {
    it('debería permitir crear un objeto User válido', () => {
      const user: User = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        createdAt: '2026-01-21T00:00:00Z',
      };

      expect(user.id).toBe('user123');
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
    });
  });

  describe('LoginRequest type', () => {
    it('debería permitir crear un objeto LoginRequest válido', () => {
      const request: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(request.email).toBe('test@example.com');
      expect(request.password).toBe('password123');
    });
  });

  describe('RegisterRequest type', () => {
    it('debería permitir crear un objeto RegisterRequest válido', () => {
      const request: RegisterRequest = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      expect(request.email).toBe('test@example.com');
      expect(request.password).toBe('password123');
      expect(request.name).toBe('Test User');
    });
  });

  describe('AuthResponse type', () => {
    it('debería permitir crear un AuthResponse exitoso', () => {
      const response: AuthResponse = {
        success: true,
        message: 'Login exitoso',
        user: {
          id: 'user123',
          email: 'test@example.com',
          password: 'hash',
          name: 'Test User',
          createdAt: '2026-01-21T00:00:00Z',
        },
        token: 'token123',
      };

      expect(response.success).toBe(true);
      expect(response.user).toBeDefined();
      expect(response.token).toBeDefined();
    });

    it('debería permitir crear un AuthResponse de error', () => {
      const response: AuthResponse = {
        success: false,
        message: 'Credenciales inválidas',
      };

      expect(response.success).toBe(false);
      expect(response.user).toBeUndefined();
      expect(response.token).toBeUndefined();
    });
  });

  describe('ApiResponse type', () => {
    it('debería permitir crear un ApiResponse genérico con datos', () => {
      const response: ApiResponse<string[]> = {
        success: true,
        message: 'Success',
        data: ['item1', 'item2'],
      };

      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(2);
    });

    it('debería permitir crear un ApiResponse sin datos', () => {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Error',
      };

      expect(response.success).toBe(false);
      expect(response.data).toBeUndefined();
    });
  });

  describe('Type validation', () => {
    it('debería validar estructura de User', () => {
      const user: User = {
        id: 'test',
        email: 'test@example.com',
        password: 'pass',
        name: 'Test',
        createdAt: new Date().toISOString(),
      };

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('createdAt');
    });

    it('debería validar propiedades requeridas en LoginRequest', () => {
      const request: LoginRequest = {
        email: 'test@example.com',
        password: 'password123',
      };

      expect(request).toHaveProperty('email');
      expect(request).toHaveProperty('password');
      expect(Object.keys(request)).toHaveLength(2);
    });
  });
});
