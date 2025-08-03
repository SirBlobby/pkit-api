<script>
    import Icon from "@iconify/svelte";

    let isOpen = false;
    const toggleMenu = () => (isOpen = !isOpen);
</script>

<nav class="sticky top-0 z-50 shadow-xl bg-surface-700 text-black dark:text-white">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
            <!-- Logo -->
            <a class="flex" href="/">
                <span class="text-xl font-bold ml-2 my-auto">Programmer Kit</span>
            </a>

            <!-- Mobile Menu Button -->
            <button class="md:hidden justify-self-end" on:click={toggleMenu}>
                {#if isOpen}
                    <Icon icon="eva:close-outline" class="w-6 h-6" />
                {:else}
                    <Icon icon="eva:menu-outline" class="w-6 h-6" />
                {/if}
            </button>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center gap-4 justify-center font-semibold">
                <a href="/api" class="btn variant-ghost">API</a>
                <a href="/library" class="btn variant-ghost">Library</a>
            </div>

            <div class="hidden md:flex justify-self-end gap-2">
                <a href="https://trello.com/b/wjJqU9ws" class="btn preset-filled">
                    <Icon icon="mdi:trello" class="w-6 h-6" />
                </a>  
                <a href="https://github.com/dead-projects-inc/pkit-cli" class="btn preset-filled">
                    <Icon icon="mdi:github" class="w-6 h-6" />
                </a>
                <a href="https://discord.gg/MHYCWXc83m" class="btn preset-filled">
                    <Icon icon="mdi:discord" class="w-6 h-6" />
                </a>             
            </div>
        </div>

        <!-- Mobile Menu -->
        {#if isOpen}
            <div class="md:hidden p-4 space-y-2 font-semibold">
                <a href="/api" class="btn variant-ghost">API</a>
                <a href="https://trello.com/b/wjJqU9ws" class="btn preset-filled">
                    <Icon icon="mdi:trello" class="w-6 h-6" />
                </a>  
                <a href="https://github.com/dead-projects-inc/pkit-cli" class="btn preset-filled">
                    <Icon icon="mdi:github" class="w-6 h-6" />
                </a>
                <a href="https://discord.gg/MHYCWXc83m" class="btn preset-filled">
                    <Icon icon="mdi:discord" class="w-6 h-6" />
                </a>   
            </div>
        {/if}
    </div>
</nav>