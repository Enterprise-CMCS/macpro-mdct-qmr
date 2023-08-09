import { defineConfig } from 'cypress'

export default defineConfig({
  experimentalStudio: true,
  redirectionLimit: 20,
  retries: 1,
  watchForFileChanges: true,
  fixturesFolder: 'fixtures',
  screenshotsFolder: 'screenshots',
  video: false,
  videosFolder: 'videos',
  downloadsFolder: 'downloads',
  defaultCommandTimeout: 15000,
  types: ['cypress', 'cypress-axe'],
  failOnStatusCode: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000/',
    specPattern: 'cypress/e2e/**/*.spec.ts',
    supportFile: 'support/index.js',
  },
})
