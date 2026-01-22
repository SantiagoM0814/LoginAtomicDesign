/**
 * Configuración e inyección de dependencias
 * Punto central para crear instancias de repositorios y use cases
 */

import { UserRepositoryImpl } from '../persistence/UserRepositoryImpl.js';
import { RegisterUseCase } from '../../application/use-cases/RegisterUseCase.js';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase.js';
import { LogoutUseCase } from '../../application/use-cases/LogoutUseCase.js';
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUsersUseCase.js';

// Repositorios
export const userRepository = new UserRepositoryImpl();

// Use Cases
export const registerUseCase = new RegisterUseCase(userRepository);
export const loginUseCase = new LoginUseCase(userRepository);
export const logoutUseCase = new LogoutUseCase();
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

// Container de dependencias
export const container = {
  repositories: {
    userRepository,
  },
  useCases: {
    registerUseCase,
    loginUseCase,
    logoutUseCase,
    getAllUsersUseCase,
  },
};

export default container;
