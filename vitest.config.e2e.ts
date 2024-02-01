import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['./**/*.e2e-spec.ts'],
    root: './',
    coverage: {
      provider: 'v8',
    },
    outputFile: {
      json: 'vitest/output/json/test.json',
      junit: 'vitest/output/junit/test.xml',
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
    }),
  ],
});
