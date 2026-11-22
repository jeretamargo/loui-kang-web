# Seguimiento de implementación

La fuente de verdad es `REDESIGN.md`. Se conserva el header y se implementan los seis pasos en la rama `fix/loader`, con lint y build antes de cada commit.

## Restricciones y diferencias detectadas

- **Selector de lanzamientos:** la exigencia de clases literalmente idénticas entra en conflicto con la prohibición de colores hex en componentes. Se conservará su apariencia, estados y medidas de control, migrando únicamente los nombres de color a tokens. `selector-ink` conserva el tono oscuro original del texto seleccionado; no se sustituye por el nuevo fondo general.
- **Ubicación del selector:** el diff pendiente al iniciar alinea el grupo al 45% del reproductor anterior. La sección 4 exige moverlo a la columna izquierda. Se conservarán sus ajustes de padding y se mantendrá el reproductor sin compresión; el ancho relativo del grupo deberá adaptarse a su nueva columna. Esta incompatibilidad de ubicación queda registrada, no se restaura el layout anterior.
- **Cantidad de lanzamientos:** el selector muestra todo el array, hasta tres columnas por fila. Al agregar un cuarto lanzamiento se crea una fila adicional, sin cambiar componentes.
- **Galería:** se elige estado local simple, opción permitida por la spec. No hay autoplay ni flechas; las cuatro miniaturas cambian la imagen sin movimiento automático.
- **Contenido pendiente:** tipo y año de cada lanzamiento, videoclip del último y orden real quedan como TODO entre corchetes en `app/data/releases.ts`. La UI omitirá metadatos y enlaces no confirmados. No se inferirá que el video de Social corresponde al último lanzamiento.
- **Mockups:** `support.js` y el runtime del canvas no están incluidos. Los HTML con valores y expresiones `{{…}}` son la referencia de estilos; su ejecución directa no es una página funcional. La comparación se hará contra los valores inline y una vista de referencia preparada solo para verificación, sin copiar su estructura a la aplicación.
- **URLs de YouTube:** el `&amp;` escrito dentro del string JSX original se normaliza a `&` para conservar el parámetro `start=6` real, manteniendo el mismo video.
- **Fuentes del header:** sus instancias locales de Inter/Syncopate no se modifican. El resto del rediseño usará las fuentes del layout.
- **SVG compartidos:** sus colores crema se referencian por variable CSS, sin cambiar geometría ni color renderizado. Los archivos `Navbar.tsx` y `BurguerMenu.tsx` permanecen intactos.
- **Carga inicial de Spotify:** se conserva el estado inicial visible del código anterior. Ocultarlo hasta `onLoad` podía perder el evento antes de hidratar y dejarlo tapado. El spinner se activa al cambiar de lanzamiento, reserva 352 px y tiene fallback sin JavaScript.
- **Servidor de desarrollo:** se intentó iniciar `npm run dev` en otro puerto, pero Next detectó el servidor ya activo de este repositorio (puerto 3000). Se reutiliza ese proceso sin detenerlo.
- **Referencias frente a contenido real:** se conserva el header de 100/144 px aunque el HTML de referencia use otra altura. Se mantiene el iframe real de Spotify, no su simulación del mockup. Instagram muestra el post existente, no la fotografía ilustrativa del canvas. El footer conserva las cuatro plataformas que exige la spec, aunque el mockup ilustre tres.

## Orden y evidencia

| Paso | Alcance | Verificación |
| --- | --- | --- |
| 1 | Tokens, fuentes y datos tipados | `npm test` (4 pruebas), lint sin errores y build correcto; warning previo de Carousel pendiente del paso 4. |
| 2 | Hero y loader | Lint sin errores y build correcto; efecto del video conservado, poster sin filtros, videoclip ausente mientras no se confirme. |
| 3 | Music y CTA compartidos | 6 pruebas de datos/renderizado, lint sin errores y build correcto. Nuevo lanzamiento de prueba aparece en Hero y primer selector sin editar componentes. |
| 4 | Bio y miniaturas | 7 pruebas, lint sin warnings y build correcto. Un H2, cuatro miniaturas y textos de la spec; sin tabla ni flechas. |
| 5 | Social con embeds originales | 7 pruebas, lint sin warnings y build correcto. Se conservan iframe YouTube e InstagramEmbed, con URLs en datos y sin useScreen. Proveedores reales comprobados al cierre. |
| 6 | Footer, mobile y movimiento | 13 pruebas de Node, lint y build. 13 comprobaciones en Chromium sobre el servidor dev, incluidas referencias a 1440/390, movimiento reducido, sin JS y proveedores reales. |

