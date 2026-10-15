---
title: "Graba la pantalla en Windows con cursor y clics"
description: "Elige el modo de cursor en el HUD, prepara los botones laterales y la rueda, y comprueba los eventos antes de terminar una demostración."
slug: "grabar-pantalla-windows-cursor-clics"
lang: "es"
translationKey: "gravar-tela-windows-com-cursor-e-cliques"
category: "tutoriales"
tags: ["Grabación", "Windows", "Edición con IA"]
author: "Equipo Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 2
cover: "/blog/covers/gravar-tela-windows-com-cursor-e-cliques.webp"
coverAlt: "Portada de la guía para grabar la pantalla en Windows"
ogImage: "/blog/og/gravar-tela-windows-com-cursor-e-cliques.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 en Windows. La captura de los botones laterales y la rueda depende del flujo de grabación de Windows.

Para grabar la pantalla en Windows con cursor y clics en Clipey, abre los controles de grabación en el HUD y selecciona Cursor editable antes de iniciar la captura. Esta modalidad registra el movimiento del puntero, los clics y el desplazamiento de la rueda en una pista de telemetría independiente de los píxeles del video. Durante la edición, puedes personalizar colores para cada botón, aplicar zoom automático suave y destacar el cursor sin alterar la imagen original grabada.

## 1. Elige cómo grabar el cursor

Usa el botón del cursor en el HUD para alternar entre **Cursor editable** y **Cursor del sistema**. **Cursor editable** guarda los datos del puntero por separado para que puedas cambiar su estilo y usar el movimiento en el zoom automático del editor. **Cursor del sistema** deja el puntero de Windows dentro de los píxeles capturados. Después no podrás separarlo para cambiar su aspecto ni usarlo para el zoom automático.

Para una demostración, el modo editable es práctico si luego querrás ajustar el tamaño o destacar el cursor. El modo del sistema puede bastar si el puntero no es importante. Decide antes de grabar y haz una prueba corta si no estás seguro.

## 2. Prepara una toma fácil de seguir

Cierra las ventanas que no formen parte de la explicación y empieza en la pantalla relevante. Mueve el cursor con intención en vez de recorrer áreas que no aportan contexto. Una pausa breve antes del clic da tiempo para ver el objetivo y el resultado. Es una técnica de presentación, no un ajuste automático de Clipey.

Si necesitas mostrar un menú contextual, un clic central o desplazamiento, apunta esos momentos para revisarlos después. La captura de Windows registra interacciones de botones laterales y de la rueda. Los datos del clic izquierdo siguen separados de los botones derecho y central para el rebote, el impacto y el zoom automático existentes.

## 3. Haz una grabación de prueba

1. Abre Clipey y comprueba la fuente de pantalla en la ventana de grabación.
2. Elige el modo del cursor con el control del HUD. Lee su ayuda para confirmar si está activo **Cursor editable** o **Cursor del sistema**.
3. Graba una secuencia breve: movimiento, clic izquierdo, derecho, central y desplazamiento si esos gestos son importantes.
4. Detén la grabación y ábrela en el editor. Comprueba el movimiento del cursor y que las interacciones aparezcan en los momentos esperados.
5. Graba la demostración completa solo después de comprobarlo. Si el cursor quedó integrado en el vídeo y necesitas efectos editables, vuelve a grabar con **Cursor editable**.

La prueba también permite ver si la explicación depende de un clic lateral. No tomes el sonido del clic como prueba suficiente: el audio y los datos visuales de interacción son elementos distintos.

## 4. Distingue los eventos durante la edición

Los clics laterales están destinados a los nuevos efectos visuales por botón. No deberían activar el rebote, el impacto ni el zoom automático existentes, que siguen ligados al clic izquierdo. El desplazamiento tiene sus propios datos y puede alimentar el indicador de rueda; no equivale a una secuencia de clics.

En un tutorial de menús, confirma primero que exista el evento. Después decide si necesitas destacar el cursor, mostrar un efecto de clic o indicar el desplazamiento. Varias señales a la vez pueden tapar el texto de la aplicación. Consulta [efectos de mouse](/blog/es/efectos-mouse-clics-halo-foco/) y las [novedades de Clipey 1.15](/blog/es/clipey-1-15-novedades/).

## Consejos

- Elige **Cursor editable** si la posición del puntero forma parte de la explicación y podrías ajustarla más tarde.
- Lleva el cursor al control, haz una pausa y luego pulsa.
- Desplázate en pasos que acompañen la narración, no de golpe por toda la página.
- Revisa la toma a velocidad normal y pausada; las entradas rápidas pueden pasar inadvertidas.
- Si faltan los datos esperados, repite la prueba antes de dedicar tiempo a editar.

## Limitaciones

El cursor del sistema forma parte de la imagen capturada y no se puede editar por separado. La captura de botones laterales y rueda es específica de Windows. El modo editable necesita telemetría del cursor; no recupera datos de una grabación antigua que se hizo sin ellos.

## Preguntas frecuentes

### ¿Puedo cambiar el cursor del sistema a cursor editable después de grabar?
No. El modo de cursor del sistema incrusta el puntero directamente en los píxeles del video capturado, por lo que resulta imposible separarlo o cambiar su aspecto una vez finalizada la grabación.

### ¿Clipey registra clics con el botón derecho y la rueda del ratón en Windows?
Sí. En Windows, grabar en modo de cursor editable captura clics izquierdos, derechos, centrales y desplazamientos de rueda como eventos de telemetría independientes.

### ¿La superposición de teclas registra todo lo que escribo en el teclado?
No. La superposición opcional de teclas filtra la escritura ordinaria y muestra exclusivamente atajos y teclas de navegación, protegiendo contraseñas y textos personales.

Empieza un proyecto desde la página de [descarga](/es/#download).

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
