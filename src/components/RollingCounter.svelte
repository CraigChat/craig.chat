<script lang="ts">
	import { tick } from 'svelte';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { fly, type EasingFunction } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	import RollingCounterPart from './RollingCounterPart.svelte';
	import RollingCounterDigit from './RollingCounterDigit.svelte';

	interface Props {
		value: number;
		locales?: string;
		options?: Intl.NumberFormatOptions;
		easing?: EasingFunction;
		duration?: number;
	}

	let { value, locales, options, duration = 200, easing = linear }: Props = $props();

	let nf = $derived(Intl.NumberFormat(locales, options));
	let finerParts = $derived(nf.formatToParts(value).reverse().map((p, i, a) => {
		if (p.type === 'fraction') p.type = 'integer';
		const id = a.filter((_p) => _p.type === p.type).indexOf(p);
		return {
      id: `${p.type}-${id}`,
      ...(p.type === 'integer' ? {
        prevDigits: a.slice(0, i).filter((p) => p.type === 'integer').reduce((p, v) => p + v.value.length, 0)
      } : {}),
      ...p
    };
	}).reverse());
</script>

<div class="inline-flex">
	<span class="sr-only">{finerParts.map(p => p.value).join('')}</span>
	{#each finerParts as part, i (part.id)}
		<RollingCounterPart {duration} {easing}>
			{#if part.type === 'integer'}
				{#each part.value.split('') as digit}
					<RollingCounterDigit value={parseInt(digit)} {duration} {easing} />
				{/each}
			{:else}
				{part.value}
			{/if}
		</RollingCounterPart>
	{/each}
</div>
