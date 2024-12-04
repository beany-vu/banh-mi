<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Listing from '$lib/components/projects/Listing.svelte';
	import NewProject from '$lib/components/projects/NewProject.svelte';

	let projects: any[] = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/projects');
			if (response.ok) {
				const data = await response.json();
				projects = data.projects;
			} else {
				console.error('Failed to fetch projects');
			}
		} catch (error) {
			console.error('Error fetching projects:', error);
		}
	});
</script>

<div class="container mx-auto rounded border-0 bg-sky-100 p-10">
	<!-- show error from returned data if available -->
	{#if $page.error}
		<div
			class="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
			role="alert"
		>
			<strong class="font-bold">Error!</strong>
			<span class="block sm:inline">{$page.error.message}</span>
		</div>
	{/if}
	<div class="flex flex-col gap-6 lg:flex-row">
		<Listing {projects} />
		<NewProject />
	</div>
</div>
