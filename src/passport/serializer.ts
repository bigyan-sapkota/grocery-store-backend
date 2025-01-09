import { db } from '@/db';
import { selectUserSnapshot, users, UserSnapshot } from '@/schemas/user.schema';
import { eq } from 'drizzle-orm';
import passport from 'passport';

export const serializer = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const [user] = await db.select(selectUserSnapshot).from(users).where(eq(users.id, id));
      if (!user) done(null, false);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
