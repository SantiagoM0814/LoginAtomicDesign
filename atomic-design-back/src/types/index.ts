// Legacy exports - mantener para compatibilidad con tests existentes
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Re-export desde application layer para uso moderno
export * from '../application/dto/AuthDtos.js';

