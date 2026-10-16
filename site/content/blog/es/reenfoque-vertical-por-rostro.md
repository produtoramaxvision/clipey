---
title: "Reencuadra una grabación vertical siguiendo un rostro"
description: "Activa el reenfoque por rostro, elige qué ocurre cuando no se detecta ninguno y revisa la vista previa vertical antes de exportar."
slug: "reenfoque-vertical-por-rostro"
lang: "es"
translationKey: "reenquadramento-vertical-por-rosto"
category: "tutoriales"
tags: ["Edición con IA", "Grabación", "Privacidad"]
author: "Equipo Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 11
cover: "/blog/covers/reenquadramento-vertical-por-rosto.webp"
coverAlt: "Vista previa vertical de Clipey con el encuadre siguiendo a la persona"
ogImage: "/blog/og/reenquadramento-vertical-por-rosto.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15. El reencuadre facial y el fondo desenfocado están disponibles en el editor para formatos de salida fijos.

Para reencuadrar una grabación vertical siguiendo un rostro en Clipey, elige un formato fijo como 9:16 y activa **Reencuadre facial**. Clipey analiza el video localmente para crear una trayectoria que sigue el rostro, con opciones ajustables de **Suavizado** y **Alternativa** para **Cursor** o **Centro** cuando no se detecta ningún rostro. En los formatos fijos, **Fondo desenfocado** rellena los laterales con una versión ampliada y desenfocada de la fuente.

## Configura el formato de salida

1. Abre el proyecto con el video que quieres adaptar y espera a que se cargue.
2. En el panel de formato, elige una proporción vertical, como 9:16. Mira la vista previa: un marco fijo solo muestra una parte de la imagen original.
3. Activa **Reencuadre facial**. Clipey analiza el video para crear una trayectoria de enfoque. El análisis se ejecuta al activar la función o si el recurso aún no tiene una trayectoria; no detecta rostros en cada fotograma durante la reproducción.
4. Ajusta **Suavizado** para equilibrar seguimiento y estabilidad. Un valor más suave reduce los movimientos bruscos, aunque puede tardar más en acompañar un desplazamiento rápido. Reproduce un tramo donde la persona se mueve para decidir.
5. Elige la **Alternativa** para los momentos sin rostro: seguir el cursor o centrar el encuadre. Reproduce un intervalo sin detección y comprueba si la alternativa conserva contenido útil.

## Comprueba el movimiento del marco

Reproduce desde el principio y observa los cambios de posición. El encuadre sigue el rostro detectado y se suaviza para evitar saltos. Si el rostro desaparece durante un intervalo, entra en vigor la alternativa elegida. Comprueba que la transición parezca intencional y que el cuadro no se quede en una posición que oculte la demostración.

La vista previa y la exportación deben reflejar el reenfoque. Aun así, vuelve a revisar los tramos importantes después de exportar, especialmente si hay varios clips o cortes. Un encuadre adecuado en un plano quizá no funcione en el siguiente. Ajusta los límites del clip o utiliza otro formato si deben verse a la vez la persona y la interfaz.

## Decide cómo rellenar los laterales

Al convertir una fuente horizontal a 9:16, pueden quedar zonas vacías o ser necesario recortar mucho. **Fondo desenfocado** rellena los laterales con una copia ampliada y desenfocada de la fuente, mientras mantiene centrada la imagen principal completa. Compáralo con un relleno que recorta la imagen: el fondo desenfocado conserva contexto, pero quizá no permita leer detalles de la interfaz.

Elige según el contenido. Para una persona hablando, el fondo difuminado puede evitar las bandas negras sin ampliar demasiado la imagen principal. En un tutorial de pantalla, el recorte puede ocultar controles; el fondo borroso tampoco vuelve legible el texto de fondo. Comprueba el movimiento y activa los subtítulos durante la revisión.

## Consejos

- Elige primero el formato final para evaluar exactamente lo que verá la audiencia.
- Prueba un tramo con la persona hablando y otro donde se desplace.
- Mantén suficiente suavizado para evitar que pequeños movimientos hagan temblar el cuadro, pero redúcelo si el rostro se sale durante cambios rápidos.
- Revisa la alternativa cuando no se detecte un rostro; el centro o el cursor no siempre coinciden con la acción importante.
- En un tutorial, confirma que el reenfoque no elimine menús, punteros o texto necesarios para explicar los pasos.
- Mira la exportación final en una pantalla pequeña, donde suele reproducirse el video vertical.

## Limitaciones

El reencuadre depende de la detección de rostros en el dispositivo y de una trayectoria generada para el recurso. No garantiza detectar todos los rostros en cualquier condición ni identifica el elemento importante de la interfaz. Sigue un rostro elegido, que no tiene por qué ser quien habla. Cuando no hay detección, se usa la alternativa configurada. El fondo desenfocado puede reducir la legibilidad del contenido visual y no sustituye la edición manual en escenas complejas.

Para encontrar momentos breves, consulta [cómo revisar sugerencias de Auto Clip](/blog/es/auto-clip-shorts-de-videos-largos/). Para ajustar cortes y zooms, lee [edición con IA](/blog/es/edicion-ia-cortes-zooms-silencios/). Explora las [funciones de Clipey](/es/#features).

Siguiente paso: prueba el reencuadre en un fragmento corto, comprueba la alternativa y revisa la exportación antes de procesar el video entero.

## Historial de esta página

- 2026-10-15: publicado.
