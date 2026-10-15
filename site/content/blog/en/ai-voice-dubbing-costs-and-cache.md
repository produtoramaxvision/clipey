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

To generate AI voice and dubbing with cost estimates in Clipey, select your transcript lines in Clipey Studio and choose a synthesis voice. The app calculates real-time estimated charges in USD from character counts and a versioned pricing table, letting you set an optional session budget to prevent surprise cloud bills. Generated voice lines are cached per sentence based on text, voice, provider, and speed settings, reusing existing audio automatically without incurring redundant costs.

## Prepare your script and voice track

1. Open the project and confirm the transcript you want to use as a basis. Correct wording, punctuation and names first; punctuation affects pauses and how a line sounds.
2. In **Clipey Studio**, choose a provider and voice options. Local models display **Free (on-device)**, while remote services show clear cost estimates.
3. Select a voice and review short lines. A long sentence may sound different when divided into smaller units, so check transitions and timing against the video.
4. Before a cloud run, review its **Estimated cost** and character count. If you enable **Limit session spend**, configure a **Budget ($)** to track the remaining allowance.
5. Generate the voice and listen in the context of the project. Adjust pronunciation or pacing, then regenerate only the lines that need a change.

## Read the estimate and budget correctly

Cloud voice or transcription estimates use a versioned price table within the application and are indicative. The actual amount billed by your external API provider can vary slightly with taxes, rounding or external rate updates. Use the estimate to plan and manage session expenses before submitting requests.

The **Session budget** control is optional. When enabled, it blocks cloud operations that would exceed the configured ceiling, displaying **Budget limit reached** with the remaining budget. Importantly, budget limits never block free local synthesis or microphone recording on your computer.

Characters and audio minutes represent different charging models. Text synthesis prices by character count, while audio transcription estimates by audio duration. A short sentence reflects a small character footprint with units detailed in the interface.

## Avoid regenerating unchanged lines

When voice is generated per line, Clipey caches each synthesized audio line based on a hash of text, voice, provider, model and speaking speed. Changing one line in a scene leaves the others intact, and the interface reports how many cached lines were reused without re-billing or re-downloading audio.

This granular caching accelerates iterative script refinement. Switching a voice timbre requires generating new audio for affected lines, but neighboring lines remain safely cached.

## Tips for more natural dubbing

- Read the final script aloud before synthesis. Adjust punctuation and split long sentences at pauses that sound natural.
- Generate a short sample to check voice, language and pronunciation before processing a full script.
- Keep spellings for acronyms, names and foreign terms consistent with the pronunciation you want.
- Compare speech timing with the picture. Correct audio can still feel out of step if a scene changes before the line finishes.
- Listen to each line with the one before and after it; isolated previews can hide changes in volume or intonation.
- Check the selected provider before sending text. Local and cloud choices have different processing paths and requirements.

## Limitations

Synthetic voices may pronounce names and abbreviations unexpectedly, and estimates depend on information available for the selected provider and model. Price figures are estimates, not guaranteed quotes. Dubbing does not automatically translate or culturally adapt every part of a script; review both the words and spoken result. Microphone recording is different from synthesis and does not use the same character estimate.

For captions to accompany speech, read [transcripts and SRT/VTT import](/blog/en/automatic-captions-and-srt-vtt-import/). To review pauses and cuts in the video, see [AI editing](/blog/en/ai-editing-cuts-zooms-silence/). Learn about [privacy](/en/#privacy).

Next, test one line, listen in the project and generate the rest only after it sounds right.

## Page history

- {{RELEASE_DATE}}: published.
