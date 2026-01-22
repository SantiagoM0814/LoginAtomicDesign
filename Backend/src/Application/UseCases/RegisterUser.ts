import { User } from "../../Domain/Entities/User";
import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { UserRegister} from "../Dto/UserRegister";

export class RegisterUser {

    constructor (

        private userRepository: IUserRepository
    ) {}

    async execute (data: UserRegister): Promise<User> {

        const { correo, contrasena, nombre } = data;

        const existingUser = await this.userRepository.findByEmail(correo);

        if(existingUser) {
            throw new Error("Ya existe un usuario con ese correo");
        }

        const user = new User(
            crypto.randomUUID(),
            correo,
            contrasena,
            nombre,
            new Date()
        );

        return this.userRepository.save(user);
    }
}