---
title: "Destaca clics, desplazamiento y cursor en tus grabaciones"
description: "Configura efectos de clic por botón, desplazamiento, rastro, halo y foco; descubre qué cambia cada opción en el vídeo."
slug: "efectos-mouse-clics-halo-foco"
lang: "es"
translationKey: "efeitos-de-mouse-cliques-halo-spotlight"
category: "tutoriales"
tags: ["Edición con IA", "Grabación", "Windows"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 3
cover: "/blog/covers/efeitos-de-mouse-cliques-halo-spotlight.webp"
coverAlt: "Portada sobre los efectos del cursor y los clics"
ogImage: "/blog/og/efeitos-de-mouse-cliques-halo-spotlight.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15. La captura de clics laterales y rueda está dirigida a Windows; los efectos descritos aún esperan la validación final.

En una grabación de pantalla puede costar encontrar un clic o notar un desplazamiento rápido. Los efectos de mouse previstos para 1.15 buscan señalar esas acciones sin dibujar cada aviso a mano. Unas pocas señales coherentes suelen funcionar mejor que activar todas las opciones.

## Qué comunica cada efecto

Los estilos de clic son **ripple**, **rings** y **pulse**. La forma también distingue el botón: el clic izquierdo usa un anillo, el derecho dos y el botón central un anillo cuadrado. Cada botón puede tener su propio color. Así puedes mostrar la acción principal y distinguir cuándo abres un menú contextual.

El indicador de rueda muestra la dirección del desplazamiento. El rastro de arrastre sigue el camino desde que se pulsa hasta que se suelta el botón y luego se desvanece. El halo es un disco suave alrededor del puntero. El foco oscurece el resto del cuadro y deja visible un área cercana al cursor. Cada señal tiene un propósito: indicador para el gesto, halo para la posición continua y foco para dirigir la atención.

## Configura paso a paso

1. Abre los ajustes del cursor en el panel de edición y busca el grupo **Mouse effects**.
2. Activa el control principal. Cuando el grupo está apagado, las opciones secundarias quedan deshabilitadas, no ocultas; así se entiende por qué no se pueden cambiar.
3. Elige el estilo de clic y asigna colores distintos a los botones izquierdo, derecho y central. Evita colores demasiado parecidos entre sí o al fondo.
4. Ajusta **Size** y **Duration**. La duración determina cuánto permanece el efecto y el tamaño lo escala sin mover el cursor.
5. Activa el indicador de rueda si el desplazamiento forma parte de la explicación. Usa el rastro y configura su desvanecimiento cuando importe mostrar el recorrido.
6. Activa el halo o el foco por separado. Ajusta el radio y la opacidad del halo; para el foco, cambia su radio e intensidad.
7. Activa **Reduced motion** si prefieres menos movimiento animado. El efecto de clic pasa a una breve transición de opacidad.
8. Revisa los fragmentos con clics, desplazamientos y arrastres. Vuelve al grupo y baja cualquier efecto que tape texto o controles.

Estos nombres corresponden a la especificación y podrían aparecer traducidos en la aplicación. El clic se sigue grabando aunque su efecto visual esté apagado.

## Una combinación para explicar una interfaz

Para enseñar varios menús, empieza con **rings** y colores diferentes por botón. Deja el halo apagado hasta comprobar si ya se sigue bien el cursor. Añade el indicador solo en el material donde importe la rueda. Usa el foco si hay elementos que compiten por la atención y mantén el oscurecimiento lo bastante suave para leer el resto de la pantalla.

En programas de dibujo o diseño, el rastro puede explicar un arrastre. Un halo constante puede distraer cuando el puntero hace muchos movimientos pequeños. Compara un tramo corto con y sin halo antes de exportar.

## Consejos

- Prueba cada efecto por separado en un fragmento corto para saber cuál mejora la claridad.
- Asigna una función distinta a cada color y comprueba el contraste en la pantalla grabada.
- Usa una duración corta cuando haya muchos clics para que los anillos no se acumulen.
- Halo y foco pueden combinarse, pero ambos atraen la atención al cursor; baja su intensidad si el contenido pierde contraste.
- El movimiento reducido cambia la animación, no la cantidad de datos capturados.

## Limitaciones

Los efectos dependen de los eventos presentes en la grabación. La captura de clics laterales y rueda está dirigida a Windows y sigue pendiente de validación final para 1.15. Los botones derecho y central alimentan los nuevos efectos visuales, pero no deben activar el rebote, el impacto ni el zoom automático, que siguen ligados al clic izquierdo. El rastro necesita datos de movimiento entre pulsar y soltar; no reconstruye un arrastre que no se capturó.

Lee [cómo grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/) y las [novedades de Clipey 1.15](/blog/es/clipey-1-15-novedades/). Descarga Clipey desde la página de [descarga](/es/#download).

## Historial de esta página

- {{RELEASE_DATE}}: published.
