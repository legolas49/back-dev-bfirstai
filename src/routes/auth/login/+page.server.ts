import { redirect, fail } from '@sveltejs/kit';
import type { Actions, ServerLoad } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export const load: ServerLoad = async ({ locals, url }) => {
	// Si l'utilisateur est déjà connecté, rediriger vers le dashboard
	if (locals.session?.userId) {
		throw redirect(302, '/dashboard');
	}

	// Récupérer le paramètre de redirection depuis l'URL
	const redirectTo = url.searchParams.get('redirect') || '/dashboard';

	return {
		redirect: null // Pas de redirection immédiate, on reste sur la page de login
	};
};

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		// Validation basique
		if (!email || !password) {
			return fail(400, {
				error: 'Email et mot de passe requis',
				data: { email }
			});
		}

		// Authentification simplifiée pour le développement
		// TODO: Remplacer par l'authentification MongoDB complète de Dash-Preprod
		const devCredentials = {
			'admin@bfirst-ai.com': 'dev123',
			'dev@bfirst-ai.com': 'dev123',
			'test@bfirst-ai.com': 'test123'
		};

		const isValidCredentials = devCredentials[email as keyof typeof devCredentials] === password;

		if (!isValidCredentials) {
			return fail(400, {
				error: 'Email ou mot de passe incorrect',
				data: { email }
			});
		}

		// Créer une session simple
		// TODO: Utiliser le système de session JWT complet de Dash-Preprod
		const sessionId = `dev_session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
		
		// Définir le cookie de session
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			secure: false, // false pour le développement
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 jours
		});

		// Stocker les données utilisateur simplifiées
		// TODO: Intégrer avec MongoDB comme dans Dash-Preprod
		cookies.set('user_data', JSON.stringify({
			id: `dev_user_${Date.now()}`,
			email: email,
			name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
			role: 'admin',
			permissions: ['read', 'write', 'admin'],
			environment: 'development'
		}), {
			path: '/',
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7
		});

		// Redirection après login réussi
		const redirectTo = url.searchParams.get('redirect') || '/dashboard';
		throw redirect(302, redirectTo);
	}
};
