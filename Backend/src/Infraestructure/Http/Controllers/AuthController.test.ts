import { AuthController } from './AuthController';
import { LoginUser } from '../../../Application/UseCases/LoginUser';
import { RegisterUser } from '../../../Application/UseCases/RegisterUser';
import { IUserRepository } from '../../../Domain/Repositories/IUserRepository';
import { User } from '../../../Domain/Entities/User';
import { Request, Response } from 'express';

/**
 * Repositorio fake tipado
 * (no se usa realmente, pero satisface el constructor)
 */
const mockUserRepository: IUserRepository = {
  findAll: jest.fn<Promise<User[]>, []>(),
  findByEmail: jest.fn<Promise<User | null>, [string]>(),
  save: jest.fn<Promise<User>, [User]>(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let loginUser: LoginUser;
  let registerUser: RegisterUser;

  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    loginUser = new LoginUser(mockUserRepository);
    registerUser = new RegisterUser(mockUserRepository);

    // 🔹 mockeamos SOLO el método execute
    jest.spyOn(loginUser, 'execute');
    jest.spyOn(registerUser, 'execute');

    authController = new AuthController(loginUser, registerUser);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('login', () => {
    it('retorna 200 y el usuario sin contraseña', async () => {
      req = {
        body: {
          email: 'test@test.com',
          password: '123456',
        },
      };

      (loginUser.execute as jest.Mock).mockResolvedValue({
        id: 1,
        nombre: 'Juan',
        correo: 'test@test.com',
        contrasena: 'hashed',
      });

      await authController.login(req as Request, res as Response);

      expect(loginUser.execute).toHaveBeenCalledWith(
        'test@test.com',
        '123456'
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        nombre: 'Juan',
        correo: 'test@test.com',
      });
    });

    it('retorna 404 si el usuario no existe', async () => {
      req = {
        body: {
          email: 'no@test.com',
          password: '123456',
        },
      };

      (loginUser.execute as jest.Mock).mockRejectedValue(
        new Error('USER_NOT_FOUND')
      );

      await authController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 404,
        message: 'Usuario no encontrado',
      });
    });

    it('retorna 401 si las credenciales son inválidas', async () => {
      req = {
        body: {
          email: 'test@test.com',
          password: 'wrong',
        },
      };

      (loginUser.execute as jest.Mock).mockRejectedValue(
        new Error('INVALID_CREDENTIALS')
      );

      await authController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 401,
        message: 'Credenciales incorrectas',
      });
    });
  });

  describe('register', () => {
    it('retorna 201 y el usuario registrado', async () => {
      req = {
        body: {
          name: 'Ana',
          email: 'ana@test.com',
          password: '123456',
        },
      };

      (registerUser.execute as jest.Mock).mockResolvedValue({
        id: 2,
        nombre: 'Ana',
        correo: 'ana@test.com',
        contrasena: 'hashed',
      });

      await authController.register(req as Request, res as Response);

      expect(registerUser.execute).toHaveBeenCalledWith({
        nombre: 'Ana',
        correo: 'ana@test.com',
        contrasena: '123456',
      });

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 2,
        nombre: 'Ana',
        correo: 'ana@test.com',
      });
    });

    it('retorna 409 si el email ya existe', async () => {
      req = {
        body: {
          name: 'Ana',
          email: 'ana@test.com',
          password: '123456',
        },
      };

      (registerUser.execute as jest.Mock).mockRejectedValue(
        new Error('EMAIL_ALREADY_EXISTS')
      );

      await authController.register(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 409,
        message: 'El correo ya está registrado',
      });
    });

    it('retorna 500 si ocurre un error inesperado', async () => {
      req = {
        body: {
          email: 'test@test.com',
          password: '123456',
        },
      };

      (loginUser.execute as jest.Mock).mockRejectedValue(
        new Error('UNEXPECTED_ERROR')
      );

      await authController.login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 500,
        message: 'Error interno del servidor',
      });
    });

    it('retorna 500 si ocurre un error inesperado', async () => {
      req = {
        body: {
          email: 'test@test.com',
          password: '123456',
        },
      };

      (registerUser.execute as jest.Mock).mockRejectedValue(
        new Error('UNEXPECTED_ERROR')
      );

      await authController.register(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: 500,
        message: 'Error interno del servidor',
      });
    });

  });
});
