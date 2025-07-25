// src/hooks.server.ts

import type { Handle } from '@sveltejs/kit';
import { connect } from '$lib/server/db/mongo';

export const handle: Handle = async ({ event, resolve }) => {
	// Connexion à MongoDB au démarrage
	try {
		await connect();
	} catch (error) {
		console.error('❌ Erreur connexion MongoDB:', error);
	}

	// CORS pour les routes API
	if (event.url.pathname.startsWith('/api')) {
		if (event.request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type, Authorization',
					'Access-Control-Max-Age': '86400'
				}
			});
		}
	}

	// Résoudre la requête
	const response = await resolve(event);

	// Ajouter les headers CORS aux réponses API
	if (event.url.pathname.startsWith('/api')) {
		response.headers.set('Access-Control-Allow-Origin', '*');
		response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	}

	return response;
};
