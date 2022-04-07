<template>
  <ClientOnly>
    <discord-messages @focus="regen">
      <discord-message :profile="bot || 'craig'" ephemeral>
        <discord-command slot="reply" profile="snazzah" command="/autorecord" />
        Auto-recording on <discord-mention type="voice">Live</discord-mention> has been activated. Please make sure you can receive DMs from me.
      </discord-message>
      <discord-message v-if="view" :profile="bot || 'craig'" ephemeral>
        <discord-command slot="reply" profile="snazzah" command="/autorecord" />
        <discord-embed slot="embeds" embed-title="Auto-recorded Channels">
          <discord-embed-description slot="description"><discord-mention type="voice">Live</discord-mention> by <discord-mention>Snazzah</discord-mention> (posting to <discord-mention type="channel">live-chat</discord-mention>)</discord-embed-description>
        </discord-embed>
      </discord-message>
    </discord-messages>
  </ClientOnly>
</template>

<script>
export default {
  name: 'CraigAutorecordMessage',
  props: ['bot', 'view']
}
</script>