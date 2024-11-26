<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
    import Translation from '$lib/components/projects/Translation.svelte';

	let selectedLocale: string = $state('en'); // Set initial value to 'en'
    let count = $state(0);

	const data = derived(page, $page => $page.data);

    const { project, translations, availableLocales } = $data;
</script>

<main>
	<h2>{project.name} {selectedLocale} {count}</h2>
    {selectedLocale}
	<p>{project.description}</p>
	<p>Created At: {project.createdAt}</p>
    <p>Last Update: {project.lastUpdate}</p>

    <label for="locale-select">Select Locale:</label>
    <select id="locale-select" bind:value={selectedLocale}>
        <option value="" disabled>Select a locale</option>
        {#each availableLocales as locale}
            <option value={locale}>{locale}</option>
        {/each}
    </select>

    <Translation translations={translations} locale={selectedLocale} />
</main>
