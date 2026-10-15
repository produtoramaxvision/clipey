---
title: "How to annotate your screen while recording"
description: "Learn how live drawing is planned to work in Clipey 1.15, which tools it includes and how to check strokes in the editor."
slug: "live-drawing-during-recording"
lang: "en"
translationKey: "desenho-ao-vivo-durante-gravacao"
category: "tutorials"
tags: ["Recording", "AI editing", "Windows"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 4
cover: "/blog/covers/desenho-ao-vivo-durante-gravacao.webp"
coverAlt: "A drawn annotation over a screen recording"
ogImage: "/blog/og/desenho-ao-vivo-durante-gravacao.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15. Live drawing is planned for Windows recordings; keeping strokes out of the captured video depends on Windows capture protection.

When explaining an interface, the cursor is not always enough. You may need to circle a button, point to a region or sketch a shape. Live drawing in 1.15 is planned to let you mark the screen during a recording and replay those marks in sync with the video. The feature still needs implementation and validation, so treat this as the intended workflow rather than a promise that every control is already in your build.

## Before you draw

Prepare a short test recording and open the app or page you want to demonstrate. Strokes are planned to be stored as vectors, with normalised coordinates on the captured surface and a time relative to recording start. That lets the editor position the marks over the video and keep them aligned when a clip is trimmed or sped up. This is not permanent desktop ink or a free-floating annotation that ignores the timeline.

The planned global shortcut for entering drawing mode is **Ctrl+Shift+D**. Drawing mode should only be available during an active recording, not while paused. The shortcut is intended to be configurable alongside the other shortcut settings. Because it is global, check that another app does not already rely on the same key combination.

## Planned workflow

1. Start recording and wait for the countdown to finish. While capture is active, use the configured drawing shortcut; **Ctrl+Shift+D** is the planned default.
2. Check for the visible drawing-mode border. It matters because pointer movement creates marks while the mode is active instead of interacting normally with the content underneath.
3. Choose a tool from the floating toolbar: pen, highlighter, arrow, rectangle or ellipse. Pick one of the six planned colours and one of the three widths, then draw deliberately and release to finish the stroke.
4. Use undo to remove the last stroke. Use clear to remove the current set when you want a clean start; the specification plans a separate shortcut for clearing. Press **Esc** to leave drawing mode without stopping the recording.
5. Return to normal input to use the computer, then enter drawing mode again when needed. When recording stops, strokes should be saved with their timestamps so the editor can place them over the right section.
6. Open the recording in the editor and review the annotated section. The planned **Drawings** inspector section should let you control the overlay and show an empty state when the asset has no strokes. Check both playback and a paused frame before exporting.

## Match the tool to the explanation

Use the pen for short freehand marks, such as underlining a word. A highlighter is better for emphasising an area without implying it is a control. An arrow communicates direction; a rectangle or ellipse outlines a region. Choose a width that remains readable at the final video size: a thin line on your monitor may disappear in a smaller export.

For a precise demonstration, draw slowly and make a rehearsal. The planned smoothing can steady a stroke, but it does not turn handwriting into a perfect geometric shape. When pointing to a small control, start an arrow outside the target so the mark does not cover the thing you want viewers to see.

## Review the editor result

Drawings are planned to replay as a vector-derived overlay aligned with recording time. The **Drawings overlay** setting should control whether the layer appears, its fade-out and the progressive reveal animation. Check that a mark starts after the intended edit point and stays visible long enough to read. Trimming or speeding up a section changes when the mark appears because it follows the edited footage.

A recording without strokes should not show controls that appear to be working. If the inspector shows an empty state, return to the recording and check that drawing mode was entered and that you drew during recorded time. Turning on the inspector option cannot create annotations retroactively.

## Tips

1. Mark only what is necessary. Several simultaneous strokes compete with the interface for attention.
2. Keep colour and width consistent within one explanation so viewers can recognise the same kind of highlight.
3. Use the visible mode border as a reminder that the pointer is drawing. Press **Esc** when you need to click normally.
4. Replay after trimming or changing speed; stroke timing follows the edited recording.
5. Rehearse on disposable footage and check the capture without the live overlay before an important demonstration.

## Limitations

This describes the feature planned for Clipey 1.15 and needs confirmation in the final build. Keeping strokes out of the captured video depends on Windows capture content protection; do not assume the same behavior on other platforms. Drawing mode should only work during active recording and should close when recording stops or the app exits. It is for timed annotations, not drawing on the desktop outside a recording.

For context on cursor capture, read [recording your screen on Windows](/blog/en/record-screen-windows-cursor-clicks/) and [mouse click effects](/blog/en/mouse-click-halo-spotlight-effects/). Explore [Clipey features](/en/#features) and check availability on the [download page](/en/#download).

## Page history

- {{RELEASE_DATE}}: published.
