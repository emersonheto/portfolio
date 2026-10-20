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
- **Deployment**: GitHub Actions → GHCR → Dokploy, con caché de Cloudflare

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

Cada push a `main` ejecuta `.github/workflows/deploy.yml`:

1. GitHub Actions construye la imagen con el `Dockerfile` y la publica en GHCR
   (`ghcr.io/emersonheto/portfolio:latest` y `:<commit>`), con el commit en `APP_VERSION`.
2. Llama al webhook de deploy de Dokploy. Dokploy encola el deploy, que puede tardar unos minutos en empezar.
3. Espera hasta 15 minutos a que `https://portfolio.certilab.app/api/version` devuelva el commit del push.
   Si no aparece, el job falla: revisar el deployment en Dokploy.
4. Purga la caché de Cloudflare de `/`, `/es` y `/pt`, que el edge guarda y un deploy de código no invalida.

### Secrets de GitHub

| Secret                   | Uso                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `DOKPLOY_DEPLOY_WEBHOOK` | Webhook de deploy de la aplicación en Dokploy (solo despliega esta app).             |
| `CLOUDFLARE_ZONE_ID`     | Zona `certilab.app`.                                                                 |
| `CLOUDFLARE_PURGE_TOKEN` | Token limitado a `Zone > Cache Purge` en esa zona. Sin él, el paso avisa y no purga. |

No usar una API key de Dokploy en GitHub: controla todo el servidor.

### Aplicación en Dokploy

- Tipo de origen: imagen Docker `ghcr.io/emersonheto/portfolio:latest`, con deploy automático activado
  (sin él, el webhook responde 400).
- Puerto `3000`. Las migraciones de Payload corren al iniciar (`scripts/start.sh`).
- Variables de entorno:

  ```env
  DATABASE_URI=postgresql://usuario:password@postgres-service:5432/portfolio_db
  PAYLOAD_SECRET=tu-clave-secreta-minimo-32-caracteres
  NEXT_PUBLIC_SITE_URL=https://portfolio.certilab.app
  NEXT_PUBLIC_SITE_NAME=Tu Nombre
  CLOUDFLARE_ZONE_ID=...        # purga al editar contenido en el CMS
  CLOUDFLARE_PURGE_TOKEN=...
  ```

- Dominio y HTTPS: se configuran en Dokploy (Traefik) con el DNS en Cloudflare.

### Primer Acceso al Admin

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
