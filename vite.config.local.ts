import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			// Forcer rollup à utiliser la version JS pure, pas les binaires natifs
			external: ['@rollup/rollup-win32-x64-msvc']
		}
	},
	optimizeDeps: {
		// Éviter les dépendances optionnelles problématiques
		exclude: ['@rollup/rollup-win32-x64-msvc']
	}
});
