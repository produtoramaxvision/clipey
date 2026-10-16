---
title: "How to annotate your screen while recording"
description: "Annotate an active Clipey 1.15 recording with the protected drawing overlay, then review and adjust the timed strokes in the editor."
slug: "live-drawing-during-recording"
lang: "en"
translationKey: "desenho-ao-vivo-durante-gravacao"
category: "tutorials"
tags: ["Recording", "AI editing", "Windows"]
author: "Clipey Team"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 4
cover: "/blog/covers/desenho-ao-vivo-durante-gravacao.webp"
coverAlt: "A drawn annotation over a screen recording"
ogImage: "/blog/og/desenho-ao-vivo-durante-gravacao.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15. Live drawing is available during recording when Clipey can protect the overlay from screen capture. On Windows this requires Windows 11 22H2 (build 22621) or later; earlier Windows builds disable the drawing overlay because protected click-through capture is unavailable. Protection is also disabled on macOS 26 because protected windows are not displayed there.

To annotate your screen while recording with Clipey, press the configurable global shortcut **Ctrl+Shift+D** by default to open the protected drawing overlay. Choose **Pen**, **Highlighter**, **Arrow**, **Rectangle** or **Ellipse**, then select a color and one of three stroke widths. Strokes are stored as timed drawing data, excluded from the captured screen and replayed as an editable, synchronized layer in the timeline.

## Before you draw

Prepare a short test recording and open the app or page you want to demonstrate. Strokes are stored with coordinates on the captured surface and times relative to recording start. The editor positions them over the video and keeps them aligned when a clip is trimmed or sped up. This is not permanent desktop ink or a free-floating annotation that ignores the timeline.

The default global shortcut is **Ctrl+Shift+D** on Windows and **Command+Shift+D** on macOS; it can be changed in shortcut settings. Drawing mode is available only during an active, unpaused recording. Because the shortcut is global, another app may already use the same key combination.

## Workflow

1. Start recording and wait for the countdown to finish. While capture is active, use the configured drawing shortcut; **Ctrl+Shift+D** is the default.
2. Check for the visible drawing-mode border. It matters because pointer movement creates marks while the mode is active instead of interacting normally with the content underneath.
3. Choose **Pen**, **Highlighter**, **Arrow**, **Rectangle** or **Ellipse** from the floating toolbar. Pick a color and one of the three stroke widths, then draw deliberately and release to finish the stroke.
4. Use **Undo** to remove the last stroke or **Clear** to remove the drawings. Press **Esc** to leave drawing mode without stopping the recording. The default clear shortcut is **Ctrl+Shift+X** on Windows and **Command+Shift+X** on macOS.
5. Return to normal input to use the computer, then enter drawing mode again when needed. When recording stops, strokes should be saved with their timestamps so the editor can place them over the right section.
6. Open the recording in the editor and review the annotated section under **Drawings overlay**. Use **Show drawings**, **Fade out** and **Animate drawing** to control playback; the inspector also reports when no drawings were recorded. Check both playback and a paused frame before exporting.

## Match the tool to the explanation

Use the pen for short freehand marks, such as underlining a word. A highlighter is better for emphasising an area without implying it is a control. An arrow communicates direction; a rectangle or ellipse outlines a region. Choose a width that remains readable at the final video size: a thin line on your monitor may disappear in a smaller export.

For a precise demonstration, draw slowly and make a rehearsal. The tools record the strokes you make; they do not turn handwriting into a perfect geometric shape. When pointing to a small control, start an arrow outside the target so the mark does not cover the thing you want viewers to see.

## Review the editor result

Drawings replay as an overlay aligned with recording time. In **Drawings overlay**, **Show drawings** controls visibility, **Fade out** controls how long strokes remain before fading, and **Animate drawing** plays strokes dynamically. Check that a mark starts after the intended edit point and stays visible long enough to read. Trimming or speeding up a section changes when the mark appears because it follows the edited footage.

A recording without strokes should not show controls that appear to be working. If the inspector shows an empty state, return to the recording and check that drawing mode was entered and that you drew during recorded time. Turning on the inspector option cannot create annotations retroactively.

## Tips

1. Mark only what is necessary. Several simultaneous strokes compete with the interface for attention.
2. Keep colour and width consistent within one explanation so viewers can recognise the same kind of highlight.
3. Use the visible mode border as a reminder that the pointer is drawing. Press **Esc** when you need to click normally.
4. Replay after trimming or changing speed; stroke timing follows the edited recording.
5. Rehearse on disposable footage and check the capture without the live overlay before an important demonstration.

## Limitations

The overlay is only created when Clipey can apply content protection, which keeps its strokes out of the recorded screen. Windows 11 22H2 (build 22621) and later meet the protected click-through requirement. On Windows 10 and Windows 11 21H2 or earlier, the app disables the drawing overlay because protection would prevent the click-through window from working; it will not record unprotected strokes as a fallback. On macOS 26, the overlay is also unavailable because protected windows are not displayed. Other systems need to support protected display capture. Drawing is available during active, unpaused recording and the overlay closes when recording stops. It is for timed annotations, not drawing on the desktop outside a recording.

For context on cursor capture, read [recording your screen on Windows](/blog/en/record-screen-windows-cursor-clicks/) and [mouse click effects](/blog/en/mouse-click-halo-spotlight-effects/). Explore [Clipey features](/en/#features) and check availability on the [download page](/en/#download).

## Page history

- 2026-10-15: published.
