---
title: "Clipey 1.15: novedades para grabar y editar"
description: "Conoce los cambios previstos para Clipey 1.15, dónde encontrarlos y qué funciones son exclusivas de Windows o aún esperan la validación final."
slug: "clipey-1-15-novedades"
lang: "es"
translationKey: "clipey-1-15-novidades"
category: "novedades"
tags: ["Grabación", "Edición con IA", "Exportación"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: true
order: 1
cover: "/blog/covers/clipey-1-15-novidades.webp"
coverAlt: "Portada con las novedades de Clipey 1.15"
ogImage: "/blog/og/clipey-1-15-novidades.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15. La grabación principal está dirigida a Windows; algunas novedades dependen de esa plataforma o todavía necesitan validación final.

Una actualización resulta más útil cuando sabes qué control usar y qué límites tiene cada función. Esta guía organiza los cambios de 1.15 según la tarea. Comprueba la versión instalada y conserva una copia del proyecto antes de probar cambios en el editor.

## Elige cómo grabar el cursor

El control del cursor en el HUD alterna entre **Editable cursor** y **System cursor**. El modo editable guarda los datos del cursor por separado para cambiar su estilo y aprovecharlos en el zoom automático del editor. El modo del sistema deja el cursor real dentro del vídeo; después no se puede cambiar su estilo ni usarlo para el zoom automático. Para un tutorial que necesita destacar clics, el modo editable ofrece más opciones en la edición.

En Windows, la captura de interacciones está prevista para incluir los botones laterales y la rueda, además del movimiento. Los botones derecho y central se destinan a los nuevos efectos visuales. El rebote, el impacto y el zoom automático existentes siguen dependiendo del clic izquierdo. Una señal visual del clic lateral no lo convierte en un clic izquierdo para el editor.

## Añade contexto en la edición

Los efectos del mouse combinan formas de clic por botón, un indicador de desplazamiento, un rastro al arrastrar, un halo y un foco de luz. La opción de movimiento reducido sustituye el desplazamiento por un cambio breve de opacidad. Empieza con pocos efectos: un halo intenso y un fondo muy oscurecido pueden dificultar la lectura del contenido.

El dibujo en vivo está pensado para anotar durante la grabación. Las herramientas previstas son lápiz, resaltador, flecha, rectángulo y elipse, con color y grosor en una barra flotante. Los trazos deben quedar fuera del vídeo capturado y guardarse como vectores para reproducirse en el editor y en la exportación. Siguen el tiempo de la grabación, no son una capa permanente separada del clip.

Para jugar, la superposición del mando puede mostrar los botones activos como etiquetas compactas o como un dibujo del control. La vista completa también puede mostrar la posición de los sticks. Los eventos siguen la línea de tiempo editada: los recortes y cambios de velocidad afectan al momento en que aparecen.

## Trabaja con más precisión en la línea de tiempo

Mantén **Shift** mientras arrastras o ajustas un recorte para desactivar temporalmente el ajuste magnético. No cambia una preferencia guardada. El menú contextual de la línea de tiempo ofrece acciones existentes para clips y modificadores, con sus atajos, y se puede abrir con el teclado. Los marcadores con nombre permiten volver a puntos útiles. Un doble clic en el separador del panel restablece su tamaño predeterminado.

Usa Shift para una colocación puntual sin ajuste. Usa un marcador si quieres regresar a un momento más tarde. El marcador señala una posición: por sí solo no corta ni elimina vídeo.

## Una prueba breve antes del proyecto final

1. Haz una grabación corta en Windows y elige el modo de cursor según la tarea. Selecciona **Editable cursor** si luego quieres recolocar o destacar el puntero.
2. Prueba algunos clics y movimientos de rueda, y decide si necesitas dibujar o mostrar un mando. Para el dibujo en vivo, la especificación prevé **Ctrl+Shift+D** como atajo inicial, **Esc** para salir del modo y otra tecla para borrar.
3. Abre la grabación en el editor. Comprueba que los eventos aparezcan en los puntos correctos antes de activar varias superposiciones. Cambia el retardo de entrada o el estilo solo si detectas un desfase.
4. Prueba un recorte manteniendo Shift y añade un marcador en el cabezal con **M**. Cambia su nombre para que la lista siga siendo clara durante las revisiones.
5. Exporta un tramo corto y comprueba la legibilidad mientras se reproduce. Así puedes descubrir efectos que tapen texto o anotaciones que aparezcan fuera de tiempo.

Los atajos y controles de las funciones en desarrollo corresponden a lo prometido en sus especificaciones y podrían cambiar antes de la versión estable. Haz esta prueba con contenido que puedas descartar, sin depender de un control que quizá aún no esté disponible en tu compilación.

## ¿Qué diferencia hay entre los modos de cursor?

En el modo editable, el editor puede componer el cursor usando los datos grabados por separado. En el modo del sistema, el puntero forma parte de los píxeles capturados y no se puede separar de la imagen. Si tienes dudas, graba dos muestras breves y compáralas en el editor en vez de guiarte solo por el HUD.

## ¿Por qué puede estar vacía una superposición?

Un ajuste visual necesita eventos grabados. Por ejemplo, la superposición del gamepad no puede inventar entradas que no se capturaron; su especificación prevé un estado vacío si el recurso no contiene datos del control y una indicación para grabar con la captura activada. Los datos separados del cursor también dependen del modo de captura y de que haya movimiento o interacción. Primero comprueba los datos de origen; después revisa la posición y el estilo.

## Sigue con una guía práctica

Consulta [grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/), [efectos de mouse](/blog/es/efectos-mouse-clics-halo-foco/) y [atajos de la línea de tiempo](/blog/es/atajos-productividad-linea-tiempo/). También puedes revisar las [funciones de Clipey](/es/#features).

## Consejos

1. Haz una grabación breve de prueba antes de grabar una clase o demostración larga.
2. Elige el modo editable o del sistema antes de grabar; los píxeles del cursor del sistema no se pueden modificar después.
3. Usa pocos efectos y revisa el resultado con el movimiento reducido.
4. Comprueba que se capturaron los controles antes de ajustar la superposición del mando.
5. Mantén Shift solo durante el arrastre que necesite libertad; al soltarlo vuelve el ajuste magnético.

## Limitaciones

La captura del gamepad, los botones laterales y la rueda está dirigida a Windows. Excluir el dibujo en vivo del vídeo capturado depende de la captura de Windows. Los efectos del mouse, el dibujo, el gamepad y los ajustes de la línea de tiempo aún están en desarrollo y necesitan validación final. Su disponibilidad y controles pueden cambiar antes de la versión estable; no des por hecho que ya aparecen en todas las instalaciones.

Visita la página de [descarga](/es/#download) para obtener Clipey y consultar la versión actual.

## Historial de esta página

- {{RELEASE_DATE}}: published.
