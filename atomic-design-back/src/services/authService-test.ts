import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from './authService';
import { storage } from '../atoms/storage';

describe('AuthenticationService', () => {
  beforeEach(() => {
    storage.clear();
  });

  describe('register', () => {
    it('debería registrar un usuario correctamente', () => {
      const result = authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe('Usuario registrado correctamente');
      expect(result.user).toBeDefined();
      expect(result.user?.email).toBe('test@example.com');
      expect(result.user?.name).toBe('Test User');
    });

    it('debería rechazar email inválido', () => {
      const result = authService.register({
        email: 'invalid',
        password: 'password123',
        name: 'Test User',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email inválido');
    });

    it('debería rechazar contraseña corta', () => {
      const result = authService.register({
        email: 'test@example.com',
        password: '12345',
        name: 'Test User',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('La contraseña debe tener al menos 6 caracteres');
    });

    it('debería rechazar email duplicado', () => {
      authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'First User',
      });

      const result = authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Second User',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('El email ya está registrado');
    });

    it('no debería retornar contraseña en respuesta', () => {
      const result = authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      expect(result.user).toBeDefined();
      expect((result.user as unknown as { password?: string }).password).toBeUndefined();
    });

    it('debería crear un usuario con ID único', () => {
      const result1 = authService.register({
        email: 'user1@example.com',
        password: 'password123',
        name: 'User 1',
      });

      const result2 = authService.register({
        email: 'user2@example.com',
        password: 'password123',
        name: 'User 2',
      });

      expect(result1.user?.id).not.toBe(result2.user?.id);
    });
  });

  describe('login', () => {
    beforeEach(() => {
      authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });
    });

    it('debería hacer login correctamente', () => {
      const result = authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe('Login exitoso');
      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
    });

    it('debería rechazar email no registrado', () => {
      const result = authService.login({
        email: 'notregistered@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email o contraseña incorrectos');
    });

    it('debería rechazar contraseña incorrecta', () => {
      const result = authService.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email o contraseña incorrectos');
    });

    it('debería retornar token en login exitoso', () => {
      const result = authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.token).toBeDefined();
      expect(typeof result.token).toBe('string');
    });

    it('no debería retornar contraseña en respuesta', () => {
      const result = authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect((result.user as unknown as { password?: string }).password).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('debería hacer logout correctamente', () => {
      const result = authService.logout();

      expect(result.success).toBe(true);
      expect(result.message).toBe('Logout exitoso');
    });
  });

  describe('getAllUsers', () => {
    it('debería retornar array vacío si no hay usuarios', () => {
      const users = authService.getAllUsers();
      expect(users).toEqual([]);
    });

    it('debería retornar todos los usuarios registrados', () => {
      authService.register({
        email: 'user1@example.com',
        password: 'password123',
        name: 'User 1',
      });

      authService.register({
        email: 'user2@example.com',
        password: 'password123',
        name: 'User 2',
      });

      const users = authService.getAllUsers();
      expect(users).toHaveLength(2);
      expect(users[0].email).toBe('user1@example.com');
      expect(users[1].email).toBe('user2@example.com');
    });

    it('debería retornar usuarios con contraseñas', () => {
      authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      const users = authService.getAllUsers();
      expect(users[0].password).toBeDefined();
    });
  });

  describe('getUserById', () => {
    it('debería retornar null si usuario no existe', () => {
      const user = authService.getUserById('nonexistent');
      expect(user).toBeNull();
    });

    it('debería retornar el usuario por ID', () => {
      const registerResult = authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      const userId = registerResult.user?.id;
      const user = authService.getUserById(userId!);

      expect(user).toBeDefined();
      expect(user?.email).toBe('test@example.com');
    });
  });

  describe('Integración completa', () => {
    it('debería permitir flujo completo: registrar, login, obtener', () => {
      // Registrar
      const registerResult = authService.register({
        email: 'integration@example.com',
        password: 'password123',
        name: 'Integration Test',
      });
      expect(registerResult.success).toBe(true);

      // Login
      const loginResult = authService.login({
        email: 'integration@example.com',
        password: 'password123',
      });
      expect(loginResult.success).toBe(true);

      // Obtener usuarios
      const users = authService.getAllUsers();
      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('integration@example.com');

      // Obtener por ID
      const user = authService.getUserById(users[0].id);
      expect(user?.name).toBe('Integration Test');
    });
  });
});
