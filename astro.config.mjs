// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://craig.chat",

  env: {
    schema: {
      PLAUSIBLE_URL: envField.string({ context: "client", access: "public", optional: true })
    }
  },

  redirects: {
    "/invite": {
      status: 302,
      destination: "https://discord.com/oauth2/authorize?client_id=272937604339466240&permissions=68159488&scope=bot%20applications.commands"
    },
    ...(["/invitegiarc", "/giarcinvite"].reduce((p, r) => ({ ...p, [r]: {
      status: 302,
      destination: 'https://discord.com/oauth2/authorize?client_id=486698344429781028&permissions=68159488&scope=bot%20applications.commands'
    } }), {})),

    "/patreon": {
      status: 302,
      destination: 'https://patreon.com/CraigRec'
    },
    "/github": {
      status: 302,
      destination: 'https://github.com/CraigChat'
    },
    "/dashboard": {
      status: 302,
      destination: 'https://my.craig.chat/'
    },

    ...(["/support", "/server", "/home/support", "/home/mobile"].reduce((p, r) => ({ ...p, [r]: {
      status: 302,
      destination: 'https://discord.gg/PEc4QBE45f'
    } }), {})),

    "/docs": "https://docs.craig.chat",
    "/docs/webapp": "https://docs.craig.chat/features/webapp",
    "/faq/autorecord": "/faq",
    "/faq/drive": "/faq",
    "/giarc": "https://docs.craig.chat/giarc",

    "/home": "/",
    "/home/privacy.php": "/privacy",
    "/home/privacy": "/privacy",
    "/home/commands.php": "/commands",
    "/home/commands": "/commands",
    "/home/newbie.php": "/primer",
    "/home/newbie": "/primer",
    "/home/webapp.php": "https://docs.craig.chat/features/webapp",
    "/home/webapp": "https://docs.craig.chat/features/webapp",
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com']
    }
  },

  integrations: [svelte({ extensions: ['.svelte'] }), sitemap()]
});