<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import type { EmblaCarouselType } from 'embla-carousel';

  interface Testimonial {
    name: string;
    subtext: string;
    link?: string;
    text: string;
    avatar?: string;
  }

  interface Props {
    testimonials: Testimonial[];
  }

  let { testimonials }: Props = $props();

  let emblaApi = $state<EmblaCarouselType>();
  let currentIndex = $state(0);
  let scrollSnaps = $state<number[]>([]);
  let visibleSlides = $state<number[]>([]);

  const autoplayPlugin = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    stopOnFocusIn: true
  });

  function syncCarouselState() {
    if (!emblaApi) return;
    currentIndex = emblaApi.selectedScrollSnap();
    visibleSlides = emblaApi.slidesInView();
  }

  function onInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
    scrollSnaps = emblaApi.scrollSnapList();

    syncCarouselState();
    emblaApi.on('select', syncCarouselState);
    emblaApi.on('slidesInView', syncCarouselState);
  }

  function isSlideVisible(index: number) {
    return visibleSlides.includes(index);
  }

  function scrollTo(index: number) {
    emblaApi?.scrollTo(index);
  }

  function scrollPrev() {
    emblaApi?.scrollPrev();
  }

  function scrollNext() {
    emblaApi?.scrollNext();
  }
</script>

<section class="space-y-6 md:space-y-8">
  <div class="max-w-3xl space-y-2">
    <h2 class="text-white font-bold font-display text-xl md:text-3xl">What people are saying</h2>
  </div>

  <div
    role="region"
    aria-label="Testimonials carousel"
    class="overflow-hidden -mx-4 px-4 select-none"
    use:emblaCarouselSvelte={{
      options: { loop: true, align: 'start', slidesToScroll: 1 },
      plugins: [autoplayPlugin]
    }}
    onemblaInit={onInit}
  >
    <div class="flex">
      {#each testimonials as testimonial, i (testimonial.name + testimonial.subtext)}
        <div
          class="shrink-0 grow-0 basis-full md:basis-[calc(50%-0.5rem)] ml-4 min-w-72 bg-slate-900/35 border border-slate-600/45 rounded-2xl px-5 py-6 md:px-6 md:py-7 flex flex-col justify-between gap-5"
          role="group"
          aria-roledescription="slide"
          aria-label={`Testimonial from ${testimonial.name}, ${testimonial.subtext}`}
          aria-hidden={!isSlideVisible(i)}
        >
          <div class="relative">
            <span class="absolute -top-4 left-0 text-7xl text-teal-400/20 font-serif leading-none select-none pointer-events-none font-display">“</span>
            <p class="text-slate-200 text-sm md:text-base leading-relaxed relative z-10">{testimonial.text}</p>
          </div>
          <div class="flex flex-col gap-0.5 pt-1 border-t border-slate-700/60">
            <span class="text-white font-medium">{testimonial.name}</span>
            {#if testimonial.link}
              <a
                href={testimonial.link}
                target="_blank"
                class="text-teal-400 text-sm hover:underline"
                tabindex={isSlideVisible(i) ? undefined : -1}
              >{testimonial.subtext}</a>
            {:else}
              <span class="text-slate-400 text-sm">{testimonial.subtext}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="flex items-center justify-start gap-3">
    <button
      class="size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-slate-700/60 hover:bg-slate-600 text-white"
      onclick={scrollPrev}
      aria-label="Previous slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <div class="flex gap-2">
      {#each scrollSnaps as _, i (i)}
        <button
          class="size-2 rounded-full transition-colors cursor-pointer {currentIndex === i ? 'bg-white' : 'bg-slate-500 hover:bg-slate-400'}"
          onclick={() => scrollTo(i)}
          aria-label="Go to slide {i + 1}"
          aria-current={currentIndex === i ? 'true' : undefined}
        ></button>
      {/each}
    </div>

    <button
      class="size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-slate-700/60 hover:bg-slate-600 text-white"
      onclick={scrollNext}
      aria-label="Next slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</section>