Los archivos de la spec y los mockups ya estaban sin seguimiento al comenzar; no se incluyen automáticamente en los commits de implementación.

## Comparación final en desarrollo

Se verificó en `http://localhost:3000`, sin cambiar `allowedDevOrigins` ni detener el servidor del usuario. Se preparó una referencia estática a partir del HTML del mockup, resolviendo sus expresiones y rutas de imágenes únicamente en el harness de verificación; la aplicación no usa esa estructura.

| Valor | 390 px | 1440 px |
| --- | --- | --- |
| Alto del hero | 640 px | 864 px |
| Tamaño del H1 | 44 px | 151.2 px |
| Tamaño de H2 | 34 px | 64 px |
| Padding vertical de sección | 80 px | 140 px |
| Alto de CTA de plataforma | 72 px | 72 px |
| Scroll horizontal | No, también con proveedores reales | No |

- Los valores anteriores y la alineación de encabezados coinciden con la referencia renderizada del mockup.
- Se compararon 16 propiedades visuales de cada botón de lanzamiento con una captura del working tree inicial. Coinciden tamaños tipográficos, pesos, paddings, bordes, radios, colores y estados iniciales. Se normalizaron a sRGB las distintas serializaciones `lab()`/`oklab()` del build y del servidor dev; la apariencia coincide.
- Se probaron cambios de lanzamiento, estabilidad del marco de 352 px, selección de miniaturas, los cuatro CTA, menú original y fallback sin JavaScript.
- Cambiar los tokens de acento en el navegador actualiza los cuatro CTA, el CTA del hero y el brillo. Los textos claros usan el token independiente `accent-light`.
- Sin mocks de red: Spotify, YouTube e Instagram respondieron correctamente; Spotify mostró su lista de temas y 14 controles. Instagram cargó su iframe real. No se verificó reproducción completa de audio ni flujos de cuentas.
- La revisión independiente encontró una regresión inicial de Spotify sin JS; se corrigió y se añadió una prueba de regresión. El efecto original del video se preservó.

Las capturas y el harness de navegador se generaron en el directorio temporal de la sesión. Las pruebas persistentes son las de `npm test`; no se agregaron dependencias al proyecto. La validación visual se realizó en Chromium, no en Safari ni Firefox.

## Criterios de aceptación

- [x] Navbar y BurguerMenu sin diffs, comprobados también por hashes en las pruebas.
- [x] Ningún color hex/rgb escrito en componentes fuera del header; tokens en globals.css.
- [x] CTA y brillo consumen `accent`; numeración y textos claros consumen `accent-light`, según la paleta independiente de la spec.
- [x] Hero y Music leen títulos, textos y URLs musicales desde releases.ts.
- [x] Un nuevo objeto al principio aparece en Hero y como primer botón seleccionado de Music; probado con un cuarto lanzamiento sintético que no se incorpora al contenido real.
- [x] Encabezados numerados y alineados con el mockup.
- [x] Estilo visual de los botones preservado. **No se conservaron literalmente los nombres de clases de color ni el ancho relativo del grupo:** ver la incompatibilidad registrada arriba.
- [x] Todos los CTA de plataforma usan el mismo componente, estilo y alto.
- [x] Los tres embeds conservados y cargando contenido real, sin anchos calculados por JS.
- [x] Sin cita en Music, tabla en Bio ni bloque de contacto.
- [x] Poster del hero sin filtros de color; scrim y brillo en capas independientes.
- [x] Sin scroll horizontal a 390 px, también con embeds reales.
- [x] Build sin errores.
