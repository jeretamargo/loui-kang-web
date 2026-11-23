# Loui Kang

Sitio web de una sola página para Loui Kang que reúne su biografía, lanzamientos musicales, fotografías y redes sociales. Desarrollado con Next.js, React, TypeScript y Tailwind CSS, con una identidad visual oscura y una sección principal con video de fondo.

## Primeros pasos

Se requiere npm y una versión LTS de Node.js con soporte vigente que cumpla el requisito mínimo de Next.js: **20.9.0**.

Desde la raíz del repositorio:

```bash
npm ci
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

La aplicación actual no requiere variables de entorno, claves de API, base de datos ni CMS. Los lanzamientos y los enlaces se mantienen en `app/data/`; la biografía se edita en su componente.

## Secciones del sitio

| Sección | Contenido |
| --- | --- |
| Hero | Video de fondo en bucle, nombre del artista y fotografía de respaldo. |
| Bio | Biografía del artista y galería de fotografías con miniaturas, sin avance automático. |
| Music | Selección de lanzamientos con reproductor de Spotify y enlaces a Spotify y YouTube Music. |
| Social | Publicación de Instagram y video de YouTube integrados, con enlaces a los perfiles. |
| Navegación y pie de página | Enlaces a las secciones, menú móvil y accesos a plataformas musicales y redes sociales. |

Los lanzamientos destacados actualmente son **No estoy cuerdo**, **Noches sin Dormir** y **#23**. Los textos del sitio están principalmente en español.

## Comandos de desarrollo

| Comando | Función |
| --- | --- |
| `npm run dev` | Iniciar el servidor de desarrollo. |
| `npm run lint` | Ejecutar ESLint. |
| `npm test` | Verificar datos, renderizado y contratos del rediseño con el runner de Node.js. |
| `npx tsc --noEmit --incremental false` | Verificar los tipos de TypeScript sin generar archivos ni actualizar la caché incremental. |
| `npm run build` | Compilar la aplicación para producción. |
| `npm run start` | Servir una compilación de producción existente. |

Para probar la versión de producción en el entorno local:

```bash
npm run build
npm run start
```

Las pruebas automatizadas usan dependencias ya instaladas, sin servicios externos. No reemplazan las verificaciones manuales de los embeds y del diseño responsive descritas más abajo.

## Estructura del proyecto

```text
app/
├── layout.tsx             # Layout principal, fuentes y metadatos
├── page.tsx               # Composición de la página y estado de navegación
├── globals.css            # Entrada de Tailwind y estilos del carrusel y loader
├── data/
│   ├── releases.ts         # Lanzamientos, metadatos, URLs y último lanzamiento
│   └── links.ts            # Perfiles del artista y contenidos de Social
├── components/
│   ├── Hero.tsx           # Ciclo de carga del video y fotografía de respaldo
│   ├── Loader.tsx         # Indicador de carga del video, no bloqueante
│   ├── Navbar.tsx         # Navegación fija y respuesta a la visibilidad del hero
│   ├── BurguerMenu.tsx    # Menú de navegación móvil superpuesto
│   ├── Bio.tsx            # Contenido de la biografía
│   ├── Carousel.tsx       # Galería con selección por miniaturas
│   ├── PlatformButton.tsx # CTA compartido por Music y Social
│   ├── SectionHeading.tsx # Encabezado numerado de sección
│   ├── Music.tsx          # Selección de lanzamientos y enlaces musicales
│   ├── Social.tsx         # Contenido de Instagram y YouTube
│   ├── Footer.tsx         # Identidad del artista y enlaces a plataformas
│   └── icons/             # Iconos SVG como componentes de React
└── hooks/
    └── useScreen.tsx      # Seguimiento del ancho de la ventana en el cliente
