import { AuthService } from '../../Domain/Services/AuthService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should create AuthService instance', () => {
    expect(authService).toBeDefined();
  });

  it('should validate valid email format', () => {
    const validEmail = 'test@example.com';
    expect(authService.validateEmail(validEmail)).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalidEmail = 'invalid-email';
    expect(authService.validateEmail(invalidEmail)).toBe(false);
  });

  it('should validate password with minimum length', () => {
    const validPassword = 'password123';
    expect(authService.validatePassword(validPassword)).toBe(true);
  });

  it('should reject password shorter than 6 characters', () => {
    const shortPassword = 'pass';
    expect(authService.validatePassword(shortPassword)).toBe(false);
  });

  it('should have verifyPassword method', () => {
    expect(typeof authService.verifyPassword).toBe('function');
  });
});
