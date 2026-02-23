<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fade, type EasingFunction, type TransitionConfig } from 'svelte/transition';

	interface Props {
		easing?: EasingFunction;
		duration?: number;
		children?: Snippet;
	}

  fade

	let { easing, duration = 200, children }: Props = $props();
	let element = $state<HTMLSpanElement>();
	
	// Cache width measurement to avoid layout thrashing
	let width = $state(0);
	$effect(() => {
		if (element) {
			width = element.getBoundingClientRect().width;
		}
	});

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
	<span bind:this={element}>
		{@render children?.()}
	</span>
</span>