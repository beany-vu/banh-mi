<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import Translation from './components/LocaleText.svelte';
	import TranslationSummary from './components/Summary.svelte';
	import Locales from './components/Locales.svelte';

	let selectedLocale: string = $state('en'); // Set initial value to 'en'

	const data = derived(page, ($page) => $page.data);

	const { project, translations, availableLocales } = $data;

	function handleLocaleChange(event: CustomEvent) {
		selectedLocale = event.detail;
	}
</script>

<main>
	<TranslationSummary
		name={project.name}
		description={project.description}
		createdAt={project.createdAt}
		lastUpdate={project.lastUpdate}
		on:localeChange={handleLocaleChange}
	/>
	<Locales
		{availableLocales}
		{selectedLocale}
		on:localeChange={handleLocaleChange}
		projectId={project.id}
	/>
	<Translation {translations} locale={selectedLocale} />
</main>
