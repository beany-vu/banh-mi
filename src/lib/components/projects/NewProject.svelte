<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<aside class="w-full rounded bg-white p-4 shadow-md lg:w-1/4">
	<h2 class="text-xl font-bold">Create a new project</h2>
	<div>
		<form action="/projects" method="post" use:enhance>
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
