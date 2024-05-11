<script>
    import { goto } from '$app/navigation';
    import { isLoggedIn } from '$lib/stores/auth';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';

    export let type;

    if (type !== 'User' && type !== 'Dealership') {
        goto('/login');
    }

    let email = '';
    let password = '';

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${PUBLIC_BACKEND_URL}/auth/login_${type.toLowerCase()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('token', token);
                isLoggedIn.set(true);
                goto('/');
            } else {
                goto('/login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
</script>

<form class="w-full mt-8 space-y-6" on:submit={handleSubmit}>
    <div class="rounded-md shadow-sm -space-y-px">
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
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                bind:value={password}
            />
        </div>
    </div>

    <div>
        <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Sign in
        </button>
    </div>
</form>
