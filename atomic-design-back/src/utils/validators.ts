import { User } from '../types/index.js';

/**
 * Valida el formato de un email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida que la contraseña tenga al menos 6 caracteres
 */
export function validatePassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Genera un ID único
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simula un hash básico de contraseña (en producción usar bcrypt)
 */
export function hashPassword(password: string): string {
  return Buffer.from(password).toString('base64');
}

/**
 * Verifica si una contraseña coincide con su hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Genera un token JWT básico
 */
export function generateToken(user: User): string {
  const payload = {
    userId: user.id,
    email: user.email,
    iat: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * Valida un token
 */
export function verifyToken(token: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    return decoded.userId && decoded.email;
  } catch {
    return false;
  }
}
