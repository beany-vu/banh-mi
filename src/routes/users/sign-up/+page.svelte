<script>
	import { enhance } from '$app/forms';
</script>

<form class="w-full max-w-sm" method="post" use:enhance>
	<div class="mb-6 md:flex md:items-center">
		<div class="md:w-1/3">
			<label
				class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
				for="inline-full-name"
			>
				Full Name
			</label>
		</div>
		<div class="md:w-2/3">
			<input
				class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
				id="inline-full-name"
				name="name"
				type="text"
				value=""
			/>
		</div>
	</div>

	<div class="mb-6 md:flex md:items-center">
		<div class="md:w-1/3">
			<label
				class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
				for="inline-email"
			>
				Email
			</label>
		</div>
		<div class="md:w-2/3">
			<input
				class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
				id="inline-email"
				type="email"
				name="email"
				value=""
			/>
		</div>
	</div>

	<div class="mb-6 md:flex md:items-center">
		<div class="md:w-1/3">
			<label
				class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
				for="inline-password"
			>
				Password
			</label>
		</div>
		<div class="md:w-2/3">
			<input
				class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
				id="inline-password"
				type="password"
				name="password"
			/>
		</div>
	</div>

	<div class="md:flex md:items-center">
		<div class="md:w-1/3"></div>
		<div class="md:w-2/3">
			<button
				class="focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
			>
				Sign Up
			</button>
		</div>
	</div>
</form>
