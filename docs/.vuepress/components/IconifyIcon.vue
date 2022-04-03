<template>
  <Icon :icon="icon" :class="className" :inline="inline || false" />
</template>

<script>
import { Icon, addCollection } from '@iconify/vue2';

import twemojiIcons from '@iconify/json/json/twemoji.json';
import mdiIcons from '@iconify/json/json/mdi.json';
import ggIcons from '@iconify/json/json/gg.json';
import biIcons from '@iconify/json/json/bi.json';
import evaIcons from '@iconify/json/json/eva.json';
import icomoonIcons from '@iconify/json/json/icomoon-free.json';

addCollection(twemojiIcons);
addCollection(mdiIcons);
addCollection(ggIcons);
addCollection(biIcons);
addCollection(evaIcons);
addCollection(icomoonIcons);

export default {
  name: 'IconifyIcon',
  components: { Icon },
  props: {
    icon: {
      required: true
    },
    className: {
      required: false
    },
    inline: {
      required: false
    },
  }
}
</script>