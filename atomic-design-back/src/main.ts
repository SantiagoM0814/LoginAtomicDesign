import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/http/swagger.js';
import { appRoutes } from './infrastructure/routes/index.js';

const app: Express = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAPI/Swagger documentation
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, { swaggerUrl: '/api-docs.json' }));
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API Routes
app.use('/api', appRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.warn(`Servidor corriendo en http://localhost:${PORT}`);
  console.warn(`Documentación OpenAPI: http://localhost:${PORT}/api-docs`);
});

