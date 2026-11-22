# Seguimiento de implementación

La fuente de verdad es `REDESIGN.md`. Se conserva el header y se implementan los seis pasos en la rama `fix/loader`, con lint y build antes de cada commit.

## Restricciones y diferencias detectadas

- **Selector de lanzamientos:** la exigencia de clases literalmente idénticas entra en conflicto con la prohibición de colores hex en componentes. Se conservará su apariencia, estados y medidas de control, migrando únicamente los nombres de color a tokens. `selector-ink` conserva el tono oscuro original del texto seleccionado; no se sustituye por el nuevo fondo general.
- **Ubicación del selector:** el diff pendiente al iniciar alinea el grupo al 45% del reproductor anterior. La sección 4 exige moverlo a la columna izquierda. Se conservarán sus ajustes de padding y se mantendrá el reproductor sin compresión; el ancho relativo del grupo deberá adaptarse a su nueva columna. Esta incompatibilidad de ubicación queda registrada, no se restaura el layout anterior.
- **Contenido pendiente:** tipo y año de cada lanzamiento, videoclip del último y orden real quedan como TODO entre corchetes en `app/data/releases.ts`. La UI omitirá metadatos y enlaces no confirmados. No se inferirá que el video de Social corresponde al último lanzamiento.
- **Mockups:** `support.js` y el runtime del canvas no están incluidos. Los HTML con valores y expresiones `{{…}}` son la referencia de estilos; su ejecución directa no es una página funcional. La comparación se hará contra los valores inline y una vista de referencia preparada solo para verificación, sin copiar su estructura a la aplicación.
- **URLs de YouTube:** el `&amp;` escrito dentro del string JSX original se normaliza a `&` para conservar el parámetro `start=6` real, manteniendo el mismo video.
- **Fuentes del header:** sus instancias locales de Inter/Syncopate no se modifican. El resto del rediseño usará las fuentes del layout.
- **SVG compartidos:** sus colores crema se referencian por variable CSS, sin cambiar geometría ni color renderizado. Los archivos `Navbar.tsx` y `BurguerMenu.tsx` permanecen intactos.

## Orden y evidencia

| Paso | Alcance | Verificación |
| --- | --- | --- |
| 1 | Tokens, fuentes y datos tipados | `npm test` (4 pruebas), lint sin errores y build correcto; warning previo de Carousel pendiente del paso 4. |
| 2 | Hero y loader | Lint sin errores y build correcto; efecto del video conservado, poster sin filtros, videoclip ausente mientras no se confirme. |
| 3 | Music y CTA compartidos | Pendiente |
| 4 | Bio y miniaturas | Pendiente |
| 5 | Social con embeds originales | Pendiente |
| 6 | Footer, mobile y movimiento | Pendiente |

Los archivos de la spec y los mockups ya estaban sin seguimiento al comenzar; no se incluyen automáticamente en los commits de implementación.
