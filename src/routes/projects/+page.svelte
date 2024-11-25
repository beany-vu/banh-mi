<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Listing from '$lib/components/projects/Listing.svelte';
    import NewProject from '$lib/components/projects/NewProject.svelte';

	let projects = [];

	$: {
		const { data } = $page;
		projects = data.projects;
	}
</script>

<div class="container mx-auto rounded border-0 bg-sky-100 p-10">
	<div class="flex flex-col gap-6 lg:flex-row">
        <Listing projects={projects} />
        <NewProject />
	</div>
</div>
