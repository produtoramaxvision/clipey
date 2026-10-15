---
title: "Privacidad en Clipey: qué queda en tu PC"
description: "Conoce qué datos de grabación y transcripción se procesan localmente, qué debes revisar en los diagnósticos y cuándo interviene una IA externa."
slug: "privacidad-clipey-que-queda-en-tu-pc"
lang: "es"
translationKey: "privacidade-no-clipey-o-que-fica-no-seu-pc"
category: "guias"
tags: ["Privacidad", "Windows", "Edición con IA"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 17
cover: "/blog/covers/privacidade-no-clipey-o-que-fica-no-seu-pc.webp"
coverAlt: "Ajustes de privacidad y flujo multimedia local en Clipey"
ogImage: "/blog/og/privacidade-no-clipey-o-que-fica-no-seu-pc.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 para Windows.

Decir que algo es local solo resulta útil si sabes a qué parte del proceso se refiere. Clipey graba y edita en tu PC, y el reconocimiento de voz se ejecuta en el dispositivo. Sin embargo, algunas funciones de IA pueden usar un proveedor externo y conviene revisar un paquete de diagnóstico antes de compartirlo. Aquí se distinguen esos casos para que puedas decidir con criterio.

## Grabaciones y archivos del proyecto

La aplicación de escritorio procesa las grabaciones de pantalla y el material del proyecto en tu ordenador. Los documentos del proyecto hacen referencia a los archivos multimedia y guardan el estado de edición, como los clips y los subtítulos. Si trasladas un proyecto, conserva también sus archivos de origen: el editor los necesita para reconstruir el resultado.

Para transcribir, Clipey utiliza un modelo de voz local. El primer uso puede requerir preparar archivos del modelo; después, el programa puede reutilizar esos recursos descargados desde la carpeta local de modelos. Esto no equivale a enviar la grabación a un servicio alojado. El procesamiento local tampoco es instantáneo: un vídeo largo puede tardar según el ordenador.

## Comprueba cuándo interviene un proveedor externo

Algunas operaciones de IA utilizan el proveedor configurado en Clipey. Antes de solicitar un resultado, comprueba qué proveedor y función están seleccionados. No des por hecho que todas las herramientas usan la ruta de transcripción local solo porque el editor sea una aplicación de escritorio. Si conectas otro cliente de IA o MCP, también se aplican las prácticas de ese cliente y su proveedor.

## Trata con cuidado las exportaciones de diagnóstico

Los diagnósticos ayudan a investigar problemas, pero pueden incluir información del equipo o de una sesión. Antes de compartir un paquete, usa el flujo de exportación y revisa los archivos incluidos. En el árbol de código de esta versión 1.15, las reglas ampliadas para ocultar claves de API, tokens bearer y OAuth, correos electrónicos, nombres de usuario de Windows en rutas y texto transcrito están especificadas para el sistema de diagnóstico, pero todavía no aparecen en la implementación publicada. No confíes en una redacción aún no verificada para omitir la revisión.

1. Exporta diagnósticos solo cuando sean necesarios para soporte o resolución de problemas.
2. Abre el archivo generado y revisa su contenido antes de adjuntarlo.
3. Retira archivos que no hagan falta y oculta manualmente cualquier secreto que encuentres.
4. Envíalo únicamente por el canal de soporte que pretendías utilizar.

## Consejos

- No incluyas tokens de acceso ni credenciales de proveedores en capturas, nombres de proyecto o mensajes de soporte.
- Usa la transcripción local cuando esa sea la opción seleccionada y revisa el proveedor antes de invocar otras funciones de IA.
- Conserva las grabaciones originales por separado si necesitas una fuente recuperable; el proyecto editado no es una copia de seguridad.
- Si un cliente MCP utiliza su propio proveedor de IA, revisa por separado las condiciones de ese proveedor.

## Limitaciones

La transcripción en el dispositivo no significa que todas las funciones trabajen sin conexión. La IA de proveedores requiere el servicio configurado y puede necesitar cuenta o conexión. La redacción avanzada de diagnósticos figura como trabajo en curso en el árbol de esta versión; no se debe dar por disponible hasta que se confirme en una versión integrada.

Para conectar agentes, consulta [configuración y permisos MCP](/blog/es/clipey-agentes-ia-mcp/). Para empezar con una grabación local, lee [primeros pasos con Clipey](/blog/es/primeros-pasos-con-clipey/). Revisa la [información de privacidad](/es/#privacidad).

Antes de compartir diagnósticos, inspecciona el archivo real. [Descarga Clipey](/es/#descargar) para trabajar con grabaciones y proyectos en tu propio flujo.

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
