import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { $ref } from "../../schemas/person/video/personVideo.scema";
import {
  createVideo,
  deleteVideo,
  updateVideo,
} from "../../constrolers/person/videoController";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/video",
    {
      schema: {
        body: $ref("createPersonVideoSchema"),
        response: {
          201: $ref("createPersonVideoResponse"),
        },
      },
    },
    createVideo
  );
  fastify.put(
    "/video/:id",
    {
      schema: {
        params: $ref("personVideoParamsSchema"),
        body: $ref("updatePersonVideoSchema"),
        response: {
          200: $ref("personVideoResponse"),
        },
      },
    },
    updateVideo
  );
  fastify.delete(
    "/video/:id",
    {
      schema: {
        params: $ref("personVideoParamsSchema"),
        response: {
          200: $ref("personVideoResponse"),
        },
      },
    },
    deleteVideo
  );
});
