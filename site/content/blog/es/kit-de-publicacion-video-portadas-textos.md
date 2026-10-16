---
title: "Cómo guardar un kit de publicación de vídeo"
description: "Agrupa el vídeo exportado, textos por plataforma, subtítulos exportados y una portada existente en una carpeta o un ZIP."
slug: "kit-de-publicacion-video-portadas-textos"
lang: "es"
translationKey: "kit-de-publicacao-video-capas-textos"
category: "tutoriales"
tags: ["Publicación", "Exportación"]
author: "Equipo Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 14
cover: "/blog/covers/kit-de-publicacao-video-capas-textos.webp"
coverAlt: "Vídeo y textos organizados en un kit de publicación"
ogImage: "/blog/og/kit-de-publicacao-video-capas-textos.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 para Windows.

Para guardar un kit de publicación de vídeo en Clipey, finaliza la exportación de tu archivo y entra en la sección Kit de publicación y textos del panel de publicación. Esta función empaqueta tu video final, la portada existente, los subtítulos sidecar y los textos adaptados a cada red social en una carpeta local o un archivo ZIP comprimido. También puedes generar automáticamente títulos y descripciones pulsando Sugerir texto a partir de la transcripción antes de guardar el lote.

## Qué incluye el kit

El punto de partida es un vídeo exportado. El kit también puede incluir un archivo `copy-<plataforma>.txt` por cada plataforma y un `copy.json` con los mismos datos estructurados. Si exportaste un archivo de subtítulos por separado, también puede acompañar al paquete. La portada solo se incluye si ya existe en el proyecto: Clipey no genera una automáticamente.

La diferencia es importante: el kit organiza material preparado, pero no es un editor de portadas. Si el proyecto no tiene portada, no aparecerá una nueva. También revisa los textos antes de compartirlos; las sugerencias son un punto de partida y se pueden editar.

## Guarda una carpeta o un ZIP

1. Abre el proyecto y termina el vídeo. Usa **Exportar** para crear el archivo final antes de preparar el kit.
2. En la sección **Kit de publicación y textos**, completa y revisa el título, la descripción y los hashtags de cada red. Puedes pulsar **Sugerir texto** para generar propuestas automáticas fundamentadas en la transcripción del clip.
3. Elige **Guardar kit de publicación**.
4. En **Formato del kit**, selecciona **Carpeta** o **Paquete ZIP**. La carpeta es la opción predeterminada para edición inmediata; elige Paquete ZIP si quieres un solo archivo para adjuntar o transferir.
5. Haz clic en **Elegir destino** y espera el indicador de progreso. Mantén abierta la aplicación mientras se escribe el ZIP.
6. Abre el destino y confirma que estén el vídeo, los archivos de subtítulos, la imagen de portada y los textos esperados.

Los textos se separan por plataforma para que puedas copiar la versión correcta sin mezclar indicaciones. `copy.json` reúne la misma información en un formato estructurado, útil cuando otro flujo consume los campos en lugar de copiarlos manualmente.

## Revisa el texto sugerido

La acción **Sugerir texto** analiza la transcripción y el intervalo del clip seleccionado para generar títulos, descripciones y hashtags relevantes. Lee cada propuesta generada y corrige nombres propios, términos técnicos y llamadas a la acción antes de guardar el kit. Esta herramienta acelera la redacción inicial manteniéndote al frente de cada decisión editorial.

Compara las afirmaciones con lo que realmente aparece en el vídeo. Si la transcripción no menciona una persona o marca, no des por hecho que la sugerencia haya acertado el nombre. Después de guardar, revisa también tus cambios en el archivo de cada plataforma.

## Consejos

- Pon un nombre reconocible al proyecto antes de exportar para identificar fácilmente el vídeo en el destino.
- Abre al menos un `copy-<plataforma>.txt` después de guardarlo. El texto simple facilita la revisión y la copia.
- Trata `copy.json` como la misma información en formato estructurado, no como otro borrador independiente.
- Comprueba el espacio disponible si el vídeo es grande. El kit incluye el vídeo exportado, no solo los textos.
- Usa una carpeta distinta para cada campaña si necesitas separar versiones; el kit contiene la exportación que elegiste.

## Limitaciones

El kit no crea portadas, no sube archivos a las redes y no garantiza que una plataforma acepte el vídeo o el texto. Solo incluye una portada si ya existe en el proyecto; los subtítulos se añaden únicamente cuando se exportan en un archivo aparte. Crear el ZIP puede tardar porque incluye el propio vídeo; espera a que termine antes de mover o cerrar el destino.

Para programar desde Clipey, lee [cómo programar vídeos](/blog/es/publicacion-programada-youtube-tiktok-instagram/). Para preparar las dimensiones y revisar el archivo, consulta [presets y verificación de exportación](/blog/es/exportacion-fiable-presets-verificacion/). Las [funciones de publicación](/es/#publicar) explican el flujo general.

Después de revisar el vídeo y los textos de cada destino, entrega el kit a quien vaya a publicar o continúa con la cola de Clipey. [Descarga Clipey](/es/#descargar) para preparar el siguiente kit.

## Historial de esta página

- 2026-10-15: publicado.
