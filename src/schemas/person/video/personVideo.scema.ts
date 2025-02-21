import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personVideoSchema = z.object({
  personId: z.number().int(),
  src: z.string(),
});

const createPersonVideoSchema = personVideoSchema;
const updatePersonVideoSchema = personVideoSchema.omit({ personId: true });
export const personVideoResponse = personVideoSchema.extend({
  id: z.number().int(),
});

const personVideoParamsSchema = z.object({
  id: z.number().int(),
});

export type CreatePersonVideoSchemaInput = z.infer<typeof personVideoSchema>;
export type UpdatePersonVideoSchemaInput = z.infer<
  typeof updatePersonVideoSchema
>;

export const { schemas: PersonVideoScheme, $ref } = buildJsonSchemas(
  {
    createPersonVideoSchema,
    updatePersonVideoSchema,
    personVideoResponse,
    personVideoParamsSchema,
  },
  { $id: "PersonVideo" }
);
