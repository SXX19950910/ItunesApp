import {fileURLToPath, URL} from 'node:url'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
import {defineConfig} from 'vite'
import {VitePWA} from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    build: {
        outDir: 'docs'
    },
    plugins: [
        vue(),
        VitePWA({
            manifest: {
                theme_color: "#fff",
                "icons": [
                    {
                        "src": "icons/512.png",
                        "sizes": "any"
                    },
                    {
                        "src": "icons/512.png",
                        "sizes": "512*512",
                        "type": "image/png"
                    }
                ]
            }
        }),
        Components({
            resolvers: [VantResolver()],
        }),],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
