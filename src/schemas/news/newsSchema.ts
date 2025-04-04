import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const newsSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  poster: z.string().optional().nullable(),
  sourceNews: z.string().optional().nullable(),
  phoneNumber:z.string().optional().nullable(),
  createdAt: z.date(),
});

const createNewsSchema = newsSchema.omit({ id: true, createdAt: true });
const newsResponse = newsSchema;
const getAllNewsSchemas = z.array(newsSchema);
const updateNewsSchema = newsSchema.omit({ id: true, createdAt: true });

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof createNewsSchema>;

export const { schemas: NewsSchema, $ref } = buildJsonSchemas(
  {
    createNewsSchema,
    newsResponse,
    updateNewsSchema,
    getAllNewsSchemas
  },
  { $id: "News" }
);
