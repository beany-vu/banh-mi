<script lang="ts">
	import BadgeInfo from 'lucide-svelte/icons/badge-info';
	import langData from 'cldr-localenames-full/main/en/languages.json';
	import ComboBox from '$lib/components/ui/ComboBox.svelte';
	import { selectedLocale, setSelectedLocale } from '$lib/stores/project.js';

	import { onMount } from 'svelte';

	export let availableLocales: string[] = [];
	export let newLocale: string = '';
	export let projectId: string;
	export let languagesObj: { [key: string]: string } =
		langData.main.en.localeDisplayNames.languages;

	export let onNewLocaleSelected: (locale: string) => void = (locale: string) => {
		newLocale = locale;
	};

	export let onLocaleChange: (locale: string) => void = (locale: string) => {
		setSelectedLocale(locale);
	};

	let languages: { value: string; label: any }[] = [];

	onMount(() => {
		languages = Object.keys(languagesObj).map((key) => ({
			value: key,
			label: `${languagesObj[key]} (${key})`
		}));
	});

	$: currentLocale = $selectedLocale;

	async function applyNewLocales() {
		try {
			const response = await fetch(`/api/translations`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ newLocale, projectId })
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const status = await response.status;
			switch (status) {
				case 201:
					availableLocales = [...availableLocales, newLocale].sort();
					alert('New locales added successfully');
					break;
				default:
					alert('Server error, please try again later');
			}
		} catch (error) {
			console.error('Error adding new locales:', error);
			alert('Server error, please try again later');
		}
	}
</script>

<div class="block-action">
	<div class="container mx-auto">
		<span
			><BadgeInfo />
			Select locale to update:
		</span>
		{#each availableLocales as locale}
			<button
				type="button"
				class={$selectedLocale === locale ? 'locale current' : 'locale'}
				on:click={() => onLocaleChange(locale)}
				on:keydown={(e) => e.key === 'Enter' && onLocaleChange(locale)}
				aria-pressed={$selectedLocale === locale ? 'true' : 'false'}
				>{`${languagesObj?.[locale]}(${locale})`}</button
			>
		{/each}
	</div>
	<div class="container mx-auto">
		Or add new locale:
		<ComboBox
			items={languages}
			onChange={(value) => onNewLocaleSelected(value)}
			placeholder="Choose a new locale"
		/>

		<button
			class="btn btn-primary"
			on:click={applyNewLocales}
			disabled={newLocale?.length === 0 ? true : false}>Apply</button
		>
	</div>
</div>

<style>
	.block-action {
		padding: 10px 0;
		background: theme('colors.background');
	}
	.locale {
		margin: 0 10px;
		text-decoration: underline;
		&.current {
			font-weight: bold;
			text-decoration: none;
		}
	}
</style>
