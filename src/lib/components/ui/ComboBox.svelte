<script lang="ts">
	import Select from 'svelte-select';
	export let items: { value: string; name: any }[] = [];
	export let selectedItem: { value: string; name: any } = { value: '', name: '' };
	export let placeholder: string = '';
	export let onChange: (value: string) => void;

	const handleChange = (selected: any) => {
		onChange(selectedItem.value);
	};
</script>

<div class="select-container">
	<Select {items} bind:value={selectedItem} {placeholder} on:change={handleChange} />
</div>

<style>
	.select-container {
		display: inline-block;
		min-width: 300px;
		vertical-align: middle;
	}
	ul {
		padding: 0;
	}
	li:nth-child(odd) {
		background-color: theme('colors.background');
	}
	.locale-code {
		font-size: 0.875rem;
		color: #6b7280; /* Tailwind CSS gray-500 */
		margin-left: 0.5rem;
	}
</style>
