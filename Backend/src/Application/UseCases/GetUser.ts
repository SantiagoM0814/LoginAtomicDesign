import { IUserRepository } from "../../Domain/Repositories/IUserRepository";
import { User } from "../../Domain/Entities/User";

export class GetUsers {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}
