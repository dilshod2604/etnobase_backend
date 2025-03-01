import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const uploadPersonVideosResponse = z.object({
  message: z.string(),
  urls: z.array(z.string()).optional(),
});

export const { schemas: uploadPersonVideosSchema, $ref } = buildJsonSchemas(
  {
    uploadPersonVideosResponse,
  },
  { $id: "uploadPersonVideos" }
);
