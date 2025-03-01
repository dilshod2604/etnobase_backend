import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { uploadVideos } from "../../constrolers/person/uploadVideos";
import { $ref } from "../../schemas/person/video/uploadPersonVideosSchema";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/persons/videos",
    {
      schema: {
        response: {
          200: $ref("uploadPersonVideosResponse"),
        },
      },
    },
    uploadVideos
  );
});
