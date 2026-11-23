# Rediseño visual — guía de implementación

Spec para aplicar el rediseño aprobado sobre el código actual. Es un **refactor visual**: no cambia la estructura de la página, el contenido del artista ni los enlaces existentes.

Referencias en esta carpeta:

- `mockups/Main.dc.html`: mockup desktop, la fuente de verdad para valores exactos (colores, tamaños, espaciados). Es HTML con estilos inline. Las imágenes apuntan a `/_blob/...`, que no resuelven fuera del canvas: corresponden a `public/images/slide1..4.webp` (ver tabla al final).
- `mockups/Plan.dc.html`: plan por secciones, prioridades y orden.
- `mockups/Mobile.dc.html`: el mismo mockup a 390 px. Importa `Main.dc.html` y no agrega nada nuevo.
- `mockups/canvas.json`: índice del canvas, solo como referencia.

> Este repo usa una versión de Next.js con cambios. Antes de tocar código, leer `AGENTS.md` y la guía relevante en `node_modules/next/dist/docs/`.

---

## 0. Reglas que no se rompen

1. **El header no se toca.** `app/components/Navbar.tsx` y `app/components/BurguerMenu.tsx` quedan exactamente como están, incluido su fondo `bg-[#0F1115]/90` (no pasa al negro nuevo), sus íconos, alturas (`h-25 md:h-36`) y la lógica `isHeroVisible`.
2. **Los embeds se mantienen.** El embed de Spotify (iframe, con `theme=0`), el `InstagramEmbed` de `react-social-media-embed` y el iframe de YouTube siguen siendo los mismos. No hay API key de Spotify: no se arma un reproductor propio.
3. **Los botones de selección de lanzamiento en Music no cambian.** El grupo `role="group"` y las clases de cada botón quedan igual.
4. **El video del hero conserva su color.** El poster (`/images/slide3.webp`) se ve hasta que carga el video: no aplicarle filtros (ni blanco y negro ni desaturado) para que no haya salto al arrancar el video.
5. No inventar contenido. Lo que falta está en la sección 9 y queda como TODO visible en el código.
6. Hay cambios sin commitear en `app/components/Music.tsx` en la rama `fix/loader`. Integrarlos, no pisarlos.

---

## 0.1 Mantenibilidad: una sola fuente para colores y lanzamientos

Objetivo: cambiar un color, agregar un lanzamiento o cambiar cuál es el último tiene que ser **editar un solo archivo**, sin tocar componentes.

### Colores → `app/globals.css`

- Todos los colores del sitio se definen **una sola vez** como tokens en el bloque `@theme` de `app/globals.css` (sección 1).
- Los componentes usan solo los tokens (`bg-ink`, `text-cream`, `bg-accent`, `text-accent-light`, `border-cream/15`, etc.). **Nada de hex sueltos** (`#F2ECE2`, `#0F1115`, `rgba(…)`) en los componentes nuevos o refactorizados.
- Los colores con alfa se escriben con modificador de opacidad sobre el token (`bg-ink/75`, `border-cream/20`). Los degradados del hero se arman con variables CSS (`var(--color-ink)`, `var(--color-accent)`) dentro de `globals.css` o con utilidades de Tailwind, no con valores escritos a mano.
- Cambiar el violeta, por ejemplo, tiene que ser cambiar `--color-accent` y `--color-accent-light` y nada más.
- **Excepción:** `Navbar.tsx` y `BurguerMenu.tsx` mantienen sus valores actuales y no se migran a tokens. Si en el futuro se quiere, se hace aparte.

### Lanzamientos → `app/data/releases.ts`

Archivo nuevo, tipado, que es la **única** fuente de contenido musical. Ni `Hero.tsx` ni `Music.tsx` tienen títulos, URLs o textos de lanzamientos escritos adentro.

