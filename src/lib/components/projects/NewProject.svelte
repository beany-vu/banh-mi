<script lang="ts">
	async function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const response = await fetch('/api/projects', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// Handle successful response
			console.log('Project created successfully');
		} else {
			// Handle error response
			console.error('Failed to create project');
		}
	}
</script>

<aside class="w-full rounded bg-white p-4 shadow-md lg:w-1/4">
	<h2 class="text-xl font-bold">Create a new project</h2>
	<div>
		<form on:submit={handleSubmit}>
			<div class="mb-4">
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input
					type="text"
					name="name"
					id="name"
					class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					required
				/>
			</div>
			<div class="mb-4">
				<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
				<textarea
					name="description"
					id="description"
					class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					required
				></textarea>
			</div>
			<div class="mb-4">
				<button type="submit" class="rounded bg-indigo-500 p-2 text-white">Create</button>
			</div>
		</form>
	</div>
</aside>
