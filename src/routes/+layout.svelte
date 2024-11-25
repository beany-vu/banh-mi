<script lang="ts">
	import { i18n } from '$lib/i18n.js';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { auth } from '$lib/lucia.js';

	let { data, children } = $props<{ user: any; children: any }>();
	let user = data.user;

	onMount(async () => {
		const session = await auth.getSession();
		if (session) {
			user = session.user;
		}
	});
</script>

<div class="layout">
	<nav class="flex gap-10 bg-fuchsia-400 px-10 py-5">
		<a href="/">Home</a>
		{#if user}
			<div class="flex w-full justify-between">
				<a href="/projects">Projects</a>
				<p>Welcome, {user.email}!</p>
			</div>
		{:else}
			<a href="/users/sign-up">Sign Up</a>
			<a href="/users/sign-in">Sign In</a>
		{/if}
	</nav>
	<div class="main-content">
		<ParaglideJS {i18n}>
			{@render children()}
		</ParaglideJS>
	</div>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		gap: 50px;
	}
	nav {
		/* Add your styles here */
	}
	.main-content {
		flex-grow: 1;
	}
</style>
