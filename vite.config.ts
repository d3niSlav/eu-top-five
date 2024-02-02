import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


// https://vitejs.dev/config/
export default defineConfig(async ( command, mode) => {
  const env = await loadEnv(mode, process.cwd(), '')
  console.log(env.VUE_APP_API_DOMAIN);
  console.log(env.VUE_APP_API_KEY);

  const API = {
    VUE_APP_API_DOMAIN: env.VUE_APP_API_DOMAIN,
    VUE_APP_API_KEY: env.VUE_APP_API_KEY,
  };

  // TODO pass the variables to the vue?
  console.log(API);

  return {
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  }
});
