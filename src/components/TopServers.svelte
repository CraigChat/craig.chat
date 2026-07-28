<script lang="ts">
  import type { IconifyIcon } from "@iconify/svelte";
  import { Marquee } from "@selemondev/svelte-marquee";
  import "@selemondev/svelte-marquee/dist/style.css";

  const VerifiedIcon: IconifyIcon = {
    width: 20,
    height: 20,
    body: '<path fill-rule="evenodd" clip-rule="evenodd" d="M20 10.1849C20 11.1713 18.4 11.9079 18.1 12.7943C17.8 13.6807 18.65 15.2913 18.1 16.0279C17.55 16.7645 15.8 16.4648 15.025 17.0266C14.25 17.5885 14.0375 19.3239 13.1 19.636C12.1625 19.9481 11.0125 18.6372 10.0125 18.6372C9.01249 18.6372 7.82499 19.8857 6.92499 19.636C6.02499 19.3863 5.77499 17.5885 4.99999 17.0266C4.225 16.4648 2.5 16.8019 1.925 16.0279C1.35 15.2538 2.2125 13.7306 1.925 12.7943C1.6375 11.8579 0 11.1713 0 10.1849C0 9.19864 1.6 8.46204 1.9 7.57561C2.2 6.68919 1.35 5.07864 1.9 4.34204C2.45 3.60543 4.2125 3.90507 4.99999 3.34325C5.78749 2.78143 5.97499 1.04604 6.91249 0.696459C7.84999 0.346883 8.99999 1.7327 9.99999 1.7327C11 1.7327 12.1875 0.484217 13.0875 0.733914C13.9875 0.983611 14.225 2.78143 15 3.34325C15.775 3.90507 17.5 3.56798 18.075 4.34204C18.65 5.1161 17.7875 6.63925 18.075 7.57561C18.3625 8.51198 20 9.19864 20 10.1849Z" fill="#3BA55C"/><path d="M9.43963 14.7575L5.22088 11.5671L6.46169 9.86557L8.9433 11.7798L13.4598 5.78689L15.1473 7.03802L9.43963 14.7575Z" fill="white"/>'
  };

  const PartnerIcon: IconifyIcon = {
    width: 20,
    height: 20,
    body: '<g clip-path="url(#clip0_607_618)"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9958 10.0375C19.9958 11.0236 18.3962 11.76 18.0962 12.6463C17.7963 13.5325 18.6461 15.1427 18.0962 15.8792C17.5463 16.6156 15.7967 16.316 15.0219 16.8777C14.247 17.4394 14.0346 19.1745 13.0973 19.4865C12.16 19.7986 11.0102 18.488 10.0104 18.488C9.01062 18.488 7.82337 19.7362 6.92356 19.4865C6.02374 19.2369 5.7738 17.4394 4.99896 16.8777C4.22412 16.316 2.49948 16.6531 1.9246 15.8792C1.34972 15.1053 2.21204 13.5824 1.9246 12.6463C1.63716 11.7101 0 11.0236 0 10.0375C0 9.05136 1.59967 8.31491 1.8996 7.42867C2.19954 6.54243 1.34972 4.93222 1.8996 4.19576C2.44949 3.45931 4.21162 3.75888 4.99896 3.19718C5.78629 2.63548 5.97376 0.900443 6.91106 0.55094C7.84836 0.201436 8.99812 1.58697 9.99792 1.58697C10.9977 1.58697 12.185 0.338741 13.0848 0.588387C13.9846 0.838032 14.222 2.63548 14.9969 3.19718C15.7717 3.75888 17.4964 3.42186 18.0712 4.19576C18.6461 4.96966 17.7838 6.4925 18.0712 7.42867C18.3587 8.36484 19.9958 9.05136 19.9958 10.0375Z" fill="#5865F2"/><path d="M16.6142 9.97895C16.6142 10.4771 16.3675 10.9752 15.9974 11.2243L12.1736 13.7149C11.4334 14.213 10.6933 14.4621 9.82982 14.4621C9.45978 14.4621 9.21309 14.4621 8.843 14.3376C7.85623 14.0885 7.11609 13.5904 6.49933 12.8432C6.37598 12.5941 6.49933 12.3451 6.62269 12.2206L8.34961 11.0998C8.47296 10.9752 8.71966 10.9752 8.843 11.0998C9.08974 11.2243 9.33643 11.3488 9.45978 11.4733C9.95321 11.4733 10.3233 11.4733 10.6933 11.2243L11.5568 10.7261L14.0238 8.98269L14.3939 8.73361C15.0106 8.36004 15.9974 8.48458 16.3675 9.10722C16.6142 9.48084 16.6142 9.72988 16.6142 9.97895Z" fill="white"/><path d="M13.5358 7.7191L11.7962 8.84656C11.5477 8.97184 11.4234 8.97184 11.1749 8.84656C11.0506 8.72129 10.8022 8.59602 10.6779 8.47074C10.1809 8.34547 9.80813 8.47074 9.43533 8.72129L8.81405 9.09711L5.70768 11.2268C4.96215 11.6026 4.09236 11.4774 3.7196 10.7257C3.22258 10.0993 3.47109 9.22239 4.09236 8.72129L7.82002 6.21578C8.81405 5.5894 10.0566 5.33886 11.1749 5.5894C12.1689 5.83996 12.9145 6.34106 13.5358 7.09271C13.7843 7.34328 13.66 7.59382 13.5358 7.7191Z" fill="white"/></g><defs><clipPath id="clip0_607_618"><rect width="20" height="20" fill="white"/></clipPath></defs>'
  };

  import Icon from "@iconify/svelte";

  interface Server {
    name: string;
    id: string;
    members: number;
    verified?: boolean;
    partnered?: boolean;
    ext?: string;
  }
  
  interface Props {
    servers: Server[];
  }

  let { servers }: Props = $props();
</script>

<section class="space-y-4">
  <div class="flex flex-col gap-1.5 md:flex-row md:items-start md:justify-between">
    <h2 class="text-white font-bold font-display text-xl md:text-2xl">Used by Discord communities of every size</h2>
  </div>

  <Marquee fade={true} pauseOnHover={true}>
    {#each servers as server}
      <div class="flex items-center gap-3 bg-slate-800/50 border border-slate-700/70 rounded-xl px-4 py-3 w-72">
        <img class="size-10 rounded-lg shrink-0 bg-slate-700" src="/assets/featured-servers/{server.id}.{server.ext || 'webp'}" alt={server.name} />
        <div class="flex flex-col gap-0.5 min-w-0">
          <div class="flex items-center gap-1.5 min-w-0">
            {#if server.partnered}
              <Icon icon={PartnerIcon} class="size-4 shrink-0" />
            {/if}
            {#if server.verified}
              <Icon icon={VerifiedIcon} class="size-4 shrink-0" />
            {/if}
            <span class="text-white font-medium truncate">{server.name}</span>
          </div>
          <div class="flex items-center gap-1.5 text-slate-300 text-sm">
            <span class="size-2 rounded-full bg-green-500 shrink-0"></span>
            <span>{server.members.toLocaleString('en-US')} members</span>
          </div>
        </div>
      </div>
    {/each}
  </Marquee>
</section>