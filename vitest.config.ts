// import { defineConfig } from 'vitest/config'

// export default defineConfig({
//   test: {
//     globals: true,         // Enables global `describe`, `it`, `expect`, etc.
//     // environment: 'jsdom',  // Simulates a browser-like environment
//     environment: 'node', // ✅ Nuxt SSR works best with node
//     setupFiles: ['./test/setup.ts'], // Optional setup file if needed
//     include: ['tests/**/*.test.ts'], // Matches test files
//   }
// })
// This configuration file is for Vitest, a Vite-native test framework.
// It sets up the testing environment, including globals and file patterns for test discovery.
// The `setupFiles` option allows you to specify a file that runs before the tests, which can be useful for setting up global variables or configurations.
// The `include` option specifies the file patterns that Vitest should look for when discovering tests.
// The `environment` option is set to 'jsdom', which simulates a browser-like environment for testing.
// The `globals` option enables the use of global functions like `describe`, `it`, and `expect` without needing to import them in each test file.
// This configuration is useful for running unit tests, integration tests, or end-to-end tests in a Nuxt.js application using Vitest.

// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'
// eslint-disable-next-line
import { fileURLToPath } from 'node:url'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // you can optionally set Nuxt-specific environment options
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
    //     overrides: {
    //       // other Nuxt config you want to pass
    //     }
    //   }
    // }
  },
})
