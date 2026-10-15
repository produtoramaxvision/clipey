---
title: "Highlight clicks, scrolling and the cursor in a recording"
description: "Set up per-button click effects, scrolling cues, drag trails, a halo and spotlight, and learn what each option changes."
slug: "mouse-click-halo-spotlight-effects"
lang: "en"
translationKey: "efeitos-de-mouse-cliques-halo-spotlight"
category: "tutorials"
tags: ["AI editing", "Recording", "Windows"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 3
cover: "/blog/covers/efeitos-de-mouse-cliques-halo-spotlight.webp"
coverAlt: "Cover about cursor and click effects"
ogImage: "/blog/og/efeitos-de-mouse-cliques-halo-spotlight.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15. Side-click and wheel capture target Windows; the effects described here await final validation.

A click can be hard to spot in a screen recording, and a quick scroll can be easy to miss. The mouse effects planned for 1.15 are meant to mark those actions without drawing every cue by hand. A few consistent signals usually work better than enabling every option.

## What each effect tells the viewer

Click styles are **ripple**, **rings** and **pulse**. Button shape adds another distinction: left click uses one ring, right click a double ring, and middle click a square ring. Each button can have its own color. This helps a tutorial show a primary action while making a context-menu click identifiable.

The scroll indicator shows wheel direction. A drag trail follows the path from button-down to release, then fades. A halo is a soft disc around the pointer. Spotlight dims the rest of the frame while leaving an area around the cursor visible. These cues serve different jobs: use the indicator for a gesture, the halo for ongoing location and spotlight to guide attention to one area.

## Configure in a useful order

1. Open the cursor settings in the editing pane and find the **Mouse effects** group.
2. Turn on its master switch. Sub-controls are disabled, not hidden, while the group is off so the reason they cannot be adjusted remains visible.
3. Choose a click style and set separate left, right and middle colors. Pick colors that differ from one another and from the recorded screen.
4. Adjust **Size** and **Duration**. Duration controls how long a click effect remains visible; size scales it without moving the pointer.
5. Enable the scroll indicator if wheel motion matters to the lesson. Turn on the drag trail and adjust its fade when the path itself needs explanation.
6. Enable halo or spotlight individually. Set halo radius and opacity; for spotlight, adjust its radius and dim amount.
7. Turn on **Reduced motion** if you prefer less animated movement. Click effects then use a brief opacity fade.
8. Review sections containing clicks, scrolling and dragging. Return to the group and reduce anything that covers text or controls.

These labels follow the feature specification and may be localized in the installed build. A click is still recorded when its visual effect is off.

## A recipe for interface walkthroughs

For a sequence of menus, start with **rings** and distinct button colors. Leave the halo off until you know whether the cursor is already easy to follow. Add the scroll indicator only to material where wheel movement matters. Use spotlight when the screen has competing areas, and keep dimming low enough to read content outside the focus.

For drawing or graphics software, a trail can explain a drag path. A constant halo may become distracting when the pointer makes many small movements. Compare a short section with and without it before exporting.

## Tips

- Test one effect at a time in a short section so you can tell which option improved clarity.
- Give colors distinct jobs and check their contrast against the recorded screen.
- Use shorter duration for frequent interactions to avoid a stack of rings.
- Halo and spotlight can be combined, but both draw attention to the pointer; lower their intensity if the content loses contrast.
- Reduced motion changes animation style, not how much interaction data is captured.

## Limitations

Effects depend on events present in the recording. Side-click and wheel capture target Windows and are pending final validation for 1.15. Right and middle buttons drive the new visual effects, but should not trigger bounce, impact or auto-zoom, which remain tied to left click. A drag trail also needs movement data between press and release; it cannot reconstruct a missing drag.

Learn [how to record your Windows screen](/blog/en/record-screen-windows-cursor-clicks/) and read [what’s new in Clipey 1.15](/blog/en/clipey-1-15-whats-new/). Get the app from the [download page](/en/#download).

## Page history

- {{RELEASE_DATE}}: published.
