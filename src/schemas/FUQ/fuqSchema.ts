import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const fuqSchema = z.object({
  id: z.number().int(),
  question: z.string(),
  answer: z.string(),
});

const createFUQSchema = fuqSchema.omit({ id: true });
const updateFUQSchema = fuqSchema.omit({ id: true });
const fuqResponseSchema = z.object({
  message: z.string(),
});
const fetchAllFUQSchemas = z.array(fuqResponseSchema);

export type CreateFUQSchemaInput = z.infer<typeof createFUQSchema>;
export type UpdateFUQSchemaInput = z.infer<typeof createFUQSchema>;

export const { schemas: FUQSchema, $ref } = buildJsonSchemas(
  {
    createFUQSchema,
    updateFUQSchema,
    fuqResponseSchema,
    fetchAllFUQSchemas
  },
  { $id: "FUQ" }
);
