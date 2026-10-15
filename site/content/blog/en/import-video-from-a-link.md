---
title: "Import a video from a link and check it before editing"
description: "Paste a video link, review its available details and quality choices, then import it into a project without publishing it."
slug: "import-video-from-a-link"
lang: "en"
translationKey: "importar-video-por-link"
category: "tutorials"
tags: ["Recording", "Privacy", "AI editing"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 12
cover: "/blog/covers/importar-video-por-link.webp"
coverAlt: "Link import dialog with a preview of the video's details"
ogImage: "/blog/og/importar-video-por-link.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 on Windows.

When a video you are allowed to use is hosted online, importing from its link saves you from downloading it separately and locating it in the project. Clipey checks the available information, lets you choose a quality and adds the media to the project. Import does not publish the video, and you are still responsible for having the right to download and reuse the content.

## Paste the link and check the preview

1. Open a project in the editor, or start from the empty state, and choose **Import from link**.
2. Paste the video's address. The tool accepts compatible HTTP or HTTPS links; do not use local paths, private addresses or links that require bypassing access controls.
3. Wait for the metadata lookup. Check the title, duration, thumbnail and channel or uploader when the site provides them.
4. Read the licence information. If the site reports none, Clipey shows **No licence information**. Missing information does not mean the video is free to reuse.
5. Choose a quality and confirm the import. The default seeks the best quality up to 1080p; other choices include up to 720p, best available and audio only.

Clipey uses a command-line tool to inspect and download media. It checks metadata first, then downloads using your selected quality. Follow the progress while it runs. You can cancel if you changed your mind or pasted the wrong link. When it finishes, the file is added to the project's media like an imported asset.

## Match quality to the job

Do not automatically choose the largest option. For checking spoken content or editing a short section, a lower quality may be enough and use less storage. For work that needs more picture detail, choose the highest available quality that suits the project. **Best available** does not promise a particular resolution; the source determines what is offered.

Choose **Audio only** when you need the sound track rather than the picture. Check this choice before starting so you do not download audio when you meant to edit a video.

After import, find the new asset in the project media and open it to check duration and playback. A metadata preview does not guarantee that the source will remain available or that a download will succeed. A video may be private, region-blocked or require an account. If an error appears, check the link, network and source permissions before trying again.

## Rights, licence and responsibility

Import only content you own or have permission to use. The licence field reflects what the source reports, when it reports anything; it does not grant rights or determine whether a licence covers your planned use. Read the site's terms and licence and consider permission, attribution, commercial use and territorial restrictions. Do not use the tool to bypass private content, access controls or restrictions imposed by the source.

The imported file is available in the project for editing; this is not the same as publishing or sharing it. Before export, confirm that third-party content can be included in your finished video. An open licence may still have conditions, and missing licence information calls for extra care.

## Tips

- Use the video's page link rather than a playlist link when you want one item. The import is for the selected media, not an entire collection.
- Check title and duration before choosing quality; they help confirm that you pasted the intended video.
- Pick a quality that fits the task instead of using storage on detail you do not need.
- Let the transfer finish before closing the project, then play the asset from the project media.
- If you need audio for transcription, choose the appropriate option and verify the result before moving on.
- Keep the source and licence information in your editorial records when relevant.

## Limitations

Support depends on the site and the access it provides at the time. Private, unavailable, region-blocked or removed videos may fail. Clipey displays licence information only when the source supplies it and cannot decide whether you have sufficient rights. Links are not a way around authentication or restrictions. Available formats and resolutions depend on the source, and network or disk-space errors can interrupt a transfer.

After import, read [turning a long recording into short clips](/blog/en/auto-clip-shorts-from-long-videos/) or [prepare captions with SRT/VTT](/blog/en/automatic-captions-and-srt-vtt-import/). For data handling, see [privacy](/en/#privacy).

Next, import only a link you are authorised to use, check the asset in the project and review rights before exporting or sharing.

## Page history

- {{RELEASE_DATE}}: published.
