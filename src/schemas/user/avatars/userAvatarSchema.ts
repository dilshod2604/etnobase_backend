import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userAvatarSchema = z.object({
  url: z.string().optional(),
});

const userAvatarsResponse = userAvatarSchema;
export const { schemas: UserAvatarSchema, $ref } = buildJsonSchemas(
  {
    userAvatarsResponse,
  },
  { $id: "UserAvatar" }
);
