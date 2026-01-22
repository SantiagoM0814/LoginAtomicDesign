import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { AuthService } from "../Services/AuthService";
import { RegisterDTO } from "../DTOs/RegisterDTO";
import { UserDTO } from "../DTOs/UserDTO";

export class RegisterUserUseCase {

    constructor (

        private userRepository: IUserRepository,
        private authService: AuthService
    ) {}

    async execute (data: RegisterDTO): Promise<UserDTO> {

        const { correo, contrasena, nombre } = data;

        if (!this.authService.validateEmail(correo)) {
            throw new Error('Invalid email format');
        }
    }
}