import { GetUsers } from './GetUser';
import { IUserRepository } from '../../Domain/Repositories/IUserRepository';
import { User } from '../../Domain/Entities/User';

describe('GetUsers', () => {
  let getUsersUseCase: GetUsers;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    // Crear mock del repositorio
    mockUserRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn()
    };
    
    getUsersUseCase = new GetUsers(mockUserRepository);
  });

  it('debería retornar un array de usuarios cuando existen usuarios', async () => {
    // Arrange
    const mockUsers = [
      new User('1', 'user1@example.com', 'Password123!', 'User One', new Date(2025, 1, 23)),
      new User('2', 'user2@example.com', 'Password456!', 'User Two', new Date(2025, 1, 23)),
      new User('3', 'user3@example.com', 'Password789!', 'User Three', new Date(2025, 1, 23))
    ];
    mockUserRepository.findAll.mockResolvedValue(mockUsers);

    // Act
    const result = await getUsersUseCase.execute();

    // Assert
    expect(result).toEqual(mockUsers);
    expect(result).toHaveLength(3);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('debería retornar un array vacío cuando no hay usuarios', async () => {
    // Arrange
    mockUserRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await getUsersUseCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('debería propagar el error cuando el repositorio falla', async () => {
    // Arrange
    const errorMessage = 'Error de base de datos';
    mockUserRepository.findAll.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(getUsersUseCase.execute()).rejects.toThrow(errorMessage);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('debería llamar al método findAll del repositorio', async () => {
    // Arrange
    mockUserRepository.findAll.mockResolvedValue([]);

    // Act
    await getUsersUseCase.execute();

    // Assert
    expect(mockUserRepository.findAll).toHaveBeenCalledWith();
  });
});