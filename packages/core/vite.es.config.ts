import { defineConfig } from 'vite';
import { readdir, readdirSync } from 'fs';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { filter, map, includes, delay, defer } from 'lodash-es';
import dts from 'vite-plugin-dts';
import shell from 'shelljs';
import hooks from './hooksPlugin';
import terser from '@rollup/plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

const TRY_MOVE_STYLES_DELAY = 800 as const;
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
function moveStyle() {
  readdir('./dist/es/theme', (err) => {
    if (err) return delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  });
  defer(() => shell.mv('./dist/es/theme', './dist'));
}
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }),

    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
    hooks({
      rmFile: ['./dist/es', './dist/theme', './dist/types'],
      afterBuild: () => {
        moveStyle();
      },
    }),
  ],
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true, // 将 CSS 拆分成单独的文件
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
          if (
            assetInfo.type === 'asset' &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return 'theme/[name].[ext]';
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks';
          }
          if (
            id.includes('/packages/utils') ||
            id.includes('plugin-vue:export-helper')
          ) {
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
