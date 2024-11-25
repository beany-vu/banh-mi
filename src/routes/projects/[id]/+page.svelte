<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	let selectedLocale: string = $state('fr'); // Set initial value to 'en'
    let count = $state(0);

	const data = derived(page, $page => $page.data);

    const { project, translations, availableLocales } = $data;

    // const selectedTranslation = derived([translations, selectedLocale], ([$translations, $selectedLocale]) => {
    //     return $translations.find((t: { locale: string }) => t.locale === $selectedLocale);
    // });

    function handleLocaleChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        selectedLocale = selectElement.value;
    }

    function setLocaleToFrench() {
        selectedLocale = 'fr';
        count ++;
    }
    $inspect(selectedLocale);
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

    <button onclick={setLocaleToFrench}>Set Locale to French</button>

<!-- 
    {JSON.stringify(selectedTranslation)}
    {selectedLocale}

    {#if selectedTranslation}
        <h3>Translation ({selectedLocale}):</h3>
        <p>{selectedTranslation}</p>
        {JSON.stringify(selectedTranslation)}
    {/if} -->
	<!-- ...existing code... -->
</main>
