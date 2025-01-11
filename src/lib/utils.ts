import { env } from '@/config/env.config';
import session from 'express-session';

export const devConsole = (...args: string[]) => {
  if (env.NODE_ENV !== 'production') {
    console.log(args.join(' '));
  }
};

export const sessionOptions: session.SessionOptions = {
  name: 'session',
  secret: env.SESSION_SECRET, // Use a secret directly instead of keys
  resave: false, // Prevents saving unmodified sessions
  saveUninitialized: true, // Saves new sessions that are not modified
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    httpOnly: true,
    secure: env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
};
