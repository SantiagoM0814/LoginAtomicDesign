# Atomic Design Login Backend

Backend de login con patrón Atomic Design usando localStorage para persistencia de usuarios.

## Estructura del Proyecto

```
src/
├── atoms/           # Componentes básicos reutilizables
├── molecules/       # Combinaciones simples de átomos
├── organisms/       # Componentes complejos
├── services/        # Lógica de negocio
├── types/           # Tipos TypeScript
├── utils/           # Utilidades
└── main.ts         # Punto de entrada
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
npm start
```

## API Endpoints

### Registro
- **POST** `/api/auth/register`
- Body: `{ email: string, password: string, name: string }`
- Response: `{ success: boolean, message: string, user?: User }`

### Login
- **POST** `/api/auth/login`
- Body: `{ email: string, password: string }`
- Response: `{ success: boolean, message: string, user?: User, token: string }`

### Obtener Usuarios
- **GET** `/api/users`
- Response: `User[]`

### Logout
- **POST** `/api/auth/logout`
- Response: `{ success: boolean, message: string }`
