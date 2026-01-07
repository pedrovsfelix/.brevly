import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/infra/http/server.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'node22',
  splitting: false,
  sourcemap: true,
  clean: true
});
