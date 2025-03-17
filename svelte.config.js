import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [mdsvex({ extensions: ['.svx', '.md'] }), vitePreprocess()],
    kit: {
		adapter: adapter()
	},
    extensions: ['.svelte', '.svx', '.md'],
};

export default config;
