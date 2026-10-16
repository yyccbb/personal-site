import { z } from '@nuxt/content'

export const journalSchema = z.object({
  title: z.string().trim().min(1),
  subtitle: z.string().trim().min(1),
  author: z.string().trim().min(1).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(['research', 'travelling']),
  readingMinutes: z.number().int().positive(),
  image: z.object({ src: z.string().min(1), alt: z.string().min(1) }).optional(),
  slug: z.string(),
})
