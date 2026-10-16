---
title: "How to schedule video posts in Clipey"
description: "Schedule a video for YouTube, TikTok, Instagram or Facebook, check local time, and learn why Clipey must stay running."
slug: "scheduled-video-publishing-youtube-tiktok-instagram"
lang: "en"
translationKey: "publicacao-agendada-youtube-tiktok-instagram"
category: "tutorials"
tags: ["Publishing", "Windows"]
author: "Clipey Team"
date: "2026-10-15"
updated: "2026-10-15"
featured: false
order: 13
cover: "/blog/covers/publicacao-agendada-youtube-tiktok-instagram.webp"
coverAlt: "Scheduled publishing queue in Clipey"
ogImage: "/blog/og/publicacao-agendada-youtube-tiktok-instagram.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 for Windows.

To schedule video posts in Clipey, finish exporting your video and open the Schedule tab in the publishing panel for YouTube, TikTok, Instagram or Facebook. Set your desired local date and time at least two minutes ahead, and monitor delivery progress directly in the Scheduled queue. Because scheduling runs through a local queue on your machine, Clipey or its Windows system tray icon must remain running when the post is due.

## Before you choose a time

Finish editing and export the video first. Scheduled publishing uses the exported file and the title and description fields in the publishing panel. The available destinations are YouTube, Facebook, Instagram, and TikTok. Each needs a connected account, and some networks require extra choices. A connected account does not guarantee every Page or profile is ready: Clipey can show a disconnected account, an expired session, or no Instagram Page.

Choose a time using the computer's local time zone. The interface displays the detected zone and uses **Post publication date and time**. Times less than two minutes in the future are rejected to protect delivery scheduling.

## Schedule a post

1. Finish the project, choose **Export**, and wait for the file to be created.
2. In the publishing step, connect the target network if needed. Sign-in opens in your default browser. Return to Clipey and check that the account is connected.
3. Fill in title and description. Review the text and choose privacy or a Page where the selected network offers those options.
4. Open the **Schedule** tab. Set **Post publication date and time** using local time.
5. Optionally enable opening Clipey on Windows startup (minimized to the system tray). This keeps the local queue running in the background without cluttering your desktop.
6. Click **Schedule**. The post transitions to a scheduled state and appears in the queue.
7. Review the **Scheduled queue**. Each row shows its network, title, status, and due time. Choose **Refresh queue** to load the latest state.

You can cancel or reschedule an item in the queue. Items marked **Failed**, **Missed**, or **Needs reconnect** offer **Publish now**, **Reschedule**, or **Reconnect** actions to quickly resolve issues without rebuilding the post.

## When the time arrives

Clipey checks the queue while it is running and attempts to publish due items. The interface displays upload and processing progress up to final confirmation. The social network still has to accept the file and account credentials; scheduling coordinates local delivery.

If the computer sleeps, shuts down, or Clipey exits, do not expect a cloud-based background upload. On startup, items that became due while the app was closed are marked **Missed**, not published automatically. This avoids sending an old post at an unexpected time after a long interruption.

Closing the main window leaves Clipey running in the Windows notification tray, keeping scheduled delivery active. Choosing to exit from the tray icon menu shuts down the process and pauses queue execution.

## Tips

- Test the destination, account, and privacy choice ahead of time with a post that is safe to review.
- Leave time to wake the computer and renew an expired session.
- Use **Reschedule** on an existing queue item when its time needs to change.
- A **Published** status and result link mean the publishing process returned success. Open the link to check the post on the platform.
- If you change the video after scheduling, export the final version again and verify which file the queued item references.

## Limitations

Scheduling is local to Clipey and requires the app to be running at the due time. Startup minimization is a local convenience, not a cloud scheduler or a guarantee against system sleep. Items due while the app is closed are marked missed rather than sent automatically.

## Frequently asked questions

### Will a scheduled post publish if Clipey is closed?
No. Clipey or its minimized icon in the Windows system tray must be active when the post is due. Any post that comes due while the app was closed is marked as "Missed" upon restart so you can decide whether to publish or reschedule.

### Does scheduling upload my video to a cloud server beforehand?
No. The publishing queue is kept locally on your computer; your video remains on your local disk until the scheduled time, when Clipey uploads it directly to the social platform.

### What happens if an upload fails due to network trouble or an expired token?
Clipey updates the queue item status to "Failed" or "Needs reconnect". You can renew the account authorization and retry publishing using "Publish now" or "Reschedule".

To prepare files before posting, read [how to save a publish kit](/blog/en/video-cover-copy-publish-kit/). To inspect an export before uploading, see [export presets and verification](/blog/en/reliable-export-presets-verification/). Browse the [publishing features](/en/#publishing).

After checking the account and queue, keep Clipey open and the computer available until the scheduled time. [Download Clipey](/en/#download) if you still need version 1.15.

## Page history

- 2026-10-15: published.
