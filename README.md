# Login Atomic Design - Proyecto Completo

Proyecto fullstack que implementa un sistema de autenticación y registro de usuarios utilizando el patrón **Atomic Design** en el frontend y arquitectura en capas en el backend.

## ✅ Estado del Proyecto

| Aspecto | Estado |
|---------|--------|
| **Tests Frontend** | ✅ 18/18 PASANDO |
| **Tests Backend** | ✅ 17/17 PASANDO |
| **Linting Frontend** | ✅ 0 errores, 0 warnings |
| **Linting Backend** | ✅ 0 errores, 0 warnings |
| **Cobertura LCOV** | ✅ Configurada (HTML + lcov.info) |
| **TypeScript** | ✅ Sin tipos `any` (strict mode) |
| **Compilación** | ✅ Sin warnings de Node.js |

**Proyecto 100% operacional y listo para producción.**

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
│   ├── vitest.config.ts
│   ├── eslint.config.js
│   └── vite.config.ts
│
├── Backend/                   # Backend en Node.js + Express + TypeScript
│   ├── src/
│   │   ├── Application/       # DTOs y casos de uso
│   │   ├── Domain/            # Entidades y repositorios
│   │   ├── Infraestructure/   # Configuración, controladores, rutas
│   │   └── index.ts
│   ├── package.json
│   ├── jest.config.js
│   ├── .eslintrc.js
│   └── tsconfig.json
│
└── TESTING_GUIDE.md          # Guía completa de testing y cobertura
```

## 🚀 Requisitos Previos

- **Node.js** v16 o superior
- **npm** v8 o superior

## ⚡ Quick Start

### 1. Instalar dependencias

```bash
# Frontend
cd atomic-design-front && npm install && cd ..

# Backend
cd Backend && npm install && cd ..
```

### 2. Ejecutar en desarrollo

**Terminal 1 - Frontend:**
```bash
cd atomic-design-front
npm run dev
# Disponible en http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd Backend
npm run dev
# Disponible en http://localhost:3000
```

### 3. Ejecutar tests

```bash
# Frontend
cd atomic-design-front
npm run test

# Backend
cd Backend
npm test
```

### 4. Ver reportes de cobertura

```bash
# Frontend
cd atomic-design-front
npm run test:coverage:lcov
# Abre: coverage/lcov-report/index.html

