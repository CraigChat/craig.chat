import Vue from "vue";
import {
  applyPolyfills,
  defineCustomElements
} from "@skyra/discord-components-core/loader";
import { nanoid, customAlphabet } from 'nanoid';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const recNanoid = customAlphabet(alphabet, 10);

// Tell Vue to ignore all components defined in the @skyra/discord-components-core package.
Vue.config.ignoredElements = [/discord-[\w-]*/];

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});

export default {
  mounted() {
    if (window) {
      window.$discordMessage = {
        profiles: {
          craig: {
            author: "Craig",
            avatar: "/craig.svg",
            bot: true,
            verified: true
          },
          giarc: {
            author: "Giarc",
            avatar: "/giarc.png",
            bot: true,
            verified: true
          },
          alistair: {
            author: "Alistair",
            avatar: "/alistair.svg",
            bot: true
          },
          snazzah: {
            author: "Snazzah",
            avatar: "https://cdn.snaz.in/avy/current.png"
          }
        },
      };
      window.$craig = {
        now: Date.now(),
        recId: recNanoid(),
        accessKey: nanoid(6),
        deleteKey: nanoid(6),
        ennuiKey: nanoid(6)
      };
    }
  }
}