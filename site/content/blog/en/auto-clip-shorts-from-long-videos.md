---
title: "Find short, self-contained clips in a long recording"
description: "Set Auto Clip length limits, compare its scores and review every suggested segment before turning a long recording into Shorts."
slug: "auto-clip-shorts-from-long-videos"
lang: "en"
translationKey: "auto-clip-shorts-de-videos-longos"
category: "tutorials"
tags: ["AI editing", "Recording", "Publishing"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 8
cover: "/blog/covers/auto-clip-shorts-de-videos-longos.webp"
coverAlt: "Clipey Studio showing Auto Clip length and clip-count controls"
ogImage: "/blog/og/auto-clip-shorts-de-videos-longos.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows.

A long recording may contain several useful explanations, but scrubbing through all of it takes time. Auto Clip looks for moments that might stand on their own. Treat it as a first-pass shortlist: set a duration range, compare the candidates and watch each beginning and ending before publishing.

## Set up Auto Clip

1. Open the project with the recording and transcript. The search uses spoken content, so create a transcript in the transcript pane first if one is not available.
2. Open Clipey Studio and find the **Auto Clip** group. Its controls let you set minimum and maximum clip length, the number of results to seek, and whether to use face focus.
3. Choose a duration range that fits your destination rather than asking for the largest possible batch. Length bounds constrain each candidate; the count controls how many suggestions the run tries to return. Change one setting at a time to see how it affects the shortlist.
4. Start the analysis and wait for the candidates. It can use an AI provider configured in the app, so check your provider setup first if you do not want text sent to an external service.

Auto Clip uses transcript text to find segments with potential as short videos. Candidate assessments separate qualities such as hook, coherence, value and shareability, and may include a short reason. A score helps you compare options; it is not a view forecast or a promise that an audience will like the result.

## Treat a candidate as a hypothesis

Start with its first sentence. A clip that opens on a pronoun or relies on a question from earlier in the recording may feel incomplete on its own. Read the reason with the transcript and play the clip with sound. Ask whether the subject is clear without the missing introduction.

Then check the ending. A good cut completes the thought, not just the selected duration. If the final sentence depends on what comes next, reject the suggestion or adjust its boundaries in the main project. The system aims for sentence boundaries rather than cutting through a sentence, but a complete sentence can still lack context.

If a candidate works, review its framing. With face focus enabled, composition can use available focal points; check the result during playback, not only in a still frame. A clear spoken segment may still need a title or context before it is ready to publish.

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

Results depend on the transcript and available provider. Noise, overlapping speech, expressive pauses and topics that need context can all lead to weak boundaries. The process cannot guarantee a strong clip from every recording or predict reach, retention or engagement. Review face-focused framing in the preview too. Before sharing, check rights, privacy and any information visible on screen.

For manual trims and zooms after choosing a candidate, read [AI editing in a project](/blog/en/ai-editing-cuts-zooms-silence/). For captions, see [transcripts and SRT/VTT import](/blog/en/automatic-captions-and-srt-vtt-import/). Explore [AI features](/en/#ai).

Next, choose a recording with a transcript, generate a shortlist and watch each candidate before accepting it.

## Page history

- {{RELEASE_DATE}}: published.
