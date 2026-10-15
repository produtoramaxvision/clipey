---
title: "How to schedule video posts in Clipey"
description: "Schedule a video for YouTube, TikTok, Instagram or Facebook, check local time, and learn why Clipey must stay running."
slug: "scheduled-video-publishing-youtube-tiktok-instagram"
lang: "en"
translationKey: "publicacao-agendada-youtube-tiktok-instagram"
category: "tutorials"
tags: ["Publishing", "Windows"]
author: "Clipey Team"
date: "{{RELEASE_DATE}}"
updated: "{{RELEASE_DATE}}"
featured: false
order: 13
cover: "/blog/covers/publicacao-agendada-youtube-tiktok-instagram.webp"
coverAlt: "Scheduled publishing queue in Clipey"
ogImage: "/blog/og/publicacao-agendada-youtube-tiktok-instagram.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 for Windows.

Scheduling in Clipey is not an upload to a cloud service. The app keeps a local queue and sends the video when its scheduled time arrives. Your computer and Clipey therefore need to be available. This guide walks through preparing an export, choosing a destination, and checking the queue before you leave the editor.

## Before you choose a time

Finish editing and export the video first. Scheduled publishing uses the exported file and the title and description fields in the publishing panel. The available destinations are YouTube, Facebook, Instagram, and TikTok. Each needs a connected account, and some networks require extra choices. A connected account does not guarantee every Page or profile is ready: Clipey can show a disconnected account, an expired session, or no Instagram Page.

Choose a time using the computer's local time zone. The interface displays the detected zone and uses a local date-and-time field. Convert times from another zone before entering them.

## Schedule a post

1. Finish the project, choose **Export**, and wait for the file to be created.
2. In the publishing step, connect the target network if needed. Sign-in opens in your default browser. Return to Clipey and check that the account is connected.
3. Fill in **Title** and **Description**. Review the text and choose privacy or a Page where the selected network offers those options.
4. Open the **Schedule** tab. Set **Date and time** using local time. The app rejects invalid dates and times less than two minutes in the future.
5. Optionally enable **Open at startup** so Clipey launches when Windows starts. This can help you resume the queue after a restart, but it does not keep a scheduled upload running if the app is closed at its due time.
6. Schedule the post for the intended network. Its row changes to a scheduled state and it appears in the queue.
7. Review the **Scheduled queue**. Each row shows its network, title, status, and due time. Choose **Refresh queue** to load the latest state.

You can cancel or reschedule a scheduled item in the queue. Depending on its state, a failed, missed, or reconnect-needed item may also offer **Publish now** or **Reschedule**. Reconnect an expired account before retrying.

## When the time arrives

Clipey checks the queue while it is running and attempts to publish due items. The interface can show upload progress, processing, success, or an error. The social network still has to accept the file, account, and permissions; scheduling cannot guarantee that the platform will approve a post.

If the computer sleeps, shuts down, or Clipey exits, do not expect a cloud-based background upload. On startup, items that became due while the app was closed are marked **Missed**, not published automatically. This avoids sending an old post at an unexpected time after a long interruption.

Closing the main window may leave Clipey in the Windows tray, while choosing **Quit** from the tray menu exits the app. Before an important post, confirm Clipey remains in the tray and Windows is not set to sleep.

## Tips

- Test the destination, account, and privacy choice ahead of time with a post that is safe to review.
- Leave time to wake the computer and renew an expired session.
- Use **Reschedule** on an existing queue item when its time needs to change.
- A **Published** status and result link mean the publishing process returned success. Open the link to check the post on the platform.
- If you change the video after scheduling, export the final version again and verify which file the queued item references.

## Limitations

Scheduling is local to Clipey and requires the app to be running at the due time. **Open at startup** is a Windows convenience, not a remote service or a promise that the computer will stay awake. Items due while the app is closed are marked missed rather than sent automatically. Networks may reject content, require renewed authorization, or enforce their own format and account rules.

To prepare files before posting, read [how to save a publish kit](/blog/en/video-cover-copy-publish-kit/). To inspect an export before uploading, see [export presets and verification](/blog/en/reliable-export-presets-verification/). Browse the [publishing features](/en/#publishing).

After checking the account and queue, keep Clipey open and the computer available until the scheduled time. [Download Clipey](/en/#download) if you still need version 1.15.

## Page history

- {{RELEASE_DATE}}: published.
