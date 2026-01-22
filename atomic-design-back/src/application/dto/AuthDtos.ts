export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
}

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponseDto {
  success: boolean;
  message: string;
  user?: UserResponseDto;
  token?: string;
}

export interface ApiResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
}
