<script lang="ts">
    import Icon from "@iconify/svelte";
    
    interface Parameter {
        name: string;
        type: string;
        required: boolean;
        description: string;
    }
    
    interface Response {
        status: string;
        description: string;
        example?: any;
    }
    
    export let endpoint: string = "";
    export let description: string = "";
    export let parameters: Parameter[] = [];
    export let queryParams: Parameter[] = [];
    export let responses: Response[] = [];
    export let example: string = "";
    export let baseUrl: string = "";
    
    let showExample: boolean = false;
    let copied: boolean = false;
    
    const toggleExample = (): void => {
        showExample = !showExample;
    };
    
    const copyToClipboard = async (text: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(text);
            copied = true;
            setTimeout(() => copied = false, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
    
    $: fullUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint;
</script>

<div class="border border-surface-300 dark:border-surface-500 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 bg-surface-50 dark:bg-surface-800">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-md text-sm font-semibold">
            GET
        </span>
        <code class="text-sm sm:text-base lg:text-lg font-mono bg-surface-200 dark:bg-surface-600 px-3 py-1 rounded-md flex-1 w-full break-all">
            {endpoint}
        </code>
        <button 
            on:click={() => copyToClipboard(fullUrl)}
            class="p-2 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-md transition-colors self-end sm:self-auto"
            title="Copy URL"
        >
            {#if copied}
                <Icon icon="eva:checkmark-circle-2-fill" class="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            {:else}
                <Icon icon="eva:copy-outline" class="w-4 h-4 sm:w-5 sm:h-5 text-surface-600 dark:text-surface-400" />
            {/if}
        </button>
    </div>
    
    <!-- Description -->
    {#if description}
        <p class="text-surface-700 dark:text-surface-300 mb-4 leading-relaxed text-sm sm:text-base">
            {description}
        </p>
    {/if}
    
    <!-- Parameters Section -->
    {#if parameters.length > 0}
        <div class="mb-4">
            <h4 class="text-base sm:text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                <Icon icon="eva:settings-2-outline" class="w-4 h-4 sm:w-5 sm:h-5" />
                Path Parameters
            </h4>
            <div class="overflow-x-auto">
                <table class="w-full border border-surface-300 dark:border-surface-600 rounded-md min-w-[600px]">
                    <thead>
                        <tr class="bg-surface-100 dark:bg-surface-800">
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Name</th>
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Type</th>
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Required</th>
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each parameters as param}
                            <tr class="border-b border-surface-300 dark:border-surface-600 last:border-b-0">
                                <td class="px-2 sm:px-4 py-2">
                                    <code class="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded text-xs sm:text-sm text-surface-800 dark:text-surface-200">
                                        {param.name}
                                    </code>
                                </td>
                                <td class="px-2 sm:px-4 py-2 text-surface-600 dark:text-surface-400 text-sm">{param.type}</td>
                                <td class="px-2 sm:px-4 py-2 text-sm">
                                    {#if param.required}
                                        <span class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs font-medium">Required</span>
                                    {:else}
                                        <span class="bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 px-2 py-1 rounded text-xs">Optional</span>
                                    {/if}
                                </td>
                                <td class="px-2 sm:px-4 py-2 text-surface-700 dark:text-surface-300 text-sm">{param.description}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
    
    <!-- Query Parameters Section -->
    {#if queryParams.length > 0}
        <div class="mb-4">
            <h4 class="text-base sm:text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                <Icon icon="eva:funnel-outline" class="w-4 h-4 sm:w-5 sm:h-5" />
                Query Parameters
            </h4>
            <div class="overflow-x-auto">
                <table class="w-full border border-surface-300 dark:border-surface-600 rounded-md min-w-[600px]">
                    <thead>
                        <tr class="bg-surface-100 dark:bg-surface-800">
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Name</th>
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Type</th>
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Required</th>
                            <th class="text-left px-2 sm:px-4 py-2 font-semibold text-surface-900 dark:text-surface-100 border-b border-surface-300 dark:border-surface-600 text-sm">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each queryParams as param}
                            <tr class="border-b border-surface-300 dark:border-surface-600 last:border-b-0">
                                <td class="px-2 sm:px-4 py-2">
                                    <code class="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded text-xs sm:text-sm text-surface-800 dark:text-surface-200">
                                        {param.name}
                                    </code>
                                </td>
                                <td class="px-2 sm:px-4 py-2 text-surface-600 dark:text-surface-400 text-sm">{param.type}</td>
                                <td class="px-2 sm:px-4 py-2 text-sm">
                                    {#if param.required}
                                        <span class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs font-medium">Required</span>
                                    {:else}
                                        <span class="bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 px-2 py-1 rounded text-xs">Optional</span>
                                    {/if}
                                </td>
                                <td class="px-2 sm:px-4 py-2 text-surface-700 dark:text-surface-300 text-sm">{param.description}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
    
    <!-- Responses Section -->
    {#if responses.length > 0}
        <div class="mb-4">
            <h4 class="text-base sm:text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                <Icon icon="eva:arrow-back-outline" class="w-4 h-4 sm:w-5 sm:h-5" />
                Responses
            </h4>
            <div class="space-y-3">
                {#each responses as response}
                    <div class="border border-surface-300 dark:border-surface-600 rounded-md p-3 sm:p-4 bg-surface-700">
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                            <span class="bg-surface-200 dark:bg-surface-800 text-surface-800 dark:text-surface-200 px-2 py-1 rounded text-sm font-mono">
                                {response.status}
                            </span>
                            <span class="text-surface-700 dark:text-surface-300 font-medium text-sm sm:text-base">{response.description}</span>
                        </div>
                        {#if response.example}
                            <pre class="bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded p-3 overflow-x-auto mt-2">
                                <code class="text-xs sm:text-sm text-surface-800 dark:text-surface-200">{JSON.stringify(response.example, null, 2)}</code>
                            </pre>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/if}
    
    <!-- Example Section -->
    {#if example}
        <div>
            <button 
                on:click={toggleExample}
                class="flex items-center gap-2 w-full text-left p-3 bg-surface-100 dark:bg-surface-800 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            >
                <Icon 
                    icon={showExample ? "eva:chevron-down-outline" : "eva:chevron-right-outline"} 
                    class="w-4 h-4 sm:w-5 sm:h-5 text-surface-600 dark:text-surface-400" 
                />
                <span class="text-base sm:text-lg font-semibold text-surface-900 dark:text-surface-100">Example Request</span>
            </button>
            
            {#if showExample}
                <div class="mt-4 p-3 sm:p-4 bg-surface-100 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-surface-600 dark:text-surface-400">cURL</span>
                        <button 
                            on:click={() => copyToClipboard(example)}
                            class="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded transition-colors"
                            title="Copy example"
                        >
                            {#if copied}
                                <Icon icon="eva:checkmark-circle-2-fill" class="w-4 h-4 text-green-600" />
                            {:else}
                                <Icon icon="eva:copy-outline" class="w-4 h-4 text-surface-600 dark:text-surface-400" />
                            {/if}
                        </button>
                    </div>
                    <pre class="bg-surface-200 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded p-2 overflow-x-auto">
                        <code class="flex text-xs sm:text-sm text-surface-800 dark:text-surface-200 font-mono break-all">{example}</code>
                    </pre>
                </div>
            {/if}
        </div>
    {/if}
</div>
