import { Request, Response } from 'express';
import { LoginRequest, RegisterRequest } from '../types/index.js';
import { authService } from '../services/authService.js';

/**
 * Controlador de registro
 */
export async function registerController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name } = req.body as RegisterRequest;

    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: 'Email, contraseña y nombre son requeridos',
      });
      return;
    }

    const result = authService.register({ email, password, name });
    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}

/**
 * Controlador de login
 */
export async function loginController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
      });
      return;
    }

    const result = authService.login({ email, password });
    res.status(result.success ? 200 : 401).json(result);
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}

/**
 * Controlador de logout
 */
export async function logoutController(_req: Request, res: Response): Promise<void> {
  try {
    const result = authService.logout();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}

/**
 * Controlador para obtener todos los usuarios
 */
export async function getUsersController(_req: Request, res: Response): Promise<void> {
  try {
    const users = authService.getAllUsers();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
    res.status(200).json({
      success: true,
      data: usersWithoutPasswords,
    });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}
