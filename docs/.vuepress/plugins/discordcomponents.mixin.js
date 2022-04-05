import Vue from "vue";
import {
  applyPolyfills,
  defineCustomElements
} from "@skyra/discord-components-core/loader";

// Tell Vue to ignore all components defined in the @skyra/discord-components-core package.
Vue.config.ignoredElements = [/discord-[\w-]*/];

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});

export default {
  mounted() {
    window.$discordMessage = {
      profiles: {
        craig: {
          author: "Craig",
          avatar: "/craig.png",
          bot: true,
          verified: true,
        },
        snazzah: {
          author: "Snazzah",
          avatar: "https://cdn.snaz.in/avy/current.png"
        }
      },
    };
  }
}