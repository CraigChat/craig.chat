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

  const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true });

  function onInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
    scrollSnaps = emblaApi.scrollSnapList();
    
    emblaApi.on('select', () => {
      currentIndex = emblaApi!.selectedScrollSnap();
    });
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

<section class="my-8">
  <h2 class="text-white font-bold font-display text-xl md:text-2xl mb-4 text-center">What people are saying</h2>
  <div
    class="overflow-hidden -mx-4 px-4 select-none"
    use:emblaCarouselSvelte={{
      options: { loop: true, align: 'start', slidesToScroll: 1 },
      plugins: [autoplayPlugin]
    }}
    onemblaInit={onInit}
  >
    <div class="flex">
      {#each testimonials as testimonial}
        <div class="shrink-0 grow-0 basis-full md:basis-[calc(50%-0.5rem)] ml-4 min-w-72 bg-slate-500/25 border border-slate-500/75 rounded-xl p-4 flex flex-col justify-between gap-3">
          <div class="relative">
            <span class="absolute -top-2 -left-2 text-9xl text-teal-500/20 font-serif leading-none select-none pointer-events-none font-display">“</span>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed relative z-10">{testimonial.text}</p>
          </div>
          <div class="flex flex-col">
            <span class="text-white font-medium">{testimonial.name}</span>
            {#if testimonial.link}
              <a href={testimonial.link} target="_blank" class="text-teal-500 text-sm hover:underline">{testimonial.subtext}</a>
            {:else}
              <span class="text-slate-400 text-sm">{testimonial.subtext}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Indicators -->
  <div class="flex justify-center items-center gap-3 mt-4">
    <button
      class="size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-slate-500/50 hover:bg-slate-500 text-white"
      onclick={scrollPrev}
      aria-label="Previous slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    
    <div class="flex gap-2">
      {#each scrollSnaps as _, i}
        <button
          class="size-2 rounded-full transition-colors cursor-pointer {currentIndex === i ? 'bg-white' : 'bg-slate-500 hover:bg-slate-400'}"
          onclick={() => scrollTo(i)}
          aria-label="Go to slide {i + 1}"
        ></button>
      {/each}
    </div>
    
    <button
      class="size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer bg-slate-500/50 hover:bg-slate-500 text-white"
      onclick={scrollNext}
      aria-label="Next slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</section>
