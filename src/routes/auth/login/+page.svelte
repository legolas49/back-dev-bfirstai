<!-- src/routes/auth/login/+page.svelte -->
<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";

	export let form: any;
	export let data: any;
	let isLoading = false;

	// Gérer la redirection côté client si nécessaire
	$: if (browser && data?.redirect) {
		goto(data.redirect);
	}

	// Variables pour l'affichage du mot de passe
	let showPassword = false;

	// Pour activer le loading au submit
	function onSubmit() {
		isLoading = true;
	}
</script>

<svelte:head>
	<title>Connexion | BFirst AI - DEV</title>
</svelte:head>

<div class="flex min-h-screen bg-gray-50">
	<!-- Bannière de migration - TOUJOURS VISIBLE -->
	<div class="fixed top-0 left-0 right-0 z-50 bg-purple-600 text-white text-center py-4 px-4 shadow-lg animate-pulse">
		<div class="flex items-center justify-center space-x-2">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			</svg>
			<span class="font-bold text-lg">🔄 MIGRATION DASH-PREPROD EN COURS ! 🔄</span>
		</div>
		<div class="text-sm mt-2 opacity-95 font-semibold">
			✅ Authentification + MongoDB + Composants UI ✅ [Version 2.0]
		</div>
		<div class="text-xs mt-1 opacity-90">
			Migration: Dash-Preprod → back-dev-bfirstai | Dev Environment
		</div>
	</div>

	<!-- Colonne de gauche avec image -->
	<div class="relative hidden md:flex md:w-1/2 pt-20">
		<div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
		<div class="absolute inset-0 flex flex-col justify-between p-12">
			<div>
				<h1 class="flex items-center text-4xl font-bold text-white fill-white">
					<div class="w-15 h-15 bg-white rounded-full flex items-center justify-center mr-4">
						<span class="text-3xl">🚀</span>
					</div>
					BFIRST AI
				</h1>
				<p class="mt-2 text-blue-100">
					Environnement de Développement - Migration Dash-Preprod
				</p>
			</div>
			<div class="max-w-md">
				<h2 class="mb-4 text-2xl font-semibold text-white">
					Interface de gestion unifiée
				</h2>
				<p class="mb-6 text-blue-100">
					Migration en cours depuis Dash-Preprod : authentification, MongoDB, 
					interfaces graphiques et composants avancés pour une expérience complète.
				</p>
			</div>
			<div class="flex w-full flex-col items-center justify-between rounded bg-gray-100 p-6 md:flex-row">
				<div class="mb-4 text-sm text-gray-600 md:mb-0">
					🔧 Mode développement actif<br />
					🔄 Migration Dash-Preprod
				</div>
				<a
					href="/"
					class="flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 font-medium text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
				>
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
					</svg>
					Retour accueil
				</a>
			</div>
		</div>
	</div>

	<!-- Colonne de droite avec formulaire -->
	<div class="flex w-full flex-col items-center justify-center md:w-1/2 pt-20">
		<div class="w-full max-w-md px-6 py-12">
			<div class="mb-10">
				<h2 class="text-3xl font-bold text-gray-900">🔄 Migration v2.0</h2>
				<p class="mt-2 text-gray-600">
					⚡ Authentification Dash-Preprod intégrée !<br/>
					<span class="text-purple-600 font-bold">🚀 Environnement DEV - GitOps Ready 🚀</span>
				</p>
			</div>

			<!-- Mode démonstration pour l'instant -->
			<div class="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
				<div class="flex">
					<div class="flex-shrink-0">
						<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
						</svg>
					</div>
					<div class="ml-3">
						<h3 class="text-sm font-medium text-yellow-800">Mode développement</h3>
						<div class="mt-2 text-sm text-yellow-700">
							<p>L'authentification sera active après migration complète MongoDB + variables d'environnement.</p>
						</div>
					</div>
				</div>
			</div>

			<form method="POST" class="space-y-6" use:enhance={onSubmit}>
				{#if form?.error}
					<div class="rounded-md bg-red-50 p-3 text-sm text-red-700">
						<svg class="-mt-0.5 mr-1.5 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
						</svg>
						{form.error}
					</div>
				{/if}

				<div class="space-y-4">
					<div>
						<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							value={form?.data?.email || 'admin@bfirst-ai.com'}
							required
							autocomplete="email"
							class="block w-full rounded-lg border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
							placeholder="admin@bfirst-ai.com"
							aria-invalid={form?.errors?.email ? "true" : undefined}
						/>
						{#if form?.errors?.email}
							<p class="mt-1 text-sm text-red-600">{form.errors.email}</p>
						{/if}
					</div>

					<div>
						<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Mot de passe</label>
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							value="dev123"
							required
							autocomplete="current-password"
							class="block w-full rounded-lg border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
							placeholder="••••••••"
							aria-invalid={form?.errors?.password ? "true" : undefined}
						/>
						{#if form?.errors?.password}
							<p class="mt-1 text-sm text-red-600">{form.errors.password}</p>
						{/if}
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="show-password"
							type="checkbox"
							bind:checked={showPassword}
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
						/>
						<label for="show-password" class="ml-2 block text-sm text-gray-700">
							Afficher le mot de passe
						</label>
					</div>
					<span class="text-sm text-gray-500">
						(Mode DEV)
					</span>
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-60"
						disabled={isLoading}
					>
						{#if isLoading}
							<svg class="animate-spin mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
							</svg>
							Connexion...
						{:else}
							<svg fill="none" class="mr-2 h-5 w-5" viewBox="0 0 24 24">
								<path d="M15 12L11 8M15 12L11 16M15 12H5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
								<path d="M10 21C14.9706 21 19 16.9706 19 12C19 7.02944 14.9706 3 10 3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
							</svg>
							Se connecter (DEV)
						{/if}
					</button>
				</div>
			</form>

			<!-- Instructions développement -->
			<div class="mt-8 text-center">
				<div class="text-xs text-gray-500 space-y-1">
					<p>🔧 Mode développement - Authentification simplifiée</p>
					<p>📧 Email: admin@bfirst-ai.com | 🔐 Pass: dev123</p>
					<p>🔄 Migration Dash-Preprod en cours...</p>
				</div>
			</div>
		</div>
	</div>
</div>
