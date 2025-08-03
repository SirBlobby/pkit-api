<script lang="ts">
    import Lang from "$lib/components/Lang.svelte";
    import { onMount } from "svelte";

    let languages: any[] = [];

    onMount(async () => {
        const response = await fetch("/api/language/");
        if (response.ok) {
            languages = await response.json();
        } else {
            console.error("Failed to fetch languages");
        }
    });



</script>

<div class="container mx-auto p-4"> 
    <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-surface-900 dark:text-surface-100 mb-2">Library</h1>
        <p class="text-xl text-surface-700 dark:text-surface-300 mb-2">Programmer Kit Library</p>
        <!-- <p class="text-base text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Use this API to get information about programming languages, their versions, platforms, and download links. 
            All endpoints return JSON responses and support both light and dark themes.
        </p> -->
    </div>

    <div class="grid grid-cols-1 gap-4">
        {#each languages as lang}
            <Lang langauge={lang} />
        {/each}
    </div>
</div>
