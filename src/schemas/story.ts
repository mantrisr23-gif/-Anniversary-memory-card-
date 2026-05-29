import { z } from 'zod';

export const MemorySchema = z.object({
  id: z.string(),
  text: z.string().optional(),
  imageUrl: z.string().optional(),
  secretNote: z.string().optional(),
  type: z.enum(['photo', 'note', 'quote', 'empty']).optional(),
}).passthrough();

export const ChapterSchema = z.object({
  id: z.string(),
  chapterNumber: z.number().optional(),
  title: z.string(),
  mood: z.string(),
  themeColor: z.enum(['vintage', 'cream', 'sadness', 'night', 'warmth']).optional(),
  content: z.array(MemorySchema),
}).passthrough();

export const StoryDataSchema = z.array(ChapterSchema);
export type Chapter = z.infer<typeof ChapterSchema>;
export type Memory = z.infer<typeof MemorySchema>;