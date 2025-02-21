import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personTheatreSchema = z.object({
  personId: z.number().int(),
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
});

const createPersonTheatreSchema = personTheatreSchema;
export const personTheatreSchemaResponse = personTheatreSchema.extend({
  id: z.number().int(),
});
const updatePersonTheatreSchema = personTheatreSchema.omit({ personId: true });

const personTheatreParamsSchema = z.object({
  id: z.number().int(),
});

export type CreatePersonsTheatreInput = z.infer<typeof personTheatreSchema>;
export type UppdatePersonTheatreInput = z.infer<
  typeof updatePersonTheatreSchema
>;

export const { schemas: PersonsTheatreSchema, $ref } = buildJsonSchemas(
  {
    createPersonTheatreSchema,
    personTheatreSchemaResponse,
    updatePersonTheatreSchema,
    personTheatreParamsSchema,
  },
  { $id: "PersonTheatre" }
);
