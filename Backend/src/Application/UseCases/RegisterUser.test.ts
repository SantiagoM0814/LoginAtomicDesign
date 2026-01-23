import { RegisterUser } from './RegisterUser';
import { IUserRepository } from '../../Domain/Repositories/IUserRepository';
import { User } from '../../Domain/Entities/User';
import { UserRegister } from '../Dto/UserRegister';

describe('RegisterUser', () => {
  let registerUserUseCase: RegisterUser;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn()
    };
    
    registerUserUseCase = new RegisterUser(mockUserRepository);
  });

  describe('execute', () => {
    it('debería registrar un nuevo usuario exitosamente', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'newuser@example.com',
        contrasena: 'Password123!',
        nombre: 'New User'
      };
      
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockImplementation((user: User) => Promise.resolve(user));

      // Act
      const result = await registerUserUseCase.execute(userData);

      // Assert
      expect(result).toBeInstanceOf(User);
      expect(result.correo).toBe(userData.correo);
      expect(result.contrasena).toBe(userData.contrasena);
      expect(result.nombre).toBe(userData.nombre);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.correo);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    });

    it('debería lanzar error EMAIL_ALREADY_EXISTS cuando el correo ya está registrado', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'existing@example.com',
        contrasena: 'Password123!',
        nombre: 'Existing User'
      };
      
      const existingUser = new User(
        '123',
        userData.correo,
        'SomePassword',
        'Existing User',
        new Date()
      );
      
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(registerUserUseCase.execute(userData))
        .rejects
        .toThrow('EMAIL_ALREADY_EXISTS');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.correo);
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it('debería verificar que el usuario no existe antes de registrar', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'newuser@example.com',
        contrasena: 'Password123!',
        nombre: 'New User'
      };
      
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockImplementation((user: User) => Promise.resolve(user));

      // Act
      await registerUserUseCase.execute(userData);

      // Assert
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.correo);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('debería crear un usuario con un ID único', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'newuser@example.com',
        contrasena: 'Password123!',
        nombre: 'New User'
      };
      
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockImplementation((user: User) => Promise.resolve(user));

      // Act
      const result = await registerUserUseCase.execute(userData);

      // Assert
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('string');
      expect(result.id.length).toBeGreaterThan(0);
    });

    it('debería crear un usuario con la fecha actual', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'newuser@example.com',
        contrasena: 'Password123!',
        nombre: 'New User'
      };
      
      const beforeDate = new Date();
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockImplementation((user: User) => Promise.resolve(user));

      // Act
      const result = await registerUserUseCase.execute(userData);
      const afterDate = new Date();

      // Assert
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.createdAt.getTime()).toBeGreaterThanOrEqual(beforeDate.getTime());
      expect(result.createdAt.getTime()).toBeLessThanOrEqual(afterDate.getTime());
    });

    it('debería llamar al método save del repositorio con el usuario creado', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'newuser@example.com',
        contrasena: 'Password123!',
        nombre: 'New User'
      };
      
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockImplementation((user: User) => Promise.resolve(user));

      // Act
      await registerUserUseCase.execute(userData);

      // Assert
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
      const savedUser = mockUserRepository.save.mock.calls[0][0];
      expect(savedUser).toBeInstanceOf(User);
      expect(savedUser.correo).toBe(userData.correo);
      expect(savedUser.nombre).toBe(userData.nombre);
    });

    it('debería propagar errores del repositorio al verificar email existente', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'newuser@example.com',
        contrasena: 'Password123!',
        nombre: 'New User'
      };
      
      const errorMessage = 'Database connection error';
      mockUserRepository.findByEmail.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(registerUserUseCase.execute(userData))
        .rejects
        .toThrow(errorMessage);
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it('debería propagar errores del repositorio al guardar el usuario', async () => {
      // Arrange
      const userData: UserRegister = {
        correo: 'newuser@example.com',
        contrasena: 'Password123!',
        nombre: 'New User'
      };
      
      const errorMessage = 'Failed to save user';
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.save.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(registerUserUseCase.execute(userData))
        .rejects
        .toThrow(errorMessage);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
