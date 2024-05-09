import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	const response = await fetch('http://localhost:3000/user', {
		method: 'GET',
		credentials: 'include'
	});

	if (!response.ok) {
		redirect(307, '/login');
	}

	return await response.json();
}
