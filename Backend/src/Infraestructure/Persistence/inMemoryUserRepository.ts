import { User } from "../../Domain/Entities/User";
import { IUserRepository } from "../../Domain/Repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository{

    private users: User[] = [
        {
            id: "prueba",
            correo: "prueba@gmail.com",
            contrasena: "Prueba1234",
            nombre: "Homeroooo",
            createdAt: new Date("2026-01-22")
        }
    ];

    async save (user: User): Promise<User> {
        this.users.push(user);
        return user;
    }
    async findByEmail (correo: string): Promise<User | null> {
        const user = this.users.find(user => user.correo === correo);
        return user ?? null;
    }

    async findAll(): Promise<User[]> { 
        return this.users;
    }
}