```ts
// app/data/releases.ts
export type ReleaseType = "single" | "ep" | "album";

export type Release = {
  id: string;            // estable, para keys y estado: "no-estoy-cuerdo"
  title: string;         // como se escribe normalmente; el componente lo pasa a mayúsculas
  type?: ReleaseType;    // opcional mientras no esté confirmado: la UI omite lo que falte
  year?: number;
  releaseDate?: string;  // ISO "AAAA-MM-DD", opcional: si existe, define el orden
  spotifyUrl: string;
  ytMusicUrl: string;
  spotifyEmbedUrl: string; // con ?theme=0
  videoUrl?: string;     // videoclip, para "Ver videoclip" del hero
};

// Ordenado del más nuevo al más viejo. El primero es el ÚLTIMO lanzamiento.
export const releases: Release[] = [
  {
    id: "no-estoy-cuerdo",
    title: "No estoy cuerdo",
    // type: TODO confirmar (el link de Spotify es de un álbum)
    // year: TODO confirmar
    spotifyUrl: "https://open.spotify.com/album/5tIGtrLRUXD2jkHBH7YcqG?si=EKoMj_gYQtCS2Oexj6pMew",
    ytMusicUrl: "https://music.youtube.com/playlist?list=OLAK5uy_mLvUO8Zr0Q92n2FGQUouhLpiLbo1zw5X4",
    spotifyEmbedUrl: "https://open.spotify.com/embed/album/5tIGtrLRUXD2jkHBH7YcqG?utm_source=generator&theme=0",
  },
  // "Noches sin dormir" y "#23": mover aquí las URLs que hoy están en Music.tsx
];

export const latestRelease = releases[0];

export const releaseTypeLabel: Record<ReleaseType, string> = {
  single: "Single",
  ep: "EP",
  album: "Álbum",
};
```

Reglas:

- **Agregar un lanzamiento** = agregar un objeto **al principio** del array. Automáticamente pasa a ser el último: aparece en el hero, queda primero en los botones de Music y seleccionado por defecto.
- **El último lanzamiento** se define en un solo lugar (`latestRelease`). Si se prefiere no depender del orden, se puede usar un campo `featured: true` o ordenar por `releaseDate`. Elegir uno de los dos criterios y documentarlo en un comentario arriba del array.
- Los botones de Music salen de `releases.map(...)`. Hoy son 3 y la grilla es de 3 columnas: si la cantidad cambia, la grilla tiene que adaptarse (`grid-cols-3` → columnas según `releases.length`, o mostrar solo los últimos N y documentarlo).
- No hay `enum Items` ni constantes `NEC_*`/`NSD_*`/`DOSTRES_*`: se eliminan.
- Los links fijos del artista (perfil de Instagram, canal de YouTube, artista en Spotify, canal de YouTube Music) van en `app/data/links.ts`, y los usan Social y Footer. El header no se toca y conserva los suyos.

---

## 1. Tokens

### Colores

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#0A0A0A` | Fondo general (reemplaza `#0F1115` en todo **excepto el header**) |
| `ink-2` | `#111111` | Fondo de la sección Music |
| `surface` | `#161616` | Tarjetas y marcos de embeds |
| `cream` | `#F2ECE2` | Texto principal (ya existe) |
| `muted` | `#A9A49B` | Etiquetas y texto secundario |
| `muted-2` | `#C9C3B9` | Párrafos largos |
| `meta` | `#8E897F` | Línea de metadatos de Music |
| `accent` | `#54457F` | Violeta apagado: fondo de los CTA. Texto crema encima. |
| `accent-light` | `#B3A6D9` | Violeta claro para texto de acento sobre negro (números 01/02/03, palabra destacada de la bio, borde de la miniatura activa) |
| líneas | `rgba(242,236,226,0.08–0.3)` | Divisores y bordes (`cream` con alfa) |

`accent` como texto chico sobre negro no tiene contraste suficiente. Para texto se usa siempre `accent-light`.

