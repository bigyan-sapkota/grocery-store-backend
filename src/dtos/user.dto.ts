import z from 'zod';
import { imageSchema } from './common.dto';

const nameSchema = z
  .string()
  .min(4, 'Name must be of at least 4 characters')
  .max(30, 'Name must not exceed 30 characters');

export const updateProfileSchema = z.object({
  name: nameSchema.optional(),
  image: imageSchema.nullish(),
  location: z.string().max(40).optional(),
  locationUrl: z.string().max(200).optional(),
  phone: z.string().max(10).optional()
});
