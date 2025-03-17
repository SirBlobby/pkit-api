
<div class="container mx-auto p-4"> 
    <img src="/favicon.png" alt="logo" class="w-32 h-32 mx-auto" />
    <h1 class="text-2xl font-bold">API DOCS</h1>
    <p class="text-lg">This is the API documentation page</p>

    <p class="text-lg"><code>/api/languages/</code> - Returns all available languages</p>
    <p class="text-lg"><code>/api/languages/:name</code> - Returns all available versions for a specific language</p>
    <p class="text-lg">
        <code>/api/languages/:name/:version</code> - Returns all available platforms for a specific language and version
    </p>
    <p class="text-lg">
        <code>?platform=linux&arch=x64</code> - Returns the download link for a specific platform and architecture (Optional Filters)
    </p>
</div>

<style>
    code {
        background-color: #f3f4f6;
        border-radius: 1px;
        padding: 1px;
    }
</style>