Implementación sugerida (Tailwind v4, en `app/globals.css`):

```css
@theme {
  --color-ink: #0A0A0A;
  --color-ink-2: #111111;
  --color-surface: #161616;
  --color-cream: #F2ECE2;
  --color-muted: #A9A49B;
  --color-muted-2: #C9C3B9;
  --color-meta: #8E897F;
  --color-accent: #54457F;
  --color-accent-light: #B3A6D9;
}
```

En `app/layout.tsx`, cambiar `bg-[#0F1115]` por `bg-ink`.

### Tipografía

- Títulos: **Syncopate 700** (ya se usa). Texto: **Inter** 400/500/600/700.
- Hoy cada componente crea su propia instancia de `Syncopate` con `variable: "--font-kanit"` (nombre engañoso). Recomendado: cargar Syncopate una sola vez en `layout.tsx` con `variable: "--font-syncopate"` y exponerla como `--font-display` en `@theme`. Agregar los pesos 500 y 600 a Inter. **No modificar los imports de `Navbar.tsx`.**

| Rol | Estilo |
|---|---|
| H1 hero | Syncopate 700, `clamp(44px, 10.5vw, 156px)`, line-height 0.92, tracking -0.02em |
| H2 sección | Syncopate 700, `clamp(34px, 5vw, 64px)`, line-height 1 |
| Título de lanzamiento | Syncopate 700, `clamp(30px, 4vw, 54px)`, **mayúsculas** |
| Frase destacada (bio) | Inter 600, `clamp(26px, 2.7vw, 40px)`, line-height 1.18 |
| Cuerpo | Inter 400, 18px, line-height 1.7, máx. 60ch, color `muted-2` |
| Etiqueta | Inter 600, 12–13px, mayúsculas, tracking 0.2em, color `muted` |

### Layout

- Contenedor: `max-width: 1280px`, centrado, padding lateral `clamp(16px, 4vw, 48px)`. Igual en todas las secciones.
- Padding vertical de sección: `clamp(80px, 10vw, 140px)`.
- Encabezado de sección (Bio, Music, Social), una fila: número en Syncopate 14px `accent-light` + línea 48×1px `cream/30` + H2. Separación inferior `clamp(40px, 5vw, 64px)`. Siempre alineado a la izquierda (hoy cada sección se alinea distinto).

### Botón CTA de plataforma (componente nuevo)

Se usa en Music y Social, **todos con el mismo peso visual**:

- Fondo `accent`, texto `cream`, Inter 700 18px.
- `min-height: 72px`, `border-radius: 999px`, padding horizontal 28px, gap 14px, ícono de 28–30px.
- Sombra `0 12px 32px rgba(0,0,0,0.35)`.
- En grupo: `grid` con `repeat(auto-fit, minmax(200px, 1fr))` y gap 14px, para que los dos tengan el mismo ancho.
- Hover sugerido: aclarar el fondo con `accent` un 10% más claro o `brightness-110`, y `transition` respetando `motion-reduce`.
- `target="_blank"` siempre con `rel="noopener noreferrer"`.

Conviene crearlo como `app/components/PlatformButton.tsx` (props: `href`, `icon`, `label`).

---

## 2. Hero — `app/components/Hero.tsx`

Se mantiene toda la lógica del video (`videoStatus`, timeout, listeners, poster, `aria-hidden`). Cambia solo la capa visual:

