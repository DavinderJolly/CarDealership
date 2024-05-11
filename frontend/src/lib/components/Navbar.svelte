<script>
	import { isLoggedIn, userName } from '$lib/stores/auth';
	import { logOut } from '$lib/utils/auth';
	import { goto } from '$app/navigation';
</script>

<nav class="flex flex-row items-center justify-between bg-violet-600 text-gray-200">
	<a href="/">
		<h1 class="text-3xl font-bold p-4">Car Dealership</h1>
	</a>

	<ul class="flex flex-row gap-4 mr-4 text-lg">
		{#if $isLoggedIn}
			<li>
				<button class="hover:text-white">{$userName}</button>
			</li>
			<li>
				<button
					class="hover:text-white"
					on:click={() => {
						const loggedOut = logOut();
						if (loggedOut) {
							goto('/login');
						}
					}}>Logout</button
				>
			</li>
		{:else}
			<li>
				<a href="/login" class="hover:text-white">Login</a>
			</li>
			<li>
				<a href="/signup" class="hover:text-white">Sign Up</a>
			</li>
		{/if}
	</ul>
</nav>
