<template>
  <ClientOnly>
    <discord-messages>
      <discord-message :profile="bot || 'craig'" ephemeral>
        <discord-command slot="reply" profile="snazzah" command="/server-settings" />
        <span v-if="!removed">Added <discord-mention type="role" color="#e74c3c">Recorders</discord-mention> to access roles.</span>
        <span v-else>Removed <discord-mention type="role" color="#e74c3c">Recorders</discord-mention> from access roles.</span>
      </discord-message>
      <discord-message v-if="view" :profile="bot || 'craig'" ephemeral>
        <discord-command slot="reply" profile="snazzah" command="/server-settings" />
        <discord-embed slot="embeds" embed-title="Server Settings">
          <discord-embed-description slot="description"><b>Access Roles:</b> <discord-mention type="role" color="#e74c3c">Recorders</discord-mention></discord-embed-description>
        </discord-embed>
      </discord-message>
    </discord-messages>
  </ClientOnly>
</template>

<script>
export default {
  name: 'CraigAccessRoleMessage',
  props: ['bot', 'removed', 'view']
}
</script>