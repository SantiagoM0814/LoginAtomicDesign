import { AuthController } from './AuthController';
import { LoginUser } from '../../../Application/UseCases/LoginUser';
import { RegisterUser } from '../../../Application/UseCases/RegisterUser';

describe('AuthController', () => {
  let authController: AuthController;
  let mockLoginUser: LoginUser;
  let mockRegisterUser: RegisterUser;

  beforeEach(() => {
    mockLoginUser = {
      execute: jest.fn(),
    } as unknown as LoginUser;

    mockRegisterUser = {
      execute: jest.fn(),
    } as unknown as RegisterUser;

    authController = new AuthController(mockLoginUser, mockRegisterUser);
  });

  it('should create AuthController instance', () => {
    expect(authController).toBeDefined();
  });

  it('should have login method', () => {
    expect(typeof authController.login).toBe('function');
  });

  it('should have register method', () => {
    expect(typeof authController.register).toBe('function');
  });
});
