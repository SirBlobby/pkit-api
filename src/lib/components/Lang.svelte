<script lang="ts">  
    import { Pagination } from '@skeletonlabs/skeleton-svelte';

    import { onMount } from "svelte";
    import Icon from "@iconify/svelte";

    export let langauge = "node";

    let data: any = [];
    let versionSummary: any[] = [];
    let copiedStates: { [key: string]: boolean } = {};
    
    // Pagination state
    let currentPage = 1;
    let pageSize = 5;
    let paginatedVersions: any[] = [];

    $: {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        paginatedVersions = versionSummary.slice(start, end);
    }

    onMount(async () => {
        const response = await fetch(`/api/language/${langauge}`);
        if (response.ok) {
            data = await response.json();
        
            const grouped = new Map<string, {platforms: Set<string>, architectures: Set<string>}>();
            
            data.forEach((item: any) => {
                if (!grouped.has(item.version)) {
                    grouped.set(item.version, {
                        platforms: new Set(),
                        architectures: new Set()
                    });
                }
                grouped.get(item.version)?.platforms.add(item.platform);
                grouped.get(item.version)?.architectures.add(item.arch);
            });
            
            versionSummary = Array.from(grouped.entries()).map(([version, info]) => ({
                version,
                platforms: Array.from(info.platforms).sort(),
                architectures: Array.from(info.architectures).sort()
            }));
            
            // Reset to first page when data changes
            currentPage = 1;
            
        } else {
            console.error("Failed to fetch language data");
        }
    });
    
    $: langName = langauge.charAt(0).toUpperCase() + langauge.slice(1);

    async function copyToClipboard(text: string, key: string) {
        try {
            await navigator.clipboard.writeText(text);
            copiedStates[key] = true;
            setTimeout(() => {
                copiedStates[key] = false;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }
</script>

<div class="card w-full preset-filled-surface-100-900 p-4 text-center">
    <div>
        <h2 class="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
            <code class="font-mono bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">
                pkit list {langName}
            </code>
            <button 
                on:click={() => copyToClipboard(`pkit list ${langName}`, 'header')}
                class="p-2 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-md transition-colors"
                title="Copy command"
            >
                {#if copiedStates['header']}
                    <Icon icon="eva:checkmark-circle-2-fill" class="w-5 h-5 text-green-600" />
                {:else}
                    <Icon icon="eva:copy-outline" class="w-5 h-5 text-surface-600 dark:text-surface-400" />
                {/if}
            </button>
        </h2>
    </div>
    <div class="text-left">
        <table class="table caption-bottom">
            <thead>
                <tr> 
                    <th class="!text-center">Version</th>
                    <th class="!text-center">Platforms</th>
                    <th class="!text-center">Architectures</th>
                    <th class="!text-right">Install Command</th>
                </tr>
            </thead>
            <tbody class="[&>tr]:hover:preset-tonal-primary">
            {#if paginatedVersions.length > 0}
                {#each paginatedVersions as version}
                <tr>
                    <td class="font-mono text-lg">{version.version}</td>
                    <td>
                        <div class="flex flex-wrap justify-center items-center">
                            {#each version.platforms as platform}
                                <span class="badge font-semibold mx-2" 
                                      class:bg-blue-600={platform === 'linux'}
                                      class:bg-purple-600={platform === 'win'}
                                      class:bg-green-600={platform === 'darwin'}
                                      class:bg-orange-500={!['linux', 'windows', 'darwin', 'macos'].includes(platform)}
                                      class:text-white={true}>
                                    {platform}
                                </span>
                            {/each}
                        </div>
                    </td>
                    <td>
                        <div class="flex flex-wrap justify-center items-center">
                            {#each version.architectures as arch}
                                <span class="badge font-semibold mx-2"
                                      class:bg-gray-500={arch === 'x64'}
                                      class:bg-indigo-500={arch === 'arm64'}
                                      class:bg-pink-500={arch === 'x86'}
                                      class:bg-teal-500={arch === 'aarch64'}
                                      class:bg-red-500={!['x64', 'arm64', 'x86', 'aarch64'].includes(arch)}
                                      class:text-white={true}>
                                    {arch}
                                </span>
                            {/each}
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="flex items-center justify-end gap-2">
                            <code class="font-mono bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded text-sm">
                                pkit install {langauge} {version.version}
                            </code>
                            <button 
                                on:click={() => copyToClipboard(`pkit install ${langauge} ${version.version}`, `install-${version.version}`)}
                                class="p-1 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-md transition-colors"
                                title="Copy install command"
                            >
                                {#if copiedStates[`install-${version.version}`]}
                                    <Icon icon="eva:checkmark-circle-2-fill" class="w-4 h-4 text-green-600" />
                                {:else}
                                    <Icon icon="eva:copy-outline" class="w-4 h-4 text-surface-600 dark:text-surface-400" />
                                {/if}
                            </button>
                        </div>
                    </td>
                </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="4" class="text-center">Loading...</td>
                </tr>
            {/if}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">
                        Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, versionSummary.length)} of {versionSummary.length} versions
                    </td>
                    <td class="text-right">Page {currentPage} of {Math.ceil(versionSummary.length / pageSize)}</td>
                </tr>
            </tfoot>
        </table>
        <div class="w-full flex justify-center mt-4">
            <Pagination
                data={versionSummary}
                page={currentPage}
                onPageChange={(e) => (currentPage = e.page)}
                pageSize={pageSize}
                siblingCount={1}
            />
        </div>
    </div>  
</div>