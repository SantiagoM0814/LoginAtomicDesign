import { User } from '../../Domain/Entities/User';

describe('User Entity', () => {
  it('should create a user instance', () => {
    const user = new User('1', 'john@example.com', 'hashedPassword123', 'John Doe', new Date());
    expect(user).toBeDefined();
    expect(user.nombre).toBe('John Doe');
    expect(user.correo).toBe('john@example.com');
  });

  it('should have correo property', () => {
    const user = new User('2', 'jane@example.com', 'hashedPassword456', 'Jane Doe', new Date());
    expect(user.correo).toMatch(/@example\.com/);
  });

  it('should have correct id and nombre', () => {
    const user = new User('3', 'test@example.com', 'password', 'Test User', new Date());
    expect(user.id).toBe('3');
    expect(user.nombre).toBe('Test User');
  });
});
