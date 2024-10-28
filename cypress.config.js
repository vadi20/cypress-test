const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    blockHosts: ['pagead2.googlesyndication.com','stats.g.doubleclick.net','www.google-analytics.com'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
