---
title: "AI video editing: trim pauses and place useful zooms"
description: "Ask Clipey’s AI agent for focused edits, then review trims and zooms against the transcript and timeline before exporting."
slug: "ai-editing-cuts-zooms-silence"
lang: "en"
translationKey: "edicao-com-ia-cortes-zooms-silencio"
category: "tutorials"
tags: ["AI editing", "Recording", "Shortcuts"]
author: "Clipey Team"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 7
cover: "/blog/covers/edicao-com-ia-cortes-zooms-silencio.webp"
coverAlt: "Clipey video editor with the transcript and timeline open"
ogImage: "/blog/og/edicao-com-ia-cortes-zooms-silencio.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows.

To edit videos with AI in Clipey, instruct the built-in AI agent using natural language to perform cuts, tighten pauses, remove silences, and place cursor-guided zooms. The agent references on-device speech transcription and cursor telemetry to pinpoint moments on the timeline without uploading footage to cloud servers. You retain full control to preview suggested edits, fine-tune cuts in the transcript pane, and verify every transition before exporting.

## Prepare the project

1. Open the recording in the editor and let the media load. For requests based on spoken content, transcribe the audio first. The transcript pane offers **Transcribe** when no transcript is present. Text gives the agent useful context, but it is not a substitute for checking the video.
2. Open the agent conversation in the editor. If the project has no transcript, start with a visual request or transcribe before asking it to remove spoken pauses.
3. State one goal at a time. For example: “remove the long pause after the explanation, then zoom in when I show the menu.” A local instruction is easier to verify than a vague request to make the whole video more dynamic.

The agent can perform editing operations such as cuts and zooms, as well as silence removal and pause tightening. If your project includes background music, enable **Speech clarity** in the audio inspector to duck 2.5 kHz midrange frequencies and enhance vocal prominence. Do not assume that every silence is disposable: quiet speech, a breath or an intentional pause can matter to meaning and pacing.

## Review cuts against the transcript

After the agent proposes a change, find the affected section and play a few seconds on either side. The transcript helps you locate words; the timeline shows the interval that was removed. If a word sounds clipped, restore or adjust the cut instead of trusting the transcript alone. The transcript panel lets you select words and create a trim that removes the corresponding interval.

Review the opening and ending too. Removing a pause between sentences can tighten delivery, but cuts that are too aggressive make a tutorial hard to follow. Leave enough time for viewers to read a menu and see the result of an action.

## Place zooms where they explain something

Ask for a zoom when there is a clear target, such as a button or a region of the interface. The existing automatic zoom path uses available cursor data; it does not independently know which detail matters to your story. Check the framing and focus in the preview. If the cursor is away from the control you want to teach, reposition the focus or adjust the zoom yourself.

For a walkthrough, show the full screen first, zoom in when the control appears and return to the wider view afterward. This keeps the viewer oriented. In recordings with multiple monitors or dense interfaces, make sure the zoom does not crop labels that explain the action.

## Tips for more reliable requests

- Name the action and its context: “remove the pause between these two sentences” is easier to check than “make it faster.”
- Separate audio cleanup from visual changes. If the pacing feels wrong, you can identify which edit caused it.
- Listen to the edit. A cut that looks fine on a waveform can remove a consonant or natural breath.
- Use the transcript as navigation, not as proof that speech was recognised perfectly.
- Watch the complete result and inspect transitions around edited sections before export.

## Limitations

The agent works from the context available in the project and may interpret an instruction differently from what you intended. Automatic silence removal cannot make editorial decisions about rhythm or dramatic pauses for you. Cursor-driven automatic zoom follows cursor telemetry; it is not semantic recognition of what is on screen. Review the transcript and the edit carefully, especially with overlapping speech, background noise or technical terms.

For suggestions from a long recording, read [how to review short clips](/blog/en/auto-clip-shorts-from-long-videos/). To keep a person in a vertical frame, see [face reframe for vertical video](/blog/en/vertical-face-reframe/). Browse the [Clipey features](/en/#features) as well.

Next, try one local edit in a short recording and watch that section before asking for more changes.

## Page history

- 2026-10-15: published.
