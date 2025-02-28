import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const uploadPersonImageResponse = z.object({
  message: z.string(),
  urls: z.array(z.string()).optional(),
});

export const { schemas: uploadPersonImageSchema, $ref } = buildJsonSchemas(
  {
    uploadPersonImageResponse,
  },
  { $id: "uploadPersonImage" }
);
