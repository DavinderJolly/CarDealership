import { writable } from 'svelte/store';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

const isLocalStorageAvailable = typeof localStorage !== 'undefined';

let initialLoggedInState = false;
if (isLocalStorageAvailable) {
	const token = localStorage.getItem('token');
	if (token) {
		initialLoggedInState = true;
	}
}

export const isLoggedIn = writable(initialLoggedInState);

export const userName = writable('');

isLoggedIn.subscribe((value) => {
	if (value) {
		if (isLocalStorageAvailable) {
			const token = localStorage.getItem('token');
			fetch(`${PUBLIC_BACKEND_URL}/user`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					userName.set(data.user_name);
				});
		}
	}
});
