import z from 'zod';

const nameSchema = z
  .string()
  .min(4, 'Name must be at least 4 characters')
  .max(30, 'Name must not exceed 30 characters');

const emailSchema = z.string().email().max(40, 'Email must not exceed 40 characters');

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(20, 'Password must not exceed 20 characters');
