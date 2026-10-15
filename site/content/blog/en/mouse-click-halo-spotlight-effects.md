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

> **Applies to:** Clipey 1.15. Side-click and wheel capture target Windows.

To highlight clicks, scrolling and the cursor in a recording, open the cursor settings in the Clipey editor and enable Mouse effects. Choose between Ripple, Rings or Pulse click styles, set custom colors for left, right and middle buttons, and toggle the Scroll indicator or Drag trail. You can also turn on Halo to add a soft continuous glow around the pointer or Spotlight to dim the surrounding screen area.

## What each effect tells the viewer

Click styles in **Click effect** are **Ripple**, **Rings** and **Pulse**. Button shapes add another visual distinction: left click uses a single ring, right click a double ring, and middle click a square ring. Each button can have its own color configured via **Left click color**, **Right click color** and **Middle click color**. This helps a tutorial show primary clicks while clearly identifying when a context menu or auxiliary action is triggered.

The **Scroll indicator** shows the direction of wheel movement. The **Drag trail** follows the path from button-down to release and fades according to **Trail fade**. The **Halo** adds a soft, continuous glow around the pointer with adjustable **Halo radius** and **Halo opacity**. Meanwhile, **Spotlight** dims the rest of the frame while maintaining an illuminated circle around the cursor using **Spotlight radius** and **Spotlight dimming**. Use the scroll indicator for gestures, the halo for continuous cursor tracking, and the spotlight to focus attention on a specific interface element.

## Configure in a useful order

1. Open the cursor settings in the editing pane and find the **Mouse effects** section.
2. Turn on **Enable mouse effects**. Sub-controls remain disabled while the master switch is off, clarifying why options cannot be adjusted.
3. Choose a click style (**Ripple**, **Rings** or **Pulse**) and set distinct colors for left, right and middle buttons.
4. Adjust **Effect size** and **Duration**. Duration controls how long a click effect remains visible, while size scales the animation without altering cursor position.
5. Enable **Scroll indicator** if wheel motion matters to the lesson. Turn on **Drag trail** and set its fade speed when click-and-drag paths require demonstration.
6. Enable **Halo** or **Spotlight** individually. Set the radius and opacity for the halo, or adjust the radius and dimming intensity for the spotlight.
7. Turn on **Reduced motion** if you prefer simpler transitions. Click animations then switch to a gentle opacity fade.
8. Review sections containing clicks, scrolling and dragging to ensure visual cues never obscure critical interface text.

## A recipe for interface walkthroughs

For a sequence of menus, start with **Rings** and distinct button colors. Leave the halo off until you know whether the cursor is already easy to follow. Add the scroll indicator only to material where wheel movement matters. Use spotlight when the screen has competing areas, and keep dimming low enough to read content outside the focus.

For drawing or graphics software, a trail can explain a drag path. A constant halo may become distracting when the pointer makes many small movements. Compare a short section with and without it before exporting.

## Tips

- Test one effect at a time in a short section so you can tell which option improved clarity.
- Give colors distinct jobs and check their contrast against the recorded screen.
- Use shorter duration for frequent interactions to avoid a stack of rings.
- Halo and spotlight can be combined, but both draw attention to the pointer; lower their intensity if the content loses contrast.
- Reduced motion changes animation style, not how much interaction data is captured.

## Limitations

Effects depend on telemetry recorded in editable cursor mode. Right and middle buttons drive the new visual cues, but do not trigger bounce, impact or auto-zoom, which remain tied to the primary left click. A drag trail requires recorded movement data between press and release.

Learn [how to record your Windows screen](/blog/en/record-screen-windows-cursor-clicks/) and read [what’s new in Clipey 1.15](/blog/en/clipey-1-15-whats-new/). Get the app from the [download page](/en/#download).

## Page history

- {{RELEASE_DATE}}: published.
