import { writable } from 'svelte/store';

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
			fetch('http://localhost:3000/user', {
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
