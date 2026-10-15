---
title: "Importa un video desde un enlace y revísalo antes de editar"
description: "Pega un enlace de video, revisa los datos y las calidades disponibles e impórtalo al proyecto sin publicarlo automáticamente."
slug: "importar-video-desde-un-enlace"
lang: "es"
translationKey: "importar-video-por-link"
category: "tutoriales"
tags: ["Grabación", "Privacidad", "Edición con IA"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 12
cover: "/blog/covers/importar-video-por-link.webp"
coverAlt: "Ventana de importación por enlace con una vista previa de los datos del video"
ogImage: "/blog/og/importar-video-por-link.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 en Windows.

Si un video que tienes permiso para usar está alojado en un servicio en línea, importarlo desde un enlace evita descargarlo por separado y buscarlo después en el proyecto. Clipey consulta los datos disponibles, te permite elegir calidad y añade el medio al proyecto. Importar no publica el video; sigues siendo responsable de tener derecho a descargar y reutilizar el contenido.

## Pega el enlace y revisa la vista previa

1. Abre un proyecto en el editor o empieza desde el estado vacío y elige **Import from link**.
2. Pega la dirección del video. La herramienta admite enlaces HTTP o HTTPS compatibles; no uses rutas locales, direcciones privadas ni enlaces que requieran eludir controles de acceso.
3. Espera la consulta de metadatos. Comprueba el título, la duración, la miniatura y el canal o autor si el sitio proporciona esos datos.
4. Lee la información de licencia. Si el sitio no informa ninguna, Clipey muestra **No licence information**. Que no aparezca información no significa que puedas reutilizar el video libremente.
5. Elige una calidad y confirma la importación. La opción predeterminada busca la mejor calidad hasta 1080p; también puedes elegir hasta 720p, la mejor disponible o solo audio.

Clipey usa una herramienta de línea de comandos para consultar y descargar medios. Primero obtiene los metadatos y después descarga con la calidad elegida. Sigue el progreso y cancela si cambiaste de idea o pegaste otro enlace por error. Al terminar, el archivo aparece en los medios del proyecto como un recurso importado.

## Elige calidad según el uso

No selecciones siempre la opción mayor. Para revisar una frase o editar un segmento breve, quizá baste una calidad menor que ocupe menos espacio. Si el trabajo requiere más detalle de imagen, elige la máxima calidad disponible que tenga sentido. **Best available** no garantiza una resolución específica: depende de la fuente.

Selecciona **Audio only** cuando necesites la pista de sonido y no la imagen. Comprueba la opción antes de iniciar para no descargar solo audio si querías editar un video.

Tras la importación, busca el nuevo recurso en los medios del proyecto y ábrelo para comprobar la duración y la reproducción. La vista previa de metadatos no garantiza que la fuente siga disponible ni que la descarga vaya a completarse. El video podría ser privado, estar bloqueado por región o requerir una cuenta. Si aparece un error, revisa el enlace, la red y los permisos de la fuente antes de intentarlo de nuevo.

## Derechos, licencia y responsabilidad

Importa únicamente contenido propio o que tengas permiso para usar. El campo de licencia refleja lo que informa la fuente cuando ofrece esa información; no concede derechos ni determina si la licencia cubre el uso que planeas. Lee las condiciones del sitio y de la licencia, y considera permisos, atribución, uso comercial y restricciones territoriales. No uses la herramienta para eludir contenido privado, controles de acceso o limitaciones de la fuente.

El archivo importado queda disponible para editar dentro del proyecto; eso no equivale a publicarlo o compartirlo. Antes de exportar, confirma que puedes incluir contenido de terceros en el video final. Una licencia abierta también puede imponer condiciones, y la falta de información requiere más cautela.

## Consejos

- Usa el enlace de la página del video, no el de una lista de reproducción, si solo necesitas un elemento. La importación no descarga colecciones enteras.
- Comprueba el título y la duración antes de elegir calidad; sirven para confirmar que pegaste el video correcto.
- Elige una calidad adecuada a la tarea en lugar de ocupar espacio con detalle innecesario.
- Espera a que termine la transferencia antes de cerrar el proyecto y reproduce el recurso desde sus medios.
- Si necesitas audio para transcribir, selecciona la opción apropiada y comprueba el resultado antes de seguir.
- Conserva el origen y los datos de licencia en tus registros editoriales cuando sea pertinente.

## Limitaciones

La compatibilidad depende del sitio y del acceso que ofrezca en ese momento. Los videos privados, no disponibles, bloqueados por región o eliminados pueden fallar. Clipey solo muestra la licencia cuando la fuente proporciona información y no determina si tienes derechos suficientes. Un enlace no permite eludir autenticación ni restricciones. Los formatos y resoluciones disponibles dependen del origen, y errores de red o falta de espacio pueden interrumpir la descarga.

Después de importar, lee [cómo convertir una grabación larga en clips breves](/blog/es/auto-clip-shorts-de-videos-largos/) o [prepara subtítulos SRT/VTT](/blog/es/subtitulos-automaticos-e-importar-srt-vtt/). Consulta también las [funciones de Clipey](/es/#features) y el tratamiento de [privacidad](/es/#privacy).

Siguiente paso: importa solo un enlace autorizado, comprueba el archivo dentro del proyecto y revisa los derechos antes de exportar o compartir.

## Historial de esta página

- {{RELEASE_DATE}}: published.
