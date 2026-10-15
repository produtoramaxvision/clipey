---
title: "Reframe a screen recording vertically around a face"
description: "Enable face reframe, choose what happens when no face is found and review the vertical preview before exporting."
slug: "vertical-face-reframe"
lang: "en"
translationKey: "reenquadramento-vertical-por-rosto"
category: "tutorials"
tags: ["AI editing", "Recording", "Privacy"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 11
cover: "/blog/covers/reenquadramento-vertical-por-rosto.webp"
coverAlt: "Clipey vertical preview with the frame following the speaker"
ogImage: "/blog/og/reenquadramento-vertical-por-rosto.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows. Face reframe and blurred backdrop are planned capabilities currently awaiting final validation.

To reframe a screen recording vertically around a face in Clipey, switch your project aspect ratio to 9:16 and enable the planned face reframe setting. The feature is designed to process face detection locally on-device to build a smooth tracking path that keeps the speaker centered, with fallback options to track the cursor or frame center when no face is visible. Because face reframe and blurred backdrop remain in technical validation, use this article as guidance for the planned workflow.

## Set the output format

1. Open the project with the video you want to adapt and make sure the media has loaded.
2. In the format pane, choose a vertical aspect ratio such as 9:16. Look at the preview: a fixed frame shows only part of the original image.
3. Turn on **Face reframe**. Clipey analyses the media to build a focus track. The analysis runs when you enable the feature or when the asset has no track; it is not intended to detect faces on every playback frame.
4. Adjust smoothing to balance following and stability. More smoothing reduces abrupt movement but may take longer to catch a quick change in position. Preview a section where the person moves before settling on a setting.
5. Choose the fallback for periods with no detected face: follow the cursor or centre the frame. Play a section without a face and confirm the fallback keeps useful content in view.

## Review how the frame moves

Watch from the beginning and pay attention when the person changes position. The frame follows the detected face, with smoothing intended to avoid jumps. If the face disappears for a while, the selected fallback takes over. Check that this transition looks deliberate and does not leave the frame stuck on a crop that hides the demonstration.

The preview and export should reflect the reframe. Even so, review important sections after export, particularly when a video has multiple clips or cuts. A framing choice that works for one shot may not fit the next. Adjust clip boundaries or choose another format if both the person and the interface need to remain visible.

## Choose how to fill the sides

Converting a landscape source to 9:16 can leave empty space or require a substantial crop. **Blurred backdrop** fills the sides with an enlarged, blurred version of the source while keeping the main image centred and intact. Compare it with a fill that crops the source: the blurred background preserves context, but interface details in it may not be readable.

Choose the treatment for the content. For a talking head, blur can avoid black bars without enlarging the main image too much. For a screen tutorial, a fill crop may hide controls; blur will not make background text legible either. Check the result in motion and with captions enabled.

## Tips

- Choose the final format first, so you can judge exactly what the audience will see.
- Test one section with the person speaking and another where they move around.
- Use enough smoothing to prevent small movements from making the frame jitter, but reduce it if the face falls out of frame during quick changes.
- Check the fallback during moments without a face; the centre or cursor will not always point to the important action.
- In a tutorial, make sure the reframe does not remove menus, pointers or text needed to explain a step.
- Watch the final export on a small screen, where vertical video is commonly viewed.

## Limitations

Face reframe relies on on-device face detection and a focus track generated for the asset. It cannot guarantee that every face will be detected in every condition, and it does not identify which interface element matters. It follows a selected face, not necessarily the person speaking. The configured fallback applies when detection is unavailable. A blurred backdrop can reduce the readability of visual content and is not a replacement for manual editing in complex scenes.

To find short moments in a recording, read [reviewing Auto Clip suggestions](/blog/en/auto-clip-shorts-from-long-videos/). For trims and zooms, see [AI editing](/blog/en/ai-editing-cuts-zooms-silence/). Browse the [Clipey features](/en/#features).

Next, apply the reframe to a short section, check the fallback and review the export before processing the full video.

## Page history

- {{RELEASE_DATE}}: published.
