---
title: "Muestra los controles en una grabación de gameplay"
description: "Descubre cómo se prevén la captura y la superposición de gamepad en Clipey 1.15, elige un estilo y sincroniza las entradas con el video."
slug: "overlay-gamepad-para-gameplay"
lang: "es"
translationKey: "overlay-de-gamepad-para-gameplay"
category: "tutoriales"
tags: ["Grabación", "Windows", "Edición con IA"]
author: "Equipo Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 5
cover: "/blog/covers/overlay-de-gamepad-para-gameplay.webp"
coverAlt: "Superposición de un control sobre una grabación de gameplay"
ogImage: "/blog/og/overlay-de-gamepad-para-gameplay.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15. La captura de gamepad es compatible en Windows. La superposición del editor requiere una grabación con eventos del control.

Para mostrar los controles en una grabación de gameplay con Clipey, activa la opción Capturar mando en el HUD de Windows antes de empezar a grabar. En el editor, abre la sección Superposición de mando y elige entre el estilo Compacto, que muestra etiquetas de los botones pulsados, o Completo, que dibuja la silueta del control con las palancas analógicas en tiempo real. Los comandos capturados se sincronizan automáticamente con tu línea de tiempo editada, siguiendo los cortes y cambios de velocidad.

## Activa la captura antes de grabar

La opción se llama **Capturar mando** en los controles de captura del HUD. Es exclusiva de Windows y viene desactivada por defecto. Actívala antes de iniciar la grabación para registrar las pulsaciones. Si el muestreador de gamepad no estuviera disponible en el sistema, la grabación continúa normalmente sin telemetría de control y la interfaz lo notifica puntualmente.

Haz una prueba breve y pulsa algunos botones, gatillos y las palancas analógicas. Los eventos guardan el índice del control, los identificadores de entradas y sus valores de recorrido. Los diseños reconocidos incluyen **Xbox**, **PlayStation**, **Switch** y **Genérico**. Puedes seleccionar el perfil adecuado en el editor para que las etiquetas en pantalla coincidan con la botonera de tu mando.

## Configura la superposición en el editor

1. Importa la grabación de prueba y selecciona su clip. La sección **Superposición de mando** aparece en el inspector junto a los controles de interacción.
2. Si el inspector muestra "Graba con Capturar mando activado", vuelve a grabar asegurándote de activar **Capturar mando** en el HUD. El estado vacío clarifica la ausencia de eventos; no simula entradas ficticias.
3. Marca **Mostrar mando** y elige un estilo visual. **Compacto** muestra etiquetas tipo píldora de los botones pulsados. **Completo** dibuja la silueta del mando y resalta los botones activos; **Mostrar palancas** añade la orientación de las palancas analógicas.
4. Ajusta **Posición**, **Tamaño**, **Zona muerta palanca izq.**, **Zona muerta palanca der.** y **Umbral de gatillos** para evitar respuestas no deseadas en reposo. El ajuste **Retardo de entrada** permite compensar cualquier ligera discrepancia de sincronización con la imagen del juego.
5. Reproduce la prueba tras aplicar cortes o cambios de velocidad. Los eventos acompañan fielmente la línea de tiempo editada, y **Fotogramas mín. pulsación** garantiza que toques breves permanezcan legibles durante varios fotogramas.
6. Comprueba una exportación corta para validar que la superposición respete la posición y escala seleccionadas.

## Elige el estilo para el video

El estilo compacto ocupa menos espacio y sirve cuando basta con identificar botones, por ejemplo, al explicar una combinación. El completo ayuda cuando importa la posición del joystick. Si la dirección del movimiento es relevante, activa los joysticks y deja libre una zona del encuadre para la silueta.

Los eventos se ajustan a la línea de tiempo editada, incluidos los cortes y los segmentos acelerados. Si recortas una pausa en la timeline, los comandos se desplazan a la par, manteniendo una coherencia exacta entre la acción del juego y las reacciones del jugador.

## Consejos

1. Haz una prueba breve con entradas variadas antes de una sesión completa, sobre todo si alternas controles.
2. Reserva espacio en la composición antes de elegir posición y tamaño.
3. Elige Compacto cuando baste con identificar botones y Completo cuando importen las palancas.
4. Si no aparece nada, confirma que se capturaron los eventos antes de ajustar la apariencia.
5. Compara la vista previa y la exportación después de recortar o cambiar la velocidad.

## Limitaciones

La captura es exclusiva de Windows y requiere una grabación efectuada con Capturar mando activado. Una superposición no puede crear datos de eventos que no fueron registrados durante la sesión de juego. El sistema soporta botones, gatillos analógicos y palancas para configuraciones de Xbox, PlayStation, Switch y Genérico.

Lee también [grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/) y [dibujar durante una grabación](/blog/es/dibujar-en-vivo-durante-grabacion/). Consulta las [funciones de Clipey](/es/#features) y la [página de descarga](/es/#download).

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
