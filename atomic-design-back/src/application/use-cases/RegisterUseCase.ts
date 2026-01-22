import { IUserRepository } from '../../domain/repositories/UserRepository.js';
import { UserEntity } from '../../domain/entities/User.js';
import { RegisterRequestDto, AuthResponseDto } from '../dto/AuthDtos.js';
import {
  validateEmail,
  validatePassword,
  generateId,
  hashPassword,
} from '../../utils/validators.js';

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(request: RegisterRequestDto): AuthResponseDto {
    if (!validateEmail(request.email)) {
      return {
        success: false,
        message: 'Email inválido',
      };
    }

    if (!validatePassword(request.password)) {
      return {
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres',
      };
    }

    if (this.userRepository.existsByEmail(request.email)) {
      return {
        success: false,
        message: 'El email ya está registrado',
      };
    }

    const newUser = UserEntity.create(
      generateId(),
      request.email,
      hashPassword(request.password),
      request.name,
      new Date().toISOString()
    );

    this.userRepository.save(newUser);

    return {
      success: true,
      message: 'Usuario registrado correctamente',
      user: newUser.toPublicUser() as any,
    };
  }
}
