import { AuthResponseDto } from '../dto/AuthDtos.js';

export class LogoutUseCase {
  execute(): AuthResponseDto {
    return {
      success: true,
      message: 'Logout exitoso',
    };
  }
}
