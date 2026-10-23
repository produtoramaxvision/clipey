---
title: "Find short, self-contained clips in a long recording"
description: "Set Auto Clip length limits, compare its scores and review every suggested segment before turning a long recording into Shorts."
slug: "auto-clip-shorts-from-long-videos"
lang: "en"
translationKey: "auto-clip-shorts-de-videos-longos"
category: "tutorials"
tags: ["AI editing", "Recording", "Publishing"]
author: "Clipey Team"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 8
cover: "/blog/covers/auto-clip-shorts-de-videos-longos.webp"
coverAlt: "Clipey Studio showing Auto Clip length and clip-count controls"
ogImage: "/blog/og/auto-clip-shorts-de-videos-longos.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows.

To find short, self-contained clips in a long recording, open Clipey Studio and run Auto Clip on your project's transcript. The tool scores candidate segments across Hook, Coherence, Value and Shareability within predefined duration buckets (such as 15–30s or 30–60s) while snapping cuts to natural sentence boundaries. You can compare the top-rated candidates, preview speaker framing, and create polished vertical Shorts in seconds.

## Set up Auto Clip

1. Open the project with the recording and transcript. The search uses spoken content, so create a transcript in the transcript pane first if one is not available.
2. Open Clipey Studio and find the **Auto Clip** group. The controls allow selecting duration buckets such as **15–30s (Shorts/Reels)**, **30–60s (Standard)** or **60–90s (Deep dive)**, setting **Max clips (up to 20)**, and toggling face tracking.
3. Choose a duration range that fits your destination rather than asking for the largest possible batch. Length bounds constrain each candidate; the count controls how many suggestions the run tries to return. Change one setting at a time to see how it affects the shortlist.
4. Start the analysis and wait for the candidates. The process parses the transcript to locate self-contained ideas with clear sentence boundaries.

Auto Clip evaluates segments across four core dimensions: **Hook**, **Coherence**, **Value** and **Shareability**, accompanied by brief reasoning for each candidate. When an interesting segment falls just shy of the strict cut-off score, Clipey marks it with a **Salvaged** badge so you can inspect and recover it if it suits your editorial goal.

## Treat a candidate as a hypothesis

Start with its first sentence. A clip that opens on a pronoun or relies on a question from earlier in the recording may feel incomplete on its own. Read the reason with the transcript and play the clip with sound. Ask whether the subject is clear without the missing introduction.

Then check the ending. A good cut completes the thought, not just the selected duration. If the final sentence depends on what comes next, reject the suggestion or adjust its boundaries in the main project. The system aims for sentence boundaries rather than cutting through a sentence, but a complete sentence can still lack context.

If a candidate works, review its framing. If speaker face tracking is unavailable on the machine, the system falls back gracefully to a centered crop without halting candidate generation. A clear spoken segment may still need a title or context before it is ready to publish.

## Make an editorial selection

1. Compare candidates by topic, not only by order or score. If several repeat the same point, prefer the one that explains it best without relying on another clip.
2. Listen to the start and end with a few seconds of margin. This catches breaths, clipped words and references such as “that” or “there” without an antecedent.
3. Check names, figures and technical terms in the transcript. Speech recognition can be wrong, and one caption error can change a short clip's meaning.
4. Preview the segment for its intended format. A clip that reads clearly in landscape may need a vertical reframe for a social post.
5. Review the project before export. Suggestions are a starting point, not automatic editorial approval.

## Tips

- Create and correct the transcript for important words before searching. Text-based suggestions are only as useful as the words available to them.
- Use the duration range as a guide, but keep the complete idea. Do not extend a pause just to fill a limit.
- Prefer a claim or demonstration that makes sense without another segment.
- Do not read a score as “viral potential”. It ranks signals, not future performance.
- Keep the original project. A rejected suggestion may point to another useful moment without requiring a new recording.

## Limitations

Results depend on transcript quality and clear recorded audio. Background noise, overlapping talkers, expressive silences and highly context-dependent subjects may require light manual trimming. The scoring process ranks potential clarity; it cannot predict social reach or engagement. Check rights, privacy and on-screen data before publishing.

For manual trims and zooms after choosing a candidate, read [AI editing in a project](/blog/en/ai-editing-cuts-zooms-silence/). For captions, see [transcripts and SRT/VTT import](/blog/en/automatic-captions-and-srt-vtt-import/). Explore [AI features](/en/#ai).

Next, choose a recording with a transcript, generate a shortlist and watch each candidate before accepting it.

## Page history

- 2026-10-15: published.
