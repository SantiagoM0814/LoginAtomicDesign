import { Request, Response } from 'express';
import { container } from '../config/container.js';

/**
 * POST /api/auth/register
 * Registra un nuevo usuario
 */
export async function registerController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: 'Email, contraseña y nombre son requeridos',
      });
      return;
    }

    const result = container.useCases.registerUseCase.execute({ email, password, name });
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
 * POST /api/auth/login
 * Inicia sesión de un usuario
 */
export async function loginController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos',
      });
      return;
    }

    const result = container.useCases.loginUseCase.execute({ email, password });
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
 * POST /api/auth/logout
 * Cierra sesión de un usuario
 */
export async function logoutController(_req: Request, res: Response): Promise<void> {
  try {
    const result = container.useCases.logoutUseCase.execute();
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
 * GET /api/users
 * Obtiene todos los usuarios (sin contraseñas)
 */
export async function getUsersController(_req: Request, res: Response): Promise<void> {
  try {
    const result = container.useCases.getAllUsersUseCase.execute();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
}
