---
title: "Edición con IA: recorta pausas y añade zooms útiles"
description: "Pide cambios concretos al agente de Clipey y revisa cortes y zooms con la transcripción y la timeline antes de exportar."
slug: "edicion-ia-cortes-zooms-silencios"
lang: "es"
translationKey: "edicao-com-ia-cortes-zooms-silencio"
category: "tutoriales"
tags: ["Edición con IA", "Grabación", "Atajos"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 7
cover: "/blog/covers/edicao-com-ia-cortes-zooms-silencio.webp"
coverAlt: "Editor de video de Clipey con la transcripción y la timeline abiertas"
ogImage: "/blog/og/edicao-com-ia-cortes-zooms-silencio.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 en Windows.

Para editar grabaciones con IA en Clipey, utiliza el agente integrado para convertir instrucciones en lenguaje natural en cortes precisos en la línea de tiempo, recortes de silencios y aproximaciones con zoom. El sistema analiza la transcripción generada localmente y la telemetría del cursor para localizar momentos clave sin enviar tus archivos a la nube. Tienes el control total para revisar cada corte sugerido, reajustar palabras en el panel de transcripción y confirmar las transiciones antes de exportar.

## Prepara el proyecto

1. Abre la grabación en el editor y espera a que cargue el medio. Para solicitudes basadas en lo que se dijo, transcribe el audio primero. El panel de transcripción ofrece **Transcribir** cuando todavía no hay texto generado. La transcripción aporta contexto al agente, pero no reemplaza la revisión del video.
2. Abre la conversación del agente en el editor. Si el proyecto no tiene transcripción, empieza con una solicitud visual o transcribe antes de pedir que quite pausas habladas.
3. Indica un objetivo cada vez. Por ejemplo: “quita la pausa larga después de la explicación y acerca el zoom cuando muestre el menú”. Una instrucción localizada es más fácil de verificar que pedir, de forma general, que todo el video sea más dinámico.

El agente puede realizar operaciones de edición como cortes y zooms, además de recortar silencios y reducir pausas. Si tu proyecto incluye música de fondo, activa **Claridad de voz** en el inspector de audio para atenuar frecuencias medias de la música y resaltar la voz hablada. No des por hecho que todo silencio sobra: una voz baja, una respiración o una pausa intencional pueden ser importantes para el sentido y el ritmo.

## Revisa los cortes con la transcripción

Cuando el agente proponga un cambio, busca el tramo afectado y reproduce unos segundos antes y después. La transcripción ayuda a encontrar palabras; la timeline muestra el intervalo eliminado. Si una palabra queda cortada, restaura o ajusta el corte en lugar de confiar únicamente en el texto. En el panel de transcripción puedes seleccionar palabras y crear un recorte del intervalo correspondiente.

Revisa también el principio y el final. Quitar una pausa entre frases puede hacer el discurso más ágil, pero los cortes demasiado ajustados dificultan seguir un tutorial. Deja tiempo para leer los menús y observar el resultado de cada acción.

## Usa el zoom para explicar un detalle

Pide un zoom cuando haya un objetivo claro, como un botón o una zona de la interfaz. El recorrido de zoom automático existente utiliza los datos disponibles del cursor; no sabe por sí solo qué detalle es importante para la explicación. Comprueba el encuadre y el foco en la vista previa. Si el cursor no está sobre el control que quieres enseñar, mueve el foco o ajusta el zoom manualmente.

En una demostración, muestra primero la pantalla completa, acércate cuando aparezca el control y vuelve después al plano general. Así la audiencia conserva el contexto. En grabaciones con varios monitores o interfaces densas, comprueba que el zoom no recorte etiquetas necesarias.

## Consejos para pedir cambios claros

- Nombra la acción y su contexto: “quita la pausa entre estas dos frases” se puede verificar mejor que “hazlo más rápido”.
- Separa la limpieza de audio de los cambios visuales. Si el ritmo empeora, será más sencillo identificar qué modificación lo causó.
- Escucha el montaje. Un corte que parece correcto en la forma de onda puede quitar una consonante o una respiración natural.
- Usa la transcripción como ayuda de navegación, no como garantía de reconocimiento perfecto.
- Reproduce el resultado entero y revisa las transiciones alrededor de los cambios antes de exportar.

## Limitaciones

El agente depende del contexto disponible y puede interpretar una instrucción de manera distinta a la prevista. La eliminación automática de silencios no decide por ti el ritmo ni el valor de una pausa dramática. El zoom automático ligado al cursor sigue sus datos; no reconoce semánticamente el contenido de la pantalla. Revisa la transcripción y el montaje, sobre todo con voces superpuestas, ruido o términos técnicos.

Para sugerencias a partir de una grabación larga, consulta [cómo revisar clips cortos](/blog/es/auto-clip-shorts-de-videos-largos/). Para mantener a una persona dentro de un encuadre vertical, lee [reenfoque vertical por rostro](/blog/es/reenfoque-vertical-por-rostro/). También puedes explorar las [funciones de Clipey](/es/#features).

Como siguiente paso, prueba un cambio concreto en una grabación corta y reproduce ese fragmento antes de solicitar más modificaciones.

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
