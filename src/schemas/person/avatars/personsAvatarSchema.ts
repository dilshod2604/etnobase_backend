import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const personAvatarSchema = z.object({
  path: z.string(),
});

const personAvatarsResponse = personAvatarSchema;
export const { schemas: PersonAvatarSchema, $ref } = buildJsonSchemas(
  {
    personAvatarsResponse,
  },
  { $id: "PersonAvatar" }
);
