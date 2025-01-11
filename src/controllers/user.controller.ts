import { db } from '@/db';
import { updateProfileSchema } from '@/dtos/user.dto';
import { UnauthorizedException } from '@/lib/exceptions';
import { handleAsync } from '@/middlewares/handle-async';
import { users } from '@/schemas/user.schema';
import { eq } from 'drizzle-orm';

// api to get profile data
export const getProfile = handleAsync(async (req, res) => {
  if (!req.user) throw new UnauthorizedException();

  res.json({
    user: req.user
  });
});

// api to logout user
export const logoutUser = handleAsync(async (req, res) => {
  if (!req.user) throw new UnauthorizedException();
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

// api to update profile
export const updateProfile = handleAsync(async (req, res) => {
  if (!req.user) throw new UnauthorizedException();

  const updatedData = updateProfileSchema.parse(req.body);

  const [updateUser] = await db
    .update(users)
    .set(updatedData)
    .where(eq(users.id, req.user.id))
    .returning();

  res.json({ user: updateUser });
});

// api to delete user
export const deleteProfile = handleAsync(async (req, res) => {
  if (!req.user) throw new UnauthorizedException();
  await db.delete(users).where(eq(users.id, req.user.id));
  req.logout(() => {});
  res.json({ message: 'Profile deleted successfully' });
});
