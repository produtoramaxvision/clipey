---
title: "Show controller inputs in a gameplay recording"
description: "Learn how gamepad capture and its overlay are planned for Clipey 1.15, choose a display style and align inputs with your footage."
slug: "gamepad-overlay-for-gameplay"
lang: "en"
translationKey: "overlay-de-gamepad-para-gameplay"
category: "tutorials"
tags: ["Recording", "Windows", "AI editing"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 5
cover: "/blog/covers/overlay-de-gamepad-para-gameplay.webp"
coverAlt: "A controller overlay over a gameplay recording"
ogImage: "/blog/og/overlay-de-gamepad-para-gameplay.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15. Gamepad capture is planned for Windows. The editor overlay requires a recording that contains controller events.

A gameplay video does not always make it clear which button was pressed. Gamepad capture and an editor overlay are planned to show inputs alongside the action, without filming the controller. Capture and display are separate steps: record the events first, then choose how they appear.

## Enable capture before recording

The planned option is **Capture gamepad** in the HUD capture controls. It is Windows-only and off by default in the specification. Turn it on before starting a recording that should show inputs. If the gamepad sampler is unavailable, the task says recording should continue without gamepad data and the interface should report the problem once; it cannot recreate events that were not captured.

Record a short test and press a few buttons, a trigger and the sticks. Stored events keep the controller index, control identifiers and values; the saved events do not retain the device make or model. The supported control labels cover Xbox, PlayStation, Switch and generic layouts. That does not guarantee every device will receive a specific label in every setup, so check the preview.

## Set up the overlay in the editor

1. Import the test recording and select its clip. The planned gamepad overlay section sits in the inspector alongside the keyboard controls.
2. If the inspector says the asset has no gamepad data, enabling the overlay is not enough. Record again with **Capture gamepad** on. The empty state explains missing events; it does not simulate inputs.
3. Enable **Gamepad overlay** and choose a style. **Compact** displays labels for pressed buttons. **Full** draws a controller silhouette and highlights active buttons; **Show sticks** adds stick positions.
4. Adjust position, size, scale and opacity so the overlay does not cover important game content. Input delay can shift the display if events seem early or late relative to the video.
5. Play the test section, including after trimming or changing speed. Events should follow edited time, and short taps should remain visible for a minimum number of frames.
6. Check a short export. The overlay should appear at the same time as in preview and use the selected controller layout.

## Choose a style for the footage

Compact takes less room and works when viewers only need to identify buttons, such as in a combo explanation. Full is useful when stick position is part of the demonstration. If movement direction matters, enable the stick display and leave an area of the frame clear for the controller silhouette.

Events are mapped to the edited timeline, including cuts and sped-up sections. Do not compare an input to the original recording time after editing. If alignment is off, first check the input delay and whether the section was changed; do not compensate for a bad cut by moving the overlay alone.

## Tips

1. Make a short test with varied inputs before a full session, especially if you switch between controllers.
2. Leave room in the composition before choosing overlay position and size.
3. Prefer Compact when button identity is enough; use Full when stick movement matters.
4. If nothing appears, verify that events were captured before adjusting appearance.
5. Compare preview and export after trimming or changing speed.

## Limitations

Capture is Windows-only and depends on the sampler being available. An overlay cannot fill in a recording with no gamepad events. The task plans button, trigger and stick states and Xbox, PlayStation, Switch and generic layouts; verify labels and behavior with your controller. The implementation still needs confirmation in the final build.

Also read [recording your screen on Windows](/blog/en/record-screen-windows-cursor-clicks/) and [drawing during a recording](/blog/en/live-drawing-during-recording/). Explore [Clipey features](/en/#features) and the [download page](/en/#download).

## Page history

- {{RELEASE_DATE}}: published.
