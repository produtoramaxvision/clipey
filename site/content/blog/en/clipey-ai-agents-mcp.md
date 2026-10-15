---
title: "Connect an AI agent to Clipey with MCP"
description: "Enable Clipey’s local MCP server, protect its access token, and choose a safe first request in Claude Code or another client."
slug: "clipey-ai-agents-mcp"
lang: "en"
translationKey: "clipey-com-agentes-de-ia-mcp"
category: "guides"
tags: ["AI Agents", "Privacy"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 16
cover: "/blog/covers/clipey-com-agentes-de-ia-mcp.webp"
coverAlt: "AI agent connected to a Clipey project through MCP"
ogImage: "/blog/og/clipey-com-agentes-de-ia-mcp.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 for Windows. Client setup varies by MCP client.

An MCP client can ask Clipey about a project and, when you allow it, use editing tools. The local server is not enabled by default, and editing permission is a separate switch. This guide covers the in-app HTTP server and the separately launched stdio server without assuming every client uses the same configuration screen.

## Choose a connection

The in-app server is useful when the agent should reach the Clipey instance you already have open. It uses a local URL, a port, and an access token. The stdio server is a separate process started by an MCP client or command-line workflow. Do not expose the local HTTP port to your network just to make setup easier.

## Enable the in-app server

1. Open Clipey’s AI settings and find **MCP server**.
2. Turn on **Enable MCP server**. Confirm that its status changes to **Running**.
3. Check the **Port** field and use **Apply** if you changed it.
4. Copy the **Access token** only into the MCP client’s local configuration. Keep it out of source control, prompts, screenshots, and shared notes.
5. Use the command shown in the app’s **Claude Code** or **Codex** section for that client. The in-app server provides commands for those clients; for Cursor, VS Code, or another host, follow that client’s MCP documentation and configure Clipey’s local URL and token without sharing the secret.
6. Reload the client and confirm it reports Clipey as connected. Start with a read-only question about the open project.
7. Leave **Allow MCP clients to edit your projects, record and export** off until you need those actions. If you enable it, review each change in the editor; edits are saved as they arrive.

The in-app server uses the local address, port, and access token shown in **MCP server**. The reveal control shows the token temporarily; **Copy** places it on the clipboard, and **Regenerate** invalidates the old token and disconnects clients using it. The access token is a credential: anyone who obtains it can connect as an MCP client, so update each local client configuration after rotation.

## Decide whether edits are allowed

The **Allow MCP clients to edit your projects, record and export** switch is off by default. While it is off, clients can read projects, but attempted edits, recordings, and exports are refused. Turn it on only for a workflow that needs those operations. Edits are saved as they land; an edit to the project open in the editor can be undone there.

Use small requests that are easy to inspect. Ask for a summary first, then request one change at a time. Review the project in Clipey after an edit rather than treating the agent’s confirmation as proof that the result looks right.

## Tips

- Keep the HTTP server bound to the local computer; do not forward its port to the internet or a shared network.
- Use the app’s **Copy** buttons for the displayed client commands, then store any token only in a private local setting.
- After regenerating the token, update each client’s local configuration; connections using the previous token will stop working.
- If a client stops connecting after token regeneration, replace its saved token and restart or reload that client.
- Start with the edit permission off and enable it only when necessary.
- Keep a project copy before a sequence of consequential edits.

## Limitations

MCP provides named tools, not unrestricted remote control of the desktop. The operations available depend on the registered tools, server mode, and edit permission. The stdio process and in-app HTTP server have different lifecycles. Content sent onward by an external AI client is governed by that client and provider, not only by Clipey’s local settings.

For details on data handling, read [what stays on your PC](/blog/en/clipey-privacy-what-stays-on-your-pc/). To prepare a checked output, see [export presets and verification](/blog/en/reliable-export-presets-verification/). Review the [AI features](/en/#ai).

After connecting, verify a simple read before enabling edits. [Download Clipey](/en/#download) to try the local workflow with a project you control.

## Page history

- {{RELEASE_DATE}}: published.
