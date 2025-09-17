import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { filter, map, includes } from 'lodash-es';
import dts from 'vite-plugin-dts';

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),
  ],
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'PcElement',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/vue-fontawesome',
        '@fortawesome/free-solid-svg-icons',
        '@popperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('packages/hooks')) {
            return 'hooks';
          }
          if (id.includes('packages/utils')) {
            return 'utils';
          }

          for (const item of getDirectoriesSync('../components')) {
            if (includes(id, `/packages/components/${item}`)) return item;
          }
        },
      },
    },
  },
});
