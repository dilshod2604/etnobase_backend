import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { $ref } from "../../schemas/person/image/uploadPersonImageSchema";
import { uploadImages } from "../../constrolers/person/upoadImages";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/persons/images",
    {
      schema: {
        response: {
          200: $ref("uploadPersonImageResponse"),
        },
      },
    },
    uploadImages
  );
});
