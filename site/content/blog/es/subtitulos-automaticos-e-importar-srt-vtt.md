---
title: "Crea subtítulos e importa archivos SRT o VTT"
description: "Transcribe una grabación, ajusta el estilo de los subtítulos e importa SRT o VTT sin reemplazar el texto actual sin confirmación."
slug: "subtitulos-automaticos-e-importar-srt-vtt"
lang: "es"
translationKey: "legendas-automaticas-e-importar-srt-vtt"
category: "tutoriales"
tags: ["Subtítulos", "Edición con IA", "Exportación"]
author: "Equipo Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 9
cover: "/blog/covers/legendas-automaticas-e-importar-srt-vtt.webp"
coverAlt: "Panel de transcripción y controles de subtítulos de Clipey"
ogImage: "/blog/og/legendas-automaticas-e-importar-srt-vtt.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 en Windows.

Para crear subtítulos e importar archivos SRT o VTT en Clipey, abre el panel de transcripción para procesar la voz localmente en el dispositivo o pulsa Importar subtítulos para cargar un archivo existente. El programa mapea las marcas de tiempo y el texto a la línea de tiempo, con soporte para saltos naturales y ajuste de ancho visual en caracteres CJK. Puedes personalizar colores, fuentes y colocación con vista previa en tiempo real antes de exportar el video.

## Crea o revisa la transcripción

1. Abre el proyecto y selecciona la grabación que contiene voz.
2. En el panel de transcripción, pulsa **Transcribir** si todavía no hay transcripción. Espera a que el modelo local termine el reconocimiento antes de corregir palabras o abrir los ajustes visuales.
3. Lee el texto y corrige nombres, cifras y términos técnicos. La transcripción se puede editar directamente: corregir los errores en el texto garantiza que los subtítulos y las funciones de edición con IA trabajen con el vocabulario correcto.
4. Abre la sección de **Subtítulos** desde el panel lateral para ver las opciones de presentación y estilo.

Con una transcripción generada, Clipey asocia palabras y tiempos y puede mostrar subtítulos sobre el video. Las opciones incluyen mostrarlos u ocultarlos, el estilo, la posición y las palabras por línea. Mantén abierta la vista previa al cambiar estos controles: un estilo legible en una escena puede tapar un elemento importante en otra.

## Importa un archivo SRT o VTT

Si ya tienes una pista de subtítulos, usa **Importar subtítulos** en el panel de transcripción y elige un archivo `.srt` o `.vtt`. Si el proyecto ya tiene transcripción, Clipey muestra el diálogo **¿Reemplazar transcripción?** advirtiendo del cambio; haz clic en **Reemplazar** para confirmar o **Cancelar** para conservar el texto actual. Si detecta un archivo de subtítulo con el mismo nombre en la carpeta, ofrece la opción **Importar archivo anexo**.

La importación toma los tiempos y el texto de los bloques para crear una transcripción. Es útil cuando otro proceso ya generó subtítulos: puedes reutilizarlos sin volver a reconocer el audio. Aun así, compara la sincronización al principio, en el medio y al final. Un archivo creado para otra versión del video puede empezar alineado y desfasarse después.

## Revisa los subtítulos

1. Reproduce el comienzo y comprueba que la primera línea aparezca en el momento correcto.
2. Salta al medio y a una parte cercana al final. Confirma que la sincronización se mantenga.
3. Revisa los bloques largos. Si el salto de línea separa mal una frase, edita el texto y las palabras por línea.
4. Comprueba nombres y puntuación. Los archivos importados conservan el texto original, que puede tener errores, líneas extensas o una capitalización distinta.
5. Exporta un fragmento corto y revisa el resultado antes de terminar un proyecto largo.

En chino, japonés y coreano, el ajuste de línea debe tener en cuenta que los ideogramas no se separan como palabras con espacios. El tratamiento de subtítulos de Clipey considera el ancho visual y los puntos de salto. Revisa frases que mezclen caracteres latinos y CJK, sobre todo junto a la puntuación. Evita cortes manuales que dejen un signo de apertura al final de línea o dividan una palabra latina.

## Consejos

- Usa la transcripción como texto editable. El estilo no corrige una palabra reconocida de forma incorrecta.
- Conserva el SRT o VTT original como referencia. Así podrás comparar texto y tiempos si no corresponden al video esperado.
- Si el video y los subtítulos proceden de ediciones distintas, corrige la sincronización antes de trabajar en la apariencia.
- Mantén líneas breves para que puedan leerse mientras avanza el video. Importa el ancho renderizado, no solo el número de caracteres.
- Comprueba los subtítulos sin sonido: el texto debe comunicar la voz sin depender de una palabra inaudible.

## Limitaciones

Clipey no verifica la exactitud del texto ni de las traducciones importadas. La importación reutiliza el texto y los tiempos existentes; no reconoce el audio. Diferencias de edición o duración pueden desincronizar la pista. El reconocimiento automático también puede equivocarse, así que revisa el resultado antes de exportar.

## Preguntas frecuentes

### ¿Qué formatos de subtítulos admite Clipey para importar?
Clipey permite importar archivos en formato SubRip (`.srt`) y WebVTT (`.vtt`), preservando las marcas de tiempo y los bloques de texto en el proyecto.

### ¿La importación de subtítulos sobrescribe el texto de mi transcripción actual?
Sí. Al importar un archivo SRT o VTT en un proyecto que ya contiene texto transcrito, Clipey muestra un cuadro de confirmación y sustituye la transcripción activa por las líneas importadas.

### ¿Puedo exportar los subtítulos como un archivo independiente del video?
Sí. En el diálogo de exportación, puedes activar la salida de subtítulos para generar archivos sidecar (`.srt` o `.vtt`) en la misma carpeta junto al archivo MP4.

Para editar pausas y palabras con ayuda del agente, lee [edición con IA](/blog/es/edicion-ia-cortes-zooms-silencios/). Para buscar fragmentos breves, consulta [Auto Clip](/blog/es/auto-clip-shorts-de-videos-largos/). Explora las [funciones de IA](/es/#ia).

Siguiente paso: importa una pista existente o transcribe un fragmento, corrige el texto y comprueba la sincronización en la vista previa.

## Historial de esta página

- 2026-10-15: publicado.
