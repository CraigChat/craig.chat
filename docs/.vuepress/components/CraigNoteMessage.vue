<template>
  <ClientOnly>
    <discord-messages @focus="regen">
      <discord-message :profile="bot || 'craig'" ephemeral>
        <discord-command slot="reply" profile="snazzah" command="/note"></discord-command>
        Added the note to the recording!
      </discord-message>
    </discord-messages>
  </ClientOnly>
</template>

<script>
export default {
  name: 'CraigNoteMessage',
  props: ['bot']
}
</script>