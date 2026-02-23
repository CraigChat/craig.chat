<script lang="ts">
  import { Accordion } from 'bits-ui';
  import Icon from '@iconify/svelte';
  import chevronDown from '@iconify-icons/mdi/chevron-down';
  import { marked } from 'marked';
  import { onMount } from 'svelte';

  interface FAQItem {
    value: string;
    question: string;
    answer: string;
  }

  let { items }: { items: FAQItem[] } = $props();
  
  // Track which items should be open
  let openItems = $state<string[]>([]);
  
  // Handle URL hash on mount
  onMount(() => {
    const hash = window.location.hash.slice(1); // Remove the '#'
    if (hash) {
      // Check if the hash matches any FAQ item value
      const matchingItem = items.find(item => item.value === hash);
      if (matchingItem) {
        // Open the matching item
        openItems = [hash];
        
        // Wait for accordion to open, then scroll to it
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 250);
      }
    }
  });
  
  // Parse markdown for each answer
  const parseMarkdown = (text: string) => {
    return marked.parse(text, { async: false }) as string;
  };
</script>

<Accordion.Root type="multiple" class="w-full" bind:value={openItems}>
  {#each items as item (item.value)}
    <Accordion.Item
      value={item.value}
      class="border-b border-slate-700/50 group"
      id={item.value}
    >
      <Accordion.Header>
        <Accordion.Trigger
          class="flex w-full items-center justify-between py-4 text-left font-medium text-white transition-colors hover:text-teal-400 cursor-pointer [&[data-state=open]>span>svg]:rotate-180"
        >
          <span class="pr-4">{item.question}</span>
          <span class="shrink-0">
            <Icon icon={chevronDown} class="size-5 transition-transform duration-200" />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content
        class="overflow-hidden text-slate-300 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      >
        <div class="pb-4 pr-8 prose prose-invert prose-sm max-w-none prose-a:text-teal-400 prose-a:not-hover:no-underline">
          {@html parseMarkdown(item.answer)}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>

<style>
  :global(.animate-accordion-down) {
    animation: accordion-down 200ms ease-out;
  }
  :global(.animate-accordion-up) {
    animation: accordion-up 200ms ease-out;
  }
  @keyframes accordion-down {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: var(--bits-accordion-content-height);
      opacity: 1;
    }
  }
  @keyframes accordion-up {
    from {
      height: var(--bits-accordion-content-height);
      opacity: 1;
    }
    to {
      height: 0;
      opacity: 0;
    }
  }
</style>