- **Contenido abajo a la izquierda** (en vez del H1 centrado con `translate-y-40`), dentro del contenedor de 1280px, en este orden:
  1. Etiqueta: punto de 8px `accent` + "Nuevo {releaseTypeLabel[latestRelease.type]}" (13px, 600, mayúsculas, tracking 0.2em). Si `type` no está definido, mostrar solo "Nuevo lanzamiento".
  2. H1 "LOUI KANG" con el estilo de la tabla.
  3. Fila con wrap: a la izquierda el texto "“{latestRelease.title}” ya está disponible en todas las plataformas." (17–20px, `cream` con opacidad ~85%, máx. 440px); a la derecha dos botones, "Escuchar ahora" (pill `accent` con ícono play, `min-height` 52px, enlaza a `#music`) y "Ver videoclip" (pill con borde `cream/40`, enlaza a `latestRelease.videoUrl`; **si no hay `videoUrl`, el botón no se muestra**).
  - **Todo el contenido del último lanzamiento sale de `latestRelease`** (`app/data/releases.ts`). En `Hero.tsx` no hay ningún título ni link escrito a mano.
  4. Fila inferior con borde superior `cream/15`: "Ushuaia — Tierra del Fuego" a la izquierda y "Scroll ↓" a la derecha (12px, mayúsculas, `muted`).
- **Scrim**: reemplazar el fade inferior `h-32` por un degradado vertical en toda la altura: `rgba(10,10,10,.45) 0%` → `rgba(10,10,10,.1) 35%` → `rgba(10,10,10,.75) 72%` → `#0A0A0A 100%`.
- **Brillo violeta** detrás del texto: un div absoluto `aria-hidden` con `radial-gradient(closest-side, rgba(84,69,127,.45), transparent)` ubicado abajo a la izquierda (left -10%, right 30%, bottom -20%, alto 70%).
- Alto del hero: `min-height: clamp(640px, 60vw, 880px)`. El video y el poster siguen cubriendo todo con `object-cover`.
- El `Loader` hoy va en `bottom-12` y quedaría tapado por el contenido nuevo. Moverlo al centro vertical del hero (o arriba a la derecha bajo el header). Mantener el texto accesible "Cargando video de fondo…".
- Mantener `id="hero"`: el header enlaza a `#hero`.

## 3. Bio — `app/components/Bio.tsx` y `app/components/Carousel.tsx`

- Dos columnas con wrap (`flex-wrap`, imágenes `flex: 1 1 380px`, texto `flex: 1 1 440px`, gap `clamp(32px, 6vw, 88px)`). En mobile se apilan.
- **Galería**: imagen principal 4:5, radio 6px. Debajo, 4 miniaturas cuadradas en grilla de 4 columnas (gap 10px). La activa tiene opacidad 1 y borde 1px `accent-light`; las demás, opacidad 0.55. Se puede seguir usando Embla (con un carrusel de miniaturas sincronizado) o pasar a estado simple. **Quitar las flechas.** El autoplay es opcional: si se mantiene, debe pausarse al interactuar y respetar `prefers-reduced-motion`.
- Las miniaturas son `<button>` con `aria-label="Ver foto N"`.
- Los `alt` deben ser descriptivos (hoy todas son "loui kang"). Sugeridos: slide1 "Loui Kang bajo un puente, remera negra"; slide2 "Loui Kang frente a una torre de alta tensión"; slide3 "Loui Kang de noche, con capucha"; slide4 "Loui Kang grabando en el estudio".
- **Texto**, en este orden:
  1. Frase destacada: "Desde Ushuaia, donde el aislamiento y el frío moldean su <span accent-light>identidad sonora</span>."
  2. Párrafo: "José Luis Kang Vanni —“Loui Kang”— nació en Asunción del Paraguay el 1 de agosto de 2001. Su música cruza emoción cruda, noches intensas y una narrativa de caída y superación constante."
  3. Párrafo: "Entre lo íntimo y lo explosivo, construye un universo donde el caos y las experiencias personales siempre empujan hacia adelante."
- **No hay tabla de datos** (origen, base, nacimiento, género). Fue descartada.
- Un solo H2 (hoy hay dos, uno por breakpoint): usar el encabezado de sección "01 — BIO".

## 4. Music — `app/components/Music.tsx`

