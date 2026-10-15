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

> **Aplica a:** Clipey 1.15. La grabación principal está dirigida a Windows; el dibujo en vivo todavía requiere validación técnica final.

Clipey 1.15 incorpora grabación con cursor editable y efectos de clics, superposición de mando para gameplay, atajos rápidos en la línea de tiempo y generación automática de clips cortos con Auto Clip. La actualización también añade importación de subtítulos y enlaces, servidor local MCP para agentes de IA y ajustes preestablecidos de exportación con verificación técnica del archivo de salida. Todas las herramientas de captura y edición continúan ejecutándose localmente en tu computadora sin enviar tus videos a servidores externos.

## Elige cómo grabar el cursor

El control del cursor en el HUD alterna entre **Cursor editable** y **Cursor del sistema**. El modo editable guarda la telemetría del cursor por separado para cambiar su estilo, mostrar efectos de clics y aprovechar el zoom automático en el editor. El modo del sistema graba el cursor real directamente en los píxeles del vídeo; después no se puede modificar su aspecto ni usarlo para el zoom automático. Para tutoriales donde los clics necesitan claridad, el modo editable ofrece la máxima flexibilidad.

En Windows, la captura de interacciones incluye los clics de los botones laterales y los eventos de la rueda del ratón, además del desplazamiento continuo. Los botones derecho y central alimentan los efectos visuales de anillo doble y anillo cuadrado, mientras que el rebote, el impacto y el zoom automático permanecen asociados al botón izquierdo. Esta distinción asegura que los clics secundarios guíen la vista sin activar acciones de edición no deseadas.

## Añade contexto en la edición

Los efectos del ratón combinan estilos de animación de clic (**Onda**, **Anillos**, **Pulso**), un indicador de desplazamiento, una estela de arrastre, un halo suave y un foco. La opción **Movimiento reducido** sustituye los desplazamientos animados por una transición breve de opacidad. Conviene activar solo los elementos necesarios para no sobrecargar visualmente el contenido de la pantalla.

El dibujo en vivo está diseñado para realizar anotaciones rápidas durante la grabación con lápiz, resaltador, flechas, rectángulos y elipses desde una barra flotante. Los trazos se guardan como datos vectoriales fuera de los píxeles capturados para reproducirse sincronizados en el editor. Al depender de protecciones de captura de Windows, esta función permanece en fase de validación técnica final.

Para grabaciones de juegos, la **Superposición de mando** muestra los botones activos en estilo **Compacto** con etiquetas o en estilo **Completo** con la silueta del control. La vista completa también permite mostrar los sticks analógicos con **Mostrar palancas**. Los eventos se sincronizan con la línea de tiempo editada, manteniendo la precisión tras recortes o cambios de velocidad.

## Trabaja con más precisión en la línea de tiempo

Mantén presionada la tecla **Shift** mientras arrastras o ajustas un recorte para desactivar temporalmente el ajuste magnético, mostrando el aviso **Ajuste desactivado (Mayús)** en la interfaz. El menú contextual de clips y modificadores reúne comandos directos como **Dividir / Cortar**, **Duplicar** y **Eliminar**, con sus combinaciones de teclado. La tecla **M** permite colocar marcadores nombrados en **Marcadores de la línea de tiempo**, y un doble clic en el separador del panel restablece su tamaño predeterminado.

Usa Shift para una colocación puntual sin ajuste. Usa un marcador si quieres regresar a un momento más tarde. El marcador señala una posición: por sí solo no corta ni elimina vídeo.

## Una prueba breve antes del proyecto final

1. Haz una grabación corta en Windows y elige **Cursor editable** si luego quieres recolocar o destacar el puntero.
2. Prueba algunos clics e movimentos de rueda, y activa **Capturar mando** si vas a mostrar partidas con control. Para el dibujo en vivo planificado, el atajo estándar previsto es **Ctrl+Shift+D**, con **Esc** para salir.
3. Abre la grabación en el editor. Comprueba que los eventos aparezcan en los puntos correctos antes de activar varias superposiciones. Cambia el retardo de entrada o el estilo solo si detectas un desfase.
4. Prueba un recorte manteniendo Shift y añade un marcador en el cabezal con **M**. Cambia su nombre para que la lista siga siendo clara durante las revisiones.
5. Exporta un tramo corto y comprueba la legibilidad mientras se reproduce. Así puedes descubrir efectos que tapen texto o anotaciones que aparezcan fuera de tiempo.

## ¿Qué diferencia hay entre los modos de cursor?

En el modo editable, el editor compone el cursor usando la telemetria grabada por separado. En el modo del sistema, el puntero forma parte de los píxeles capturados y no se puede separar de la imagen. Si tienes dudas, graba dos muestras breves y compáralas en el editor en vez de guiarte solo por el HUD.

## ¿Por qué puede estar vacía una superposición?

Un ajuste visual necesita eventos grabados. La superposición del mando, por ejemplo, no puede inventar entradas que no se capturaron: el panel muestra "Graba con Capturar mando activado" si el archivo carece de datos de control. Asimismo, los efectos de cursor requieren grabar en modo editable. Primero comprueba los datos de origen; después revisa la posición y el estilo.

## Sigue con una guía práctica

Consulta [grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/), [efectos de mouse](/blog/es/efectos-mouse-clics-halo-foco/) y [atajos de la línea de tiempo](/blog/es/atajos-y-mejoras-rapidas-timeline/). También puedes revisar las [funciones de Clipey](/es/#features).

## Consejos

1. Haz una grabación breve de prueba antes de grabar una clase o demostración larga.
2. Elige el modo editable o del sistema antes de grabar; los píxeles del cursor del sistema no se pueden modificar después.
3. Usa pocos efectos y revisa el resultado con el movimiento reducido.
4. Activa Capturar mando antes de la grabación si necesitas registrar botones y palancas.
5. Mantén Shift solo durante el arrastre que necesite libertad; al soltarlo vuelve el ajuste magnético.

## Limitaciones

La captura de mando, botones laterales y rueda está dirigida a Windows. Los efectos del ratón, la superposición de mando y las mejoras de la línea de tiempo forman parte de Clipey 1.15. La herramienta de dibujo en vivo durante la grabación se mantiene en validación técnica final.

Visita la página de [descarga](/es/#download) para obtener Clipey y consultar la versión actual.

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
