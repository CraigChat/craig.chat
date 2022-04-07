<template>
  <ClientOnly>
    <discord-messages @focus="regen">
      <discord-message :profile="bot || 'craig'">
        <discord-embed slot="embeds" color="#2ecc71" embed-title="Uploaded to Google Drive">
          <discord-embed-description slot="description">Recording <code>{{ recId }}</code> was uploaded to Google Drive.</discord-embed-description>
        </discord-embed>
        <discord-attachments slot="components">
          <discord-action-row>
            <discord-button url="https://drive.google.com">Open in Google Drive</discord-button>
          </discord-action-row>
        </discord-attachments>
      </discord-message>
    </discord-messages>
  </ClientOnly>
</template>

<script>
export default {
  name: 'CraigDriveMessage',
  props: ['bot'],
  data() {
    return {
      recId: ''
    }
  },
  mounted() {
    this.$data.recId = window.$craig.recId;
  }
}
</script>