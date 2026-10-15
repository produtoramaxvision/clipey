---
title: "Clipey privacy: what stays on your PC"
description: "See which recording and transcription data Clipey processes locally, what diagnostic exports remove, and where external AI providers fit."
slug: "clipey-privacy-what-stays-on-your-pc"
lang: "en"
translationKey: "privacidade-no-clipey-o-que-fica-no-seu-pc"
category: "guides"
tags: ["Privacy", "Windows", "AI Editing"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 17
cover: "/blog/covers/privacidade-no-clipey-o-que-fica-no-seu-pc.webp"
coverAlt: "Privacy settings and local media workflow in Clipey"
ogImage: "/blog/og/privacidade-no-clipey-o-que-fica-no-seu-pc.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 for Windows.

“Local” is useful only when you know which part of a workflow it describes. Clipey records and edits on your PC, and speech recognition runs on-device. But some AI features can call an external provider, and a diagnostic bundle is still worth reviewing before you share it. This guide separates those cases so you can make a deliberate choice.

## Recording and project files

Screen recordings and project media are handled by the desktop app on your computer. Project documents refer to media files and keep editing state such as clips and captions. Keep the project and its source files together when moving it; the editor needs the referenced media to reproduce the result.

For transcription, Clipey uses its local speech model. The first use may need to prepare model files, and later work can reuse downloaded model assets from the local model directory. That is distinct from sending a recording to a hosted transcription service. Local processing does not mean the work is instant: longer material can take time depending on your PC.

## Know when an external provider is involved

Some AI operations use the provider configured in Clipey. Before asking for a generated result, check the selected provider and feature description. Do not assume every feature uses the on-device transcription path just because the editor is a desktop app. When you connect an outside MCP or AI client, that client’s own provider and data practices also apply.

## Handle diagnostic exports carefully

Diagnostics help investigate a problem, but they may contain information about your computer or a session. Before sharing a bundle, use the diagnostic export flow and inspect the included files. Do not assume every identifying detail or project content has been removed automatically: review the bundle and remove anything that is not needed to explain the issue.

1. Export diagnostics only when support or troubleshooting needs them.
2. Open the resulting archive and review its contents before attaching it to a report.
3. Remove unrelated files and redact secrets yourself if the bundle exposes any.
4. Share it only through the support channel you intended to use.

If the report concerns a transcription or editing failure, describe the steps to reproduce it and the app version. Avoid attaching a full recording when a short, non-sensitive example will do. If you need to share media, choose the file deliberately and make sure you have permission to share it.

## Tips

- Keep access tokens and provider credentials out of screenshots, project names, and support messages.
- Use local transcription when that is the selected path, and check the provider before invoking other AI features.
- Preserve original recordings separately if you need a recoverable source; an edited project is not a substitute for a backup.
- If a client connected through MCP uses its own AI provider, review that provider’s policy independently.

## Limitations

On-device transcription does not make every feature offline. Provider-backed AI requires the configured service and its own account or network access. Diagnostic contents vary with the issue being investigated; inspect the actual archive before sharing it.

For agent connections, read [MCP setup and permissions](/blog/en/clipey-ai-agents-mcp/). For the local recording workflow, see [getting started with Clipey](/blog/en/getting-started-with-clipey/). Review the [privacy overview](/en/#privacy).

Before sharing diagnostics, inspect the actual archive. [Download Clipey](/en/#download) to keep recordings and projects in your own workflow.

## Page history

- {{RELEASE_DATE}}: published.
