---
title: "Crea subtítulos e importa archivos SRT o VTT"
description: "Transcribe una grabación, ajusta el estilo de los subtítulos e importa SRT o VTT sin reemplazar el texto actual sin confirmación."
slug: "subtitulos-automaticos-e-importar-srt-vtt"
lang: "es"
translationKey: "legendas-automaticas-e-importar-srt-vtt"
category: "tutoriales"
tags: ["Subtítulos", "Edición con IA", "Exportación"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 9
cover: "/blog/covers/legendas-automaticas-e-importar-srt-vtt.webp"
coverAlt: "Panel de transcripción y controles de subtítulos de Clipey"
ogImage: "/blog/og/legendas-automaticas-e-importar-srt-vtt.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 en Windows.

Los subtítulos ayudan a seguir una grabación sin depender únicamente del audio, pero no siempre hace falta transcribir todo de nuevo. Clipey permite trabajar con la transcripción del proyecto, ajustar la apariencia de los subtítulos e importar archivos SRT o VTT. La importación crea texto con tiempos; no ejecuta reconocimiento de voz.

## Crea o revisa la transcripción

1. Abre el proyecto y selecciona la grabación que contiene voz.
2. En el panel **Transcript**, pulsa **Transcribe now** si todavía no hay transcripción. Espera a que termine antes de corregir palabras o abrir los ajustes de subtítulos.
3. Lee el texto y corrige nombres, cifras y términos técnicos. La transcripción se puede editar: corrige los errores antes de cambiar el estilo visual.
4. Abre **Captions** desde el panel de transcripción para ver las opciones de presentación. Los ajustes ocupan el lugar del panel; ciérralos para volver al texto.

Con una transcripción generada, Clipey asocia palabras y tiempos y puede mostrar subtítulos sobre el video. Las opciones incluyen mostrarlos u ocultarlos, el estilo, la posición y las palabras por línea. Mantén abierta la vista previa al cambiar estos controles: un estilo legible en una escena puede tapar un elemento importante en otra.

## Importa un archivo SRT o VTT

Si ya tienes una pista de subtítulos, usa **Import subtitles** en el panel de transcripción y elige un archivo .srt o .vtt. Si el proyecto ya tiene transcripción, Clipey solicita confirmación antes de reemplazarla; cancela para conservar el texto actual. Si detecta un archivo sidecar con el mismo nombre base que el video, ofrece importarlo en vez de sustituir texto automáticamente.

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

Para editar pausas y palabras con ayuda del agente, lee [edición con IA](/blog/es/edicion-ia-cortes-zooms-silencios/). Para buscar fragmentos breves, consulta [Auto Clip](/blog/es/auto-clip-shorts-de-videos-largos/). Explora las [funciones de IA](/es/#ia).

Siguiente paso: importa una pista existente o transcribe un fragmento, corrige el texto y comprueba la sincronización en la vista previa.

## Historial de esta página

- {{RELEASE_DATE}}: published.
