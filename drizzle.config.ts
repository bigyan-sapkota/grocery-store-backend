import { env } from '@/config/env.config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schemas/*',
  out: './drizzle',
  dbCredentials: { url: env.DATABASE_URL }
});
