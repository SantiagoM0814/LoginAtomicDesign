import { UserEntity } from '../entities/User.js';

export interface IUserRepository {
  save(user: UserEntity): void;
  findByEmail(email: string): UserEntity | null;
  findById(id: string): UserEntity | null;
  findAll(): UserEntity[];
  existsByEmail(email: string): boolean;
}
