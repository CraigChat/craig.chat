// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://craig.chat",

  fonts: [
    {
      provider: fontProviders.npm({ remote: false }),
      name: "Inter",
      cssVariable: "--font-inter",
      styles: ["normal"],
      weights: ["100 900"],
      options: {
        package: "@fontsource-variable/inter"
      }
    },
    {
      provider: fontProviders.local(),
      name: "Public Sans",
      cssVariable: "--font-public-sans",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/PublicSans-variable.ttf"],
            style: "normal",
            weight: "100 900",
            unicodeRange: ["U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"]
          },
          {
            src: ["./src/assets/fonts/PublicSans-variable-italic.ttf"],
            style: "italic",
            weight: "100 900",
            unicodeRange: ["U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"]
          }
        ]
      }
    }
  ],

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
