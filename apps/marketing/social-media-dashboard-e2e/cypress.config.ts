import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run marketing-social-media-dashboard:serve:development',
        production: 'nx run marketing-social-media-dashboard:serve:production',
      },
      ciWebServerCommand:
        'nx run marketing-social-media-dashboard:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
