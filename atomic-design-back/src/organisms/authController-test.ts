import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  registerController,
  loginController,
  logoutController,
  getUsersController,
} from './authController';
import { storage } from '../atoms/storage';
import type { Request, Response } from 'express';

describe('AuthController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let jsonMock: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let statusMock: any;

  beforeEach(() => {
    jsonMock = vi.fn().mockReturnValue(undefined);
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('registerController', () => {
    it('debería retornar error 400 si faltan campos', async () => {
      mockRequest.body = { email: 'test@example.com' };

      await registerController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.stringContaining('requeridos'),
        })
      );
    });

    it('debería registrar usuario correctamente', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      await registerController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.stringContaining('registrado'),
        })
      );
    });

    it('debería rechazar email inválido', async () => {
      mockRequest.body = {
        email: 'invalid',
        password: 'password123',
        name: 'Test User',
      };

      await registerController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
        })
      );
    });
  });

  describe('loginController', () => {
    it('debería retornar error 400 si faltan campos', async () => {
      mockRequest.body = { email: 'test@example.com' };

      await loginController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
        })
      );
    });

    it('debería hacer login correctamente', async () => {
      // Primero registrar
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      await registerController(mockRequest as Request, mockResponse as Response);

      // Limpiar mocks
      statusMock.mockClear();
      jsonMock.mockClear();
      statusMock.mockReturnValue({ json: jsonMock });

      // Luego login
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };
      await loginController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.stringContaining('Login'),
        })
      );
    });

    it('debería retornar error 401 con credenciales inválidas', async () => {
      mockRequest.body = {
        email: 'notregistered@example.com',
        password: 'password123',
      };

      await loginController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
        })
      );
    });
  });

  describe('logoutController', () => {
    it('debería hacer logout correctamente', async () => {
      await logoutController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.stringContaining('Logout'),
        })
      );
    });
  });

  describe('getUsersController', () => {
    it('debería retornar usuarios cuando existan', async () => {
      // Registrar usuario
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };
      await registerController(mockRequest as Request, mockResponse as Response);

      // Limpiar mocks
      statusMock.mockClear();
      jsonMock.mockClear();
      statusMock.mockReturnValue({ json: jsonMock });

      // Obtener usuarios
      await getUsersController(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      const callArgs = jsonMock.mock.calls[0][0];
      expect(callArgs.success).toBe(true);
      expect(Array.isArray(callArgs.data)).toBe(true);
      expect(callArgs.data.length).toBeGreaterThan(0);
      expect((callArgs.data[0] as unknown as { password?: string }).password).toBeUndefined();
    });

    it('debería retornar múltiples usuarios', async () => {
      // Limpiar primero
      storage.clear();

      // Registrar dos usuarios
      for (let i = 1; i <= 2; i++) {
        mockRequest.body = {
          email: `user${i}@example.com`,
          password: 'password123',
          name: `User ${i}`,
        };
        await registerController(mockRequest as Request, mockResponse as Response);
      }

      // Limpiar mocks
      statusMock.mockClear();
      jsonMock.mockClear();
      statusMock.mockReturnValue({ json: jsonMock });

      // Obtener usuarios
      await getUsersController(mockRequest as Request, mockResponse as Response);

      const callArgs = jsonMock.mock.calls[0][0];
      expect(callArgs.data).toHaveLength(2);
    });
  });

  describe('Manejo de errores', () => {
    it('debería manejar errores en registrar', async () => {
      mockRequest.body = null;

      await registerController(mockRequest as Request, mockResponse as Response);

      // Debería retornar 400 por campos faltantes
      expect(statusMock).toHaveBeenCalled();
    });

    it('debería manejar errores en login', async () => {
      mockRequest.body = null;

      await loginController(mockRequest as Request, mockResponse as Response);

      // Debería retornar 400 por campos faltantes
      expect(statusMock).toHaveBeenCalled();
    });
  });
});
