import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';
import { images } from '../database/schema';

export const imageSelectSchema = createSelectSchema(images);
export const imageInsertSchema = createInsertSchema(images);

export type Image = z.infer<typeof imageSelectSchema>;
export type NewImage = z.infer<typeof imageInsertSchema>;