# Backend
cd Backend
npm run test:coverage:lcov
# Abre: coverage/lcov-report/index.html
```

## 🎨 Frontend (Atomic Design)

### Instalación y Desarrollo
```bash
cd atomic-design-front
npm install
npm run dev  # http://localhost:5173
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo (Vite) |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run test` | Ejecuta tests (Vitest) |
| `npm run test:ui` | Tests con UI interactiva |
| `npm run test:coverage` | Cobertura en terminal |
| `npm run test:coverage:lcov` | Cobertura LCOV (HTML + lcov.info) |
| `npm run lint` | Verifica linting |
| `npm run lint:fix` | Arregla errores automáticamente |
| `npm run format` | Formatea código |

### Componentes Atomic Design

```
src/components/
├── atoms/          # Elementos básicos (Button, Input, Label)
├── molecules/      # Combinaciones (FormField)
├── organisms/      # Componentes complejos (LoginForm, RegisterForm)
└── pages/          # Páginas completas (Login, Register, Dashboard)
```

### Tests

- **Button.test.tsx** - Pruebas de componente Button
- **Input.test.tsx** - Pruebas de componente Input
- **Label.test.tsx** - Pruebas de componente Label
- **FormField.test.tsx** - Pruebas de molécula FormField
- **LoginForm.test.tsx** - Pruebas de organismo LoginForm

**Total: 18 tests ✅**

## 🔙 Backend (Express + TypeScript)

### Instalación y Desarrollo
```bash
cd Backend
npm install
npm run dev  # http://localhost:3000
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor con nodemon |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Ejecuta la versión compilada |
| `npm test` | Ejecuta tests |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:coverage` | Cobertura en terminal |
| `npm run test:coverage:lcov` | Cobertura LCOV (HTML + lcov.info) |
| `npm run lint` | Verifica linting |
| `npm run lint:fix` | Arregla errores automáticamente |
| `npm run format` | Formatea código |

### Arquitectura en Capas

```
src/
├── Application/       # Casos de uso y DTOs
├── Domain/           # Entidades y interfaces de repositorio
├── Infraestructure/  # Controllers, Routes, Servicios
└── index.ts
```

### Endpoints API

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar nuevo usuario
- `GET /users` - Obtener usuarios
- `GET /users/:id` - Obtener usuario por ID

### Tests

- **User.test.ts** - Pruebas de entidad User
- **AuthService.test.ts** - Pruebas de servicio de autenticación
- **AuthController.test.ts** - Pruebas de controlador
- **inMemoryUserRepository.test.ts** - Pruebas de repositorio

**Total: 17 tests ✅**

## 📋 Características

### Frontend
- ✅ Patrón **Atomic Design** (Atoms, Molecules, Organisms, Pages)
- ✅ React 18 con TypeScript (Strict Mode)
- ✅ Vite como bundler (desarrollo rápido)
- ✅ Vitest para testing unitario
- ✅ Routing con React Router v7
- ✅ Tests 18/18 PASANDO
- ✅ Cobertura LCOV con reporte HTML

### Backend
- ✅ Express.js con TypeScript
- ✅ Arquitectura en capas (Application, Domain, Infrastructure)
- ✅ Validación de datos
- ✅ Manejo centralizado de errores
- ✅ Tests unitarios 17/17 PASANDO
- ✅ Cobertura LCOV con reporte HTML
- ✅ OpenAPI/Swagger documentation

### General
- ✅ **35 tests unitarios** (18 frontend + 17 backend)
- ✅ **0 errores de linting** en ambos proyectos
- ✅ **0 warnings** de compilación
- ✅ **TypeScript Strict Mode** sin tipos `any`
- ✅ Formateo automático con Prettier
- ✅ ESLint moderno (Flat Config v9+)

## 🧪 Testing y Cobertura

### Resumen de Tests

| Proyecto | Tests | Estado |
|----------|-------|--------|
| **Frontend** | 18 tests | ✅ 18/18 PASANDO |
| **Backend** | 17 tests | ✅ 17/17 PASANDO |
| **Total** | **35 tests** | **✅ TODOS PASANDO** |

### Comandos de Testing Frontend

```bash
cd atomic-design-front

# Ejecutar tests (modo run)
npm run test

# Ejecutar tests en modo watch
npm run test -- --watch

# Tests con UI interactiva
npm run test:ui

# Cobertura de código (reporte en terminal)
npm run test:coverage

# Cobertura LCOV (recomendado para CI/CD)
npm run test:coverage:lcov
```

### Comandos de Testing Backend

```bash
cd Backend

# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Cobertura de código (reporte en terminal)
npm run test:coverage

# Cobertura LCOV (recomendado para CI/CD)
npm run test:coverage:lcov
```

### 📊 Reportes de Cobertura LCOV

Después de ejecutar `npm run test:coverage:lcov`, se genera un reporte interactivo:

#### Frontend
```
atomic-design-front/coverage/lcov-report/index.html
```

#### Backend
```
Backend/coverage/lcov-report/index.html
```

**Cómo visualizar el reporte:**
1. Ejecuta `npm run test:coverage:lcov` en el directorio del proyecto
2. Abre el archivo `coverage/lcov-report/index.html` en tu navegador
3. Verás un reporte detallado con:
   - **Porcentaje de cobertura general**
   - **Desglose por archivo**
   - **Líneas cubiertas vs no cubiertas**
   - **Funciones y ramas**

#### Archivo de Cobertura Estándar

También se genera el archivo `coverage/lcov.info` (formato estándar LCOV) compatible con:
- **Codecov** - Integración con GitHub/GitLab
- **SonarQube** - Análisis de calidad de código
- **Coveralls** - Reporte de cobertura en CI/CD
- Otras herramientas de análisis de código

**Nota:** La carpeta `coverage/` se ignora automáticamente en ESLint y Git para evitar conflictos.

## 📊 Linting y Formateo

### Frontend

```bash
cd atomic-design-front

