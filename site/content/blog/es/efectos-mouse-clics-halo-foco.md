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

> **Aplica a:** Clipey 1.15. La captura de clics laterales y rueda está dirigida a Windows.

Para destacar clics, desplazamiento y el cursor en tus grabaciones con Clipey, abre la configuración del cursor en el editor y activa Efectos del ratón. Puedes seleccionar el estilo de animación entre Onda, Anillos o Pulso, definir colores independientes para cada botón y activar la Estela de arrastre o el Indicador de desplazamiento. Además, el Halo añade un resplandor suave continuo sobre el puntero y el Foco atenúa las zonas periféricas de la pantalla para centrar la atención.

## Qué comunica cada efecto

Los estilos en **Efecto de clic** son **Onda**, **Anillos** y **Pulso**. La forma geométrica también distingue el botón presionado: el clic izquierdo usa un anillo simple, el derecho un anillo doble y el botón central un anillo cuadrado. Cada botón puede tener su propio color mediante **Color clic izquierdo**, **Color clic derecho** y **Color clic central**. Así puedes mostrar la acción principal y distinguir con total claridad cuándo abres un menú contextual o activas una función secundaria.

El **Indicador de desplazamiento** muestra la dirección de giro de la rueda del ratón. La **Estela de arrastre** dibuja una línea detrás del cursor desde que se pulsa hasta que se suelta el botón, desvaneciéndose según el valor de **Desvanecimiento de estela**. El **Halo** proyecta un brillo suave alrededor del puntero controlado por **Radio del halo** y **Opacidad del halo**. Por su parte, el **Foco** atenúa el resto de la pantalla manteniendo un círculo iluminado sobre el cursor regulado por **Radio del foco** y **Atenuación**. Cada señal tiene un propósito claro: el indicador para gestos, el halo para ubicación constante y el foco para destacar áreas clave.

## Configura paso a paso

1. Abre los ajustes del cursor en el panel de edición y busca la sección **Efectos del ratón**.
2. Marca **Activar efectos de ratón**. Las opciones secundarias quedan deshabilitadas cuando la casilla principal está desactivada, clarificando el estado del grupo.
3. Elige el estilo en **Efecto de clic** (**Onda**, **Anillos** o **Pulso**) y asigna colores diferenciados para los clics izquierdo, derecho y central.
4. Ajusta **Tamaño del efecto** y **Duración**. La duración determina cuánto tiempo permanece la animación en pantalla y el tamaño la escala sin desplazar el cursor.
5. Activa el **Indicador de desplazamiento** si la rueda del ratón es parte de la explicación. Activa la **Estela de arrastre** para clarificar rutas de arrastre.
6. Activa el **Halo** o el **Foco** según convenga. Regula radio y opacidad para el halo, o ajusta la amplitud y atenuación del foco.
7. Activa **Movimiento reducido** si prefieres transiciones visuales simplificadas. Los efectos de clic cambian entonces a un desvanecimiento suave de opacidad.
8. Revisa los fragmentos con interacciones para confirmar que las marcas visuales no tapen rótulos ni textos importantes.

## Una combinación para explicar una interfaz

Para enseñar varios menús, empieza con **Anillos** y colores diferentes por botón. Deja el halo apagado hasta comprobar si ya se sigue bien el cursor. Añade el indicador solo en el material donde importe la rueda. Usa el foco si hay elementos que compiten por la atención y mantén el oscurecimiento lo bastante suave para leer el resto de la pantalla.

En programas de dibujo o diseño, el rastro puede explicar un arrastre. Un halo constante puede distraer cuando el puntero hace muchos movimientos pequeños. Compara un tramo corto con y sin halo antes de exportar.

## Consejos

- Prueba cada efecto por separado en un fragmento corto para saber cuál mejora la claridad.
- Asigna una función distinta a cada color y comprueba el contraste en la pantalla grabada.
- Usa una duración corta cuando haya muchos clics para que los anillos no se acumulen.
- Halo y foco pueden combinarse, pero ambos atraen la atención al cursor; baja su intensidad si el contenido pierde contraste.
- El movimiento reducido cambia la animación, no la cantidad de datos capturados.

## Limitaciones

Los efectos dependen de la telemetría capturada en modo de cursor editable. Los botones derecho y central alimentan los efectos visuales dedicados, pero no activan el rebote, el impacto ni el zoom automático, que continúan vinculados al clic izquierdo primario. La estela de arrastre requiere datos continuos registrados entre pulsar y soltar el botón.

Lee [cómo grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/) y las [novedades de Clipey 1.15](/blog/es/clipey-1-15-novedades/). Descarga Clipey desde la página de [descarga](/es/#download).

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
