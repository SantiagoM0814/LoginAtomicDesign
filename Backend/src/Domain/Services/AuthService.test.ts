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

  it('should return true when passwords match', async () => {
    const password = 'mySecretPassword';
    const hash = await require('bcryptjs').hash(password, 10);
    const result = await authService.verifyPassword(password, hash);
    expect(result).toBe(true);
  });

  it('should return false when passwords do not match', async () => {
    const password = 'password123';
    const hash = await require('bcryptjs').hash(password, 10);
    const result = await authService.verifyPassword('wrongPassword', hash);
    expect(result).toBe(false);
  });

  it('should normalize email to lowercase and trim', () => {
    const email = '  TEST@Example.COM  ';
    const normalized = authService.normalizeEmail(email);
    expect(normalized).toBe('test@example.com');
  });

  it('should normalize already lowercase email', () => {
    const email = 'user@dominio.com';
    const normalized = authService.normalizeEmail(email);
    expect(normalized).toBe('user@dominio.com');
  });
});
