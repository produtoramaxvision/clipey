---
title: "How to save a video publish kit"
description: "Bundle an exported video, per-platform copy, exported subtitles and an existing cover in a folder or ZIP file."
slug: "video-cover-copy-publish-kit"
lang: "en"
translationKey: "kit-de-publicacao-video-capas-textos"
category: "tutorials"
tags: ["Publishing", "Export"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 14
cover: "/blog/covers/kit-de-publicacao-video-capas-textos.webp"
coverAlt: "Video and copy files arranged as a publishing kit"
ogImage: "/blog/og/kit-de-publicacao-video-capas-textos.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 for Windows.

Publishing to several networks can leave the video, subtitles, post text, and cover in separate places. A publish kit gathers files that already exist in the project together with copy for each destination, making review and hand-off easier. It does not create new artwork or publish the post for you.

## What the kit contains

Start with an exported video. A kit can also include a `copy-<platform>.txt` file for each platform and a `copy.json` containing the same data in a structured form. If you exported a separate subtitle file, it can be included too. A cover is included only when one already exists in the project; Clipey does not generate cover art automatically.

That distinction matters: the kit organises prepared material, but it is not a cover editor. If the project has no cover, do not expect one to appear. Review the copy before sharing it as well. Suggestions are a starting point and remain editable.

## Save a folder or ZIP

1. Open the project and finish the video. Use **Export** to create the final file before assembling the kit.
2. In the publishing section, fill in and review the title, description, and hashtags for each network. Do not leave draft wording in a kit you plan to share publicly.
3. Choose **Save publish kit**.
4. Select a folder or ZIP file. Folder is the default; choose ZIP when you want one file to attach or transfer.
5. Choose a destination and wait for the progress indicator. Keep the app open while the ZIP is being written.
6. Open the destination and confirm the expected video and copy files are there. If you exported subtitles, check the sidecar file too; if the project already had a cover, check that the image was included.

Text files are separated by platform so you can copy the right version without mixing instructions. `copy.json` holds the same copy as structured data, useful when another workflow reads fields instead of copying them by hand.

## Review suggested copy

When copy suggestions are available, they use the transcript and the clip range as their basis and remain suggestions. Read every title, description, and hashtag. Check proper names, context, and calls to action before saving the kit. Suggestions do not replace your review and are not published automatically.

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

- {{RELEASE_DATE}}: published.
