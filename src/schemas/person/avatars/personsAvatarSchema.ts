import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personAvatarSchema = z.object({
  url: z.string().optional(),
});

const personAvatarsResponse = personAvatarSchema;
export const { schemas: PersonAvatarSchema, $ref } = buildJsonSchemas(
  {
    personAvatarsResponse,
  },
  { $id: "PersonAvatar" }
);
