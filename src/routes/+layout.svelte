<script lang="ts">
	import '../app.css'
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Programmer Kit</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<main class="flex flex-col min-h-screen h-screen max-w-screen overflow-x-hidden">
	<Navbar />
    <div class="container mx-auto p-4 sm:p-6 lg:p-8 w-full max-w-full">
        {@render children()}
    </div>
</main>