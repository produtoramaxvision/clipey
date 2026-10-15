---
title: "Cómo anotar la pantalla durante una grabación"
description: "Conoce cómo se prevé usar el dibujo en vivo en Clipey 1.15, qué herramientas incluye y cómo revisar los trazos en el editor."
slug: "dibujar-en-vivo-durante-grabacion"
lang: "es"
translationKey: "desenho-ao-vivo-durante-gravacao"
category: "tutoriales"
tags: ["Grabación", "Edición con IA", "Windows"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 4
cover: "/blog/covers/desenho-ao-vivo-durante-gravacao.webp"
coverAlt: "Anotación dibujada sobre una grabación de pantalla"
ogImage: "/blog/og/desenho-ao-vivo-durante-gravacao.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15. El dibujo en vivo está previsto para grabaciones en Windows; excluir los trazos del video capturado depende de la protección de captura de Windows y aguarda validación final.

Para anotar la pantalla durante una grabación en Clipey, el flujo planificado utiliza el atajo global Ctrl+Shift+D para activar una barra de dibujo con lápiz, resaltador, flechas y figuras geométricas. Los trazos se registran como datos vectoriales temporizados fuera de los píxeles del video capturado, permitiendo su edición y sincronización en la línea de tiempo. Como esta función depende de la protección de captura de Windows y continúa en fase de validación técnica, utiliza esta guía como referencia para la funcionalidad proyectada.

## Antes de dibujar

Prepara una grabación de prueba breve y abre la aplicación o página que vas a mostrar. Los trazos se guardarían como vectores, con coordenadas normalizadas respecto de la superficie capturada y un tiempo relativo al inicio de la grabación. Así, el editor puede colocarlos sobre el video y mantenerlos alineados cuando recortes o aceleres un clip. No es tinta permanente en el escritorio ni una anotación independiente de la línea de tiempo.

El atajo global previsto para entrar al modo de dibujo es **Ctrl+Shift+D**. Este modo solo debería estar disponible durante una grabación activa, no mientras está pausada. El atajo se podrá configurar junto con las demás opciones de teclado. Como es global, comprueba que otra aplicación no use ya la misma combinación.

## Flujo previsto

1. Inicia una grabación y espera a que termine la cuenta regresiva. Mientras la captura esté activa, usa el atajo configurado; **Ctrl+Shift+D** es el valor predeterminado previsto.
2. Comprueba que aparezca el borde visible del modo de dibujo. Es importante: mientras esté activo, los movimientos del puntero crean marcas en vez de interactuar normalmente con el contenido de fondo.
3. Elige en la barra flotante una herramienta: lápiz, resaltador, flecha, rectángulo o elipse. Selecciona uno de los seis colores y uno de los tres grosores previstos; dibuja con intención y suelta para terminar el trazo.
4. Usa deshacer para quitar el último trazo. La opción de borrar elimina el conjunto actual cuando quieras empezar de nuevo; la especificación prevé un atajo distinto para esa acción. Pulsa **Esc** para salir del modo sin detener la grabación.
5. Vuelve a la entrada normal para usar la computadora y activa el modo de dibujo cuando lo necesites. Al detener la grabación, los trazos deberían guardarse con sus tiempos para que el editor los ubique en el momento correcto.
6. Abre la grabación en el editor y revisa el fragmento anotado. La sección **Drawings** (dibujos) prevista en el inspector permitirá controlar la capa e indicará si el activo no tiene trazos. Revisa la reproducción y también un fotograma detenido antes de exportar.

## Elige la herramienta según lo que explicas

El lápiz sirve para marcas libres y breves, por ejemplo, subrayar una palabra. El resaltador conviene para destacar una zona sin sugerir que sea un control. La flecha indica dirección; el rectángulo y la elipse delimitan una región. Elige un grosor que se lea en el tamaño final: una línea fina en tu monitor puede desaparecer en una exportación reducida.

Si necesitas precisión, dibuja despacio y haz una prueba. El suavizado previsto puede estabilizar el trazo, pero no convierte la escritura a mano en una figura geométrica perfecta. Para señalar un control pequeño, empieza la flecha fuera del objetivo y evita taparlo.

## Revisa el resultado en el editor

Los dibujos deberían reproducirse como una capa derivada de vectores, alineada con el tiempo de grabación. La opción **Drawings overlay** (superposición de dibujos) controlará si aparece la capa, su desvanecimiento y la animación progresiva del trazo. Comprueba que cada marca comience después del corte previsto y permanezca visible el tiempo suficiente para leerla. Si recortas o aceleras el fragmento, cambia el momento de aparición porque el dibujo sigue al video editado.

Una grabación sin trazos no debería mostrar controles que parezcan funcionales. Si el inspector presenta un estado vacío, vuelve a la grabación y confirma que entraste al modo y dibujaste durante el tiempo capturado. Activar una opción en el inspector no crea anotaciones retroactivas.

## Consejos

1. Marca solo lo necesario; muchos trazos a la vez compiten con la interfaz por la atención.
2. Mantén el color y el grosor dentro de una misma explicación para que se entienda qué elementos pertenecen al mismo tipo de énfasis.
3. Usa el borde visible como recordatorio de que el puntero está dibujando. Pulsa **Esc** para volver a hacer clic normalmente.
4. Reproduce el resultado después de recortar o cambiar la velocidad: los trazos siguen el tiempo editado.
5. Ensaya con material descartable y revisa la captura sin la capa en vivo antes de una demostración importante.

## Limitaciones

Esta guía describe la función prevista para Clipey 1.15 y debe confirmarse en la versión final. Excluir los trazos del video capturado depende de la protección de contenido de la captura de Windows; no des por hecho el mismo comportamiento en otras plataformas. El modo solo debería funcionar durante una grabación activa y cerrarse al detenerla o salir de la aplicación. Sirve para anotaciones temporales, no para dibujar en el escritorio fuera de una grabación.

Para entender la captura del cursor, lee [grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/) y [efectos de clic del mouse](/blog/es/efectos-mouse-clics-halo-foco/). Consulta las [funciones de Clipey](/es/#features) y revisa la [página de descarga](/es/#download).

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
