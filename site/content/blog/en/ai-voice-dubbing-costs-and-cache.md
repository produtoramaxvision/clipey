---
title: "Generate AI voice and dubbing with cost estimates"
description: "Set up voice in Clipey Studio, review each line and understand estimates, session limits and when generated audio can be reused."
slug: "ai-voice-dubbing-costs-and-cache"
lang: "en"
translationKey: "dublagem-e-voz-com-ia-custos-e-cache"
category: "guides"
tags: ["Voice and audio", "AI editing", "Privacy"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 10
cover: "/blog/covers/dublagem-e-voz-com-ia-custos-e-cache.webp"
coverAlt: "Clipey Studio with voice generation and dubbing controls"
ogImage: "/blog/og/dublagem-e-voz-com-ia-custos-e-cache.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows.

Dubbing may take several attempts before pronunciation, pacing and delivery fit the video. Clipey Studio brings voice generation and speech controls into the project. Choose a provider carefully and review the script before generating. For a cloud provider, a cost estimate helps you understand possible spend, but it is not a final bill.

## Prepare your script and voice track

1. Open the project and confirm the transcript you want to use as a basis. Correct wording, punctuation and names first; punctuation affects pauses and how a line sounds.
2. In **Clipey Studio**, choose a provider and voice options. The app offers different synthesis providers; some choices, such as recording with a microphone, do not synthesise text.
3. Select a voice and review short lines. A long sentence may sound different when divided into smaller units, so check transitions and timing against the video.
4. Before a cloud run, review its cost estimate and the amount of text or audio shown. If you set a session budget, make sure the run fits within it.
5. Generate the voice and listen in the context of the project. Adjust pronunciation or pacing, then regenerate only the lines that need a change.

## Read the estimate and budget correctly

Cloud voice or transcription estimates use a versioned price table and are indicative. The actual amount can vary with provider, model, billable usage and external price changes. Use an estimate to compare choices and plan a session, not as a guaranteed charge.

The per-session budget is optional. When enabled, it blocks a cloud operation that would exceed the limit and explains that you need to revise the request. It should not block local providers. If a run is blocked, shorten the text or number of lines, select another option, or consciously adjust the limit before trying again.

Characters and minutes are different measures. Text synthesis is generally estimated by characters or text units, while transcription may use audio duration. A short line can be priced differently depending on the selected provider. Check the chosen model and the estimate for that specific operation.

## Avoid regenerating unchanged lines

When voice is generated per line, keep approved wording and change only the line that needs work. The audio cache can reuse a line when its combination of text, voice, provider, model, speed and other synthesis settings has not changed. Changing the voice or a synthesis setting requires new audio for that line; editing another line should not require redoing the untouched ones.

This can save time and avoid repeating a remote generation, but it does not mean every audio file is kept forever. Project audio follows the lifetime of the elements that reference the voice track. Before removing media or clearing project data, make sure you have an exported copy of any result you need to keep.

## Tips for more natural dubbing

- Read the final script aloud before synthesis. Adjust punctuation and split long sentences at pauses that sound natural.
- Generate a short sample to check voice, language and pronunciation before processing a full script.
- Keep spellings for acronyms, names and foreign terms consistent with the pronunciation you want.
- Compare speech timing with the picture. Correct audio can still feel out of step if a scene changes before the line finishes.
- Listen to each line with the one before and after it; isolated previews can hide changes in volume or intonation.
- Check the selected provider before sending text. Local and cloud choices have different processing paths and requirements.

## Limitations

Synthetic voices may pronounce names and abbreviations unexpectedly, and estimates depend on information available for the selected provider and model. Price figures are estimates, not guaranteed quotes. Dubbing does not automatically translate or culturally adapt every part of a script; review both the words and spoken result. Microphone recording is different from synthesis and does not use the same character estimate.

For captions to accompany speech, read [transcripts and SRT/VTT import](/blog/en/automatic-captions-and-srt-vtt-import/). To review pauses and cuts in the video, see [AI editing](/blog/en/ai-editing-cuts-zooms-silence). Learn about [privacy](/en/#privacy).

Next, test one line, listen in the project and generate the rest only after it sounds right.

## Page history

- {{RELEASE_DATE}}: published.
