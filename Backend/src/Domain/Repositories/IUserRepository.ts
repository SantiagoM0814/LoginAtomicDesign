import { User } from "../Entities/User";

export interface IUserRepository {

    save (user: User): Promise<User>;
    findByEmail (correo: string): Promise<User | null>;
    findAll(): Promise<User[]>;
}