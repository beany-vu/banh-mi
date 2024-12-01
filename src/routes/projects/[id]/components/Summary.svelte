<script lang="ts">
	export let name = '';
	export let description = '';

	export let createdAt = '';
	export let lastUpdate = '';
</script>

<div class="min-h-screen/3 hero bg-base-200">
	<div class="container mx-auto">
		<div class="block-text">
			<h1 class="text-5xl font-bold">{name}</h1>
			<p class="py-6">
				{description}
			</p>

			<div>
				Created at: {new Date(createdAt).toLocaleString()}
			</div>
			<div>
				Last updated: {new Date(lastUpdate).toLocaleString()}
			</div>
		</div>
	</div>
</div>

<style>
	.block-text {
		padding: 50px 0;
	}
	.block-action {
		padding: 10px 0;
		background: theme('colors.background');
	}
	.hero-content {
		justify-content: flex-start;
	}
	.locale {
		margin-inline-end: 5px;
	}
	.current {
		font-weight: bold;
	}
</style>
