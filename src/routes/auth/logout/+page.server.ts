import { redirect } from '@sveltejs/kit';
import type { Actions, ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies }) => {
	// Supprimer les cookies de session
	cookies.delete('session', { path: '/' });
	cookies.delete('user_data', { path: '/' });
	
	// Rediriger vers la page de login
	throw redirect(302, '/auth/login');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		// Supprimer les cookies de session
		cookies.delete('session', { path: '/' });
		cookies.delete('user_data', { path: '/' });
		
		// Rediriger vers la page de login
		throw redirect(302, '/auth/login');
	}
};
