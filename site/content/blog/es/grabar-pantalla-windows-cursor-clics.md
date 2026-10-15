---
title: "Graba la pantalla en Windows con cursor y clics"
description: "Elige el modo de cursor en el HUD, prepara los botones laterales y la rueda, y comprueba los eventos antes de terminar una demostración."
slug: "grabar-pantalla-windows-cursor-clics"
lang: "es"
translationKey: "gravar-tela-windows-com-cursor-e-cliques"
category: "tutoriales"
tags: ["Grabación", "Windows", "Edición con IA"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 2
cover: "/blog/covers/gravar-tela-windows-com-cursor-e-cliques.webp"
coverAlt: "Portada de la guía para grabar la pantalla en Windows"
ogImage: "/blog/og/gravar-tela-windows-com-cursor-e-cliques.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 en Windows. La captura de los botones laterales y la rueda depende del flujo de grabación de Windows y espera la validación final.

Una demostración de software puede mostrar el movimiento del cursor y aun así no dejar claro dónde hiciste clic o hacia dónde desplazaste la página. Prepara la captura según lo que quieres enseñar y comprueba los eventos antes de grabar la toma definitiva.

## 1. Elige cómo grabar el cursor

Usa el botón del cursor en el HUD para alternar entre **Editable cursor** y **System cursor**. **Editable cursor** guarda los datos del puntero por separado para que puedas cambiar su estilo y usar el movimiento en el zoom automático del editor. **System cursor** deja el puntero de Windows dentro de los píxeles capturados. Después no podrás separarlo para cambiar su aspecto ni usarlo para el zoom automático.

Para una demostración, el modo editable es práctico si luego querrás ajustar el tamaño o destacar el cursor. El modo del sistema puede bastar si el puntero no es importante. Decide antes de grabar y haz una prueba corta si no estás seguro.

## 2. Prepara una toma fácil de seguir

Cierra las ventanas que no formen parte de la explicación y empieza en la pantalla relevante. Mueve el cursor con intención en vez de recorrer áreas que no aportan contexto. Una pausa breve antes del clic da tiempo para ver el objetivo y el resultado. Es una técnica de presentación, no un ajuste automático de Clipey.

Si necesitas mostrar un menú contextual, un clic central o desplazamiento, apunta esos momentos para revisarlos después. La captura de Windows prevista para 1.15 registra interacciones de botones laterales y de la rueda. Los datos del clic izquierdo siguen separados de los botones derecho y central para el rebote, el impacto y el zoom automático existentes.

## 3. Haz una grabación de prueba

1. Abre Clipey y comprueba la fuente de pantalla en la ventana de grabación.
2. Elige el modo del cursor con el control del HUD. Lee su ayuda para confirmar si está activo **Editable cursor** o **System cursor**.
3. Graba una secuencia breve: movimiento, clic izquierdo, derecho, central y desplazamiento si esos gestos son importantes.
4. Detén la grabación y ábrela en el editor. Comprueba el movimiento del cursor y que las interacciones aparezcan en los momentos esperados.
5. Graba la demostración completa solo después de comprobarlo. Si el cursor quedó integrado en el vídeo y necesitas efectos editables, vuelve a grabar con **Editable cursor**.

La prueba también permite ver si la explicación depende de un clic lateral. No tomes el sonido del clic como prueba suficiente: el audio y los datos visuales de interacción son elementos distintos.

## 4. Distingue los eventos durante la edición

Los clics laterales están destinados a los nuevos efectos visuales por botón. No deberían activar el rebote, el impacto ni el zoom automático existentes, que siguen ligados al clic izquierdo. El desplazamiento tiene sus propios datos y puede alimentar el indicador de rueda; no equivale a una secuencia de clics.

En un tutorial de menús, confirma primero que exista el evento. Después decide si necesitas destacar el cursor, mostrar un efecto de clic o indicar el desplazamiento. Varias señales a la vez pueden tapar el texto de la aplicación. Consulta [efectos de mouse](/blog/es/efectos-mouse-clics-halo-foco/) y las [novedades de Clipey 1.15](/blog/es/clipey-1-15-novedades/).

## Consejos

- Elige **Editable cursor** si la posición del puntero forma parte de la explicación y podrías ajustarla más tarde.
- Lleva el cursor al control, haz una pausa y luego pulsa.
- Desplázate en pasos que acompañen la narración, no de golpe por toda la página.
- Revisa la toma a velocidad normal y pausada; las entradas rápidas pueden pasar inadvertidas.
- Si faltan los datos esperados, repite la prueba antes de dedicar tiempo a editar.

## Limitaciones

El cursor del sistema forma parte de la imagen capturada y no se puede editar por separado. La captura de botones laterales y rueda es específica de Windows y sigue pendiente de validación final para esta documentación de 1.15. El modo editable necesita telemetría del cursor; no recupera datos de una grabación antigua que se hizo sin ellos.

Empieza un proyecto desde la página de [descarga](/es/#download).

## Historial de esta página

- {{RELEASE_DATE}}: published.
