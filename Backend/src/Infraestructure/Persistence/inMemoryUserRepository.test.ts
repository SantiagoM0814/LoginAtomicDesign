import { InMemoryUserRepository } from '../../Infraestructure/Persistence/inMemoryUserRepository';
import { User } from '../../Domain/Entities/User';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
  });

  it('should create repository instance', () => {
    expect(repository).toBeDefined();
  });

  it('should save user', async () => {
    const user = new User('test-1', 'test@example.com', 'hashedPassword', 'Test User', new Date());

    const savedUser = await repository.save(user);
    expect(savedUser).toBeDefined();
    expect(savedUser.correo).toBe('test@example.com');
  });

  it('should find user by email', async () => {
    const user = new User('test-2', 'findme@example.com', 'hashedPassword', 'Find Me User', new Date());

    await repository.save(user);
    const foundUser = await repository.findByEmail('findme@example.com');
    expect(foundUser).toBeDefined();
    expect(foundUser?.nombre).toBe('Find Me User');
  });

  it('should return null for non-existent email', async () => {
    const user = await repository.findByEmail('nonexistent@example.com');
    expect(user).toBeNull();
  });

  it('should return all users', async () => {
    const user = new User('test-3', 'all@example.com', 'hashedPassword', 'All Users Test', new Date());
    await repository.save(user);
    const allUsers = await repository.findAll();
    expect(allUsers).toBeDefined();
    expect(Array.isArray(allUsers)).toBe(true);
  });
});
