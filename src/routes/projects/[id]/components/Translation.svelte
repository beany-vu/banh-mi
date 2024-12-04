<script lang="ts">
	import { selectedLocale } from '$lib/stores/project.js';
	export let translations: any[] = [];
	export let defaultLocale = 'en';
	export let projectId: string;
	let editedContent: { [key: string]: any } = {};

	$: currentLocale = $selectedLocale ?? defaultLocale;
	$: selectedTranslation = translations?.find((t) => t.locale === currentLocale);
	$: content = selectedTranslation?.content;

	const editContent = (path: string, value: string): void => {
		const keys = path.split('.');
		let obj = editedContent;
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			if (i === keys.length - 1) {
				obj[key] = value;
			} else {
				if (!obj[key]) {
					obj[key] = {};
				}
				obj = obj[key];
			}
		}
	};

	// path is something like key.property1.property1-1
	let debounceTimeout: NodeJS.Timeout;

	const updateEditedContent = (path: string, value: string): void => {
		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}
		debounceTimeout = setTimeout(() => {
			console.log({ path, value });
			editContent(path, value);
			editedContent = { ...editedContent }; // Trigger reactivity
		}, 300); // Adjust the debounce delay as needed
	};

	async function saveTranslation() {
		try {
			const response = await fetch(`/api/translations`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: selectedTranslation.id,
					projectId,
					locale: currentLocale,
					payload: editedContent
				})
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = await response.json();
			if (result.success) {
				console.log('Translation saved successfully:', result);
				alert('Translation saved successfully');
			} else {
				alert('Failed to save translation');
			}
		} catch (error) {
			console.error('Error saving translation:', error);
			alert('Server error, please try again later');
		}
	}
</script>

{#if selectedTranslation}
	<div class="block-translation container mx-auto justify-center">
		<div class="block-translation-actions flex justify-end">
			<button
				class="btn btn-primary"
				on:click={() => {
					console.log('Save', editedContent);
					saveTranslation();
				}}>Save</button
			>
		</div>
		<div class="item-header mb-4 flex gap-3">
			<div class="w-full max-w-xs text-center">Key</div>
			<div class="w-full max-w-xs text-center">Default Message</div>
			<div class="w-full max-w-xs text-center">Message</div>
			<div class="w-full max-w-xs"></div>
		</div>

		<!-- foreach -->
		{#each content as { key, defaultMessage, message, isDisabled = false }}
			<div class="item mb-4 flex items-center gap-3">
				<textarea
					class="input input-bordered input-primary w-full max-w-xs"
					value={key}
					name={`${currentLocale}.${key}.${key}`}
					disabled
				></textarea>

				<textarea
					class="input input-bordered input-primary w-full max-w-xs"
					value={defaultMessage}
					name={`${currentLocale}.${key}.${defaultMessage}`}
					disabled
				></textarea>

				<textarea
					class="input input-bordered input-primary w-full max-w-xs"
					value={message}
					name={`${currentLocale}.${key}.${message}`}
					on:input={(e) => {
						if (e.target) {
							updateEditedContent(
								`${currentLocale}.${key}`,
								(e.target as HTMLTextAreaElement).value
							);
						}
					}}
				></textarea>
				<div>
					<div class="mx-1 my-1 flex items-center">
						<input
							type="checkbox"
							class="toggle toggle-primary"
							checked={isDisabled || isDisabled === false}
							on:change={() => updateEditedContent(`${key}.isDisabled`, (!isDisabled).toString())}
						/>&nbsp; Is Excluded
					</div>
					<div class="mx-1 my-1 flex items-center">
						<input
							type="checkbox"
							class="toggle toggle-primary"
							checked={isDisabled || isDisabled === false}
							on:change={() => updateEditedContent(`${key}.isDisabled`, (!isDisabled).toString())}
						/>&nbsp; Need review
					</div>
				</div>
			</div>
		{/each}
		<!-- endforeach -->
	</div>
{/if}

<style>
	textarea,
	input {
		padding: 0.7rem 1rem;
	}
	.block-translation {
		border: 1px solid theme('colors.border');
		border-radius: 5px;
		overflow: hidden;
		margin: 50px auto;
	}
	.block-translation-actions {
		padding: 1rem;
	}
	.item {
		padding: 1rem;
		margin: 0;
	}
	.item:nth-child(even) {
		background-color: theme('colors.background');
	}

	.item-header {
		margin: 0;
		padding: 1rem;
		background-color: theme('colors.background');
		font-weight: bold;
	}
</style>
