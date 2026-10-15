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

> **Applies to:** Clipey 1.15. Gamepad capture is supported on Windows. The editor overlay requires a recording that contains controller events.

To show controller inputs in a gameplay recording with Clipey, turn on Capture gamepad in the recording HUD on Windows before you begin. In the editor, open the Gamepad overlay section and choose between a Compact style showing pressed button badges or a Full layout rendering the controller silhouette with live thumbsticks. Input events synchronize automatically with your edited timeline across cuts and speed changes.

## Enable capture before recording

The option is **Capture gamepad** in the HUD capture controls. It is Windows-only and off by default. Turn it on before starting a recording that should show inputs. If the gamepad sampler is unavailable on the system, recording continues normally without gamepad data and the interface reports the condition.

Record a short test and press a few buttons, triggers and analog sticks. Stored events keep the controller index, control identifiers and deflection values. Supported control layouts cover **Xbox**, **PlayStation**, **Switch** and **Generic**. You can select the matching layout in the editor so on-screen button labels reflect your controller hardware.

## Set up the overlay in the editor

1. Import the test recording and select its clip. The **Gamepad overlay** section sits in the inspector alongside the interaction controls.
2. If the inspector says "Record with Capture gamepad on", record again with **Capture gamepad** enabled in the HUD. The empty state explains missing events; it does not simulate inputs.
3. Turn on **Show gamepad** and choose a style. **Compact** displays pill labels for pressed buttons. **Full** draws a controller silhouette and highlights active buttons; **Show thumbsticks** adds stick positions.
4. Adjust **Position**, **Size**, **Left stick deadzone**, **Right stick deadzone** and **Trigger threshold** to eliminate unintentional resting drift. The **Input delay** setting shifts display timing if inputs need fine adjustment relative to the game frame.
5. Play the test section, including after trimming or changing speed. Events follow edited time, and **Min press frames** ensures short taps remain clearly readable for multiple frames.
6. Check a short export. The overlay appears in the same position and layout selected during editing.

## Choose a style for the footage

Compact takes less room and works when viewers only need to identify buttons, such as in a combo explanation. Full is useful when stick position is part of the demonstration. If movement direction matters, enable the stick display and leave an area of the frame clear for the controller silhouette.

Events are mapped to the edited timeline, including cuts and sped-up sections. If you trim a pause in the timeline, the overlay keeps pace with the edited action, preserving clean synchronization between audio commentary and visual inputs.

## Tips

1. Make a short test with varied inputs before a full session, especially if you switch between controllers.
2. Leave room in the composition before choosing overlay position and size.
3. Prefer Compact when button identity is enough; use Full when stick movement matters.
4. If nothing appears, verify that events were captured before adjusting appearance.
5. Compare preview and export after trimming or changing speed.

## Limitations

Capture is Windows-only and requires a recording made with Capture gamepad active. An overlay cannot retroactively create missing gamepad telemetry. The system supports buttons, analog triggers and sticks across Xbox, PlayStation, Switch and Generic profiles.

Also read [recording your screen on Windows](/blog/en/record-screen-windows-cursor-clicks/) and [drawing during a recording](/blog/en/live-drawing-during-recording/). Explore [Clipey features](/en/#features) and the [download page](/en/#download).

## Page history

- {{RELEASE_DATE}}: published.
