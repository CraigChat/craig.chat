---
footer: true
sitemap:
  changefreq: daily
  priority: 0.8
aliases:
- /home/webapp/
- /webapp/
---

# Webapp

Craig can use its webapp to make your recordings better! Using the webapp is a free option for any Craig users, enabled with the command `/webapp on`. Using the webapp gives you two advantages over Craig alone:
- When you start a recording with Craig, you're given a Webapp client link. Send this link to whoever you wish to record. Anyone with this link may join the recording through the webapp in Firefox or Chrome, in addition to Discord, and it will capture their audio through the web as another track for Craig. Audio captured through the webapp doesn't go through Discord, which means that it won't be processed, and won't suffer ill effect from bad Internet connections. You will get a cleaner, more complete recording of any user who opts to use it.
- The webapp provides a recording monitor which displays live who's connected and who's speaking, whether through Discord or the Webapp. If you're ever concerned whether your audio is actually making it to Craig, this makes it crystal clear!

<MarkdownImage src="https://get.snaz.in/9Ej2YSr.png" />
<MarkdownImage src="https://get.snaz.in/8ayR26x.png" />

The protocol behind the Craig Webapp is a part of [Ennuicastr](https://ecastr.com), a web-based recording solution by the same original creator of Craig.

### Details
- When used with Craig, the Webapp isn't an independent application: Web tracks are included in the same recording as Discord tracks, and are downloaded through the same system. It should have negligible effect on the editing process, other than providing higher-quality audio for editing.
- The Webapp uses Opus-compressed audio, like Discord itself, but at 128kbit, which in Opus is sufficient for almost any purpose. The audio is compressed in the browser itself, so a modern browser is required! [Patrons](/patreon/) may opt to record directly in FLAC, eliminating lossy compression from the entire recording pipeline.
- The Webapp employs a voice activity detector (VAD), which means it's only transmitting audio when the speaker is talking. However, unlike a traditional VAD, the Craig Webapp's VAD buffers two seconds of surrounding audio, so that there are no sudden cut-ins or cut-outs. [Patrons](/patreon/) may disable the VAD, and thus get continuous recordings of all users.
- The Craig Webapp has the same commitment to synchronization as the rest of Craig. Web clients constantly check for synchronization with the server and account for clock drift, so that multiple tracks never go out of sync.