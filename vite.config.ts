import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			// Configuration cross-platform pour éviter les dépendances natives Windows
			external: process.platform === 'win32' ? ['@rollup/rollup-win32-x64-msvc'] : []
		}
	},
	optimizeDeps: {
		// Exclure les packages problématiques selon la plateforme
		exclude: process.platform === 'win32' ? ['@rollup/rollup-win32-x64-msvc'] : []
	},
	server: {
		port: 3000,
		host: true
	},
	preview: {
		port: 3000,
		host: true
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
