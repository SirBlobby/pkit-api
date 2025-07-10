<script lang="ts">
    import { onMount } from "svelte";
    import GETRoute from "$lib/components/api/GETRoute.svelte";
	import { on } from "svelte/events";

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

    interface APIEndpoint {
        endpoint: string;
        description: string;
        parameters?: Parameter[];
        queryParams?: Parameter[];
        responses: Response[];
        example: string;
    }

    const baseUrl = "https://pkit.sirblob.co";

    // Define the API endpoints with complete data
    const endpoints: APIEndpoint[] = [
        {
            endpoint: "/api/language/",
            description: "Returns a list of all available programming languages with their basic information.",
            parameters: [],
            queryParams: [],
            responses: [
                {
                    status: "200",
                    description: "Success - Returns array of languages",
                    example: ["Node"]
                },
                {
                    status: "500",
                    description: "Internal server error",
                    example: { "error": "Failed to fetch languages" }
                }
            ],
            example: `curl -X GET '${baseUrl}/api/language/'`
        },
        {
            endpoint: "/api/language/:name",
            description: "Returns all available versions for a specific programming language.",
            parameters: [
                {
                    name: "name",
                    type: "string",
                    required: true,
                    description: "The programming language name (e.g., 'python', 'node', 'java')"
                }
            ],
            queryParams: [],
            responses: [
                {
                    status: "200",
                    description: "Success - Returns language versions",
                    example: [
                        {
                            name: "node",
                            version: "22.14.0",
                            url: "https://nodejs.org/download/release/v22.14.0/node-v22.14.0-darwin-arm64.tar.gz",
                            platform: "darwin",
                            arch: "arm64"
                        }
                    ]
                }
            ],
            example: `curl -X GET '${baseUrl}/api/language/node'`
        },
        {
            endpoint: "/api/language/:name/:version",
            description: "Returns all available platforms and architectures for a specific language version.",
            parameters: [
                {
                    name: "name",
                    type: "string",
                    required: true,
                    description: "The programming language name"
                },
                {
                    name: "version",
                    type: "string",
                    required: true,
                    description: "The specific version of the language"
                }
            ],
            queryParams: [
                {
                    name: "platform",
                    type: "string",
                    required: false,
                    description: "Filter by platform (linux, windows, macos)"
                },
                {
                    name: "arch",
                    type: "string",
                    required: false,
                    description: "Filter by architecture (x64, arm64)"
                }
            ],
            responses: [
                {
                    status: "200",
                    description: "Success - Returns platform information",
                    example: [
                        {
                            name: "node",
                            version: "22.14.0",
                            url: "https://nodejs.org/download/release/v22.14.0/node-v22.14.0-darwin-arm64.tar.gz",
                            platform: "darwin",
                            arch: "arm64"
                        }
                    ]
                }
            ],
            example: `curl -X GET '${baseUrl}/api/language/node/23.11.1?platform=linux&arch=x64'`
        }
    ];

    onMount(() => {
        endpoints.forEach(async (endpoint) => {
            try {
                const response = await fetch(`${baseUrl}${endpoint.endpoint}`);
                if (response.ok) {
                    const data = await response.json();
                    endpoint.example = JSON.stringify(data, null, 2);
                } else {
                    endpoint.example = `Error: ${response.status} ${response.statusText}`;
                }
            } catch (error) {
                console.error(`Failed to fetch example for ${endpoint.endpoint}:`, error);
                endpoint.example = `Error fetching example: ${error}`;
            }
        }); 
    });

</script>

<div class="container mx-auto p-4"> 
    <div class="text-center mb-8">
        <img src="/favicon.png" alt="logo" class="w-32 h-32 mx-auto mb-4" />
        <h1 class="text-4xl font-bold text-surface-900 dark:text-surface-100 mb-2">API Documentation</h1>
        <p class="text-xl text-surface-700 dark:text-surface-300 mb-2">Programmer Kit API</p>
        <p class="text-base text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Use this API to get information about programming languages, their versions, platforms, and download links. 
            All endpoints return JSON responses and support both light and dark themes.
        </p>
    </div>

    <div class="space-y-6">
        {#each endpoints as endpoint}
            <GETRoute 
                endpoint={endpoint.endpoint}
                description={endpoint.description}
                parameters={endpoint.parameters || []}
                queryParams={endpoint.queryParams || []}
                responses={endpoint.responses}
                example={endpoint.example}
                baseUrl={baseUrl}
            />
        {/each}
    </div>
</div>
