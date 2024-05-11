<script>
	import { goto } from '$app/navigation';
	import { isLoggedIn } from '$lib/stores/auth';

	export let type;

	if (type !== 'User' && type !== 'Dealership') {
		goto('/signup');
	}

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let userExistsError = '';
	let invalidPassError = '';
	let passwordConfirmError = '';

	async function handleSubmit(event) {
		event.preventDefault();

		passwordConfirmError = '';
		userExistsError = '';

		if (password !== confirmPassword) {
			passwordConfirmError = 'Passwords do not match';
			return;
		}

		if (password.length < 8 || password.length > 20) {
			invalidPassError = 'Password must be between 8 and 20 characters';
			return;
		}

		let hasCapital = false;
		for (let i = 0; i < password.length; i++) {
			if (/[A-Z]/.test(password[i])) {
				hasCapital = true;
				break;
			}
		}

		if (!hasCapital) {
			invalidPassError = 'Password must contain at least one capital letter';
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/auth/signup_${type.toLowerCase()}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, password })
			});

			if (response.ok) {
				isDealership.set(type === 'Dealership');
				const { token } = await response.json();
				localStorage.setItem('token', token);
				isLoggedIn.set(true);
				goto('/');
			} else if (response.status === 400) {
				userExistsError = 'User already exists';
			} else {
				goto(`/signup`);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<form class="w-full mt-8 space-y-6" on:submit={handleSubmit}>
	<div class="rounded-md shadow-sm -space-y-px">
		<div>
			<label for="name" class="sr-only">{type} Name</label>
			<input
				id="name"
				name="name"
				type="text"
				autocomplete="name"
				required
				class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				placeholder={`${type} Name`}
				bind:value={name}
			/>
		</div>

		<div>
			<label for="email" class="sr-only">{type} Email</label>
			<input
				id="email"
				name="email"
				type="text"
				autocomplete="email"
				required
				class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				placeholder={`${type} Email`}
				bind:value={email}
			/>
		</div>
		<div>
			<label for="password" class="sr-only">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				autocomplete="new-password"
				required
				class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				placeholder="Password"
				bind:value={password}
			/>
		</div>
		<div>
			<label for="confirmPassword" class="sr-only">Confirm Password</label>
			<input
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				autocomplete="new-password"
				required
				class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				placeholder="Confirm Password"
				bind:value={confirmPassword}
			/>
		</div>
	</div>

	{#if userExistsError}
		<p class="text-red-500">{userExistsError}</p>
	{/if}
	{#if invalidPassError}
		<p class="text-red-500">{invalidPassError}</p>
	{/if}
	{#if passwordConfirmError}
		<p class="text-red-500">{passwordConfirmError}</p>
	{/if}

	<div>
		<button
			type="submit"
			class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Sign up
		</button>
	</div>
</form>
