---
title: "Clipey 1.15: what’s new in recording and editing"
description: "Explore Clipey 1.15 recording and editing features, where to find them, and which workflows have platform requirements."
slug: "clipey-1-15-whats-new"
lang: "en"
translationKey: "clipey-1-15-novidades"
category: "news"
tags: ["Recording", "AI editing", "Export"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: true
order: 1
cover: "/blog/covers/clipey-1-15-novidades.webp"
coverAlt: "Cover introducing Clipey 1.15 changes"
ogImage: "/blog/og/clipey-1-15-novidades.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15. Windows-specific recording features and live drawing's protected-overlay requirement are noted below.

Clipey 1.15 delivers editable cursor recording with button-specific mouse effects, live gamepad overlay for gameplay, timeline productivity shortcuts, and automated short clip generation. The release also integrates subtitle and link importing, local Model Context Protocol (MCP) server support for AI agents, and reliable export presets with post-render stream verification. All screen capture, editing, and transcription workflows run directly on your Windows PC without transmitting video to remote servers.

## Start with the cursor choice

The HUD cursor control switches between **Editable cursor** and **System cursor**. Editable mode records cursor telemetry separately so you can restyle it, show click effects, and use it for auto-zoom in the editor. System mode records the actual cursor in the video pixels; it cannot be restyled or used for auto-zoom. For tutorials where clicks need emphasis, editable mode provides the most flexible foundation.

On Windows, recording interaction data captures side-button clicks and wheel scrolling alongside pointer movement. The right and middle buttons feed the new visual effects (double ring and square ring), while existing click bounce, impact and auto-zoom behaviors remain left-click-only. That distinction matters: visual cues for auxiliary clicks clarify viewer orientation without triggering unintended editing commands.

## Add context in the editor

Mouse effects combine button-specific click animations (**Ripple**, **Rings**, **Pulse**), a scroll indicator, a drag trail, a cursor halo and a spotlight. **Reduced motion** replaces travel animations with a short opacity fade. Start with one or two effects: excessive halo and dark spotlight can compete with text underneath.

Live drawing adds timed annotations during an active recording through a protected overlay. The default global shortcut is **Ctrl+Shift+D**; the floating toolbar offers **Pen**, **Highlighter**, **Arrow**, **Rectangle** and **Ellipse**, plus color and stroke-width controls. Protected strokes stay out of the captured screen and replay in the editor. On Windows the overlay requires Windows 11 22H2 (build 22621) or later; earlier builds disable it because protected click-through capture is unavailable. The overlay is also disabled on macOS 26 because protected windows are not displayed there.

For gameplay, the **Gamepad overlay** displays pressed buttons as compact labels in **Compact** style or as a controller silhouette in **Full** style. The full layout can also display stick positions with **Show thumbsticks**. Its events follow the edited video timeline, ensuring trims and speed changes keep input precisely aligned with footage.

## Make timeline work more precise

Holding **Shift** while dragging or trimming temporarily bypasses snapping and displays **Snapping disabled (Shift)** in the timeline. The context menu on clips and modifier pills exposes standard actions like **Split / Cut**, **Duplicate** and **Delete** with keyboard shortcut hints. Pressing **M** adds named **Timeline markers** at the playhead for swift navigation, while double-clicking a panel divider resets it to default proportions.

Use Shift for a one-off placement that should not snap. Use a marker when you want to revisit a moment later. A marker identifies a time; it does not remove or split the underlying video by itself.

## A short test before a finished project

1. Start a brief Windows recording and choose **Editable cursor** if you plan to reposition or emphasize the pointer later.
2. Try a few clicks and wheel movements, and enable **Capture gamepad** if demonstrating controller gameplay. To annotate, use **Ctrl+Shift+D** to toggle live drawing and **Esc** to exit, provided protected overlay capture is available on the system.
3. Open the take in the editor. Confirm that events appear at the right points before turning on several overlays. Adjust input delay or visual settings only if you see a mismatch.
4. Test a trim while holding Shift, then add a marker at the playhead with **M**. Rename it so the marker list stays understandable through revisions.
5. Export a short review section and check readability in motion. This catches effects that obscure text or annotations that appear out of time.

## What changes between cursor modes?

In editable mode, the editor composites the cursor from recorded telemetry. In system mode, the pointer is already baked into the captured screen pixels and cannot be separated from the image. If you are unsure, record two short test takes and inspect them in the editor.

## Why might an overlay be empty?

A visual setting needs matching recorded events. The gamepad overlay, for example, cannot create input that was not captured: the inspector displays "Record with Capture gamepad on" when an asset lacks controller data. Similarly, cursor effects require recording in editable mode. Always verify source telemetry first, then configure position and style.

## Choose a next step

For hands-on instructions, read [recording your screen on Windows](/blog/en/record-screen-windows-cursor-clicks/), [mouse effects](/blog/en/mouse-click-halo-spotlight-effects/) and [timeline shortcuts](/blog/en/timeline-shortcuts-and-quick-wins/). Browse the [feature overview](/en/#features) for the broader product workflow.

## Tips

1. Make a short test recording before capturing a long lesson or walkthrough.
2. Choose editable or system cursor mode before recording; system cursor pixels cannot be restyled later.
3. Keep visual effects restrained and review the result with reduced motion enabled.
4. Enable Capture gamepad before recording controller gameplay.
5. Hold Shift only for the drag that needs free placement; snapping resumes as soon as you release it.

## Limitations

Gamepad, side-button and mouse wheel capture target Windows. Live drawing requires an available protected display overlay; on Windows this means Windows 11 22H2 (build 22621) or later, and it is unavailable on macOS 26. Face reframe is available for vertical output, and blurred backdrop is offered for fixed formats.

Visit the [download page](/en/#download) to get Clipey and check the current release.

## Page history

- {{RELEASE_DATE}}: published.