# Verificar linting (✅ 0 errores, 0 warnings)
npm run lint

# Arreglar automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format
```

**Configuración:**
- `eslint.config.js` - Reglas de ESLint modernas (flat config)
- `.prettierrc.json` - Formato de código automático
- `package.json` - `"type": "module"` para soporte de ES modules

### Backend

```bash
cd Backend

# Verificar linting (✅ 0 errores, 0 warnings)
npm run lint

# Arreglar automáticamente
npm run lint:fix

# Formatear código con Prettier
npm run format
```

**Configuración:**
- `.eslintrc.js` - Reglas de ESLint
- `.prettierrc.json` - Formato de código automático
- `tsconfig.json` - Strict TypeScript

## 📚 Documentación Adicional

Para una guía completa sobre testing, cobertura de código y configuración, consulta [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## 📝 Notas Importantes

### Estructura de Carpetas Ignoradas
- `node_modules/` - Dependencias (se instalan con `npm install`)
- `dist/` - Compilación de producción (se genera con `npm run build`)
- `coverage/` - Reportes de cobertura LCOV (se generan con `npm run test:coverage:lcov`)
- `.git/` - Control de versiones

### Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `vite.config.ts` (frontend) | Configuración de Vite + Vitest |
| `eslint.config.js` (frontend) | Reglas de linting moderno (Flat Config) |
| `.eslintrc.js` (backend) | Reglas de linting |
| `tsconfig.json` | Configuración de TypeScript en modo strict |
| `package.json` | Scripts y dependencias |

### LCOV - Archivos de Cobertura

**Después de ejecutar `npm run test:coverage:lcov`:**

#### Frontend
```
atomic-design-front/
├── coverage/
│   ├── lcov.info          ← Archivo estándar LCOV (para CI/CD)
│   ├── lcov-report/
│   │   ├── index.html     ← 📊 Reporte interactivo (abrir en navegador)
│   │   ├── Button.tsx.html
│   │   ├── Input.tsx.html
│   │   └── ... (más archivos)
│   └── v8/
```

#### Backend
```
Backend/
├── coverage/
│   ├── lcov.info          ← Archivo estándar LCOV (para CI/CD)
│   ├── lcov-report/
│   │   ├── index.html     ← 📊 Reporte interactivo (abrir en navegador)
│   │   ├── User.ts.html
│   │   ├── AuthService.ts.html
│   │   └── ... (más archivos)
│   └── v8/
```

### Integraciones Soportadas

El archivo `lcov.info` es compatible con:
- 🔗 **GitHub Actions** - CI/CD automation
- 📊 **Codecov** - Reportes en PRs
- 🔍 **SonarQube** - Análisis de calidad
- 📈 **Coveralls** - Tracking de cobertura histórica

### Versiones de Tecnologías

- **React:** v18.2.0
- **TypeScript:** v5.x
- **Node.js:** v16+ (recomendado v18+)
- **Vite:** v5.x
- **Vitest:** v1.x
- **Express:** v4.x
- **ESLint:** v9.x (Flat Config)

## 🔗 Recursos Útiles

- [Atomic Design](https://atomicdesign.bradfrost.com/) - Metodología de Brad Frost
- [React Documentation](https://react.dev) - Documentación oficial de React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guía de TypeScript
- [Vite Guide](https://vitejs.dev/) - Documentación de Vite
- [Vitest](https://vitest.dev/) - Framework de testing
- [Express.js](https://expressjs.com/) - Framework web para Node.js

## 🤝 Contribuciones

Para reportar errores o sugerir mejoras, por favor crea un issue en el repositorio.

---

**Mantenedor:** Santiago Murillo  
**Última actualización:** Enero 2026  
**Licencia:** MIT  

✨ **Proyecto completamente funcional y optimizado para producción** ✨
