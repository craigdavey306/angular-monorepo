import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run finance-expenses-registration:serve:development',
        production: 'nx run finance-expenses-registration:serve:production',
      },
      ciWebServerCommand: 'nx run finance-expenses-registration:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
