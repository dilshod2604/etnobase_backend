import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personVideoSchema = z.object({
  personId: z.number().int(),
  src: z.string(),
});

const createPersoVideo = z.object({
  personId: z.number().int(),
  urls: z.array(z.string()),
});

const createPersonVideoSchema = createPersoVideo;
const createPersonVideoResponse =  z.object({
  message: z.string(),
})

const updatePersonVideoSchema = personVideoSchema.omit({ personId: true });
export const personVideoResponse = personVideoSchema.extend({
  id: z.number().int(),
});

const personVideoParamsSchema = z.object({
  id: z.number().int(),
});

export type CreatePersonVideoSchemaInput = z.infer<typeof createPersoVideo>;
export type UpdatePersonVideoSchemaInput = z.infer<
  typeof updatePersonVideoSchema
>;

export const { schemas: PersonVideoScheme, $ref } = buildJsonSchemas(
  {
    createPersonVideoResponse,
    createPersonVideoSchema,
    updatePersonVideoSchema,
    personVideoResponse,
    personVideoParamsSchema,
  },
  { $id: "PersonVideo" }
);
