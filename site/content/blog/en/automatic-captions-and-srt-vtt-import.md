---
title: "Create captions and import SRT or VTT subtitles"
description: "Transcribe a recording, style its captions and import an SRT or VTT track without replacing existing transcript text by surprise."
slug: "automatic-captions-and-srt-vtt-import"
lang: "en"
translationKey: "legendas-automaticas-e-importar-srt-vtt"
category: "tutorials"
tags: ["Captions", "AI editing", "Export"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 9
cover: "/blog/covers/legendas-automaticas-e-importar-srt-vtt.webp"
coverAlt: "Clipey transcript pane and caption controls"
ogImage: "/blog/og/legendas-automaticas-e-importar-srt-vtt.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows.

Captions make a recording easier to follow without relying on sound alone, but you do not always need to transcribe everything again. Clipey lets you work from a project's transcript, adjust how captions appear and import existing SRT or VTT subtitles. Importing a subtitle file creates timed text; it does not run speech recognition.

## Create or check a transcript

1. Open the project and select the recording with speech.
2. In the **Transcript** pane, choose **Transcribe now** if there is no transcript yet. Wait for the task to finish before reviewing words or opening caption settings.
3. Read through the text and correct names, figures and technical terms. The transcript is editable, so fix a recognition error before changing how the words look.
4. Open **Captions** from the transcript pane to see presentation options. The settings take the place of the transcript pane; close them when you want to return to the text.

With a generated transcript, Clipey associates words with timings and can show captions over the video. Options include showing or hiding captions, style, position and words per line. Keep the preview visible while changing them: a setting that reads well in one scene might cover an important control in another.

## Import an SRT or VTT file

If you already have a subtitle track, use **Import subtitles** in the transcript pane and choose an .srt or .vtt file. When the project already has a transcript, Clipey asks for confirmation before replacing it; cancel if you want to keep the current text. If it detects a sidecar subtitle with the same base name as the video, it offers an import action rather than replacing the transcript automatically.

Import reads cue timings and text to create a transcript. This is useful when another workflow has already produced subtitles: you can reuse the words and timing without starting speech recognition. Still, compare sync near the start, middle and end. A file made for a different version of the video may begin in sync and drift later.

## Review your captions

1. Play from the beginning and check that the first line appears at the right moment.
2. Jump to the middle and near the end. Confirm that timing remains aligned throughout the file.
3. Inspect long cues. If line breaks split phrases awkwardly, edit the text and words-per-line settings.
4. Check names and punctuation. Imported files preserve supplied text, which may include errors, long lines or a different capitalisation style.
5. Export a short test section and inspect the rendered result before finishing a longer project.

For CJK languages such as Chinese, Japanese and Korean, wrapping needs to account for the fact that ideographs do not behave like words separated by spaces. Clipey caption handling considers display width and break opportunities. Check mixed Latin and CJK lines, especially around punctuation. Avoid manual breaks that leave an opening character at the end of a line or split a Latin word.

## Tips

- Treat the transcript as editable source text. Styling cannot fix a misrecognised word.
- Keep the original SRT or VTT as a reference when importing an external track. It helps compare text and timing if the file does not match the intended video.
- If the video and subtitles came from different edits, fix synchronisation before spending time on appearance.
- Keep captions short enough to read while the video continues. Consider the rendered width, not only the character count.
- Check captions with sound off too; the text should convey the speech without relying on an inaudible word.

## Limitations

Clipey does not verify whether imported text or translations are correct. Import reuses existing text and timing; it does not recognise the audio. Different edits or durations can cause subtitle drift. Automatic transcription can also make mistakes, so review it before export.

For agent-assisted edits to pauses and wording, read [AI editing](/blog/en/ai-editing-cuts-zooms-silence/). To find short segments in a long recording, see [Auto Clip](/blog/en/auto-clip-shorts-from-long-videos/). Explore the [AI features](/en/#ai).

Next, import a subtitle track or transcribe a short section, correct its text and check sync in the preview.

## Page history

- {{RELEASE_DATE}}: published.
