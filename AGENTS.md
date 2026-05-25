# AGENTS.md

## Configuración del Proyecto AltoQ.Tareas

### Stack Tecnológico
- **Framework**: Astro 6 (SSG/SSR híbrido)
- **UI Framework**: Preact
- **Estilos**: TailwindCSS 4 con variables CSS
- **Email**: Resend (SDK para envío de emails)
- **Deploy**: Vercel (serverless functions)
- **Gestor de paquetes**: **pnpm** (NO usar npm ni yarn)

### Reglas de operación

1. **NO ejecutar el servidor de desarrollo**
   - El usuario ejecutará `pnpm dev` por su cuenta
   - Si necesitas instalar algo, usa `pnpm add` o `pnpm install`
   - No ejecutes `pnpm dev` ni `pnpm preview` ni `pnpm build`

2. **Siempre usar pnpm**
   - Para instalar dependencias: `pnpm add <paquete>`
   - Para instalar como dev dependency: `pnpm add -D <paquete>`
   - Para ejecutar scripts: `pnpm <script>` (ej: `pnpm dev`)

3. **Estructura de carpetas relevante**
   - `src/layouts/` — Layouts Astro (BaseLayout)
   - `src/components/` — Componentes (Header, Footer, etc.)
   - `src/pages/` — Páginas Astro y API routes
   - `src/styles/` — Archivos CSS globales
   - `src/pages/api/` — Serverless functions (API routes)

### Paleta de colores (Design System)
- Primary (Trust Blue): `#0A2463`
- Accent (Energy Amber): `#E8A030`
- Surface (Crema): `#F8F6F1`
- Success: `#2D7D4F`
- Text: `#1C1C1E`
- Muted: `#6B7280`

### Variables de entorno necesarias (.env)
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
BUSINESS_EMAIL=laindots999@gmail.com
```

### Flujo de trabajo
1. Leer PLANNING.md para entender el plan completo
2. Crear/modificar archivos según el módulo actual
3. Informar al usuario qué archivos se crearon/modificaron
4. El usuario ejecuta `pnpm dev` para probar
5. El usuario no debe ejecutar el servidor por cuenta propia

### Notas importantes
- WhatsApp placeholder: `+51 999 999 999` (fake, cambiar cuando tenga el real)
- Email de negocio: `laindots999@gmail.com`
- Dominio: aún no registrado (usar placeholders en SEO)