- Fondo de la sección `ink-2`. Encabezado "02 — MUSIC".
- Refactor de datos: las constantes sueltas y los ternarios anidados se reemplazan por `releases` de `app/data/releases.ts` (sección 0.1). Las URLs actuales se mudan ahí tal cual. El estado guarda el `id` seleccionado y arranca en `latestRelease.id`.
- Dos columnas con wrap (info `flex: 1 1 460px`, embed `flex: 1 1 420px`, `align-items: center`).
- **Columna izquierda**, en orden:
  1. El grupo de botones de lanzamiento, **sin cambios**.
  2. Línea de metadatos **discreta**: `Lanzamiento · {releaseTypeLabel[type]} · {year}`, 12px, peso 400, tracking 0.14em, mayúsculas, color `meta`. Si falta `type` o `year`, se omite esa parte junto con su separador. *Pendiente 9.1.*
  3. Título del lanzamiento en Syncopate, **todo en mayúsculas** (`uppercase`), margen inferior 40px.
  4. Etiqueta "Escuchalo en".
  5. Dos `PlatformButton` iguales: Spotify y YouTube Music (máx. 560px de ancho para el grupo).
- **Se eliminan**: la cita (`NEC_DESC`/`NSD_DESC`/`DOSTRES_DESC` y el texto `"…" - Loui Kang`), el texto "Escuchá {título}" y los íconos sueltos con etiqueta debajo.
- **Columna derecha**: el iframe de Spotify actual dentro de un marco con `border-radius: 12px` y sombra `0 24px 60px rgba(0,0,0,.35)`, `width: 100%` y alto 352px. Reemplazar `useScreen()` por CSS responsive. Debajo, una nota de 12px `muted`: "Reproductor oficial de Spotify."
- Mantener el spinner mientras carga el iframe, pero que ocupe el mismo alto que el embed para que no salte el layout.

## 5. Social — `app/components/Social.tsx`

- Encabezado "03 — SOCIAL".
- Layout con wrap y gap 24px:
  - **Izquierda** (`flex: 2 1 520px`, columna con gap 24px):
    - Tarjeta YouTube: marco `surface`, borde `cream/8`, radio 12px, padding 12px. Cabecera con ícono de YouTube, "YouTube" (12px, mayúsculas, tracking 0.18em), "· Último video" en `muted` y, a la derecha, el enlace "Abrir ↗" al video. Debajo, el iframe actual con `aspect-ratio: 16/9`, `width: 100%` y radio 8px. Quitar los anchos fijos 350/800 y `useScreen`.
    - Bloque "SEGUÍ A LOUI KANG": borde `cream/12`, radio 12px. Título en Syncopate `clamp(20px, 2.2vw, 28px)`, subtítulo "Lanzamientos, videos y lo que pasa en el estudio." y dos `PlatformButton` iguales: Instagram (`https://www.instagram.com/louikang_/`) y YouTube (`https://www.youtube.com/@LouiKng`). Reemplaza al bloque actual "Sigue a Loui Kang".
  - **Derecha** (`flex: 1 1 340px`): tarjeta Instagram con el mismo marco y cabecera (ícono, "Instagram", "· Último post", "Abrir ↗" al post). Dentro va el `InstagramEmbed` actual. El embed es blanco y eso está bien: el marco oscuro lo integra.
- **No hay bloque de contacto/booking.** Queda fuera de esta etapa.

## 6. Footer — `app/components/Footer.tsx`

- Sin fondo `bg-white/10`. Borde superior `cream/12` y contenedor de 1280px, padding `48px … 32px`.
- Fila con wrap y `space-between`:
  - "LOUI KANG" en Syncopate 20px + "Ushuaia, Tierra del Fuego" (14px, `muted`).
  - Navegación: Inicio (`#hero`), Bio, Music, Social (14px, `cream`).
  - Redes como texto (14px, `muted`): YouTube Music, Spotify, Instagram, YouTube, con las URLs actuales del footer.
