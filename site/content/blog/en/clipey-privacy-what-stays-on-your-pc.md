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

In Clipey, your screen recordings, timeline edits, and Whisper speech transcriptions process entirely on your local Windows PC without sending video or audio to cloud servers. External network requests occur only when you choose to configure third-party AI models or publish directly to social networks. Diagnostic bundles generated for troubleshooting do not include video recordings and should always be manually inspected before sharing.

## Recording and project files

Screen recordings, camera feeds and imported media assets are processed exclusively by the desktop application on your local machine. Clipey project files do not package copies of your video files into monolithic archives; instead, they store lightweight project documents that reference source video and audio paths alongside your edits, trim points, and caption tracks. When moving a project to another folder or storage drive, always keep the original media files together with the project file so the editor can continue to reference them.

This separation protects your original takes from accidental alteration. Your recorded video remains unmodified on disk, while all cuts, zooms, and audio adjustments exist as instructions within the project file. If you decide to clean up storage, ensure you preserve both the project file and its source media until you are certain you no longer need to re-render the footage.

For speech recognition, Clipey runs a local Whisper speech-to-text engine directly on your hardware. On the first run, the necessary speech model assets are downloaded and stored in your local application directory under the user data path. Subsequent transcription runs access these local model files without initiating remote connections. Processing locally ensures privacy for sensitive audio, though transcription speed depends entirely on your CPU and GPU capabilities.

## Know when an external provider is involved

Some generative features, such as remote voice dubbing or external large language model assistance, rely on third-party cloud APIs that you choose to configure. Before requesting a cloud-based action, review the selected provider in Clipey Studio. Do not assume all AI operations stay on-device simply because the application runs locally on Windows.

When connecting an external client or agent host through the Model Context Protocol (MCP), that client operates under its own authentication and privacy terms. Any credentials, API keys, or bearer tokens used to configure external models should be treated as private secrets: never include them in screenshot captures, public issues, or shared project files. Distinguishing between on-device operations (like local transcription) and cloud calls ensures you stay in control of your data flow.

## Handle diagnostic exports carefully

Diagnostics help troubleshoot application issues, but raw log bundles can include system paths, machine identifiers, or configuration details. Before sending diagnostic archives to support, generate the export package locally and review its contents. Do not assume every identifying string or username has been stripped automatically; perform a quick manual review to ensure no unnecessary details are shared.

1. Export diagnostics only when investigating a specific crash or playback fault.
2. Open the resulting zip bundle and review the log files before attaching them.
3. Remove unrelated session logs and redact personal folder paths or tokens if present.
4. Transmit diagnostic packages only through official support channels.

If an inquiry concerns an export mismatch or delivery warning, describe the resolution settings and timeline structure instead of sharing full project footage. When troubleshooting transcription errors, sharing a short, disposable audio clip is often sufficient to pinpoint the problem without exposing private recordings.

## Tips

- Keep access tokens and provider credentials out of screenshots, project names, and support messages.
- Use local transcription when that is the selected path, and check the provider before invoking other AI features.
- Preserve original recordings separately if you need a recoverable source; an edited project is not a substitute for a backup.
- If a client connected through MCP uses its own AI provider, review that provider’s policy independently.
- Check the contents of your models directory periodically if managing disk space on secondary drives.

## Limitations

On-device transcription does not make every feature offline. Provider-backed AI requires the configured service and its own account or network access. Diagnostic contents vary with the issue being investigated; inspect the actual archive before sharing it. Automatic diagnostic redaction remains in technical verification, making manual inspection essential.

For agent connections, read [MCP setup and permissions](/blog/en/clipey-ai-agents-mcp/). For the local recording workflow, see [getting started with Clipey](/blog/en/getting-started-with-clipey/). Review the [privacy overview](/en/#privacy).

Before sharing diagnostics, inspect the actual archive. [Download Clipey](/en/#download) to keep recordings and projects in your own workflow.

## Page history

- {{RELEASE_DATE}}: published.
