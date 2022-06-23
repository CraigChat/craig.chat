---
ld:
  '@type': FAQPage
  mainEntity:
    - '@type': Question
      name: How do I get the auto-record feature?
      acceptedAnswer:
        '@type': Answer
        text: You can use auto-recording by becoming a $4 <a href="https://craig.chat/patreon">patron</a>.
    - '@type': Question
      name: Where is the recording panel for my auto-recording?
      acceptedAnswer:
        '@type': Answer
        text: If you set a post channel, it should be sent there unless the bot was unable to post in that channel. Make sure the bot has the permission to send messages and embed links in the channel. You can re-create the recording panel with <b>/join</b>.
    - '@type': Question
      name: Craig didn't auto-record!
      acceptedAnswer:
        '@type': Answer
        text: Make sure Craig has permission to connect the the channel you are auto-recording in. Also make sure Craig can change it's nickname, as this will also prevent Craig from recording.
    - '@type': Question
      name: Craig is taking a long time to auto-record...
      acceptedAnswer:
        '@type': Answer
        text: Craig will check to auto-record when there is no activity (users joining/leaving the channel) in the voice channel for 2 seconds. If a lot of people are joining or leaving the channel too quickly, this will delay the check.
---

# Frequently Asked Questions: Auto-record

## How do I get the auto-record feature?
You can use auto-recording by becoming a $4 [patron](/patreon).

## Where is the recording panel for my auto-recording?
If you set a post channel, it should be sent there unless the bot was unable to post in that channel. Make sure the bot has the permission to send messages and embed links in the channel. You can re-create the recording panel with `/join`.

## Craig didn't auto-record!
Make sure Craig has permission to connect the the channel you are auto-recording in. Also make sure Craig can change it's nickname, as this will also prevent Craig from recording.

## Craig is taking a long time to auto-record...
Craig will check to auto-record when there is no activity (users joining/leaving the channel) in the voice channel for 2 seconds. If a lot of people are joining or leaving the channel too quickly, this will delay the check.

## Craig keeps auto-recording even when I set triggers!
By default, the minimum amount of users to invoke an auto-recording is 1. Make sure to set this to a higher number, as that amount of people or higher will invoke an auto-recording. Trigger users within the auto-recording will override the minimum amount of people in a voice channel and start the recording.
