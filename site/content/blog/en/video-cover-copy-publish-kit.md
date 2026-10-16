---
title: "How to save a video publish kit"
description: "Bundle an exported video, per-platform copy, exported subtitles and an existing cover in a folder or ZIP file."
slug: "video-cover-copy-publish-kit"
lang: "en"
translationKey: "kit-de-publicacao-video-capas-textos"
category: "tutorials"
tags: ["Publishing", "Export"]
author: "Clipey Team"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 14
cover: "/blog/covers/kit-de-publicacao-video-capas-textos.webp"
coverAlt: "Video and copy files arranged as a publishing kit"
ogImage: "/blog/og/kit-de-publicacao-video-capas-textos.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 for Windows.

To save a video publish kit in Clipey, finish exporting your video and navigate to Publish kit and copy in the publishing panel. The feature bundles your finalized video, existing cover artwork, exported subtitle sidecars, and platform-specific caption texts into a local folder or a single compressed ZIP file. You can also generate tailored titles, descriptions and hashtags using Suggest copy before saving the bundle.

## What the kit contains

Start with an exported video. A kit can also include a `copy-<platform>.txt` file for each platform and a `copy.json` containing the same data in a structured form. If you exported a separate subtitle file, it can be included too. A cover is included only when one already exists in the project; Clipey does not generate cover art automatically.

That distinction matters: the kit organises prepared material, but it is not a cover editor. If the project has no cover, do not expect one to appear. Review the copy before sharing it as well. Suggestions are a starting point and remain editable.

## Save a folder or ZIP

1. Open the project and finish the video. Use **Export** to create the final file before assembling the kit.
2. In the **Publish kit and copy** section, review or edit the title, description, and hashtags for each network. You can click **Suggest copy** to draft platform-ready captions directly from your clip's transcript.
3. Click **Save publish kit**.
4. In **Kit format**, select **Folder** or **ZIP archive**. Folder is ideal for quick local edits; select ZIP archive when you want a single file to transfer or store.
5. Click **Choose destination** and wait for the progress bar. Keep the app open while the ZIP archive is being written to disk.
6. Open the destination folder and verify the exported video, subtitle sidecar files, cover image, and text files.

Text files are separated by platform so you can copy the right version without mixing instructions. `copy.json` holds the same copy as structured data, useful when another workflow reads fields instead of copying them by hand.

## Review suggested copy

The **Suggest copy** action examines the transcript and playback range of your clip to generate a grounded title, caption, and relevant hashtags. Read every generated field and adjust proper nouns, technical terms, and calls to action before saving the kit. The tool provides a rapid editorial starting point while keeping you in full control of published copy.

Compare factual claims against what is actually in the video. If a person or brand is not in the transcript, do not assume the suggestion got its name right. Review your own edits in the per-platform file after saving too.

## Tips

- Give the project a recognisable name before exporting so the video is easy to identify at the destination.
- Open at least one `copy-<platform>.txt` after saving. The plain-text format makes review and copying quick.
- Treat `copy.json` as a structured version of the same copy, not a second independent draft.
- Check available disk space if the video is large. The kit includes the exported video, not just the text files.
- Use a separate folder for each campaign when you need to keep versions apart; the kit contains the export you selected.

## Limitations

The kit does not create covers, upload files to social networks, or guarantee that a network will accept the video or copy. A cover is included only if the project already has one; subtitles are included only when exported as a separate file. ZIP creation can take time because the video itself is part of the archive, so let it finish before moving or closing the destination.

To schedule a post in Clipey, read [how to schedule a video](/blog/en/scheduled-video-publishing-youtube-tiktok-instagram/). To prepare the right dimensions and checks, see [export presets and verification](/blog/en/reliable-export-presets-verification/). The [publishing features](/en/#publishing) explain the overall workflow.

After checking the video and copy for each destination, hand the kit to whoever will publish it or continue to Clipey's queue. [Download Clipey](/en/#download) to assemble your next kit.

## Page history

- 2026-10-15: published.
