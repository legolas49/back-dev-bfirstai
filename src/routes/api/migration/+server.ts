import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export const GET: RequestHandler = async () => {
	try {
		const projectRoot = process.cwd();
		
		// Vérification de l'état des dépendances
		let npmStatus = 'checking';
		let nodeModulesExists = false;
		let packageLockExists = false;
		let dashPreprodSourceExists = false;
		
		try {
			await fs.access(path.join(projectRoot, 'node_modules'));
			nodeModulesExists = true;
		} catch {}
		
		try {
			await fs.access(path.join(projectRoot, 'package-lock.json'));
			packageLockExists = true;
		} catch {}
		
		// Vérification de la source Dash-Preprod
		try {
			await fs.access('C:\\Projets\\bfirst-ai\\Dash-Preprod');
			dashPreprodSourceExists = true;
		} catch {}
		
		// Détermination du statut npm
		if (nodeModulesExists && packageLockExists) {
			npmStatus = 'installed';
		} else if (packageLockExists && !nodeModulesExists) {
			npmStatus = 'installing';
		} else {
			npmStatus = 'pending';
		}
		
		// Vérification des fichiers migratoires
		const migratedFiles = {
			'package.json': false,
			'src/app.css': false,
			'src/lib/server/db/mongo.ts': false,
			'src/hooks.server.ts': false,
			'postcss.config.cjs': false
		};
		
		for (const file of Object.keys(migratedFiles)) {
			try {
				await fs.access(path.join(projectRoot, file));
				migratedFiles[file as keyof typeof migratedFiles] = true;
			} catch {}
		}
		
		// Prochaines étapes de migration
		const nextSteps = [
			{
				id: 'npm-install',
				title: 'Installation des dépendances npm',
				status: npmStatus === 'installed' ? 'completed' : npmStatus === 'installing' ? 'in_progress' : 'pending',
				description: 'Installation des 100+ dépendances de Dash-Preprod'
			},
			{
				id: 'auth-routes',
				title: 'Migration des routes d\'authentification',
				status: 'pending',
				description: 'Copie des routes /auth/login, /auth/register, etc.'
			},
			{
				id: 'dashboard-routes',
				title: 'Migration des routes dashboard',
				status: 'pending',
				description: 'Copie des interfaces d\'administration principales'
			},
			{
				id: 'components',
				title: 'Migration des composants UI',
				status: 'pending',
				description: 'Copie des composants charts, editors, tables'
			},
			{
				id: 'env-config',
				title: 'Configuration environnement',
				status: 'pending',
				description: 'Setup MongoDB URI et variables d\'environnement'
			}
		];
		
		return json({
			status: 'migration_in_progress',
			timestamp: new Date().toISOString(),
			npm: {
				status: npmStatus,
				nodeModulesExists,
				packageLockExists
			},
			source: {
				dashPreprodExists: dashPreprodSourceExists
			},
			migratedFiles,
			nextSteps,
			progress: {
				completed: Object.values(migratedFiles).filter(Boolean).length,
				total: Object.keys(migratedFiles).length + nextSteps.length,
				percentage: Math.round((Object.values(migratedFiles).filter(Boolean).length / (Object.keys(migratedFiles).length + nextSteps.length)) * 100)
			}
		});
		
	} catch (error) {
		return json({
			status: 'error',
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString()
		}, { status: 500 });
	}
};
