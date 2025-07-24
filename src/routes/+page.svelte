<script lang="ts">
	import { onMount } from 'svelte';

	let status = 'loading';
	let dbStatus = 'checking';
	let version = '1.0.0-dev';
	let timestamp = '';

	onMount(async () => {
		try {
			const response = await fetch('/api/health');
			const data = await response.json();

			status = data.status;
			dbStatus = data.services?.database?.status || 'error';
			version = data.version || '1.0.0-dev';
			timestamp = new Date(data.timestamp).toLocaleString('fr-FR');
		} catch (error) {
			status = 'error';
			dbStatus = 'error';
		}
	});
</script>

<svelte:head>
	<title>BFirst AI - Backoffice DEV</title>
	<meta
		name="description"
		content="Interface d'administration BFirst AI - Environnement de développement"
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<div class="container mx-auto px-4 py-8">
		<!-- Hero Section -->
		<div class="text-center mb-12">
			<div class="mb-6">
				<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
					<span class="text-3xl">🚀</span>
				</div>
				<h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
					BFirst AI Backoffice
				</h1>
				<p class="text-xl text-gray-600 mb-4">Environnement de Développement</p>
				<div class="flex justify-center gap-4">
					<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
						✨ Version {version}
					</span>
					<span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
						🕒 {timestamp}
					</span>
				</div>
			</div>
		</div>

		<!-- Status Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			<!-- Application Status -->
			<div class="card">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold">Application</h3>
					<div
						class="status-indicator {status === 'ok'
							? 'status-ok'
							: status === 'error'
								? 'status-error'
								: 'status-loading'}"
					></div>
				</div>
				<p class="text-secondary">
					{#if status === 'ok'}
						✅ Application fonctionnelle
					{:else if status === 'error'}
						❌ Erreur application
					{:else}
						⏳ Vérification en cours...
					{/if}
				</p>
			</div>

			<!-- Database Status -->
			<div class="card">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold">Base de données</h3>
					<div
						class="status-indicator {dbStatus === 'ok'
							? 'status-ok'
							: dbStatus === 'error'
								? 'status-error'
								: dbStatus === 'not_configured'
									? 'status-warning'
									: dbStatus === 'not_implemented'
										? 'status-info'
										: 'status-loading'}"
					></div>
				</div>
				<p class="text-secondary">
					{#if dbStatus === 'ok'}
						✅ MongoDB connectée
					{:else if dbStatus === 'error'}
						❌ Connexion MongoDB échouée
					{:else if dbStatus === 'not_configured'}
						⚙️ MongoDB non configurée (MONGODB_URI manquant)
					{:else if dbStatus === 'not_implemented'}
						🔧 Test MongoDB non implémenté
					{:else}
						⏳ Vérification connexion...
					{/if}
				</p>
			</div>

			<!-- Environment Info -->
			<div class="card">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-semibold">Environnement</h3>
					<div class="status-indicator status-dev"></div>
				</div>
				<p class="text-secondary">
					🛠️ Développement<br />
					<small class="text-xs">Namespace: backoffice-dev</small>
				</p>
			</div>
		</div>

		<!-- Quick Actions -->
		<div class="card mb-8">
			<h2 class="text-2xl font-bold mb-6">🎛️ Actions Rapides</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<a href="/dashboard" class="btn btn-primary"> 📊 Dashboard </a>
				<a href="/users" class="btn btn-secondary"> 👥 Utilisateurs </a>
				<a href="/settings" class="btn btn-secondary"> ⚙️ Paramètres </a>
				<a href="/api/docs" class="btn btn-secondary" target="_blank"> 📖 API Docs </a>
			</div>
		</div>

		<!-- Development Info -->
		<div class="card">
			<h2 class="text-2xl font-bold mb-6">🛠️ Informations de Développement</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h3 class="text-lg font-semibold mb-3">📋 Configuration</h3>
					<ul class="space-y-2 text-sm">
						<li><strong>Registry:</strong> GitHub Container Registry (GHCR)</li>
						<li><strong>Image:</strong> ghcr.io/legolas49/back-dev-bfirstai</li>
						<li><strong>Namespace:</strong> backoffice-dev</li>
						<li><strong>URL:</strong> backoffice-dev.bfirst-ai.com</li>
					</ul>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-3">🔗 Liens Utiles</h3>
					<ul class="space-y-2 text-sm">
						<li>
							<a
								href="https://github.com/legolas49/back-dev-bfirstai"
								target="_blank"
								class="text-primary hover:underline">📦 Repository GitHub</a
							>
						</li>
						<li>
							<a
								href="https://github.com/legolas49/back-dev-bfirstai/actions"
								target="_blank"
								class="text-primary hover:underline">🔄 GitHub Actions</a
							>
						</li>
						<li>
							<a
								href="https://github.com/legolas49/back-dev-bfirstai/packages"
								target="_blank"
								class="text-primary hover:underline">📦 GHCR Packages</a
							>
						</li>
						<li>
							<a href="/api/health" target="_blank" class="text-primary hover:underline"
								>🏥 Health Check</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="text-center mt-8 pt-8 border-t border-gray-200">
			<p class="text-secondary">
				BFirst AI - Backoffice DEV | Powered by SvelteKit + MongoDB + Kubernetes
			</p>
		</footer>
	</main>
</div>

<style>
	.grid {
		display: grid;
		gap: 1.5rem;
	}

	.grid-cols-1 {
		grid-template-columns: repeat(1, 1fr);
	}

	@media (min-width: 768px) {
		.md\:grid-cols-2 {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.lg\:grid-cols-3 {
			grid-template-columns: repeat(3, 1fr);
		}

		.lg\:grid-cols-4 {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.status-indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		animation: pulse 2s infinite;
	}

	.status-ok {
		background-color: #10b981;
	}

	.status-error {
		background-color: #ef4444;
	}

	.status-loading {
		background-color: #f59e0b;
	}

	.status-warning {
		background-color: #f97316;
	}

	.status-info {
		background-color: #3b82f6;
	}

	.status-dev {
		background-color: #3b82f6;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.space-y-2 > * + * {
		margin-top: 0.5rem;
	}

	.text-4xl {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}

	.text-2xl {
		font-size: 1.5rem;
		line-height: 2rem;
	}

	.text-xl {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}

	.text-lg {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	.text-sm {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.text-xs {
		font-size: 0.75rem;
		line-height: 1rem;
	}

	.font-bold {
		font-weight: 700;
	}

	.font-semibold {
		font-weight: 600;
	}

	.font-medium {
		font-weight: 500;
	}

	.text-secondary {
		color: var(--text-secondary);
	}

	.text-primary {
		color: var(--primary-color);
	}

	.border-t {
		border-top-width: 1px;
	}

	.border-gray-200 {
		border-color: #e5e7eb;
	}

	.bg-blue-100 {
		background-color: #dbeafe;
	}

	.text-blue-800 {
		color: #1e40af;
	}

	.rounded-full {
		border-radius: 9999px;
	}

	.inline-flex {
		display: inline-flex;
	}

	.hover\:underline:hover {
		text-decoration: underline;
	}
</style>
