<script lang="ts">
	import { onMount, tick } from 'svelte';
  import { circInOut } from 'svelte/easing';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { fly, type EasingFunction } from 'svelte/transition';

	interface Props {
		lines: string[];
		inStaggerDelay?: number;
		outStaggerDelay?: number;
		inDuration?: number;
		outDuration?: number;
		inOpacity?: number;
		outOpacity?: number;
		y?: number;
		class?: string;
		easing?: EasingFunction;
		autoAdvance?: number;
	}

	let {
		lines,
		class: _class,
		inStaggerDelay = 25,
		outStaggerDelay = 10,
		inDuration = 100,
		outDuration = 100,
		inOpacity = 1,
		outOpacity = 1,
		y = 50,
		easing = circInOut,
		autoAdvance = 5000
	}: Props = $props();

	const splitIntoCharacters = (text: string): string[] => {
		if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
			const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
			return Array.from(segmenter.segment(text), ({ segment }) => segment);
		}
		// Fallback for browsers that don't support Intl.Segmenterr
		return Array.from(text);
	}

	// svelte-ignore state_referenced_locally
	let line = $state(lines[0]);
	let characters = $derived(splitIntoCharacters(line));
	let width: number | null = $state(null);
	let spring = new Spring(0, { damping: 0.5, stiffness: 0.1, precision: 1 });

	let outerSpan = $state<HTMLSpanElement>();
	let innerSpan = $state<HTMLSpanElement>();

	// Before mounting we don't want to play the transition
	let mounted = $state(false);
	let visible = $state(true);
	onMount(() => (mounted = true));

	// Auto-advance
	$effect(() => {
		if (!autoAdvance || autoAdvance <= 0 || !mounted || !visible) return;
		const timer = setInterval(onNextLine, autoAdvance);
		return () => clearInterval(timer);
	});

	async function onNextLine() {
		const lastWidth = outerSpan!.clientWidth;
		width = lastWidth;
		spring.set(lastWidth, { instant: true });
		const lineIndex = lines.indexOf(line);
		line = lines[lineIndex === -1 || lineIndex === lines.length - 1 ? 0 : (lineIndex + 1)];
		await tick();
		const targetWidth = innerSpan!.clientWidth;
		spring.set(targetWidth, { instant: prefersReducedMotion.current });
		width = targetWidth;
	}
</script>

<svelte:document onvisibilitychange={() => (visible = document.visibilityState === 'visible')} />

<span class={_class} class:overflow-hidden={true}>
	<span
		style:width={width !== null && spring.current !== width ? `${spring.current}px` : undefined}
		bind:this={outerSpan}
	>
		<span class="sr-only">{line}</span>
		{#key line}
			<div
				transition:fly={{ duration: 0 }}
				onoutrostart={(e) => {
					// Don't affect width calculation
          // @ts-ignore
					e.target.style.width = '0px';
          // @ts-ignore
					e.target.style.height = '0px';
				}}
				onoutroend={(e) => {
					//e.target.style.display = 'none';
				}}
				class="flex whitespace-nowrap"
				aria-hidden="true"
				bind:this={innerSpan}
			>
				{#each characters as char, i (`${line}-${i}`)}
					<span
						class="whitespace-pre inline-block"
						in:fly|global={{
							y: -y,
							duration: (!mounted || prefersReducedMotion.current) ? 0 : inDuration,
							opacity: inOpacity,
							delay: i * inStaggerDelay,
							easing
						}}
						out:fly|global={{
							y,
							duration: prefersReducedMotion.current ? 0 : outDuration,
							opacity: outOpacity,
							delay: i * outStaggerDelay,
							easing
						}}
					>
						{char}
					</span>
				{/each}
			</div>
		{/key}
	</span>
</span>