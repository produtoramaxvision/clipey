---
title: "Conecta un agente de IA a Clipey con MCP"
description: "Activa el servidor MCP local de Clipey, protege el token de acceso y prueba una primera solicitud en Claude Code u otro cliente."
slug: "clipey-agentes-ia-mcp"
lang: "es"
translationKey: "clipey-com-agentes-de-ia-mcp"
category: "guias"
tags: ["Agentes de IA", "Privacidad"]
author: "Equipo Clipey"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 16
cover: "/blog/covers/clipey-com-agentes-de-ia-mcp.webp"
coverAlt: "Agente de IA conectado a un proyecto de Clipey mediante MCP"
ogImage: "/blog/og/clipey-com-agentes-de-ia-mcp.png"
appliesTo: "1.15"
---

> **Aplica a:** Clipey 1.15 para Windows. La configuración depende del cliente MCP.

Para conectar un agente de IA a Clipey mediante MCP, abre la sección Servidor MCP en los ajustes del editor y activa el servidor HTTP local o configura el transporte por stdio en tu cliente de preferencia (como Claude Code o Codex). La integración opera en 127.0.0.1 mediante autenticación por token de acceso, manteniendo los permisos de edición desactivados por defecto para lectura segura del proyecto. Al habilitar los permisos de escritura, el agente puede inspeccionar archivos, realizar recortes en la línea de tiempo y solicitar exportaciones locales.

## Elige la conexión

El servidor integrado sirve cuando quieres que el agente se conecte a la instancia de Clipey que ya tienes abierta. Usa una URL local, un puerto y un token de acceso. El servidor stdio, en cambio, es un proceso independiente que inicia el cliente MCP o un flujo de línea de comandos. No expongas el puerto HTTP local a la red para facilitar la configuración.

## Activa el servidor integrado

1. Abre los ajustes de IA de Clipey y busca **Servidor MCP**.
2. Activa **Activar servidor MCP** para usar HTTP. Comprueba que el estado cambie a **En ejecución** y revisa el campo **Puerto**.
3. Usa el comando que aparece en la sección **Claude Code** o **Codex**, según el cliente. El servidor integrado ofrece comandos para esos dos clientes; para Cursor, VS Code u otro host, consulta su documentación MCP y configura la URL local y el token sin compartir el secreto.
4. Recarga el cliente y comprueba que indique que Clipey está conectado. Empieza con una pregunta de lectura sobre el proyecto abierto.
5. Deja desactivada la opción **Permitir que los clientes MCP editen tus proyectos, graben y exporten** hasta que necesites esas acciones. Si la activas, revisa cada cambio en el editor: se guarda en cuanto llega.

El servidor integrado utiliza la dirección local, el puerto y el token que muestra **Servidor MCP**. El control para mostrar el token lo revela temporalmente; **Copiar** lo envía al portapapeles y **Regenerar** invalida el anterior y desconecta los clientes que lo usaban. El token es una credencial: quien lo obtenga puede conectarse como cliente MCP. Actualiza el secreto guardado en cada configuración local tras regenerarlo.

## Decide si permites cambios

La opción **Permitir que los clientes MCP editen tus proyectos, graben y exporten** está desactivada inicialmente. Mientras siga así, los clientes pueden leer proyectos, pero se rechazan los intentos de editar, grabar o exportar. Actívala solo si el flujo necesita esas operaciones. Los cambios se guardan a medida que se aplican; puedes deshacer en el editor un cambio al proyecto que está abierto.

Haz solicitudes pequeñas que puedas revisar. Pide primero un resumen y luego un cambio cada vez. Después de editar, comprueba el proyecto visualmente en Clipey; la confirmación del agente no demuestra que el resultado sea correcto.

## Consejos

- Mantén el servidor HTTP en el ordenador local; no reenvíes el puerto a Internet ni a una red compartida.
- Usa los botones **Copiar** para los comandos que muestra la aplicación y guarda el token solo en una configuración local privada.
- Después de regenerar el token, actualiza la configuración local de cada cliente; las conexiones con el secreto anterior dejarán de funcionar.
- Si el cliente deja de conectarse tras regenerar el token, reemplaza el secreto guardado y reinicia o recarga el cliente.
- Empieza con el permiso de edición desactivado y actívalo solo cuando haga falta.
- Conserva una copia del proyecto antes de una serie de cambios importantes.

## Limitaciones

MCP ofrece herramientas concretas, no control remoto ilimitado del escritorio. Las operaciones dependen de las herramientas registradas, del modo del servidor y del permiso de edición. El proceso stdio y el servidor HTTP integrado tienen ciclos de vida distintos. El uso que un cliente externo de IA haga del contenido se rige por ese cliente y su proveedor, no solo por los ajustes locales de Clipey.

Para conocer el tratamiento de datos, lee [qué permanece en tu PC](/blog/es/privacidad-clipey-que-queda-en-tu-pc/). Para preparar un archivo revisado, consulta [presets y verificación de exportación](/blog/es/exportacion-fiable-presets-verificacion/). Mira las [funciones de IA](/es/#ia).

Tras conectar el cliente, prueba una consulta de lectura antes de permitir cambios. [Descarga Clipey](/es/#descargar) para probar el flujo local con un proyecto propio.

## Historial de esta página

- {{RELEASE_DATE}}: publicado.
