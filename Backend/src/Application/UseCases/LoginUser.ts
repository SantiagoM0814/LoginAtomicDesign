import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { User } from "../../Domain/Entities/User";

export class LoginUser {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("El usuario no existe");
        }

        if (password !== user.contrasena) {
            throw new Error("Contraseña incorrecta");
        }

        return user;
    }
}
