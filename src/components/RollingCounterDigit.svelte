<script lang="ts">
	import { Spring, prefersReducedMotion } from 'svelte/motion';
  import type { EasingFunction, TransitionConfig } from 'svelte/transition';

	interface Props {
		value: number;
		easing?: EasingFunction;
		duration?: number;
	}

	let { value, easing, duration = 200 }: Props = $props();

	let element = $state<HTMLElement>();

	// svelte-ignore state_referenced_locally
		let spring = new Spring(value);
	$effect(() => {
		spring.set(value, { instant: prefersReducedMotion.current });
	});
	let displayValue = $derived(Math.floor(spring.current));
	let nextValue = $derived(displayValue + 1);
	let offset = $derived(spring.current % 1);

	let digitWidth = $state(0);
	let nextDigitWidth = $state(0);
	let innerWidth: number | null = $derived(
		offset === 0 || !digitWidth || !nextDigitWidth || digitWidth === nextDigitWidth
			? null
			: digitWidth + (nextDigitWidth - digitWidth) * offset
	);
	
	// Cache width measurement to avoid layout thrashing during spring animation
	let cachedWidth = $state(0);
	$effect(() => {
		if (element && offset === 0) {
			cachedWidth = element.getBoundingClientRect().width;
		}
	});
	let width = $derived(innerWidth ?? cachedWidth);

	function stretchFade(node: HTMLElement, { duration }: { duration: number }): TransitionConfig {
		return {
			duration,
			css: (t) => {
				const eased = easing?.(t) ?? t;
				return `
					opacity: ${eased};
					max-width: ${eased * width}px;
					overflow: hidden;
					display: inline-flex;
				`;
			}
		};
	}
</script>

<span transition:stretchFade={{ duration }} aria-hidden="true">
	<span
		bind:this={element}
		class="overflow-hidden inline-flex"
		style:width={innerWidth !== null ? `${innerWidth}px` : undefined}
	>
		<div class="inline-flex relative" style:transform="translate(0, {100 * offset}%)">
			<span
				class="absolute bottom-full pointer-events-none"
				bind:clientWidth={nextDigitWidth}
			>
				{nextValue}
			</span>
			<span bind:clientWidth={digitWidth}>
				{displayValue}
			</span>
		</div>
	</span>
</span>