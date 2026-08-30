<script lang="ts">
  import { onMount } from 'svelte';
  import RollingCounter from './RollingCounter.svelte';
  import { fly } from 'svelte/transition';

  let serverCount = $state(500000);
  let activeRecordings = $state<number | null>(null);
  let recordingTotal = $state<number | null>(null);
  let hydrated = $state(false);
  let lastFetchTime = 0;
  let isInView = $state(false);
  let isVisible = $state(true);
  let sectionEl = $state<HTMLElement>();

  async function fetchStats() {
    try {
      const res = await fetch('https://status.craig.chat/api/quick-stats');
      const data = await res.json();
      if (data.guilds) serverCount = data.guilds;
      if (data.activeRecordings) activeRecordings = data.activeRecordings;
      if (data.recordingTotal) recordingTotal = data.recordingTotal;
      hydrated = true;
      lastFetchTime = Date.now();
    } catch (e) {
      console.error('Failed to fetch stats:', e);
    }
  }

  function maybeFetch() {
    if (isInView && isVisible && (lastFetchTime === 0 || Date.now() - lastFetchTime > 15000)) {
      fetchStats();
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInView;
        isInView = entry.isIntersecting;
        // Fetch when scrolling back into view (and 15s has passed)
        if (isInView && !wasInView) maybeFetch();
        // Also fetch on initial view
        else if (isInView && lastFetchTime === 0) maybeFetch();
      },
      { threshold: 0 }
    );
    observer.observe(sectionEl!);

    // Refresh every 30 seconds while visible and in view
    const refreshInterval = setInterval(() => {
      if (isInView && isVisible) fetchStats();
    }, 30000);

    return () => {
      observer.disconnect();
      clearInterval(refreshInterval);
    };
  });

</script>

<svelte:window onvisibilitychange={() => {
  isVisible = document.visibilityState === 'visible';
  if (isVisible) maybeFetch();
}} />

<svelte:document onfocus={() => maybeFetch()} />

<section bind:this={sectionEl} class="relative overflow-hidden border border-slate-400/25 rounded-2xl bg-slate-900/45 p-4 md:p-6 text-white">
  <!-- Muted trend backdrop -->
  <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-65" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
    <polygon
      class="fill-teal-500/10"
      points="0,100 0,85 40,80 80,75 120,70 160,65 200,55 240,45 280,35 320,20 360,12 400,5 400,100"
    />
    <polyline
      fill="none"
      class="stroke-teal-400/45"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      points="0,85 40,80 80,75 120,70 160,65 200,55 240,45 280,35 320,20 360,12 400,5"
    />
  </svg>

  <div class="relative flex flex-col gap-4 md:gap-5 md:flex-row md:items-start md:justify-between">
    <div class="flex flex-col gap-1.5 md:gap-2">
      <p class="text-xs md:text-sm uppercase tracking-[0.16em] text-slate-300">Live usage</p>
      <h3 class="font-display text-3xl md:text-5xl font-medium leading-none"><RollingCounter value={recordingTotal ?? 4_500_000} options={{ signDisplay: !recordingTotal ? 'always' : 'auto' }} /></h3>
      <h6 class="text-sm md:text-lg text-slate-200">recordings created in <span class="text-white font-medium"><RollingCounter value={serverCount} /></span> servers</h6>
      <span class="text-xs md:text-sm text-slate-300 -mt-1 md:-mt-2">and counting since 2017.</span>
    </div>

    {#if activeRecordings !== null}
      <span
        class="absolute top-0 right-0 bg-red-500/75 backdrop-blur-sm shadow text-white text-xs md:text-sm font-medium px-2 md:px-4 py-1 rounded-full"
        transition:fly={{ x: 16 }}
      >
        <RollingCounter value={activeRecordings} /> recording now
      </span>
    {/if}
  </div>
</section>