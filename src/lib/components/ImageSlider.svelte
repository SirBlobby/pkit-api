<script lang="ts">
    import Icon from "@iconify/svelte";
    
    interface SliderImage {
        src: string;
        alt: string;
        title?: string;
        description?: string;
    }
    
    export let images: SliderImage[] = [];
    export let autoPlay: boolean = false;
    export let autoPlayInterval: number = 5000;
    export let showIndicators: boolean = true;
    export let showNavigation: boolean = true;
    export let showThumbnails: boolean = false;
    export let aspectRatio: string = "16/9";
    export let className: string = "";
    
    let currentIndex: number = 0;
    let autoPlayTimer: number | null = null;
    let isLoading: boolean = false;
    let imageContainer: HTMLDivElement;
    
    // Auto-play functionality
    const startAutoPlay = (): void => {
        if (!autoPlay || images.length <= 1) return;
        
        autoPlayTimer = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);
    };
    
    const stopAutoPlay = (): void => {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    };
    
    // Navigation functions
    const goToSlide = (index: number): void => {
        if (index >= 0 && index < images.length) {
            currentIndex = index;
        }
    };
    
    const nextSlide = (): void => {
        currentIndex = (currentIndex + 1) % images.length;
    };
    
    const prevSlide = (): void => {
        currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    };
    
    // Keyboard navigation
    const handleKeydown = (event: KeyboardEvent): void => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
                event.preventDefault();
                nextSlide();
                break;
            case 'Home':
                event.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                event.preventDefault();
                goToSlide(images.length - 1);
                break;
        }
    };
    
    // Touch/swipe support
    let touchStartX: number = 0;
    let touchEndX: number = 0;
    
    const handleTouchStart = (event: TouchEvent): void => {
        touchStartX = event.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (event: TouchEvent): void => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    };
    
    const handleSwipe = (): void => {
        const swipeThreshold = 50;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };
    
    // Image loading
    const handleImageLoad = (): void => {
        isLoading = false;
    };
    
    const handleImageError = (event: Event): void => {
        console.error('Failed to load image:', event);
        isLoading = false;
    };
    
    // Reactive statements
    $: if (autoPlay) {
        startAutoPlay();
    } else {
        stopAutoPlay();
    }
    
    $: currentImage = images[currentIndex];
    
    // Cleanup on destroy
    import { onDestroy } from 'svelte';
    onDestroy(() => {
        stopAutoPlay();
    });
</script>

<svelte:window on:keydown={handleKeydown} />

<div 
    class="relative overflow-hidden rounded-lg bg-surface-100 dark:bg-surface-800 group {className}"
    class:cursor-pointer={images.length > 1}
    style="aspect-ratio: {aspectRatio}"
    bind:this={imageContainer}
    on:touchstart={handleTouchStart}
    on:touchend={handleTouchEnd}
    on:mouseenter={stopAutoPlay}
    on:mouseleave={() => autoPlay && startAutoPlay()}
    role="region"
    aria-label="Image carousel"
>
    {#if images.length === 0}
        <!-- Empty state -->
        <div class="flex items-center justify-center h-full text-surface-500 dark:text-surface-400">
            <div class="text-center">
                <Icon icon="eva:image-outline" class="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p class="text-lg font-medium">No images to display</p>
            </div>
        </div>
    {:else}
        <!-- Main image container -->
        <div class="relative w-full h-full">
            {#each images as image, index}
                <div 
                    class="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    class:opacity-100={index === currentIndex}
                    class:opacity-0={index !== currentIndex}
                    aria-hidden={index !== currentIndex}
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        class="w-full h-full object-cover"
                        class:animate-pulse={isLoading}
                        on:load={handleImageLoad}
                        on:error={handleImageError}
                        loading={index === currentIndex ? "eager" : "lazy"}
                    />
                    
                    <!-- Image overlay with title and description -->
                    {#if (image.title || image.description) && index === currentIndex}
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 lg:p-6">
                            {#if image.title}
                                <h3 class="text-white text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{image.title}</h3>
                            {/if}
                            {#if image.description}
                                <p class="text-white/90 text-xs sm:text-sm leading-relaxed">{image.description}</p>
                            {/if}
                        </div>
                    {/if}
                </div>
            {/each}
            
            <!-- Loading indicator -->
            {#if isLoading}
                <div class="absolute inset-0 flex items-center justify-center bg-surface-100/80 dark:bg-surface-800/80">
                    <Icon icon="eva:loader-outline" class="w-8 h-8 animate-spin text-surface-600 dark:text-surface-400" />
                </div>
            {/if}
        </div>
        
        <!-- Navigation arrows -->
        {#if showNavigation && images.length > 1}
            <button
                class="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                on:click={prevSlide}
                aria-label="Previous image"
                tabindex="0"
            >
                <Icon icon="eva:arrow-left-outline" class="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            
            <button
                class="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                on:click={nextSlide}
                aria-label="Next image"
                tabindex="0"
            >
                <Icon icon="eva:arrow-right-outline" class="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
        {/if}
        
        <!-- Indicators -->
        {#if showIndicators && images.length > 1}
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
                {#each images as _, index}
                    <button
                        class="w-2 h-2 rounded-full transition-all duration-200 bg-white"
                        class:opacity-100={index === currentIndex}
                        class:opacity-50={index !== currentIndex}
                        class:scale-125={index === currentIndex}
                        on:click={() => goToSlide(index)}
                        aria-label="Go to slide {index + 1}"
                        role="tab"
                        aria-selected={index === currentIndex}
                        tabindex="0"
                    ></button>
                {/each}
            </div>
        {/if}
        
        <!-- Image counter -->
        <div class="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
            {currentIndex + 1} / {images.length}
        </div>
    {/if}
    
    <!-- Thumbnails -->
    {#if showThumbnails && images.length > 1}
        <div class="absolute bottom-0 left-0 right-0 bg-black/70 p-2 sm:p-4">
            <div class="flex gap-1 sm:gap-2 overflow-x-auto">
                {#each images as image, index}
                    <button
                        class="flex-shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded border-2 overflow-hidden transition-all duration-200 border-white"
                        class:opacity-100={index === currentIndex}
                        class:opacity-60={index !== currentIndex}
                        class:border-opacity-100={index === currentIndex}
                        class:border-opacity-30={index !== currentIndex}
                        on:click={() => goToSlide(index)}
                        aria-label="Go to image {index + 1}"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            class="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .group:hover .group-hover\:opacity-100 {
        opacity: 1;
    }
</style>
