<script lang="ts">
  import Icon from '@iconify/svelte';
  import goIcon from '@iconify-icons/mdi/launch';
  import menuIcon from '@iconify-icons/mdi/menu';
  import discordIcon from '@iconify-icons/simple-icons/discord';
  import { DropdownMenu } from 'bits-ui';
  import { fly } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';

  let mobileDropdownOpen = $state(false);
  let mobileDropdownAnchor = $state<HTMLElement>(null!);

  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  const navlinks = [
    // { name: 'Documentation', href: '/docs' },
    { name: 'Commands', href: '/commands' },
    { name: 'Support Server', href: 'https://discord.gg/craig' },
    { name: 'Become a Supporter', href: '/supporter', supporter: true },
    { name: 'Dashboard', href: 'https://my.craig.chat' },
    { name: 'Add to Discord', href: '/invite', primary: true }
  ];

  type Props = {
    headericon?: Snippet;
    pathname: string;
  };
  let { headericon, pathname: initialPathname }: Props = $props();
  
  // svelte-ignore state_referenced_locally
  let pathname = $state(initialPathname);

  // Update pathname on Astro navigation (ClientRouter)
  $effect(() => {
    const handleNavigation = () => {
      pathname = window.location.pathname;
    };

    document.addEventListener('astro:page-load', handleNavigation);
    
    return () => {
      document.removeEventListener('astro:page-load', handleNavigation);
    };
  });
</script>

<header class="fixed z-50 flex w-full items-center justify-center font-display">
  <div class="flex w-full max-w-7xl items-center justify-between gap-2 rounded p-4 text-slate-300">
    <button
      class="relative hidden size-12 flex-none cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-black/50 shadow shadow-black/25 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-neutral-950/50 active:scale-98 active:bg-neutral-900/50 enabled:hover:text-white enabled:active:text-white focus-visible:border-teal-300 not-lg:flex"
      bind:this={mobileDropdownAnchor}
      onclick={() => (mobileDropdownOpen = !mobileDropdownOpen)}
    >
      <Icon icon={menuIcon} class="z-1 size-6 transition-all ease-out" />
    </button>
    <div
      class="h-12 flex-1 flex items-center justify-between gap-1 rounded-lg border border-white/10 bg-black/50 px-2 shadow shadow-black/25 backdrop-blur-sm"
    >
      <a
        class="flex-none flex items-center gap-2 text-white text-3xl font-bold tracking-tight transition-all active:scale-98 hover:underline decoration-teal-400 rounded"
        href="/"
      >
        {@render headericon?.()}
        <span>Craig</span>
      </a>
      <nav
        class="hidden items-center gap-1 rounded-lg lg:flex"
      >
        {#each navlinks as navlink}
          <a
            href={navlink.href}
            class={cn(
              'items-center rounded-md px-4 py-2 font-medium transition-all hover:bg-white/10 hover:text-white active:scale-98 data-active:bg-white data-active:text-black',
              navlink.primary && 'bg-discord text-white hover:bg-discord/90',
              navlink.supporter && 'text-teal-500 hover:bg-teal-500/50'
            )}
            target={navlink.href.startsWith('http') ? '_blank' : undefined}
            rel={navlink.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            data-active={pathname === navlink.href ? '' : undefined}
          >
            {#if navlink.primary}
              <Icon icon={discordIcon} inline class="inline flex-none mr-1" />
            {/if}
            <span>{navlink.name}</span>
            {#if navlink.href.startsWith('http')}
              <Icon icon={goIcon} inline class="inline flex-none" />
            {/if}
          </a>
        {/each}
      </nav>
    </div>
  </div>
</header>

<DropdownMenu.Root bind:open={mobileDropdownOpen}>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      customAnchor={mobileDropdownAnchor}
      align="start"
      class="z-10 mt-2 flex w-60 flex-col gap-1 rounded-lg border border-white/10 bg-black/50 p-1 backdrop-blur-sm text-slate-300"
      forceMount
    >
      {#snippet child({ wrapperProps, props, open })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} in:fly={{ y: 8, duration: 150 }} out:fly={{ duration: 150 }}>
              {#each navlinks as navlink}
                <DropdownMenu.Item
                  class={cn(
                    'w-full cursor-pointer rounded-md px-3 py-1.5 transition-colors hover:bg-neutral-200/10 data-active:bg-white/75 data-active:font-medium data-active:text-black',
                    navlink.primary && 'bg-discord text-white hover:bg-discord/90',
                    navlink.supporter && 'text-teal-500 hover:bg-teal-500/50'
                  )}
                  data-active={pathname === navlink.href ? '' : undefined}
                  disabled={pathname === navlink.href}
                  onclick={() => (location.href = navlink.href)}
                >
                  {#if navlink.primary}
                    <Icon icon={discordIcon} inline class="inline flex-none mr-1" />
                  {/if}
                  {navlink.name}
                  {#if navlink.href.startsWith('http')}
                    <Icon icon={goIcon} inline class="inline flex-none" />
                  {/if}
                </DropdownMenu.Item>
              {/each}
            </div>
          </div>
        {/if}
      {/snippet}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>