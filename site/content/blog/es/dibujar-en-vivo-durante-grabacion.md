---
title: "Cómo anotar la pantalla durante una grabación"
description: "Anota una grabación activa de Clipey 1.15 con la superposición protegida y revisa los trazos temporizados en el editor."
slug: "dibujar-en-vivo-durante-grabacion"
lang: "es"
translationKey: "desenho-ao-vivo-durante-gravacao"
category: "tutoriales"
tags: ["Grabación", "Edición con IA", "Windows"]
author: "Equipo Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 4
cover: "/blog/covers/desenho-ao-vivo-durante-gravacao.webp"
coverAlt: "Anotación dibujada sobre una grabación de pantalla"
ogImage: "/blog/og/desenho-ao-vivo-durante-gravacao.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15. El dibujo en vivo está disponible cuando Clipey puede proteger la superposición de la captura de pantalla. En Windows requiere Windows 11 22H2 (compilación 22621) o posterior; las versiones anteriores desactivan la superposición porque no permiten captura protegida con la ventana transparente y permeable a los clics. En macOS 26 también se desactiva la protección porque las ventanas protegidas no se muestran.

Para anotar durante una grabación en Clipey, usa el atajo global configurable **Ctrl+Shift+D** de forma predeterminada para abrir la superposición de dibujo protegida. Elige **Bolígrafo**, **Resaltador**, **Flecha**, **Rectángulo** o **Elipse**, un color y uno de los tres grosores. Los trazos se guardan con su tiempo, se excluyen de la pantalla capturada y se reproducen como una capa editable sincronizada con la línea de tiempo.

## Antes de dibujar

Prepara una grabación de prueba breve y abre la aplicación o página que vas a mostrar. Los trazos se guardan con coordenadas relativas a la superficie capturada y tiempos relativos al inicio de la grabación. Así, el editor los coloca sobre el video y los mantiene alineados cuando recortas o aceleras un clip. No es tinta permanente en el escritorio ni una anotación independiente de la línea de tiempo.

El atajo global predeterminado es **Ctrl+Shift+D** en Windows y **Command+Shift+D** en macOS; se puede cambiar en los ajustes de atajos. El modo de dibujo solo está disponible durante una grabación activa y no pausada. Como el atajo es global, puede que otra aplicación ya use la misma combinación.

## Flujo

1. Inicia una grabación y espera a que termine la cuenta regresiva. Mientras la captura esté activa, usa el atajo configurado; **Ctrl+Shift+D** es el valor predeterminado.
2. Comprueba que aparezca el borde visible del modo de dibujo. Es importante: mientras esté activo, los movimientos del puntero crean marcas en vez de interactuar normalmente con el contenido de fondo.
3. Elige en la barra flotante **Bolígrafo**, **Resaltador**, **Flecha**, **Rectángulo** o **Elipse**. Selecciona un color y uno de los tres grosores; dibuja con intención y suelta para terminar el trazo.
4. Usa **Deshacer** para quitar el último trazo o **Borrar** para eliminar los dibujos. Pulsa **Esc** para salir del modo sin detener la grabación. El atajo predeterminado para borrar es **Ctrl+Shift+X** en Windows y **Command+Shift+X** en macOS.
5. Vuelve a la entrada normal para usar la computadora y activa el modo de dibujo cuando lo necesites. Al detener la grabación, los trazos deberían guardarse con sus tiempos para que el editor los ubique en el momento correcto.
6. Abre la grabación en el editor y revisa el fragmento anotado en **Superposición de dibujos**. Usa **Mostrar dibujos**, **Desvanecimiento** y **Animar dibujo** para controlar la reproducción. El inspector también indica si no se grabaron dibujos. Revisa la reproducción y un fotograma detenido antes de exportar.

## Elige la herramienta según lo que explicas

El lápiz sirve para marcas libres y breves, por ejemplo, subrayar una palabra. El resaltador conviene para destacar una zona sin sugerir que sea un control. La flecha indica dirección; el rectángulo y la elipse delimitan una región. Elige un grosor que se lea en el tamaño final: una línea fina en tu monitor puede desaparecer en una exportación reducida.

Si necesitas precisión, dibuja despacio y haz una prueba. Las herramientas registran los trazos que haces, pero no convierten la escritura a mano en una figura geométrica perfecta. Para señalar un control pequeño, empieza la flecha fuera del objetivo y evita taparlo.

## Revisa el resultado en el editor

Los dibujos se reproducen como una superposición alineada con el tiempo de grabación. En **Superposición de dibujos**, **Mostrar dibujos** controla la visibilidad, **Desvanecimiento** define cuánto tiempo permanecen antes de desaparecer y **Animar dibujo** reproduce los trazos dinámicamente. Comprueba que cada marca comience después del corte previsto y permanezca visible el tiempo suficiente para leerla. Si recortas o aceleras el fragmento, cambia el momento de aparición porque el dibujo sigue al video editado.

Una grabación sin trazos no debería mostrar controles que parezcan funcionales. Si el inspector presenta un estado vacío, vuelve a la grabación y confirma que entraste al modo y dibujaste durante el tiempo capturado. Activar una opción en el inspector no crea anotaciones retroactivas.

## Consejos

1. Marca solo lo necesario; muchos trazos a la vez compiten con la interfaz por la atención.
2. Mantén el color y el grosor dentro de una misma explicación para que se entienda qué elementos pertenecen al mismo tipo de énfasis.
3. Usa el borde visible como recordatorio de que el puntero está dibujando. Pulsa **Esc** para volver a hacer clic normalmente.
4. Reproduce el resultado después de recortar o cambiar la velocidad: los trazos siguen el tiempo editado.
5. Ensaya con material descartable y revisa la captura sin la capa en vivo antes de una demostración importante.

## Limitaciones

Clipey solo crea la superposición cuando puede aplicar protección de contenido, que mantiene los trazos fuera de la pantalla grabada. Windows 11 22H2 (compilación 22621) o posterior cumple el requisito de ventana protegida permeable a los clics. En Windows 10 y Windows 11 21H2 o anteriores, la aplicación desactiva la superposición porque la protección impediría que esa ventana funcione; no graba trazos sin protección como alternativa. En macOS 26 tampoco está disponible porque las ventanas protegidas no se muestran. Otros sistemas deben permitir la captura protegida de pantalla. El dibujo está disponible durante una grabación activa y no pausada; la superposición se cierra al detener la grabación. Sirve para anotaciones temporales, no para dibujar en el escritorio fuera de una grabación.

Para entender la captura del cursor, lee [grabar la pantalla en Windows](/blog/es/grabar-pantalla-windows-cursor-clics/) y [efectos de clic del mouse](/blog/es/efectos-mouse-clics-halo-foco/). Consulta las [funciones de Clipey](/es/#features) y revisa la [página de descarga](/es/#download).

## Historial de esta página

- 2026-10-15: publicado.
