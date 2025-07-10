<script lang="ts">
	import '../app.css'
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Programmer Kit</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<main class="flex flex-col min-h-screen h-screen max-w-screen">
	<Navbar />
    <div class="container mx-auto p-8">
        {@render children()}
    </div>
</main>