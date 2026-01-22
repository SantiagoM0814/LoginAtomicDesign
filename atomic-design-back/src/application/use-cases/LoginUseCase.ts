import { IUserRepository } from '../../domain/repositories/UserRepository.js';
import { LoginRequestDto, AuthResponseDto } from '../dto/AuthDtos.js';
import { verifyPassword, generateToken } from '../../utils/validators.js';

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(request: LoginRequestDto): AuthResponseDto {
    const user = this.userRepository.findByEmail(request.email);

    if (!user) {
      return {
        success: false,
        message: 'Email o contraseña incorrectos',
      };
    }

    if (!verifyPassword(request.password, user.password)) {
      return {
        success: false,
        message: 'Email o contraseña incorrectos',
      };
    }

    const token = generateToken(user);

    return {
      success: true,
      message: 'Login exitoso',
      user: user.toPublicUser() as any,
      token,
    };
  }
}
