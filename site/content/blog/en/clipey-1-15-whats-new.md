---
title: "Clipey 1.15: what’s new in recording and editing"
description: "Explore the planned Clipey 1.15 changes, where to find them, and which features are Windows-specific or still awaiting final validation."
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

> **Applies to:** Clipey 1.15. The primary recording workflow is for Windows; some new capabilities are platform-specific or still need final validation.

A release is easier to use when you know which control to reach for and where platform limits apply. This guide groups the 1.15 changes by task. Check your installed version before trying them, and keep a copy of a project before experimenting with editor changes.

## Start with the cursor choice

The HUD cursor control switches between **Editable cursor** and **System cursor**. Editable mode records cursor data separately so you can restyle it and use it for auto-zoom in the editor. System mode records the actual cursor in the video; it cannot be restyled or used for auto-zoom. For a tutorial where cursor clicks need emphasis, editable mode leaves more room to adjust later.

On Windows, recording interaction data is intended to include side-button clicks and wheel movement as well as pointer motion. The right and middle buttons feed the new visual effects, while existing bounce, impact and auto-zoom behavior remains left-click-only. That distinction matters: a visual cue for a side click does not mean the editor treats it as a left click.

## Add context in the editor

Mouse effects combine button-specific click shapes, a scroll indicator, a drag trail, a cursor halo and a spotlight. Reduced motion replaces movement with a short opacity fade. Start with one or two effects; a strong halo and a dark spotlight can make the material underneath harder to read.

Live drawing is designed for quick annotations during a recording. The promised tools are pen, highlighter, arrow, rectangle and ellipse, with color and width chosen from a floating toolbar. Strokes are intended to stay out of the captured video while being stored as vectors for replay in the editor and export. They follow recording time, so drawing is not a permanent overlay detached from the clip.

For gameplay, a controller overlay can show pressed buttons as compact labels or as a controller illustration. The full layout can also display stick positions. Its events follow the edited video timeline, so trims and speed changes affect when input appears.

## Make timeline work more precise

Holding **Shift** while dragging or trimming temporarily bypasses snapping. It does not change a saved preference. The timeline context menu exposes existing clip and modifier actions with shortcut badges, and supports keyboard opening. Named markers let you return to useful points in a project. Double-clicking a panel divider resets it to its default size.

Use Shift for a one-off placement that should not snap. Use a marker when you want to revisit a moment later. A marker identifies a time; it does not remove or split the underlying video by itself.

## A short test before a finished project

1. Start a brief Windows recording and choose the cursor mode for the job. Pick **Editable cursor** if you expect to reposition or emphasize the pointer later.
2. Try a few clicks and wheel movements, and decide whether the take needs drawing or a gamepad display. For live drawing, the task specification sets **Ctrl+Shift+D** as the default, **Esc** to leave drawing mode and a second shortcut to clear.
3. Open the take in the editor. Confirm that events appear at the right points before turning on several overlays. Change input delay or visual settings only if you can see a mismatch.
4. Test a trim while holding Shift, then add a marker at the playhead with **M**. Rename it so the marker list stays understandable through revisions.
5. Export a short review section and check readability in motion. This catches effects that obscure text or annotations that appear out of time.

Shortcuts and controls for in-progress features are those promised by their specifications and may change before stable release. Use disposable test content rather than relying on a control that may not yet exist in your build.

## What changes between cursor modes?

In editable mode, the editor can composite a cursor from separately recorded data. In system mode, the pointer is already part of the captured pixels and cannot be separated from the image. If you are unsure, record two short samples and compare them in the editor instead of judging by the HUD alone.

## Why might an overlay be empty?

A visual setting needs matching recorded events. The gamepad overlay, for example, cannot create input that was not captured; its specification calls for an empty state when an asset has no controller data, with guidance to record with capture enabled. Separate cursor data also depends on the selected capture mode and on recording pointer activity. Check the source data first, then troubleshoot position and style.

## Choose a next step

For hands-on instructions, read [recording your screen on Windows](/blog/en/record-screen-windows-cursor-clicks/), [mouse effects](/blog/en/mouse-click-halo-spotlight-effects/) and [timeline shortcuts](/blog/en/timeline-shortcuts-and-quick-wins/). Browse the [feature overview](/en/#features) for the broader product workflow.

## Tips

1. Make a short test recording before capturing a long lesson or walkthrough.
2. Choose editable or system cursor mode before recording; system cursor pixels cannot be restyled later.
3. Keep visual effects restrained and review the result with reduced motion enabled.
4. Test that controller input was captured before spending time on overlay layout.
5. Hold Shift only for the drag that needs free placement; snapping resumes as soon as you release it.

## Limitations

Gamepad, side-button and wheel capture target Windows. Excluding live drawing from the captured video relies on Windows capture. The mouse, drawing, gamepad and timeline features described here are in progress and require final release validation. Availability and exact controls may change before the stable release; do not assume every option is already present in every installation.

Visit the [download page](/en/#download) to get Clipey and check the current release.

## Page history

- {{RELEASE_DATE}}: published.
