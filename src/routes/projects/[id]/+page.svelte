<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import Translation from './components/Translation.svelte';
	import TranslationSummary from './components/Summary.svelte';
	import Locales from './components/Locales.svelte';
	import { onMount } from 'svelte';

	let selectedLocale: string = 'en'; // Set initial value to 'en'
	let project, translations, availableLocales;

	const data = derived(page, ($page) => $page.data);

	onMount(async () => {
		const response = await fetch(`/api/projects/${$page.params.id}`);
		const result = await response.json();
		project = result.project;
		translations = result.translations;
		availableLocales = result.availableLocales;
	});

	function handleLocaleChange(event: CustomEvent) {
		selectedLocale = event.detail;
	}
</script>

<main>
	<TranslationSummary
		name={project?.name}
		description={project?.description}
		createdAt={project?.createdAt}
		lastUpdate={project?.lastUpdate}
		on:localeChange={handleLocaleChange}
	/>
	<Locales
		{availableLocales}
		{selectedLocale}
		on:localeChange={handleLocaleChange}
		projectId={project?.id}
	/>
	<Translation {translations} locale={selectedLocale} projectId={project?.id} />
</main>
