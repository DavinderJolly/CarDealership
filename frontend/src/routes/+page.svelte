<script>
	export let data;
</script>

<div class="flex flex-wrap justify-center">
	{#each data.vehicles as vehicle}
		<div class="max-w-sm w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
			<div class="bg-white rounded-lg shadow-lg overflow-hidden">
				<div class="px-6 py-4">
					<img src={vehicle.image} alt={vehicle.make} />
					<div class="font-bold text-xl mb-2">{vehicle.make} {vehicle.model}</div>
					<p class="text-gray-700 text-base">
						Year: {vehicle.year}<br />
						Price: ${vehicle.price}
					</p>
				</div>
			</div>
		</div>
	{/each}
</div>
