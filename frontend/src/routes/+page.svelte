<script>
	export let data;
	const username = data.username;
</script>

<h1 class="text-3xl font-bold underline">Welcome {username}!</h1>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
