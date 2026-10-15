---
title: "Record your Windows screen with cursor and clicks"
description: "Choose a cursor mode in the HUD, plan for side clicks and wheel input, and verify recorded events before producing a walkthrough."
slug: "record-screen-windows-cursor-clicks"
lang: "en"
translationKey: "gravar-tela-windows-com-cursor-e-cliques"
category: "tutorials"
tags: ["Recording", "Windows", "AI editing"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 2
cover: "/blog/covers/gravar-tela-windows-com-cursor-e-cliques.webp"
coverAlt: "Cover for the Windows screen recording tutorial"
ogImage: "/blog/og/gravar-tela-windows-com-cursor-e-cliques.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows. Side-button and wheel capture described here depends on the Windows recording path and is awaiting final validation.

A software walkthrough can show pointer movement yet leave it unclear where you clicked or which way you scrolled. Plan the capture around the actions you need to teach, then check the recorded events before making the final take.

## 1. Choose how to record the cursor

Use the cursor button in the HUD to switch between **Editable cursor** and **System cursor**. **Editable cursor** records pointer data separately, so the editor can restyle it and use its movement for auto-zoom. **System cursor** leaves the Windows pointer in the captured pixels. You cannot separate it later to change its appearance or use it for auto-zoom.

For a software demonstration, editable mode is the useful choice when you may need to adjust cursor size or emphasis in the edit. System mode can be enough when the pointer is incidental. Choose before recording and make a brief test if you are unsure.

## 2. Make the take easy to follow

Close windows that are not part of the task and begin from the relevant screen. Move the pointer deliberately instead of sweeping across unrelated areas. A short pause before each click gives viewers time to see the target and the resulting state. This is a presentation technique, not an automatic Clipey setting.

If your walkthrough needs a context menu, middle click or wheel movement, note those points so you can verify them afterward. The planned 1.15 Windows capture records side-button interactions and wheel events. Left-click data remains distinct from right and middle clicks for existing bounce, impact and auto-zoom behavior.

## 3. Run a short test recording

1. Open Clipey and confirm the screen source in the recording window.
2. Choose a cursor mode with the HUD control. Read its tooltip to confirm whether **Editable cursor** or **System cursor** is active.
3. Record a short sequence: movement, left click, right click, middle click and scrolling if those gestures matter to the tutorial.
4. Stop and open the take in the editor. Check cursor movement and confirm that the interactions you need appear at the expected moments.
5. Record the finished walkthrough only after that check. If the cursor is baked into the video but you need editable effects, retake it in **Editable cursor** mode.

This test also reveals whether the explanation relies on a side click. Do not use click sound alone as proof: audio and visual interaction data are separate parts of the recording.

## 4. Keep interaction types distinct in the edit

Side clicks are intended to drive the new per-button visual effects. They should not trigger the existing bounce, impact or auto-zoom behavior, which stays tied to left clicks. Wheel movement has its own event data and can drive the scroll indicator; it is not a series of clicks.

For a menu tutorial, first confirm the event exists. Then decide whether you need cursor emphasis, a click effect or a scroll indicator. Several cues at once can cover application text. See [mouse effects](/blog/en/mouse-click-halo-spotlight-effects/) for the style options and [what’s new in Clipey 1.15](/blog/en/clipey-1-15-whats-new/) for the broader release overview.

## Tips

- Choose **Editable cursor** when pointer placement is part of the lesson and you may want to adjust it later.
- Move to a control, pause, then click.
- Scroll in steps that match your narration rather than rushing through a page.
- Review the take both at normal speed and paused; quick inputs can be hard to spot during playback.
- If the expected data is missing, repeat the test before investing time in the edit.

## Limitations

The system cursor is part of the captured image and cannot be edited separately. Side-button and wheel capture are Windows-specific and remain pending final validation for this 1.15 documentation. Editable cursor mode depends on cursor telemetry; it cannot recover interaction data from an older recording that was made without it.

Start a project from the [download page](/en/#download).

## Page history

- {{RELEASE_DATE}}: published.
