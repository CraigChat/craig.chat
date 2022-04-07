# Introduction

::: tip QUICKLINKS
- [Bot Invite](/invite/)
- [Dashboard (Patreon/Google Drive)](/dashboard/)
- [Patreon](/patreon/)
- [Support Server](/support/)
:::


## Getting Started

Before you can use Taco, you will need to [invite him](/invite/) to your Discord server. Make sure Craig can **send messages**, **join voice channels**, **change it's own nickname** and **can DM you**. These permissions are nessesary for Craig to work well.

You can see the available slash commands by looking at the [commands list](/commands/).

## Setting up Access roles
Previously, access roles were any roles with the name “Craig”. Now, you can set your access roles with the `/server-settings access-role` command. You must be able to manage the server or be the server owner to manage access roles. You can view your current server settings with `/server-settings view`.

<CraigAccessRoleMessage view="true" />

## Starting a recording

You can start a recording with `/join`. You can also specify a channel, or he will join the voice channel you are currently in. The bot will change it's nickname to indicate that it started recording, don't change the nickname during a recording session as it will remove it after it has finished.

<CraigRecordingMessage />

You should get a direct message with the information about the current recording like this one.

<CraigDownloadMessage />

Clicking "Stop recording" on the recording panel will, obviously, stop the recording. Pressing "Add a note" on the recording panel will prompt you to add a note at the current time. You can also add notes using `/note`.

<CraigNoteMessage />

Users who start talking in the voice channel should show up in the recording panel as them joining the recording. Make sure to keep note of your recording panel, as some important information may show up on it.

## Gaining Benefits
You can record up to 6 hours and your recordings will expire in 7 days. You can get perks and higher limits by becoming a [patron](/patreon/). Make sure your Discord account is linked to your Patreon account or you can visit the [dashboard](/dashboard/) to link it there.

### Auto-recording
Auto-recording is a feature that allows Craig to automatically start a recording when you join a voice channel. Auto-recording can be set up by $4 patrons with `/autorecord on`. You can set the minimum amount of users to auto-record, the users that can trigger the auto-recording, and the channel to post recording panels in. Keep in mind that if the channel falls below the auto-recording requirement, that the recording will end. Auto-recording settings are shown per bot and can be viewed with `/autorecord view`.

<CraigAutorecordMessage view="true" />

### Google Drive
You can link your Google Drive account via the [dashboard](/dashboard/). Any patron can link their Google Drive and you will get a direct message on whether your Google Drive upload has finished or not. Your recordings will be uploaded to a folder named “Craig” and will include the recording ID within the file name.

<CraigDriveMessage />
