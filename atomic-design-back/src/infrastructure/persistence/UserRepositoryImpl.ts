import { IUserRepository } from '../../domain/repositories/UserRepository.js';
import { UserEntity } from '../../domain/entities/User.js';
import { storage } from '../persistence/storage.js';

export class UserRepositoryImpl implements IUserRepository {
  private usersKey = 'users';

  save(user: UserEntity): void {
    const users = this.findAll();
    const existingIndex = users.findIndex((u) => u.id === user.id);

    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }

    storage.set(this.usersKey, users);
  }

  findByEmail(email: string): UserEntity | null {
    const users = this.findAll();
    const userData = users.find((u) => u.email === email);

    if (!userData) return null;

    return UserEntity.create(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      userData.createdAt
    );
  }

  findById(id: string): UserEntity | null {
    const users = this.findAll();
    const userData = users.find((u) => u.id === id);

    if (!userData) return null;

    return UserEntity.create(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      userData.createdAt
    );
  }

  findAll(): UserEntity[] {
    const users = storage.get<UserEntity[]>(this.usersKey) || [];
    return users;
  }

  existsByEmail(email: string): boolean {
    return this.findByEmail(email) !== null;
  }
}
