import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/index.js';
import { storage } from '../atoms/storage.js';
import {
  validateEmail,
  validatePassword,
  generateId,
  hashPassword,
  verifyPassword,
  generateToken,
} from '../utils/validators.js';

/**
 * Servicio de autenticación - Maneja registro y login
 */
class AuthenticationService {
  private usersKey = 'users';

  register(data: RegisterRequest): AuthResponse {
    if (!validateEmail(data.email)) {
      return {
        success: false,
        message: 'Email inválido',
      };
    }

    if (!validatePassword(data.password)) {
      return {
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres',
      };
    }

    const users = this.getAllUsers();
    if (users.some((u) => u.email === data.email)) {
      return {
        success: false,
        message: 'El email ya está registrado',
      };
    }

    const newUser: User = {
      id: generateId(),
      email: data.email,
      name: data.name,
      password: hashPassword(data.password),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    storage.set(this.usersKey, users);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    return {
      success: true,
      message: 'Usuario registrado correctamente',
      user: userWithoutPassword as unknown as User,
    };
  }

  login(data: LoginRequest): AuthResponse {
    const users = this.getAllUsers();
    const user = users.find((u) => u.email === data.email);

    if (!user) {
      return {
        success: false,
        message: 'Email o contraseña incorrectos',
      };
    }

    if (!verifyPassword(data.password, user.password)) {
      return {
        success: false,
        message: 'Email o contraseña incorrectos',
      };
    }

    const token = generateToken(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login exitoso',
      user: userWithoutPassword as unknown as User,
      token,
    };
  }

  logout(): AuthResponse {
    return {
      success: true,
      message: 'Logout exitoso',
    };
  }

  getAllUsers(): User[] {
    const users = storage.get<User[]>(this.usersKey);
    return users || [];
  }

  getUserById(id: string): User | null {
    const users = this.getAllUsers();
    return users.find((u) => u.id === id) || null;
  }
}

export const authService = new AuthenticationService();
