import { createId } from '@paralleldrive/cuid2';
import { pgTable, primaryKey, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: text('id').notNull().$defaultFn(createId),
    name: varchar('name', { length: 30 }).notNull(),
    email: varchar('email', { length: 40 }).notNull(),
    phone: varchar('phone', { length: 10 }).notNull(),
    location: varchar('location', { length: 40 }),
    locationUrl: varchar('locationUrl', { length: 200 }),
    image: varchar('image', { length: 200 }),
    role: varchar('role', { enum: ['admin', 'user'] })
      .notNull()
      .default('user'),
    createdAt: varchar('createdAt', { length: 30 })
  },
  function constraints(users) {
    return {
      primaryKey: primaryKey({ name: 'users_pkey', columns: [users.id] }),
      uniqueEmail: unique('email').on(users.email)
    };
  }
);

export type User = typeof users.$inferInsert;

export const selectUserSnapshot = {
  id: users.id,
  name: users.name,
  email: users.email,
  phone: users.phone,
  location: users.location,
  locationUrl: users.locationUrl,
  image: users.image,
  role: users.role,
  createdAt: users.createdAt
};

export type UserSnapshot = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  location?: string;
  locationUrl?: string;
  role: 'user' | 'admin';
  createdAt: string;
};
