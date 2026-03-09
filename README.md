# Portfolio Personal - Fullstack con Payload CMS

Portafolio personal administrable construido con Next.js 15, Payload CMS 3.x, PostgreSQL y Tailwind CSS.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 15.4 (App Router) con TypeScript strict mode
- **CMS**: Payload CMS 3.24 integrado
- **Base de Datos**: PostgreSQL 16
- **Estilos**: Tailwind CSS con dark mode
- **Animaciones**: Framer Motion
- **Multi-idioma**: next-intl (Español/Inglés)
- **Validación**: Zod
- **Deployment**: Dokploy con Nixpacks

## 📋 Características

- ✅ Panel administrativo en `/admin`
- ✅ CRUD completo para proyectos, experiencia, educación, certificaciones y skills
- ✅ Formulario de contacto con rate limiting
- ✅ Multi-idioma (ES/EN)
- ✅ Dark/Light mode persistente
- ✅ ISR con revalidación de 60 segundos
- ✅ SEO optimizado (sitemap, robots.txt, metadata dinámica)
- ✅ Responsive design (mobile-first)
- ✅ Security headers configurados
- ✅ Páginas de error personalizadas (404, 500)

## 🔧 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Database PostgreSQL (servicio separado en Dokploy)
DATABASE_URI="postgresql://usuario:password@host:5432/portfolio_db"

# Payload CMS Secret (mínimo 32 caracteres)
PAYLOAD_SECRET="tu-clave-secreta-super-segura-minimo-32-caracteres"

# Next.js Public Variables
NEXT_PUBLIC_SITE_URL="https://tudominio.com"
NEXT_PUBLIC_SITE_NAME="Tu Nombre"

# Cloudinary para uploads de media (opcional)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Iniciar desarrollo
npm run dev
```

Accede a:
- Portafolio: http://localhost:3000
- Panel Admin: http://localhost:3000/admin

## 🚀 Deployment en Dokploy

### 1. Preparar el Repositorio

```bash
# Hacer push del código a tu repositorio (GitHub, GitLab, etc.)
git remote add origin <tu-repositorio>
git push -u origin main
```

### 2. Configurar Base de Datos en Dokploy

1. En Dokploy, crear un nuevo servicio **PostgreSQL**
2. Anotar la cadena de conexión (DATABASE_URI)
3. La base de datos se creará automáticamente en el primer deploy

### 3. Crear el Proyecto en Dokploy

1. **Crear nuevo proyecto**
   - Build Type: `Nixpacks` (NO usar Dockerfile)
   - Repository: Conectar tu repo de Git

2. **Configurar Variables de Entorno**
   En el panel de Dokploy, agregar:

   ```env
   DATABASE_URI=postgresql://usuario:password@postgres-service:5432/portfolio_db
   PAYLOAD_SECRET=tu-clave-secreta-minimo-32-caracteres
   NEXT_PUBLIC_SITE_URL=https://tudominio.com
   NEXT_PUBLIC_SITE_NAME=Tu Nombre
   ```

   > **IMPORTANTE**: Reemplaza `postgres-service` con el nombre real del servicio PostgreSQL en Dokploy

3. **Configurar Settings**
   - Port: `3000`
   - Health Check Path: `/`

4. **Deploy**
   - Click en "Deploy"
   - Nixpacks detectará automáticamente que es un proyecto Next.js
   - Las migraciones de Payload correrán automáticamente antes del build

### 4. Configurar Dominio y HTTPS

1. En Dokploy, agregar tu dominio personalizado
2. Traefik configurará HTTPS automáticamente
3. Configura los DNS de tu dominio apuntando a la IP de Dokploy

### 5. Primer Acceso al Admin

1. Accede a `https://tudominio.com/admin`
2. Crea el primer usuario administrador
3. Comienza a agregar contenido!

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (frontend)/[locale]/     # Rutas públicas del portafolio
│   ├── (payload)/admin/         # Panel de Payload CMS
│   ├── api/                     # API routes
│   └── globals.css
├── collections/                 # Colecciones de Payload CMS
├── components/
│   ├── ui/                      # Componentes atómicos
│   ├── sections/                # Secciones del portafolio
│   └── providers/               # Theme provider
├── services/                    # Payload API con ISR
├── lib/                         # Utils, validaciones, constants
├── hooks/                       # Custom hooks
└── i18n/                        # Traducciones (en/es)
```

## 🔐 Seguridad

- ✅ Rate limiting en formulario de contacto (5 req/hora por IP)
- ✅ Sanitización de inputs
- ✅ Security headers configurados
- ✅ Panel admin protegido con autenticación
- ✅ Variables de entorno validadas con Zod
- ✅ HTTPS automático con Traefik

## ⚡ Performance

- ISR con revalidación de 60 segundos
- Imágenes optimizadas con next/image
- Lazy loading con dynamic imports
- Fuentes optimizadas con next/font
- Metadata dinámica por página
- Bundle splitting automático

## 🌐 SEO

- Meta tags dinámicos en cada página
- Open Graph completo
- Twitter Card
- Sitemap automático en `/sitemap.xml`
- Robots.txt en `/robots.txt`
- Datos estructurados JSON-LD
- Canonical URLs

## 📝 Scripts Disponibles

```bash
npm run dev          # Iniciar desarrollo
npm run build        # Build para producción
npm run start        # Iniciar producción
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos TypeScript
```

## 🐛 Troubleshooting

### Error de conexión a PostgreSQL

Verifica que:
1. El servicio PostgreSQL está corriendo en Dokploy
2. La `DATABASE_URI` es correcta
3. El nombre del servicio coincide en la conexión

### El panel admin no carga

1. Verifica que `PAYLOAD_SECRET` tenga mínimo 32 caracteres
2. Revisa los logs en Dokploy
3. Asegúrate de que las migraciones corrieron correctamente

### Las imágenes no se muestran

1. Configura las variables de Cloudinary (opcional)
2. O usa el sistema de archivos local para desarrollo

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de usarlo como base para tu propio portafolio.

## 🤝 Contribuciones

Este es un proyecto personal, pero las sugerencias son bienvenidas.

---

Hecho con ❤️ usando Next.js y Payload CMS
