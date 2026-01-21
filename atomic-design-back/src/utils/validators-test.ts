import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  generateId,
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
} from './validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    it('debería validar emails válidos', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.email@domain.co.uk')).toBe(true);
      expect(validateEmail('name+tag@example.com')).toBe(true);
    });

    it('debería rechazar emails inválidos', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user @example.com')).toBe(false);
      expect(validateEmail('user@example')).toBe(false);
    });

    it('debería rechazar emails vacíos', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('debería validar contraseñas con al menos 6 caracteres', () => {
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('password')).toBe(true);
      expect(validatePassword('securePass123')).toBe(true);
    });

    it('debería rechazar contraseñas menores a 6 caracteres', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('pass')).toBe(false);
      expect(validatePassword('a')).toBe(false);
    });

    it('debería rechazar contraseñas vacías', () => {
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('generateId', () => {
    it('debería generar un ID único', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('debería generar un ID con formato correcto', () => {
      const id = generateId();
      expect(id).toMatch(/^\d+-[a-z0-9]+$/);
    });

    it('debería generar IDs que contengan timestamp', () => {
      const id = generateId();
      const timestamp = id.split('-')[0];
      expect(parseInt(timestamp)).toBeGreaterThan(0);
    });
  });

  describe('hashPassword', () => {
    it('debería hashear una contraseña', () => {
      const password = 'mypassword';
      const hash = hashPassword(password);
      expect(hash).not.toBe(password);
    });

    it('debería producir el mismo hash para la misma contraseña', () => {
      const password = 'test123';
      const hash1 = hashPassword(password);
      const hash2 = hashPassword(password);
      expect(hash1).toBe(hash2);
    });

    it('debería producir hashes diferentes para diferentes contraseñas', () => {
      const hash1 = hashPassword('password1');
      const hash2 = hashPassword('password2');
      expect(hash1).not.toBe(hash2);
    });

    it('debería retornar un string en base64', () => {
      const hash = hashPassword('test');
      expect(hash).toMatch(/^[A-Za-z0-9+/=]+$/);
    });
  });

  describe('verifyPassword', () => {
    it('debería verificar una contraseña correcta', () => {
      const password = 'mypassword';
      const hash = hashPassword(password);
      expect(verifyPassword(password, hash)).toBe(true);
    });

    it('debería rechazar una contraseña incorrecta', () => {
      const hash = hashPassword('correctpassword');
      expect(verifyPassword('wrongpassword', hash)).toBe(false);
    });

    it('debería ser sensible a cambios mínimos', () => {
      const hash = hashPassword('password');
      expect(verifyPassword('passwor', hash)).toBe(false);
      expect(verifyPassword('passwords', hash)).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('debería generar un token con usuario ID y email', () => {
      const user = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hash',
        name: 'Test',
        createdAt: '2026-01-21T00:00:00Z',
      };

      const token = generateToken(user);
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

      expect(decoded.userId).toBe(user.id);
      expect(decoded.email).toBe(user.email);
    });

    it('debería incluir timestamp en el token', () => {
      const user = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hash',
        name: 'Test',
        createdAt: '2026-01-21T00:00:00Z',
      };

      const token = generateToken(user);
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

      expect(decoded.iat).toBeDefined();
      expect(typeof decoded.iat).toBe('number');
    });

    it('debería retornar un string en base64', () => {
      const user = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hash',
        name: 'Test',
        createdAt: '2026-01-21T00:00:00Z',
      };

      const token = generateToken(user);
      expect(token).toMatch(/^[A-Za-z0-9+/=]+$/);
    });
  });

  describe('verifyToken', () => {
    it('debería generar y verificar token correctamente', () => {
      const user = {
        id: 'user123',
        email: 'test@example.com',
        password: 'hash',
        name: 'Test',
        createdAt: '2026-01-21T00:00:00Z',
      };

      const token = generateToken(user);
      const isValid = verifyToken(token);
      // verifyToken retorna el email si es válido, no true
      expect(isValid).toBeTruthy();
    });

    it('debería rechazar un token inválido', () => {
      expect(verifyToken('invalid')).toBeFalsy();
      expect(verifyToken('aW52YWxpZA==')).toBeFalsy();
    });

    it('debería rechazar tokens sin userId o email', () => {
      const invalidToken = Buffer.from(JSON.stringify({ iat: Date.now() })).toString('base64');
      expect(verifyToken(invalidToken)).toBeFalsy();
    });

    it('debería retornar falsy para tokens vacíos', () => {
      expect(verifyToken('')).toBeFalsy();
    });
  });
});
