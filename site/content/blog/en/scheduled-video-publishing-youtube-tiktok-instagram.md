---
title: "How to schedule video posts in Clipey"
description: "Schedule a video for TikTok, Instagram Reels or Facebook Reels, check local time, and learn why Clipey must stay running. YouTube publishing arrives in the next version."
slug: "scheduled-video-publishing-youtube-tiktok-instagram"
lang: "en"
translationKey: "publicacao-agendada-youtube-tiktok-instagram"
category: "tutorials"
tags: ["Publishing", "Windows"]
author: "Clipey Team"
date: "2026-10-15"
updated: "2026-10-22"
featured: false
order: 13
cover: "/blog/covers/publicacao-agendada-youtube-tiktok-instagram.webp"
coverAlt: "Scheduled publishing queue in Clipey"
ogImage: "/blog/og/publicacao-agendada-youtube-tiktok-instagram.png"
appliesTo: "1.15"
---

> **Applies to:** Clipey 1.15 for Windows.

To schedule video posts in Clipey, finish exporting your video, open the publishing panel, and choose the network you want. After reviewing title and description, use the **Schedule** tab for TikTok, Instagram Reels, or Facebook Reels. Set your desired local date and time at least two minutes ahead, and monitor delivery progress in the **Scheduled queue**. Export does not publish on its own: you publish or schedule each network after the file is ready. YouTube publishing is not available in this version; it arrives in the next version. Because scheduling runs through a local queue on your machine, Clipey or its Windows system tray icon must remain running when the post is due.

## Before you pick a time

Finish editing and export the video first. Scheduled publishing uses the exported file and the title and description fields in the publishing panel. Destinations you can schedule in this version are Facebook Reels, Instagram Reels, and TikTok (direct post). Each needs a connected account, and some networks require extra choices. A connected account does not guarantee every Page or profile is ready: Clipey can show a disconnected account, an expired session, or no Instagram Page.

Pick a time that matches your computer's local timezone. The interface shows the detected timezone name, and you choose the date in **Publication date and time**. Times less than two minutes ahead are rejected to leave room for scheduling.

## Step by step

1. In the editor, finish the project and choose **Export**. Wait until the file is fully written.
2. When export completes, open the publishing panel. Connect the network if it is not connected yet. Sign in through your default browser, then return to Clipey and confirm the account shows as connected.
3. Fill in title and description. Review the text and select Page or network options when prompted.
4. To publish immediately, click **Publish**. To schedule, open the **Schedule** tab and set **Publication date and time** in your local time.
5. If you want the app to start with Windows, enable the option to launch Clipey at startup (minimized to the tray). That helps keep the queue active in the background.
6. Confirm the schedule or immediate publish. Scheduled items appear in the local queue with the matching status.
7. Check **Scheduled queue**. Each item shows the network, title, status, and scheduled time. Use **Refresh queue** to sync the list.

In the queue, an item with **Scheduled** status can be cancelled or rescheduled. Items with **Failed**, **Missed**, or **Reconnection required** offer **Publish now**, **Reschedule**, or **Reconnect** so you can fix authentication without starting over.

## What happens at the due time

Clipey checks the queue while running and attempts to publish due items. The UI shows upload and processing progress until success or a detailed error. Delivery still depends on the social network accepting the format and credentials; the local scheduler only orchestrates the attempt.

If the computer sleeps, shuts down, or Clipey exits, do not expect a cloud-based background upload. On startup, items that became due while the app was closed are marked **Missed**, not published automatically. This avoids sending an old post at an unexpected time after a long interruption.

The Windows tray behaviour matters: closing the main window keeps Clipey running in the tray, ready for due times. Quitting from the tray icon's menu ends the process and pauses the queue.

## Tips

- Run a test publish ahead of time and confirm the destination, account, and options are what you expect.
- Leave margin to power on the PC and fix an expired session.
- Use **Reschedule** to adjust a queue item instead of deleting and recreating it when edits are still allowed.
- A **Published** status and result link mean the process reported success; open the link to verify the post on the platform.
- If the file changed after scheduling, export the final version again and confirm which file the queue item uses.

## Limitations

Scheduling is local to Clipey and requires the app to be running at the due time. Startup minimization is a local convenience, not a cloud scheduler or a guarantee against system sleep. Items due while the app is closed are marked missed rather than sent automatically. You cannot schedule YouTube in this version.

## Frequently asked questions

### Will a scheduled post go out if Clipey is closed?
No. Clipey or its tray icon must be running at the scheduled time. Posts whose time passed while the app was closed are marked "Missed" so you can publish or reschedule.

### Does scheduling upload my video to the cloud before the post time?
No. Clipey's schedule queue is strictly local; the video file stays on your computer until the moment the publish attempt runs.

### What if a post fails because of network or an expired session?
Clipey keeps the item in the queue with status "Failed" or "Reconnection required", so you can reconnect the account and try again with **Publish now** or **Reschedule**.

### What about YouTube?
In this version YouTube shows as unavailable in the publishing panel. YouTube publishing arrives in the next version.

To prepare a file bundle before publishing, read [how to save a publish kit](/blog/en/video-cover-copy-publish-kit/). To check the final file before sending it, see [export presets and verification](/blog/en/reliable-export-presets-verification/). The [publishing features](/en/#publishing) explain the overall workflow.

When the queue and account look right, keep Clipey open and the computer available until the chosen time. [Download Clipey](/en/#download) if you do not have version 1.15 yet.

## Page history

- 2026-10-15: published.
- 2026-10-22: aligned with Clipey 1.15 publishing scope (no YouTube in this version).
