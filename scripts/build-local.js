#!/usr/bin/env node

// Script de build alternatif pour éviter les problèmes rollup Windows/Linux
// Ce script sera utilisé en local uniquement - la CI/CD Linux utilisera le build normal

import { readFileSync, writeFileSync, cpSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('🔧 Build alternatif pour développement local...');
console.log('⚠️  Ce build ne remplace pas le build production Linux !');

try {
	// Créer le dossier build
	mkdirSync(resolve(rootDir, 'build'), { recursive: true });
	
	// Copier les fichiers statiques si ils existent
	console.log('📁 Copie des fichiers statiques...');
	try {
		cpSync(resolve(rootDir, 'static'), resolve(rootDir, 'build/client'), { recursive: true });
	} catch (error) {
		console.log('ℹ️  Dossier static vide ou inexistant, ignoré');
		mkdirSync(resolve(rootDir, 'build/client'), { recursive: true });
	}
	
	// Créer un index.js minimal pour le serveur
	const serverContent = `
// Build alternatif pour développement local
import { handler } from './handler.js';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static('build/client'));

// Handler SvelteKit
app.use(handler);

app.listen(port, () => {
	console.log('🚀 Serveur démarré sur le port', port);
});
`;
	
	writeFileSync(resolve(rootDir, 'build/index.js'), serverContent);
	
	// Créer un handler minimal
	const handlerContent = `
export const handler = (req, res, next) => {
	res.json({ 
		message: 'Build alternatif - utilisez la CI/CD pour le build production',
		platform: process.platform,
		mode: 'development'
	});
};
`;
	
	writeFileSync(resolve(rootDir, 'build/handler.js'), handlerContent);
	
	console.log('✅ Build alternatif terminé !');
	console.log('🐧 Pour le vrai build Linux, utilisez la CI/CD GitHub Actions');
	
} catch (error) {
	console.error('❌ Erreur du build alternatif:', error);
	process.exit(1);
}
