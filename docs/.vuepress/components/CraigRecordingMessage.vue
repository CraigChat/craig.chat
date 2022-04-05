<template>
  <ClientOnly>
    <discord-messages @focus="regen">
      <discord-message :profile="bot || 'craig'">
        <discord-command slot="reply" profile="snazzah" command="/join"></discord-command>
        <discord-embed
          slot="embeds"
          author-image="https://cdn.snaz.in/avy/current.png"
          author-name="Snazzah#0371"
          :color="stopped ? '' : '#2ecc71'"
          :embed-title="stopped ? 'Recording ended.' : '🔴 Recording...'"
        >
          <discord-embed-description slot="description">
            <b>Recording ID:</b> <code>{{ recId }}</code><br />
            <b>Channel:</b> <discord-mention type="voice">Live</discord-mention><br />
            <b>Started:</b> <time>{{ time }}</time> (<time>{{ fromNow() }}</time>)  
          </discord-embed-description>
          <discord-embed-fields slot="fields">
            <discord-embed-field field-title="Activity">
              <code>00:00:00</code> <discord-mention>Snazzah</discord-mention> joined the recording.<br />
              <span v-for="(note, i) in notes" :key="i">
                <code>{{ note }}</code> <discord-mention>Snazzah</discord-mention> added a note.<br />
              </span>
              <span v-if="stopped"><code>{{ stopTime }}</code> <discord-mention>Snazzah</discord-mention> stopped the recording.<br /></span>
            </discord-embed-field>
          </discord-embed-fields>
        </discord-embed>
        <discord-attachments slot="components">
          <discord-action-row>
            <discord-button type="destructive" emoji="https://cdn.discordapp.com/emojis/949783292603949096.png" emoji-name="stop" :disabled="stopped" @click="stop">Stop recording</discord-button>
            <discord-button type="primary" emoji="https://cdn.discordapp.com/emojis/949783292356460557.png" emoji-name="note" :disabled="stopped" @click="note">Add a note</discord-button>
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
dayjs.extend(duration);
dayjs.extend(relativeTime);

export default {
  name: 'CraigRecordingMessage',
  props: ['bot'],
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
      time: 'a few seconds ago',
      stopped: false,
      stopTime: '00:00:00',
      notes: []
    }
  },
  mounted() {
    this.regenInterval = setInterval(this.regen, 60000);
    this.$data.now = window.$craig.now;
    this.$data.recId = window.$craig.recId;
    this.$data.time = new Intl.DateTimeFormat([], { timeStyle: 'medium' }).format(window.$craig.now);
  },
  beforeUnmount() {
    clearInterval(this.regenInterval);
  },
  methods: {
    note() {
      if (this.$data.stopped) return;
      this.$data.notes.push(dayjs.duration(Date.now() - this.$data.now).format('HH:mm:ss'));
    },
    stop() {
      if (this.$data.stopped) return;
      this.$data.stopTime = dayjs.duration(Date.now() - this.$data.now).format('HH:mm:ss');
      this.$data.stopped = true;
    },
    fromNow() {
      return dayjs(this.$data.now).fromNow();
    },
    regen() {
      this.$forceUpdate();
    }
  }
}
</script>