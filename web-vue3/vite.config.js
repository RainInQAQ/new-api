import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslintPlugin({
			include: [
				'src/**/*.js',
				'src/**/*.vue',
				'src/**/*.ts',
				'src/**/*.css',
				'src/**/*.ts',
				'src/**/*.scss'
			],
			cache: true
		}),
		lazyImport({
			resolvers: [
				VxeResolver({
					libraryName: 'vxe-table'
				}),
				VxeResolver({
					libraryName: 'vxe-pc-ui'
				})
			]
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				javascriptEnabled: true
			}
		}
	},
	server: {
		port: 80,
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true
			}
		}
	}
})
