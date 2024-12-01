<script lang="ts">
	export let items: { value: string; name: any }[] = [];
	export let selectedItem: string = '';
	export let placeholder: string = '';
	export let onChange: (value: string) => void;

	$: inputVal = items.find((item) => item.value === selectedItem)?.name || '';

	const onItemClicked = (item: { value: string; name: any }) => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
		selectedItem = item.value;
		inputVal = '';
		onChange(item.value);
	};
	const onDeleteInput = () => {
		inputVal = '';
		selectedItem = '';
		onChange('');
	};

	$: filteredItems = items.filter(function (item: { value: string; name: any }) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = item.name;
		const textValue = tempDiv.textContent || tempDiv.innerText || '';
		return textValue.toLowerCase().includes(inputVal.toLowerCase());
	});
</script>

<div class="dropdown">
	<input
		class="input input-bordered"
		{placeholder}
		bind:value={inputVal}
		on:change={() => onDeleteInput()}
	/>
	<ul
		class="menu dropdown-content z-[1] mt-1 max-h-80 w-full flex-nowrap overflow-auto rounded-box bg-base-100 p-2 shadow"
	>
		{#each filteredItems as item}
			<li>
				<button type="button" class="locale-code" on:click={() => onItemClicked(item)}
					>{@html item.name}</button
				>
			</li>
		{/each}
	</ul>
</div>

<style>
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
