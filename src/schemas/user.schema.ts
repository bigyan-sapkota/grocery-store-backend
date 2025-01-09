import { createId } from '@paralleldrive/cuid2';
import { pgTable, primaryKey, text, unique, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: text('id').notNull().$defaultFn(createId),
    name: varchar('name', { length: 30 }).notNull(),
    email: varchar('email', { length: 40 }).notNull(),
    password: varchar('password', { length: 200 }),
    image: varchar('image', { length: 200 }),
    role: varchar('role', { enum: ['admin', 'user'] })
      .notNull()
      .default('user'),
    createdAt: varchar('state', { length: 30 })
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
  image: users.image,
  role: users.role,
  createdAt: users.createdAt
};

export type UserSnapshot = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: 'user' | 'admin';
  createdAt: string;
};
