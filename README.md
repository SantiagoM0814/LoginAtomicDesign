# Login Atomic Design - Proyecto Completo

Proyecto fullstack que implementa un sistema de autenticación y registro de usuarios utilizando el patrón **Atomic Design** en el frontend y arquitectura en capas en el backend.

## 📁 Estructura del Proyecto

```
LoginAtomicDesign/
├── atomic-design-front/       # Frontend en React + TypeScript + Vite
│   ├── src/
│   │   ├── components/        # Componentes Atomic Design (atoms, molecules, organisms, pages)
│   │   ├── apis/              # Servicios API
│   │   ├── assets/            # Recursos estáticos
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── Backend/                   # Backend en Node.js + Express + TypeScript
    ├── src/
    │   ├── Application/       # DTOs y casos de uso
    │   ├── Domain/            # Entidades y repositorios
    │   ├── Infraestructure/   # Configuración, controladores, rutas
    │   └── index.ts
    ├── package.json
    └── tsconfig.json
```

## 🚀 Requisitos Previos

- **Node.js** v16 o superior
- **npm** v8 o superior

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/SantiagoM0814/LoginAtomicDesign.git
cd LoginAtomicDesign
```

## 🔧 Frontend (Atomic Design)

### Instalación
```bash
cd atomic-design-front
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:5173`

### Construcción para producción
```bash
npm run build
```

## 🔙 Backend (Express + TypeScript)

### Instalación
```bash
cd Backend
npm install
```

### Desarrollo
```bash
npm run dev
```
El backend estará disponible en `http://localhost:3000` (o el puerto configurado)

### Construcción para producción
```bash
npm run build
```

## 📋 Características

- ✅ Autenticación de usuarios
- ✅ Registro de nuevos usuarios
- ✅ Componentes reutilizables con Atomic Design
- ✅ API RESTful con Express
- ✅ Validación de datos
- ✅ Manejo de errores

## 🔗 Endpoints Principales (Backend)

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar nuevo usuario
- `GET /users` - Obtener usuarios
- `GET /users/:id` - Obtener usuario por ID

## 📝 Notas Importantes

- La carpeta `node_modules` se genera automáticamente al instalar dependencias
- Se recomienda usar versiones de Node.js y npm actualizadas
- Consulta el archivo OpenAPI.yaml para la documentación completa de la API
- Cada carpeta (frontend y backend) tiene su propio `package.json`

## 🤝 Contribuciones

Para dudas o problemas, contacta al responsable del repositorio.

---

**Última actualización:** Enero 2026
