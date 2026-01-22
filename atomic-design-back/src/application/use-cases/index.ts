import { IUserRepository } from '../../domain/repositories/UserRepository.js';
import { ApiResponseDto, UserResponseDto } from '../dto/AuthDtos.js';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(): ApiResponseDto<UserResponseDto[]> {
    const users = this.userRepository.findAll();
    const usersWithoutPasswords = users.map((user) => user.toPublicUser());

    return {
      success: true,
      message: 'Usuarios obtenidos correctamente',
      data: usersWithoutPasswords as any,
    };
  }
}
