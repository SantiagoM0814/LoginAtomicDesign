import express, { Express } from 'express';
import cors from 'cors';
import {
  registerController,
  loginController,
  logoutController,
  getUsersController,
} from './organisms/authController.js';

const app: Express = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.post('/api/auth/register', registerController);
app.post('/api/auth/login', loginController);
app.post('/api/auth/logout', logoutController);
app.get('/api/users', getUsersController);

// Health check
app.get('/api/health', (_req: express.Request, res: express.Response): void => {
  res.status(200).json({ status: 'ok' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.warn(`Servidor corriendo en http://localhost:${PORT}`);
});
