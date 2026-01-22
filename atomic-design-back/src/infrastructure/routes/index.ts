import { Router } from 'express';
import { authRoutes } from './authRoutes.js';
import { getUsersController } from '../http/AuthController.js';

export const appRoutes = Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Verifica el estado del servidor
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Servidor activo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
appRoutes.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       500:
 *         description: Error interno del servidor
 */
appRoutes.get('/users', getUsersController);

// Rutas de autenticación
appRoutes.use('/auth', authRoutes);
