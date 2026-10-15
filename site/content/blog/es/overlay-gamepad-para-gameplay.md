---
title: "Muestra los controles en una grabación de gameplay"
description: "Descubre cómo se prevén la captura y la superposición de gamepad en Clipey 1.15, elige un estilo y sincroniza las entradas con el video."
slug: "overlay-gamepad-para-gameplay"
lang: "es"
translationKey: "overlay-de-gamepad-para-gameplay"
category: "tutoriales"
tags: ["Grabación", "Windows", "Edición con IA"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 5
cover: "/blog/covers/overlay-de-gamepad-para-gameplay.webp"
coverAlt: "Superposición de un control sobre una grabación de gameplay"
ogImage: "/blog/og/overlay-de-gamepad-para-gameplay.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15. La captura de gamepad está prevista para Windows. La superposición del editor requiere una grabación con eventos del control.

Un video de gameplay no siempre deja claro qué botón se pulsó. La captura de gamepad y la superposición en el editor están previstas para mostrar las entradas junto con la acción, sin grabar el control con una cámara. Son dos pasos diferentes: primero se registran los eventos y después se elige cómo se muestran.

## Activa la captura antes de grabar

La opción prevista es **Capture gamepad** (capturar gamepad), dentro de los controles de captura del HUD. Es exclusiva de Windows y, según la especificación, viene desactivada. Actívala antes de iniciar la grabación que debe mostrar entradas. Si el muestreador de gamepad no está disponible, la tarea indica que la grabación debe continuar sin esos datos y que la interfaz informe del problema una vez; no puede recuperar eventos que no se capturaron.

Haz una prueba breve y pulsa algunos botones, un gatillo y los joysticks. Los eventos guardan el índice del control, los identificadores de entradas y sus valores; no conservan la marca o el modelo del dispositivo. Las etiquetas previstas incluyen diseños Xbox, PlayStation, Switch y genérico. Esto no garantiza que cada dispositivo obtenga una etiqueta específica en cualquier configuración, así que revisa la vista previa.

## Configura la superposición en el editor

1. Importa la grabación de prueba y selecciona su clip. La sección de superposición de gamepad prevista aparece en el inspector junto a los controles del teclado.
2. Si el inspector indica que el activo no tiene datos de gamepad, activar la superposición no basta. Vuelve a grabar con **Capture gamepad** activado. El estado vacío explica que faltan eventos; no los simula.
3. Activa **Gamepad overlay** (superposición de gamepad) y elige un estilo. **Compact** muestra etiquetas de los botones pulsados. **Full** dibuja la silueta de un control y resalta los botones activos; **Show sticks** agrega la posición de los joysticks.
4. Ajusta posición, tamaño, escala y opacidad para no cubrir elementos importantes del juego. El retraso de entrada puede desplazar la visualización si los eventos parecen adelantados o atrasados respecto del video.
5. Reproduce la prueba, incluso después de recortar o cambiar la velocidad. Los eventos deberían seguir el tiempo editado, y los toques breves permanecer visibles un mínimo de fotogramas.
6. Comprueba una exportación corta. La superposición debería aparecer en el mismo momento que en la vista previa y respetar el diseño de control elegido.

## Elige el estilo para el video

El estilo compacto ocupa menos espacio y sirve cuando basta con identificar botones, por ejemplo, al explicar una combinación. El completo ayuda cuando importa la posición del joystick. Si la dirección del movimiento es relevante, activa los joysticks y deja libre una zona del encuadre para la silueta.

Los eventos se ajustan a la línea de tiempo editada, incluidos los cortes y los segmentos acelerados. Por eso, después de editar no compares una entrada con el tiempo original. Si la sincronización falla, revisa primero el retraso de entrada y los cambios hechos en el segmento; no intentes corregir un corte moviendo solo la superposición.

## Consejos

1. Haz una prueba breve con entradas variadas antes de una sesión completa, sobre todo si alternas controles.
2. Reserva espacio en la composición antes de elegir posición y tamaño.
3. Elige Compact cuando baste con identificar botones y Full cuando importen los joysticks.
4. Si no aparece nada, confirma que se capturaron los eventos antes de ajustar la apariencia.
5. Compara la vista previa y la exportación después de recortar o cambiar la velocidad.

## Limitaciones

La captura es exclusiva de Windows y depende de que el muestreador esté disponible. La superposición no puede completar una grabación sin eventos de gamepad. La tarea prevé estados de botones, gatillos y joysticks, y diseños Xbox, PlayStation, Switch y genérico; valida las etiquetas y el comportamiento con tu control. La implementación debe confirmarse en la versión final.

Lee también [grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/) y [dibujar durante una grabación](/blog/es/dibujar-en-vivo-durante-grabacion/). Consulta las [funciones de Clipey](/es/#features) y la [página de descarga](/es/#download).

## Historial de esta página

- {{RELEASE_DATE}}: published.
