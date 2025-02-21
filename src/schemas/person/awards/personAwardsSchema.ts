import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personAwardsSchema = z.object({
  personId: z.number().int(),
  name: z.string().min(2).max(255),
  value: z.string().min(2).max(255),
});

const createPersonAwardsSchema = personAwardsSchema;
export const personAwardsSchemaResponse = personAwardsSchema.extend({
  id: z.number().int(),
});
const updatePersonAwardsSchema = personAwardsSchema.omit({ personId: true });

const personAwardsParamsSchema = z.object({
  id: z.number().int(),
});

export type CreatePersonsAwardsInput = z.infer<typeof personAwardsSchema>;
export type UppdatePersonAwardsInput = z.infer<
  typeof updatePersonAwardsSchema
>;

export const { schemas: PersonsAwardsSchema, $ref } = buildJsonSchemas(
  {
    createPersonAwardsSchema,
    personAwardsSchemaResponse,
    updatePersonAwardsSchema,
    personAwardsParamsSchema,
  },
  { $id: "PersonAwards" }
);
