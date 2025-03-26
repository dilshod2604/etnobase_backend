import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const faqSchema = z.object({
  id: z.number().int(),
  question: z.string(),
  answer: z.string(),
});

const createFAQSchema = faqSchema.omit({ id: true });
const updateFAQSchema = faqSchema.omit({ id: true });
const faqResponseSchema = z.object({
  message: z.string(),
});
const fetchAllFAQSchemas = z.array(faqSchema);

export type CreateFAQSchemaInput = z.infer<typeof createFAQSchema>;
export type UpdateFAQSchemaInput = z.infer<typeof createFAQSchema>;

export const { schemas: FAQSchema, $ref } = buildJsonSchemas(
  {
    createFAQSchema,
    updateFAQSchema,
    faqResponseSchema,
    fetchAllFAQSchemas
  },
  { $id: "FAQ" }
);
