<template>
  <ClientOnly>
    <discord-messages @focus="regen">
      <discord-message :profile="bot || 'craig'">
        <discord-embed slot="embeds">
          <discord-embed-description slot="description">Started recording in <discord-mention type="voice">Live</discord-mention> at <time>{{ localTime }}</time>.
            <discord-quote>You can bring up the recording panel with <code>/join</code>.</discord-quote>
            <br />
            <b>Guild:</b> A Cool Podcast (123456789012345678)<br />
            <b>Recording ID:</b> <code>{{ recId }}</code><br />
            <b>Delete key:</b> <code>{{ deleteKey }}</code><br />
            <span v-if="webapp"><b>Webapp URL:</b> <a href="#">https://web.craig.chat/?id={{ recId }}&key={{ ennuiKey }}</a><br /></span>
            I will record up to 6 hours, I'll stop recording <time>{{ stoppingAt() }}</time> from now.
            This recording will expire <time>{{ expiringAt() }}</time>. (7 days from now)
          </discord-embed-description>
          <discord-embed-footer slot="footer">
            The audio can be downloaded even while I'm still recording.
          </discord-embed-footer>
        </discord-embed>
        <discord-attachments slot="components">
          <discord-action-row>
            <discord-button url="#" emoji="https://cdn.discordapp.com/emojis/949825704923639828.png" emoji-name="download">Download</discord-button>
            <discord-button url="#" emoji="https://cdn.discordapp.com/emojis/949825704596500481.png" emoji-name="delete">Delete recording</discord-button>
          </discord-action-row>
          <discord-action-row>
            <discord-button url="#">Jump to recording panel</discord-button>
          </discord-action-row>
        </discord-attachments>
      </discord-message>
    </discord-messages>
  </ClientOnly>
</template>

<script>
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default {
  name: 'CraigDownloadMessage',
  props: ['webapp', 'bot'],
  computed: {
    data() {
      return this.$page.frontmatter
    },
    config() {
      return this.$site.themeConfig.footer || {}
    }
  },
  data() {
    return {
      now: 0,
      recId: '',
      deleteKey: '',
      ennuiKey: '',
      localTime: '...',
      stopped: false,
      stopTime: '00:00:00',
      notes: []
    }
  },
  mounted() {
    this.regenInterval = setInterval(this.regen, 60000);
    this.$data.now = window.$craig.now;
    this.$data.recId = window.$craig.recId;
    this.$data.deleteKey = window.$craig.deleteKey;
    this.$data.ennuiKey = window.$craig.ennuiKey;
    this.$data.localTime = dayjs(this.$data.now).format('LLLL');
  },
  beforeUnmount() {
    clearInterval(this.regenInterval);
  },
  methods: {
    stoppingAt() {
      return dayjs(this.$data.now + (1000 * 60 * 60 * 6)).fromNow();
    },
    expiringAt() {
      return dayjs(this.$data.now + (1000 * 60 * 60 * 24 * 7)).fromNow();
    },
    regen() {
      this.$forceUpdate();
    }
  }
}
</script>