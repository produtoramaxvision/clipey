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

Para importar un video desde un enlace y revisarlo antes de editar en Clipey, pulsa Importar desde enlace en el editor, introduce la dirección pública y selecciona Inspeccionar enlace para consultar duración, autor y licencia. Elige la resolución deseada (como Mejor hasta 1080p o Solo audio) y confirma la descarga directa al proyecto. El proceso se ejecuta en tu computadora sin compartir credenciales y la responsabilidad legal sobre el uso y derechos del contenido recae en el usuario.

## Pega el enlace y revisa la vista previa

1. Abre un proyecto en el editor o empieza desde el estado vacío y elige **Importar desde enlace**.
2. Pega la dirección en el campo **Enlace del video**. La herramienta admite enlaces HTTP o HTTPS compatibles; no uses rutas locales ni direcciones de red privadas.
3. Haz clic en **Inspeccionar enlace** y espera la consulta de metadatos. Comprueba el título, la duración, la miniatura y el creador reportado por el sitio.
4. Lee la línea de **Licencia**. Si el sitio no informa ninguna, Clipey muestra **Sin información de licencia**. Que no aparezca información no significa que puedas reutilizar el video libremente.
5. Elige una opción en **Calidad** y pulsa **Importar video**. La opción predeterminada busca **Mejor hasta 1080p**; también puedes elegir **Mejor hasta 720p**, **Mejor disponible** o **Solo audio (m4a)**.

Clipey descarga los medios directamente en tu equipo. Durante la transferencia, la ventana muestra velocidad y tiempo restante estimado, con posibilidad de cancelar en cualquier momento. Al concluir, el archivo se incorpora automáticamente a los medios del proyecto.

## Elige calidad según el uso

No selecciones siempre la opción mayor. Para revisar una frase o editar un segmento breve, quizá baste una calidad menor que ocupe menos espacio. Si el trabajo requiere más detalle de imagen, elige la máxima calidad disponible que tenga sentido. **Mejor disponible** selecciona la resolución máxima que ofrece la fuente original.

Selecciona **Solo audio (m4a)** cuando necesites la pista de sonido y no la imagen. Comprueba la opción antes de iniciar para no descargar solo audio si querías editar un video.

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

La compatibilidad depende del sitio y del acceso que ofrezca en ese momento. Los videos privados, no disponibles, bloqueados por región o eliminados no pueden descargarse. Clipey solo muestra la licencia cuando la fuente proporciona información y no determina si tienes derechos suficientes. Un enlace no permite eludir autenticación ni restricciones digitales de acceso.

## Preguntas frecuentes

### ¿Puedo importar videos desde cualquier sitio web?
Clipey permite importar enlaces públicos admitidos por herramientas estándar de descarga. Los videos privados, transmisiones que requieren inicio de sesión o contenidos bloqueados regionalmente no pueden descargarse.

### ¿Clipey valida si tengo derechos de autor para reutilizar el video?
No. La aplicación muestra la información de licencia provista por el sitio de origen únicamente como referencia. El usuario es el único responsable de contar con los derechos y permisos correspondientes.

### ¿La importación desde enlace envía mis contraseñas o datos a servidores externos?
No. La descarga se procesa localmente en tu equipo a través de componentes integrados, sin enviar tus credenciales ni tokens de acceso a los servidores de Clipey.

Después de importar, lee [cómo convertir una grabación larga en clips breves](/blog/es/auto-clip-shorts-de-videos-largos/) o [prepara subtítulos SRT/VTT](/blog/es/subtitulos-automaticos-e-importar-srt-vtt/). Consulta también las [funciones de Clipey](/es/#features) y el tratamiento de [privacidad](/es/#privacy).

Siguiente paso: importa solo un enlace autorizado, comprueba el archivo dentro del proyecto y revisa los derechos antes de exportar o compartir.

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
