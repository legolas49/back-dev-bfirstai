<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let user: any = null;
	let isLoading = true;

	onMount(() => {
		// Simulation de récupération des données utilisateur
		// TODO: Intégrer avec le système de session MongoDB de Dash-Preprod
		if (browser) {
			// Pour l'instant, simulation du user connecté
			user = {
				name: 'Administrateur DEV',
				email: 'admin@bfirst-ai.com',
				role: 'admin',
				environment: 'development'
			};
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Dashboard | BFirst AI - DEV</title>
</svelte:head>

{#if isLoading}
	<div class="min-h-screen flex items-center justify-center">
		<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50">
		<!-- Bannière de migration -->
		<div class="bg-purple-600 text-white text-center py-3 px-4 shadow-sm">
			<div class="flex items-center justify-center space-x-2">
				<span class="text-sm font-medium">🔄 Migration Dash-Preprod Active - Interface Dashboard v2.0</span>
			</div>
		</div>

		<!-- Header -->
		<header class="bg-white shadow-sm border-b border-gray-200">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center h-16">
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<span class="text-2xl">🚀</span>
						</div>
						<div class="ml-4">
							<h1 class="text-xl font-semibold text-gray-900">BFirst AI Dashboard</h1>
							<p class="text-sm text-gray-500">Environnement de Développement</p>
						</div>
					</div>
					<div class="flex items-center space-x-4">
						<span class="text-sm text-gray-700">Bienvenue, {user?.name}</span>
						<a href="/auth/logout" class="text-sm text-indigo-600 hover:text-indigo-800">Déconnexion</a>
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				<!-- Status Migration -->
				<div class="mb-8">
					<div class="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
						<h2 class="text-2xl font-bold mb-2">🔄 Migration Dash-Preprod en cours</h2>
						<p class="opacity-90">Interface dashboard avec authentification, MongoDB et composants UI avancés</p>
					</div>
				</div>

				<!-- Stats Cards -->
				<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="p-5">
							<div class="flex items-center">
								<div class="flex-shrink-0">
									<span class="text-2xl">✅</span>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">Status Migration</dt>
										<dd class="text-lg font-medium text-gray-900">En cours</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="p-5">
							<div class="flex items-center">
								<div class="flex-shrink-0">
									<span class="text-2xl">📦</span>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">Dépendances</dt>
										<dd class="text-lg font-medium text-gray-900">100+ installées</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="p-5">
							<div class="flex items-center">
								<div class="flex-shrink-0">
									<span class="text-2xl">🔐</span>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">Authentification</dt>
										<dd class="text-lg font-medium text-gray-900">Active (DEV)</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>

					<div class="bg-white overflow-hidden shadow rounded-lg">
						<div class="p-5">
							<div class="flex items-center">
								<div class="flex-shrink-0">
									<span class="text-2xl">🔄</span>
								</div>
								<div class="ml-5 w-0 flex-1">
									<dl>
										<dt class="text-sm font-medium text-gray-500 truncate">GitOps</dt>
										<dd class="text-lg font-medium text-gray-900">Actif</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Actions rapides -->
				<div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
					<!-- Migration Progress -->
					<div class="bg-white shadow rounded-lg">
						<div class="px-6 py-4 border-b border-gray-200">
							<h3 class="text-lg font-medium text-gray-900">🔄 Progression Migration</h3>
						</div>
						<div class="p-6">
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-600">✅ Package.json + dépendances</span>
									<span class="text-green-600 font-semibold">Terminé</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-600">✅ CSS + Styling</span>
									<span class="text-green-600 font-semibold">Terminé</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-600">✅ MongoDB Connection</span>
									<span class="text-green-600 font-semibold">Terminé</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-600">🔄 Authentification</span>
									<span class="text-yellow-600 font-semibold">En cours</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-600">⏳ Interface Dashboard</span>
									<span class="text-gray-400 font-semibold">En attente</span>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-sm text-gray-600">⏳ Composants UI</span>
									<span class="text-gray-400 font-semibold">En attente</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Navigation rapide -->
					<div class="bg-white shadow rounded-lg">
						<div class="px-6 py-4 border-b border-gray-200">
							<h3 class="text-lg font-medium text-gray-900">🎛️ Navigation Rapide</h3>
						</div>
						<div class="p-6">
							<div class="grid grid-cols-2 gap-4">
								<a href="/dashboard/users" class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
									<span class="text-2xl mr-3">👥</span>
									<div>
										<div class="font-medium">Utilisateurs</div>
										<div class="text-sm text-gray-500">Gestion</div>
									</div>
								</a>
								<a href="/dashboard/analytics" class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
									<span class="text-2xl mr-3">📊</span>
									<div>
										<div class="font-medium">Analytics</div>
										<div class="text-sm text-gray-500">Statistiques</div>
									</div>
								</a>
								<a href="/dashboard/settings" class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
									<span class="text-2xl mr-3">⚙️</span>
									<div>
										<div class="font-medium">Paramètres</div>
										<div class="text-sm text-gray-500">Configuration</div>
									</div>
								</a>
								<a href="/api/health" target="_blank" class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
									<span class="text-2xl mr-3">🏥</span>
									<div>
										<div class="font-medium">Health Check</div>
										<div class="text-sm text-gray-500">API Status</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Informations environnement -->
				<div class="bg-white shadow rounded-lg">
					<div class="px-6 py-4 border-b border-gray-200">
						<h3 class="text-lg font-medium text-gray-900">🛠️ Informations Environnement</h3>
					</div>
					<div class="p-6">
						<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div>
								<h4 class="font-medium text-gray-900 mb-2">Configuration</h4>
								<ul class="text-sm text-gray-600 space-y-1">
									<li>• Environnement: Développement</li>
									<li>• Registry: GitHub Container Registry</li>
									<li>• Namespace: backoffice-dev</li>
									<li>• SSL/TLS: Actif (cert-manager)</li>
								</ul>
							</div>
							<div>
								<h4 class="font-medium text-gray-900 mb-2">Migration</h4>
								<ul class="text-sm text-gray-600 space-y-1">
									<li>• Source: Dash-Preprod</li>
									<li>• Cible: back-dev-bfirstai</li>
									<li>• Authentification: bcryptjs + JWT</li>
									<li>• Base de données: MongoDB</li>
								</ul>
							</div>
							<div>
								<h4 class="font-medium text-gray-900 mb-2">Utilisateur</h4>
								<ul class="text-sm text-gray-600 space-y-1">
									<li>• Email: {user?.email}</li>
									<li>• Rôle: {user?.role}</li>
									<li>• Environnement: {user?.environment}</li>
									<li>• Session: Active</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
{/if}
