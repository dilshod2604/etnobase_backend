import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  createImage,
  deleteImage,
  updateImage,
} from "../../constrolers/person/imageController";
import { $ref } from "../../schemas/person/image/personImage";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/image",
    {
      schema: {
        body: $ref("createPersonImageSchema"),
        response: {
          201: $ref("createPersonImageResponse"),
        },
      },
    },
    createImage
  );
  fastify.put(
    "/image/:id",
    {
      schema: {
        params: $ref("personImageParamsSchema"),
        body: $ref("updatePersonImageSchema"),
        response: {
          200: $ref("personImageResponse"),
        },
      },
    },
    updateImage
  );
  fastify.delete(
    "/image/:id",
    {
      schema: {
        params: $ref("personImageParamsSchema"),
        response: {
          200: $ref("personImageResponse"),
        },
      },
    },
    deleteImage
  );
});
