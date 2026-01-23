import { IUserRepository } from "../../Domain/Repositories/IUserRepository";

export class LoginUser {
    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async execute(email: string, password: string) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.userRepository.findByEmail(normalizedEmail);

        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }

        if (user.contrasena !== password) {
            throw new Error("INVALID_CREDENTIALS");
        }

        return user;
    }
}
