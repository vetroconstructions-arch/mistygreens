import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.paranjapetownship.com',
  output: 'static',
  integrations: [react()],
  build: {
    format: 'directory'
  }
});