public/
├── images/                # Fotografías del artista en formato WebP
├── videos/hero.webm        # Video de fondo del hero
└── svg/                   # Recursos SVG
```

### Tecnologías principales

- **Next.js 16.2.2**, con App Router, y **React 19.2.4**.
- **TypeScript 5**, con verificación estricta de tipos.
- **Tailwind CSS 4**, integrado mediante PostCSS.
- Galería con estado local de React y **next/image**; Embla permanece instalado, pero no se usa en la galería actual.
- **react-social-media-embed**, para integrar Instagram mediante renderizado en el cliente.
- **next/font/google**, para las fuentes tipográficas configuradas.

## Actualización del contenido

| Cambio | Dónde editar |
| --- | --- |
| Biografía del artista | `app/components/Bio.tsx` |
| Carrusel de fotografías | Archivos en `public/images/` y diapositivas en `app/components/Carousel.tsx` |
| Títulos, tipo, año, videoclip y URL de los lanzamientos | `app/data/releases.ts`; el primer objeto es `latestRelease` y se muestra en Hero y Music |
| Publicación de Instagram y video de YouTube | `socialContent` en `app/data/links.ts` |
| Enlaces a perfiles del artista | `artistLinks` en `app/data/links.ts`; el header conserva sus enlaces originales por restricción del rediseño |
| Colores, fuentes y espaciados compartidos | Tokens `@theme` y estilos en `app/globals.css` |
| Título y descripción de la página | `metadata` en `app/layout.tsx` |
| Video del hero | `public/videos/hero.webm` y su fuente en `app/components/Hero.tsx` |
| Fotografía de respaldo del hero | Rutas del fondo y de `poster` en `app/components/Hero.tsx` |

El hero reutiliza `public/images/slide3.webp` como respaldo. Reemplazar esa imagen también modifica su diapositiva en el carrusel. Es importante considerar ambos usos o configurar una imagen independiente para el hero.

Tipo, año, videoclip del último lanzamiento y orden real siguen pendientes de confirmación en los TODO de `releases.ts`. La UI omite los datos faltantes. Al agregar lanzamientos, el selector crea filas de hasta tres columnas.

## Funcionamiento de la carga del hero

El video es una mejora visual, no un requisito para acceder al sitio. La navegación y el contenido permanecen disponibles durante la carga.

| Estado | Comportamiento |
| --- | --- |
| Cargando | Se muestran la fotografía de respaldo, el nombre del artista y un indicador de carga dentro del hero. |
| Listo | Se muestra el video y se retira el indicador al recibir `loadeddata` o `canplay`. |
| Error o espera agotada | Se mantiene la fotografía y se retira el indicador. El resto del sitio sigue disponible. |

- El límite de espera es de **6 segundos**, configurado mediante `VIDEO_WAIT_LIMIT_MS` en `Hero.tsx`, y comienza cuando se ejecuta su efecto en el cliente.
- Alcanzar el límite no cancela la solicitud del video. Si queda listo más tarde, todavía puede mostrarse.
- Se comprueban el estado inicial de carga y los errores para contemplar eventos ocurridos antes de registrar los listeners.
- Los temporizadores, listeners y el cuadro de animación programado se limpian al desmontar el componente.
- Si JavaScript está desactivado, la fotografía permanece visible y el indicador se oculta.
- El indicador incluye texto de estado para lectores de pantalla. La preferencia de movimiento reducido desactiva su animación y las transiciones de opacidad del video; no desactiva la reproducción automática del video.

## Verificación manual

Antes de publicar cambios:

- Confirmar que el video se reproduce normalmente y que el indicador desaparece.
- Bloquear `/videos/hero.webm` desde las herramientas de desarrollo del navegador: la fotografía debe mantenerse, el indicador debe desaparecer y la navegación debe funcionar.
- Demorar la solicitud del video más de 6 segundos: el indicador debe desaparecer y una carga exitosa posterior debe permitir mostrar el video.
- Desactivar JavaScript: la fotografía y el contenido estático deben permanecer visibles sin el indicador. Las funciones interactivas y los contenidos integrados que dependen del cliente no estarán disponibles.
- Revisar la navegación en escritorio y móvil, los controles del carrusel, el cambio de lanzamiento y los enlaces externos.
- Activar la preferencia de movimiento reducido y confirmar que el indicador deja de girar.

## Servicios externos y despliegue

El contenido de Spotify, YouTube e Instagram depende de esos proveedores. Las restricciones de red, la configuración de privacidad, las extensiones del navegador o la disponibilidad del proveedor pueden impedir la carga de los contenidos integrados.

`next/font/google` descarga las fuentes de Google durante la compilación y Next.js las sirve después desde la propia aplicación. La instalación de dependencias y la descarga de fuentes requieren acceso a la red.

El sitio se puede desplegar en un alojamiento compatible con Next.js, utilizando `npm run build` como comando de compilación. Para un despliegue con Node.js, ejecutar `npm run start` después de compilar correctamente. Los archivos de `public/` deben estar disponibles para servir el video, la fotografía de respaldo y las imágenes del carrusel.
