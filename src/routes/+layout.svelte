<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>


<main class="min-h-screen h-screen max-w-screen flex bg-blue-200">
	{@render children()}
</main>
