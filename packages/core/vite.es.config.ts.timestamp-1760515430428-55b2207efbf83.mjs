// vite.es.config.ts
import { defineConfig } from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/vite@5.4.20_@types+node@20.19.13_terser@5.44.0/node_modules/vite/dist/node/index.js";
import { readdir, readdirSync } from "fs";
import vue from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.20_@types+node@20.19.13_terser@5.44.0__vue@3.5.21_typescript@5.9.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { filter, map, includes, delay, defer } from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import dts from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.19.13_rollup@4.50.1_typescript@5.9.2_vite@5.4.20_@_5021762c794bb7cb58198c492ecf6b79/node_modules/vite-plugin-dts/dist/index.mjs";
import shell2 from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";

// hooksPlugin.ts
import { each, isFunction } from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
import shell from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
function hooksPlugin({
  rmFile,
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFile, (file) => {
        if (file) {
          shell.rm("-rf", file);
        }
      });
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// vite.es.config.ts
import terser from "file:///Users/pennychang/Desktop/programs/frontend/pc-element/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.50.1/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "/Users/pennychang/Desktop/programs/frontend/pc-element/packages/core";
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
var TRY_MOVE_STYLES_DELAY = 800;
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
function moveStyle() {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  });
  defer(() => shell2.mv("./dist/es/theme", "./dist"));
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    }),
    hooksPlugin({
      rmFile: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: () => {
        moveStyle();
      }
    })
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    // 将 CSS 拆分成单独的文件
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "PcElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/vue-fontawesome",
        "@fortawesome/free-solid-svg-icons",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (assetInfo.type === "asset" && /\.(css)$/i.test(assetInfo.name)) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) return item;
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiLCAiaG9va3NQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGVubnljaGFuZy9EZXNrdG9wL3Byb2dyYW1zL2Zyb250ZW5kL3BjLWVsZW1lbnQvcGFja2FnZXMvY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3Blbm55Y2hhbmcvRGVza3RvcC9wcm9ncmFtcy9mcm9udGVuZC9wYy1lbGVtZW50L3BhY2thZ2VzL2NvcmUvdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3Blbm55Y2hhbmcvRGVza3RvcC9wcm9ncmFtcy9mcm9udGVuZC9wYy1lbGVtZW50L3BhY2thZ2VzL2NvcmUvdml0ZS5lcy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHJlYWRkaXIsIHJlYWRkaXJTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIGluY2x1ZGVzLCBkZWxheSwgZGVmZXIgfSBmcm9tICdsb2Rhc2gtZXMnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IHNoZWxsIGZyb20gJ3NoZWxsanMnO1xuaW1wb3J0IGhvb2tzIGZyb20gJy4vaG9va3NQbHVnaW4nO1xuaW1wb3J0IHRlcnNlciBmcm9tICdAcm9sbHVwL3BsdWdpbi10ZXJzZXInO1xuXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcbmNvbnN0IGlzVGVzdCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCc7XG5cbmNvbnN0IFRSWV9NT1ZFX1NUWUxFU19ERUxBWSA9IDgwMCBhcyBjb25zdDtcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XG4gIGNvbnN0IGVudHJpZXMgPSByZWFkZGlyU3luYyhiYXNlUGF0aCwgeyB3aXRoRmlsZVR5cGVzOiB0cnVlIH0pO1xuXG4gIHJldHVybiBtYXAoXG4gICAgZmlsdGVyKGVudHJpZXMsIChlbnRyeSkgPT4gZW50cnkuaXNEaXJlY3RvcnkoKSksXG4gICAgKGVudHJ5KSA9PiBlbnRyeS5uYW1lXG4gICk7XG59XG5mdW5jdGlvbiBtb3ZlU3R5bGUoKSB7XG4gIHJlYWRkaXIoJy4vZGlzdC9lcy90aGVtZScsIChlcnIpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gZGVsYXkobW92ZVN0eWxlLCBUUllfTU9WRV9TVFlMRVNfREVMQVkpO1xuICB9KTtcbiAgZGVmZXIoKCkgPT4gc2hlbGwubXYoJy4vZGlzdC9lcy90aGVtZScsICcuL2Rpc3QnKSk7XG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgZHRzKHtcbiAgICAgIHRzY29uZmlnUGF0aDogJy4uLy4uL3RzY29uZmlnLmJ1aWxkLmpzb24nLFxuICAgICAgb3V0RGlyOiAnZGlzdC90eXBlcycsXG4gICAgfSksXG5cbiAgICB0ZXJzZXIoe1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgc2VxdWVuY2VzOiBpc1Byb2QsXG4gICAgICAgIGFyZ3VtZW50czogaXNQcm9kLFxuICAgICAgICBkcm9wX2NvbnNvbGU6IGlzUHJvZCAmJiBbJ2xvZyddLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2QsXG4gICAgICAgIHBhc3NlczogaXNQcm9kID8gNCA6IDEsXG4gICAgICAgIGdsb2JhbF9kZWZzOiB7XG4gICAgICAgICAgJ0BERVYnOiBKU09OLnN0cmluZ2lmeShpc0RldiksXG4gICAgICAgICAgJ0BQUk9EJzogSlNPTi5zdHJpbmdpZnkoaXNQcm9kKSxcbiAgICAgICAgICAnQFRFU1QnOiBKU09OLnN0cmluZ2lmeShpc1Rlc3QpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGZvcm1hdDoge1xuICAgICAgICBzZW1pY29sb25zOiBmYWxzZSxcbiAgICAgICAgc2hvcnRoYW5kOiBpc1Byb2QsXG4gICAgICAgIGJyYWNlczogIWlzUHJvZCxcbiAgICAgICAgYmVhdXRpZnk6ICFpc1Byb2QsXG4gICAgICAgIGNvbW1lbnRzOiAhaXNQcm9kLFxuICAgICAgfSxcbiAgICAgIG1hbmdsZToge1xuICAgICAgICB0b3BsZXZlbDogaXNQcm9kLFxuICAgICAgICBldmFsOiBpc1Byb2QsXG4gICAgICAgIGtlZXBfY2xhc3NuYW1lczogaXNEZXYsXG4gICAgICAgIGtlZXBfZm5hbWVzOiBpc0RldixcbiAgICAgIH0sXG4gICAgfSksXG4gICAgaG9va3Moe1xuICAgICAgcm1GaWxlOiBbJy4vZGlzdC9lcycsICcuL2Rpc3QvdGhlbWUnLCAnLi9kaXN0L3R5cGVzJ10sXG4gICAgICBhZnRlckJ1aWxkOiAoKSA9PiB7XG4gICAgICAgIG1vdmVTdHlsZSgpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0L2VzJyxcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSwgLy8gXHU1QzA2IENTUyBcdTYyQzZcdTUyMDZcdTYyMTBcdTUzNTVcdTcyRUNcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdQY0VsZW1lbnQnLFxuICAgICAgZmlsZU5hbWU6ICdpbmRleCcsXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZScsXG4gICAgICAgICdAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lJyxcbiAgICAgICAgJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucycsXG4gICAgICAgICdAcG9wcGVyanMvY29yZScsXG4gICAgICAgICdhc3luYy12YWxpZGF0b3InLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZSA9PT0gJ3N0eWxlLmNzcycpIHJldHVybiAnaW5kZXguY3NzJztcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBhc3NldEluZm8udHlwZSA9PT0gJ2Fzc2V0JyAmJlxuICAgICAgICAgICAgL1xcLihjc3MpJC9pLnRlc3QoYXNzZXRJbmZvLm5hbWUgYXMgc3RyaW5nKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuICd0aGVtZS9bbmFtZV0uW2V4dF0nO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWUgYXMgc3RyaW5nO1xuICAgICAgICB9LFxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL3BhY2thZ2VzL2hvb2tzJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnaG9va3MnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBpZC5pbmNsdWRlcygnL3BhY2thZ2VzL3V0aWxzJykgfHxcbiAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdwbHVnaW4tdnVlOmV4cG9ydC1oZWxwZXInKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuICd1dGlscyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGdldERpcmVjdG9yaWVzU3luYygnLi4vY29tcG9uZW50cycpKSB7XG4gICAgICAgICAgICBpZiAoaW5jbHVkZXMoaWQsIGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YCkpIHJldHVybiBpdGVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcGVubnljaGFuZy9EZXNrdG9wL3Byb2dyYW1zL2Zyb250ZW5kL3BjLWVsZW1lbnQvcGFja2FnZXMvY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3Blbm55Y2hhbmcvRGVza3RvcC9wcm9ncmFtcy9mcm9udGVuZC9wYy1lbGVtZW50L3BhY2thZ2VzL2NvcmUvaG9va3NQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3Blbm55Y2hhbmcvRGVza3RvcC9wcm9ncmFtcy9mcm9udGVuZC9wYy1lbGVtZW50L3BhY2thZ2VzL2NvcmUvaG9va3NQbHVnaW4udHNcIjtpbXBvcnQgeyBlYWNoLCBpc0Z1bmN0aW9uIH0gZnJvbSAnbG9kYXNoLWVzJztcbmltcG9ydCBzaGVsbCBmcm9tICdzaGVsbGpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaG9va3NQbHVnaW4oe1xuICBybUZpbGUsXG4gIGJlZm9yZUJ1aWxkLFxuICBhZnRlckJ1aWxkLFxufToge1xuICBybUZpbGU/OiBzdHJpbmdbXTtcbiAgYmVmb3JlQnVpbGQ/OiBGdW5jdGlvbjtcbiAgYWZ0ZXJCdWlsZD86IEZ1bmN0aW9uO1xufSkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdob29rcy1wbHVnaW4nLFxuICAgIGJ1aWxkU3RhcnQoKSB7XG4gICAgICBlYWNoKHJtRmlsZSwgKGZpbGUpID0+IHtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICBzaGVsbC5ybSgnLXJmJywgZmlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaXNGdW5jdGlvbihiZWZvcmVCdWlsZCkgJiYgYmVmb3JlQnVpbGQoKTtcbiAgICB9LFxuICAgIGJ1aWxkRW5kKGVycj86IEVycm9yKSB7XG4gICAgICAhZXJyICYmIGlzRnVuY3Rpb24oYWZ0ZXJCdWlsZCkgJiYgYWZ0ZXJCdWlsZCgpO1xuICAgIH0sXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9ZLFNBQVMsb0JBQW9CO0FBQ2phLFNBQVMsU0FBUyxtQkFBbUI7QUFDckMsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixTQUFTLFFBQVEsS0FBSyxVQUFVLE9BQU8sYUFBYTtBQUNwRCxPQUFPLFNBQVM7QUFDaEIsT0FBT0EsWUFBVzs7O0FDTjRXLFNBQVMsTUFBTSxrQkFBa0I7QUFDL1osT0FBTyxXQUFXO0FBRUgsU0FBUixZQUE2QjtBQUFBLEVBQ2xDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixHQUlHO0FBQ0QsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUNYLFdBQUssUUFBUSxDQUFDLFNBQVM7QUFDckIsWUFBSSxNQUFNO0FBQ1IsZ0JBQU0sR0FBRyxPQUFPLElBQUk7QUFBQSxRQUN0QjtBQUFBLE1BQ0YsQ0FBQztBQUNELGlCQUFXLFdBQVcsS0FBSyxZQUFZO0FBQUEsSUFDekM7QUFBQSxJQUNBLFNBQVMsS0FBYTtBQUNwQixPQUFDLE9BQU8sV0FBVyxVQUFVLEtBQUssV0FBVztBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUNGOzs7QURsQkEsT0FBTyxZQUFZO0FBUm5CLElBQU0sbUNBQW1DO0FBVXpDLElBQU0sU0FBUyxRQUFRLElBQUksYUFBYTtBQUN4QyxJQUFNLFFBQVEsUUFBUSxJQUFJLGFBQWE7QUFDdkMsSUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhO0FBRXhDLElBQU0sd0JBQXdCO0FBQzlCLFNBQVMsbUJBQW1CLFVBQWtCO0FBQzVDLFFBQU0sVUFBVSxZQUFZLFVBQVUsRUFBRSxlQUFlLEtBQUssQ0FBQztBQUU3RCxTQUFPO0FBQUEsSUFDTCxPQUFPLFNBQVMsQ0FBQyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQUEsSUFDOUMsQ0FBQyxVQUFVLE1BQU07QUFBQSxFQUNuQjtBQUNGO0FBQ0EsU0FBUyxZQUFZO0FBQ25CLFVBQVEsbUJBQW1CLENBQUMsUUFBUTtBQUNsQyxRQUFJLElBQUssUUFBTyxNQUFNLFdBQVcscUJBQXFCO0FBQUEsRUFDeEQsQ0FBQztBQUNELFFBQU0sTUFBTUMsT0FBTSxHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFDbkQ7QUFDQSxJQUFPLHlCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsTUFDRixjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDVixDQUFDO0FBQUEsSUFFRCxPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsUUFDUixXQUFXO0FBQUEsUUFDWCxXQUFXO0FBQUEsUUFDWCxjQUFjLFVBQVUsQ0FBQyxLQUFLO0FBQUEsUUFDOUIsZUFBZTtBQUFBLFFBQ2YsUUFBUSxTQUFTLElBQUk7QUFBQSxRQUNyQixhQUFhO0FBQUEsVUFDWCxRQUFRLEtBQUssVUFBVSxLQUFLO0FBQUEsVUFDNUIsU0FBUyxLQUFLLFVBQVUsTUFBTTtBQUFBLFVBQzlCLFNBQVMsS0FBSyxVQUFVLE1BQU07QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLFdBQVc7QUFBQSxRQUNYLFFBQVEsQ0FBQztBQUFBLFFBQ1QsVUFBVSxDQUFDO0FBQUEsUUFDWCxVQUFVLENBQUM7QUFBQSxNQUNiO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixVQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixpQkFBaUI7QUFBQSxRQUNqQixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsWUFBTTtBQUFBLE1BQ0osUUFBUSxDQUFDLGFBQWEsZ0JBQWdCLGNBQWM7QUFBQSxNQUNwRCxZQUFZLE1BQU07QUFDaEIsa0JBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBO0FBQUEsSUFDZCxLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGNBQUksVUFBVSxTQUFTLFlBQWEsUUFBTztBQUMzQyxjQUNFLFVBQVUsU0FBUyxXQUNuQixZQUFZLEtBQUssVUFBVSxJQUFjLEdBQ3pDO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU8sVUFBVTtBQUFBLFFBQ25CO0FBQUEsUUFDQSxhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxHQUFHLFNBQVMsaUJBQWlCLEdBQUc7QUFDbEMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FDRSxHQUFHLFNBQVMsaUJBQWlCLEtBQzdCLEdBQUcsU0FBUywwQkFBMEIsR0FDdEM7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFFQSxxQkFBVyxRQUFRLG1CQUFtQixlQUFlLEdBQUc7QUFDdEQsZ0JBQUksU0FBUyxJQUFJLHdCQUF3QixJQUFJLEVBQUUsRUFBRyxRQUFPO0FBQUEsVUFDM0Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsic2hlbGwiLCAic2hlbGwiXQp9Cg==
