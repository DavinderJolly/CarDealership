import { isLoggedIn } from '../stores/auth';

export function isAuthenticated() {
	if (typeof localStorage !== 'undefined') {
		const token = localStorage.getItem('token');
		return !!token; // Return true if token exists, false otherwise
	} else {
		return null; // localStorage is not available on server (the data will get hydrated on client side)
	}
}

export function logOut() {
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem('token');
		isLoggedIn.set(false);
		return true;
	}
	return false;
}

export function getUser() {
	if (typeof localStorage !== 'undefined') {
		const token = localStorage.getItem('token');

		let user;

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
				user = data;
			});

		return user;
	}
}
