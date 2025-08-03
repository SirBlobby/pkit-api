<script lang="ts">
    import "$lib/css/markdown.css";

    import { onMount } from "svelte";
    import Markdown from "svelte-exmarkdown";
    import ImageSlider from "$lib/components/ImageSlider.svelte";

	let md = $state<string>("");

    // fetch text from repository url reamde file
    // https://raw.githubusercontent.com/yourusername/yourrepo/main/README.md

    onMount(async () => {
        md = await fetch(
        "https://raw.githubusercontent.com/dead-projects-inc/pkit-cli/refs/heads/master/README.md"
        )
        .then((response) => response.text())
        .catch((error) => {
            console.error("Error fetching README.md:", error);
            return "# Error fetching README.md";
        });
    });
</script>

<div class="card bg-surface-700 h-full w-full p-3 sm:p-4 lg:p-6 markdown">
    <Markdown {md} />

    <ImageSlider
        images={[
            {
                src: "/image1.png",
                alt: "CLI Image 1"
            },
            {
                src: "/image2.png",
                alt: "CLI Image 2"
            },
            {
                src: "/image3.png",
                alt: "CLI Image 3"
            },
            {
                src: "/image4.png",
                alt: "CLI Image 4"
            }
        ]}
        autoPlay={true}
        autoPlayInterval={2000}
        className="mt-4 sm:mt-6 lg:mt-8"
    />  
</div>

