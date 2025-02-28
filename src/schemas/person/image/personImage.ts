import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personImageSchema = z.object({
  personId: z.number().int(),
  src: z.string(),
});

const createPersonImage = z.object({
  personId: z.number().int(),
  urls: z.array(z.string()),
});

const createPersonImageSchema = createPersonImage;
const createPersonImageResponse = z.array(
  personImageSchema.extend({
    id: z.number().int(),
  })
);

createPersonImageResponse
const updatePersonImageSchema = personImageSchema.omit({ personId: true });
export const personImageResponse = personImageSchema.extend({
  id: z.number().int(),
});

const personImageParamsSchema = z.object({
  id: z.number().int(),
});

export type CreatePersonImageSchemaInput = z.infer<typeof createPersonImage>;
export type UpdatePersonImageSchemaInput = z.infer<
  typeof updatePersonImageSchema
>;

export const { schemas: PersonImageScheme, $ref } = buildJsonSchemas(
  {
    createPersonImageSchema,
    updatePersonImageSchema,
    personImageResponse,
    personImageParamsSchema,
    createPersonImageResponse
  },
  { $id: "PersonImage" }
);
