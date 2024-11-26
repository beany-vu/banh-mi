<script lang="ts">
	export let projects: any[] = [];
	export let currentLanguage: string = 'en-GB';

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleString(currentLanguage, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
</script>

<main class="w-full rounded bg-white p-4 shadow-md lg:w-3/4">
	<h2 class="mt-10 text-xl font-bold">Available Projects</h2>
	<table class="table-auto border-spacing-2 border border-slate-500 p-4">
		<thead>
			<tr>
				<th class="border border-slate-600 p-4">Name</th>
				<th class="border border-slate-600 p-4">Description</th>
				<th class="border border-slate-600 p-4">Created At</th>
				<th class="border border-slate-600 p-4">Last Update</th>
				<th class="border border-slate-600 p-4">Author</th>
			</tr>
		</thead>
		<tbody>
			{#each projects as project}
				<tr>
					<td class="border border-slate-600 p-4">
						<a href={`/projects/${project.id}`} class="text-blue-500 hover:underline">{project.name}</a>
					</td>
					<td class="border border-slate-600 p-4">{project.description}</td>
					<td class="border border-slate-600 p-4">{formatDate(project.createdAt)}</td>
					<td class="border border-slate-600 p-4">{formatDate(project.lastUpdate)}</td>
					<td class="border border-slate-600 p-4">{project.user?.name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
