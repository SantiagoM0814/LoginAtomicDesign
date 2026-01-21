// Archivo de referencia: src/services/api.ts
// (Para ser usado en el frontend - atomic-design-front)

const API_URL = 'http://localhost:3001/api';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Servicio API para comunicación con el backend
 */
export class ApiService {
  /**
   * Registrar un nuevo usuario
   */
  static async register(
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error en registro:', error);
      return {
        success: false,
        message: 'Error al conectar con el servidor',
      };
    }
  }

  /**
   * Iniciar sesión
   */
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error al conectar con el servidor',
      };
    }
  }

  /**
   * Cerrar sesión
   */
  static async logout(): Promise<void> {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }

  /**
   * Obtener todos los usuarios
   */
  static async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await fetch(`${API_URL}/users`);
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return {
        success: false,
        message: 'Error al conectar con el servidor',
      };
    }
  }

  /**
   * Obtener usuario actualmente autenticado
   */
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Obtener token de autenticación
   */
  static getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Verificar si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    return !!this.getAuthToken() && !!this.getCurrentUser();
  }
}
