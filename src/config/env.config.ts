import { config } from 'dotenv';
import { z } from 'zod';

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'testing']).default('development'),
    PORT: z
      .union([z.string(), z.number()])
      .default(5000)
      .transform((port) => {
        port = Number(port) || 5000;
        let indexOfPort = process.argv.indexOf('-p');
        if (indexOfPort === -1) {
          indexOfPort = process.argv.indexOf('--port');
        }
        if (indexOfPort === -1) return port;
        port = Number(process.argv[indexOfPort + 1]) || 5000;
        return port;
      }),

    DATABASE_URL: z.string().url(),
    SESSION_SECRET: z.string(),

    GOOGLE_CALLBACK_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    AUTH_REDIRECT_URI: z
      .string()
      .optional()
      .transform((uri) => uri || '/')
  })
  .readonly();

export const validateEnv = () => {
  if (process.env.NODE_ENV !== 'production') {
    config({ path: '.env' });
  }
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    console.log(`Environment variables validation failed\nExitting app`.red);
    process.exit(1);
  }
};
export const env = validateEnv();
