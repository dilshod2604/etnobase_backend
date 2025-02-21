import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personSckillsSchema = z.object({
  personId: z.number().int(),
  name: z.string().min(2).max(255),
  value: z.string().min(2).max(255),
});

const createPersonSckillsSchema = personSckillsSchema;
export const personSckillsSchemaResponse = personSckillsSchema.extend({
  id: z.number().int(),
});
const updatePersonSckillsSchema = personSckillsSchema.omit({ personId: true });

const personSckillsParamsSchema = z.object({
  id: z.number().int(),
});

export type CreatePersonsSckillsInput = z.infer<typeof personSckillsSchema>;
export type UppdatePersonSckillsInput = z.infer<
  typeof updatePersonSckillsSchema
>;

export const { schemas: PersonsSckillsSchema, $ref } = buildJsonSchemas(
  {
    createPersonSckillsSchema,
    personSckillsSchemaResponse,
    updatePersonSckillsSchema,
    personSckillsParamsSchema,
  },
  { $id: "PersonSckills" }
);
