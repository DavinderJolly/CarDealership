<script>
	import SignupForm from '$lib/components/SignupForm.svelte';

	let type = 'user';
</script>

<div
	class="min-h-full flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
>
	<div class="w-1/2 md:w-96 mb-4 p-5 border rounded-xl border-violet-600">
		<ul
			class="flex justify-around -mb-px text-sm font-medium text-center"
			id="default-styled-tab"
			data-tabs-toggle="#default-styled-tab-content"
			data-tabs-active-classes="text-purple-600 hover:text-purple-600 border-purple-600"
			data-tabs-inactive-classes="text-gray-500 hover:text-gray-600 border-gray-100 hover:border-gray-300a"
			role="tablist"
		>
			<li class="me-2" role="presentation">
				<button
					class={`inline-block p-4 border-b-2 rounded-t-lg
						${type === 'user' ? 'text-violet-600 border-violet-600 hover:border-violet-700 hover:text-violet-700' : 'hover:text-gray-600 hover:border-gray-300'}`}
					id="dashboard-styled-tab"
					data-tabs-target="#styled-user"
					type="button"
					role="tab"
					aria-controls="user"
					aria-selected={type === 'user'}
					on:click={() => (type = 'user')}
				>
					User
				</button>
			</li>
			<li role="presentation">
				<button
					class={`inline-block p-4 border-b-2 rounded-t-l  ${type === 'dealership' ? 'text-violet-600 border-violet-600 hover:border-violet-700 hover:text-violet-700' : 'hover:text-gray-600 hover:border-gray-300'}`}
					id="contacts-styled-tab"
					data-tabs-target="#styled-dealership"
					type="button"
					role="tab"
					aria-controls="dealership"
					aria-selected={type === 'dealership'}
					on:click={() => (type = 'dealership')}
				>
					Dealership
				</button>
			</li>
		</ul>

		<hr />
		{#if type === 'user'}
			<SignupForm type="User" />
		{:else if type === 'dealership'}
			<SignupForm type="Dealership" />
		{/if}
	</div>
</div>
