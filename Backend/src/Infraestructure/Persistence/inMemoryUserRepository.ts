import { User } from "../../Domain/Entities/User";
import { IUserRepository } from "../../Domain/Repositories/IUserRepository";

export class InMemoryUserRepository {

    private users: Map<string, User> = new Map();

    async save (user: User): Promise<User> { }
    async findByEmail (correo: string): Promise<User | null> { }
    async findAll(): Promise<User[]> { }
}