- Abajo, con borde `cream/8`: "© 2026 Loui Kang. Todos los derechos reservados." (13px, `muted`).
- Se quitan los íconos grandes (ya están en el header).

## 7. Movimiento e interacción

- Fade-up de 400ms (opacidad 0→1, translateY 16px→0) al entrar cada sección en pantalla, con `IntersectionObserver` o CSS `@starting-style`/`animation-timeline` si la versión lo soporta.
- Hover en CTAs y miniaturas; `focus-visible` con outline `cream`.
- Todo con `motion-reduce:` desactivado.

## 8. Mobile

- Probar cada sección a 390px de ancho (ver `mockups/Mobile.dc.html`).
- Hero: H1 a 44px y los CTA hacen wrap debajo del texto.
- Bio, Music y Social se apilan. Los dos `PlatformButton` pasan a una columna cuando no entran a 200px cada uno.
- El header y el `BurguerMenu` no cambian.

---

## 9. Pendientes de contenido

No inventar estos datos: dejarlos como `// TODO` y con texto entre corchetes visible.

Todos se completan en `app/data/releases.ts`; ningún componente cambia cuando lleguen.

1. **Tipo y año de cada lanzamiento** (`type`, `year`). Hoy el embed de "No estoy cuerdo" y el de "#23" son `album`, y el de "Noches sin dormir" es `track`. Confirmar si son álbum, EP o single, y el año.
2. **Videoclip** (`videoUrl`) del último lanzamiento, para "Ver videoclip" del hero. Confirmar si es el mismo video del embed de Social (`bugNrXoYDjI`).
3. **Orden de los lanzamientos**: confirmar cuál es el más reciente. Se asume "No estoy cuerdo" (es el que hoy aparece seleccionado por defecto).

## 10. Orden de implementación

1. Tokens y fuentes (`globals.css`, `layout.tsx`), y datos (`app/data/releases.ts`, `app/data/links.ts`).
2. Hero.
3. Music (más `PlatformButton`).
4. Bio (galería con miniaturas).
5. Social.
6. Footer, mobile y animaciones.

Un commit por paso. Verificar con `npm run lint` y `npm run build`, y revisar visualmente en `npm run dev` contra el mockup a 1440px y 390px.

## Criterios de aceptación

- [ ] `Navbar.tsx` y `BurguerMenu.tsx` sin diffs.
- [ ] Ningún color hex o `rgba()` escrito en componentes fuera del header: todo sale de los tokens de `globals.css`.
- [ ] Cambiar `--color-accent` en `globals.css` cambia todos los CTA y acentos del sitio.
- [ ] Ningún título, texto o URL de lanzamiento escrito en `Hero.tsx` o `Music.tsx`: todo sale de `app/data/releases.ts`.
- [ ] Agregar un objeto al principio de `releases` lo muestra en el hero y como primer botón en Music, sin tocar componentes.
- [ ] Encabezados de sección con el formato "0N — NOMBRE" y la misma alineación.
- [ ] Botones de lanzamiento idénticos a los actuales.
- [ ] Todos los CTA de plataforma con el mismo estilo y tamaño.
- [ ] Embeds de Spotify, Instagram y YouTube funcionando, sin anchos fijos por JS.
- [ ] Sin cita en Music, sin tabla en Bio, sin bloque de contacto.
- [ ] El poster del hero sin filtros de color.
- [ ] Sin scroll horizontal a 390px.
- [ ] `npm run build` sin errores.

### Imágenes del mockup → repo

| En el mockup | Archivo |
|---|---|
| `/_blob/34f1551c7db65e29f187c3c3b1e9405f` | `public/images/slide1.webp` |
| `/_blob/929d1db2f351bff7e6832ed7cade0be0` | `public/images/slide2.webp` |
| `/_blob/6622a836a1f4aeade97aff77d25718e9` | `public/images/slide3.webp` |
| `/_blob/827d8e5e33aa3150a30bf5bc732749b8` | `public/images/slide4.webp` |
