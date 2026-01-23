import { LoginUser } from './LoginUser';
import { IUserRepository } from '../../Domain/Repositories/IUserRepository';
import { User } from '../../Domain/Entities/User';

describe('LoginUser', () => {
  let loginUserUseCase: LoginUser;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn()
    };
    
    loginUserUseCase = new LoginUser(mockUserRepository);
  });

  describe('execute', () => {
    it('debería retornar el usuario cuando las credenciales son correctas', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'Password123!';
      const mockUser = new User(
        '123',
        email,
        password,
        'Test User',
        new Date()
      );
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      // Act
      const result = await loginUserUseCase.execute(email, password);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('debería lanzar error USER_NOT_FOUND cuando el usuario no existe', async () => {
      // Arrange
      const email = 'nonexistent@example.com';
      const password = 'Password123!';
      mockUserRepository.findByEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(loginUserUseCase.execute(email, password))
        .rejects
        .toThrow('USER_NOT_FOUND');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('debería lanzar error INVALID_CREDENTIALS cuando la contraseña es incorrecta', async () => {
      // Arrange
      const email = 'test@example.com';
      const correctPassword = 'Password123!';
      const wrongPassword = 'WrongPassword';
      const mockUser = new User(
        '123',
        email,
        correctPassword,
        'Test User',
        new Date()
      );
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      // Act & Assert
      await expect(loginUserUseCase.execute(email, wrongPassword))
        .rejects
        .toThrow('INVALID_CREDENTIALS');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('debería llamar al repositorio con el email correcto', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'Password123!';
      const mockUser = new User(
        '123',
        email,
        password,
        'Test User',
        new Date()
      );
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      // Act
      await loginUserUseCase.execute(email, password);

      // Assert
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it('debería propagar errores del repositorio', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'Password123!';
      const errorMessage = 'Database connection error';
      mockUserRepository.findByEmail.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(loginUserUseCase.execute(email, password))
        .rejects
        .toThrow(errorMessage);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    });
  });
});
