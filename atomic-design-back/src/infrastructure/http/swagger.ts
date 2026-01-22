const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Login Atomic Design API',
    version: '1.0.0',
    description:
      'API REST para autenticación de usuarios con arquitectura hexagonal usando Node.js y Express. Proporciona endpoints para registro, login y gestión de usuarios.',
    contact: {
      name: 'API Support',
      email: '',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Servidor de desarrollo',
    },
  ],
  paths: {
    '/api/auth/register': {
      post: {
        summary: 'Registrar un nuevo usuario',
        description: 'Crea una nueva cuenta de usuario con email, contraseña y nombre',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          description: 'Datos necesarios para registrar un nuevo usuario',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario registrado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          '400': {
            description: 'Error en validación o usuario ya existe',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Iniciar sesión de un usuario',
        description: 'Autentica un usuario y retorna un token JWT',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          description: 'Credenciales del usuario',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login exitoso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          '401': {
            description: 'Email o contraseña incorrectos',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/logout': {
      post: {
        summary: 'Cerrar sesión de un usuario',
        description: 'Finaliza la sesión actual del usuario',
        tags: ['Authentication'],
        responses: {
          '200': {
            description: 'Logout exitoso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/usuarios': {
      get: {
        summary: 'Obtener lista de usuarios',
        description: 'Retorna una lista de todos los usuarios registrados (sin contraseñas)',
        tags: ['Users'],
        responses: {
          '200': {
            description: 'Lista de usuarios obtenida con éxito',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserListResponse',
                },
              },
            },
          },
          '500': {
            description: 'Error interno del servidor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/health': {
      get: {
        summary: 'Verificar el estado del servidor',
        description: 'Health check para verificar que el servidor está activo',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'Servidor activo',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                      description: 'Estado del servidor',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      RegisterRequest: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'usuario@ejemplo.com',
            description: 'Email del usuario (debe ser único)',
          },
          password: {
            type: 'string',
            format: 'password',
            minLength: 6,
            example: 'password123',
            description: 'Contraseña del usuario (mínimo 6 caracteres)',
          },
          name: {
            type: 'string',
            example: 'Juan García',
            description: 'Nombre completo del usuario',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'usuario@ejemplo.com',
            description: 'Email del usuario',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'password123',
            description: 'Contraseña del usuario',
          },
        },
      },
      Usuario: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
            description: 'Identificador único del usuario',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'usuario@ejemplo.com',
            description: 'Email del usuario',
          },
          nombre: {
            type: 'string',
            example: 'Juan García',
            description: 'Nombre completo del usuario',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2024-01-22T10:30:00Z',
            description: 'Fecha de creación de la cuenta',
          },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indica si la operación fue exitosa',
          },
          message: {
            type: 'string',
            example: 'Login exitoso',
            description: 'Mensaje descriptivo de la respuesta',
          },
          usuario: {
            $ref: '#/components/schemas/Usuario',
            description: 'Datos del usuario autenticado (sin contraseña)',
          },
          token: {
            type: 'string',
            format: 'jwt',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaW4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            description: 'Token JWT para autenticación en solicitudes futuras',
          },
        },
      },
      UserListResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indica si la operación fue exitosa',
          },
          message: {
            type: 'string',
            example: 'Usuarios obtenidos correctamente',
            description: 'Mensaje descriptivo',
          },
          data: {
            type: 'array',
            description: 'Lista de usuarios',
            items: {
              $ref: '#/components/schemas/Usuario',
            },
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error en la solicitud',
            description: 'Descripción del error',
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token obtenido al hacer login. Incluir como: Authorization: Bearer {token}',
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'Operaciones de autenticación (registro, login, logout)',
    },
    {
      name: 'Users',
      description: 'Operaciones relacionadas con usuarios',
    },
    {
      name: 'Health',
      description: 'Health check del servidor',
    },
  ],
  externalDocs: {
    description: 'Documentación completa en GitHub',
    url: '',
  },
};

// Exportar la especificación directamente sin swagger-jsdoc
export const swaggerSpec = swaggerDefinition;


