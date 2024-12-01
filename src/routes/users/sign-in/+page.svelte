<script>
	import { enhance } from '$app/forms';
	// get error message from the page store
	import { page } from '$app/stores';
	// get the data from the page store
	let { status, form } = $page;

</script>

<div class="container mx-auto max-w-xl">
	<h1>Login</h1>
	<form class="w3-container" method="post" use:enhance>
		<label class="input input-bordered flex items-center gap-2">
			Email <input class="grow" type="email" name="email" required />
		</label>
		<br />
		<label class="input input-bordered flex items-center gap-2">
			Password <input class="grow" type="password" name="password" required />
		</label>
		<br />
		<button class="btn btn-primary">Login</button>
	</form>
	{#if (status === 400) && form.message}
		<p>{form.message}</p>
	{/if}
</div>
