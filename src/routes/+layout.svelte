<script lang="ts">
	import { i18n } from '$lib/i18n.js';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { auth } from '$lib/lucia.js';

	let { data, children } = $props<{ user: any, children: any }>();
	let user = data.user;

	onMount(async () => {
		const session = await auth.getSession();
		if (session) {
			user = session.user;
		}
	});
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>

{#if user}
	<p>Welcome, {user.email}!</p>
{:else}
	<p>Please log in.</p>
{/if}

