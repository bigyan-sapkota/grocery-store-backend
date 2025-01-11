import { env } from '@/config/env.config';
import { db } from '@/db';
import { selectUserSnapshot, users } from '@/schemas/user.schema';
import { eq } from 'drizzle-orm';
import { Strategy } from 'passport-google-oauth20';

export const GoogleStrategy = new Strategy(
  {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  async function (req, accessToken, refreshToken, profile, done) {
    try {
      const id: string = profile.id;
      const name: string = profile.displayName;
      const email: string = profile.emails?.at(0)?.value || '';
      const image: string | null = profile.photos?.at(0)?.value || null;

      let [user] = await db
        .select(selectUserSnapshot)
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        [user] = await db.insert(users).values({
          id,
          name,
          email,
          image,
          phone: '',
          location: '',
          locationUrl: '',
          role: 'user',
          createdAt: new Date().toISOString()
        });
      }

      if (!user) return done(null, undefined);
      done(null, user);
    } catch (err) {
      done(err as Error, undefined);
    }
  }
);
