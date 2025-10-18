import { defineConfig } from 'tsup';

export default defineConfig(({ watch }) => {
  const isDev = watch === true;

  return {
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    watch: isDev,
    minify: !isDev,
    dts: true,
    bundle: true,
    external: ['react']
  };
});
