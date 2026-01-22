import { Router } from 'express';
import {
  registerController,
  loginController,
  logoutController,
} from '../http/AuthController.js';

export const authRoutes = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Error en validación o usuario ya existe
 *       500:
 *         description: Error interno del servidor
 */
authRoutes.post('/register', registerController);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Email o contraseña incorrectos
 *       500:
 *         description: Error interno del servidor
 */
authRoutes.post('/login', loginController);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Cierra sesión de un usuario
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       500:
 *         description: Error interno del servidor
 */
authRoutes.post('/logout', logoutController);
