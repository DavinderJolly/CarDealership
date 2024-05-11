export async function load({ fetch }) {
	const vehicles = [];

	for (let i = 0; i < 10; i++) {
		vehicles.push({
			image:
				'https://imgd.aeplcdn.com/664x374/n/cw/ec/110233/camry-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80',
			make: 'Toyota',
			model: 'Camry',
			year: 2020,
			price: 30000
		});
	}

	return {
		vehicles
	};
}
