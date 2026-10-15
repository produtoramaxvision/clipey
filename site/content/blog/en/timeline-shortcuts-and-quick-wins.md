---
title: "Edit faster with timeline shortcuts and quick wins"
description: "Use Shift to bypass snapping, open clip actions from a context menu, mark review points and reset the editor divider."
slug: "timeline-shortcuts-and-quick-wins"
lang: "en"
translationKey: "atalhos-e-produtividade-na-timeline"
category: "tutorials"
tags: ["AI editing", "Shortcuts", "Recording"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 6
cover: "/blog/covers/atalhos-e-produtividade-na-timeline.webp"
coverAlt: "Editing timeline with clips and markers"
ogImage: "/blog/og/atalhos-e-produtividade-na-timeline.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15. These editor controls need confirmation in the final build.

Snapping helps align clips on a timeline, but it can get in the way when an edit needs to land between two nearby points. Context menus and markers also reduce back-and-forth during review. The quick wins planned for 1.15 address different kinds of friction: precise placement, access to commands, navigation and panel space.

## Drag without snapping with Shift

1. Select the clip or trim you want to adjust and begin dragging.
2. While holding the mouse button, hold **Shift** to temporarily bypass snapping. The specification calls for a visual hint while the key is held.
3. Drop the item where you want it, then release Shift. Snapping returns without changing a persistent setting.

This modifier applies to that interaction; it does not turn snapping off for the whole project. Use it when an item keeps sticking to a nearby edge and you need to place it between references. Pressing Shift after the drag is over will not move the item, so repeat the adjustment while holding the key.

## Open actions on the clip

The planned context menu gathers existing actions for clips and modifier pills, including split, delete, duplicate and speed options when they apply to the selected item. Right-click an element to open the menu and check the shortcut badges beside commands. They help you discover an action before memorising its key combination.

The menu should also be keyboard accessible: select an item and press **Shift+F10** or the context-menu key. Press **Esc** to close it; focus should return to the clip so you can keep navigating without finding the item again. Available actions depend on the selected element, so not every command appears for every item.

## Add markers for review points

1. Move the playhead to the moment you want to revisit.
2. Press **M** to add a named marker at that position.
3. Open the marker list to jump back while reviewing. Rename a marker, choose a colour or remove ones you no longer need.

Markers identify positions in the project; they do not cut, hide or change footage. Use names such as “check title” or “verify audio” to make the list a review agenda. If a section moves after editing, check that its marker still points to the moment you intended to save.

## Reset a panel's size

If a panel becomes too narrow after resizing the divider, double-click the divider. The planned behavior restores that panel's default size. This is not the same as maximising the editor; it returns to the standard layout without repeated manual resizing.

## Tips

1. Hold Shift only while dragging or trimming past an unwanted snap; it does not change a lasting preference.
2. Check the menu's shortcut badges before memorising commands. Actions depend on the selected clip or modifier.
3. Name markers for the next review task, not only for what is visible at that moment.
4. Remove stale markers so the list stays useful on longer projects.
5. If the inspector has lost room, try double-clicking the divider before repeatedly resizing panels.

## Limitations

These features are specified for the timeline and editor panels and still need validation in the final Clipey 1.15 build. Shift bypasses snapping only during the intended interaction; it does not change a global setting. The context menu offers existing actions relevant to the selected item, not one universal set. Markers save navigation points and do not replace trims or splits.

To prepare footage, read [recording your screen on Windows](/blog/en/record-screen-windows-cursor-clicks/). To highlight actions in the image, see [mouse effects](/blog/en/mouse-click-halo-spotlight-effects/) and [live drawing](/blog/en/live-drawing-during-recording/). Explore [Clipey features](/en/#features) or [download Clipey](/en/#download).

## Page history

- {{RELEASE_DATE}}: published.
