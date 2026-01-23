import { Request, Response } from 'express';
import { UserController } from './UserController';
import { GetUsers } from '../../../Application/UseCases/GetUser';
import { IUserRepository } from '../../../Domain/Repositories/IUserRepository';
import { User } from '../../../Domain/Entities/User';

/**
 * Repositorio fake tipado
 */
const mockUserRepository: IUserRepository = {
  findAll: jest.fn<Promise<User[]>, []>(),
  findByEmail: jest.fn<Promise<User | null>, [string]>(),
  save: jest.fn<Promise<User>, [User]>(),
};

describe('UserController', () => {
  let userController: UserController;
  let getUsers: GetUsers;

  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    getUsers = new GetUsers(mockUserRepository);

    // mockeamos SOLO execute
    jest.spyOn(getUsers, 'execute');

    userController = new UserController(getUsers);

    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('retorna 200 y la lista de usuarios', async () => {
    const users: User[] = [
      {
        id: "SGV1",
        nombre: 'Juan',
        correo: 'juan@test.com',
        contrasena: 'hashed',
        createdAt: new Date("2026-01-22")
      },
      {
        id: "SGV2",
        nombre: 'Ana',
        correo: 'ana@test.com',
        contrasena: 'hashed',
        createdAt: new Date("2026-01-22")
      },
    ];

    (getUsers.execute as jest.Mock).mockResolvedValue(users);

    await userController.getAll(req as Request, res as Response);

    expect(getUsers.execute).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('retorna 500 si ocurre un error', async () => {
    (getUsers.execute as jest.Mock).mockRejectedValue(
      new Error('DB_ERROR')
    );

    await userController.getAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error getting users',
    });
  });
});
