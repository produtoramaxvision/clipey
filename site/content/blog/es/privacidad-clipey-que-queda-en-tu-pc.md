---
title: "Privacidad en Clipey: qué queda en tu PC"
description: "Conoce qué datos de grabación y transcripción se procesan localmente, qué debes revisar en los diagnósticos y cuándo interviene una IA externa."
slug: "privacidad-clipey-que-queda-en-tu-pc"
lang: "es"
translationKey: "privacidade-no-clipey-o-que-fica-no-seu-pc"
category: "guias"
tags: ["Privacidad", "Windows", "Edición con IA"]
author: "Equipo Clipey"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 17
cover: "/blog/covers/privacidade-no-clipey-o-que-fica-no-seu-pc.webp"
coverAlt: "Ajustes de privacidad y flujo multimedia local en Clipey"
ogImage: "/blog/og/privacidade-no-clipey-o-que-fica-no-seu-pc.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 para Windows.

En Clipey, las grabaciones de pantalla, las ediciones en la línea de tiempo y las transcripciones de voz con modelos Whisper se procesan íntegramente en tu computadora Windows sin enviar audio ni video a servidores en la nube. Las solicitudes externas se limitan a los proveedores de IA que decidas configurar expresamente o al publicar en redes sociales. Los paquetes de diagnóstico generados para soporte técnico no incluyen videos y deben revisarse manualmente antes de enviarlos para proteger datos del sistema.

## Grabaciones y archivos del proyecto

La aplicación de escritorio procesa las grabaciones de pantalla y el material del proyecto en tu ordenador. Los documentos del proyecto hacen referencia a los archivos multimedia y guardan el estado de edición, como los clips y los subtítulos. Si trasladas un proyecto, conserva también sus archivos de origen: el editor los necesita para reconstruir el resultado.

Para transcribir, Clipey utiliza un modelo de voz local. El primer uso puede requerir preparar archivos del modelo; después, el programa puede reutilizar esos recursos descargados desde la carpeta local de modelos. Esto no equivale a enviar la grabación a un servicio alojado. El procesamiento local tampoco es instantáneo: un vídeo largo puede tardar según el ordenador.

## Comprueba cuándo interviene un proveedor externo

Algunas operaciones de IA utilizan el proveedor configurado en Clipey. Antes de solicitar un resultado, comprueba qué proveedor y función están seleccionados. No des por hecho que todas las herramientas usan la ruta de transcripción local solo porque el editor sea una aplicación de escritorio. Si conectas otro cliente de IA o MCP, también se aplican las prácticas de ese cliente y su proveedor.

## Trata con cuidado las exportaciones de diagnóstico

Los diagnósticos ayudan a investigar problemas. Antes de escribir el paquete, Clipey oculta automáticamente secretos reconocidos, tokens bearer y OAuth, correos electrónicos, nombres de usuario de Windows en rutas y texto de transcripciones. La transcripción se excluye de forma predeterminada; puedes elegir incluirla al exportar. La redacción se basa en patrones y no elimina toda información identificable, así que revisa el archivo antes de compartirlo.

1. Exporta diagnósticos solo cuando sean necesarios para soporte o resolución de problemas.
2. Abre el archivo generado y revisa su contenido antes de adjuntarlo.
3. Confirma que la transcripción se haya incluido solo si es necesaria y retira cualquier dato identificable que siga presente.
4. Envíalo únicamente por el canal de soporte que pretendías utilizar.

## Consejos

- No incluyas tokens de acceso ni credenciales de proveedores en capturas, nombres de proyecto o mensajes de soporte.
- Usa la transcripción local cuando esa sea la opción seleccionada y revisa el proveedor antes de invocar otras funciones de IA.
- Conserva las grabaciones originales por separado si necesitas una fuente recuperable; el proyecto editado no es una copia de seguridad.
- Si un cliente MCP utiliza su propio proveedor de IA, revisa por separado las condiciones de ese proveedor.

## Limitaciones

La transcripción en el dispositivo no significa que todas las funciones trabajen sin conexión. La IA de proveedores requiere el servicio configurado y puede necesitar cuenta o conexión. La redacción automática solo reconoce ciertos patrones de secretos y rutas; no garantiza anonimizar todo el paquete. Comprueba el archivo exportado antes de compartirlo.

Para conectar agentes, consulta [configuración y permisos MCP](/blog/es/clipey-agentes-ia-mcp/). Para empezar con una grabación local, lee [primeros pasos con Clipey](/blog/es/primeros-pasos-con-clipey/). Revisa la [información de privacidad](/es/#privacidad).

Antes de compartir diagnósticos, inspecciona el archivo real. [Descarga Clipey](/es/#descargar) para trabajar con grabaciones y proyectos en tu propio flujo.

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
