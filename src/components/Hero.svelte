<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IconifyIcon } from "@iconify/svelte";
  import checkIcon from '@iconify-icons/mdi/check-bold';
  import replayIcon from '@iconify-icons/mdi/replay';
  import noteIcon from '@iconify-icons/mdi/bookmark-plus';
  import { onMount, type Snippet } from "svelte";
  import { SvelteSet } from "svelte/reactivity";
  import { fly } from "svelte/transition";
  
  // #region icons
  const StopIcon: IconifyIcon = {
    width: 24,
    height: 24,
    body: '<path fill="currentColor" d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"></path>'
  };

  const RecordingEmoji: IconifyIcon = {
    width: 24,
    height: 24,
    body: '<path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#DD2E44"/>'
  };

  const VoiceChannelIcon: IconifyIcon = {
    width: 24,
    height: 24,
    body: '<path fill="currentColor" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"></path>'
  };

  const RestrictedVoiceChannelIcon: IconifyIcon = {
    width: 24,
    height: 24,
    body: '<path fill="currentColor" fill-rule="evenodd" d="M16 4h.5v-.5a2.5 2.5 0 0 1 5 0V4h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4-.5V4h-2v-.5a1 1 0 1 1 2 0Z" clip-rule="evenodd"></path><path fill="currentColor" d="M11 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-.06a1 1 0 0 1-.74-.32L5.92 17H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.92l4.28-4.68a1 1 0 0 1 .74-.32H11ZM20.5 12c-.28 0-.5.22-.52.5a7 7 0 0 1-5.13 6.25c-.48.13-.85.55-.85 1.05v.03c0 .6.52 1.06 1.1.92a9 9 0 0 0 6.89-8.25.48.48 0 0 0-.49-.5h-1ZM16.5 12c-.28 0-.5.23-.54.5a3 3 0 0 1-1.33 2.02c-.35.23-.63.6-.63 1.02v.14c0 .63.59 1.1 1.16.83a5 5 0 0 0 2.82-4.01c.02-.28-.2-.5-.48-.5h-1Z"></path>'
  };

  const BlinkAvatar: IconifyIcon = {
    width: 60,
    height: 60,
    body: '<g clip-path="url(#prefix__clip0_502_275)"><rect width="60" height="60" rx="30" fill="url(#prefix__paint0_linear_502_275)"/><path d="M22.479 11.094c1.528-5.813 2.263-6.844 5.776.655l-5.776-.655z" fill="#D4E1FF"/><path d="M8.008 23.513l-.139.12c2.104 1.984 5.3 7.082 10.163 6.825 0 0 3.93 7.181 8.159 6.388 4.228-.794 7.364-6.746 7.364-6.746a22.163 22.163 0 002.402-6.587c-.06-.535-.258-.952-.635-1.21-3.018-2.003-25.11-.396-27.314 1.21z" fill="#1C1B29"/><path d="M14.42 8.793l4.426 1.19a10.349 10.349 0 014.17-.833c6.748 0 10.34 5.476 10.34 12.2 0 6.727-3.593 12.202-10.34 12.202-6.75 0-10.323-5.475-10.323-12.201-.004-.99.076-1.98.238-2.956.457-2.58.336-5.23-.357-7.757a1.51 1.51 0 011.846-1.845z" fill="#B3CAFF"/><path d="M33.118 24.268c-3.275 1.448-6.65-.08-9.905-1.945-3.553-2.043-5.836-7.222-6.808-8.868-.973-1.647-2.363-1.964-3.315-4.364a1.489 1.489 0 00-.516 1.547c.693 2.527.815 5.177.357 7.757a17.596 17.596 0 00-.238 2.956c0 6.726 3.593 12.201 10.322 12.201 5.737 0 9.19-3.968 10.103-9.285z" fill="#8DAEF7"/><path d="M32.523 22.263c0 5.238-3.117 9.484-6.948 9.484-3.83 0-6.927-4.246-6.927-9.484 0-8.65 5.379-1.567 9.21-1.567 3.83 0 4.764-5.852 4.665 1.567z" fill="#FCFDFF"/><path d="M25.69 27.313c.372-.03.631-.552.58-1.163-.051-.612-.394-1.082-.765-1.051-.372.032-.631.553-.58 1.163.052.612.394 1.083.765 1.051zm4.56-1.013c.111-.603-.096-1.147-.463-1.214-.367-.068-.754.367-.865.97-.11.603.097 1.147.464 1.215.366.067.754-.367.864-.97z" fill="#1C1B29"/><path d="M19.362 42.46s-4.624 3.511-9.07 1.666a.734.734 0 01-.438-.872c.417-1.35 2.005-4.544 7.702-4.226 7.245.416 1.806 3.432 1.806 3.432z" fill="#A62D69"/><path d="M18.032 36.33s-1.429-3.572-7.483-2.62a.698.698 0 00-.589.8c.02.122.073.236.152.331a16.773 16.773 0 008.913 5.317c6.431 1.389-.993-3.829-.993-3.829z" fill="#A62D69"/><path d="M19.184 39.96c-.258 2.54-4.348 2.639-4.864-.554-.515-3.195 1.846-3.691 3.534-2.64 1.687 1.052 1.33 3.194 1.33 3.194z" fill="#79A0F7"/><path d="M45.584 87.376c-2.819.595-11.255-7.44-11.255-7.44 2.323 7.3 2.72 9.483 3.117 11.367.397 1.886.158 2.262 0 3.591-.16 1.33-.16 1.29.634 2.957.794 1.666 1.311 2.836 1.47 3.69.059.496.039.998-.06 1.487H4.019s-.18-.793.575-2.995c.754-2.202 2.481-4.027 3.434-5.417.953-1.388.893-1.25.635-1.825-1.19-2.817.735-2.201 1.549-6.427.813-4.226 1.072-24.383 2.877-32.616 1.807-8.233 4.566-10.178 4.765-16.982-3.355-3.134-11.672-11.289-9.985-13.134 1.906 1.786 7.622 2.66 12.287 2.62a1.945 1.945 0 011.866 1.309c.794 2.4 2.799 7.142 5.955 6.526 3.157-.614 5.498-6.249 6.154-8.292.138-.447.425-.832.813-1.092.423-.314.77-.72 1.012-1.189.438 3.908-6.054 14.263-6.054 14.263s1.608 14.047 4.824 18.669c3.215 4.623 12.248 4.623 12.465 9.027.219 4.404 1.192 21.307-1.607 21.903z" fill="#BD4070"/><path d="M18.31 27.918c-2.342-.14-5.498-.536-10.56-3.056.814 2.956 7.266 9.225 10.104 11.904-.043 2.11-.425 4.2-1.132 6.19 2.56 3.63 5.657 1.27 6.214 11.467.237 4.344 3.433 10.117 6.768 16.367s3.791-5.238 3.652-10.892c-.08-3.075-.694-6.884-1.35-10.515-1.408-5.495-2.104-11.606-2.104-11.606s4.546-7.26 5.777-11.903c-.31.193-.553.477-.695.813a85.655 85.655 0 01-4.128 8.115c-1.569 2.639-4.487 3.948-7.842-1.25-3.354-5.198-2.183-5.475-4.704-5.634z" fill="#A12C66"/><path d="M28.986 13.206c.23-.335-.355-1.133-1.305-1.782-.95-.65-1.905-.906-2.134-.571-.229.334.355 1.132 1.305 1.781.95.651 1.905.907 2.134.572z" fill="#D4E1FF"/><path d="M19.78 18.197c3.493 1.686 4.704 3.829 7.503 3.75 2.799-.08 3.89-1.43 5.021-3.234-.456-.993-1.707 1.983-4.446 1.983-2.74 0-6.312-3.67-8.079-2.499z" fill="#8DAEF7"/><path d="M21.585 47.598c2.005 2.817-.694-5.654-.694-5.654H17.06c-.516 1.765-1.23 3.353-1.985 5.277 1.152-2.897 3.593-3.69 6.51.377z" fill="#A12C66"/></g><defs><linearGradient id="prefix__paint0_linear_502_275" x1="30" y1="60.272" x2="30" y2="17.294" gradientUnits="userSpaceOnUse"><stop stop-color="#7196FF"/><stop offset="1" stop-color="#2A5EE8"/></linearGradient><clipPath id="prefix__clip0_502_275"><rect width="60" height="60" rx="30" fill="#fff"/></clipPath></defs>'
  };

  const PhibiAvatar: IconifyIcon = {
    width: 60,
    height: 60,
    body: '<g clip-path="url(#prefix__clip0_502_3440)"><rect width="60" height="60" rx="30" fill="#CFDEFF"/><path d="M63.53 70.26a8.356 8.356 0 00-6.884-5.18l-3.15-.331c-4.521-16.288-2.235-19.987-15.582-23.64l-10.803-.382s-10.977.184-15.015 5.589l5.647 18.51s-2.312 12.285-1.26 18.512l14.07-1.815 6.098 19.731c22.991-3.411 33.701-14.068 33.701-14.068L63.53 70.26z" fill="#CFDEFF"/><path d="M14.67 42.186c15.32 14.349 29.164 24.155 26.833 1.518L14.67 42.186z" fill="#B8C5FF"/><path d="M22.19 43.88c13.338 6.267 16.801 8.633 15.927 1.099l-15.928-1.1z" fill="#5697B0"/><path d="M50.978 54.418c-1.624-6.844-2.843-9.795-9.675-12.266 1.839 4.3 2.64 13.174 2.64 13.174l7.035-.908z" fill="#fff"/><path d="M28.21 21.347l-.488-3.784a5.862 5.862 0 00-1.577-3.283 5.812 5.812 0 00-7.13-1.024 5.814 5.814 0 00-2.554 3.049c-1.716 4.66-4.399 12.159-6.248 18.465C7.269 44.82 20.59 47.145 33.68 46.144c13.091-.998 14.325-6.733 12.513-15.032-1.162-5.177-2.634-10.463-3.551-13.748a4.95 4.95 0 00-1.558-2.347 4.95 4.95 0 00-2.589-1.114 4.845 4.845 0 00-5.078 3.073l-1.47 3.889-3.737.482z" fill="#7CE4CC"/><path d="M44.436 35.087l-.93-.323-4.767 1.652-4.852.626-8.406-1.678s-4.622-7.147-4.286.801c.264 5.49 2.595 8.642 4.016 10.087 2.822.128 5.648.077 8.464-.157a28.61 28.61 0 006.276-1.056c1.417-2.008 3.703-5.707 4.485-9.952z" fill="#AAFAE7"/><path opacity=".74" d="M21.056 35.492c-1.08-3.02-3.035-9.377-2.223-14.166.813-4.792 1.882-8.728 4.098-8.769a5.826 5.826 0 00-6.472 3.748c-1.718 4.66-4.4 12.159-6.248 18.465-2.64 8.974 7.735 11.777 19.347 11.56-2.52-.413-5.721-3.06-8.502-10.838z" fill="url(#prefix__paint0_linear_502_3440)"/><path d="M29.558 46.33l-.934.022-.887.017-1.388-.068-.438.057-.698-.057c-1.415-1.398-3.744-4.55-4.01-10.04a.666.666 0 01.011-.297c2.73 7.392 5.878 9.994 8.345 10.367z" fill="#AAFAE7"/><path d="M43.292 34.25l-.006 1.107c-5.1 3.336-5.93 4.258-19.072.133l-.133-1.03.57.158c11.128 2.813 13.254 3.064 18.641-.369z" fill="#2C4661"/><path d="M23.18 38.556c1.718-.477 2.676-2.427 2.138-4.354-.536-1.926-2.364-3.1-4.08-2.62-1.719.477-2.677 2.425-2.141 4.352.536 1.926 2.364 3.1 4.082 2.623zM45.743 34.56c.35-1.665-.139-3.178-1.09-3.377-.952-.2-2.006.99-2.355 2.655-.35 1.665.139 3.178 1.09 3.377.952.201 2.006-.988 2.355-2.655z" fill="#738EFF"/><path opacity=".41" d="M32.709 31.372c-.245-.363.167-.613.492-.755a.688.688 0 01.767.197l1.243 1.616c.36.497-.18.517-.713.19-.536-.325-1.419-.655-1.79-1.248zM38.284 32.132l.38-.887a.835.835 0 00-.168-.915l-.171-.176a.125.125 0 00-.058-.04c-.023-.009-.047-.013-.07-.009a.127.127 0 00-.067.026.16.16 0 00-.047.053 12.51 12.51 0 00-.538 1.946c-.058.697.38.64.74.002z" fill="#284E7A"/><path d="M32.889 21.681l-4.68-.334 3.737-.482 1.47-3.89a4.846 4.846 0 015.079-3.073l.91.179c-2.222-.403-2.976 2.16-3.413 5.275-.223 1.706-.16 2.587-3.103 2.325z" fill="#61C7C7"/><path d="M41.62 20.97c.01-1.19-.775-2.158-1.748-2.162-.973-.006-1.766.951-1.774 2.14-.006 1.19.776 2.159 1.748 2.165.973.004 1.768-.954 1.775-2.143zM25.15 20.259c.117-1.183-.573-2.22-1.542-2.317-.966-.094-1.847.787-1.963 1.97-.118 1.182.572 2.22 1.54 2.316.97.094 1.848-.787 1.966-1.97z" fill="#21354A"/><path d="M17.74 64.826c2.028.034 4.612-.202 6.918-.3-.043-.922.036-1.845.238-2.745.353-1.511.893-2.972 1.607-4.35-1.845-.157-4.084-.313-5.917-.371-.383-9.077-5.16-13.984-7.795-11.475a6.895 6.895 0 00-2.13 4.517c-.069 1.39.075 3.64-.009 4.144-.23 1.659-1.4 2.156.034 5.227.74 1.532-.647 5.312 7.055 5.353z" fill="#fff"/><path d="M24.062 12.906c1.88 1.188 2.35 4.087 2.503 5.25l.489 3.785c.068.533.237.709 2.02 1.515 1.781.805 1.037.015.227-.918l-1.092-1.19-.489-3.785a5.821 5.821 0 00-3.658-4.657z" fill="#D4FFDC"/><path d="M40.605 19.55c.675.259.827 1.816.156 1.212-.668-.604-1.086-1.536-.156-1.213zM24.309 18.645c.625.264.784 1.873.156 1.213-.628-.658-1.134-1.53-.156-1.213z" fill="#335A70"/><path d="M24.171 36.534c.645-.341.699-1.509.118-2.606-.58-1.1-1.575-1.714-2.22-1.374-.645.341-.696 1.509-.116 2.608.581 1.097 1.573 1.712 2.218 1.372zM45.705 33.236c0-.782-.304-1.419-.684-1.419-.377 0-.685.634-.685 1.419 0 .784.306 1.418.683 1.418.38 0 .686-.634.686-1.418z" fill="#B2A6FF"/><path d="M40.772 15.484c1.046.851 1.344 2.392.17 1.31-1.177-1.083-1.436-2.33-.17-1.31z" fill="#D4FFDC"/></g><defs><linearGradient id="prefix__paint0_linear_502_3440" x1="8.961" y1="35.574" x2="18.803" y2="31.841" gradientUnits="userSpaceOnUse"><stop stop-color="#61C7C7"/><stop offset="1" stop-color="#54B9C7"/></linearGradient><clipPath id="prefix__clip0_502_3440"><rect width="60" height="60" rx="30" fill="#fff"/></clipPath></defs>'
  };
  // #endregion

  function convertToTimeMark(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '00:00:00';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  function relativeTime(rtf: Intl.RelativeTimeFormat, seconds: number) {
    if (Math.abs(seconds) < 60) return rtf.format(seconds, 'second');
    if (Math.abs(seconds) <= 3600) return rtf.format(Math.round(seconds / 60), 'minute');
    if (Math.abs(seconds) <= 86400) return rtf.format(Math.round(seconds / 3600), 'hour');
    if (Math.abs(seconds) <= 2592000) return rtf.format(Math.round(seconds / 86400), 'day');
    return rtf.format(Math.round(seconds / 2592000), 'month');
  }

  const channelName = 'Live!';

  const users = [
    { id: 'craig', name: 'Craig', nick: '![RECORDING] Craig' },
    { id: 'snazzah', name: 'Snazzah', tag: { tag: 'CAP', badge: '1317206872763404478/d7234d6824ca9ead59ffdcd76be30277' } },
    { id: 'blink', name: 'Blink', avatar: BlinkAvatar, tag: { tag: 'meow', badge: '632892259553247232/7600b86583eceb147a519dcf448a80e8' } },
    { id: 'phibi', name: 'Phibi', avatar: PhibiAvatar }
  ];
  let speakingUsers = new SvelteSet(['snazzah']);
  let stopped = $state(false);
  let fakeStart = $state<number | null>();
  let currentTime = $state(Date.now());
  let displayedStart = $derived(fakeStart ? fakeStart - (60 * 35 * 1000) : null);
  let region = $state('atlanta');
  const dtf = new Intl.DateTimeFormat('en-US', { timeStyle: 'medium' });
  const rtf = new Intl.RelativeTimeFormat('en-US');
  const speakableUsers = ['snazzah', 'blink', 'phibi'];
  let speakingInterval: ReturnType<typeof setInterval> | undefined;

  function getFakeTime() {
    return (fakeStart ? Math.floor((Date.now() - fakeStart) / 1000) : Math.round(Math.random() * 600)) + (60 * 35)
  }

  async function getCFRay() {
    try {
      if (window.location.hostname !== 'craig.chat' && !window.location.host.endsWith('.craig.pages.dev')) return;
      const ray = (await fetch('/cdn-cgi/trace')).headers.get('cf-ray');
      if (ray) {
        const [id, zone] = ray.split('-');
        region = `c-${zone.toLowerCase()}-${id.toLowerCase().slice(0, 8)}`
      }
    } catch {}
  }


  type ActivityLog = { type: 'join' | 'stop', time: number, name: string } | { type: 'note', time: number, name: string, note?: string; };
  let logs: ActivityLog[] = $state([
    { type: 'join', time: 0, name: 'Snazzah' },
    { type: 'join', time: 2, name: 'Blink' },
    { type: 'join', time: 24, name: 'Phibi' },
  ]);

  onMount(() => {
    fakeStart = Date.now();
    currentTime = Date.now();
    const timeInterval = setInterval(() => currentTime = Date.now(), 30000);
    speakingInterval = setInterval(() => {
      if (!stopped) {
        for (const user of speakableUsers) {
          if (Math.random() < 0.25) {
            if (speakingUsers.has(user)) speakingUsers.delete(user);
            else speakingUsers.add(user);
          }
        }
      }
    }, 500);
    getCFRay();
    return () => {
      clearInterval(speakingInterval);
      clearInterval(timeInterval);
    };
  });

  function restart() {
    stopped = false;
    logs = [
      { type: 'join', time: 0, name: 'Snazzah' },
      { type: 'join', time: 2, name: 'Blink' },
      { type: 'join', time: 24, name: 'Phibi' },
    ];
    fakeStart = Date.now();
    currentTime = Date.now();
  }

  type Props = {
    craigavatar?: Snippet;
    snazzahavatar?: Snippet;
    mobilehero?: Snippet;
    children?: Snippet;
  };
  let { craigavatar, snazzahavatar, mobilehero }: Props = $props();
</script>

{#snippet mention(text: string, isChannelMention = false)}
  <span class="rounded px-1 bg-discord/25 text-blurple-19 hover:bg-discord/75 hover:text-white">
    {#if isChannelMention}
      <Icon icon={VoiceChannelIcon} class="inline size-4" inline />
    {/if}
    <span>{text}</span>
  </span>
{/snippet}

{#snippet time(text: string)}
  <span class="bg-neutral-400/15 px-0.5 rounded cursor-default">{text}</span>
{/snippet}

<section class="relative flex justify-center mb-2 md:mb-8 group/hero" data-stopped={stopped ? 'true' : undefined}>
  <!-- Waveform -->
  <div class="absolute w-(--width) h-12.5 top-[calc(50%-25px)] -left-[50vw] -z-1" style="--waveform-pattern-length: 144px; --width: 200vw">
    <svg class="text-teal-500 group-data-stopped/hero:text-slate-500/50 transition-colors w-(--width) motion-safe:animate-waveform-move drop-shadow-waveform group-data-stopped/hero:drop-shadow-none group-data-stopped/hero:animate-none" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="waveform" patternUnits="userSpaceOnUse" width="144" height="50">
          <rect y="12.5" width="4" height="25" rx="2" fill="currentColor"></rect>
          <rect x="8" y="14" width="4" height="22" rx="2" fill="currentColor"></rect>
          <rect x="16" width="4" height="50" rx="2" fill="currentColor"></rect>
          <rect x="24" y="15" width="4" height="20" rx="2" fill="currentColor"></rect>
          <rect x="32" y="10" width="4" height="30" rx="2" fill="currentColor"></rect>
          <rect x="40" y="5" width="4" height="40" rx="2" fill="currentColor"></rect>
          <rect x="48" y="7.5" width="4" height="35" rx="2" fill="currentColor"></rect>
          <rect x="56" y="2.5" width="4" height="45" rx="2" fill="currentColor"></rect>
          <rect x="64" y="7.5" width="4" height="35" rx="2" fill="currentColor"></rect>
          <rect x="72" y="15" width="4" height="20" rx="2" fill="currentColor"></rect>
          <rect x="80" y="12.5" width="4" height="25" rx="2" fill="currentColor"></rect>
          <rect x="88" y="20" width="4" height="10" rx="2" fill="currentColor"></rect>
          <rect x="96" y="14" width="4" height="22" rx="2" fill="currentColor"></rect>
          <rect x="104" y="12" width="4" height="26" rx="2" fill="currentColor"></rect>
          <rect x="112" y="10.5" width="4" height="29" rx="2" fill="currentColor"></rect>
          <rect x="120" y="14.5" width="4" height="21" rx="2" fill="currentColor"></rect>
          <rect x="128" y="9" width="4" height="32" rx="2" fill="currentColor"></rect>
          <rect x="136" y="14" width="4" height="22" rx="2" fill="currentColor"></rect>
        </pattern>
      </defs>
      <rect class="w-(--width)" height="50" fill="url(#waveform)"></rect>
    </svg>
  </div>

  {@render mobilehero?.()}

  <!-- Voice Channel -->
  <div class="bg-[#121214] rounded-l-lg overflow-hidden font-sans w-full max-w-60 shadow-xl p-1 hidden md:block relative">
    <div class="flex items-center rounded gap-1.5 px-2 py-1.5 bg-[#2c2c30] cursor-pointer text-white font-medium">
      <Icon icon={RestrictedVoiceChannelIcon} class="size-5 text-[#4a9d66]" />
      <span class="text-[15px]">{channelName}</span>
    </div>

    <div class="flex flex-col pb-2 ml-6">
      {#each users as user (user.id)}
        {#if user.id !== 'craig' || !stopped}
          <div class="flex items-center gap-2 px-2 py-0.75 rounded hover:bg-[#1d1d1e] cursor-pointer group" data-speaking={speakingUsers.has(user.id) ? 'true' : undefined}>
            <!-- Avatar -->
            <div class="relative size-6 rounded-full overflow-hidden flex items-center justify-center shrink-0 group-data-speaking:ring-2 group-data-speaking:ring-[#3d9e60]">
              {#if typeof user.avatar === 'object'}
                <Icon icon={user.avatar} class="size-full object-cover" />
              {:else if user.id === 'craig'}
                {@render craigavatar?.()}
              {:else if user.id === 'snazzah'}
                {@render snazzahavatar?.()}
              {:else}
                <img src={user.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} alt={user.name} class="size-full object-cover" />
              {/if}
            </div>

            <div class="text-[13px] truncate text-neutral-400 font-medium flex-1 flex">
              <span class="group-hover:text-white group-data-speaking:text-white">
                {user.nick ?? user.name}
              </span>

              {#if user.tag}
                <div class="ml-1 flex flex-none gap-0.5 rounded bg-neutral-700/50 group-hover:bg-neutral-600/50 px-1 text-xs font-bold text-white items-center">
                  <img src={`https://cdn.discordapp.com/clan-badges/${user.tag.badge}.png?size=16`} alt="clan badge" class="size-3.5" style="image-rendering: pixelated;">
                  <span>{user.tag.tag}</span>
                </div>
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Replay animation -->
    {#if stopped}
      <button class="absolute bottom-4 left-4 right-4 px-2 rounded hover:text-white cursor-pointer hover:bg-[#1d1d1e] text-[13px] truncate text-neutral-400 flex gap-2" onclick={restart} in:fly={{ y: 4 }}>
        <Icon icon={replayIcon} class="size-5" />
        <span>New recording?</span>
      </button>
    {/if}
  </div>

  <!-- Recording Panel -->
  <div class="bg-[#1a1a1e] rounded-r-lg overflow-hidden font-sans w-full max-w-106 shadow-xl hidden md:block">
    <div class="flex gap-4 py-0.5 pl-18 relative min-h-11">
      <div class="absolute left-4 top-0.5 size-10 rounded-full overflow-hidden shrink-0 mt-2">
        {@render craigavatar?.()}
      </div>
      
      <div class="flex flex-col min-w-0 flex-1 py-0.5">
        <div class="flex items-baseline gap-1 flex-wrap leading-5.5">
          <span class="font-medium text-[#f2f3f5] hover:underline cursor-pointer text-[15px]">Craig</span>

          <span class="bg-discord text-white text-xs font-bold px-1 py-0.5 rounded flex items-center gap-0.5 relative top-0.5">
            <Icon icon={checkIcon} class="size-4 relative -top-px" />
            <span>APP</span>
          </span>
        </div>

        
        <div class="flex flex-col gap-1 mt-1 pb-1 text-[14px]">
          <div 
            class="rounded-lg overflow-hidden flex max-w-84 bg-[#242429] border border-white/10 mr-4"
          >
            <div class="w-1 shrink-0 rounded-l group-not-data-stopped/hero:bg-green-400"></div>

            <div class="flex-1 p-3 flex flex-col gap-0.5 text-[#efeff1] leading-snug [&_code]:border [&_code]:border-white/15 [&_code]:bg-[#282939] [&_code]:px-0.75 [&_code]:py-px [&_code]:rounded [&_code]:text-[12px] [&_code]:font-mono [&_code]:text-[#e9e9eb]">
              <div class="text-xs text-[#b5bac1] leading-tight"><span class="rounded px-1 bg-discord/25 text-blurple-19 hover:bg-discord/75 hover:text-white">@Snazzah</span>'s recording</div>
              <span class="text-xl font-bold text-[#f2f3f5] leading-tight mt-2">
                {#if stopped}
                  Recording ended.
                {:else}
                  <Icon icon={RecordingEmoji} class="inline" inline /> Recording...
                {/if}
              </span>

              <div class="border-t border-white/10 my-1"></div>

              <p><b>Recording ID:</b> <code>CBTjGfc6M8fs</code></p>
              <p><b>Channel:</b> {@render mention(channelName, true)}</p>
              <p><b>Started:</b> {@render time(displayedStart ? dtf.format(displayedStart) : '10:20:19 PM')} ({@render time(displayedStart ? relativeTime(rtf, Math.floor((displayedStart - currentTime) / 1000)) : '35 minutes ago')})</p>
              <p><b>Voice Region:</b> {region}</p>

              <div class="border-t border-[#3f4147] my-1"></div>

              <span class="text-base font-bold text-[#f2f3f5] mt-2 mb-0.5">Activity</span>
              {#each logs.slice(-3) as log}
                <p><code>{convertToTimeMark(log.time)}</code>: 
                {#if log.type === 'join'}
                  {@render mention(`@${log.name}`)} joined the recording.
                {:else if log.type === 'stop'}
                  Recording stopped by {@render mention(`@${log.name}`)}.
                {:else if log.type === 'note'}
                  {@render mention(`@${log.name}`)} added a note.{log.note ? ` - ${log.note}` : ''}
                {/if}</p>
              {/each}
              
              <div class="border-t border-[#3f4147] my-1"></div>

              <div class="flex gap-2 flex-wrap text-white text-sm font-medium *:rounded-md *:transition-colors *:px-4 *:py-1 *:gap-1 *:disabled:opacity-50 *:disabled:cursor-not-allowed">
                <button
                  class="flex items-center h-8 cursor-pointer bg-[#da373c] enabled:hover:bg-[#a12828] enabled:active:bg-[#971d28] border border-white/10"
                  disabled={stopped}
                  onclick={() => {
                    stopped = true;
                    logs.push({ type: 'stop', time: getFakeTime(), name: 'Snazzah' });
                    speakingUsers.clear();
                  }}
                >
                  <Icon icon={StopIcon} class="size-5" />
                  <span>Stop recording</span>
                </button>
                <button
                  class="flex items-center h-8 cursor-pointer bg-[#5865f2] enabled:hover:bg-[#4752c4] enabled:active:bg-[#3a48a3] border border-white/10"
                  disabled={stopped}
                  onclick={() => {
                    logs.push({ type: 'note', time: getFakeTime(), name: 'Snazzah' });
                  }}
                >
                  <Icon icon={noteIcon} class="size-5" />
                  <span>Add a note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
